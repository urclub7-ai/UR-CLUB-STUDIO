"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MonitorPlay, Handshake } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface HeroProps {
  heroGreeting?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  availabilityStatus?: boolean;
  availabilityText?: string;
  heroImageUrl?: string | null;
  profileImageUrl?: string | null;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
}

export default function Hero({}: HeroProps) {
  const { dir, language } = useLanguage();
  const isFa = language === "fa";

  return (
    <section id="hero-section" className="relative w-full min-h-[66vh] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center bg-white dark:bg-[#040B20] overflow-hidden pt-20 sm:pt-32 pb-10 sm:pb-24 border-b border-slate-200/80 dark:border-[#00D2FF]/15 scroll-mt-28 transition-colors duration-200">
      {/* ─── Ambient Glow (Dark mode electric / Light mode soft sky) ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[550px] bg-[radial-gradient(ellipse_75%_60%_at_50%_50%,rgba(2,132,199,0.05),transparent_75%)] dark:bg-[radial-gradient(ellipse_75%_60%_at_50%_50%,rgba(0,210,255,0.08),rgba(4,11,32,0)_75%)] pointer-events-none" />

      {/* Gentle slow drift (Desktop only) */}
      <motion.div
        animate={{
          x: ["-20%", "20%", "-10%", "15%", "-20%"],
          y: ["-15%", "12%", "15%", "-10%", "-15%"],
          opacity: [0.04, 0.08, 0.05, 0.08, 0.04],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(2,132,199,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.2)_0%,rgba(4,11,32,0)_70%)] blur-[140px] pointer-events-none will-change-transform"
      />

      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#00D2FF07_1px,transparent_1px),linear-gradient(to_bottom,#00D2FF07_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_65%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center my-auto">
        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] font-extrabold text-slate-900 dark:text-white leading-[1.35] tracking-normal max-w-4xl">
          {isFa ? "توسعه پلتفرم‌های دیجیتال با " : "Digital Platform Development with "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-sky-600 to-slate-900 dark:from-white dark:via-[#00D2FF] dark:to-white drop-shadow-sm dark:drop-shadow-[0_0_35px_rgba(0,210,255,0.4)]">
            {isFa ? "فناوری‌های آماده آینده" : "Future-Ready Technologies"}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-xs sm:text-base md:text-lg text-slate-600 dark:text-[#CBD5E1] max-w-2xl leading-relaxed font-normal">
          {isFa
            ? "از تدوین استراتیژی تا مهندسی کد و جذب سرمایه‌گذاری؛ UR CLUB همکار تخصصی شما در پیاده‌سازی و مقیاس‌دهی محصولات مدرن وب."
            : "From strategy formulation to code engineering and capital acquisition; UR CLUB is your specialized partner in building and scaling modern web products."}
        </p>

        {/* Centered Dual Action Buttons */}
        <div className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Primary CTA (View Live Projects) */}
          <Link
            href="/#projects-section"
            className="h-11 sm:h-12 px-5 sm:px-7 rounded-full bg-sky-600 hover:bg-sky-700 text-white dark:bg-[#00D2FF] dark:hover:bg-[#38bdf8] dark:text-[#040B20] text-xs sm:text-sm font-bold transition-all duration-300 shadow-md dark:shadow-[0_0_25px_rgba(0,210,255,0.4)] inline-flex items-center gap-2 group cursor-pointer"
          >
            <MonitorPlay className="w-4 h-4 text-white dark:text-[#040B20]" />
            <span>{isFa ? "مشاهده کادر آنلاین و پروژه‌ها" : "View Live Frame & Projects"}</span>
            <ArrowLeft className={`w-4 h-4 text-white dark:text-[#040B20] transition-transform duration-200 ${isFa ? "group-hover:-translate-x-1" : "group-hover:translate-x-1 rotate-180"}`} />
          </Link>

          {/* Secondary CTA (Configure Order) */}
          <Link
            href="/order"
            className="h-11 sm:h-12 px-5 sm:px-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 dark:bg-white/[0.08] dark:hover:bg-white dark:text-white dark:hover:text-[#040B20] dark:border-white/15 text-xs sm:text-sm font-bold transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-sm dark:shadow-none"
          >
            <span>{isFa ? "شروع سفارش اختصاصی" : "Start Custom Order"}</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
