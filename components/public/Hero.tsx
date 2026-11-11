"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import {
  YazdanGemstoneIcon,
  YazdanVelocityIcon,
  YazdanShieldArmorIcon,
  YazdanConciergeIcon,
  YazdanMonitorActionIcon,
  YazdanOrderCartIcon,
} from "@/components/ui/YazdanIcons";
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
  const { language } = useLanguage();
  const isFa = language === "fa";

  const features = [
    {
      icon: YazdanGemstoneIcon,
      title: isFa ? "کیفیت درجه‌یک" : "Premium Quality",
      desc: isFa ? "استاندارد جهانی" : "Top-notch solutions",
    },
    {
      icon: YazdanVelocityIcon,
      title: isFa ? "سرعت فوق‌العاده" : "Fast Performance",
      desc: isFa ? "عملکرد برق‌آسا" : "Blazing speed",
    },
    {
      icon: YazdanShieldArmorIcon,
      title: isFa ? "امنیت و پایداری" : "Secure & Reliable",
      desc: isFa ? "اولویت داده‌های شما" : "Your data, our priority",
    },
    {
      icon: YazdanConciergeIcon,
      title: isFa ? "پشتیبانی ۲۴/۷" : "24/7 Support",
      desc: isFa ? "همراهی پیوسته" : "Always here for you",
    },
  ];

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[70vh] sm:min-h-[calc(100vh-5rem)] flex flex-col justify-center bg-[#FAF8F5] dark:bg-[#090807] overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-16 border-b border-stone-200/90 dark:border-[#D4AF37]/20 scroll-mt-28 transition-colors duration-200"
    >
      {/* ─── Luxury Ambient Glows (Warm Gold & Bronze) ─── */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-[radial-gradient(ellipse_75%_60%_at_50%_40%,rgba(184,134,11,0.06),transparent_75%)] dark:bg-[radial-gradient(ellipse_75%_60%_at_50%_40%,rgba(212,175,55,0.12),rgba(9,8,7,0)_75%)] pointer-events-none" />

      {/* Gentle slow drift glow */}
      <motion.div
        animate={{
          x: ["-15%", "15%", "-10%", "12%", "-15%"],
          y: ["-10%", "10%", "12%", "-8%", "-10%"],
          opacity: [0.06, 0.12, 0.08, 0.12, 0.06],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.22)_0%,transparent_70%)] blur-[150px] pointer-events-none will-change-transform"
      />

      {/* Subtle Golden Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#b8860b08_1px,transparent_1px),linear-gradient(to_bottom,#b8860b08_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#d4af3708_1px,transparent_1px),linear-gradient(to_bottom,#d4af3708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto flex flex-col justify-center">
        {/* ─── Hero Content Split Layout (Desktop 2-Col / Mobile Stack) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Column 1: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start">
            
            {/* Mobile 3D Emblem Showcase Pill */}
            <div className="lg:hidden flex items-center justify-center mb-4">
              <div className="relative inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/15 via-white/80 to-[#D4AF37]/15 dark:from-[#D4AF37]/20 dark:via-[#13110E]/90 dark:to-[#D4AF37]/20 border border-[#B8860B]/35 dark:border-[#D4AF37]/45 shadow-[0_4px_20px_rgba(212,175,55,0.25)] backdrop-blur-xl">
                <div className="relative w-7 h-7 shrink-0 drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]">
                  <Image
                    src="/images/yazdan_emblem_transparent.png"
                    alt="YAZDAN 3D Emblem"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] font-bold tracking-wider text-[#8B6914] dark:text-[#F5DEB3] uppercase">
                  {isFa ? "یَزدان • مهندسی پلتفرم‌های برتر" : "YAZDAN • DIGITAL EXCELLENCE"}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

            {/* Top Luxury Line Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 mb-3.5 sm:mb-6 select-none">
              <span className="w-5 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-[#B8860B] dark:to-[#D4AF37]" />
              <span
                className={`font-bold text-[#8B6914] dark:text-[#E5C396] ${
                  isFa
                    ? "text-xs sm:text-sm tracking-normal font-sans"
                    : "text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase"
                }`}
              >
                {isFa ? "باور به توانایی، تکیه بر یزدان" : "BELIEF IN CAPABILITY, TRUST IN YAZDAN"}
              </span>
              <span className="w-5 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-[#B8860B] dark:to-[#D4AF37]" />
            </div>

            {/* Main Headline */}
            <h1 className="text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[2.9rem] xl:text-[3.35rem] font-black text-stone-900 dark:text-[#FDFBF7] leading-[1.3] tracking-normal">
              {isFa ? "توسعه پلتفرم‌های دیجیتال با " : "Digital Platform Development with "}
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#705310] dark:from-[#F5DEB3] dark:via-[#D4AF37] dark:to-[#AA771C] drop-shadow-sm dark:drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                {isFa ? "فناوری‌های آماده آینده" : "Future-Ready Technologies"}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-black dark:text-white max-w-xl leading-relaxed font-normal">
              {isFa
                ? "طراحی، مهندسی نرم‌افزار و توسعه پلتفرم‌های عصری وب."
                : "Design, software engineering, and modern web platform development."}
            </p>

            {/* Centered / Left-aligned Dual Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
              {/* Primary CTA (View Live Projects) */}
              <Link
                href="/#projects-section"
                className="h-12 px-6 sm:px-8 rounded-full bg-gradient-to-r from-[#E5C396] via-[#D4AF37] to-[#C5A880] text-[#090807] font-bold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.6)] hover:brightness-105 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <YazdanMonitorActionIcon className="w-4 h-4 text-[#090807]" />
                <span>{isFa ? "دیدن پروژه‌ها" : "View Projects"}</span>
                <ArrowLeft
                  className={`w-4 h-4 text-[#090807] transition-transform duration-200 ${
                    isFa ? "group-hover:-translate-x-1" : "group-hover:translate-x-1 rotate-180"
                  }`}
                />
              </Link>

              {/* Secondary CTA (Configure Order) */}
              <Link
                href="/order"
                className="h-12 px-6 sm:px-8 rounded-full bg-white/80 hover:bg-white text-stone-900 border border-stone-300 dark:bg-[#13110E]/90 dark:hover:bg-[#13110E] dark:text-white dark:border-[#D4AF37]/45 text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:border-[#D4AF37]"
              >
                <YazdanOrderCartIcon className="w-4 h-4 text-[#8B6914] dark:text-[#E5C396]" />
                <span>{isFa ? "ثبت سفارش آنلاین" : "Order Project"}</span>
              </Link>
            </div>
          </div>

          {/* Column 2: 3D Laptop Visual Scene (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center mt-6 lg:mt-0 px-2 sm:px-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[540px] group"
            >
              {/* Ambient Glow behind frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/30 via-[#AA771C]/20 to-transparent blur-xl opacity-60 group-hover:opacity-90 transition duration-500" />

              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-300 dark:border-[#D4AF37]/35 bg-stone-900 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <Image
                  src="/images/yazdan_laptop_scene.jpg"
                  alt="YAZDAN 3D Studio Mockup"
                  width={640}
                  height={360}
                  priority
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Glassmorphic 3D Emblem Chip in corner (Strictly luxury obsidian background with gold text) */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 px-3 py-1.5 rounded-xl !bg-[#090807]/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-lg select-none">
                  <div className="relative w-5 h-5 shrink-0">
                    <Image
                      src="/images/yazdan_emblem_transparent.png"
                      alt="Logo"
                      width={24}
                      height={24}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold !text-[#F5DEB3] tracking-wider">
                    YAZDAN 3D
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ─── Luxury 4-Item Feature Strip (Matching Mockup) ─── */}
        <div className="mt-10 sm:mt-16 w-full pt-6 sm:pt-8 border-t border-stone-200 dark:border-[#D4AF37]/20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-xl bg-white/70 dark:bg-[#13110E]/80 border border-stone-200/90 dark:border-[#D4AF37]/20 backdrop-blur-md transition-all duration-300 hover:border-[#D4AF37]/50 shadow-sm"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FAF8F5] dark:bg-[#090807] border border-[#B8860B]/30 dark:border-[#D4AF37]/35 dark:shadow-[0_0_15px_rgba(212,175,55,0.15)] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-black dark:text-white truncate">
                    {feat.title}
                  </div>
                  <div className="text-[10.5px] sm:text-xs text-black/85 dark:text-white/90 truncate">
                    {feat.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}