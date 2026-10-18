"use client";

import React from "react";
import Link from "next/link";
import { Shield, Lock, EyeOff, Server, FileCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import MotionSection from "@/components/public/MotionSection";

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const sections = [
    {
      icon: Lock,
      title: isFa ? "۱. تعهد محرمانگی و عدم افشا (NDA)" : "1. Confidentiality & Non-Disclosure (NDA)",
      desc: isFa
        ? "تمام ایده‌ها، مستندات تجاری، سورس‌کدها، فایل‌های طراحی، دارایی‌های برند و اطلاعات مالی پروژه‌ها تحت تعهد کامل محرمانگی قرار دارند. تیم UR CLUB هیچ‌یک از اطلاعات فنی یا تجاری کارفرمایان را با شخص ثالث به اشتراک نمی‌گذارد."
        : "All trade secrets, code repositories, UI assets, and commercial specifications are strictly protected. We never share client materials or proprietary concepts with any third parties.",
    },
    {
      icon: Shield,
      title: isFa ? "۲. جمع‌آوری و استفاده از اطلاعات" : "2. Information Collection & Usage",
      desc: isFa
        ? "اطلاعاتی که در فرم‌های تماس یا ثبت سفارش پروژه وارد می‌کنید (مانند نام، ایمیل، شماره تماس، نیازمندی‌های پروژه) صرفاً جهت برقراری ارتباط، صدور پیش‌فاکتور، ساخت پوشه اختصاصی توسعه و ارائه خدمات فنی استفاده می‌شوند."
        : "Information collected via contact and order configurators (such as name, email, phone number, technical specifications) is used exclusively for project scoping, repository indexing, and delivery communications.",
    },
    {
      icon: Server,
      title: isFa ? "۳. زیرساخت ابری و امنیت رمزنگاری" : "3. Cloud Infrastructure & Encryption",
      desc: isFa
        ? "داده‌های پروژه‌ها و ارتباطات از طریق پروتکل‌های امنیتی SSL/TLS، کلیدهای دسترسی امن و پایگاه داده‌های ابری استاندارد صنعتی (Supabase و Vercel) نگهداری و محافظت می‌شوند."
        : "Project data and records are stored with SSL/TLS encryption, strictly scoped API keys, and industry-standard cloud architectures (Supabase and Vercel).",
    },
    {
      icon: EyeOff,
      title: isFa ? "۴. حریم خصوصی کوکی‌ها و رهگیری" : "4. Cookies & Zero Tracker Policy",
      desc: isFa
        ? "این پلتفرم از کوکی‌های تبلیغاتی مزاحم یا ردیاب‌های تجاری شخص ثالث استفاده نمی‌کند. تنها نشست‌های موقت کاربری جهت تجربه روان و تنظیمات زبان ذخیره می‌گردند."
        : "We do not utilize invasive advertising trackers or third-party behavioral trackers. Only minimal session data is utilized to preserve language settings and theme preferences.",
    },
    {
      icon: FileCheck,
      title: isFa ? "۵. حق حذف و پاک‌سازی داده‌ها" : "5. Right to Erasure & Deletion",
      desc: isFa
        ? "هر کارفرما در هر زمان می‌تواند با ارسال یک پیام مستقیم به ایمیل urclub7@gmail.com، درخواست پاک‌سازی و حذف کامل فایل‌ها، مستندات و رکوردهای مرتبط با سفارش خود را ثبت نماید."
        : "Clients may request complete erasure and purge of their messages, contact records, and draft specifications at any time by emailing urclub7@gmail.com.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#040B20] text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/25 text-xs font-semibold text-[#00D2FF]">
            <Shield className="w-4 h-4" />
            <span>{isFa ? "سند رسمی حفظ حریم خصوصی و امنیت اطلاعات" : "Official Privacy & Security Document"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {isFa ? "سیاست حفظ حریم خصوصی" : "Privacy Policy"}
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            {isFa
              ? "در UR CLUB امنیت اطلاعات، محرمانگی تجاری پروژه‌ها و حفظ دارایی‌های معنوی شما اولویت اساسی ماست."
              : "At UR CLUB, protecting your proprietary ideas, intellectual property, and client data integrity is our core standard."}
          </p>

          <div className="text-xs text-[#64748B] pt-2">
            {isFa ? "آخرین به‌روزرسانی: فوریه ۲۰۲۶ • نسخه ۱.۲" : "Last updated: February 2026 • Version 1.2"}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
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
                    {sec.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed pr-0 sm:pr-13">
                  {sec.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Back Link */}
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

          <Link
            href="/terms"
            className="text-xs text-[#94A3B8] hover:text-white transition-colors"
          >
            {isFa ? "مشاهده شرایط استفاده ↗" : "View Terms of Service ↗"}
          </Link>
        </div>
      </div>
    </div>
  );
}
