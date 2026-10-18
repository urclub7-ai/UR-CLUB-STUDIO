import sys
import numpy as np
import cv2
import math
import wave
import time
import subprocess
import os
from PySide6.QtGui import QGuiApplication, QImage, QPainter, QFont, QFontDatabase, QColor
from PySide6.QtCore import Qt, QRect
from PIL import Image, ImageFilter

app = QGuiApplication.instance() or QGuiApplication(sys.argv)

font_path = 'c:/Users/0731g/nazifyosufi/fonts/IranNastaliq.ttf'
font_id = QFontDatabase.addApplicationFont(font_path)
fa_family = QFontDatabase.applicationFontFamilies(font_id)[0]

gv_path = 'c:/Users/0731g/nazifyosufi/fonts/GreatVibes.ttf'
gv_id = QFontDatabase.addApplicationFont(gv_path)
en_family = QFontDatabase.applicationFontFamilies(gv_id)[0]

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

def extract_advanced_audio_features(wav_path, fps=30, total_frames=None):
    with wave.open(wav_path, 'rb') as wf:
        sr = wf.getframerate()
        n_samples = wf.getnframes()
        raw = wf.readframes(n_samples)
        audio = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
        
    frame_samples = int(sr / fps)
    if total_frames is None:
        total_frames = int(len(audio) / frame_samples)
        
    bass_arr = np.zeros(total_frames, dtype=np.float32)
    snare_arr = np.zeros(total_frames, dtype=np.float32)
    rms_arr = np.zeros(total_frames, dtype=np.float32)
    onset_arr = np.zeros(total_frames, dtype=np.float32)
    
    prev_bass = 0.0
    
    for i in range(total_frames):
        s0 = i * frame_samples
        s1 = min(len(audio), (i + 1) * frame_samples)
        if s1 > s0:
            chunk = audio[s0:s1]
            if len(chunk) < frame_samples:
                chunk = np.pad(chunk, (0, frame_samples - len(chunk)))
                
            rms_arr[i] = np.sqrt(np.mean(chunk**2) + 1e-8)
            
            win = np.hanning(len(chunk))
            fft = np.abs(np.fft.rfft(chunk * win))
            freqs = np.fft.rfftfreq(len(chunk), 1.0 / sr)
            
            b_mask = (freqs >= 35) & (freqs <= 160)
            bass_val = np.sum(fft[b_mask])
            bass_arr[i] = bass_val
            
            s_mask = (freqs >= 250) & (freqs <= 2500)
            snare_arr[i] = np.sum(fft[s_mask])
            
            diff = max(0.0, bass_val - prev_bass)
            prev_bass = bass_val
            onset_arr[i] = diff
            
    norm_rms = rms_arr / (np.max(rms_arr) + 1e-6)
    norm_bass = bass_arr / (np.max(bass_arr) + 1e-6)
    norm_snare = snare_arr / (np.max(snare_arr) + 1e-6)
    norm_onset = onset_arr / (np.max(onset_arr) + 1e-6)
    
    beat_pulse = np.zeros(total_frames, dtype=np.float32)
    curr_pulse = 0.0
    for i in range(total_frames):
        trigger = norm_onset[i] * 1.3 + norm_bass[i] * 0.6 + norm_snare[i] * 0.3
        if trigger > curr_pulse:
            curr_pulse = trigger
        else:
            curr_pulse = curr_pulse * 0.70
        beat_pulse[i] = min(1.0, curr_pulse)
        
    phase_arr = np.zeros(total_frames, dtype=np.float32)
    accum_p = 0.0
    for i in range(total_frames):
        spd = 0.8 + 2.4 * (norm_rms[i]**1.3) + 1.0 * beat_pulse[i]
        accum_p += (spd / fps)
        phase_arr[i] = accum_p
        
    return {
        'total_frames': total_frames,
        'rms': norm_rms,
        'bass': norm_bass,
        'snare': norm_snare,
        'beat_pulse': beat_pulse,
        'phase': phase_arr
    }

def build_square_renderer(width=1080, height=1080):
    scale = 4
    gw = width // scale
    gh = height // scale
    
    y, x = np.ogrid[:gh, :gw]
    nx = (x / (gw - 1.0)).astype(np.float32)
    ny = (y / (gh - 1.0)).astype(np.float32)
    
    np.random.seed(2026)
    n_stars = 650
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
    vignette = 1.0 - 0.25 * (((vx - width/2.0)/(width/2.0))**2 + ((vy - height/2.0)/(height/2.0))**2)
    vignette = np.clip(vignette, 0.75, 1.0).astype(np.float32)
    
    grain_tile = np.random.normal(0, 0.008, (height, width, 3)).astype(np.float32)
    
    return {
        'width': width, 'height': height,
        'gw': gw, 'gh': gh, 'nx': nx, 'ny': ny,
        'n_stars': n_stars, 'star_x': star_x, 'star_y': star_y,
        'star_sz': star_sz, 'star_spd': star_spd, 'star_ph': star_ph,
        'star_col': star_col, 'layers': layers,
        'vignette': vignette, 'grain_tile': grain_tile
    }

def render_square_background(ctx, t_phase, beat_pulse, rms):
    nx, ny = ctx['nx'], ctx['ny']
    gw, gh = ctx['gw'], ctx['gh']
    width, height = ctx['width'], ctx['height']
    
    base = np.zeros((gh, gw, 3), dtype=np.float32)
    base[:, :, 0] = 0.012 + 0.008 * (1.0 - ny)
    base[:, :, 1] = 0.004 + 0.004 * (1.0 - ny)
    base[:, :, 2] = 0.012 + 0.008 * (1.0 - ny)
    
    p_glow = 1.0 + 0.30 * beat_pulse
    p_radius = 1.0 + 0.15 * beat_pulse
    
    # Leak 1: Violet / Deep Purple
    ang1 = t_phase * 0.25
    cx1 = 0.85 + 0.30 * math.cos(ang1)
    cy1 = 0.15 + 0.25 * math.sin(ang1 * 1.2)
    d1 = np.sqrt(((nx - cx1) * 1.1)**2 + ((ny - cy1) * 1.1)**2) / p_radius
    glow1 = np.exp(-d1**2 * 3.0) * (1.20 * p_glow)
    col1 = np.array([0.88, 0.08, 0.68], dtype=np.float32)
    
    # Leak 2: Neon Magenta / Hot Pink
    ang2 = t_phase * 0.30 + 2.3
    cx2 = 0.15 + 0.28 * math.sin(ang2)
    cy2 = 0.25 + 0.25 * math.cos(ang2 * 0.9)
    d2 = np.sqrt(((nx - cx2) * 1.1)**2 + ((ny - cy2) * 1.1)**2) / p_radius
    glow2 = np.exp(-d2**2 * 3.4) * (1.10 * p_glow)
    col2 = np.array([0.65, 0.12, 0.96], dtype=np.float32)
    
    # Leak 3: Golden Sunset Amber
    ang3 = t_phase * 0.22 + 4.2
    cx3 = 0.85 + 0.30 * math.cos(ang3 * 1.1)
    cy3 = 0.85 + 0.25 * math.sin(ang3 * 0.85)
    d3 = np.sqrt(((nx - cx3) * 1.1)**2 + ((ny - cy3) * 1.1)**2) / p_radius
    glow3 = np.exp(-d3**2 * 2.8) * (1.15 * p_glow)
    col3 = np.array([0.10, 0.50, 0.96], dtype=np.float32)
    
    # Leak 4: Rose / Lavender Swirl
    ang4 = t_phase * 0.28 + 1.0
    cx4 = 0.10 + 0.25 * math.cos(ang4 * 0.75)
    cy4 = 0.80 + 0.25 * math.sin(ang4 * 1.15)
    d4 = np.sqrt(((nx - cx4) * 1.1)**2 + ((ny - cy4) * 1.1)**2) / p_radius
    glow4 = np.exp(-d4**2 * 3.6) * (0.90 * p_glow)
    col4 = np.array([0.45, 0.22, 0.90], dtype=np.float32)
    
    wave = (0.05 + 0.03 * beat_pulse) * np.sin(nx * 4.0 + ny * 3.0 + t_phase * 0.4)
    
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
        cur_x = (sx[i] + math.sin(t_phase * 0.20 * sp[i] + ph[i]) * (6.5 * lay)) % width
        cur_y = (sy[i] - t_phase * (5.0 * sp[i] * lay)) % height
        
        tw = 0.20 + 0.80 * (0.5 + 0.5 * math.sin(t_phase * 3.5 * sp[i] + ph[i]))**2
        tw *= (1.0 + 0.65 * beat_pulse)
        
        if lay == 3 and (math.sin(t_phase * 1.8 + ph[i]) > 0.80 or beat_pulse > 0.6):
            tw *= 1.95
            
        px, py = int(cur_x), int(cur_y)
        star_c = col[i] * tw
        star_s = sz[i] * (1.0 + 0.25 * beat_pulse)
        
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
                halo = np.exp(-d2 / (2.0 * (star_s * 2.0)**2)) * 0.30
                glow_k += halo
                
            if lay == 3:
                cross = (np.exp(-np.abs(gx - px) / 0.65) * np.exp(-np.abs(gy - py) / (star_s * (7.5 + 4.0 * beat_pulse))) + 
                         np.exp(-np.abs(gy - py) / 0.65) * np.exp(-np.abs(gx - px) / (star_s * (7.5 + 4.0 * beat_pulse)))) * 0.65
                glow_k = np.maximum(glow_k, cross)
                
            frame[y0:y1, x0:x1] += glow_k[:, :, None] * star_c
            
    # Camera kick zoom bounce
    zoom = 1.0 + 0.035 * beat_pulse
    if zoom > 1.002:
        M = cv2.getRotationMatrix2D((width / 2.0, height / 2.0), 0, zoom)
        frame = cv2.warpAffine(frame, M, (width, height), borderMode=cv2.BORDER_REFLECT)
        
    frame += ctx['grain_tile']
    frame *= ctx['vignette'][:, :, None]
    
    frame = np.clip(frame, 0.0, 1.0)
    return (frame * 255.0).astype(np.uint8)

def precompute_nastaliq_elements(width=1080, height=260):
    elements = []
    
    for item in LYRICS:
        en_text = item['en']
        fa_text = item['fa']
        
        img = QImage(width, height, QImage.Format.Format_ARGB32_Premultiplied)
        img.fill(QColor(0, 0, 0, 0))
        
        painter = QPainter(img)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        painter.setRenderHint(QPainter.RenderHint.TextAntialiasing)
        
        font_en = QFont(en_family, 30)
        painter.setFont(font_en)
        painter.setPen(QColor(255, 255, 255, 255))
        painter.drawText(QRect(0, 25, width, 70), Qt.AlignmentFlag.AlignCenter, en_text)
        
        font_fa = QFont(fa_family, 34)
        painter.setFont(font_fa)
        painter.setPen(QColor(250, 250, 255, 255))
        painter.drawText(QRect(0, 95, width, 140), Qt.AlignmentFlag.AlignCenter, fa_text)
        
        painter.end()
        
        ptr = img.bits()
        arr = np.array(ptr).reshape((height, width, 4))
        
        # Shadow
        alpha_mask = arr[:, :, 3]
        shadow_np = np.zeros((height, width, 4), dtype=np.uint8)
        shadow_np[:, :, 3] = (alpha_mask * 0.90).astype(np.uint8)
        
        shadow_pil = Image.fromarray(shadow_np).filter(ImageFilter.GaussianBlur(radius=6))
        shadow_offset = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        shadow_offset.paste(shadow_pil, (0, 3))
        
        text_pil = Image.fromarray(arr)
        combined = Image.alpha_composite(shadow_offset, text_pil)
        
        elements.append({
            'start': item['start'],
            'end': item['end'],
            'img': combined,
            'w': width,
            'h': height
        })
        
    return elements

def apply_nastaliq_subtitles(frame_bgr, t_sec, elements, beat_pulse, width=1080, height=1080):
    for elem in elements:
        st = elem['start']
        et = elem['end']
        
        if st <= t_sec <= et:
            dur = et - st
            rel_t = t_sec - st
            
            fade_in = 0.35
            fade_out = 0.30
            
            scale = 1.0 + 0.03 * beat_pulse
            alpha = 1.0
            offset_y = math.sin(rel_t * 1.5) * 1.5
            
            if rel_t < fade_in:
                p = rel_t / fade_in
                ease = 1.0 - (1.0 - p)**3
                scale = (0.90 + 0.10 * ease) * (1.0 + 0.03 * beat_pulse)
                alpha = ease
                offset_y = (1.0 - ease) * 16.0
            elif rel_t > (dur - fade_out):
                p = (rel_t - (dur - fade_out)) / fade_out
                ease = p**2.2
                scale = (1.0 - 0.08 * ease)
                alpha = max(0.0, 1.0 - ease)
                offset_y = -ease * 12.0
                
            if alpha > 0.005:
                elem_img = elem['img']
                nw = max(1, int(elem['w'] * scale))
                nh = max(1, int(elem['h'] * scale))
                
                scaled_img = elem_img.resize((nw, nh), resample=Image.Resampling.BILINEAR)
                
                cx = width // 2
                cy = int(height * 0.50 + offset_y)
                
                x0 = cx - nw // 2
                y0 = cy - nh // 2
                
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
    height = 1080
    fps = 30
    
    wav_path = r"c:\Users\0731g\nazifyosufi\audio_new.wav"
    source_audio = r"C:\Users\0731g\Downloads\Download (6).mp4"
    output_video_temp = r"c:\Users\0731g\nazifyosufi\temp_nastaliq_square_raw.mp4"
    
    final_output_square = r"C:\Users\0731g\Downloads\square_nastaliq_beat_video.mp4"
    final_output_persian = r"C:\Users\0731g\Downloads\موزیک_ویدیو_مربعی_نستعلیق_ریتمیک.mp4"
    final_output_local = r"c:\Users\0731g\nazifyosufi\square_nastaliq_beat_video.mp4"
    
    features = extract_advanced_audio_features(wav_path, fps=fps)
    total_frames = features['total_frames']
    duration = total_frames / fps
    
    print(f"Rendering 1:1 Square Nastaliq Video ({width}x{height}): {total_frames} frames ({duration:.2f}s) @ {fps}fps...", flush=True)
    t_start = time.time()
    
    ctx = build_square_renderer(width, height)
    elements = precompute_nastaliq_elements(width, 260)
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(output_video_temp, fourcc, fps, (width, height))
    
    for i in range(total_frames):
        t_sec = i / fps
        t_phase = features['phase'][i]
        beat_pulse = features['beat_pulse'][i]
        rms = features['rms'][i]
        
        bg_frame = render_square_background(ctx, t_phase, beat_pulse, rms)
        final_frame = apply_nastaliq_subtitles(bg_frame, t_sec, elements, beat_pulse, width, height)
        
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
        final_output_square
    ]
    subprocess.run(mux_cmd, check=True)
    
    import shutil
    shutil.copy2(final_output_square, final_output_persian)
    shutil.copy2(final_output_square, final_output_local)
    
    if os.path.exists(output_video_temp):
        os.remove(output_video_temp)
        
    total_time = time.time() - t_start
    print(f"FINISHED in {total_time:.1f}s! 1:1 Square Nastaliq video created.", flush=True)

if __name__ == '__main__':
    main()
