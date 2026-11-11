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
      desc: "ساخت وبسایت‌ها، دکان‌های آنلاین و پلتفرم‌های ابری با سرعت بالا.",
      desc_en: "High-performance websites, online stores, and scalable cloud systems.",
      icon: Cloud,
    },
    {
      title: "مشاوره هوش مصنوعی و اتوماسیون",
      title_en: "AI Consulting & Automation",
      desc: "استفاده از هوش مصنوعی برای تسریع کارها و اتوماسیون پروسه‌ها.",
      desc_en: "Leveraging AI for workflow automation and accelerated delivery.",
      icon: Cpu,
    },
    {
      title: "امنیت داده و استانداردهای جهانی",
      title_en: "Data Security & Global Standards",
      desc: "رعایت استانداردهای امنیتی اروپا، حفظ حریم خصوصی و حفاظت داتا.",
      desc_en: "Full GDPR compliance, rigorous privacy protocols, and data protection.",
      icon: ShieldCheck,
    },
    {
      title: "کادرهای تعاملی و پرتال‌های هوشمند",
      title_en: "Interactive Frames & Smart Portals",
      desc: "سیستم‌های تعاملی برای تست زنده سایت‌ها و ثبت آنلاین سفارشات.",
      desc_en: "In-frame live website previews and seamless online ordering systems.",
      icon: Layout,
    },
    {
      title: "استراتیژی دیجیتال و مدل‌های سرمایه‌گذاری",
      title_en: "Digital Strategy & Investment Models",
      desc: "مدل‌های شفاف همکاری تجاری با مفاد پایدار برای سرمایه‌گذاران.",
      desc_en: "Transparent partnership frameworks with sustainable investor returns.",
      icon: TrendingUp,
    },
    {
      title: "مدرن‌سازی زیرساخت و معماری نرم‌افزار",
      title_en: "Infrastructure Modernization & Software Architecture",
      desc: "مدرن‌سازی سیستم‌ها و بلند بردن سرعت و کارایی کدهای نرم‌افزار.",
      desc_en: "Refactoring legacy code for peak speed, reliability, and scale.",
      icon: Code2,
    },
  ];

  return (
    <div className="relative w-full">
      {/* Centered Clean Header */}
      <div className="flex flex-col items-center text-center mb-5 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isFa ? "تخصص‌ها و توانمندی‌های ما" : "Our Capabilities & Services"}
        </h2>
        <p className="mt-2 text-xs sm:text-base text-slate-600 dark:text-[#94A3B8] max-w-xl leading-relaxed">
          {isFa
            ? "مهندسی نرم‌افزار، کد پاک و اجرای معیاری پروژه‌ها."
            : "Software engineering, clean code, and standard project execution."}
        </p>
      </div>

      {/* 6-Card Clean & Orderly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 sm:p-7 rounded-xl sm:rounded-2xl bg-white dark:bg-[#081432]/60 border border-slate-200/80 dark:border-white/[0.08] hover:border-sky-500/40 dark:hover:border-[#00D2FF]/25 shadow-sm dark:shadow-none transition-all duration-200 flex flex-col justify-start text-start"
            >
              <div className="mb-2 sm:mb-3.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-sky-50 dark:bg-[#00D2FF]/10 border border-sky-200 dark:border-[#00D2FF]/20 flex items-center justify-center text-sky-600 dark:text-[#00D2FF]">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>

              <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1 sm:mb-2 leading-snug">
                {isFa ? item.title : item.title_en}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed font-normal">
                {isFa ? item.desc : item.desc_en}
              </p>
            </div>
          );
        })}
      </div>

      {/* Subtle Consultation Callout */}
      <div className="mt-5 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
        <span className="text-xs text-slate-600 dark:text-[#94A3B8]">
          {isFa
            ? "به دنبال راه‌حل اختصاصی برای پروژه یا سرمایه‌گذاری خود استید؟"
            : "Looking for a custom solution for your project or investment?"}
        </span>
        <Link
          href="/#contact-section"
          className="h-9 px-5 rounded-full bg-sky-600 hover:bg-sky-700 dark:bg-white text-white dark:text-[#040B20] dark:hover:bg-[#00D2FF] text-xs font-bold transition-all duration-300 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.15)] inline-flex items-center gap-1.5"
        >
          <Handshake className="w-3.5 h-3.5" />
          <span>{isFa ? "مشاوره رایگان با تیم" : "Free Consultation with the Team"}</span>
        </Link>
      </div>
    </div>
  );
}
