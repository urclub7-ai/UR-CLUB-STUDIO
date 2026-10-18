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
        "en": "and then you run away...",
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
    
    # Leak 1: Deep Violet / Royal Purple
    ang1 = t_phase * 0.22
    cx1 = 0.85 + 0.35 * math.cos(ang1)
    cy1 = 0.15 + 0.25 * math.sin(ang1 * 1.2)
    d1 = np.sqrt(((nx - cx1) * 1.3)**2 + ((ny - cy1) * 0.85)**2)
    glow1 = np.exp(-d1**2 * 3.2) * (1.15 * p_mult)
    col1 = np.array([0.85, 0.08, 0.65], dtype=np.float32)
    
    # Leak 2: Luminous Magenta / Hot Pink
    ang2 = t_phase * 0.26 + 2.3
    cx2 = 0.10 + 0.30 * math.sin(ang2)
    cy2 = 0.25 + 0.30 * math.cos(ang2 * 0.9)
    d2 = np.sqrt(((nx - cx2) * 1.1)**2 + ((ny - cy2) * 1.2)**2)
    glow2 = np.exp(-d2**2 * 3.6) * (1.05 * p_mult)
    col2 = np.array([0.65, 0.12, 0.95], dtype=np.float32)
    
    # Leak 3: Golden Sunset / Amber
    ang3 = t_phase * 0.20 + 4.2
    cx3 = 0.90 + 0.35 * math.cos(ang3 * 1.1)
    cy3 = 0.85 + 0.25 * math.sin(ang3 * 0.85)
    d3 = np.sqrt(((nx - cx3) * 1.2)**2 + ((ny - cy3) * 0.95)**2)
    glow3 = np.exp(-d3**2 * 3.0) * (1.10 * p_mult)
    col3 = np.array([0.10, 0.48, 0.95], dtype=np.float32)
    
    # Leak 4: Rose / Lavender Swirl
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
    
    # Stars
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

# Pre-render base textures for each lyric line for super smooth & fast animation
def precompute_lyric_elements(width=1080, height=1920):
    font_en_path = 'c:/Users/0731g/nazifyosufi/fonts/Poppins-Bold.ttf'
    font_fa_path = 'c:/Users/0731g/nazifyosufi/fonts/Shabnam-Bold.ttf'
    
    size_en = 44
    size_fa = 36
    
    font_en = ImageFont.truetype(font_en_path, size_en)
    font_fa = ImageFont.truetype(font_fa_path, size_fa)
    
    elements = []
    
    for item in LYRICS:
        en_text = item['en']
        fa_text = item['fa']
        
        reshaped_fa = arabic_reshaper.reshape(fa_text)
        bidi_fa = get_display(reshaped_fa)
        
        # Bounding boxes
        dummy = Image.new('RGBA', (10, 10))
        d = ImageDraw.Draw(dummy)
        
        bbox_en = d.textbbox((0, 0), en_text, font=font_en)
        w_en = bbox_en[2] - bbox_en[0]
        h_en = bbox_en[3] - bbox_en[1]
        
        bbox_fa = d.textbbox((0, 0), bidi_fa, font=font_fa)
        w_fa = bbox_fa[2] - bbox_fa[0]
        h_fa = bbox_fa[3] - bbox_fa[1]
        
        gap = 20
        total_w = max(w_en, w_fa) + 80
        total_h = h_en + gap + h_fa + 60
        
        # Render clean text onto a tight bounding box canvas
        box_img = Image.new('RGBA', (total_w, total_h), (0, 0, 0, 0))
        
        cx_box = total_w // 2
        cy_box = total_h // 2
        
        y_en = cy_box - (h_en + gap + h_fa) // 2
        x_en = cx_box - w_en // 2
        
        y_fa = y_en + h_en + gap
        x_fa = cx_box - w_fa // 2
        
        # 1. Shadow
        shadow_img = Image.new('RGBA', (total_w, total_h), (0, 0, 0, 0))
        sdraw = ImageDraw.Draw(shadow_img)
        sdraw.text((x_en, y_en + 3), en_text, font=font_en, fill=(0, 0, 0, 230))
        sdraw.text((x_fa, y_fa + 3), bidi_fa, font=font_fa, fill=(0, 0, 0, 230))
        shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=6))
        
        # 2. Crisp Text
        text_img = Image.new('RGBA', (total_w, total_h), (0, 0, 0, 0))
        tdraw = ImageDraw.Draw(text_img)
        tdraw.text((x_en, y_en), en_text, font=font_en, fill=(255, 255, 255, 255))
        tdraw.text((x_fa, y_fa), bidi_fa, font=font_fa, fill=(245, 245, 250, 245))
        
        combined = Image.alpha_composite(shadow_img, text_img)
        
        elements.append({
            'start': item['start'],
            'end': item['end'],
            'img': combined,
            'w': total_w,
            'h': total_h
        })
        
    return elements

def apply_animated_subtitles(frame_bgr, t_sec, elements, width=1080, height=1920):
    for elem in elements:
        st = elem['start']
        et = elem['end']
        
        if st <= t_sec <= et:
            dur = et - st
            rel_t = t_sec - st
            
            fade_in = 0.35
            fade_out = 0.30
            
            # Default hold transform
            scale = 1.0
            alpha = 1.0
            offset_y = math.sin(rel_t * 1.5) * 1.5
            
            # Intro animation (Pop / Scale up + Float up + Ease-In)
            if rel_t < fade_in:
                p = rel_t / fade_in
                # Cubic ease-out
                ease = 1.0 - (1.0 - p)**3
                scale = 0.88 + 0.12 * ease
                alpha = ease
                offset_y = (1.0 - ease) * 18.0
            # Outro animation (Scale down / Float up + Ease-Out)
            elif rel_t > (dur - fade_out):
                p = (rel_t - (dur - fade_out)) / fade_out
                ease = p**2.2
                scale = 1.0 - 0.08 * ease
                alpha = max(0.0, 1.0 - ease)
                offset_y = -ease * 14.0
                
            if alpha > 0.005:
                # Scale the pre-rendered image
                elem_img = elem['img']
                nw = max(1, int(elem['w'] * scale))
                nh = max(1, int(elem['h'] * scale))
                
                scaled_img = elem_img.resize((nw, nh), resample=Image.Resampling.BILINEAR)
                
                # Position on frame (Instagram Reels safe area center)
                cx = width // 2
                cy = int(height * 0.48 + offset_y)
                
                x0 = cx - nw // 2
                y0 = cy - nh // 2
                
                # Overlay onto frame
                # Extract coordinates within bounds
                src_x0 = max(0, -x0)
                src_y0 = max(0, -y0)
                dst_x0 = max(0, x0)
                dst_y0 = max(0, y0)
                dst_x1 = min(width, x0 + nw)
                dst_y1 = min(height, y0 + nh)
                src_x1 = src_x0 + (dst_x1 - dst_x0)
                src_y1 = src_y0 + (dst_y1 - dst_y0)
                
                if dst_x1 > dst_x0 and dst_y1 > dst_y0:
                    scaled_np = np.array(scaled_img, dtype=np.float32) / 255.0
                    sub_patch = scaled_np[src_y0:src_y1, src_x0:src_x1]
                    
                    sub_rgb = sub_patch[:, :, :3]
                    sub_bgr = sub_rgb[:, :, ::-1]
                    sub_a = sub_patch[:, :, 3:4] * alpha
                    
                    bg_patch = frame_bgr[dst_y0:dst_y1, dst_x0:dst_x1].astype(np.float32) / 255.0
                    blended_patch = bg_patch * (1.0 - sub_a) + sub_bgr * sub_a
                    
                    frame_bgr[dst_y0:dst_y1, dst_x0:dst_x1] = (np.clip(blended_patch, 0.0, 1.0) * 255.0).astype(np.uint8)
                    
            return frame_bgr
            
    return frame_bgr

def main():
    width = 1080
    height = 1920
    fps = 30
    
    wav_path = r"c:\Users\0731g\nazifyosufi\audio_new.wav"
    source_audio = r"C:\Users\0731g\Downloads\Download (6).mp4"
    output_video_temp = r"c:\Users\0731g\nazifyosufi\temp_insta_perfect.mp4"
    
    final_output_reels = r"C:\Users\0731g\Downloads\instagram_reels_lyric_video.mp4"
    final_output_persian = r"C:\Users\0731g\Downloads\ویدیوی_مخصوص_اینستاگرام_با_زیرنویس.mp4"
    final_output_local = r"c:\Users\0731g\nazifyosufi\instagram_reels_lyric_video.mp4"
    
    features = load_audio_features(wav_path, fps=fps)
    total_frames = features['total_frames']
    duration = total_frames / fps
    
    print(f"Rendering Instagram Reels Lyric Video: {total_frames} frames ({duration:.2f}s) @ {fps}fps...", flush=True)
    t_start = time.time()
    
    ctx = build_renderer(width, height)
    elements = precompute_lyric_elements(width, height)
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(output_video_temp, fourcc, fps, (width, height))
    
    for i in range(total_frames):
        t_sec = i / fps
        t_phase = features['phase'][i]
        pulse = features['pulse'][i]
        
        bg_frame = render_background_frame(ctx, t_phase, pulse)
        final_frame = apply_animated_subtitles(bg_frame, t_sec, elements, width, height)
        
        writer.write(final_frame)
        
        if (i + 1) % 100 == 0 or (i + 1) == total_frames:
            elapsed = time.time() - t_start
            cur_fps = (i + 1) / elapsed
            rem = (total_frames - (i + 1)) / (cur_fps + 1e-5)
            print(f"Progress: {i + 1}/{total_frames} ({((i + 1)/total_frames)*100:.1f}%) - Speed: {cur_fps:.1f} fps - ETA: {rem:.1f}s", flush=True)
            
    writer.release()
    print("Muxing with audio & H.264 high-quality compression for Instagram...", flush=True)
    
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
        final_output_reels
    ]
    subprocess.run(mux_cmd, check=True)
    
    import shutil
    shutil.copy2(final_output_reels, final_output_persian)
    shutil.copy2(final_output_reels, final_output_local)
    
    if os.path.exists(output_video_temp):
        os.remove(output_video_temp)
        
    total_time = time.time() - t_start
    print(f"ALL DONE in {total_time:.1f}s! Instagram ready video created.", flush=True)

if __name__ == '__main__':
    main()
