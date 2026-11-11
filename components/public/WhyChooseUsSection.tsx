"use client";

import React from "react";
import {
  YazdanDirectTeamIcon,
  YazdanRoadmapIcon,
  YazdanVelocityIcon,
  YazdanShieldArmorIcon,
} from "@/components/ui/YazdanIcons";
import { useLanguage } from "@/lib/i18n";

export default function WhyChooseUsSection() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const features = [
    {
      title: "ارتباط مستقیم با تیم تخنیکی",
      title_en: "Direct Dialogue with Technical Team",
      desc: "ارتباط مستقیم با برنامه‌نویسان اصلی، بدون واسطه و فوری.",
      desc_en: "Direct communication with core engineers without intermediaries.",
      icon: YazdanDirectTeamIcon,
    },
    {
      title: "همراهی گام‌به‌گام تا راه‌اندازی",
      title_en: "Step-by-Step Delivery to Launch",
      desc: "از تدوین ایده تا راه‌اندازی و پشتیبانی تخنیکی پروژه.",
      desc_en: "From initial concept to full deployment and continuous support.",
      icon: YazdanRoadmapIcon,
    },
    {
      title: "سرعت بالا و اجرای معیاری",
      title_en: "High Velocity & Clean Execution",
      desc: "کدنویسی عصری برای لود سریع در موبایل و کمپیوتر.",
      desc_en: "Modern engineering optimized for fast loading across all devices.",
      icon: YazdanVelocityIcon,
    },
    {
      title: "شفافیت کامل و مالکیت کدها",
      title_en: "Full Transparency & Code Ownership",
      desc: "گزارش منظم کار و تسلیم‌دهی مکمل تمام سورس‌کدها.",
      desc_en: "Regular milestone updates and complete source code handover.",
      icon: YazdanShieldArmorIcon,
    },
  ];

  return (
    <div className="relative w-full">
      {/* Clean Centered Header */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white">
          {isFa ? "چرا یزدان (YAZDAN) را انتخاب می‌کنند؟" : "Why Choose YAZDAN?"}
        </h2>
        <p className="mt-2 text-xs sm:text-base text-black dark:text-white max-w-xl leading-relaxed">
          {isFa
            ? "سرعت عمل، شفافیت کاری و کیفیت مطمئن."
            : "High velocity, full transparency, and reliable execution."}
        </p>
      </div>

      {/* 4-Pillar Symmetrical Grid (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="relative p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-[#13110E]/80 border border-stone-200/90 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/50 shadow-sm transition-all duration-300 flex flex-col justify-start text-start group overflow-hidden"
            >
              {/* Subtle accent highlight on top */}
              <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Header: Icon + Title */}
              <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FAF8F5] dark:bg-[#090807] border border-[#B8860B]/30 dark:border-[#D4AF37]/40 dark:shadow-[0_0_18px_rgba(212,175,55,0.15)] group-hover:dark:border-[#D4AF37] group-hover:dark:shadow-[0_0_25px_rgba(212,175,55,0.35)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-black dark:text-white group-hover:text-[#8B6914] dark:group-hover:text-[#F5DEB3] transition-colors leading-snug">
                  {isFa ? item.title : item.title_en}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[11.5px] sm:text-xs text-black dark:text-white leading-relaxed font-normal">
                {isFa ? item.desc : item.desc_en}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
