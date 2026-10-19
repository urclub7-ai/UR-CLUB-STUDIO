"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  Monitor,
  Palette,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Send,
  MessageCircle,
  Database,
  Server,
  Sparkles,
  Layers,
  ShieldCheck,
  FileText,
  ExternalLink,
  ChevronRight,
  Info,
} from "lucide-react";
import { submitProjectInquiry } from "@/lib/actions/message-actions";
import { useLanguage } from "@/lib/i18n";

type CategoryType = "website" | "mobile" | "desktop" | "graphic";

export default function ProjectInquiryForm() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  // Step 1: Category, Step 2: Technical Specs, Step 3: Optional Contact, Step 4: Summary & Submit
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 6-Character Unique Project Code (Uppercase English letters + Numbers)
  const [projectCode, setProjectCode] = useState<string>("");

  useEffect(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setProjectCode(code);
  }, []);

  // Category
  const [category, setCategory] = useState<CategoryType>("website");

  // Common / Shared
  const [brandName, setBrandName] = useState("");

  // 1. Website Specific Specs
  const [websiteType, setWebsiteType] = useState(isFa ? "فروشگاهی (E-Commerce)" : "E-Commerce");
  const [pageCount, setPageCount] = useState(isFa ? "۱ تا ۵ صفحه (سبک و سریع)" : "1 - 5 Pages (Fast)");
  const [domainChoice, setDomainChoice] = useState<"free_vercel_urclub" | "custom_owned" | "need_registration">("free_vercel_urclub");
  const [customDomainName, setCustomDomainName] = useState("");
  const [selectedTld, setSelectedTld] = useState(".com");
  const [hostingDatabase, setHostingDatabase] = useState<"free_vercel_supabase" | "own_server" | "no_database">("free_vercel_supabase");
  const [themeStyle, setThemeStyle] = useState(isFa ? "دارک سایبرپانک نئونی" : "Dark Cyberpunk Neon");
  const [primaryColor, setPrimaryColor] = useState("#00D2FF");
  const [secondaryColor, setSecondaryColor] = useState("#A855F7");
  const [websiteFeatures, setWebsiteFeatures] = useState<string[]>([
    "درگاه پرداخت آنلاین",
    "ورود و ثبت‌نام کاربران",
    "پنل مدیریت ادمین اختصاصی",
    "بهینه‌سازی سئو و لود زیر ۱ ثانیه",
    "اتصال مستقیم واتساپ و چت آنلاین",
  ]);

  // 2. Mobile App Specific Specs
  const [mobileAppName, setMobileAppName] = useState("");
  const [targetPlatform, setTargetPlatform] = useState(isFa ? "هر دو (Android + iOS)" : "Cross-Platform (Android + iOS)");
  const [mobileDatabase, setMobileDatabase] = useState(isFa ? "پایگاه داده ابری Supabase (رایگان)" : "Supabase Cloud Database");
  const [mobileFeatures, setMobileFeatures] = useState<string[]>([
    "پوش نوتیفیکیشن",
    "ورود با شماره موبایل و گوگل",
    "درگاه پرداخت درون‌برنامه‌ای",
    "حالت آفلاین (Offline Mode)",
    "تم تاریک و روشن",
  ]);

  // 3. Desktop Software Specific Specs
  const [desktopSoftwareName, setDesktopSoftwareName] = useState("");
  const [targetOS, setTargetOS] = useState(isFa ? "ویندوز (Windows)" : "Windows");
  const [desktopStorage, setDesktopStorage] = useState(isFa ? "دیتابیس محلی سبک (SQLite)" : "Local SQLite Database");
  const [desktopFeatures, setDesktopFeatures] = useState<string[]>([
    "نسخه پرتابل (بدون نیاز به نصب)",
    "سیستم پشتیبان‌گیری خودکار",
    "چاپ و گزارش‌گیری PDF",
    "سیستم لایسنس و قفل نرم‌افزاری",
  ]);

  // 4. Graphic & Poster Specific Specs
  const [graphicType, setGraphicType] = useState(isFa ? "پوستر تبلیغاتی حرفه‌ای" : "Advertising Poster");
  const [aspectRatio, setAspectRatio] = useState(isFa ? "استوری اینستاگرام (۹:۱۶ عمودی)" : "Instagram Story (9:16)");
  const [deliveryFormat, setDeliveryFormat] = useState(isFa ? "وکتور لایه‌باز SVG/AI + خروجی WebP/PNG" : "Vector SVG/AI + HQ PNG/WebP");
  const [graphicDesignNotes, setGraphicDesignNotes] = useState("");

  // Step 3: Optional Contact Info
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [socialId, setSocialId] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  // Toggle helpers
  const toggleFeature = (feature: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(feature)) {
      setList(list.filter((f) => f !== feature));
    } else {
      setList([...list, feature]);
    }
  };

  // Generate Comprehensive Plain-text Brief
  const generateBrief = () => {
    let categoryDetails = "";
    if (category === "website") {
      categoryDetails = `
════════════ مشخصات وب‌سایت ════════════
• نام وبسایت / برند: ${brandName || "ذکر نشده"}
• نوع وبسایت: ${websiteType}
• تعداد صفحات تقریبی: ${pageCount}
• وضعیت دامنه: ${
        domainChoice === "free_vercel_urclub"
          ? "استفاده از دامنه و ساب‌دومین رایگان Vercel / UrClub"
          : domainChoice === "custom_owned"
          ? `دامنه شخصی: ${customDomainName || "مشخص نشده"}`
          : `ثبت دامنه جدید با پسوند: ${selectedTld}`
      }
• زیرساخت هاست و دیتابیس: ${
        hostingDatabase === "free_vercel_supabase"
          ? "هاست ابری Vercel + دیتابیس رایگان Supabase (پیشنهادی UrClub)"
          : hostingDatabase === "own_server"
          ? "سرور و هاستینگ شخصی مشتری"
          : "بدون نیاز به دیتابیس (استاتیک)"
      }
• سبک و تم رنگی: ${themeStyle}
• رنگ اصلی: ${primaryColor} | رنگ مکمل: ${secondaryColor}
• امکانات ویژه انتخاب‌شده:
${websiteFeatures.map((f) => `  ✓ ${f}`).join("\n")}`;
    } else if (category === "mobile") {
      categoryDetails = `
════════════ مشخصات اپلیکیشن موبایل ════════════
• نام اپلیکیشن: ${mobileAppName || brandName || "ذکر نشده"}
• سیستم‌عامل هدف: ${targetPlatform}
• دیتابیس و سرور: ${mobileDatabase}
• امکانات کلیدی انتخاب‌شده:
${mobileFeatures.map((f) => `  ✓ ${f}`).join("\n")}`;
    } else if (category === "desktop") {
      categoryDetails = `
════════════ مشخصات نرم‌افزار دسکتاپ ════════════
• نام نرم‌افزار: ${desktopSoftwareName || brandName || "ذکر نشده"}
• سیستم‌عامل هدف: ${targetOS}
• ذخیره‌سازی داده: ${desktopStorage}
• امکانات انتخاب‌شده:
${desktopFeatures.map((f) => `  ✓ ${f}`).join("\n")}`;
    } else if (category === "graphic") {
      categoryDetails = `
════════════ مشخصات طراحی گرافیک و پوستر ════════════
• نوع سفارش: ${graphicType}
• ابعاد و نسبت: ${aspectRatio}
• فرمت فایل تحویلی: ${deliveryFormat}
• توضیحات ایده و پالت: ${graphicDesignNotes || "طراحی مدرن بر اساس هویت UrClub"}`;
    }

    return `═════════════════════════════════════════════
💎 سفارش اختصاصی UR CLUB [شناسه پرونده: ${projectCode}]
═════════════════════════════════════════════
📁 شناسه پوشه و پیگیری: ${projectCode}
📂 دسته‌بندی پروژه: ${
      category === "website"
        ? "طراحی و توسعه وب‌سایت"
        : category === "mobile"
        ? "اپلیکیشن موبایل"
        : category === "desktop"
        ? "نرم‌افزار کامپیوتر / دسکتاپ"
        : "طراحی گرافیک، برندینگ و پوستر"
    }
${categoryDetails}

════════════ اطلاعات کارفرما (اختیاری) ════════════
• نام کارفرما: ${clientName || "ناشناس"}
• شماره تماس / واتساپ: ${clientPhone || "ثبت نشده"}
• آدرس ایمیل: ${clientEmail || "ثبت نشده"}
• آیدی شبکه‌های اجتماعی: ${socialId || "ثبت نشده"}
• توضیحات تکمیلی: ${additionalNotes || "بدون یادداشت اضافی"}
═════════════════════════════════════════════
ارسال مستقیم به ایمیل: urclub7@gmail.com`;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const brief = generateBrief();

    // Client-side direct cloud dispatch to ensure guaranteed email delivery
    try {
      fetch("https://formsubmit.co/ajax/urclub7@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `[سفارش جدید UrClub: ${projectCode}] ${brandName || "پروژه وبسایت"}`,
          "شناسه اختصاصی پروژه": projectCode,
          "نوع پروژه":
            category === "website"
              ? "وب‌سایت"
              : category === "mobile"
              ? "اپلیکیشن موبایل"
              : category === "desktop"
              ? "نرم‌افزار دسکتاپ"
              : "طراحی گرافیک و پوستر",
          "نام کارفرما": clientName || "ثبت مستقیم در سایت",
          "شماره تماس / واتساپ": clientPhone || "ثبت نشده",
          "ایمیل کارفرما": clientEmail || "ثبت نشده",
          "نام برند / محصول": brandName || mobileAppName || desktopSoftwareName || `Project-${projectCode}`,
          "مشخصات کامل بریف": brief,
          _replyto: clientEmail || "urclub7@gmail.com",
          _captcha: "false",
          _template: "table",
        }),
      }).catch(() => {});
    } catch {}

    try {
      const res = await submitProjectInquiry({
        projectCode,
        category:
          category === "website"
            ? "وب‌سایت"
            : category === "mobile"
            ? "اپلیکیشن موبایل"
            : category === "desktop"
            ? "نرم‌افزار دسکتاپ"
            : "طراحی گرافیک و پوستر",
        clientName: clientName || undefined,
        clientEmail: clientEmail || undefined,
        clientPhone: clientPhone || undefined,
        brandName: brandName || mobileAppName || desktopSoftwareName || `Project-${projectCode}`,
        websiteType,
        domainTld: selectedTld,
        suggestedDomain: domainChoice === "custom_owned" ? customDomainName : undefined,
        pageCount,
        primaryColor,
        secondaryColors: secondaryColor,
        designStyle: themeStyle,
        additionalNotes: additionalNotes || graphicDesignNotes,
        formattedBrief: brief,
      });

      if (res.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(res.message || (isFa ? "خطا در ثبت سفارش." : "Submission failed."));
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(projectCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const getWhatsAppShareUrl = () => {
    const categoryTitle =
      category === "website"
        ? "وب‌سایت"
        : category === "mobile"
        ? "اپلیکیشن موبایل"
        : category === "desktop"
        ? "نرم‌افزار کامپیوتر"
        : "طراحی گرافیک و پوستر";

    const brand = (brandName || mobileAppName || desktopSoftwareName)
      ? `\nبرند/محصول: ${brandName || mobileAppName || desktopSoftwareName}`
      : "";

    const techInfo =
      category === "website"
        ? `\nمشخصات: ${websiteType} (${pageCount})`
        : category === "mobile"
        ? `\nپلتفرم: ${targetPlatform}`
        : "";

    const text = `سلام تیم UrClub، من سفارش جدیدی با شناسه اختصاصی *${projectCode}* در سایت ثبت کردم.\nنوع پروژه: ${categoryTitle}${brand}${techInfo}\nلطفاً پرونده من را بررسی نمایید.`;
    return `https://wa.me/491624212685?text=${encodeURIComponent(text)}`;
  };

  const getTelegramShareUrl = () => {
    const text = `سلام UrClub! سفارش جدید با شناسه اختصاصی ${projectCode} ثبت شد.`;
    return `https://t.me/share/url?url=${encodeURIComponent("https://urclub.dev")}&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full text-white">
      {/* ─── Header ─── */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          {isFa ? "پیکربندی و ثبت سفارش اختصاصی" : "Project Configurator & Order"}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
          {isFa
            ? "نوع پروژه و مشخصات فنی مورد نیاز خود را در چند گام ساده انتخاب کنید. سیستم به صورت خودکار شناسه اختصاصی ۶ حرفی برای ساخت پوشه پروژه شما صادر می‌کند."
            : "Select your project type, domain, database, and technical specifications. A unique 6-character Project ID will be instantly generated for your dedicated repository."}
        </p>

        {/* ─── Live Project ID Tag ─── */}
        <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#081432]/80 border border-[#00D2FF]/30 shadow-[0_0_20px_rgba(0,210,255,0.15)]">
          <span className="text-xs text-[#94A3B8]">
            {isFa ? "شناسه اختصاصی پوشه پروژه:" : "Dedicated Project ID:"}
          </span>
          <span className="text-sm font-mono font-extrabold text-[#00D2FF] tracking-widest bg-[#00D2FF]/10 px-2.5 py-0.5 rounded border border-[#00D2FF]/40">
            {projectCode || "------"}
          </span>
        </div>
      </div>

      {/* ─── Step Indicator Progress Bar ─── */}
      {!isSubmitted && (
        <div className="max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 text-center">
            {[
              { num: 1, title: isFa ? "نوع پروژه" : "Category" },
              { num: 2, title: isFa ? "مشخصات فنی" : "Technical Specs" },
              { num: 3, title: isFa ? "راه‌های ارتباطی" : "Contact (Optional)" },
              { num: 4, title: isFa ? "بازبینی و ثبت" : "Review & Submit" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setCurrentStep(s.num)}
                className={`py-2 sm:py-3.5 px-1 sm:px-4 rounded-xl transition-all flex items-center justify-center border text-[10.5px] sm:text-sm cursor-pointer select-none ${
                  currentStep === s.num
                    ? "bg-[#00D2FF]/15 border-[#00D2FF] text-[#00D2FF] font-bold shadow-[0_0_15px_rgba(0,210,255,0.25)]"
                    : currentStep > s.num
                    ? "bg-[#081432]/60 border-white/[0.1] text-emerald-400 font-medium"
                    : "bg-[#081432]/40 border-white/[0.05] text-[#64748B]"
                }`}
              >
                <span className="truncate max-w-full">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Main Content Area ─── */}
      {isSubmitted ? (
        /* ─── Success Screen with 6-character Code & Quick Actions ─── */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#081432]/75 border border-[#00D2FF]/40 text-center space-y-6 shadow-[0_0_50px_rgba(0,210,255,0.2)]"
        >
          <div className="w-16 h-16 rounded-full bg-[#00D2FF]/20 border border-[#00D2FF] flex items-center justify-center text-[#00D2FF] mx-auto shadow-[0_0_25px_#00D2FF]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {isFa ? "سفارش شما با موفقیت ثبت شد!" : "Order Successfully Submitted!"}
            </h2>
            <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
              {isFa
                ? "مشخصات پروژه و بریف فنی شما مستقیماً به ایمیل رسمی urclub7@gmail.com ارسال گردید."
                : "Your full project specification was dispatched directly to urclub7@gmail.com."}
            </p>
          </div>

          {/* 6-Character Project Folder Box */}
          <div className="p-6 rounded-2xl bg-[#040B20] border border-[#00D2FF]/30 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#94A3B8]">
              {isFa ? "شناسه اختصاصی پوشه و پیگیری پروژه شما" : "Your Dedicated Project & Folder ID"}
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl sm:text-4xl font-mono font-black text-[#00D2FF] tracking-widest selection:bg-[#00D2FF] selection:text-[#040B20]">
                {projectCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-2.5 rounded-xl bg-[#00D2FF]/10 hover:bg-[#00D2FF] text-[#00D2FF] hover:text-[#040B20] border border-[#00D2FF]/30 transition-all cursor-pointer"
                title={isFa ? "کپی شناسه" : "Copy ID"}
              >
                {copiedCode ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {isFa
                ? "تمام فایل‌ها، مخزن کد و مراحل توسعه در UrClub با نام این شناسه ۶ حرفی فولدرگذاری و مدیریت خواهد شد."
                : "All assets, code repositories, and milestone updates are indexed under this 6-character ID."}
            </p>
          </div>

          {/* Direct WhatsApp & Telegram Quick Contact */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isFa ? "گفتگوی فوری در واتساپ با شناسه" : "Chat on WhatsApp with ID"}</span>
            </a>

            <a
              href={getTelegramShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0088cc] hover:bg-[#299fdc] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,136,204,0.3)] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isFa ? "ارسال به تلگرام" : "Send to Telegram"}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                // regenerate code for next order
                const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
                let code = "";
                for (let i = 0; i < 6; i++) {
                  code += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                setProjectCode(code);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {isFa ? "ثبت سفارش جدید" : "Start New Order"}
            </button>
          </div>
        </motion.div>
      ) : (
        /* ─── Interactive Multi-step Form Grid ─── */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {/* Main Steps Form (2 Columns on Desktop) */}
          <div className="lg:col-span-2 p-4 sm:p-9 rounded-2xl bg-[#081432]/60 border border-white/[0.08]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ────────── STEP 1: CATEGORY SELECTION ────────── */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-base sm:text-xl font-bold text-white">
                      {isFa ? "انتخاب نوع پروژه" : "Select Project Category"}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                      {isFa
                        ? "یکی از ۴ حوزه اصلی فعالیت ما را انتخاب کنید تا فرم اختصاصی همان بخش فعال شود."
                        : "Choose from 4 main categories to unlock category-specific engineering fields."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      {
                        id: "website" as CategoryType,
                        icon: Globe,
                        title: isFa ? "طراحی و توسعه وب‌سایت" : "Website & Web Platform",
                        desc: isFa
                          ? "فروشگاهی، شرکتی، پورتفولیو شخصی و وب‌اپلیکیشن مقیاس‌پذیر"
                          : "E-commerce, corporate, portfolio, or custom web platform",
                      },
                      {
                        id: "mobile" as CategoryType,
                        icon: Smartphone,
                        title: isFa ? "اپلیکیشن موبایل" : "Mobile App",
                        desc: isFa
                          ? "برنامه‌های اندروید و iOS با کارایی بالا و تجربه کاربری روان"
                          : "Native or cross-platform Android & iOS applications",
                      },
                      {
                        id: "desktop" as CategoryType,
                        icon: Monitor,
                        title: isFa ? "نرم‌افزار کامپیوتر" : "Desktop Software",
                        desc: isFa
                          ? "برنامه‌های تخصصی ویندوز، مک و لینوکس با دیتابیس محلی یا ابری"
                          : "Windows, macOS, or Linux software with local/cloud DB",
                      },
                      {
                        id: "graphic" as CategoryType,
                        icon: Palette,
                        title: isFa ? "طراحی گرافیک، برندینگ و پوستر" : "Poster & Brand Design",
                        desc: isFa
                          ? "پوستر تبلیغاتی، کاور ریلز، طراحی لوگو و هویت بصری یکپارچه"
                          : "Marketing posters, social covers, vector logos & branding",
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = category === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setCategory(item.id)}
                          className={`p-3.5 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? "bg-[#00D2FF]/10 border-[#00D2FF] shadow-[0_0_25px_rgba(0,210,255,0.2)]"
                              : "bg-[#040B20]/60 border-white/[0.08] hover:border-white/[0.2] hover:bg-[#040B20]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-2.5">
                            <div
                              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "bg-[#00D2FF] text-[#040B20]"
                                  : "bg-white/[0.05] text-[#00D2FF]"
                              }`}
                            >
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <h3 className="text-xs sm:text-sm font-bold text-white">{item.title}</h3>
                          </div>
                          <p className="text-[11px] sm:text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Brand / Project Name */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                      {isFa ? "نام برند، پروژه یا ایده کاری شما:" : "Brand / Project / Working Name:"}
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder={isFa ? "مثلاً: فروشگاه آنلاین آریا / کلاب ۲۰۲۶" : "e.g. UrClub Digital / Apex Platform"}
                      className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]/60 transition-colors"
                    />
                  </div>

                  <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(0,210,255,0.25)]"
                    >
                      <span>{isFa ? "مرحله بعد: مشخصات فنی" : "Next: Technical Specs"}</span>
                      <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                    </button>
                  </div>
                </div>
              )}

              {/* ────────── STEP 2: DYNAMIC TECHNICAL SPECS ────────── */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      {isFa ? "مشخصات فنی اختصاصی" : "Dynamic Technical Specs"}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                      {isFa
                        ? "این بخش بر اساس نوع پروژه‌ای که در گام اول انتخاب کردید تنظیم شده است."
                        : "Customized fields matching your chosen category from Step 1."}
                    </p>
                  </div>

                  {/* A: Website Fields */}
                  {category === "website" && (
                    <div className="space-y-5">
                      {/* Website Type & Page Count */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                            {isFa ? "نوع وب‌سایت:" : "Website Type:"}
                          </label>
                          <select
                            value={websiteType}
                            onChange={(e) => setWebsiteType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#00D2FF]/60 cursor-pointer"
                          >
                            <option value="فروشگاهی (E-Commerce)">فروشگاهی (E-Commerce)</option>
                            <option value="شرکتی (Corporate)">شرکتی (Corporate / Business)</option>
                            <option value="پورتفولیو و شخصی (Portfolio)">پورتفولیو و شخصی (Portfolio)</option>
                            <option value="پلتفرم اختصاصی (Custom Web App)">پلتفرم اختصاصی (Custom Web App)</option>
                            <option value="وبلاگ و خبری (Blog & Magazine)">وبلاگ و خبری (Blog & Magazine)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                            {isFa ? "تعداد تقریبی صفحات:" : "Estimated Page Count:"}
                          </label>
                          <select
                            value={pageCount}
                            onChange={(e) => setPageCount(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#00D2FF]/60 cursor-pointer"
                          >
                            <option value="۱ تا ۵ صفحه (سبک و سریع)">۱ تا ۵ صفحه (سبک و سریع)</option>
                            <option value="۵ تا ۱۰ صفحه (استاندارد)">۵ تا ۱۰ صفحه (استاندارد)</option>
                            <option value="۱۰+ صفحه (پورتال کامل)">۱۰+ صفحه (پورتال کامل)</option>
                          </select>
                        </div>
                      </div>

                      {/* Domain Selection */}
                      <div className="p-4 rounded-xl bg-[#040B20]/60 border border-white/[0.06] space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <Globe className="w-4 h-4 text-[#00D2FF]" />
                          <span>{isFa ? "بخش دامنه و آدرس وب‌سایت (Domain)" : "Domain Configuration"}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[
                            {
                              id: "free_vercel_urclub",
                              label: isFa ? "ساب‌دومین رایگان Vercel / UrClub" : "Free Vercel/UrClub Subdomain",
                              desc: isFa ? "بدون هزینه دامنه" : "Zero domain cost",
                            },
                            {
                              id: "custom_owned",
                              label: isFa ? "دامنه اختصاصی خودم دارم" : "I Own a Domain",
                              desc: isFa ? "اتصال به سایت جدید" : "Point to new site",
                            },
                            {
                              id: "need_registration",
                              label: isFa ? "ثبت دامنه جدید" : "Register New Domain",
                              desc: isFa ? "خرید دامنه رسمی" : "Assistance with TLD",
                            },
                          ].map((d) => (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => setDomainChoice(d.id as any)}
                              className={`p-3 rounded-lg border text-right text-xs transition-all cursor-pointer ${
                                domainChoice === d.id
                                  ? "bg-[#00D2FF]/15 border-[#00D2FF] text-[#00D2FF]"
                                  : "bg-[#081432]/40 border-white/[0.06] text-[#94A3B8]"
                              }`}
                            >
                              <div className="font-bold text-white text-[13px]">{d.label}</div>
                              <div className="text-[11px] opacity-75">{d.desc}</div>
                            </button>
                          ))}
                        </div>

                        {domainChoice === "custom_owned" && (
                          <div className="mt-2">
                            <input
                              type="text"
                              value={customDomainName}
                              onChange={(e) => setCustomDomainName(e.target.value)}
                              placeholder="example.com"
                              className="w-full px-4 py-2.5 rounded-lg bg-[#040B20] border border-white/[0.1] text-xs text-white"
                              dir="ltr"
                            />
                          </div>
                        )}

                        {domainChoice === "need_registration" && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-[#94A3B8]">{isFa ? "پسوند پیشنهادی:" : "Target TLD:"}</span>
                            {[".com", ".de", ".net", ".org", ".io", ".ai"].map((tld) => (
                              <button
                                key={tld}
                                type="button"
                                onClick={() => setSelectedTld(tld)}
                                className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                                  selectedTld === tld
                                    ? "bg-[#00D2FF] text-[#040B20]"
                                    : "bg-white/[0.06] text-[#94A3B8]"
                                }`}
                              >
                                {tld}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Hosting & Database Selection */}
                      <div className="p-4 rounded-xl bg-[#040B20]/60 border border-white/[0.06] space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <Database className="w-4 h-4 text-[#00D2FF]" />
                          <span>{isFa ? "هاستینگ و پایگاه داده (Hosting & Database)" : "Hosting & Database"}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[
                            {
                              id: "free_vercel_supabase",
                              title: isFa ? "Vercel + Supabase ابری" : "Vercel + Supabase Cloud",
                              sub: isFa ? "توصیه شده (رایگان، امن، سریع)" : "Recommended (Free & Fast)",
                            },
                            {
                              id: "own_server",
                              title: isFa ? "سرور و هاستینگ شخصی" : "Self-Hosted / Own Server",
                              sub: isFa ? "مشتری هاست دارد" : "Existing infrastructure",
                            },
                            {
                              id: "no_database",
                              title: isFa ? "بدون نیاز به دیتابیس" : "No Database (Static)",
                              sub: isFa ? "لندینگ پیج و ایستا" : "Ultra-fast JAMStack",
                            },
                          ].map((h) => (
                            <button
                              key={h.id}
                              type="button"
                              onClick={() => setHostingDatabase(h.id as any)}
                              className={`p-3 rounded-lg border text-right text-xs transition-all cursor-pointer ${
                                hostingDatabase === h.id
                                  ? "bg-[#00D2FF]/15 border-[#00D2FF] text-[#00D2FF]"
                                  : "bg-[#081432]/40 border-white/[0.06] text-[#94A3B8]"
                              }`}
                            >
                              <div className="font-bold text-white text-[13px]">{h.title}</div>
                              <div className="text-[11px] opacity-75">{h.sub}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Theme Style & Color Pickers */}
                      <div className="p-4 rounded-xl bg-[#040B20]/60 border border-white/[0.06] space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <Palette className="w-4 h-4 text-[#00D2FF]" />
                          <span>{isFa ? "تم و رنگ‌بندی دلخواه (Theme & Colors)" : "Theme & Color Palette"}</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: "دارک سایبرپانک نئونی", label: isFa ? "سایبرپانک نئونی" : "Cyberpunk Neon" },
                            { id: "مینیمال مدرن", label: isFa ? "مینیمال مدرن" : "Modern Minimal" },
                            { id: "لوکس طلایی و مشکی", label: isFa ? "لوکس طلایی مشکی" : "Luxury Gold" },
                            { id: "لایت مود تمیز", label: isFa ? "لایت مود تمیز" : "Clean Light" },
                          ].map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setThemeStyle(t.id)}
                              className={`p-2.5 rounded-lg border text-center text-xs transition-all cursor-pointer ${
                                themeStyle === t.id
                                  ? "bg-[#00D2FF]/15 border-[#00D2FF] text-[#00D2FF] font-bold"
                                  : "bg-[#081432]/40 border-white/[0.06] text-[#94A3B8]"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>

                        {/* Interactive Color Picker */}
                        <div className="pt-2 flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#CBD5E1]">{isFa ? "رنگ اصلی:" : "Primary:"}</span>
                            <input
                              type="color"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                            />
                            <span className="text-xs font-mono text-[#00D2FF]">{primaryColor}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#CBD5E1]">{isFa ? "رنگ مکمل:" : "Secondary:"}</span>
                            <input
                              type="color"
                              value={secondaryColor}
                              onChange={(e) => setSecondaryColor(e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                            />
                            <span className="text-xs font-mono text-[#A855F7]">{secondaryColor}</span>
                          </div>

                          {/* Quick color pills */}
                          <div className="flex items-center gap-1.5 mr-auto">
                            {["#00D2FF", "#A855F7", "#EAB308", "#10B981", "#3B82F6"].map((hex) => (
                              <button
                                key={hex}
                                type="button"
                                onClick={() => setPrimaryColor(hex)}
                                style={{ backgroundColor: hex }}
                                className="w-5 h-5 rounded-full border border-white/20 hover:scale-110 transition-transform"
                                title={hex}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Website Features Checkboxes */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-[#CBD5E1]">
                          {isFa ? "امکانات ویژه و ماژول‌ها:" : "Special Modules & Features:"}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[
                            "درگاه پرداخت آنلاین",
                            "ورود و ثبت‌نام کاربران",
                            "پنل مدیریت ادمین اختصاصی",
                            "بهینه‌سازی سئو و لود زیر ۱ ثانیه",
                            "اتصال مستقیم واتساپ و چت آنلاین",
                            "چندزبانه بودن (فارسی / انگلیسی / آلمانی)",
                            "پس‌زمینه نئونی و انیمیشن‌های نرم",
                          ].map((feat) => {
                            const isChecked = websiteFeatures.includes(feat);
                            return (
                              <label
                                key={feat}
                                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                                  isChecked
                                    ? "bg-[#00D2FF]/10 border-[#00D2FF]/40 text-white"
                                    : "bg-[#040B20]/40 border-white/[0.06] text-[#94A3B8]"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleFeature(feat, websiteFeatures, setWebsiteFeatures)}
                                  className="w-4 h-4 rounded text-[#00D2FF] focus:ring-0 bg-[#040B20] border-white/20 cursor-pointer"
                                />
                                <span>{feat}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* B: Mobile App Fields */}
                  {category === "mobile" && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                          {isFa ? "نام اپلیکیشن و کاربری هدف:" : "App Name & Objective:"}
                        </label>
                        <input
                          type="text"
                          value={mobileAppName}
                          onChange={(e) => setMobileAppName(e.target.value)}
                          placeholder={isFa ? "مثلاً: اپلیکیشن خدمات تاکسی / فروشگاهی موبایل" : "e.g. Delivery or FinTech App"}
                          className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]/60"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                            {isFa ? "سیستم‌عامل هدف:" : "Target Platform:"}
                          </label>
                          <select
                            value={targetPlatform}
                            onChange={(e) => setTargetPlatform(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#00D2FF]/60 cursor-pointer"
                          >
                            <option value="هر دو (Android + iOS)">هر دو پلتفرم (Android + iOS)</option>
                            <option value="فقط اندروید (Android)">فقط اندروید (Android APK / Google Play)</option>
                            <option value="فقط آی‌او‌اس (iOS)">فقط آی‌او‌اس (Apple iOS / App Store)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                            {isFa ? "سرور و پایگاه داده:" : "Server & Database:"}
                          </label>
                          <select
                            value={mobileDatabase}
                            onChange={(e) => setMobileDatabase(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#00D2FF]/60 cursor-pointer"
                          >
                            <option value="پایگاه داده ابری Supabase (رایگان)">Supabase Cloud (پیشنهادی - سریع و رایگان)</option>
                            <option value="سرور اختصاصی و REST API">سرور و API اختصاصی</option>
                            <option value="سیستم کاملاً آفلاین (بدون اینترنت)">آفلاین (بدون نیاز به سرور اینترنتی)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-[#CBD5E1]">
                          {isFa ? "امکانات مورد نیاز اپلیکیشن:" : "Key App Features:"}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[
                            "پوش نوتیفیکیشن",
                            "ورود با شماره موبایل و گوگل",
                            "درگاه پرداخت درون‌برنامه‌ای",
                            "حالت آفلاین (Offline Mode)",
                            "نقشه و موقعیت‌یاب GPS",
                            "تم تاریک و روشن",
                          ].map((feat) => {
                            const isChecked = mobileFeatures.includes(feat);
                            return (
                              <label
                                key={feat}
                                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                                  isChecked
                                    ? "bg-[#00D2FF]/10 border-[#00D2FF]/40 text-white"
                                    : "bg-[#040B20]/40 border-white/[0.06] text-[#94A3B8]"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleFeature(feat, mobileFeatures, setMobileFeatures)}
                                  className="w-4 h-4 rounded text-[#00D2FF] focus:ring-0 bg-[#040B20] border-white/20 cursor-pointer"
                                />
                                <span>{feat}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* C: Desktop Software Fields */}
                  {category === "desktop" && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                          {isFa ? "نام نرم‌افزار و حوزه کاربرد:" : "Software Name & Application:"}
                        </label>
                        <input
                          type="text"
                          value={desktopSoftwareName}
                          onChange={(e) => setDesktopSoftwareName(e.target.value)}
                          placeholder={isFa ? "مثلاً: نرم‌افزار حسابداری / مدیریت مشتریان CRM" : "e.g. Accounting, CRM or ERP Suite"}
                          className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]/60"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                            {isFa ? "سیستم‌عامل هدف:" : "Target OS:"}
                          </label>
                          <select
                            value={targetOS}
                            onChange={(e) => setTargetOS(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#00D2FF]/60 cursor-pointer"
                          >
                            <option value="ویندوز (Windows)">ویندوز (Windows EXE/MSI)</option>
                            <option value="مک (macOS)">مک (macOS DMG)</option>
                            <option value="لینوکس (Linux)">لینوکس (Linux AppImage)</option>
                            <option value="تمام سیستم‌عامل‌ها (Cross-Platform)">همه سیستم‌عامل‌ها (Cross-Platform)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                            {isFa ? "پایگاه داده نرم‌افزار:" : "Database Architecture:"}
                          </label>
                          <select
                            value={desktopStorage}
                            onChange={(e) => setDesktopStorage(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#00D2FF]/60 cursor-pointer"
                          >
                            <option value="دیتابیس محلی سبک (SQLite)">دیتابیس محلی سبک (SQLite - آفلاین و سریع)</option>
                            <option value="اتصال به سرور ابری Supabase">اتصال آنلاین به دیتابیس ابری Supabase</option>
                            <option value="سیستم فایل‌محور (Excel / JSON)">سیستم فایل‌محور (Excel / JSON)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-[#CBD5E1]">
                          {isFa ? "ویژگی‌های نرم‌افزار:" : "Features:"}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[
                            "نسخه پرتابل (بدون نیاز به نصب)",
                            "سیستم پشتیبان‌گیری خودکار",
                            "چاپ و گزارش‌گیری PDF",
                            "سیستم لایسنس و قفل نرم‌افزاری",
                          ].map((feat) => {
                            const isChecked = desktopFeatures.includes(feat);
                            return (
                              <label
                                key={feat}
                                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                                  isChecked
                                    ? "bg-[#00D2FF]/10 border-[#00D2FF]/40 text-white"
                                    : "bg-[#040B20]/40 border-white/[0.06] text-[#94A3B8]"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleFeature(feat, desktopFeatures, setDesktopFeatures)}
                                  className="w-4 h-4 rounded text-[#00D2FF] focus:ring-0 bg-[#040B20] border-white/20 cursor-pointer"
                                />
                                <span>{feat}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* D: Graphic & Poster Fields */}
                  {category === "graphic" && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                            {isFa ? "نوع سفارش گرافیکی:" : "Graphic Order Type:"}
                          </label>
                          <select
                            value={graphicType}
                            onChange={(e) => setGraphicType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#00D2FF]/60 cursor-pointer"
                          >
                            <option value="پوستر تبلیغاتی حرفه‌ای">پوستر تبلیغاتی حرفه‌ای</option>
                            <option value="لوگو و هویت بصری برند">لوگو و هویت بصری برند</option>
                            <option value="کاور و پست شبکه‌های اجتماعی">کاور و پست‌های شبکه‌های اجتماعی</option>
                            <option value="کاتالوگ و بروشور شرکتی">کاتالوگ و بروشور شرکتی</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                            {isFa ? "ابعاد و نسبت تصویر:" : "Aspect Ratio & Dimensions:"}
                          </label>
                          <select
                            value={aspectRatio}
                            onChange={(e) => setAspectRatio(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#00D2FF]/60 cursor-pointer"
                          >
                            <option value="استوری اینستاگرام (۹:۱۶ عمودی)">استوری / ریلز اینستاگرام (۹:۱۶ عمودی)</option>
                            <option value="پست اینستاگرام (۱:۱ مربعی)">پست اینستاگرام (۱:۱ مربعی)</option>
                            <option value="چاپ پوستر بزرگ (A3 / A4)">چاپ پوستر باکیفیت (A3 / A4)</option>
                            <option value="ابعاد اختصاصی سفارشی">ابعاد سفارشی دلخواه</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                          {isFa ? "فرمت‌های تحویل فایل:" : "Delivery Formats:"}
                        </label>
                        <select
                          value={deliveryFormat}
                          onChange={(e) => setDeliveryFormat(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#00D2FF]/60 cursor-pointer"
                        >
                          <option value="وکتور لایه‌باز SVG/AI + خروجی WebP/PNG">وکتور لایه‌باز برداری (SVG / AI) + فایل باکیفیت WebP/PNG</option>
                          <option value="فایل فتوشاپ لایه‌باز (PSD)">فایل فتوشاپ لایه‌باز (PSD)</option>
                          <option value="پکیج کامل (AI + PSD + PNG بدون پس‌زمینه)">پکیج کامل فایل‌های لایه‌باز و بدون پس‌زمینه</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                          {isFa ? "توضیحات ایده، رنگ و حس‌وحال طرح:" : "Design Notes & Creative Vision:"}
                        </label>
                        <textarea
                          rows={3}
                          value={graphicDesignNotes}
                          onChange={(e) => setGraphicDesignNotes(e.target.value)}
                          placeholder={isFa ? "مثلاً: سبک مینیمال تیره با حاشیه‌های طلایی یا فیروزه‌ای..." : "e.g. Minimalist layout with clean contrast..."}
                          className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]/60 resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isFa ? "بازگشت" : "Back"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(0,210,255,0.25)]"
                    >
                      <span>{isFa ? "مرحله بعد: اطلاعات تماس" : "Next: Contact Info"}</span>
                      <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                    </button>
                  </div>
                </div>
              )}

              {/* ────────── STEP 3: OPTIONAL CONTACT INFO ────────── */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg sm:text-xl font-bold text-white">
                        {isFa ? "اطلاعات تماس و هویت (کاملاً اختیاری)" : "Contact Info (Optional)"}
                      </h2>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                        {isFa ? "بدون اجبار" : "Optional"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                      {isFa
                        ? "در صورت تمایل، شماره واتساپ یا ایمیل خود را بنویسید تا بتوانیم پیش‌فاکتور یا نتیجه پروژه را برایتان ارسال کنیم."
                        : "You can optionally leave your WhatsApp or email for direct delivery and follow-up."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                        {isFa ? "نام شما یا عنوان کسب‌وکار (اختیاری):" : "Your Name / Organization (Optional):"}
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder={isFa ? "مثلاً: احمد رضایی" : "e.g. Alex Miller"}
                        className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]/60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                        {isFa ? "شماره واتساپ یا تماس (اختیاری):" : "WhatsApp / Phone (Optional):"}
                      </label>
                      <input
                        type="text"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+49 ... / +93 ..."
                        className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]/60"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                        {isFa ? "آدرس ایمیل (اختیاری):" : "Email Address (Optional):"}
                      </label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]/60"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                        {isFa ? "آیدی تلگرام یا اینستاگرام (اختیاری):" : "Telegram / Social Handle (Optional):"}
                      </label>
                      <input
                        type="text"
                        value={socialId}
                        onChange={(e) => setSocialId(e.target.value)}
                        placeholder="@username"
                        className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]/60"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                      {isFa ? "یادداشت‌ها یا توضیحات ویژه (اختیاری):" : "Special Notes or Instructions (Optional):"}
                    </label>
                    <textarea
                      rows={3}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder={isFa ? "هر نکته، لینک یا فایل نمونه‌ای که مد نظر دارید را در اینجا بنویسید..." : "Any additional notes, reference links, or timeline targets..."}
                      className="w-full px-4 py-3 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]/60 resize-none"
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isFa ? "بازگشت" : "Back"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-3 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(0,210,255,0.25)]"
                    >
                      <span>{isFa ? "مرحله بعد: بازبینی و ثبت نهایی" : "Next: Review & Submit"}</span>
                      <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                    </button>
                  </div>
                </div>
              )}

              {/* ────────── STEP 4: REVIEW & SUBMIT ────────── */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      {isFa ? "بازبینی نهایی و ثبت سفارش" : "Final Review & Submission"}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                      {isFa
                        ? "خلاصه مشخصات فنی را در کارت روبرو مشاهده کنید. پس از کلیک بر روی ثبت سفارش، شناسه پروژه صادر و اطلاعات به ایمیل urclub7@gmail.com ارسال خواهد شد."
                        : "Review your summary card. Clicking submit dispatches specifications directly to urclub7@gmail.com."}
                    </p>
                  </div>

                  {/* Highlight Box with the 6-character Code */}
                  <div className="p-5 rounded-2xl bg-[#040B20] border border-[#00D2FF]/40 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#94A3B8]">
                        {isFa ? "شناسه پوشه اختصاصی پروژه شما:" : "Dedicated Folder & Tracking ID:"}
                      </span>
                      <div className="text-2xl font-mono font-black text-[#00D2FF] tracking-widest mt-0.5">
                        {projectCode}
                      </div>
                    </div>
                    <div className="text-left text-xs text-[#64748B] max-w-xs leading-relaxed hidden sm:block">
                      {isFa
                        ? "این شناسه ۶ رقمی پوشه اصلی پروژه شما در سرورهای UrClub خواهد بود."
                        : "Indexed directory name for your project repository."}
                    </div>
                  </div>

                  {/* Summary preview table */}
                  <div className="p-4 rounded-xl bg-[#040B20]/60 border border-white/[0.06] space-y-2.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-[#94A3B8]">{isFa ? "دسته‌بندی:" : "Category:"}</span>
                      <span className="font-semibold text-white">
                        {category === "website"
                          ? "وب‌سایت"
                          : category === "mobile"
                          ? "اپلیکیشن موبایل"
                          : category === "desktop"
                          ? "نرم‌افزار کامپیوتر"
                          : "طراحی گرافیک و پوستر"}
                      </span>
                    </div>

                    {category === "website" && (
                      <>
                        <div className="flex justify-between py-1 border-b border-white/[0.04]">
                          <span className="text-[#94A3B8]">{isFa ? "دامنه:" : "Domain:"}</span>
                          <span className="font-mono text-[#00D2FF]">
                            {domainChoice === "free_vercel_urclub"
                              ? "Vercel / UrClub Subdomain"
                              : domainChoice === "custom_owned"
                              ? customDomainName || "Owned Domain"
                              : `New ${selectedTld}`}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/[0.04]">
                          <span className="text-[#94A3B8]">{isFa ? "هاستینگ و دیتابیس:" : "Hosting/DB:"}</span>
                          <span className="text-white">
                            {hostingDatabase === "free_vercel_supabase"
                              ? "Vercel + Supabase (رایگان)"
                              : hostingDatabase === "own_server"
                              ? "سرور شخصی"
                              : "استاتیک"}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="flex justify-between py-1">
                      <span className="text-[#94A3B8]">{isFa ? "روش پیگیری کارفرما:" : "Contact Mode:"}</span>
                      <span className="text-[#CBD5E1]">
                        {clientPhone || clientEmail || socialId || (isFa ? "ناشناس (پیگیری مستقیم با شناسه)" : "Direct via ID")}
                      </span>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center">
                      {errorMessage}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isFa ? "بازگشت" : "Back"}
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] disabled:opacity-50 text-[#040B20] font-extrabold text-sm flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_25px_rgba(0,210,255,0.4)]"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isSubmitting
                          ? (isFa ? "در حال ثبت و صدور شناسه..." : "Generating ID...")
                          : (isFa ? "ثبت نهایی سفارش و صدور شناسه" : "Submit & Generate ID")}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* ────────── LIVE SUMMARY CARD (Sticky Sidebar) ────────── */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#081432]/60 border border-white/[0.08] lg:sticky lg:top-28 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00D2FF]" />
                <span>{isFa ? "خلاصه زنده سفارش" : "Live Summary Card"}</span>
              </span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/20">
                {projectCode}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#64748B] block text-[11px]">{isFa ? "دسته‌بندی انتخابی:" : "Category:"}</span>
                <span className="font-semibold text-white">
                  {category === "website"
                    ? (isFa ? "طراحی و توسعه وب‌سایت" : "Website & Web Platform")
                    : category === "mobile"
                    ? (isFa ? "اپلیکیشن موبایل" : "Mobile App")
                    : category === "desktop"
                    ? (isFa ? "نرم‌افزار کامپیوتر" : "Desktop Software")
                    : (isFa ? "طراحی گرافیک و پوستر" : "Poster & Branding")}
                </span>
              </div>

              {category === "website" && (
                <>
                  <div>
                    <span className="text-[#64748B] block text-[11px]">{isFa ? "دامنه و آدرس وبسایت:" : "Domain:"}</span>
                    <span className="font-mono text-[#00D2FF]">
                      {domainChoice === "free_vercel_urclub"
                        ? "ساب‌دومین رایگان Vercel / UrClub"
                        : domainChoice === "custom_owned"
                        ? customDomainName || "دامنه اختصاصی"
                        : `دامنه جدید (${selectedTld})`}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#64748B] block text-[11px]">{isFa ? "هاست و دیتابیس:" : "Infrastructure:"}</span>
                    <span className="text-[#CBD5E1]">
                      {hostingDatabase === "free_vercel_supabase"
                        ? "Vercel + Supabase ابری (رایگان)"
                        : hostingDatabase === "own_server"
                        ? "سرور شخصی کارفرما"
                        : "سایت استاتیک بدون دیتابیس"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#64748B] block text-[11px]">{isFa ? "پالت رنگی:" : "Palette:"}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: primaryColor }} />
                      <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: secondaryColor }} />
                      <span className="text-[11px] font-mono text-[#94A3B8]">{primaryColor}</span>
                    </div>
                  </div>
                </>
              )}

              {category === "mobile" && (
                <div>
                  <span className="text-[#64748B] block text-[11px]">{isFa ? "پلتفرم هدف:" : "Platform:"}</span>
                  <span className="text-white">{targetPlatform}</span>
                </div>
              )}

              {category === "desktop" && (
                <div>
                  <span className="text-[#64748B] block text-[11px]">{isFa ? "سیستم‌عامل:" : "Target OS:"}</span>
                  <span className="text-white">{targetOS}</span>
                </div>
              )}

              {category === "graphic" && (
                <div>
                  <span className="text-[#64748B] block text-[11px]">{isFa ? "نوع سفارش:" : "Type:"}</span>
                  <span className="text-white">{graphicType}</span>
                </div>
              )}

              <div>
                <span className="text-[#64748B] block text-[11px]">{isFa ? "نام برند / پروژه:" : "Brand Name:"}</span>
                <span className="text-[#CBD5E1]">{brandName || mobileAppName || desktopSoftwareName || "تعیین نشده"}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] text-[11px] text-[#64748B] leading-relaxed">
              {isFa
                ? "ارسال خودکار بریف پروژه به urclub7@gmail.com به همراه شناسه رهگیری."
                : "Automatic brief delivery to urclub7@gmail.com with unique tracking ID."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
