"use client";

import React from "react";
import {
  Users2,
  Workflow,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function WhyChooseUsSection() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const features = [
    {
      title: "ارتباط مستقیم با تیم فنی",
      title_en: "Direct Communication with Technical Team",
      desc: "گفتگوی مستقیم با خود برنامه‌نویسان و مهندسان پروژه، بدون واسطه و با پاسخگویی سریع.",
      desc_en: "Direct dialogue with the software engineers and developers themselves, without intermediaries and with rapid response.",
      icon: Users2,
    },
    {
      title: "همراهی گام‌به‌گام تا راه‌اندازی",
      title_en: "Step-by-Step Guidance to Launch",
      desc: "از ایده اولیه و طراحی تا پیاده‌سازی نهایی و پشتیبانی، در تمام مسیر همراه شما هستیم.",
      desc_en: "From initial concept and design to final implementation and ongoing support, we stand with you throughout the journey.",
      icon: Workflow,
    },
    {
      title: "سرعت بالا و اجرای تمیز",
      title_en: "High Velocity & Clean Execution",
      desc: "کدنویسی بهینه‌سازی‌شده برای بارگذاری فوق‌سریع صفحات و عملکرد روان در تمام دستگاه‌ها.",
      desc_en: "Optimized code architecture engineered for ultra-fast page loads and fluid performance across all devices.",
      icon: Zap,
    },
    {
      title: "شفافیت کامل و مالکیت کدها",
      title_en: "Total Transparency & Full IP Ownership",
      desc: "گزارش‌دهی منظم از مراحل کار و تحویل صددرصد کامل فایل‌ها و کدهای منبع به شما.",
      desc_en: "Structured milestone reporting throughout development and 100% complete handover of source files and code repositories to you.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="relative w-full">
      {/* Clean Centered Header */}
      <div className="flex flex-col items-center text-center mb-5 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          {isFa ? "چرا شرکا و سرمایه‌گذاران UR CLUB را انتخاب می‌کنند؟" : "Why Partners and Investors Choose UR CLUB"}
        </h2>
        <p className="mt-2 text-xs sm:text-base text-slate-600 dark:text-[#94A3B8] max-w-xl leading-relaxed">
          {isFa
            ? "سرعت بالا، شفافیت کامل و کیفیت مطمئن در اجرای پروژه‌ها"
            : "High velocity, complete transparency, and reliable execution quality"}
        </p>
      </div>

      {/* 4-Pillar Symmetrical Grid (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="relative p-3.5 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-[#081432]/60 border border-slate-200/80 dark:border-white/[0.08] hover:border-sky-500/40 dark:hover:border-[#00D2FF]/30 shadow-sm dark:shadow-none transition-all duration-300 flex flex-col justify-start text-start group overflow-hidden"
            >
              {/* Subtle accent highlight on top */}
              <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/40 dark:via-[#00D2FF]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Header: Icon + Title */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 mb-2 sm:mb-3.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-50 dark:bg-[#00D2FF]/10 border border-sky-200 dark:border-[#00D2FF]/20 flex items-center justify-center text-sky-600 dark:text-[#00D2FF] shrink-0">
                  <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-sm sm:text-xl font-bold text-slate-900 dark:text-white">
                  {isFa ? item.title : item.title_en}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[15px] text-slate-600 dark:text-[#CBD5E1] leading-relaxed font-normal">
                {isFa ? item.desc : item.desc_en}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
