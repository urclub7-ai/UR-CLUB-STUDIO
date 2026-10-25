"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MonitorPlay, Sparkles, Activity, ShieldCheck, Zap, Globe2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Hero() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[82vh] lg:min-h-[calc(100vh-4.5rem)] flex items-center justify-center bg-white dark:bg-[#07090e] overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 border-b border-slate-200/80 dark:border-white/[0.08] scroll-mt-28 transition-colors duration-200"
    >
      {/* ─── Ambient Technical Grid & Precision Radial Glow ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c708_1px,transparent_1px),linear-gradient(to_bottom,#0284c708_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#00D2FF0a_1px,transparent_1px),linear-gradient(to_bottom,#00D2FF0a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_65%,transparent_100%)] pointer-events-none" />

      {/* Atmospheric Soft Light (Zero purple AI slop, refined cyan & azure lighting) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[520px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(2,132,199,0.06),transparent_75%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(6,182,212,0.12),transparent_75%)] pointer-events-none blur-3xl" />

      <div className="relative max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ─── Column 1: Typography, Narrative & High-Contrast CTAs (7 Columns) ─── */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start space-y-5 sm:space-y-6">
            
            {/* Studio Status Live Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200/90 dark:border-white/[0.1] shadow-sm select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
                {isFa ? "پذیرش پروژه‌های Q4 2026 | آلمان و افغانستان" : "Now Accepting Q4 2026 Projects • Germany & Afghanistan"}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-extrabold text-slate-900 dark:text-white leading-[1.25] sm:leading-[1.2] tracking-tight">
              {isFa ? "توسعه پلتفرم‌های دیجیتال با " : "Architecting Digital Platforms with "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-700 dark:from-white dark:via-[#00D2FF] dark:to-cyan-200 drop-shadow-sm dark:drop-shadow-[0_0_30px_rgba(0,210,255,0.4)]">
                {isFa ? "فناوری‌های آماده آینده" : "Future-Ready Precision"}
              </span>
            </h1>

            {/* Authoritative Subtext (Zero empty marketing slogans) */}
            <p className="text-sm sm:text-base md:text-[17px] text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed sm:leading-loose font-normal">
              {isFa
                ? "طراحی و مهندسی پلتفرم‌های مقیاس‌پذیر تحت وب، وب‌اپلیکیشن‌های انترپرایز و هویت بصری یکپارچه؛ با تضمین سورس‌کد کامل، مالکیت صددرصد و تحویل نسخه MVP زیر ۳۰ روز."
                : "Full-cycle engineering of high-velocity web platforms, enterprise applications, and bespoke design systems. Complete source code handover, zero technical debt, and 100% intellectual property ownership."}
            </p>

            {/* Dual High-Contrast CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Primary Glowing Action Button */}
              <Link
                href="/#projects-section"
                className="h-12 px-7 rounded-xl bg-sky-600 hover:bg-sky-500 dark:bg-[#00D2FF] dark:hover:bg-[#38bdf8] text-white dark:text-[#040B20] text-xs sm:text-sm font-extrabold transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-[0_0_25px_rgba(0,210,255,0.35)] dark:hover:shadow-[0_0_35px_rgba(0,210,255,0.6)] inline-flex items-center justify-center gap-2 group cursor-pointer"
              >
                <MonitorPlay className="w-4 h-4 text-white dark:text-[#040B20]" />
                <span>{isFa ? "مشاهده کادر آنلاین و پروژه‌ها" : "Explore Live Platforms"}</span>
                <ArrowLeft className={`w-4 h-4 transition-transform duration-200 ${isFa ? "group-hover:-translate-x-1" : "group-hover:translate-x-1 rotate-180"}`} />
              </Link>

              {/* Secondary Clean Border Action Button */}
              <Link
                href="/order"
                className="h-12 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:text-white dark:border-white/15 text-xs sm:text-sm font-bold transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm dark:shadow-none"
              >
                <span>{isFa ? "شروع سفارش و صدور شناسه" : "Start Order & Get ID"}</span>
              </Link>
            </div>

            {/* Live Telemetry Metadata Strip */}
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 border-t border-slate-200/80 dark:border-white/[0.08] w-full text-xs font-mono text-slate-500 dark:text-slate-400 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{isFa ? "لود زیر ۱ ثانیه (Lighthouse 99)" : "Sub-second Load (Lighthouse 99)"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-[#00D2FF]" />
                <span>{isFa ? "تأخیر ۱۴ میلی‌ثانیه Edge" : "14ms Edge Latency"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Next.js 14 • Supabase • Vercel</span>
              </div>
            </div>

          </div>

          {/* ─── Column 2: 3D Telemetry Glass Engine Visual (5 Columns) ─── */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center select-none">
            {/* Visual Glassmorphic Dashboard Console Container (Inspired by Reference 06) */}
            <div className="relative w-full max-w-[460px] aspect-[4/3.8] rounded-3xl p-5 sm:p-6 bg-slate-50/90 dark:bg-[#0b0f17]/90 border border-slate-200 dark:border-white/[0.1] shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,210,255,0.15)] backdrop-blur-xl flex flex-col justify-between overflow-hidden">
              
              {/* Internal Accent Glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-sky-500/10 dark:bg-[#00D2FF]/20 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-emerald-500/10 dark:bg-cyan-500/20 blur-2xl pointer-events-none" />

              {/* Console Header Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                  <span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300 ml-2 tracking-wider">
                    UR-CORE v2.6 // PROD
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[10.5px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Center 3D Isometric Core Simulation */}
              <div className="relative py-4 flex items-center justify-center">
                {/* Orbital Geometric Rings */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                  {/* Outer Glowing Cyan Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-400/40 dark:border-[#00D2FF]/40 animate-[spin_24s_linear_infinite]" />
                  
                  {/* Intermediate Angled Ring */}
                  <div className="absolute inset-3 rounded-full border border-sky-500/30 dark:border-[#00D2FF]/30 [transform:rotateX(60deg)_rotateZ(45deg)]" />
                  
                  {/* Core Glass Prism Orb */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-sky-400/30 via-cyan-500/20 to-indigo-600/30 dark:from-[#00D2FF]/40 dark:via-cyan-400/20 dark:to-blue-600/40 border border-sky-300/50 dark:border-[#00D2FF]/60 shadow-[0_0_35px_rgba(0,210,255,0.4)] backdrop-blur-md flex flex-col items-center justify-center text-center rotate-6">
                    <Activity className="w-7 h-7 sm:w-8 sm:h-8 text-sky-600 dark:text-[#00D2FF] animate-pulse" />
                    <span className="font-mono text-[10px] font-extrabold text-slate-800 dark:text-white mt-1">99.98%</span>
                    <span className="font-mono text-[8px] text-sky-600 dark:text-cyan-300">UPTIME</span>
                  </div>

                  {/* Satellite Telemetry Pill 1 (Top Left) */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1 -left-2 sm:-left-4 p-2 sm:p-2.5 rounded-xl bg-white/95 dark:bg-[#07090e]/90 border border-slate-200 dark:border-white/10 shadow-lg text-start"
                  >
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">LATENCY</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">14ms Edge</div>
                  </motion.div>

                  {/* Satellite Telemetry Pill 2 (Bottom Right) */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -bottom-2 -right-2 sm:-right-4 p-2 sm:p-2.5 rounded-xl bg-white/95 dark:bg-[#07090e]/90 border border-slate-200 dark:border-white/10 shadow-lg text-start"
                  >
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">PAGE SPEED</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-sky-600 dark:text-[#00D2FF]">100 / 100</div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Real-Time Performance Wave Chart */}
              <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500 dark:text-slate-400">{isFa ? "توان پردازشی و مانیتورینگ:" : "Network Throughput:"}</span>
                  <span className="text-sky-600 dark:text-[#00D2FF] font-bold">4.2M req/sec</span>
                </div>

                {/* SVG Live Precision Spline */}
                <div className="w-full h-8 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 300 40" fill="none" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,32 Q35,8 70,22 T140,14 T210,26 T280,10 L300,12 L300,40 L0,40 Z"
                      fill="url(#heroGradient)"
                    />
                    <path
                      d="M0,32 Q35,8 70,22 T140,14 T210,26 T280,10 L300,12"
                      stroke="#00D2FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
