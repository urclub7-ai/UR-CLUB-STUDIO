"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Monitor,
  Smartphone,
  ExternalLink,
  Maximize2,
  Minimize2,
  Globe,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface ShowcaseProject {
  id: string;
  name_fa: string;
  name_en: string;
  category_fa: string;
  category_en: string;
  stack: string[];
  metrics: {
    latency: string;
    efficiency: string;
    loadTime: string;
  };
  previewImage?: string;
  liveUrl: string;
  hasInteractiveIframe?: boolean;
}

const FEATURED_PROJECTS: ShowcaseProject[] = [
  {
    id: "azimian",
    name_fa: "عظیمیان مارکت آلمان",
    name_en: "Azimian Market Germany",
    category_fa: "فروشگاه آنلاین و سوپرمارکت زنجیره‌ای",
    category_en: "E-Commerce & Retail Supermarket",
    stack: ["Next.js 14", "Tailwind CSS", "Supabase", "Stripe Checkout"],
    metrics: {
      latency: "12ms",
      efficiency: "99.8%",
      loadTime: "0.7s",
    },
    previewImage: "/showcase/azimian-markt/1_desktop_hero.png",
    liveUrl: "/showcase/azimian-markt/index.html",
    hasInteractiveIframe: true,
  },
  {
    id: "novinpay",
    name_fa: "سامانه مالی و بانکی نوین‌پِی",
    name_en: "Novin Pay Financial Portal",
    category_fa: "فین‌تک و سیستم مبادلات ارزی",
    category_en: "Fintech & Currency Exchange Portal",
    stack: ["React", "TypeScript", "Tailwind CSS", "Postgres"],
    metrics: {
      latency: "14ms",
      efficiency: "99.9%",
      loadTime: "0.6s",
    },
    previewImage: "/showcase/novin-pay/index.html",
    liveUrl: "/showcase/novin-pay/index.html",
    hasInteractiveIframe: true,
  },
  {
    id: "auratech",
    name_fa: "پلتفرم ابری آئورا (Aura Cloud)",
    name_en: "Aura Cloud Computing Platform",
    category_fa: "زیرساخت ابری و معماری سرورلس",
    category_en: "Cloud Computing & Serverless Platform",
    stack: ["Next.js", "Docker", "FastAPI", "Edge Runtime"],
    metrics: {
      latency: "9ms",
      efficiency: "99.95%",
      loadTime: "0.5s",
    },
    previewImage: "/showcase/aura-tech/index.html",
    liveUrl: "/showcase/aura-tech/index.html",
    hasInteractiveIframe: true,
  },
  {
    id: "mppizza",
    name_fa: "رستورانت ام‌پی پیتزا آلمان",
    name_en: "MP Pizza Eisenach Germany",
    category_fa: "سیستم سفارش‌گیری آنلاین و رزرواسیون",
    category_en: "Restaurant Online Order & Menu System",
    stack: ["Next.js", "Tailwind CSS", "WhatsApp Gateway", "PWA"],
    metrics: {
      latency: "16ms",
      efficiency: "99.6%",
      loadTime: "0.8s",
    },
    previewImage: "/showcase/mp-pizza-eisenach/1_desktop_hero.png",
    liveUrl: "/showcase/mp-pizza-eisenach/index.html",
    hasInteractiveIframe: true,
  },
  {
    id: "mahdaviyat",
    name_fa: "پورتال فرهنگی مهدویت",
    name_en: "Ideology Mahdaviyat Portal",
    category_fa: "پایگاه داده چندرسانه‌ای و نشر دیجیتال",
    category_en: "Digital Knowledge & Media Platform",
    stack: ["Fullstack Next.js", "Prisma", "PostgreSQL", "Cloudinary"],
    metrics: {
      latency: "18ms",
      efficiency: "99.4%",
      loadTime: "0.9s",
    },
    previewImage: "/showcase/mahdaviat/index.html",
    liveUrl: "https://www.ideologymahdaviyat.org/",
    hasInteractiveIframe: true,
  },
  {
    id: "urclub-card",
    name_fa: "کارت ویزیت انترنتی هوشمند LEVI",
    name_en: "LEVI Smart Web Business Card",
    category_fa: "هویت پرسنال دیجیتال و کاتالوگ لینک‌ها",
    category_en: "Digital Identity & Link Hub",
    stack: ["Next.js 14", "Framer Motion", "Tailwind CSS"],
    metrics: {
      latency: "11ms",
      efficiency: "100%",
      loadTime: "0.4s",
    },
    previewImage: "/showcase/urclub-form/assets/logo.png",
    liveUrl: "https://urclub.vercel.app/",
    hasInteractiveIframe: true,
  },
];

export default function LiveInteractiveFrame() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const [selectedProject, setSelectedProject] = useState<ShowcaseProject>(FEATURED_PROJECTS[0]);
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");
  const [isInteractiveMode, setIsInteractiveMode] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleSelectProject = (project: ShowcaseProject) => {
    setSelectedProject(project);
    setIsInteractiveMode(false); // Reset to crisp preview mode
  };

  return (
    <div id="projects-section" className="relative w-full scroll-mt-28">
      {/* ─── Architectural Section Header ─── */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-[#00D2FF]/10 border border-sky-200 dark:border-[#00D2FF]/20 text-sky-600 dark:text-[#00D2FF] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>{isFa ? "ویترین نمونه‌کارهای اجرا شده" : "Production Platforms Showcase"}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-[2.65rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {isFa
            ? "بررسی زنده و موکاپ پلتفرم‌های طراحی‌شده"
            : "Live Interactive Showcase & Verification"}
        </h2>

        <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-normal">
          {isFa
            ? "پروژه‌های واقعی اجرا شده برای کسب‌وکارها در اروپا و افغانستان؛ امکان بررسی ساختار UI، تگ‌های مهندسی و اجرای تست زنده درون کادر."
            : "Real-world web platforms, online stores, and enterprise portals engineered for clients in Europe and globally. Inspect architecture and launch live previews."}
        </p>
      </div>

      {/* ─── Control Bar: Project Filter Pills + Viewport Device Switcher ─── */}
      <div className="mb-5 flex flex-col md:flex-row items-center justify-between gap-3.5">
        {/* Project Selector Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
          {FEATURED_PROJECTS.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(proj)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer select-none ${
                  isSelected
                    ? "bg-sky-600 dark:bg-[#00D2FF] text-white dark:text-[#040B20] font-bold shadow-md dark:shadow-[0_0_15px_rgba(0,210,255,0.4)] scale-[1.02]"
                    : "bg-white dark:bg-[#0b0f17] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08] hover:border-sky-400 dark:hover:border-[#00D2FF]/40 shadow-sm"
                }`}
              >
                <Globe className={`w-3.5 h-3.5 ${isSelected ? "text-white dark:text-[#040B20]" : "text-sky-600 dark:text-[#00D2FF]"}`} />
                <span>{isFa ? proj.name_fa : proj.name_en}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport & External Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Device Toggle */}
          <div className="flex items-center gap-1 bg-white dark:bg-[#0b0f17] p-1 rounded-xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <button
              onClick={() => setDeviceView("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                deviceView === "desktop"
                  ? "bg-sky-600 dark:bg-[#00D2FF] text-white dark:text-[#040B20]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{isFa ? "دسکتاپ" : "Desktop"}</span>
            </button>
            <button
              onClick={() => setDeviceView("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                deviceView === "mobile"
                  ? "bg-sky-600 dark:bg-[#00D2FF] text-white dark:text-[#040B20]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{isFa ? "موبایل" : "Mobile"}</span>
            </button>
          </div>

          {/* Direct External Link */}
          <a
            href={selectedProject.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={isFa ? "باز کردن وب‌سایت در صفحه کامل" : "Open full live platform"}
            className="p-2.5 rounded-xl bg-white dark:bg-[#0b0f17] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08] hover:text-sky-600 dark:hover:text-[#00D2FF] shadow-sm transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ─── Main Glassmorphic Showcase Browser Frame (Inspired by Reference 08) ─── */}
      <div
        className={`relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#07090e] shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(0,210,255,0.1)] transition-all duration-300 flex flex-col ${
          isFullscreen ? "fixed inset-4 z-50 rounded-2xl border-sky-500 dark:border-[#00D2FF]" : "w-full"
        }`}
      >
        {/* macOS Glass Window Chrome Header */}
        <div className="h-12 bg-slate-100 dark:bg-[#0e131f] border-b border-slate-200 dark:border-white/[0.08] px-4 sm:px-6 flex items-center justify-between select-none">
          {/* macOS 3-color Dots */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm" />
          </div>

          {/* Project URL & Title Bar */}
          <div className="flex items-center gap-2 max-w-md w-full justify-center px-4">
            <div className="w-full max-w-sm h-7 rounded-lg bg-white dark:bg-[#07090e] border border-slate-200 dark:border-white/[0.08] px-3 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 truncate shadow-inner">
              <span className="truncate">{selectedProject.liveUrl}</span>
              <span className="text-emerald-500 font-bold ml-2">● LIVE</span>
            </div>
          </div>

          {/* Action: Toggle Fullscreen / Restart */}
          <div className="flex items-center gap-2 shrink-0">
            {isInteractiveMode && (
              <button
                onClick={() => setIsInteractiveMode(false)}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-[#00D2FF] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title={isFa ? "بازگشت به نمای پیش‌نمایش" : "Return to preview mode"}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isFa ? "بستن فریم تعاملی" : "Close Frame"}</span>
              </button>
            )}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title={isFullscreen ? (isFa ? "خروج از تمام صفحه" : "Exit Fullscreen") : (isFa ? "تمام صفحه" : "Fullscreen")}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4 text-sky-600 dark:text-[#00D2FF]" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Viewport Screen Content */}
        <div className={`relative w-full ${deviceView === "mobile" ? "py-8 flex justify-center bg-slate-50 dark:bg-[#07090e]" : "h-[420px] sm:h-[620px]"}`}>
          
          {deviceView === "mobile" ? (
            /* Mobile Device Frame Mockup */
            <div className="relative w-[340px] sm:w-[380px] h-[680px] rounded-[48px] p-3 bg-slate-900 border-4 border-slate-700 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
              {/* Dynamic Island */}
              <div className="w-28 h-5 bg-black rounded-full mx-auto mb-2 shrink-0 z-20" />
              
              <div className="relative flex-1 rounded-[36px] overflow-hidden bg-slate-950 flex flex-col justify-between">
                {isInteractiveMode ? (
                  <iframe
                    src={selectedProject.liveUrl}
                    title={selectedProject.name_en}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; encrypted-media"
                  />
                ) : (
                  <div className="relative w-full h-full flex flex-col justify-between p-6 text-white bg-gradient-to-b from-slate-900 via-[#0b0f17] to-slate-950">
                    <div className="space-y-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-400 font-mono text-[10px] font-bold">
                        {selectedProject.metrics.latency} Latency
                      </span>
                      <h4 className="text-xl font-bold">{isFa ? selectedProject.name_fa : selectedProject.name_en}</h4>
                      <p className="text-xs text-slate-400">{isFa ? selectedProject.category_fa : selectedProject.category_en}</p>
                    </div>

                    <div className="space-y-2 pt-4">
                      <button
                        onClick={() => setIsInteractiveMode(true)}
                        className="w-full py-3 rounded-xl bg-sky-500 dark:bg-[#00D2FF] text-white dark:text-[#040B20] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>{isFa ? "شروع تست تعاملی موبایل" : "Launch Interactive Test"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Desktop Full Viewport */
            <div className="relative w-full h-full">
              {isInteractiveMode ? (
                /* Active Interactive Iframe Mode */
                <iframe
                  src={selectedProject.liveUrl}
                  title={selectedProject.name_en}
                  className="w-full h-full border-0 bg-white dark:bg-[#07090e]"
                  allow="autoplay; fullscreen; encrypted-media"
                />
              ) : (
                /* High-Contrast Interactive Visual Mockup (NO Black Box!) */
                <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-[#0b0f17] to-[#07090e] text-white p-6 sm:p-12 flex flex-col justify-between overflow-hidden">
                  
                  {/* Background Geometric Grid Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D2FF0a_1px,transparent_1px),linear-gradient(to_bottom,#00D2FF0a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

                  {/* Top Project Identification & Live Status Header */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold">
                        <Activity className="w-3.5 h-3.5" />
                        <span>{isFa ? selectedProject.category_fa : selectedProject.category_en}</span>
                      </span>
                      <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {isFa ? selectedProject.name_fa : selectedProject.name_en}
                      </h3>
                    </div>

                    {/* Telemetry Metric Pills (Inspired by Reference 08) */}
                    <div className="flex items-center gap-2.5 sm:gap-4 font-mono">
                      <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center min-w-[90px]">
                        <div className="text-[10px] text-slate-400">LATENCY</div>
                        <div className="text-sm font-bold text-emerald-400">{selectedProject.metrics.latency}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center min-w-[90px]">
                        <div className="text-[10px] text-slate-400">LOAD TIME</div>
                        <div className="text-sm font-bold text-sky-400">{selectedProject.metrics.loadTime}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center min-w-[90px]">
                        <div className="text-[10px] text-slate-400">EFFICIENCY</div>
                        <div className="text-sm font-bold text-cyan-300">{selectedProject.metrics.efficiency}</div>
                      </div>
                    </div>
                  </div>

                  {/* Center Interactive Callout (Actionable, Clean, High-Contrast) */}
                  <div className="relative z-10 max-w-xl mx-auto text-center space-y-4 my-auto py-6">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] mb-2 shadow-[0_0_30px_rgba(0,210,255,0.25)]">
                      <Sparkles className="w-8 h-8 animate-pulse" />
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                      {isFa
                        ? "آماده تجربه تست آنلاین در داخل کادر یا باز کردن کامل پلتفرم هستید؟"
                        : "Ready to Test This Platform Interactively?"}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      {isFa
                        ? "کدهای بهینه‌سازی‌شده فرانت‌اند، سرعت پیمایش و سازگاری با انواع دیوایس‌ها را به صورت زنده بررسی کنید."
                        : "Experience the responsive layouts, fluid animations, and sub-second navigation firsthand."}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => setIsInteractiveMode(true)}
                        className="h-11 px-6 rounded-xl bg-sky-500 hover:bg-sky-400 dark:bg-[#00D2FF] dark:hover:bg-[#38bdf8] text-white dark:text-[#040B20] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)]"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>{isFa ? "شروع تست آنلاین درون کادر" : "Launch In-Frame Interactive Test"}</span>
                      </button>

                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/15 transition-all cursor-pointer"
                      >
                        <span>{isFa ? "مشاهده سایت کامل" : "Open Live URL"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Bottom Technical Stack Badges (Inspired by Reference 08) */}
                  <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-400">{isFa ? "معماری فنی:" : "Engineering Stack:"}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.stack.map((item, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10 font-mono text-[11px] text-cyan-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isFa ? "تست‌شده در تولید (Verified in Prod)" : "Verified in Production"}</span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ─── Telemetry Summary Cards Grid (Inspired by Reference 08 lower section) ─── */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {FEATURED_PROJECTS.slice(0, 3).map((proj) => {
          const isSelected = selectedProject.id === proj.id;
          return (
            <div
              key={proj.id}
              onClick={() => handleSelectProject(proj)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                isSelected
                  ? "bg-white dark:bg-[#0b0f17] border-sky-500 dark:border-[#00D2FF] shadow-md dark:shadow-[0_0_20px_rgba(0,210,255,0.15)]"
                  : "bg-white dark:bg-[#0b0f17]/60 border-slate-200 dark:border-white/[0.08] hover:border-sky-400 dark:hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                  <span>{isFa ? proj.category_fa : proj.category_en}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{proj.metrics.latency}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {isFa ? proj.name_fa : proj.name_en}
                </h4>
              </div>

              {/* Stack Pills */}
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                  {proj.stack.slice(0, 2).join(" • ")}
                </span>
                <span className="text-sky-600 dark:text-[#00D2FF] font-bold flex items-center gap-1">
                  <span>{isFa ? "انتخاب" : "Select"}</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
