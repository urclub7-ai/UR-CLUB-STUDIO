"use client";

import React from "react";
import Link from "next/link";
import { Layers, MessageSquare, RefreshCw, Globe2, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function ProjectPoliciesPage() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const policies = [
    {
      icon: MessageSquare,
      title: isFa ? "۱. کانال‌های ارتباطی مستقیم و زمان پاسخگویی" : "1. Official Communication Channels & SLA",
      desc: isFa
        ? "ارتباطات رسمی از طریق واتساپ اختصاصی (+49 162 4212685)، تلگرام رسمی و ایمیل سازمانی urclub7@gmail.com انجام می‌گیرد. میانگین زمان پاسخگویی به درخواست‌های کارفرمایان کمتر از ۲ ساعت کاری است."
        : "Direct communication takes place via verified WhatsApp (+49 162 4212685), Telegram, and official email (urclub7@gmail.com) with guaranteed under-2-hour turnaround.",
    },
    {
      icon: RefreshCw,
      title: isFa ? "۲. سیاست اصلاحات و بازبینی پروژه" : "2. Iteration & Revision Policy",
      desc: isFa
        ? "در تمام مراحل (از اسکچ اولیه و وایرفریم تا تحویل نهایی)، جلسات بازبینی آنلاین و امکان اصلاحات دقیق طبق توافق اولیه وجود دارد تا طرح دقیقاً مطابق سلیقه و هویت برند شما باشد."
        : "Design reviews and staging iterations are provided at every critical milestone to guarantee alignment with client expectations.",
    },
    {
      icon: Globe2,
      title: isFa ? "۳. استقرار دامنه و هاستینگ" : "3. Deployment & Domain Integration",
      desc: isFa
        ? "ما از هاستینگ پرسرعت ابری Vercel و پایگاه داده مقیاس‌پذیر Supabase استفاده می‌کنیم. کارفرما می‌تواند از ساب‌دومین رایگان یا دامنه اختصاصی .com خود با گواهینامه SSL خودکار استفاده کند."
        : "Platforms are deployed on Vercel with Supabase cloud databases. Clients may integrate their custom .com domain or leverage complimentary subdomains.",
    },
    {
      icon: ShieldCheck,
      title: isFa ? "۴. تحویل کدهای پاک و مستندسازی" : "4. Documentation & Handover",
      desc: isFa
        ? "پروژه‌ها همراه با راهنمای مستند راه‌اندازی، اطلاعات ورود به پنل ادمین و فایل‌های خروجی باکیفیت به کارفرما تحویل داده می‌شوند."
        : "All deliveries include architectural documentation, administration credentials, and clean handover files.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#040B20] text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/25 text-xs font-semibold text-[#00D2FF]">
            <Layers className="w-4 h-4" />
            <span>{isFa ? "استانداردها و خط‌مشی‌های اجرایی" : "Project Policies & Standards"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {isFa ? "خط‌مشی پروژه‌ها و همکاری" : "Project Policies"}
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            {isFa
              ? "فرآیندهای شفاف و چارچوب‌های کاری UR CLUB برای تجربه همکاری مطمئن، سریع و در سطح بین‌المللی."
              : "Clear frameworks designed for smooth, high-trust engineering collaborations."}
          </p>

          <div className="text-xs text-[#64748B] pt-2">
            {isFa ? "مقررات عمومی ۲۰۲۶" : "General Guidelines 2026"}
          </div>
        </div>

        {/* Policies list */}
        <div className="space-y-6">
          {policies.map((p, idx) => {
            const Icon = p.icon;
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
                    {p.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed pr-0 sm:pr-13">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
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
              {isFa ? "حریم خصوصی" : "Privacy Policy"}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              {isFa ? "شرایط استفاده" : "Terms of Service"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
