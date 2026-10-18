import numpy as np
import cv2
import math
import wave
import time
import subprocess
import os

def load_audio_features(wav_path, fps=30, total_frames=None):
    with wave.open(wav_path, 'rb') as wf:
        sr = wf.getframerate()
        n_samples = wf.getnframes()
        raw = wf.readframes(n_samples)
        audio = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
        
    frame_samples = int(sr / fps)
    if total_frames is None:
        total_frames = int(len(audio) / frame_samples)
        
    rms_arr = np.zeros(total_frames, dtype=np.float32)
    bass_arr = np.zeros(total_frames, dtype=np.float32)
    
    # 200Hz lowpass filter for bass detection
    window_size = max(1, int(sr / 200))
    kernel = np.ones(window_size) / window_size
    lowpass = np.convolve(audio, kernel, mode='same')
        
    for i in range(total_frames):
        s_start = i * frame_samples
        s_end = min(len(audio), (i + 1) * frame_samples)
        if s_end > s_start:
            chunk = audio[s_start:s_end]
            chunk_bass = lowpass[s_start:s_end]
            rms_arr[i] = np.sqrt(np.mean(chunk**2) + 1e-8)
            bass_arr[i] = np.sqrt(np.mean(chunk_bass**2) + 1e-8)
            
    norm_rms = rms_arr / (np.max(rms_arr) + 1e-6)
    norm_bass = bass_arr / (np.max(bass_arr) + 1e-6)
    
    # Smooth attack and decay envelope
    pulse_arr = np.zeros(total_frames, dtype=np.float32)
    current_val = 0.0
    for i in range(total_frames):
        target = norm_bass[i] * 0.75 + norm_rms[i] * 0.25
        if target > current_val:
            current_val = current_val * 0.3 + target * 0.7  # fast attack
        else:
            current_val = current_val * 0.82 + target * 0.18  # smooth decay
        pulse_arr[i] = current_val
        
    # Dynamic speed phase integration:
    # Calm intro: ~0.8x speed
    # Beat drop: ~2.4x speed
    phase_arr = np.zeros(total_frames, dtype=np.float32)
    accum_phase = 0.0
    for i in range(total_frames):
        # When energy is high, motion accelerates dynamically
        speed_factor = 0.75 + 1.85 * (norm_rms[i]**1.4)
        accum_phase += (speed_factor / fps)
        phase_arr[i] = accum_phase
        
    return {
        'total_frames': total_frames,
        'rms': norm_rms,
        'bass': norm_bass,
        'pulse': pulse_arr,
        'phase': phase_arr
    }

def build_renderer(width=1080, height=1920):
    scale = 4
    gw = width // scale
    gh = height // scale
    
    y, x = np.ogrid[:gh, :gw]
    nx = (x / (gw - 1.0)).astype(np.float32)
    ny = (y / (gh - 1.0)).astype(np.float32)
    
    np.random.seed(2026)
    n_stars = 750
    layers = np.random.choice([1, 2, 3], size=n_stars, p=[0.65, 0.25, 0.10])
    
    star_x = np.random.uniform(0, width, n_stars).astype(np.float32)
    star_y = np.random.uniform(0, height, n_stars).astype(np.float32)
    star_sz = np.zeros(n_stars, dtype=np.float32)
    star_spd = np.random.uniform(0.6, 2.0, n_stars).astype(np.float32)
    star_ph = np.random.uniform(0, 2 * math.pi, n_stars).astype(np.float32)
    star_col = np.ones((n_stars, 3), dtype=np.float32)
    
    for i in range(n_stars):
        if layers[i] == 1:
            star_sz[i] = np.random.uniform(0.7, 1.3)
            star_col[i] = [np.random.uniform(0.75, 1.0), np.random.uniform(0.75, 0.95), np.random.uniform(0.85, 1.0)]
        elif layers[i] == 2:
            star_sz[i] = np.random.uniform(1.4, 2.4)
            star_col[i] = [np.random.uniform(0.85, 1.0), np.random.uniform(0.9, 1.0), 1.0]
        else:
            star_sz[i] = np.random.uniform(2.8, 4.4)
            star_col[i] = [np.random.uniform(0.95, 1.0), np.random.uniform(0.95, 1.0), 1.0]
            
    vy, vx = np.ogrid[:height, :width]
    vignette = 1.0 - 0.22 * (((vx - width/2.0)/(width/2.0))**2 + ((vy - height/2.0)/(height/2.0))**2)
    vignette = np.clip(vignette, 0.78, 1.0).astype(np.float32)
    
    grain_tile = np.random.normal(0, 0.008, (height, width, 3)).astype(np.float32)
    
    return {
        'width': width, 'height': height,
        'gw': gw, 'gh': gh, 'nx': nx, 'ny': ny,
        'n_stars': n_stars, 'star_x': star_x, 'star_y': star_y,
        'star_sz': star_sz, 'star_spd': star_spd, 'star_ph': star_ph,
        'star_col': star_col, 'layers': layers,
        'vignette': vignette, 'grain_tile': grain_tile
    }

def render_frame_synced(ctx, t_phase, pulse, rms):
    nx, ny = ctx['nx'], ctx['ny']
    gw, gh = ctx['gw'], ctx['gh']
    width, height = ctx['width'], ctx['height']
    
    # 1. Base deep space (pitch-black with faint cosmic midnight indigo)
    base = np.zeros((gh, gw, 3), dtype=np.float32)
    base[:, :, 0] = 0.012 + 0.008 * (1.0 - ny)
    base[:, :, 1] = 0.004 + 0.004 * (1.0 - ny)
    base[:, :, 2] = 0.012 + 0.008 * (1.0 - ny)
    
    # Subtle organic pulse that modulates brightness without washing out
    p_mult = 1.0 + 0.18 * pulse
    
    # Leak 1: Royal Violet / Deep Purple (Top & Right)
    ang1 = t_phase * 0.22
    cx1 = 0.85 + 0.35 * math.cos(ang1)
    cy1 = 0.15 + 0.25 * math.sin(ang1 * 1.2)
    d1 = np.sqrt(((nx - cx1) * 1.3)**2 + ((ny - cy1) * 0.85)**2)
    glow1 = np.exp(-d1**2 * 3.2) * (1.15 * p_mult)
    col1 = np.array([0.85, 0.08, 0.65], dtype=np.float32) # BGR Deep Violet
    
    # Leak 2: Luminous Neon Magenta / Hot Pink (Left / Mid)
    ang2 = t_phase * 0.26 + 2.3
    cx2 = 0.10 + 0.30 * math.sin(ang2)
    cy2 = 0.25 + 0.30 * math.cos(ang2 * 0.9)
    d2 = np.sqrt(((nx - cx2) * 1.1)**2 + ((ny - cy2) * 1.2)**2)
    glow2 = np.exp(-d2**2 * 3.6) * (1.05 * p_mult)
    col2 = np.array([0.65, 0.12, 0.95], dtype=np.float32) # BGR Magenta Pink
    
    # Leak 3: Golden Sunset / Amber Honey (Bottom-Right)
    ang3 = t_phase * 0.20 + 4.2
    cx3 = 0.90 + 0.35 * math.cos(ang3 * 1.1)
    cy3 = 0.85 + 0.25 * math.sin(ang3 * 0.85)
    d3 = np.sqrt(((nx - cx3) * 1.2)**2 + ((ny - cy3) * 0.95)**2)
    glow3 = np.exp(-d3**2 * 3.0) * (1.10 * p_mult)
    col3 = np.array([0.10, 0.48, 0.95], dtype=np.float32) # BGR Golden Amber
    
    # Leak 4: Soft Coral Rose / Lavender (Bottom-Left)
    ang4 = t_phase * 0.24 + 1.0
    cx4 = 0.05 + 0.25 * math.cos(ang4 * 0.75)
    cy4 = 0.75 + 0.25 * math.sin(ang4 * 1.15)
    d4 = np.sqrt(((nx - cx4) * 0.95)**2 + ((ny - cy4) * 1.1)**2)
    glow4 = np.exp(-d4**2 * 3.8) * (0.85 * p_mult)
    col4 = np.array([0.45, 0.22, 0.90], dtype=np.float32) # BGR Rose Lilac
    
    # Fluid wave oscillation synced to phase
    wave = 0.05 * np.sin(nx * 4.0 + ny * 3.0 + t_phase * 0.35) + 0.03 * np.cos(nx * 5.0 - ny * 4.0 - t_phase * 0.25)
    
    light = (glow1[:, :, None] * col1 + 
             glow2[:, :, None] * col2 + 
             glow3[:, :, None] * col3 + 
             glow4[:, :, None] * col4)
    
    light *= (1.0 + wave[:, :, None])
    
    full_bg = base + light
    
    # Non-linear cinematic tone curve: preserves rich saturated colors without harsh blowout
    full_bg = np.power(full_bg, 1.30) * 1.55
    full_bg = full_bg / (1.0 + full_bg * 0.35) # Soft shoulder compression
    
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
        # Dynamic floating movement according to music tempo
        cur_x = (sx[i] + math.sin(t_phase * 0.18 * sp[i] + ph[i]) * (6.5 * lay)) % width
        cur_y = (sy[i] - t_phase * (4.8 * sp[i] * lay)) % height
        
        # Twinkle pulse with music reactive energy
        tw = 0.20 + 0.80 * (0.5 + 0.5 * math.sin(t_phase * 3.2 * sp[i] + ph[i]))**2
        tw *= (1.0 + 0.35 * pulse)
        
        if lay == 3 and (math.sin(t_phase * 1.5 + ph[i]) > 0.85 or pulse > 0.75):
            tw *= 1.75
            
        px, py = int(cur_x), int(cur_y)
        star_c = col[i] * tw
        star_s = sz[i] * (1.0 + 0.12 * pulse)
        
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
            
    frame += ctx['grain_tile']
    frame *= ctx['vignette'][:, :, None]
    
    frame = np.clip(frame, 0.0, 1.0)
    return (frame * 255.0).astype(np.uint8)

def main():
    width = 1080
    height = 1920
    fps = 30
    
    wav_path = r"c:\Users\0731g\nazifyosufi\audio_new.wav"
    source_audio = r"C:\Users\0731g\Downloads\Download (6).mp4"
    output_video_temp = r"c:\Users\0731g\nazifyosufi\temp_synced_perfect.mp4"
    final_output_downloads = r"C:\Users\0731g\Downloads\music_synced_cosmic.mp4"
    final_output_local = r"c:\Users\0731g\nazifyosufi\music_synced_cosmic.mp4"
    
    features = load_audio_features(wav_path, fps=fps)
    total_frames = features['total_frames']
    duration = total_frames / fps
    
    print(f"Rendering perfect color-graded audio-synced video: {total_frames} frames ({duration:.2f}s)...", flush=True)
    t_start = time.time()
    
    ctx = build_renderer(width, height)
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(output_video_temp, fourcc, fps, (width, height))
    
    for i in range(total_frames):
        t_phase = features['phase'][i]
        pulse = features['pulse'][i]
        rms = features['rms'][i]
        
        frame = render_frame_synced(ctx, t_phase, pulse, rms)
        writer.write(frame)
        
        if (i + 1) % 100 == 0 or (i + 1) == total_frames:
            elapsed = time.time() - t_start
            cur_fps = (i + 1) / elapsed
            rem = (total_frames - (i + 1)) / (cur_fps + 1e-5)
            print(f"Render progress: {i + 1}/{total_frames} ({((i + 1)/total_frames)*100:.1f}%) - Speed: {cur_fps:.1f} fps - ETA: {rem:.1f}s", flush=True)
            
    writer.release()
    print("Muxing with audio...", flush=True)
    
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
        final_output_downloads
    ]
    subprocess.run(mux_cmd, check=True)
    
    import shutil
    shutil.copy2(final_output_downloads, final_output_local)
    
    if os.path.exists(output_video_temp):
        os.remove(output_video_temp)
        
    total_time = time.time() - t_start
    print(f"Finished successfully in {total_time:.1f}s.", flush=True)

if __name__ == '__main__':
    main()
