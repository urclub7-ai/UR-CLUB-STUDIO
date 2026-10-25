"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Activity,
  Layers,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Terminal,
  Cpu,
  Boxes,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function BentoGridSection() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  // Interactive toggle states for Card 3
  const [edgeActive, setEdgeActive] = useState(true);
  const [securityActive, setSecurityActive] = useState(true);
  const [activeTab, setActiveTab] = useState<"page" | "schema">("page");

  const techBadges = [
    { name: "Next.js 14", desc: "App Router & SSR" },
    { name: "TypeScript", desc: "Strict Type-Safety" },
    { name: "Supabase", desc: "Postgres & Auth" },
    { name: "Tailwind CSS", desc: "Responsive Engine" },
    { name: "Vercel Edge", desc: "Global Low-Latency CDN" },
    { name: "Docker", desc: "Containerized Workflows" },
  ];

  return (
    <section id="capabilities-section" className="relative w-full scroll-mt-28">
      {/* ─── Architectural Section Header ─── */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-[#00D2FF]/10 border border-sky-200 dark:border-[#00D2FF]/20 text-sky-600 dark:text-[#00D2FF] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>{isFa ? "شایستگی‌های مهندسی و زیرساخت" : "Engineering Competencies & Architecture"}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-[2.65rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {isFa
            ? "معماری قدرتمند، بنچمارک دقیق و کدهای تمیز"
            : "Precision Architecture & Scalable Execution"}
        </h2>

        <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-normal">
          {isFa
            ? "ترکیب مهندسی فرانت‌اند سطح اول جهان با زیرساخت توزیع‌شده ابری؛ بدون کدهای زائد، با گواهی عملکرد ۹۹٪ در لایت‌هاوس و شفافیت کامل فنی."
            : "Uncompromising software craftsmanship: sub-second serverless execution, strict type-safety, and human-crafted visual elegance."}
        </p>
      </div>

      {/* ─── Asymmetrical Bento Grid (Inspired by Reference 07) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* ─── Bento Card 1: Performance Analytics & SVG Load Curve (Span 7) ─── */}
        <div className="lg:col-span-7 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0b0f17] border border-slate-200/90 dark:border-white/[0.08] shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 flex flex-col justify-between group overflow-hidden relative">
          {/* Subtle top edge glow on hover */}
          <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 dark:via-[#00D2FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div>
            {/* Metric Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {isFa ? "بنچمارک سرعت و لود صفحات" : "Performance & Latency Benchmark"}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-mono text-xs font-extrabold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+24.8% Speed</span>
              </span>
            </div>

            {/* Dynamic Dual Spline Wave Graph Simulation */}
            <div className="my-5 p-4 rounded-xl bg-slate-50 dark:bg-[#07090e] border border-slate-100 dark:border-white/[0.04] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span>{isFa ? "نرخ پاسخگویی سرور (TTFB)" : "Server Response (TTFB)"}</span>
                <span className="text-sky-600 dark:text-[#00D2FF] font-bold">&lt; 140ms</span>
              </div>

              <div className="w-full h-28 relative">
                <svg className="w-full h-full" viewBox="0 0 450 110" fill="none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="bentoGradient1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="bentoGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Shaded Area */}
                  <path
                    d="M0,85 C60,40 120,60 180,25 C240,-5 300,50 360,20 C400,0 430,15 450,10 L450,110 L0,110 Z"
                    fill="url(#bentoGradient1)"
                  />
                  {/* Primary Glowing Curve */}
                  <path
                    d="M0,85 C60,40 120,60 180,25 C240,-5 300,50 360,20 C400,0 430,15 450,10"
                    stroke="#00D2FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Secondary Reference Curve */}
                  <path
                    d="M0,95 C70,75 140,85 210,55 C280,30 350,65 450,45"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    strokeOpacity="0.6"
                  />
                </svg>

                {/* Floating Metric Badge over the peak */}
                <div className="absolute top-2 left-1/3 p-1.5 rounded-lg bg-sky-600 dark:bg-[#00D2FF] text-white dark:text-[#040B20] text-[10px] font-mono font-extrabold shadow-md">
                  99.98% FAST
                </div>
              </div>

              {/* Benchmark Axis Labels */}
              <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 pt-1">
                <span>DNS: 12ms</span>
                <span>TCP: 28ms</span>
                <span>TLS: 35ms</span>
                <span>First Contentful Paint: 0.6s</span>
              </div>
            </div>

            {/* Content Text */}
            <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mt-4">
              {isFa ? "بهینه‌سازی لود و کارایی استاندارد لایت‌هاوس" : "Lighthouse 99+ Core Web Vitals"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              {isFa
                ? "کاهش حجم کدهای باندل، فشرده‌سازی خودکار تصاویر WebP/AVIF، و اجرای کدهای رندرینگ روی لبه شبکه جهانی (Edge Network) برای باز شدن آنی پلتفرم شما."
                : "Aggressive asset optimization, sub-second Server-Side Rendering (SSR), and distributed edge caching guarantee effortless peak throughput under heavy traffic."}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
            <span className="font-mono text-slate-500 dark:text-slate-400">{isFa ? "شاخص بازدهی:" : "Compliance:"} ISO/IEC 25010</span>
            <span className="font-bold text-sky-600 dark:text-[#00D2FF] flex items-center gap-1">
              <span>{isFa ? "۱۰۰٪ بهینه" : "Fully Optimized"}</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* ─── Bento Card 2: Live Real Syntax Code Editor (Span 5) ─── */}
        <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0b0f17] border border-slate-200/90 dark:border-white/[0.08] shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 flex flex-col justify-between group overflow-hidden relative">
          <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div>
            {/* macOS Chrome Header & File Tabs */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-white/[0.06]">
              {/* macOS Dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 font-mono text-[11px]">
                <button
                  onClick={() => setActiveTab("page")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === "page"
                      ? "bg-sky-50 dark:bg-white/[0.08] text-sky-600 dark:text-[#00D2FF] font-bold"
                      : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  }`}
                >
                  page.tsx
                </button>
                <button
                  onClick={() => setActiveTab("schema")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === "schema"
                      ? "bg-sky-50 dark:bg-white/[0.08] text-sky-600 dark:text-[#00D2FF] font-bold"
                      : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  }`}
                >
                  schema.prisma
                </button>
              </div>
            </div>

            {/* Authentic Code Viewport (Zero Fake AI Syntax) */}
            <div className="my-4 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11.5px] leading-relaxed overflow-x-auto shadow-inner border border-slate-800" dir="ltr">
              {activeTab === "page" ? (
                <pre className="space-y-0.5">
                  <code>
                    <span className="text-purple-400">import</span> &#123; <span className="text-cyan-300">db</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;@/lib/db&quot;</span>;{"\n"}
                    <span className="text-purple-400">import</span> &#123; <span className="text-cyan-300">EdgeRuntime</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;next/server&quot;</span>;{"\n\n"}
                    <span className="text-slate-400">// Strict type-safe enterprise query</span>{"\n"}
                    <span className="text-purple-400">export async function</span> <span className="text-yellow-300">Page</span>() &#123;{"\n"}
                    {"  "}<span className="text-purple-400">const</span> <span className="text-sky-300">platform</span> = <span className="text-purple-400">await</span> <span className="text-cyan-300">db</span>.<span className="text-sky-200">project</span>.<span className="text-yellow-300">findUnique</span>(&#123;{"\n"}
                    {"    "}<span className="text-sky-300">where</span>: &#123; <span className="text-sky-300">status</span>: <span className="text-emerald-300">&quot;DEPLOYED&quot;</span> &#125;,{"\n"}
                    {"    "}<span className="text-sky-300">select</span>: &#123; <span className="text-sky-300">id</span>: <span className="text-cyan-400">true</span>, <span className="text-sky-300">latency</span>: <span className="text-cyan-400">true</span> &#125;{"\n"}
                    {"  "}&#125;);{"\n"}
                    {"  "}<span className="text-purple-400">return</span> &lt;<span className="text-cyan-300">PlatformView</span> <span className="text-sky-300">data</span>=&#123;<span className="text-sky-300">platform</span>&#125; /&gt;;{"\n"}
                    &#125;
                  </code>
                </pre>
              ) : (
                <pre className="space-y-0.5">
                  <code>
                    <span className="text-purple-400">model</span> <span className="text-yellow-300">Project</span> &#123;{"\n"}
                    {"  "}<span className="text-sky-300">id</span>        <span className="text-cyan-300">String</span>   @<span className="text-yellow-300">id</span> @<span className="text-yellow-300">default</span>(cuid()){"\n"}
                    {"  "}<span className="text-sky-300">code</span>      <span className="text-cyan-300">String</span>   @<span className="text-yellow-300">unique</span>{"\n"}
                    {"  "}<span className="text-sky-300">status</span>    <span className="text-cyan-300">Status</span>   @<span className="text-yellow-300">default</span>(LIVE){"\n"}
                    {"  "}<span className="text-sky-300">telemetry</span> <span className="text-cyan-300">Json</span>?{"\n"}
                    {"  "}<span className="text-sky-300">createdAt</span> <span className="text-cyan-300">DateTime</span> @<span className="text-yellow-300">default</span>(now()){"\n"}
                    &#125;
                  </code>
                </pre>
              )}
            </div>

            {/* Description */}
            <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mt-2">
              {isFa ? "معماری تمیز نرم‌افزار و سورس‌کد خوانا" : "Enterprise Clean Code & Strict Types"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {isFa
                ? "ساختار مهندسی‌شده بدون بدهی فنی؛ سورس‌کد تمیز با کامپوننت‌های ماژولار که هر توسعه‌دهنده‌ای در آینده به سادگی می‌تواند آن را گسترش دهد."
                : "Maintainable, fully documented TypeScript with zero technical debt, seamless Git workflows, and modular component reusability."}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400">Git / CI-CD Pipeline</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">● Pass 100%</span>
          </div>
        </div>

        {/* ─── Bento Card 3: Real-Time Telemetry & Smart Switches (Span 4) ─── */}
        <div className="lg:col-span-4 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0b0f17] border border-slate-200/90 dark:border-white/[0.08] shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 flex flex-col justify-between group overflow-hidden relative">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {isFa ? "سوییچ‌های هوشمند زیرساخت" : "Infrastructure Telemetry"}
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Interactive Toggle Control Rows */}
            <div className="my-5 space-y-3">
              {/* Switch 1: Edge Compute */}
              <div
                onClick={() => setEdgeActive(!edgeActive)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#07090e] border border-slate-100 dark:border-white/[0.05] flex items-center justify-between cursor-pointer select-none transition-all"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Edge CDN Cache</div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Zero Cold Starts</div>
                </div>
                <div className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${edgeActive ? "bg-sky-600 dark:bg-[#00D2FF]" : "bg-slate-300 dark:bg-slate-700"}`}>
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${edgeActive ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0"}`} />
                </div>
              </div>

              {/* Switch 2: Security */}
              <div
                onClick={() => setSecurityActive(!securityActive)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#07090e] border border-slate-100 dark:border-white/[0.05] flex items-center justify-between cursor-pointer select-none transition-all"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Zero-Trust Shield</div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">GDPR & ISO Guard</div>
                </div>
                <div className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${securityActive ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"}`}>
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${securityActive ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0"}`} />
                </div>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {isFa ? "مانیتورینگ زنده و امنیت استاندارد" : "Real-Time Oversight & Security"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {isFa
                ? "حفاظت داده‌ها مطابق با استانداردهای حفظ حریم خصوصی آلمان و اروپا؛ بک‌آپ‌های روزانه خودکار و فایروال ضد حملات DDoS."
                : "Rigorous European privacy safeguards, automated daily cloud snapshots, and high-availability multi-region redundancy."}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] text-xs font-mono text-slate-500 dark:text-slate-400 flex justify-between">
            <span>Uptime SLA</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">99.99%</span>
          </div>
        </div>

        {/* ─── Bento Card 4: Design Systems & Visual Craft (Span 4) ─── */}
        <div className="lg:col-span-4 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0b0f17] border border-slate-200/90 dark:border-white/[0.08] shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 flex flex-col justify-between group overflow-hidden relative">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-sky-500 dark:text-[#00D2FF]" />
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {isFa ? "دیزاین سیستم دست‌ساز" : "Bespoke Design Systems"}
                </span>
              </div>
              <span className="font-mono text-[11px] text-sky-600 dark:text-[#00D2FF] font-bold">Awwwards-Tier</span>
            </div>

            {/* Geometric 3D Aesthetic Preview (Inspired by 07) */}
            <div className="my-5 p-4 rounded-xl bg-slate-50 dark:bg-[#07090e] border border-slate-100 dark:border-white/[0.04] flex items-center justify-center py-6 relative overflow-hidden">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* 3D Glass Isometric Cube SVG */}
                <svg className="w-20 h-20 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100" fill="none">
                  <polygon points="50,10 90,32 50,55 10,32" fill="rgba(0, 210, 255, 0.25)" stroke="#00D2FF" strokeWidth="1.5" />
                  <polygon points="10,32 50,55 50,95 10,72" fill="rgba(2, 132, 199, 0.4)" stroke="#0284c7" strokeWidth="1.5" />
                  <polygon points="50,55 90,32 90,72 50,95" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" strokeWidth="1.5" />
                </svg>
                {/* Floating Torus Halo */}
                <div className="absolute inset-0 rounded-full border border-sky-400/30 dark:border-[#00D2FF]/30 [transform:rotateX(70deg)] pointer-events-none" />
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {isFa ? "زیبایی‌شناسی بدون ردپای هوش مصنوعی" : "Zero AI-Slop Human Aesthetics"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {isFa
                ? "طراحی اختصاصی از پایه در فیگما؛ تایپوگرافی اصیل، هارمونی رنگی مات و انیمیشن‌های میکرو که هویت برند شما را منحصربه‌فرد می‌سازد."
                : "Bespoke design tokens, fluid typography, and delightful micro-interactions that elevate your product above generic templates."}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Figma → Tailwind</span>
            <span className="text-sky-600 dark:text-[#00D2FF] font-bold">Pixel-Perfect</span>
          </div>
        </div>

        {/* ─── Bento Card 5: Full Scalable Technology Stack (Span 4) ─── */}
        <div className="lg:col-span-4 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0b0f17] border border-slate-200/90 dark:border-white/[0.08] shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 flex flex-col justify-between group overflow-hidden relative">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-500" />
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {isFa ? "استک تکنولوژی استودیو" : "Modern Engineering Stack"}
                </span>
              </div>
              <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">2026 Ready</span>
            </div>

            {/* Tech Badges Grid */}
            <div className="my-5 grid grid-cols-2 gap-2">
              {techBadges.map((t, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#07090e] border border-slate-100 dark:border-white/[0.05] flex flex-col justify-center"
                >
                  <span className="font-mono text-xs font-extrabold text-slate-900 dark:text-white">{t.name}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{t.desc}</span>
                </div>
              ))}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {isFa ? "زیرساخت بدون قفل‌شدگی و پایدار" : "Non-Lock-in Scalable Stacks"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {isFa
                ? "تحویل کامل مالکیت کدهای منبع، دیتابیس مستقل Postgres و سازگاری کامل با استقرار بر روی سرورهای اختصاصی یا کلود."
                : "Full source code handover, open-source Postgres, and seamless deployability to independent cloud or self-hosted bare metal."}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Repository Ownership</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Client Owned</span>
          </div>
        </div>

      </div>
    </section>
  );
}
