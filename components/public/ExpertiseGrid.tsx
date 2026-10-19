"use client";

import React from "react";
import Link from "next/link";
import {
  Cloud,
  Cpu,
  ShieldCheck,
  Layout,
  TrendingUp,
  Code2,
  Handshake,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function ExpertiseGrid() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const services = [
    {
      title: "راه‌حل‌های ابری و وب‌سایت‌های مدرن",
      title_en: "Cloud Solutions & Modern Websites",
      desc: "طراحی و استقرار پلتفرم‌های مقیاس‌پذیر، فروشگاه‌های آنلاین و زیرساخت‌های پایدار با سرعت بارگذاری فوق‌سریع.",
      desc_en: "Designing and deploying scalable platforms, online stores, and resilient infrastructures with ultra-fast loading speeds.",
      icon: Cloud,
    },
    {
      title: "مشاوره هوش مصنوعی و اتوماسیون",
      title_en: "AI Consulting & Automation",
      desc: "بهره‌گیری از ابزارهای پیشرفته هوش مصنوعی جهت تسریع زمان تحویل پروژه‌ها و بهینه‌سازی فرآیندهای فنی.",
      desc_en: "Leveraging cutting-edge AI tools to accelerate project delivery timelines and optimize technical workflows.",
      icon: Cpu,
    },
    {
      title: "امنیت داده و استانداردهای جهانی",
      title_en: "Data Security & Global Standards",
      desc: "انطباق کامل با پروتکل‌های سخت‌گیرانه حفظ حریم خصوصی (GDPR)، کدنویسی تمیز و حفاظت جامع از اطلاعات.",
      desc_en: "Full compliance with strict privacy protocols (GDPR), clean code architecture, and comprehensive data protection.",
      icon: ShieldCheck,
    },
    {
      title: "کادرهای تعاملی و پرتال‌های هوشمند",
      title_en: "Interactive Frames & Smart Portals",
      desc: "طراحی سیستم‌های تعاملی پیشرفته جهت مرور زنده وب‌سایت‌ها در صفحه، سیستم‌های سفارش آنلاین و پلتفرم‌های وب.",
      desc_en: "Designing advanced interactive systems for live in-page website previews, online ordering workflows, and web portals.",
      icon: Layout,
    },
    {
      title: "استراتیژی دیجیتال و مدل‌های سرمایه‌گذاری",
      title_en: "Digital Strategy & Investment Models",
      desc: "ایجاد مدل‌های شفاف شراکت برای سرمایه‌گذاران و همکاران تجاری با رویکرد بازگشت سرمایه منطقی و پایدار.",
      desc_en: "Establishing transparent partnership models for investors and business partners with rational, sustainable ROI.",
      icon: TrendingUp,
    },
    {
      title: "مدرن‌سازی زیرساخت و معماری نرم‌افزار",
      title_en: "Infrastructure Modernization & Software Architecture",
      desc: "بازنویسی سیستم‌های قدیمی با فناوری‌های مدرن، بهینه‌سازی عملکرد کد و کسب حداکثر کارایی فنی.",
      desc_en: "Refactoring legacy systems with modern technologies, optimizing code performance, and achieving peak technical efficiency.",
      icon: Code2,
    },
  ];

  return (
    <div className="relative w-full">
      {/* Centered Clean Header */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {isFa ? "شایستگی‌ها و توانمندی‌های مهندسی ما" : "Our Engineering Competencies & Capabilities"}
        </h2>
        <p className="mt-2.5 text-xs sm:text-base text-[#94A3B8] max-w-xl leading-relaxed">
          {isFa
            ? "ترکیب مهندسی نرم‌افزار، استانداردهای روز جهانی و راهکارهای کارآمد برای موفقیت پروژه‌ها"
            : "Combining software engineering, global modern standards, and efficient solutions for project success"}
        </p>
      </div>

      {/* 6-Card Clean & Orderly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 sm:p-7 rounded-2xl bg-[#081432]/60 border border-white/[0.08] hover:border-[#00D2FF]/25 transition-all duration-200 flex flex-col justify-start text-start"
            >
              <div className="mb-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#00D2FF]/10 border border-[#00D2FF]/20 flex items-center justify-center text-[#00D2FF]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 leading-snug">
                {isFa ? item.title : item.title_en}
              </h3>

              <p className="text-xs sm:text-sm text-[#94A3B8] sm:text-[#CBD5E1] leading-relaxed font-normal">
                {isFa ? item.desc : item.desc_en}
              </p>
            </div>
          );
        })}
      </div>

      {/* Subtle Consultation Callout */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <span className="text-xs text-[#94A3B8]">
          {isFa
            ? "به دنبال راه‌حل اختصاصی برای پروژه یا سرمایه‌گذاری خود استید؟"
            : "Looking for a custom solution for your project or investment?"}
        </span>
        <Link
          href="/#contact-section"
          className="h-9 px-5 rounded-full bg-white hover:bg-[#00D2FF] text-[#040B20] text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.15)] inline-flex items-center gap-1.5"
        >
          <Handshake className="w-3.5 h-3.5" />
          <span>{isFa ? "مشاوره رایگان با تیم" : "Free Consultation with the Team"}</span>
        </Link>
      </div>
    </div>
  );
}
