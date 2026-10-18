import base64

with open('c:/Users/0731g/nazifyosufi/urclub_shield_clean.png', 'rb') as f:
    shield_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('c:/Users/0731g/nazifyosufi/urclub_qr_clean.png', 'rb') as f:
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&display=swap');

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
}}

html, body {{
    width: 1080px;
    height: 1920px;
    margin: 0;
    padding: 0;
    background-color: #060a14;
    font-family: 'Vazirmatn', sans-serif;
    overflow: hidden;
    color: #ffffff;
}}

.poster-canvas {{
    width: 1080px;
    height: 1920px;
    position: relative;
    background: radial-gradient(circle at 50% 15%, #152b57 0%, #091224 45%, #04070f 100%);
    padding: 80px 75px 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    overflow: hidden;
}}

/* Ambient Glows */
.glow-accent-1 {{
    position: absolute;
    width: 600px;
    height: 600px;
    top: -100px;
    right: -120px;
    background: radial-gradient(circle, rgba(0, 195, 255, 0.18) 0%, transparent 65%);
    pointer-events: none;
}}
.glow-accent-2 {{
    position: absolute;
    width: 600px;
    height: 600px;
    bottom: 80px;
    left: -120px;
    background: radial-gradient(circle, rgba(23, 107, 239, 0.16) 0%, transparent 65%);
    pointer-events: none;
}}

/* SECTION 1: LOGO & ENGLISH BRAND */
.header-section {{
    text-align: center;
    position: relative;
    z-index: 2;
}}

.logo-display {{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
}}

.shield-img {{
    width: 175px;
    height: auto;
    filter: drop-shadow(0 15px 35px rgba(0, 160, 255, 0.45));
}}

.brand-english-title {{
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-size: 64px;
    letter-spacing: 5px;
    color: #ffffff;
    text-shadow: 0 4px 20px rgba(0, 150, 255, 0.4);
    line-height: 1.1;
    margin-bottom: 12px;
}}

.brand-subtitle-badge {{
    font-size: 24px;
    font-weight: 700;
    color: #38bdf8;
    background: rgba(14, 165, 233, 0.1);
    display: inline-block;
    padding: 8px 32px;
    border-radius: 30px;
    border: 1.5px solid rgba(56, 189, 248, 0.35);
}}

/* SECTION 2: SERVICES CARD (ALL IN ONE NEAT BOX) */
.services-card {{
    background: rgba(15, 23, 42, 0.75);
    border: 2px solid rgba(56, 189, 248, 0.3);
    border-radius: 30px;
    padding: 36px 42px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
    position: relative;
    z-index: 2;
}}

.card-heading {{
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 26px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    padding-bottom: 18px;
}}

.card-heading-icon {{
    font-size: 34px;
    background: linear-gradient(135deg, #1d4ed8, #0284c7);
    width: 58px;
    height: 58px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 16px rgba(2, 132, 199, 0.4);
}}

.card-heading-title {{
    font-size: 34px;
    font-weight: 900;
    color: #ffffff;
}}

.services-list {{
    display: flex;
    flex-direction: column;
    gap: 20px;
}}

.service-item {{
    display: flex;
    align-items: flex-start;
    gap: 16px;
}}

.item-bullet {{
    font-size: 26px;
    color: #38bdf8;
    line-height: 1.2;
}}

.item-content {{
    flex: 1;
}}

.item-title {{
    font-size: 28px;
    font-weight: 800;
    color: #f8fafc;
    margin-bottom: 4px;
}}

.item-desc {{
    font-size: 21px;
    color: #94a3b8;
    line-height: 1.45;
}}

/* SECTION 3: EXPENSES INFO */
.expenses-box {{
    background: rgba(30, 41, 59, 0.7);
    border-right: 8px solid #38bdf8;
    border-radius: 20px;
    padding: 26px 32px;
    position: relative;
    z-index: 2;
}}

.expenses-title {{
    font-size: 26px;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
}}

.expenses-text {{
    font-size: 23px;
    color: #cbd5e1;
    line-height: 1.5;
}}

/* SECTION 4: RED NOTE (خط سرخ) */
.red-note-box {{
    background: rgba(220, 38, 38, 0.12);
    border: 2px solid #ef4444;
    border-radius: 22px;
    padding: 24px 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    z-index: 2;
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.25);
}}

.red-note-label {{
    background-color: #dc2626;
    color: #ffffff;
    font-size: 24px;
    font-weight: 900;
    padding: 8px 22px;
    border-radius: 12px;
    white-space: nowrap;
    box-shadow: 0 4px 14px rgba(220, 38, 38, 0.5);
}}

.red-note-text {{
    font-size: 23px;
    font-weight: 700;
    color: #fca5a5;
    line-height: 1.45;
}}

/* SECTION 5: FREE CONSULTATION (مشاوره رایگان) */
.consult-badge {{
    background: linear-gradient(90deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.18));
    border: 2px solid #10b981;
    border-radius: 20px;
    padding: 18px 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    position: relative;
    z-index: 2;
}}

.consult-text {{
    font-size: 28px;
    font-weight: 900;
    color: #34d399;
}}

/* SECTION 6: FOOTER (WEBSITE LINK + CLEAN QR) */
.footer-container {{
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(11, 25, 52, 0.95));
    border: 2px solid rgba(56, 189, 248, 0.4);
    border-radius: 30px;
    padding: 26px 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
    box-shadow: 0 15px 35px rgba(0,0,0,0.5);
}}

.footer-info {{
    display: flex;
    flex-direction: column;
    gap: 8px;
}}

.footer-label {{
    font-size: 22px;
    color: #94a3b8;
    font-weight: 700;
}}

.footer-url {{
    font-size: 36px;
    font-weight: 900;
    color: #38bdf8;
    direction: ltr;
    text-align: right;
    letter-spacing: 0.5px;
}}

.footer-tip {{
    font-size: 19px;
    color: #64748b;
}}

.qr-card {{
    background: #ffffff;
    padding: 8px;
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
}}

.qr-card img {{
    width: 140px;
    height: 140px;
    display: block;
}}
</style>
</head>
<body>

<div class="poster-canvas">
    <div class="glow-accent-1"></div>
    <div class="glow-accent-2"></div>

    <!-- 1. Header: Shield Icon & English UR CLUB -->
    <div class="header-section">
        <div class="logo-display">
            <img src="data:image/png;base64,{shield_b64}" class="shield-img" alt="UR CLUB Shield">
        </div>
        <h1 class="brand-english-title">UR CLUB</h1>
        <div class="brand-subtitle-badge">توسعه نرم‌افزار و راهکارهای نوین دیجیتال</div>
    </div>

    <!-- 2. Services in One Neat Box -->
    <div class="services-card">
        <div class="card-heading">
            <div class="card-heading-icon">🚀</div>
            <div class="card-heading-title">خدمات مسلکی ما</div>
        </div>
        <div class="services-list">
            <div class="service-item">
                <span class="item-bullet">✦</span>
                <div class="item-content">
                    <div class="item-title">طراحی و ساخت انواع وب‌سایت</div>
                    <div class="item-desc">فروشگاهی، شرکتی، خدماتی، خبری، صرافی و پورتال‌های اختصاصی مدرن</div>
                </div>
            </div>
            <div class="service-item">
                <span class="item-bullet">✦</span>
                <div class="item-content">
                    <div class="item-title">ساخت برنامه‌ها و اپلیکیشن‌ها</div>
                    <div class="item-desc">طراحی انواع نرم‌افزار، سیستم‌های اتوماسیون کاری، حسابداری و مدیریتی</div>
                </div>
            </div>
            <div class="service-item">
                <span class="item-bullet">✦</span>
                <div class="item-content">
                    <div class="item-title">دیتابیس و پنل‌های مدیریتی</div>
                    <div class="item-desc">پیاده‌سازی پایگاه داده امن، پنل ادمین اختصاصی با قابلیت کنترل کامل اطلاعات</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 3. Expenses Section -->
    <div class="expenses-box">
        <div class="expenses-title">
            <span>💳</span> مخارج و هزینه‌های زیرساخت وب‌سایت:
        </div>
        <div class="expenses-text">
            هزینه‌های مربوط به <strong>خرید دومین (Domain)</strong>، <strong>هاستینگ (Hosting)</strong> و <strong>دیتابیس اختصاصی</strong> بر دوش خود شما می‌باشد.
        </div>
    </div>

    <!-- 4. Red Note (خط سرخ) -->
    <div class="red-note-box">
        <div class="red-note-label">نکته مهم:</div>
        <div class="red-note-text">
            دومین و دیتابیس رایگان با امکانات کمتر در دسترس می‌باشد!
        </div>
    </div>

    <!-- 5. Free Consultation (مشاوره رایگان) -->
    <div class="consult-badge">
        <span style="font-size: 30px;">💬</span>
        <span class="consult-text">مشاوره رایگان برای تحلیل و راه‌اندازی پروژه شما</span>
    </div>

    <!-- 6. Footer: Website Link & Clean QR Code -->
    <div class="footer-container">
        <div class="footer-info">
            <span class="footer-label">وب‌سایت رسمی ما:</span>
            <span class="footer-url">urclub.vercel.app</span>
            <span class="footer-tip">جهت مشاهده و ورود به سایت، کیوآرکد را اسکن کنید</span>
        </div>
        <div class="qr-card">
            <img src="data:image/png;base64,{qr_b64}" alt="UR CLUB QR">
        </div>
    </div>
</div>

</body>
</html>
"""

with open('c:/Users/0731g/nazifyosufi/poster_1080x1920.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Generated clean poster HTML successfully!")
