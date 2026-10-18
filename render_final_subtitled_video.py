import numpy as np
import cv2
import math
import wave
import time
import subprocess
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import arabic_reshaper
from bidi.algorithm import get_display

# 1. Lyric Timeline & Translation Data
LYRICS = [
    {
        "start": 0.0, "end": 2.7,
        "en": "you don't make it easy to leave",
        "fa": "رفتن رو برام آسون نمی‌کنی"
    },
    {
        "start": 2.7, "end": 5.4,
        "en": "baby, playin' when you got what you need",
        "fa": "عزیزم، بعد اینکه به خواستت رسیدی بازی درمیاری"
    },
    {
        "start": 5.4, "end": 8.2,
        "en": "baby, you know I don't like when you tease",
        "fa": "عزیزم، می‌دونی از سر به سر گذاشتن بدم می‌آد"
    },
    {
        "start": 8.2, "end": 10.4,
        "en": "baby...",
        "fa": "عزیزم..."
    },
    {
        "start": 10.4, "end": 13.8,
        "en": "you say you love me then",
        "fa": "اولش میگی دوستم داری"
    },
    {
        "start": 13.8, "end": 16.6,
        "en": "you wanna be my friend",
        "fa": "بعدش میگی می‌خوای فقط دوست باشیم"
    },
    {
        "start": 16.6, "end": 19.5,
        "en": "I give you all my lovin' girl",
        "fa": "تمام عشقم رو بهت می‌دم دختر"
    },
    {
        "start": 19.5, "end": 25.68,
        "en": "and then you run away",
        "fa": "و بعدش می‌ذاری میری..."
    }
]

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
    
    pulse_arr = np.zeros(total_frames, dtype=np.float32)
    current_val = 0.0
    for i in range(total_frames):
        target = norm_bass[i] * 0.75 + norm_rms[i] * 0.25
        if target > current_val:
            current_val = current_val * 0.3 + target * 0.7
        else:
            current_val = current_val * 0.82 + target * 0.18
        pulse_arr[i] = current_val
        
    phase_arr = np.zeros(total_frames, dtype=np.float32)
    accum_phase = 0.0
    for i in range(total_frames):
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

def render_background_frame(ctx, t_phase, pulse):
    nx, ny = ctx['nx'], ctx['ny']
    gw, gh = ctx['gw'], ctx['gh']
    width, height = ctx['width'], ctx['height']
    
    base = np.zeros((gh, gw, 3), dtype=np.float32)
    base[:, :, 0] = 0.012 + 0.008 * (1.0 - ny)
    base[:, :, 1] = 0.004 + 0.004 * (1.0 - ny)
    base[:, :, 2] = 0.012 + 0.008 * (1.0 - ny)
    
    p_mult = 1.0 + 0.18 * pulse
    
    # Leak 1: Violet / Purple
    ang1 = t_phase * 0.22
    cx1 = 0.85 + 0.35 * math.cos(ang1)
    cy1 = 0.15 + 0.25 * math.sin(ang1 * 1.2)
    d1 = np.sqrt(((nx - cx1) * 1.3)**2 + ((ny - cy1) * 0.85)**2)
    glow1 = np.exp(-d1**2 * 3.2) * (1.15 * p_mult)
    col1 = np.array([0.85, 0.08, 0.65], dtype=np.float32)
    
    # Leak 2: Magenta / Hot Pink
    ang2 = t_phase * 0.26 + 2.3
    cx2 = 0.10 + 0.30 * math.sin(ang2)
    cy2 = 0.25 + 0.30 * math.cos(ang2 * 0.9)
    d2 = np.sqrt(((nx - cx2) * 1.1)**2 + ((ny - cy2) * 1.2)**2)
    glow2 = np.exp(-d2**2 * 3.6) * (1.05 * p_mult)
    col2 = np.array([0.65, 0.12, 0.95], dtype=np.float32)
    
    # Leak 3: Golden Amber Sunset
    ang3 = t_phase * 0.20 + 4.2
    cx3 = 0.90 + 0.35 * math.cos(ang3 * 1.1)
    cy3 = 0.85 + 0.25 * math.sin(ang3 * 0.85)
    d3 = np.sqrt(((nx - cx3) * 1.2)**2 + ((ny - cy3) * 0.95)**2)
    glow3 = np.exp(-d3**2 * 3.0) * (1.10 * p_mult)
    col3 = np.array([0.10, 0.48, 0.95], dtype=np.float32)
    
    # Leak 4: Rose / Lavender
    ang4 = t_phase * 0.24 + 1.0
    cx4 = 0.05 + 0.25 * math.cos(ang4 * 0.75)
    cy4 = 0.75 + 0.25 * math.sin(ang4 * 1.15)
    d4 = np.sqrt(((nx - cx4) * 0.95)**2 + ((ny - cy4) * 1.1)**2)
    glow4 = np.exp(-d4**2 * 3.8) * (0.85 * p_mult)
    col4 = np.array([0.45, 0.22, 0.90], dtype=np.float32)
    
    wave = 0.05 * np.sin(nx * 4.0 + ny * 3.0 + t_phase * 0.35) + 0.03 * np.cos(nx * 5.0 - ny * 4.0 - t_phase * 0.25)
    
    light = (glow1[:, :, None] * col1 + 
             glow2[:, :, None] * col2 + 
             glow3[:, :, None] * col3 + 
             glow4[:, :, None] * col4)
    
    light *= (1.0 + wave[:, :, None])
    
    full_bg = base + light
    full_bg = np.power(full_bg, 1.30) * 1.55
    full_bg = full_bg / (1.0 + full_bg * 0.35)
    
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
        cur_x = (sx[i] + math.sin(t_phase * 0.18 * sp[i] + ph[i]) * (6.5 * lay)) % width
        cur_y = (sy[i] - t_phase * (4.8 * sp[i] * lay)) % height
        
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

# Cache pre-rendered subtitle textures for maximum rendering performance
def precompute_subtitle_assets(width=1080, height=1920):
    font_en_path = 'c:/Users/0731g/nazifyosufi/fonts/Montserrat-Bold.ttf'
    font_fa_path = 'c:/Users/0731g/nazifyosufi/fonts/Vazirmatn-Medium.ttf'
    
    size_en = 50
    size_fa = 38
    
    font_en = ImageFont.truetype(font_en_path, size_en)
    font_fa = ImageFont.truetype(font_fa_path, size_fa)
    
    assets = []
    
    for item in LYRICS:
        en_text = item['en']
        fa_text = item['fa']
        
        reshaped_fa = arabic_reshaper.reshape(fa_text)
        bidi_fa = get_display(reshaped_fa)
        
        # Temp draw for bbox
        tmp_img = Image.new('RGBA', (100, 100))
        tdraw = ImageDraw.Draw(tmp_img)
        
        bbox_en = tdraw.textbbox((0, 0), en_text, font=font_en)
        w_en = bbox_en[2] - bbox_en[0]
        h_en = bbox_en[3] - bbox_en[1]
        
        bbox_fa = tdraw.textbbox((0, 0), bidi_fa, font=font_fa)
        w_fa = bbox_fa[2] - bbox_fa[0]
        h_fa = bbox_fa[3] - bbox_fa[1]
        
        gap = 20
        total_h = h_en + gap + h_fa
        
        cx = width // 2
        cy = int(height * 0.48)
        
        y_en = cy - total_h // 2
        x_en = cx - w_en // 2
        
        y_fa = y_en + h_en + gap
        x_fa = cx - w_fa // 2
        
        # Create full overlay canvas
        shadow_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        sdraw = ImageDraw.Draw(shadow_img)
        sdraw.text((x_en, y_en + 3), en_text, font=font_en, fill=(0, 0, 0, 220))
        sdraw.text((x_fa, y_fa + 3), bidi_fa, font=font_fa, fill=(0, 0, 0, 220))
        shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=6))
        
        text_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        tdraw = ImageDraw.Draw(text_img)
        tdraw.text((x_en, y_en), en_text, font=font_en, fill=(255, 255, 255, 255))
        tdraw.text((x_fa, y_fa), bidi_fa, font=font_fa, fill=(245, 245, 250, 245))
        
        base_tex = Image.alpha_composite(shadow_img, text_img)
        tex_np = np.array(base_tex, dtype=np.float32) / 255.0  # RGBA normalized
        
        assets.append({
            'start': item['start'],
            'end': item['end'],
            'tex': tex_np
        })
        
    return assets

def apply_subtitle_to_frame(frame_bgr, t_sec, sub_assets):
    # Find active subtitle
    for sub in sub_assets:
        st = sub['start']
        et = sub['end']
        
        if st <= t_sec <= et:
            dur = et - st
            rel_t = t_sec - st
            
            # Fade-in (first 0.30s), Fade-out (last 0.25s)
            fade_in = 0.30
            fade_out = 0.25
            
            alpha = 1.0
            if rel_t < fade_in:
                alpha = rel_t / fade_in
            elif rel_t > (dur - fade_out):
                alpha = max(0.0, (dur - rel_t) / fade_out)
                
            # Smooth ease
            alpha = 0.5 - 0.5 * math.cos(alpha * math.pi)
            
            if alpha > 0.001:
                tex = sub['tex']
                tex_rgb = tex[:, :, :3] # RGB
                tex_bgr = tex_rgb[:, :, ::-1] # BGR
                tex_a = tex[:, :, 3:4] * alpha
                
                # Blend
                f_norm = frame_bgr.astype(np.float32) / 255.0
                blended = f_norm * (1.0 - tex_a) + tex_bgr * tex_a
                return (np.clip(blended, 0.0, 1.0) * 255.0).astype(np.uint8)
                
    return frame_bgr

def main():
    width = 1080
    height = 1920
    fps = 30
    
    wav_path = r"c:\Users\0731g\nazifyosufi\audio_new.wav"
    source_audio = r"C:\Users\0731g\Downloads\Download (6).mp4"
    output_video_temp = r"c:\Users\0731g\nazifyosufi\temp_subtitled_raw.mp4"
    
    final_output_downloads = r"C:\Users\0731g\Downloads\aesthetic_lyric_video.mp4"
    final_output_persian = r"C:\Users\0731g\Downloads\موزیک_ویدیو_با_زیرنویس.mp4"
    final_output_local = r"c:\Users\0731g\nazifyosufi\aesthetic_lyric_video.mp4"
    
    features = load_audio_features(wav_path, fps=fps)
    total_frames = features['total_frames']
    duration = total_frames / fps
    
    print(f"Rendering Full HD Subtitled Lyric Video: {total_frames} frames ({duration:.2f}s) @ {fps}fps...", flush=True)
    t_start = time.time()
    
    ctx = build_renderer(width, height)
    sub_assets = precompute_subtitle_assets(width, height)
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(output_video_temp, fourcc, fps, (width, height))
    
    for i in range(total_frames):
        t_sec = i / fps
        t_phase = features['phase'][i]
        pulse = features['pulse'][i]
        
        bg_frame = render_background_frame(ctx, t_phase, pulse)
        final_frame = apply_subtitle_to_frame(bg_frame, t_sec, sub_assets)
        
        writer.write(final_frame)
        
        if (i + 1) % 100 == 0 or (i + 1) == total_frames:
            elapsed = time.time() - t_start
            cur_fps = (i + 1) / elapsed
            rem = (total_frames - (i + 1)) / (cur_fps + 1e-5)
            print(f"Progress: {i + 1}/{total_frames} ({((i + 1)/total_frames)*100:.1f}%) - Speed: {cur_fps:.1f} fps - ETA: {rem:.1f}s", flush=True)
            
    writer.release()
    print("Muxing with audio & H.264 high-quality compression...", flush=True)
    
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
    shutil.copy2(final_output_downloads, final_output_persian)
    shutil.copy2(final_output_downloads, final_output_local)
    
    if os.path.exists(output_video_temp):
        os.remove(output_video_temp)
        
    total_time = time.time() - t_start
    print(f"FINISHED in {total_time:.1f}s! Video created successfully.", flush=True)

if __name__ == '__main__':
    main()
