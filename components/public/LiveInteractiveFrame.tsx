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
} from "lucide-react";

export interface ShowcaseProject {
  id: string;
  name_fa: string;
  url: string;
}

const DEFAULT_PROJECTS: ShowcaseProject[] = [
  {
    id: "urclub",
    name_fa: "کارت ویزیت انترنتی صفحه (LEVI)",
    url: "https://urclub.vercel.app/",
  },
  {
    id: "ideologymahdaviyat",
    name_fa: "ایدئولوژی مهدویت",
    url: "https://www.ideologymahdaviyat.org/",
  },
  {
    id: "novinpay",
    name_fa: "سامانه مالی نوین‌پِی",
    url: "/showcase/novin-pay/index.html",
  },
  {
    id: "auratech",
    name_fa: "Aura Cloud (انگلیسی)",
    url: "/showcase/aura-tech/index.html",
  },
  {
    id: "azimian",
    name_fa: "عظیمیان مارکت",
    url: "/showcase/azimian-markt/index.html",
  },
];

type DeviceView = "desktop" | "mobile";

export default function LiveInteractiveFrame({
  initialProjects,
}: {
  initialProjects?: ShowcaseProject[];
} = {}) {
  const projectsList = initialProjects && initialProjects.length > 0 ? initialProjects : DEFAULT_PROJECTS;
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject>(projectsList[0]);
  const [deviceView, setDeviceView] = useState<DeviceView>("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSelectProject = (project: ShowcaseProject) => {
    setSelectedProject(project);
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div id="projects-section" className="relative w-full scroll-mt-28">
      {/* Outer Subtle Ambient Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#00D2FF]/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Clean Centered Header matching other sections */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white">
          مشاهده و اسکرول در وبسایت‌های قبلی
        </h2>
        <p className="mt-2.5 text-xs sm:text-base text-[#94A3B8] max-w-xl leading-relaxed">
          امکان اسکرول و بررسی زنده پروژه‌ها به صورت تعاملی در داخل کادر
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
                    ? "bg-[#00D2FF] text-[#040B20] font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                    : "bg-[#081432]/80 text-[#CBD5E1] border border-white/[0.08] hover:border-[#00D2FF]/40 hover:text-white"
                }`}
              >
                <Globe className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isSelected ? "text-[#040B20]" : "text-[#00D2FF]"}`} />
                <span>{proj.name_fa}</span>
              </button>
            );
          })}
        </div>

        {/* Controls: Device Switcher + Actions */}
        <div className="flex items-center gap-2">
          {/* Viewport Device Controls: Desktop and Mobile ONLY */}
          <div className="flex items-center gap-1 bg-[#081432]/80 p-1.5 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setDeviceView("desktop")}
              title="نمای کامپیوتر (دسکتاپ)"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                deviceView === "desktop"
                  ? "bg-[#00D2FF] text-[#040B20] font-bold shadow-sm"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>کامپیوتر</span>
            </button>
            <button
              onClick={() => setDeviceView("mobile")}
              title="نمای موبایل"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                deviceView === "mobile"
                  ? "bg-[#00D2FF] text-[#040B20] font-bold shadow-sm"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>موبایل</span>
            </button>
          </div>

          {/* Action Tools: Refresh & Open in New Tab */}
          <div className="flex items-center gap-1 bg-[#081432]/80 p-1.5 rounded-xl border border-white/[0.08]">
            <button
              onClick={handleRefresh}
              title="تازه‌سازی کادر"
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#00D2FF] hover:bg-[#00D2FF]/10 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#00D2FF]" : ""}`} />
            </button>
            <a
              href={selectedProject.url}
              target="_blank"
              rel="noopener noreferrer"
              title="باز کردن در صفحه جداگانه"
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
          className={`relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#06102a] shadow-[0_20px_60px_rgba(4,11,32,0.95),0_0_35px_rgba(0,210,255,0.1)] transition-all duration-300 flex flex-col ${
            isFullscreen ? "fixed inset-4 z-50 rounded-2xl border-[#00D2FF]/60" : "w-full"
          }`}
        >
          {/* Browser Top Window Chrome */}
          <div className="h-11 bg-[#081432] border-b border-white/[0.08] px-4 flex items-center justify-between select-none">
            {/* Cyber Dots */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D2FF]/50 border border-[#00D2FF]/80 inline-block shadow-[0_0_6px_#00D2FF]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D2FF]/30 border border-[#00D2FF]/50 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D2FF]/20 border border-[#00D2FF]/30 inline-block" />
            </div>

            {/* Clean indicator: active project title */}
            <div className="text-xs font-medium text-[#94A3B8] truncate px-3">
              {selectedProject.name_fa}
            </div>

            {/* Maximize Button */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? "خروج از تمام‌صفحه" : "بزرگ‌نمایی کادر"}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#00D2FF] hover:bg-[#00D2FF]/10 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-[#00D2FF]" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Desktop Viewport Screen */}
          <div className="relative bg-[#040B20] w-full h-[560px] sm:h-[640px]">
            <iframe
              key={`desktop-${iframeKey}-${selectedProject.id}`}
              ref={iframeRef}
              src={selectedProject.url}
              title={selectedProject.name_fa}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0 bg-black"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              loading="lazy"
            />

            {/* Subtle Interactive Instruction Pill */}
            <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#040B20]/90 backdrop-blur-md border border-[#00D2FF]/40 text-[11px] text-[#00D2FF] font-medium shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                <span>قابلیت اسکرول و کلیک کامل در داخل کادر</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Realistic iPhone 16 Mockup in Ultramarine Blue */
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-[370px] sm:w-[415px] md:w-[425px] h-[740px] sm:h-[800px] md:h-[820px] rounded-[54px] p-3 bg-gradient-to-b from-[#1e3a8a] via-[#0f2757] to-[#1e3a8a] border-[3px] border-[#38bdf8]/50 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_0_2px_rgba(56,189,248,0.3),0_0_50px_rgba(0,210,255,0.25)] transition-all duration-300">
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
            <div className="relative w-full h-full rounded-[44px] overflow-hidden bg-black border border-white/10">
              <iframe
                key={`mobile-${iframeKey}-${selectedProject.id}`}
                ref={iframeRef}
                src={selectedProject.url}
                title={selectedProject.name_fa}
                onLoad={() => setIsLoading(false)}
                className="w-full h-full border-0 bg-black"
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
