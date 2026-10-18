import base64, os, shutil

video_src = r"c:\Users\0731g\nazifyosufi\UrClub_Logo_Outro_9x16_3s.mp4"
brain_dir = r"C:\Users\0731g\.gemini\antigravity\brain\bc186a7e-688e-4e98-be90-2127c9956261"
video_dest = os.path.join(brain_dir, "UrClub_Logo_Outro_9x16_3s.mp4")

shutil.copy2(video_src, video_dest)
print("Copied to brain dir!")

with open(video_dest, 'rb') as f:
    b64_data = base64.b64encode(f.read()).decode('utf-8')

video_url_esc = video_src.replace("\\", "/")

html_template = f"""<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
</head>
<body class="bg-transparent text-[var(--foreground)] antialiased p-2 flex justify-center">
  <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-xl max-w-sm w-full text-center">
    <div class="flex items-center justify-between mb-3 px-1">
      <span class="text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded-full">UR CLUB • آوترو ۳ ثانیه‌ای 🚀</span>
      <span class="text-xs text-[var(--muted-foreground)]">عمودی 9:16 • محو شدن به سیاه</span>
    </div>
    
    <div class="relative rounded-xl overflow-hidden bg-black shadow-inner border border-slate-800" style="max-height: 400px;">
      <video controls playsinline autoplay loop muted class="w-full h-full object-contain" style="max-height: 400px;">
        <source src="data:video/mp4;base64,{b64_data}" type="video/mp4">
        مرورگر از این ویدیو پشتیبانی نمی‌کند.
      </video>
    </div>

    <div class="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
      <span class="text-[var(--foreground)] font-medium">کیفیت 1080x1920 (TikTok/Reels)</span>
      <a href="file:///{video_url_esc}" class="text-cyan-400 hover:underline font-semibold">
        دانلود فایل 💾
      </a>
    </div>
  </div>
</body>
</html>"""

html_path = os.path.join(brain_dir, "player_outro_3s.html")
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_template)

print("Player HTML ready!")
