import os, subprocess, imageio_ffmpeg
from PIL import Image, ImageDraw
import numpy as np

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
src_video = r"C:\Users\0731g\Downloads\gemini_generated_video_a66c136c.mp4"
out_dir = r"c:\Users\0731g\nazifyosufi"
final_video = os.path.join(out_dir, "UrClub_Logo_Outro_9x16_3s.mp4")

# Temp frame extraction
temp_frames_dir = os.path.join(out_dir, "temp_outro_frames")
os.makedirs(temp_frames_dir, exist_ok=True)

# 1. Extract exactly 72 frames (3.0 seconds at 24fps) starting at 1.0s
# (Peak glow is between 1.0s and 4.0s)
cmd_extract = [
    ffmpeg, "-y",
    "-ss", "1.0", "-t", "3.0", "-i", src_video,
    "-r", "24",
    os.path.join(temp_frames_dir, "raw_%03d.png")
]
subprocess.run(cmd_extract, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

# 2. Process each frame: Scale to 1920x1080, apply feathered mask, center on 1080x1920, apply fade to black
W, H = 1080, 1920
fw, fh = 1920, 1080

# Build feathered mask
arr_mask = np.ones((fh, fw), dtype=np.float32)
# feather horizontal
arr_mask[:, :240] *= np.linspace(0, 1, 240) ** 1.8
arr_mask[:, -240:] *= np.linspace(1, 0, 240) ** 1.8
# feather vertical
arr_mask[:120, :] *= (np.linspace(0, 1, 120) ** 1.8)[:, None]
arr_mask[-120:, :] *= (np.linspace(1, 0, 120) ** 1.8)[:, None]
feather_mask = Image.fromarray((arr_mask * 255).astype(np.uint8))

processed_dir = os.path.join(out_dir, "temp_processed_frames")
os.makedirs(processed_dir, exist_ok=True)

raw_files = sorted([f for f in os.listdir(temp_frames_dir) if f.startswith("raw_")])
num_frames = len(raw_files)
print(f"Processing {num_frames} frames...")

# Fade out starts at frame 48 (2.0s) and reaches 0 at frame 72 (3.0s)
fade_start_frame = 46

for idx, f in enumerate(raw_files):
    im_path = os.path.join(temp_frames_dir, f)
    raw_img = Image.open(im_path).convert("RGBA")
    
    # Resize to fw x fh
    scaled = raw_img.resize((fw, fh), Image.Resampling.LANCZOS)
    scaled.putalpha(feather_mask)
    
    # Canvas
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    offset_x = (W - fw) // 2
    offset_y = (H - fh) // 2
    canvas.paste(scaled, (offset_x, offset_y), scaled)
    
    # Fade to black if idx >= fade_start_frame
    if idx >= fade_start_frame:
        fade_factor = max(0.0, 1.0 - (idx - fade_start_frame) / float(num_frames - fade_start_frame))
        # Multiply RGB by fade_factor
        arr = np.array(canvas, dtype=np.float32)
        arr[:, :, :3] *= (fade_factor ** 1.4)
        canvas = Image.fromarray(arr.astype(np.uint8))
        
    out_f = os.path.join(processed_dir, f"proc_{idx:03d}.png")
    canvas.convert("RGB").save(out_f)

# 3. Assemble with ffmpeg at 24fps
cmd_assemble = [
    ffmpeg, "-y",
    "-r", "24",
    "-i", os.path.join(processed_dir, "proc_%03d.png"),
    "-c:v", "libx264", "-preset", "slow", "-crf", "17",
    "-pix_fmt", "yuv420p",
    final_video
]

res = subprocess.run(cmd_assemble, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
if res.returncode == 0:
    print("SUCCESS: Perfect 3s 9:16 Outro rendered at:", final_video)
    print("Size:", os.path.getsize(final_video), "bytes")
else:
    print("Error:", res.stderr.decode('utf-8', errors='ignore')[-300:])

# Clean up temp frames
import shutil
shutil.rmtree(temp_frames_dir, ignore_errors=True)
shutil.rmtree(processed_dir, ignore_errors=True)
print("Cleaned up temp frames!")
