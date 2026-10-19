"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";

export default function TeamCredibilitySection() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const teamDisciplines = [
    {
      num: "۰۱",
      num_en: "01",
      title: "معماری سیستم و توسعه وب",
      title_en: "Full-Stack & Systems Architecture",
      desc: "طراحی و پیاده‌سازی پلتفرم‌های ابری مقیاس‌پذیر، فروشگاه‌ها و وب‌سایت‌های مدرن با کدهای تمیز و امنیت بالا.",
      desc_en: "Scalable cloud architecture, web platforms, and high-performance APIs engineered for long-term reliability.",
    },
    {
      num: "۰۲",
      num_en: "02",
      title: "طراحی رابط کاربری و هویت برند",
      title_en: "UI/UX & Brand Identity",
      desc: "خلق هویت بصری یکپارچه، طراحی لوگوهای برداری اختصاصی و تجربه کاربری روان، مدرن و هماهنگ.",
      desc_en: "Cohesive visual identity systems, vector brand marks, and intuitive digital interfaces tailored for users.",
    },
    {
      num: "۰۳",
      num_en: "03",
      title: "هوش مصنوعی و اتوماسیون",
      title_en: "AI Solutions & Automation",
      desc: "بهره‌گیری هوشمندانه از ابزارهای نسل جدید هوش مصنوعی برای افزایش سرعت اجرای پروژه‌ها و بررسی دقیق کیفیت.",
      desc_en: "Leveraging modern AI tooling to accelerate delivery timelines and maintain rigorous code quality.",
    },
    {
      num: "۰۴",
      num_en: "04",
      title: "امنیت، سرعت و استاندارد اروپا",
      title_en: "Cloud Security & European Standards",
      desc: "استقرار پایدار بر بستر ابری، بارگذاری زیر ۱ ثانیه و رعایت کامل استانداردهای بین‌المللی حفظ داده‌ها.",
      desc_en: "Zero-latency edge deployment, sub-second load times, and full compliance with strict privacy standards.",
    },
  ];

  return (
    <div id="team-credibility" className="relative w-full scroll-mt-28">
      {/* ─── Clean Centered Header (Matching upper sections) ─── */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {isFa
            ? "تیم متعهد به استانداردهای بین‌المللی و اجرای تمیز"
            : "Engineered for Clean Execution & High Trust"}
        </h2>
        <p className="mt-2.5 text-xs sm:text-base text-[#94A3B8] leading-relaxed">
          {isFa
            ? "ترکیب تخصص در توسعه نرم‌افزار، هویت بصری و فناوری‌های روز برای خلق پروژه‌های پایدار و ارزشمند"
            : "Combining deep software engineering and brand craft to build scalable, high-yield digital platforms."}
        </p>
      </div>

      {/* ─── 4 Disciplines Grid (Varied, minimalist, no clutter) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {teamDisciplines.map((item, idx) => (
          <div
            key={idx}
            className="group relative p-5 sm:p-8 rounded-2xl bg-[#081432]/60 border border-white/[0.08] hover:border-[#00D2FF]/35 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle top glow highlight */}
            <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              {/* Title & Concise Summary */}
              <h3 className="text-base sm:text-xl font-bold text-white group-hover:text-[#00D2FF] transition-colors leading-snug">
                {isFa ? item.title : item.title_en}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                {isFa ? item.desc : item.desc_en}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Minimalist Stats Strip (Clean, integrated, not repetitive) ─── */}
      <div className="mt-8 sm:mt-10 py-6 sm:py-8 px-6 rounded-2xl bg-[#081432]/30 border border-white/[0.06] grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-white/[0.06]">
        <div className="pt-3 lg:pt-0">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#00D2FF] font-mono">
            {isFa ? "+۱۵" : "+15"}
          </div>
          <div className="text-xs text-[#94A3B8] mt-1">
            {isFa ? "پروژه‌های اجرا شده" : "Executed Projects"}
          </div>
        </div>
        <div className="pt-3 lg:pt-0">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#00D2FF] font-mono">
            {isFa ? "< ۱ ثانیه" : "< 1s"}
          </div>
          <div className="text-xs text-[#94A3B8] mt-1">
            {isFa ? "میانگین زمان بارگذاری وب" : "Avg. Load Speed"}
          </div>
        </div>
        <div className="pt-3 lg:pt-0">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#00D2FF] font-mono">
            {isFa ? "۱۰۰٪" : "100%"}
          </div>
          <div className="text-xs text-[#94A3B8] mt-1">
            {isFa ? "کدنویسی تمیز و استاندارد" : "Clean Code & Quality"}
          </div>
        </div>
        <div className="pt-3 lg:pt-0">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#00D2FF] font-mono">
            {isFa ? "۲۴ / ۷" : "24/7"}
          </div>
          <div className="text-xs text-[#94A3B8] mt-1">
            {isFa ? "پشتیبانی و نظارت فنی" : "Uptime & Support"}
          </div>
        </div>
      </div>
    </div>
  );
}
