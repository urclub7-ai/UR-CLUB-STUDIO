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
      title_en: "Successful & Active Projects",
      desc: "پیاده‌سازی و استقرار کامل سیستم‌ها با پایداری فنی مداوم",
      desc_en: "Complete deployment and maintenance of platforms with continuous technical stability",
    },
    {
      value: isFa ? "۱۰۰٪" : "100%",
      title: "انطباق با استانداردهای مهندسی",
      title_en: "Engineering Standards Compliance",
      desc: "کدنویسی تمیز، امنیت بالا و زیرساخت مقیاس‌پذیر",
      desc_en: "Clean code, robust security protocols, and scalable infrastructure",
    },
    {
      value: "4.98",
      title: "رضایت شرکا و سرمایه‌گذاران",
      title_en: "Partner & Investor Satisfaction",
      desc: "شاخص اعتماد و رضایت همکاران تجاری از کیفیت خدمات",
      desc_en: "Index of trust and client satisfaction regarding service excellence",
    },
  ];

  return (
    <div className="relative w-full">
      {/* Clean Centered Header matching other sections */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white">
          {isFa ? "برای اطمینان، عملکرد و آمار ما را ببینید" : "Examine Our Verified Performance & Metrics"}
        </h2>
        <p className="mt-2.5 text-xs sm:text-base text-[#94A3B8] max-w-xl leading-relaxed">
          {isFa
            ? "شاخص‌های شفاف و ثبت‌شده از رضایت شرکا، کیفیت اجرا و پایداری پروژه‌ها"
            : "Transparent, recorded indicators of partner satisfaction, execution quality, and platform stability"}
        </p>
      </div>

      {/* 3 Metric Cards Grid (Matching upper sections card design) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="relative p-5 sm:p-8 rounded-2xl bg-[#081432]/60 border border-white/[0.08] hover:border-[#00D2FF]/30 transition-all duration-300 flex flex-col items-center text-center group overflow-hidden"
          >
            {/* Subtle top accent highlight on hover */}
            <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Metric Number */}
            <div className="text-3xl sm:text-5xl font-extrabold text-[#00D2FF] mb-2 sm:mb-3 select-none">
              {item.value}
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-lg font-bold text-white mb-1.5">
              {isFa ? item.title : item.title_en}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#94A3B8] sm:text-[#CBD5E1] leading-relaxed">
              {isFa ? item.desc : item.desc_en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

