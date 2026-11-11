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
      desc: "ساخت پلتفرم‌ها و وبسایت‌ها با کدهای پاک و امنیت بالا.",
      desc_en: "High-performance websites and platforms built with clean code.",
    },
    {
      num: "۰۲",
      num_en: "02",
      title: "طراحی رابط کاربری و هویت برند",
      title_en: "UI/UX & Brand Identity",
      desc: "دیزاین لوگوهای وکتور و رابط کاربری آسان و زیبا.",
      desc_en: "Vector marks and intuitive, elegant interfaces.",
    },
    {
      num: "۰۳",
      num_en: "03",
      title: "هوش مصنوعی و اتوماسیون",
      title_en: "AI Solutions & Automation",
      desc: "استفاده از هوش مصنوعی برای سرعت کار و کنترول کیفیت.",
      desc_en: "Harnessing AI to boost delivery velocity and code quality.",
    },
    {
      num: "۰۴",
      num_en: "04",
      title: "امنیت، سرعت و استاندارد اروپا",
      title_en: "Cloud Security & European Standards",
      desc: "لودینگ زیر ۱ ثانیه و نگهداری مصئون اطلاعات.",
      desc_en: "Sub-second load times and compliant data protection.",
    },
  ];

  return (
    <div id="team-credibility" className="relative w-full scroll-mt-28">
      {/* ─── Clean Centered Header (Matching upper sections) ─── */}
      <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isFa
            ? "معیارهای کاری ما"
            : "Our Core Standards"}
        </h2>
        <p className="mt-2 text-xs sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
          {isFa
            ? "توسعه نرم‌افزار، دیزاین حرفه‌ای و سرعت بالا."
            : "Software engineering, refined design, and high execution speed."}
        </p>
      </div>

      {/* ─── 4 Disciplines Grid (Varied, minimalist, no clutter) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-6">
        {teamDisciplines.map((item, idx) => (
          <div
            key={idx}
            className="group relative p-3.5 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-[#081432]/60 border border-slate-200/80 dark:border-white/[0.08] hover:border-sky-500/40 dark:hover:border-[#00D2FF]/35 shadow-sm dark:shadow-none transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle top glow highlight */}
            <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/40 dark:via-[#00D2FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              {/* Title & Concise Summary */}
              <h3 className="text-sm sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-[#00D2FF] transition-colors leading-snug">
                {isFa ? item.title : item.title_en}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] mt-1.5 sm:mt-2 leading-relaxed">
                {isFa ? item.desc : item.desc_en}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Minimalist Stats Strip (Clean, integrated, not repetitive) ─── */}
      <div className="mt-5 sm:mt-10 py-4 sm:py-8 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-slate-100/60 dark:bg-[#081432]/30 border border-slate-200/80 dark:border-white/[0.06] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-200/80 dark:divide-white/[0.06]">
        <div className="pt-3 lg:pt-0">
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-[#00D2FF] font-mono">
            {isFa ? "+۱۵" : "+15"}
          </div>
          <div className="text-xs text-slate-600 dark:text-[#94A3B8] mt-1">
            {isFa ? "پروژه‌های اجرا شده" : "Executed Projects"}
          </div>
        </div>
        <div className="pt-3 lg:pt-0">
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-[#00D2FF] font-mono">
            {isFa ? "< ۱ ثانیه" : "< 1s"}
          </div>
          <div className="text-xs text-slate-600 dark:text-[#94A3B8] mt-1">
            {isFa ? "میانگین زمان بارگذاری وب" : "Avg. Load Speed"}
          </div>
        </div>
        <div className="pt-3 lg:pt-0">
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-[#00D2FF] font-mono">
            {isFa ? "۱۰۰٪" : "100%"}
          </div>
          <div className="text-xs text-slate-600 dark:text-[#94A3B8] mt-1">
            {isFa ? "کدنویسی تمیز و استاندارد" : "Clean Code & Quality"}
          </div>
        </div>
        <div className="pt-3 lg:pt-0">
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-[#00D2FF] font-mono">
            {isFa ? "۲۴ / ۷" : "24/7"}
          </div>
          <div className="text-xs text-slate-600 dark:text-[#94A3B8] mt-1">
            {isFa ? "پشتیبانی و نظارت فنی" : "Uptime & Support"}
          </div>
        </div>
      </div>
    </div>
  );
}
