"use client";

import React from "react";
import Link from "next/link";
import { FileText, CheckCircle2, Award, Zap, Code2, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function TermsOfServicePage() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const terms = [
    {
      icon: Award,
      title: isFa ? "۱. مالکیت تام دارایی‌ها و کدهای منبع (Full IP Ownership)" : "1. Complete Intellectual Property Ownership",
      desc: isFa
        ? "پس از تسویه‌حساب کامل پروژه، تمامی حقوق مادی و معنوی، سورس‌کدهای برنامه‌نویسی‌شده (GitHub Repository)، فایل‌های وکتور لایه‌باز (AI / PSD / SVG) و دیتابیس به صورت ۱۰۰٪ و بدون قید و شرط متعلق به کارفرما خواهد بود."
        : "Upon project completion and final payment, 100% of the code repositories, source assets, database schemas, and graphic files are transferred unconditionally to the client.",
    },
    {
      icon: Code2,
      title: isFa ? "۲. استانداردهای توسعه فنی و تحویل تمیز" : "2. Technical Standards & Clean Delivery",
      desc: isFa
        ? "تیم UR CLUB متعهد به ارائه کدهای بهینه، مدرن، بدون خطاهای ساختاری و منطبق بر استانداردهای بین‌المللی روز (Next.js، TypeScript، معماری مقیاس‌پذیر و اصول سئو) می‌باشد."
        : "UR CLUB commits to industry-standard code architectures (Next.js, TypeScript, production optimizations) with clean, documented, and maintainable implementation.",
    },
    {
      icon: Zap,
      title: isFa ? "۳. گارانتی و دوره پشتیبانی فنی رایگان" : "3. Warranty & Post-Launch Support",
      desc: isFa
        ? "تمامی پروژه‌های وب‌سایت و نرم‌افزاری شامل پشتیبانی فنی رایگان و تضمین رفع باگ پس از تحویل نهایی هستند تا کارفرما با آرامش خاطر کامل پروژه را راه‌اندازی کند."
        : "All delivered platforms and software products include guaranteed bug-fixing warranty and initial technical support post-deployment.",
    },
    {
      icon: CheckCircle2,
      title: isFa ? "۴. فازبندی شفاف و صدور شناسه پیگیری" : "4. Transparent Milestones & Tracking ID",
      desc: isFa
        ? "هر پروژه با یک شناسه ۶ حرفی یکتا ایندکس شده و مراحل پیشبرد آن به صورت فاز به فاز (طراحی اولیه، پیاده‌سازی، اتصال دیتابیس، استقرار بر روی سرور) به اطلاع کارفرما می‌رسد."
        : "Each project is tagged with a dedicated 6-character ID, allowing structured step-by-step milestone sign-offs from architecture to production deployment.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#040B20] text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/25 text-xs font-semibold text-[#00D2FF]">
            <FileText className="w-4 h-4" />
            <span>{isFa ? "ضوابط و استانداردهای رسمی ارائه خدمات" : "Official Terms of Service"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {isFa ? "شرایط و ضوابط استفاده از خدمات" : "Terms of Service"}
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            {isFa
              ? "توافق‌نامه‌ای شفاف و حرفه‌ای بر پایه استانداردهای اروپایی برای تضمین منافع کارفرمایان و کیفیت فنی پروژه‌ها."
              : "A clear, professional framework engineered to protect client interests and ensure delivery excellence."}
          </p>

          <div className="text-xs text-[#64748B] pt-2">
            {isFa ? "آخرین بازبینی: ۲۰۲۶ • نسخه ۲.۰" : "Last updated: 2026 • Version 2.0"}
          </div>
        </div>

        {/* Terms list */}
        <div className="space-y-6">
          {terms.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#081432]/60 border border-white/[0.08] hover:border-[#00D2FF]/30 transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00D2FF]/10 text-[#00D2FF] flex items-center justify-center shrink-0 border border-[#00D2FF]/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    {t.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed pr-0 sm:pr-13">
                  {t.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Navigation Links */}
        <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00D2FF] hover:underline"
          >
            {isFa ? (
              <>
                <ArrowRight className="w-4 h-4" />
                <span>بازگشت به صفحه اصلی</span>
              </>
            ) : (
              <>
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </>
            )}
          </Link>

          <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {isFa ? "سیاست حریم خصوصی" : "Privacy Policy"}
            </Link>
            <span>•</span>
            <Link href="/policies" className="hover:text-white transition-colors">
              {isFa ? "خط‌مشی پروژه‌ها" : "Project Policies"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
