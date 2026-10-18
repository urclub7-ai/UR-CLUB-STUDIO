import subprocess, imageio_ffmpeg, os

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
src_video = r"C:\Users\0731g\Downloads\gemini_generated_video_a66c136c.mp4"
brain_dir = r"C:\Users\0731g\.gemini\antigravity\brain\bc186a7e-688e-4e98-be90-2127c9956261"

# Approach 1: Blurred glowing background + sharp foreground
out_test1 = os.path.join(brain_dir, "test_style_blur.jpg")
vf1 = "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=20:5[bg];[0:v]scale=1080:-1[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2"
subprocess.run([ffmpeg, "-y", "-ss", "3", "-i", src_video, "-filter_complex", vf1, "-vframes", "1", out_test1])

# Approach 2: Pure dark cyber background (since background is midnight black) with smooth vertical expansion
out_test2 = os.path.join(brain_dir, "test_style_dark.jpg")
vf2 = "scale=1080:608,pad=1080:1920:(1080-1080)/2:(1920-608)/2:color=black"
subprocess.run([ffmpeg, "-y", "-ss", "3", "-i", src_video, "-vf", vf2, "-vframes", "1", out_test2])

# Approach 3: Scale to fill slightly wider (e.g. 1200 width) with center crop so shield is nice and prominent
out_test3 = os.path.join(brain_dir, "test_style_prominent.jpg")
vf3 = "scale=-1:1080,crop=608:1080,scale=1080:1920"
# wait, 9:16 crop from 1280x720: width 405, height 720
# if we crop width 480, height 720 (10:15) or scale
print("Rendered test frames!")
