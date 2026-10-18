import base64

with open('c:/Users/0731g/nazifyosufi/urclub_logo_transparent.png', 'rb') as f:
    logo_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('c:/Users/0731g/nazifyosufi/urclub_qr.png', 'rb') as f:
    qr_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('c:/Users/0731g/nazifyosufi/Vazirmatn-Bold.ttf', 'rb') as f:
    vazir_bold_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('c:/Users/0731g/nazifyosufi/Vazirmatn-Regular.ttf', 'rb') as f:
    vazir_reg_b64 = base64.b64encode(f.read()).decode('utf-8')

html_content = f"""<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<style>
@font-face {{
    font-family: 'Vazirmatn';
    src: url('data:font/truetype;charset=utf-8;base64,{vazir_reg_b64}') format('truetype');
    font-weight: 400;
}}
@font-face {{
    font-family: 'Vazirmatn';
    src: url('data:font/truetype;charset=utf-8;base64,{vazir_bold_b64}') format('truetype');
    font-weight: 700 900;
}}
* {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Vazirmatn', sans-serif;
}}
body {{
    width: 1080px;
    height: 1920px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #080d1a;
}}
.poster {{
    width: 1080px;
    height: 1920px;
    background: radial-gradient(circle at 85% 15%, #182e56 0%, #0b1426 45%, #050811 100%);
    position: relative;
    padding: 90px 75px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
}}

.glow-top {{
    position: absolute;
    top: -150px;
    left: -150px;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(0, 195, 255, 0.18) 0%, transparent 65%);
    pointer-events: none;
}}
.glow-bottom {{
    position: absolute;
    bottom: -100px;
    right: -100px;
    width: 650px;
    height: 650px;
    background: radial-gradient(circle, rgba(23, 107, 239, 0.16) 0%, transparent 65%);
    pointer-events: none;
}}

.header {{
    text-align: center;
    position: relative;
    z-index: 2;
}}
.logo-box {{
    margin-bottom: 25px;
}}
.logo-img {{
    width: 250px;
    height: auto;
    filter: drop-shadow(0 15px 30px rgba(0, 150, 255, 0.35));
}}
.badge {{
    display: inline-block;
    background: rgba(14, 165, 233, 0.12);
    border: 2px solid rgba(56, 189, 248, 0.4);
    color: #38bdf8;
    padding: 10px 32px;
    border-radius: 40px;
    font-size: 24px;
    font-weight: 700;
    margin-top: 15px;
    letter-spacing: 0.5px;
}}
.main-title {{
    font-size: 46px;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.45;
    margin-top: 25px;
    text-shadow: 0 4px 20px rgba(0,0,0,0.6);
}}
.subtitle {{
    font-size: 26px;
    color: #94a3b8;
    font-weight: 500;
    margin-top: 12px;
}}

.services {{
    display: flex;
    flex-direction: column;
    gap: 22px;
    position: relative;
    z-index: 2;
}}
.card {{
    background: rgba(255, 255, 255, 0.035);
    border: 2px solid rgba(255, 255, 255, 0.09);
    border-radius: 26px;
    padding: 26px 30px;
    display: flex;
    align-items: center;
    gap: 24px;
}}
.card-icon {{
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: linear-gradient(135deg, #1e3a8a, #0284c7);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    flex-shrink: 0;
    box-shadow: 0 8px 24px rgba(2, 132, 199, 0.35);
}}
.card-content h3 {{
    font-size: 30px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 6px;
}}
.card-content p {{
    font-size: 21px;
    color: #cbd5e1;
    line-height: 1.4;
}}

.cost-box {{
    background: rgba(30, 41, 59, 0.6);
    border-right: 6px solid #38bdf8;
    border-radius: 16px;
    padding: 22px 28px;
    font-size: 21px;
    color: #cbd5e1;
    line-height: 1.5;
    position: relative;
    z-index: 2;
}}

.red-note {{
    background: rgba(220, 38, 38, 0.08);
    border: 2px dashed rgba(239, 68, 68, 0.5);
    border-radius: 22px;
    padding: 24px 28px;
    display: flex;
    align-items: flex-start;
    gap: 18px;
    position: relative;
    z-index: 2;
}}
.note-pill {{
    background: #dc2626;
    color: #ffffff;
    font-size: 22px;
    font-weight: 900;
    padding: 6px 18px;
    border-radius: 10px;
    flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(220, 38, 38, 0.45);
}}
.note-desc {{
    font-size: 21px;
    color: #fca5a5;
    line-height: 1.45;
    font-weight: 600;
}}

.footer {{
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 32, 65, 0.95));
    border: 2px solid rgba(56, 189, 248, 0.35);
    border-radius: 30px;
    padding: 26px 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}}
.footer-text {{
    display: flex;
    flex-direction: column;
    gap: 8px;
}}
.footer-label {{
    font-size: 22px;
    color: #94a3b8;
    font-weight: 600;
}}
.footer-link {{
    font-size: 32px;
    font-weight: 900;
    color: #38bdf8;
    text-decoration: none;
    direction: ltr;
    text-align: right;
    letter-spacing: 0.5px;
}}
.footer-hint {{
    font-size: 19px;
    color: #64748b;
}}
.qr-box {{
    background: #ffffff;
    padding: 10px;
    border-radius: 18px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    flex-shrink: 0;
}}
.qr-box img {{
    width: 140px;
    height: 140px;
    display: block;
}}
</style>
</head>
<body>
<div class="poster">
    <div class="glow-top"></div>
    <div class="glow-bottom"></div>

    <div class="header">
        <div class="logo-box">
            <img src="data:image/png;base64,{logo_b64}" class="logo-img">
        </div>
        <div>
            <span class="badge">گروه تخصصی تکنولوژی و نرم‌افزار UR CLUB</span>
        </div>
        <h1 class="main-title">طراحی و ساخت انواع وب‌سایت و برنامه‌ها</h1>
        <p class="subtitle">ارائه خدمات مسلکی دیجیتال مطابق با نیاز شما در افغانستان</p>
    </div>

    <div class="services">
        <div class="card">
            <div class="card-icon">🌐</div>
            <div class="card-content">
                <h3>طراحی هر نوع وب‌سایت مدرن</h3>
                <p>فروشگاهی، شرکتی، خدماتی، خبری و پورتال‌های شخصی با دیزاین اختصاصی</p>
            </div>
        </div>

        <div class="card">
            <div class="card-icon">📱</div>
            <div class="card-content">
                <h3>ساخت برنامه‌ها و سیستم‌های دیتابیس</h3>
                <p>توسعه اپلیکیشن‌های کاربردی، سیستم‌های مالی، اداری و مدیریت هوشمند</p>
            </div>
        </div>
    </div>

    <div class="cost-box">
        📌 <strong>یادداشت مصارف:</strong> هزینه خرید دومین، هاستینگ اختصاصی، دیتابیس و مخارج جانبی سرور وب‌سایت به دوش خود مشتری می‌باشد.
    </div>

    <div class="red-note">
        <span class="note-pill">نوت مهم:</span>
        <span class="note-desc">
            دومین و دیتابیس رایگان با امکانات اولیه موجود می‌باشد (پلن‌های پولی دارای سرعت، ظرفیت و امکانات پیشرفته‌تر هستند).
        </span>
    </div>

    <div class="footer">
        <div class="footer-text">
            <span class="footer-label">سایت رسمی ما:</span>
            <span class="footer-link">urclub.vercel.app</span>
            <span class="footer-hint">جهت مشاهده نمونه‌کارها کیوآرکد را اسکن کنید</span>
        </div>
        <div class="qr-box">
            <img src="data:image/png;base64,{qr_b64}">
        </div>
    </div>
</div>
</body>
</html>
"""

with open('c:/Users/0731g/nazifyosufi/poster_1080x1920.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Generated poster_1080x1920.html successfully!")
