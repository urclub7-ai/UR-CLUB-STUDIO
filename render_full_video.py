import numpy as np
import cv2
import math
import time
import subprocess
import os

def build_renderer(width=1080, height=1920):
    scale = 4
    gw = width // scale
    gh = height // scale
    
    y, x = np.ogrid[:gh, :gw]
    nx = (x / (gw - 1.0)).astype(np.float32)
    ny = (y / (gh - 1.0)).astype(np.float32)
    
    # Procedural Starfield
    np.random.seed(2026)
    n_stars = 750
    layers = np.random.choice([1, 2, 3], size=n_stars, p=[0.65, 0.25, 0.10])
    
    star_x = np.random.uniform(0, width, n_stars).astype(np.float32)
    star_y = np.random.uniform(0, height, n_stars).astype(np.float32)
    star_sz = np.zeros(n_stars, dtype=np.float32)
    star_spd = np.random.uniform(0.5, 1.8, n_stars).astype(np.float32)
    star_ph = np.random.uniform(0, 2 * math.pi, n_stars).astype(np.float32)
    star_col = np.ones((n_stars, 3), dtype=np.float32)
    
    for i in range(n_stars):
        if layers[i] == 1:
            star_sz[i] = np.random.uniform(0.7, 1.3)
            star_col[i] = [np.random.uniform(0.75, 1.0), np.random.uniform(0.75, 0.95), np.random.uniform(0.85, 1.0)]
        elif layers[i] == 2:
            star_sz[i] = np.random.uniform(1.4, 2.3)
            star_col[i] = [np.random.uniform(0.85, 1.0), np.random.uniform(0.9, 1.0), 1.0]
        else:
            star_sz[i] = np.random.uniform(2.7, 4.2)
            star_col[i] = [np.random.uniform(0.95, 1.0), np.random.uniform(0.95, 1.0), 1.0]
            
    vy, vx = np.ogrid[:height, :width]
    vignette = 1.0 - 0.20 * (((vx - width/2.0)/(width/2.0))**2 + ((vy - height/2.0)/(height/2.0))**2)
    vignette = np.clip(vignette, 0.80, 1.0).astype(np.float32)
    
    grain_tile = np.random.normal(0, 0.008, (height, width, 3)).astype(np.float32)
    
    return {
        'width': width, 'height': height,
        'gw': gw, 'gh': gh, 'nx': nx, 'ny': ny,
        'n_stars': n_stars, 'star_x': star_x, 'star_y': star_y,
        'star_sz': star_sz, 'star_spd': star_spd, 'star_ph': star_ph,
        'star_col': star_col, 'layers': layers,
        'vignette': vignette, 'grain_tile': grain_tile
    }

def render_frame(ctx, t):
    nx, ny = ctx['nx'], ctx['ny']
    gw, gh = ctx['gw'], ctx['gh']
    width, height = ctx['width'], ctx['height']
    
    # 1. Base deep space
    base = np.zeros((gh, gw, 3), dtype=np.float32)
    base[:, :, 0] = 0.015 + 0.010 * (1.0 - ny)  # Blue
    base[:, :, 1] = 0.005 + 0.005 * (1.0 - ny)  # Green
    base[:, :, 2] = 0.015 + 0.010 * (1.0 - ny)  # Red
    
    # 2. Dynamic Liquid Light Leaks / Nebula Clouds
    
    # Leak 1: Royal Violet / Deep Purple (Top & Right)
    ang1 = t * 0.16
    cx1 = 0.85 + 0.35 * math.cos(ang1)
    cy1 = 0.15 + 0.25 * math.sin(ang1 * 1.2)
    d1 = np.sqrt(((nx - cx1) * 1.3)**2 + ((ny - cy1) * 0.85)**2)
    glow1 = np.exp(-d1**2 * 3.0) * (1.2 + 0.2 * math.sin(t * 0.35))
    col1 = np.array([0.82, 0.08, 0.62], dtype=np.float32)
    
    # Leak 2: Luminous Neon Magenta / Hot Pink (Left / Mid)
    ang2 = t * 0.20 + 2.3
    cx2 = 0.10 + 0.30 * math.sin(ang2)
    cy2 = 0.25 + 0.30 * math.cos(ang2 * 0.9)
    d2 = np.sqrt(((nx - cx2) * 1.1)**2 + ((ny - cy2) * 1.2)**2)
    glow2 = np.exp(-d2**2 * 3.4) * (1.08 + 0.25 * math.cos(t * 0.3 + 1.0))
    col2 = np.array([0.65, 0.12, 0.95], dtype=np.float32)
    
    # Leak 3: Golden Sunset / Amber Honey (Bottom-Right)
    ang3 = t * 0.14 + 4.2
    cx3 = 0.90 + 0.35 * math.cos(ang3 * 1.1)
    cy3 = 0.85 + 0.25 * math.sin(ang3 * 0.85)
    d3 = np.sqrt(((nx - cx3) * 1.2)**2 + ((ny - cy3) * 0.95)**2)
    glow3 = np.exp(-d3**2 * 2.7) * (1.25 + 0.2 * math.sin(t * 0.28 + 2.5))
    col3 = np.array([0.12, 0.52, 0.98], dtype=np.float32)
    
    # Leak 4: Soft Coral Rose / Lavender (Bottom-Left)
    ang4 = t * 0.18 + 1.0
    cx4 = 0.05 + 0.25 * math.cos(ang4 * 0.75)
    cy4 = 0.75 + 0.25 * math.sin(ang4 * 1.15)
    d4 = np.sqrt(((nx - cx4) * 0.95)**2 + ((ny - cy4) * 1.1)**2)
    glow4 = np.exp(-d4**2 * 3.5) * (0.92 + 0.2 * math.cos(t * 0.32 + 1.5))
    col4 = np.array([0.48, 0.24, 0.92], dtype=np.float32)
    
    # Harmonic flow waves for subtle fluid motion
    wave = 0.06 * np.sin(nx * 4.0 + ny * 3.0 + t * 0.25) + 0.04 * np.cos(nx * 5.0 - ny * 4.0 - t * 0.18)
    
    light = (glow1[:, :, None] * col1 + 
             glow2[:, :, None] * col2 + 
             glow3[:, :, None] * col3 + 
             glow4[:, :, None] * col4)
    
    light *= (1.0 + wave[:, :, None])
    
    full_bg = base + light
    full_bg = np.power(full_bg, 1.38) * 1.68
    
    frame = cv2.resize(full_bg, (width, height), interpolation=cv2.INTER_CUBIC)
    
    # Render Stars
    sx = ctx['star_x']
    sy = ctx['star_y']
    sz = ctx['star_sz']
    sp = ctx['star_spd']
    ph = ctx['star_ph']
    col = ctx['star_col']
    layers = ctx['layers']
    n_stars = ctx['n_stars']
    
    for i in range(n_stars):
        lay = layers[i]
        cur_x = (sx[i] + math.sin(t * 0.12 * sp[i] + ph[i]) * (6.0 * lay)) % width
        cur_y = (sy[i] - t * (3.5 * sp[i] * lay)) % height
        
        tw = 0.20 + 0.80 * (0.5 + 0.5 * math.sin(t * 2.2 * sp[i] + ph[i]))**2
        if lay == 3 and math.sin(t * 1.0 + ph[i]) > 0.88:
            tw *= 1.75
            
        px, py = int(cur_x), int(cur_y)
        star_c = col[i] * tw
        star_s = sz[i]
        
        r_box = int(math.ceil(star_s * 3.0))
        x0 = max(0, px - r_box)
        x1 = min(width, px + r_box + 1)
        y0 = max(0, py - r_box)
        y1 = min(height, py + r_box + 1)
        
        if x1 > x0 and y1 > y0:
            gx, gy = np.meshgrid(np.arange(x0, x1), np.arange(y0, y1))
            d2 = (gx - px)**2 + (gy - py)**2
            
            glow_k = np.exp(-d2 / (2.0 * (star_s * 0.55)**2))
            
            if lay >= 2:
                halo = np.exp(-d2 / (2.0 * (star_s * 2.0)**2)) * 0.25
                glow_k += halo
                
            if lay == 3:
                cross = (np.exp(-np.abs(gx - px) / 0.65) * np.exp(-np.abs(gy - py) / (star_s * 7.5)) + 
                         np.exp(-np.abs(gy - py) / 0.65) * np.exp(-np.abs(gx - px) / (star_s * 7.5))) * 0.55
                glow_k = np.maximum(glow_k, cross)
                
            frame[y0:y1, x0:x1] += glow_k[:, :, None] * star_c
            
    # Add subtle film grain & optical vignette
    frame += ctx['grain_tile']
    frame *= ctx['vignette'][:, :, None]
    
    frame = np.clip(frame, 0.0, 1.0)
    return (frame * 255.0).astype(np.uint8)

def main():
    width = 1080
    height = 1920
    fps = 30
    duration = 31.733
    total_frames = int(round(fps * duration))
    
    source_audio = r"C:\Users\0731g\Downloads\سبکش.mp4"
    output_video_temp = r"c:\Users\0731g\nazifyosufi\temp_raw.mp4"
    final_output = r"C:\Users\0731g\Downloads\سبک_زیبا_و_باکیفیت.mp4"
    final_output_local = r"c:\Users\0731g\nazifyosufi\سبک_زیبا_و_باکیفیت.mp4"
    
    print(f"Rendering {total_frames} frames ({width}x{height} @ {fps}fps)...", flush=True)
    t_start = time.time()
    
    ctx = build_renderer(width, height)
    
    # Using cv2.VideoWriter with mp4v
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(output_video_temp, fourcc, fps, (width, height))
    
    for i in range(total_frames):
        t_sec = i / fps
        frame = render_frame(ctx, t_sec)
        writer.write(frame)
        
        if (i + 1) % 75 == 0 or (i + 1) == total_frames:
            elapsed = time.time() - t_start
            cur_fps = (i + 1) / elapsed
            rem = (total_frames - (i + 1)) / (cur_fps + 1e-5)
            print(f"Progress: {i + 1}/{total_frames} ({((i + 1)/total_frames)*100:.1f}%) - Speed: {cur_fps:.1f} fps - ETA: {rem:.1f}s", flush=True)
            
    writer.release()
    print("Frames written successfully. Now re-encoding with H.264 & muxing audio...", flush=True)
    
    # Mux with audio and re-encode to crisp H.264
    mux_cmd = [
        "ffmpeg", "-y",
        "-i", output_video_temp,
        "-i", source_audio,
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "16",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "192k",
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-shortest",
        final_output
    ]
    subprocess.run(mux_cmd, check=True)
    
    import shutil
    shutil.copy2(final_output, final_output_local)
    
    if os.path.exists(output_video_temp):
        os.remove(output_video_temp)
        
    total_time = time.time() - t_start
    print(f"SUCCESS! Video created in {total_time:.1f}s: {final_output}", flush=True)

if __name__ == '__main__':
    main()
