# -*- coding: utf-8 -*-
"""
URCLUB Studio - Official Project Specification & Order Form PDF Generator
"""

import os
from playwright.sync_api import sync_playwright

HTML_CONTENT = """<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>URCLUB | فرم رسمی و پروپوزال ثبت سفارش پروژه</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 14mm 14mm 14mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #ffffff;
      color: #0f172a;
      direction: rtl;
      font-size: 11pt;
      line-height: 1.55;
    }
    
    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 2px solid #7c3aed;
      margin-bottom: 16px;
    }
    .logo-box {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .logo-badge {
      background: #7c3aed;
      color: #fff;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 800;
      font-size: 14pt;
      padding: 4px 10px;
      border-radius: 6px;
      letter-spacing: 1px;
    }
    .logo-title {
      font-size: 12pt;
      font-weight: 700;
      color: #1e1b4b;
    }
    .meta-box {
      text-align: left;
      font-size: 8.5pt;
      color: #64748b;
      line-height: 1.4;
      font-family: 'JetBrains Mono', 'Vazirmatn', sans-serif;
    }
    .meta-box strong {
      color: #0f172a;
    }

    /* Document Title */
    .doc-title-block {
      text-align: center;
      margin-bottom: 16px;
      padding: 10px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .doc-title {
      font-size: 14pt;
      font-weight: 800;
      color: #4c1d95;
      margin-bottom: 4px;
    }
    .doc-subtitle {
      font-size: 9pt;
      color: #64748b;
    }

    /* Section Styling */
    .section {
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11pt;
      font-weight: 700;
      color: #1e1b4b;
      background: #f1f5f9;
      padding: 6px 10px;
      border-radius: 6px;
      border-right: 4px solid #7c3aed;
      margin-bottom: 10px;
    }

    /* Grid layout */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 8px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 8px;
    }
    .grid-4 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 6px;
      margin-bottom: 8px;
    }

    .form-item {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .label {
      font-size: 8.5pt;
      font-weight: 600;
      color: #334155;
    }
    .input-box {
      height: 28px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      background: #fff;
      padding: 2px 8px;
      font-size: 9pt;
    }
    .textarea-box {
      height: 48px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      background: #fff;
      padding: 4px 8px;
      font-size: 8.5pt;
    }

    /* Checkbox & Options Grid */
    .option-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 12px;
      margin-top: 4px;
    }
    .option-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 8.5pt;
      color: #1e293b;
    }
    .checkbox {
      width: 13px;
      height: 13px;
      border: 1.5px solid #64748b;
      border-radius: 3px;
      display: inline-block;
    }

    /* Table format */
    table.spec-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 4px;
      font-size: 8.5pt;
    }
    table.spec-table th, table.spec-table td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
      text-align: right;
    }
    table.spec-table th {
      background: #f8fafc;
      color: #334155;
      font-weight: 700;
    }

    /* Footer Note */
    .footer-box {
      margin-top: 14px;
      padding: 8px 12px;
      background: #faf5ff;
      border: 1px solid #e9d5ff;
      border-radius: 6px;
      font-size: 8pt;
      color: #6b21a8;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-contact {
      display: flex;
      gap: 14px;
      font-family: 'JetBrains Mono', sans-serif;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <div class="logo-box">
      <div class="logo-badge">URCLUB</div>
      <div class="logo-title">استودیو طراحی وب‌سایت و رسانه دیجیتال</div>
    </div>
    <div class="meta-box">
      <div>شماره سند: <strong>UR-SPEC-2026</strong></div>
      <div>ایمیل ثبت: <strong>urclub7@gmail.com</strong></div>
      <div>وب‌سایت: <strong>urclub.vercel.app</strong></div>
    </div>
  </div>

  <!-- Document Title -->
  <div class="doc-title-block">
    <div class="doc-title">فرم جامع و پرسشنامه تخصصی ثبت مشخصات پروژه</div>
    <div class="doc-subtitle">لطفاً مشخصات و ویژگی‌های مدنظر خود را علامت‌زده و تکمیل فرمایید تا نمونه اولیه بلافاصله طراحی شود.</div>
  </div>

  <!-- Section 1: Project Type Selection -->
  <div class="section">
    <div class="section-title">۱. انتخاب نوع پروژه و خدمت درخواستی</div>
    <div class="option-list">
      <div class="option-item"><span class="checkbox"></span> [ ] <strong>طراحی وب‌سایت کامل</strong> (فروشگاهی / شرکتی / پورتفولیو / لندینگ)</div>
      <div class="option-item"><span class="checkbox"></span> [ ] <strong>اپلیکیشن موبایل</strong> (Android / iOS)</div>
      <div class="option-item"><span class="checkbox"></span> [ ] <strong>نرم‌افزار کامپیوتر</strong> (ویندوز / مک)</div>
      <div class="option-item"><span class="checkbox"></span> [ ] <strong>پوستر و گرافیک</strong> (استوری اینستاگرام / کاور / چاپ)</div>
    </div>
  </div>

  <!-- Section 2: Detailed Website Specifications -->
  <div class="section">
    <div class="section-title">۲. مشخصات دقیق و جزییات فنی وب‌سایت (پروژه اصلی)</div>
    
    <div class="grid-2">
      <div class="form-item">
        <span class="label">نام وب‌سایت و برند تجاری:</span>
        <div class="input-box"></div>
      </div>
      <div class="form-item">
        <span class="label">شعار یا معرفی کوتاه در صفحه اصلی:</span>
        <div class="input-box"></div>
      </div>
    </div>

    <table class="spec-table">
      <tr>
        <th style="width: 25%;">دسته‌بندی و نوع کاربری سایت:</th>
        <td>
          <div class="option-list">
            <span class="option-item"><span class="checkbox"></span> فروشگاهی (خرید آنلاین و محصول)</span>
            <span class="option-item"><span class="checkbox"></span> شرکتی و معرفی خدمات</span>
            <span class="option-item"><span class="checkbox"></span> لینک بیو و پورتفولیو شخصی (استایل لِوی)</span>
            <span class="option-item"><span class="checkbox"></span> تبلیغاتی و لندینگ تک‌صفحه</span>
            <span class="option-item"><span class="checkbox"></span> آموزشی و دوره</span>
            <span class="option-item"><span class="checkbox"></span> وبلاگ خبری</span>
          </div>
        </td>
      </tr>
      <tr>
        <th>تعداد صفحات مد نظر:</th>
        <td>
          <div class="option-list">
            <span class="option-item"><span class="checkbox"></span> تک‌صفحه‌ای (Single Page / Landing)</span>
            <span class="option-item"><span class="checkbox"></span> ۲ الی ۵ صفحه</span>
            <span class="option-item"><span class="checkbox"></span> ۵ الی ۱۰ صفحه</span>
            <span class="option-item"><span class="checkbox"></span> فروشگاه کامل و نامحدود</span>
          </div>
        </td>
      </tr>
      <tr>
        <th>تم رنگی و استایل بصری:</th>
        <td>
          <div class="option-list">
            <span class="option-item"><span class="checkbox"></span> تیره نئونی و لوکس (استایل urclub)</span>
            <span class="option-item"><span class="checkbox"></span> سایبرپانک و گیمینگ (آبی + صورتی)</span>
            <span class="option-item"><span class="checkbox"></span> مینیمال سیاه و سفید خالص</span>
            <span class="option-item"><span class="checkbox"></span> رنگ‌های دلخواه: ________________________</span>
          </div>
        </td>
      </tr>
      <tr>
        <th>نوع و پسوند دامین:</th>
        <td>
          <div class="option-list">
            <span class="option-item"><span class="checkbox"></span> .com تجاری</span>
            <span class="option-item"><span class="checkbox"></span> .net یا .org</span>
            <span class="option-item"><span class="checkbox"></span> دامین رایگان سریع ورسل (.vercel.app)</span>
            <span class="option-item"><span class="checkbox"></span> خودم دامین دارم: ________________</span>
          </div>
        </td>
      </tr>
      <tr>
        <th>پایگاه داده (دیتابیس) و هاستینگ:</th>
        <td>
          <div class="option-list">
            <span class="option-item"><span class="checkbox"></span> دیتابیس ابری رایگان سوپابیس (Supabase)</span>
            <span class="option-item"><span class="checkbox"></span> هاست و سرور اختصاصی دارم</span>
            <span class="option-item"><span class="checkbox"></span> هاست را شما تهیه کنید</span>
          </div>
        </td>
      </tr>
      <tr>
        <th>امکانات و قابلیت‌های ویژه:</th>
        <td>
          <div class="option-list">
            <span class="option-item"><span class="checkbox"></span> درگاه پرداخت آنلاین</span>
            <span class="option-item"><span class="checkbox"></span> ثبت‌نام و ورود اعضا</span>
            <span class="option-item"><span class="checkbox"></span> پنل مدیریت ادمین</span>
            <span class="option-item"><span class="checkbox"></span> ویدیو و موزیک پس‌زمینه</span>
            <span class="option-item"><span class="checkbox"></span> چت آنلاین و پشتیبانی</span>
            <span class="option-item"><span class="checkbox"></span> دارک/لایت مود</span>
            <span class="option-item"><span class="checkbox"></span> شمارنده بازدید واقعی</span>
            <span class="option-item"><span class="checkbox"></span> سئو استاندارد گوگل</span>
          </div>
        </td>
      </tr>
      <tr>
        <th>زبان‌های سایت:</th>
        <td>
          <div class="option-list">
            <span class="option-item"><span class="checkbox"></span> فقط فارسی</span>
            <span class="option-item"><span class="checkbox"></span> انگلیسی</span>
            <span class="option-item"><span class="checkbox"></span> دوزبانه (فارسی + انگلیسی)</span>
            <span class="option-item"><span class="checkbox"></span> پشتو + فارسی</span>
          </div>
        </td>
      </tr>
      <tr>
        <th>سایت‌های رفرنس / نمونه‌های مورد پسند:</th>
        <td>لینک یا نام سایت‌هایی که ظاهر آن‌ها را می‌پسندید: _____________________________________________</td>
      </tr>
    </table>
  </div>

  <!-- Section 3: Contact Information -->
  <div class="section">
    <div class="section-title">۳. مشخصات کارفرما و اطلاعات تماس</div>
    <div class="grid-2">
      <div class="form-item">
        <span class="label">نام و نام خانوادگی کارفرما:</span>
        <div class="input-box"></div>
      </div>
      <div class="form-item">
        <span class="label">شماره تماس و واتساپ:</span>
        <div class="input-box"></div>
      </div>
    </div>
    <div class="grid-2">
      <div class="form-item">
        <span class="label">آیدی تلگرام یا اینستاگرام:</span>
        <div class="input-box"></div>
      </div>
      <div class="form-item">
        <span class="label">آدرس ایمیل کارفرما:</span>
        <div class="input-box"></div>
      </div>
    </div>
    <div class="form-item" style="margin-top: 6px;">
      <span class="label">توضیحات تکمیلی، ایده اختصاصی یا درخواست‌های خاص شما:</span>
      <div class="textarea-box"></div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer-box">
    <div>🚀 با تکمیل و ارسال این فرم به <strong>urclub7@gmail.com</strong>، نمونه اولیه (Prototype) وب‌سایت فوراً پیاده‌سازی خواهد شد.</div>
    <div class="footer-contact">
      <span>WhatsApp: +49 162 4212685</span>
      <span>Telegram: @LEVI_2213</span>
    </div>
  </div>

</body>
</html>"""

def generate_pdf():
    output_pdf_path = os.path.abspath("c:/Users/0731g/nazifyosufi/urclub_project_order_form.pdf")
    temp_html_path = os.path.abspath("c:/Users/0731g/nazifyosufi/temp_form_print.html")
    
    with open(temp_html_path, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
        
    print(f"Temporary HTML saved to {temp_html_path}")
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(f"file:///{temp_html_path}")
        page.wait_for_load_state("networkidle")
        
        page.pdf(
            path=output_pdf_path,
            format="A4",
            print_background=True,
            margin={"top": "0mm", "bottom": "0mm", "left": "0mm", "right": "0mm"}
        )
        browser.close()
        
    if os.path.exists(temp_html_path):
        os.remove(temp_html_path)
        
    print(f"PDF generated successfully at: {output_pdf_path}")
    print(f"File size: {os.path.getsize(output_pdf_path)} bytes")

if __name__ == "__main__":
    generate_pdf()
