"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";

export default function StatsHorizonSection() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const stats = [
    {
      value: isFa ? "۱۵+" : "15+",
      title: "پروژه‌های موفق و فعال",
      title_en: "Active & Launched Projects",
      desc: "راه‌اندازی کامل با پایداری مداوم",
      desc_en: "Full deployment with continuous reliability",
    },
    {
      value: isFa ? "۱۰۰٪" : "100%",
      title: "انطباق با استانداردهای مهندسی",
      title_en: "Engineering Standards Compliance",
      desc: "کد پاک، امنیت بالا و استانداردهای عصری",
      desc_en: "Clean code, robust security, and modern standards",
    },
    {
      value: "4.98",
      title: "رضایت شرکا و سرمایه‌گذاران",
      title_en: "Partner & Investor Satisfaction",
      desc: "اعتماد شرکا و کیفیت خدمات",
      desc_en: "High partner trust and exceptional service quality",
    },
  ];

  return (
    <div className="relative w-full">
      {/* Clean Centered Header matching other sections */}
      <div className="flex flex-col items-center text-center mb-5 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          {isFa ? "آمار و عملکرد ما" : "Our Track Record & Performance"}
        </h2>
        <p className="mt-2 text-xs sm:text-base text-slate-600 dark:text-[#94A3B8] max-w-xl leading-relaxed">
          {isFa
            ? "شاخص‌های واقعی از رضایت همکاران و پایداری سیستم‌ها."
            : "Verified metrics reflecting client trust and system stability."}
        </p>
      </div>

      {/* 3 Metric Cards Grid (3-columns on mobile for compact vertical space, cards on desktop) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="relative p-3 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-[#081432]/60 border border-slate-200/80 dark:border-white/[0.08] hover:border-sky-500/40 dark:hover:border-[#00D2FF]/30 shadow-sm dark:shadow-none transition-all duration-300 flex flex-col items-center text-center group overflow-hidden"
          >
            {/* Subtle top accent highlight on hover */}
            <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/40 dark:via-[#00D2FF]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Metric Number */}
            <div className="text-2xl sm:text-5xl font-extrabold text-sky-600 dark:text-[#00D2FF] mb-1 sm:mb-3 select-none">
              {item.value}
            </div>

            {/* Title */}
            <h3 className="text-xs sm:text-lg font-bold text-slate-900 dark:text-white mb-0.5 sm:mb-1.5 leading-tight">
              {isFa ? item.title : item.title_en}
            </h3>

            {/* Description (desktop only to prevent vertical clutter on mobile) */}
            <p className="hidden sm:block text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
              {isFa ? item.desc : item.desc_en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

