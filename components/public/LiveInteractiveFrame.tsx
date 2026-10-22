"use client";

import React, { useState, useRef } from "react";
import {
  Monitor,
  Smartphone,
  RefreshCw,
  ExternalLink,
  Maximize2,
  Minimize2,
  Globe,
  MousePointerClick,
  X,
} from "lucide-react";

import { useLanguage } from "@/lib/i18n";

export interface ShowcaseProject {
  id: string;
  name_fa: string;
  name_en?: string;
  url: string;
}

const DEFAULT_PROJECTS: ShowcaseProject[] = [
  {
    id: "urclub",
    name_fa: "کارت ویزیت انترنتی صفحه (LEVI)",
    name_en: "LEVI Smart Web Business Card",
    url: "https://urclub.vercel.app/",
  },
  {
    id: "ideologymahdaviyat",
    name_fa: "ایدئولوژی مهدویت",
    name_en: "Ideology Mahdaviyat",
    url: "https://www.ideologymahdaviyat.org/",
  },
  {
    id: "novinpay",
    name_fa: "سامانه مالی نوین‌پِی",
    name_en: "Novin Pay Financial Portal",
    url: "/showcase/novin-pay/index.html",
  },
  {
    id: "auratech",
    name_fa: "Aura Cloud (انگلیسی)",
    name_en: "Aura Cloud (English)",
    url: "/showcase/aura-tech/index.html",
  },
  {
    id: "azimian",
    name_fa: "عظیمیان مارکت",
    name_en: "Azimian Market",
    url: "/showcase/azimian-markt/index.html",
  },
];

type DeviceView = "desktop" | "mobile";

export default function LiveInteractiveFrame({
  initialProjects,
}: {
  initialProjects?: ShowcaseProject[];
} = {}) {
  const { language } = useLanguage();
  const isFa = language === "fa";
  const projectsList = initialProjects && initialProjects.length > 0 ? initialProjects : DEFAULT_PROJECTS;
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject>(projectsList[0]);
  const [deviceView, setDeviceView] = useState<DeviceView>("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isMobileInteractive, setIsMobileInteractive] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSelectProject = (project: ShowcaseProject) => {
    setSelectedProject(project);
    setIsLoading(true);
    setIsIframeLoaded(false);
    setIsMobileInteractive(false);
    setIframeKey((prev) => prev + 1);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setIsIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div id="projects-section" className="relative w-full scroll-mt-28">
      {/* Outer Subtle Ambient Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#00D2FF]/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Clean Centered Header matching other sections */}
      <div className="flex flex-col items-center text-center mb-4 sm:mb-8">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          {isFa ? "مشاهده و اسکرول در وبسایت‌های قبلی" : "Explore & Scroll Previous Websites Live"}
        </h2>
        <p className="mt-2 text-xs sm:text-base text-slate-600 dark:text-[#94A3B8] max-w-xl leading-relaxed">
          {isFa
            ? "امکان اسکرول و بررسی زنده پروژه‌ها به صورت تعاملی در داخل کادر"
            : "Interactive capability to scroll and inspect live projects directly inside the frame"}
        </p>
      </div>

      {/* Control Bar: Project Tabs & Device Switcher (Desktop & Mobile only) */}
      <div className="mb-5 sm:mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Project Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {projectsList.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(proj)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none ${
                  isSelected
                    ? "bg-sky-600 dark:bg-[#00D2FF] text-white dark:text-[#040B20] font-bold shadow-md dark:shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                    : "bg-white dark:bg-[#081432]/80 text-slate-700 dark:text-[#CBD5E1] border border-slate-200/90 dark:border-white/[0.08] hover:border-sky-500/40 dark:hover:border-[#00D2FF]/40 hover:text-slate-900 dark:hover:text-white shadow-sm dark:shadow-none"
                }`}
              >
                <Globe className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isSelected ? "text-white dark:text-[#040B20]" : "text-sky-600 dark:text-[#00D2FF]"}`} />
                <span>{isFa ? proj.name_fa : (proj.name_en || proj.name_fa)}</span>
              </button>
            );
          })}
        </div>

        {/* Controls: Device Switcher + Actions */}
        <div className="flex items-center gap-2">
          {/* Viewport Device Controls: Desktop and Mobile ONLY */}
          <div className="flex items-center gap-1 bg-white dark:bg-[#081432]/80 p-1.5 rounded-xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm dark:shadow-none">
            <button
              onClick={() => setDeviceView("desktop")}
              title={isFa ? "نمای کامپیوتر (دسکتاپ)" : "Desktop View"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                deviceView === "desktop"
                  ? "bg-sky-600 dark:bg-[#00D2FF] text-white dark:text-[#040B20] font-bold shadow-sm"
                  : "text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{isFa ? "کامپیوتر" : "Desktop"}</span>
            </button>
            <button
              onClick={() => setDeviceView("mobile")}
              title={isFa ? "نمای موبایل" : "Mobile View"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                deviceView === "mobile"
                  ? "bg-sky-600 dark:bg-[#00D2FF] text-white dark:text-[#040B20] font-bold shadow-sm"
                  : "text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{isFa ? "موبایل" : "Mobile"}</span>
            </button>
          </div>

          {/* Action Tools: Refresh & Open in New Tab */}
          <div className="flex items-center gap-1 bg-white dark:bg-[#081432]/80 p-1.5 rounded-xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm dark:shadow-none">
            <button
              onClick={handleRefresh}
              title={isFa ? "تازه‌سازی کادر" : "Refresh Frame"}
              className="p-1.5 rounded-lg text-slate-600 dark:text-[#94A3B8] hover:text-sky-600 dark:hover:text-[#00D2FF] hover:bg-sky-50 dark:hover:bg-[#00D2FF]/10 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-sky-600 dark:text-[#00D2FF]" : ""}`} />
            </button>
            <a
              href={selectedProject.url}
              target="_blank"
              rel="noopener noreferrer"
              title={isFa ? "باز کردن در صفحه جداگانه" : "Open in new window"}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#00D2FF] hover:bg-[#00D2FF]/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Frame Rendering: Desktop Browser Mockup OR Realistic Smartphone Mockup */}
      {deviceView === "desktop" ? (
        /* Desktop Browser Window Mockup */
        <div
          className={`relative rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/[0.1] bg-white dark:bg-[#06102a] shadow-lg dark:shadow-[0_20px_60px_rgba(4,11,32,0.95),0_0_35px_rgba(0,210,255,0.1)] transition-all duration-300 flex flex-col ${
            isFullscreen ? "fixed inset-4 z-50 rounded-2xl border-sky-500/60 dark:border-[#00D2FF]/60" : "w-full"
          }`}
        >
          {/* Browser Top Window Chrome */}
          <div className="h-11 bg-slate-100 dark:bg-[#081432] border-b border-slate-200 dark:border-white/[0.08] px-4 flex items-center justify-between select-none">
            {/* Cyber Dots */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 dark:bg-[#00D2FF]/50 border border-sky-600 dark:border-[#00D2FF]/80 inline-block shadow-sm dark:shadow-[0_0_6px_#00D2FF]" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-[#00D2FF]/30 border border-slate-400 dark:border-[#00D2FF]/50 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-[#00D2FF]/20 border border-slate-300 dark:border-[#00D2FF]/30 inline-block" />
            </div>

            {/* Clean indicator: active project title */}
            <div className="text-xs font-medium text-slate-700 dark:text-[#94A3B8] truncate px-3">
              {isFa ? selectedProject.name_fa : (selectedProject.name_en || selectedProject.name_fa)}
            </div>

            {/* Maximize Button */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? (isFa ? "خروج از تمام‌صفحه" : "Exit Fullscreen") : (isFa ? "بزرگ‌نمایی کادر" : "Maximize Frame")}
                className="p-1.5 rounded-lg text-slate-600 dark:text-[#94A3B8] hover:text-sky-600 dark:hover:text-[#00D2FF] hover:bg-sky-50 dark:hover:bg-[#00D2FF]/10 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-sky-600 dark:text-[#00D2FF]" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Desktop Viewport Screen */}
          <div className="relative bg-slate-50 dark:bg-[#06102a] w-full h-[380px] sm:h-[640px] overflow-hidden">
            {/* Loading Placeholder */}
            {!isIframeLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#06102a] text-center p-4 select-none">
                <div className="w-9 h-9 rounded-full border-2 border-sky-200 dark:border-[#00D2FF]/20 border-t-sky-600 dark:border-t-[#00D2FF] animate-spin mb-3 shadow-sm dark:shadow-[0_0_15px_rgba(0,210,255,0.4)]" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white tracking-wide">
                  {isFa ? `در حال بارگذاری پروژه: ${selectedProject.name_fa}` : `Loading project: ${selectedProject.name_en || selectedProject.name_fa}`}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-1">
                  {isFa ? "کادر آنلاین در حال اتصال است..." : "Online frame connecting..."}
                </span>
              </div>
            )}

            {/* Mobile Interaction Shield (Touch screen protection so page scroll is 100% smooth) */}
            {!isMobileInteractive ? (
              <div className="sm:hidden absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 dark:bg-[#040B20]/80 backdrop-blur-[2px] p-4 text-center">
                <div className="p-4 rounded-2xl bg-[#081432]/95 border border-[#00D2FF]/40 shadow-[0_10px_30px_rgba(0,0,0,0.85)] max-w-xs space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/30 mx-auto flex items-center justify-center text-[#00D2FF]">
                    <MousePointerClick className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {isFa ? selectedProject.name_fa : (selectedProject.name_en || selectedProject.name_fa)}
                    </h4>
                    <p className="text-[11px] text-[#94A3B8] mt-1 leading-relaxed">
                      {isFa
                        ? "برای فعال‌سازی و پیمایش در داخل وب‌سایت ضربه بزنید"
                        : "Tap to enable interaction and navigate inside the website"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      onClick={() => setIsMobileInteractive(true)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#00D2FF] text-[#040B20] text-xs font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
                    >
                      <MousePointerClick className="w-3.5 h-3.5" />
                      <span>{isFa ? "لمس برای تعامل و تست زنده" : "Tap for Live Interaction & Testing"}</span>
                    </button>
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/10 text-[#CBD5E1] text-[11px] font-medium border border-white/10 flex items-center justify-center gap-1"
                    >
                      <span>{isFa ? "باز کردن در تب جداگانه" : "Open in new tab"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* Active Interaction Bar on Mobile */
              <div className="sm:hidden absolute top-2 right-2 left-2 z-30 flex items-center justify-between p-2 rounded-xl bg-[#081432]/95 border border-[#00D2FF]/40 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-[11px] text-[#00D2FF] font-medium pr-1">
                  <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-ping" />
                  <span>{isFa ? "تعامل با کادر فعال است" : "Frame interaction active"}</span>
                </div>
                <button
                  onClick={() => setIsMobileInteractive(false)}
                  className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-500/40 text-[11px] font-bold flex items-center gap-1 cursor-pointer active:scale-95 transition-transform"
                >
                  <X className="w-3 h-3" />
                  <span>{isFa ? "پایان و بازگشت به اسکرول" : "End & Return to Page Scroll"}</span>
                </button>
              </div>
            )}

            <iframe
              key={`desktop-${iframeKey}-${selectedProject.id}`}
              ref={iframeRef}
              src={selectedProject.url}
              title={isFa ? selectedProject.name_fa : (selectedProject.name_en || selectedProject.name_fa)}
              onLoad={() => {
                setIsLoading(false);
                setIsIframeLoaded(true);
              }}
              className={`w-full h-full border-0 bg-[#06102a] transition-opacity duration-300 ${
                isIframeLoaded ? "opacity-100" : "opacity-0"
              } ${isMobileInteractive ? "pointer-events-auto" : "pointer-events-none sm:pointer-events-auto"}`}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              loading="lazy"
            />

            {/* Subtle Interactive Instruction Pill (Desktop only) */}
            <div className="hidden sm:block absolute bottom-3 right-3 z-20 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#040B20]/90 backdrop-blur-md border border-[#00D2FF]/40 text-[11px] text-[#00D2FF] font-medium shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                <span>{isFa ? "قابلیت اسکرول و کلیک کامل در داخل کادر" : "Full scroll and click capability inside the frame"}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Realistic iPhone 16 Mockup in Ultramarine Blue */
        <div className="flex flex-col items-center justify-center py-4 w-full">
          <div className="relative w-full max-w-[min(370px,100%)] sm:max-w-[415px] md:max-w-[425px] h-[720px] sm:h-[800px] md:h-[820px] rounded-[50px] sm:rounded-[54px] p-2.5 sm:p-3 bg-gradient-to-b from-[#1e3a8a] via-[#0f2757] to-[#1e3a8a] border-[3px] border-[#38bdf8]/50 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_0_2px_rgba(56,189,248,0.3),0_0_50px_rgba(0,210,255,0.25)] transition-all duration-300">
            {/* iPhone 16 Left Buttons (Action Button + Volume Buttons) */}
            <div className="absolute -left-[5px] top-28 w-[3px] h-7 bg-[#38bdf8]/80 rounded-l-md shadow-[0_0_6px_#38bdf8]" />
            <div className="absolute -left-[5px] top-40 w-[3px] h-12 bg-[#38bdf8]/80 rounded-l-md shadow-[0_0_6px_#38bdf8]" />
            <div className="absolute -left-[5px] top-56 w-[3px] h-12 bg-[#38bdf8]/80 rounded-l-md shadow-[0_0_6px_#38bdf8]" />

            {/* iPhone 16 Right Buttons (Power Button + Camera Control) */}
            <div className="absolute -right-[5px] top-36 w-[3px] h-16 bg-[#38bdf8]/80 rounded-r-md shadow-[0_0_6px_#38bdf8]" />
            <div className="absolute -right-[5px] top-64 w-[3px] h-14 bg-[#38bdf8]/60 rounded-r-md shadow-[0_0_6px_#38bdf8]" />

            {/* Dynamic Island Pill at top */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3 pointer-events-none shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-[#030712] border border-white/20 relative">
                <div className="absolute inset-0.5 rounded-full bg-[#1e3a8a]/60" />
              </div>
              <div className="w-2 h-2 rounded-full bg-[#0284c7]/40" />
            </div>

            {/* Inner Phone Screen */}
            <div className="relative w-full h-full rounded-[40px] sm:rounded-[44px] overflow-hidden bg-[#06102a] border border-white/10">
              {/* Loading Placeholder */}
              {!isIframeLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#06102a] text-center p-4 select-none">
                  <div className="w-8 h-8 rounded-full border-2 border-[#00D2FF]/20 border-t-[#00D2FF] animate-spin mb-3 shadow-[0_0_15px_rgba(0,210,255,0.4)]" />
                  <span className="text-xs font-semibold text-white tracking-wide">
                    {isFa ? "در حال بارگذاری پروژه" : "Loading project..."}
                  </span>
                </div>
              )}

              {/* Mobile Interaction Shield */}
              {!isMobileInteractive ? (
                <div className="sm:hidden absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#040B20]/80 backdrop-blur-[2px] p-4 text-center">
                  <div className="p-3.5 rounded-2xl bg-[#081432]/95 border border-[#00D2FF]/40 shadow-xl max-w-[260px] space-y-2.5">
                    <MousePointerClick className="w-5 h-5 text-[#00D2FF] mx-auto animate-pulse" />
                    <h4 className="text-xs font-bold text-white">
                      {isFa ? selectedProject.name_fa : (selectedProject.name_en || selectedProject.name_fa)}
                    </h4>
                    <p className="text-[10px] text-[#94A3B8]">
                      {isFa ? "برای تست نمای موبایل ضربه بزنید" : "Tap to test mobile view"}
                    </p>
                    <button
                      onClick={() => setIsMobileInteractive(true)}
                      className="w-full py-2 px-3 rounded-xl bg-[#00D2FF] text-[#040B20] text-xs font-bold shadow-md cursor-pointer"
                    >
                      {isFa ? "لمس برای تعامل زنده" : "Tap for Live Interaction"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="sm:hidden absolute top-12 right-2 left-2 z-30 flex items-center justify-between p-1.5 rounded-lg bg-[#081432]/95 border border-[#00D2FF]/40 shadow-xl">
                  <span className="text-[10px] text-[#00D2FF] font-medium pr-1">
                    {isFa ? "حالت تعاملی فعال" : "Interactive mode active"}
                  </span>
                  <button
                    onClick={() => setIsMobileInteractive(false)}
                    className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-bold flex items-center gap-1"
                  >
                    <X className="w-2.5 h-2.5" />
                    <span>{isFa ? "خروج" : "Exit"}</span>
                  </button>
                </div>
              )}

              <iframe
                key={`mobile-${iframeKey}-${selectedProject.id}`}
                ref={iframeRef}
                src={selectedProject.url}
                title={selectedProject.name_fa}
                onLoad={() => {
                  setIsLoading(false);
                  setIsIframeLoaded(true);
                }}
                className={`w-full h-full border-0 bg-[#06102a] transition-opacity duration-300 ${
                  isIframeLoaded ? "opacity-100" : "opacity-0"
                } ${isMobileInteractive ? "pointer-events-auto" : "pointer-events-none sm:pointer-events-auto"}`}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                loading="lazy"
              />
            </div>

            {/* Home Indicator Bar at bottom */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-36 h-1 bg-white/50 rounded-full z-30 pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
}
