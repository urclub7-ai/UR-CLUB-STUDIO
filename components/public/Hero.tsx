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
  const { dir } = useLanguage();

  return (
    <section id="hero-section" className="relative w-full min-h-[78vh] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#040B20] overflow-hidden pt-24 sm:pt-32 pb-14 sm:pb-24 border-b border-[#00D2FF]/15 scroll-mt-28">
      {/* ─── Ultra-Subtle, Deep Ambient Glow (Faded, Soft & Dark) ─── */}
      {/* Very faint, deep central ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[550px] bg-[radial-gradient(ellipse_75%_60%_at_50%_50%,rgba(0,210,255,0.08),rgba(4,11,32,0)_75%)] pointer-events-none" />

      {/* Gentle, deeply diffused slow drift - ultra-low opacity so it's never intrusive (Desktop only to protect mobile GPU) */}
      <motion.div
        animate={{
          x: ["-20%", "20%", "-10%", "15%", "-20%"],
          y: ["-15%", "12%", "15%", "-10%", "-15%"],
          opacity: [0.06, 0.13, 0.08, 0.12, 0.06],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.2)_0%,rgba(4,11,32,0)_70%)] blur-[140px] pointer-events-none will-change-transform"
      />

      {/* Delicate, Very Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D2FF07_1px,transparent_1px),linear-gradient(to_bottom,#00D2FF07_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_65%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center my-auto">
        {/* Main Headline (Scaled down on mobile for crisp modern balance) */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] font-extrabold text-white leading-[1.35] tracking-normal max-w-4xl">
          توسعه پلتفرم‌های دیجیتال با{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00D2FF] to-white drop-shadow-[0_0_35px_rgba(0,210,255,0.4)]">
            فناوری‌های آماده آینده
          </span>
        </h1>

        {/* Subtitle (Clean & readable on mobile screens) */}
        <p className="mt-4 sm:mt-6 text-xs sm:text-base md:text-lg text-[#94A3B8] sm:text-[#CBD5E1] max-w-2xl leading-relaxed font-normal">
          از تدوین استراتیژی تا مهندسی کد و جذب سرمایه‌گذاری؛ UR CLUB همکار تخصصی شما در پیاده‌سازی و مقیاس‌دهی محصولات مدرن وب.
        </p>

        {/* Centered Dual Action Buttons */}
        <div className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Primary CTA (View Live Projects) */}
          <Link
            href="/#projects-section"
            className="h-11 sm:h-12 px-5 sm:px-7 rounded-full bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] text-xs sm:text-sm font-bold transition-all duration-300 shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:shadow-[0_0_35px_rgba(0,210,255,0.6)] inline-flex items-center gap-2 group cursor-pointer"
          >
            <MonitorPlay className="w-4 h-4 text-[#040B20]" />
            <span>مشاهده کادر آنلاین و پروژه‌ها</span>
            <ArrowLeft className="w-4 h-4 text-[#040B20] transition-transform duration-200 group-hover:-translate-x-1" />
          </Link>

          {/* Secondary CTA (Configure Order) */}
          <Link
            href="/order"
            className="h-11 sm:h-12 px-5 sm:px-7 rounded-full bg-white/[0.08] hover:bg-white text-white hover:text-[#040B20] border border-white/15 text-xs sm:text-sm font-bold transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>شروع سفارش اختصاصی</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
