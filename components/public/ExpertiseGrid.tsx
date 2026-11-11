"use client";

import React from "react";
import Link from "next/link";
import {
  YazdanCloudPlatformIcon,
  YazdanNeuralCoreIcon,
  YazdanCryptoGlobeIcon,
  YazdanInteractivePortalIcon,
  YazdanGrowthStrategyIcon,
  YazdanCodeArchitectureIcon,
  YazdanConsultationIcon,
} from "@/components/ui/YazdanIcons";
import { useLanguage } from "@/lib/i18n";

export default function ExpertiseGrid() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const services = [
    {
      title: "راه‌حل‌های ابری و وب‌سایت‌های عصری",
      title_en: "Cloud Solutions & Modern Websites",
      desc: "ساخت وبسایت‌ها، دکان‌های آنلاین و پلتفرم‌های ابری با سرعت عالی.",
      desc_en: "High-performance websites, online stores, and scalable cloud systems.",
      icon: YazdanCloudPlatformIcon,
    },
    {
      title: "مشاوره هوش مصنوعی و اتوماسیون",
      title_en: "AI Consulting & Automation",
      desc: "استفاده از هوش مصنوعی برای سرعت بخشیدن به کارها و اتوماسیون.",
      desc_en: "Leveraging AI for workflow automation and accelerated delivery.",
      icon: YazdanNeuralCoreIcon,
    },
    {
      title: "امنیت داده‌ها و معیارهای جهانی",
      title_en: "Data Security & Global Standards",
      desc: "رعایت معیارهای امنیتی اروپا، حفظ حریم خصوصی و حفاظت داتا.",
      desc_en: "Full compliance with modern privacy protocols and robust data protection.",
      icon: YazdanCryptoGlobeIcon,
    },
    {
      title: "کادرهای تعاملی و پرتال‌های هوشمند",
      title_en: "Interactive Frames & Smart Portals",
      desc: "سیستم‌های تعاملی برای نمایش زنده پروژه‌ها و ثبت سفارشات آنلاین.",
      desc_en: "In-frame live website previews and seamless online ordering systems.",
      icon: YazdanInteractivePortalIcon,
    },
    {
      title: "استراتیژی دیجیتال و جذب سرمایه",
      title_en: "Digital Strategy & Investment Models",
      desc: "مدل‌های شفاف همکاری تجاری با بازدهی پایدار برای سرمایه‌گذاران.",
      desc_en: "Transparent partnership frameworks with sustainable investor returns.",
      icon: YazdanGrowthStrategyIcon,
    },
    {
      title: "مدرن‌سازی زیرساخت و معماری کد",
      title_en: "Infrastructure & Code Architecture",
      desc: "بهینه‌سازی سیستم‌ها و بلند بردن سرعت و کارایی کدهای نرم‌افزار.",
      desc_en: "Refactoring legacy code for peak speed, reliability, and scale.",
      icon: YazdanCodeArchitectureIcon,
    },
  ];

  return (
    <div className="relative w-full">
      {/* Centered Clean Header */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
          {isFa ? "تخصص‌ها و توانمندی‌های ما" : "Our Capabilities & Services"}
        </h2>
        <p className="mt-2 text-xs sm:text-base text-black dark:text-white max-w-xl leading-relaxed">
          {isFa
            ? "مهندسی نرم‌افزار، کد پاک و اجرای معیاری پروژه‌ها."
            : "Software engineering, clean code, and standard project execution."}
        </p>
      </div>

      {/* 6-Card Clean & Orderly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-white dark:bg-[#13110E]/80 border border-stone-200/90 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/50 shadow-sm transition-all duration-200 flex flex-col justify-start text-start"
            >
              <div className="mb-2.5 sm:mb-3.5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FAF8F5] dark:bg-[#090807] border border-[#B8860B]/30 dark:border-[#D4AF37]/40 dark:shadow-[0_0_15px_rgba(212,175,55,0.15)] flex items-center justify-center transition-all duration-300">
                  <Icon className="w-6 h-6 sm:w-6 sm:h-6" />
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-black dark:text-white mb-1 sm:mb-1.5 leading-snug">
                {isFa ? item.title : item.title_en}
              </h3>

              <p className="text-xs text-black dark:text-white leading-relaxed font-normal">
                {isFa ? item.desc : item.desc_en}
              </p>
            </div>
          );
        })}
      </div>

      {/* Subtle Consultation Callout */}
      <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
        <span className="text-xs text-black dark:text-white">
          {isFa
            ? "به دنبال راه‌حل اختصاصی برای پروژه یا سرمایه‌گذاری خود استید؟"
            : "Looking for a custom solution for your project or investment?"}
        </span>
        <Link
          href="/#contact-section"
          className="h-9 px-5 rounded-full bg-gradient-to-r from-[#E5C396] via-[#D4AF37] to-[#C5A880] text-[#090807] hover:brightness-110 text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.25)] inline-flex items-center gap-1.5 cursor-pointer"
        >
          <YazdanConsultationIcon className="w-3.5 h-3.5" />
          <span>{isFa ? "مشاوره با تیم ما" : "Free Consultation"}</span>
        </Link>
      </div>
    </div>
  );
}
