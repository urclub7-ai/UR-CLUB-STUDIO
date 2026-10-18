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

export default function ExpertiseGrid() {
  const services = [
    {
      title: "راه‌حل‌های ابری و وب‌سایت‌های مدرن",
      desc: "طراحی و استقرار پلتفرم‌های مقیاس‌پذیر، فروشگاه‌های آنلاین و زیرساخت‌های پایدار با سرعت بارگذاری فوق‌سریع.",
      icon: Cloud,
    },
    {
      title: "مشاوره هوش مصنوعی و اتوماسیون",
      desc: "بهره‌گیری از ابزارهای پیشرفته هوش مصنوعی جهت تسریع زمان تحویل پروژه‌ها و بهینه‌سازی فرآیندهای فنی.",
      icon: Cpu,
    },
    {
      title: "امنیت داده و استانداردهای جهانی",
      desc: "انطباق کامل با پروتکل‌های سخت‌گیرانه حفظ حریم خصوصی (GDPR)، کدنویسی تمیز و حفاظت جامع از اطلاعات.",
      icon: ShieldCheck,
    },
    {
      title: "کادرهای تعاملی و پرتال‌های هوشمند",
      desc: "طراحی سیستم‌های تعاملی پیشرفته جهت مرور زنده وب‌سایت‌ها در صفحه، سیستم‌های سفارش آنلاین و پلتفرم‌های وب.",
      icon: Layout,
    },
    {
      title: "استراتیژی دیجیتال و مدل‌های سرمایه‌گذاری",
      desc: "ایجاد مدل‌های شفاف شراکت برای سرمایه‌گذاران و همکاران تجاری با رویکرد بازگشت سرمایه منطقی و پایدار.",
      icon: TrendingUp,
    },
    {
      title: "مدرن‌سازی زیرساخت و معماری نرم‌افزار",
      desc: "بازنویسی سیستم‌های قدیمی با فناوری‌های مدرن، بهینه‌سازی عملکرد کد و کسب حداکثر کارایی فنی.",
      icon: Code2,
    },
  ];

  return (
    <div className="relative w-full">
      {/* Centered Clean Header */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          شایستگی‌ها و توانمندی‌های مهندسی ما
        </h2>
        <p className="mt-2.5 text-xs sm:text-base text-[#94A3B8] max-w-xl leading-relaxed">
          ترکیب مهندسی نرم‌افزار، استانداردهای روز جهانی و راهکارهای کارآمد برای موفقیت پروژه‌ها
        </p>
      </div>

      {/* 6-Card Clean & Orderly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 sm:p-7 rounded-2xl bg-[#081432]/60 border border-white/[0.08] hover:border-[#00D2FF]/25 transition-all duration-200 flex flex-col justify-start text-right"
            >
              <div className="mb-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#00D2FF]/10 border border-[#00D2FF]/20 flex items-center justify-center text-[#00D2FF]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#94A3B8] sm:text-[#CBD5E1] leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Subtle Consultation Callout */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <span className="text-xs text-[#94A3B8]">
          به دنبال راه‌حل اختصاصی برای پروژه یا سرمایه‌گذاری خود استید؟
        </span>
        <Link
          href="/#contact-section"
          className="h-9 px-5 rounded-full bg-white hover:bg-[#00D2FF] text-[#040B20] text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.15)] inline-flex items-center gap-1.5"
        >
          <Handshake className="w-3.5 h-3.5" />
          <span>مشاوره رایگان با تیم</span>
        </Link>
      </div>
    </div>
  );
}
