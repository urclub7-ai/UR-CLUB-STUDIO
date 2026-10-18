"use client";

import React from "react";
import {
  Users2,
  Workflow,
  Zap,
  ShieldCheck,
} from "lucide-react";

export default function WhyChooseUsSection() {
  const features = [
    {
      title: "ارتباط مستقیم با تیم فنی",
      desc: "گفتگوی مستقیم با خود برنامه‌نویسان و مهندسان پروژه، بدون واسطه و با پاسخگویی سریع.",
      icon: Users2,
    },
    {
      title: "همراهی گام‌به‌گام تا راه‌اندازی",
      desc: "از ایده اولیه و طراحی تا پیاده‌سازی نهایی و پشتیبانی، در تمام مسیر همراه شما هستیم.",
      icon: Workflow,
    },
    {
      title: "سرعت بالا و اجرای تمیز",
      desc: "کدنویسی بهینه‌سازی‌شده برای بارگذاری فوق‌سریع صفحات و عملکرد روان در تمام دستگاه‌ها.",
      icon: Zap,
    },
    {
      title: "شفافیت کامل و مالکیت کدها",
      desc: "گزارش‌دهی منظم از مراحل کار و تحویل صددرصد کامل فایل‌ها و کدهای منبع به شما.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="relative w-full">
      {/* Clean Centered Header */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white">
          چرا شرکا و سرمایه‌گذاران UR CLUB را انتخاب می‌کنند؟
        </h2>
        <p className="mt-2.5 text-xs sm:text-base text-[#94A3B8] max-w-xl leading-relaxed">
          سرعت بالا، شفافیت کامل و کیفیت مطمئن در اجرای پروژه‌ها
        </p>
      </div>

      {/* 4-Pillar Symmetrical Grid (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="relative p-5 sm:p-8 rounded-2xl bg-[#081432]/60 border border-white/[0.08] hover:border-[#00D2FF]/30 transition-all duration-300 flex flex-col justify-start text-right group overflow-hidden"
            >
              {/* Subtle accent highlight on top */}
              <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Header: Icon + Title */}
              <div className="flex items-center gap-3.5 mb-2.5 sm:mb-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00D2FF]/10 border border-[#00D2FF]/20 flex items-center justify-center text-[#00D2FF] shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-base sm:text-xl font-bold text-white">
                  {item.title}
                </h3>
              </div>

              {/* Legible Persian Description */}
              <p className="text-xs sm:text-[15px] text-[#94A3B8] sm:text-[#CBD5E1] leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
