import subprocess, imageio_ffmpeg, os

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
src_video = r"C:\Users\0731g\Downloads\gemini_generated_video_a66c136c.mp4"
brain_dir = r"C:\Users\0731g\.gemini\antigravity\brain\bc186a7e-688e-4e98-be90-2127c9956261"
out_dir = r"c:\Users\0731g\nazifyosufi"

# We will create the 3.0-second 9:16 vertical video using ffmpeg:
# How to achieve the seamless feathered 9:16 framing in ffmpeg:
# 1. Scale input to 1920x1080 (1.5x)
# 2. Crop/Pad to 1080x1920 centered
# In ffmpeg:
# [0:v]scale=1920:1080[scaled];
# pad to 1080:1920 with x=-420 (which crops the 1920 width to 1080) and pads vertical from 1080 to 1920:
# [scaled]crop=1080:1080:420:0,pad=1080:1920:0:(1920-1080)/2:color=black[v]
# Let's check: 1080:1080 crop of 1920x1080:
# In the original 1280x720, the bright shield is from x=396 to x=830.
# Scaled by 1.5: 396*1.5 = 594, 830*1.5 = 1245.
# Center of 1920 is 960. 960 - 540 = 420.
# Crop from 420 to 1500 (width 1080) contains 594 to 1245 completely with 174px safety margin on left and 255px on right!
# And height 1080 is padded to 1920 with black (420px top, 420px bottom).
# Since the top and bottom of the video are dark/vignetted, it blends into black!

# Let's test Version A: 0.5s to 3.5s (3 seconds) with fade to black at st=2.0 d=1.0
out_v1 = os.path.join(out_dir, "UrClub_Logo_Outro_3s.mp4")

vf = (
    "scale=1920:1080,"
    "crop=1080:1080:420:0,"
    "pad=1080:1920:0:420:color=black,"
    "fade=t=out:st=2.0:d=1.0,"
    "format=yuv420p"
)

cmd1 = [
    ffmpeg, "-y",
    "-ss", "1.0", "-t", "3.0", "-i", src_video,
    "-vf", vf,
    "-c:v", "libx264", "-preset", "slow", "-crf", "18",
    "-an",
    out_v1
]

res = subprocess.run(cmd1, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
print("Returncode V1:", res.returncode)
if res.returncode == 0:
    print("V1 size:", os.path.getsize(out_v1))
