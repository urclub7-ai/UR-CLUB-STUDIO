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
      desc: "راه‌اندازی با پایداری مداوم",
      desc_en: "Full deployment with continuous reliability",
    },
    {
      value: isFa ? "۱۰۰٪" : "100%",
      title: "انطباق با استانداردهای مهندسی",
      title_en: "Engineering Standards",
      desc: "کد پاک، امنیت بالا و معیارهای عصری",
      desc_en: "Clean code, robust security, and modern standards",
    },
    {
      value: isFa ? "۴.۹۸" : "4.98",
      title: "رضایت شرکا و مراجعین",
      title_en: "Partner & Client Satisfaction",
      desc: "کیفیت خدمات و اطمینان کاری",
      desc_en: "High client trust and exceptional delivery",
    },
  ];

  return (
    <div className="relative w-full">
      {/* Clean Centered Header matching other sections */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white">
          {isFa ? "آمار و کارکرد ما" : "Our Track Record & Performance"}
        </h2>
        <p className="mt-2 text-xs sm:text-base text-black dark:text-white max-w-xl leading-relaxed">
          {isFa
            ? "شاخص‌های واقعی از رضایت همکاران و پایداری سیستم‌ها."
            : "Verified metrics reflecting client trust and system stability."}
        </p>
      </div>

      {/* 3 Metric Cards Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="relative p-3 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-[#13110E]/80 border border-stone-200/90 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/50 shadow-sm transition-all duration-300 flex flex-col items-center text-center group overflow-hidden"
          >
            {/* Subtle top accent highlight on hover */}
            <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Metric Number */}
            <div className="text-2xl sm:text-5xl font-extrabold text-[#8B6914] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#F5DEB3] dark:via-[#D4AF37] dark:to-[#C5A880] mb-1 sm:mb-3 select-none">
              {item.value}
            </div>

            {/* Title */}
            <h3 className="text-xs sm:text-lg font-bold text-black dark:text-white mb-0.5 sm:mb-1.5 leading-tight">
              {isFa ? item.title : item.title_en}
            </h3>

            {/* Description */}
            <p className="hidden sm:block text-xs sm:text-sm text-black dark:text-white leading-relaxed">
              {isFa ? item.desc : item.desc_en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
