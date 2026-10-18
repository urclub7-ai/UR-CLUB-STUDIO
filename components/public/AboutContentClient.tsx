"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, CheckCircle2 } from "lucide-react";
import MotionSection from "@/components/public/MotionSection";
import SkillsMatrix from "@/components/public/SkillsMatrix";
import { useLanguage } from "@/lib/i18n";

interface AboutContentClientProps {
  about: any;
  settings: any;
  designSkills: any[];
  webSkills: any[];
  techSkills: any[];
  aiSkills: any[];
}

export default function AboutContentClient({
  about,
  settings,
  designSkills,
  webSkills,
  techSkills,
  aiSkills,
}: AboutContentClientProps) {
  const { language, t } = useLanguage();
  const pageT = t.aboutPage;

  const heading = language === "fa" ? pageT.title : (about?.heading || pageT.title);
  const subheading = language === "fa" ? pageT.subtitle : (about?.subheading || pageT.subtitle);

  return (
    <div className="pt-32 md:pt-40 pb-24 max-w-[1200px] mx-auto px-6 lg:px-8 space-y-20">
      {/* Top Header */}
      <MotionSection className="pb-10 border-b border-[rgba(255,255,255,0.08)]">
        <span className="mono-tag text-[#A0A5B2] block mb-2 text-xs font-medium">
          {pageT.eyebrow}
        </span>
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-[#F8FAFC] max-w-4xl leading-tight">
          {heading}
        </h1>
        <p className="text-base sm:text-lg text-[#CBD5E1] mt-4 max-w-2xl font-normal leading-relaxed">
          {subheading}
        </p>
      </MotionSection>

      {/* Main Profile & Bio Grid */}
      <MotionSection className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* Profile Image & Quick Facts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Luxury Minimalist Profile Photo Frame with Orbiting Red Laser Beam */}
          <div className="relative group select-none">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#00C3FF]/20 via-transparent to-[#00C3FF]/15 blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />

            {/* Main Outer Chassis Housing with Animated Border Path */}
            <div className="relative p-2.5 sm:p-3 rounded-3xl bg-gradient-to-b from-[#14171C]/90 via-[#0D0F12]/95 to-[#08090B] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl overflow-hidden">
              
              {/* Continuous Orbiting Red Dot / Border Beam */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl overflow-visible z-20">
                {/* Subtle base border */}
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="22"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1.5"
                />
                {/* Outer Red Glow of the traveling dot */}
                <motion.rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="22"
                  pathLength="100"
                  fill="none"
                  stroke="#00C3FF"
                  strokeWidth="4"
                  strokeDasharray="8 92"
                  strokeLinecap="round"
                  className="filter blur-[4px]"
                  animate={{ strokeDashoffset: [0, -100] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* Sharp Bright Red Laser Dot */}
                <motion.rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="22"
                  pathLength="100"
                  fill="none"
                  stroke="#00C3FF"
                  strokeWidth="2.5"
                  strokeDasharray="6 94"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 8px #00C3FF) drop-shadow(0 0 16px #00C3FF)" }}
                  animate={{ strokeDashoffset: [0, -100] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>

              {/* Image Viewport (Pure Image without text) */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#08090B] border border-white/5 z-10">
                {about?.profilePhotoUrl ? (
                  <Image
                    src={about.profilePhotoUrl}
                    alt="Mohammad Nazif Yosufi Portrait"
                    fill
                    priority
                    className="object-cover object-top filter contrast-[1.03] brightness-[0.98] group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                ) : (
                  <Image
                    src="/images/nazif-portrait.png"
                    alt="Mohammad Nazif Yosufi Portrait"
                    fill
                    priority
                    className="object-cover object-top filter contrast-[1.03] brightness-[0.98] group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                )}

                {/* Smooth Bottom Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0D0F12]/80 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.06)]">
              <span className="mono-tag text-[#94A3B8] font-medium">{pageT.fullNameLabel}</span>
              <span className="text-[#F8FAFC] font-semibold">Mohammad Nazif Yosufi</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.06)]">
              <span className="mono-tag text-[#94A3B8] font-medium">{pageT.locationLabel}</span>
              <span className="text-[#F8FAFC] font-medium">{pageT.locationValue}</span>
            </div>
            <div className="flex items-start justify-between pb-3 border-b border-[rgba(255,255,255,0.06)]">
              <span className="mono-tag text-[#94A3B8] font-medium">{pageT.languagesLabel}</span>
              <div className="text-right rtl:text-left text-[#CBD5E1] space-y-1 font-medium">
                <div>{pageT.persianLevel}</div>
                <div>{pageT.germanLevel}</div>
                <div>{pageT.englishLevel}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="mono-tag text-[#94A3B8] font-medium">{pageT.interestsLabel}</span>
              <span className="text-[#CBD5E1] font-medium">{pageT.interestsValue}</span>
            </div>
          </div>

          {/* ═══ View CV / Resume Interactive Card ═══ */}
          {settings?.resumeUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0D0F12]/80 overflow-hidden"
            >
              {/* View CV Header */}
              <div className="px-5 pt-5 pb-4">
                <div className="flex items-center gap-2.5 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 rounded-full border-2 border-dashed border-[#00C3FF]/50 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00C3FF]" />
                  </motion.div>
                  <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest">
                    {language === "fa" ? "تماشای رزومه" : "View CV / Resume"}
                  </span>
                </div>

                {/* Mini Animated CV Preview Card */}
                <a
                  href="/Lebenslauf_Mohammad_Nazif_Yosufi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative rounded-xl bg-gradient-to-br from-[#0A0C10] via-[#0D0F12] to-[#111318] border border-white/[0.06] hover:border-[#00C3FF]/40 transition-all duration-500 overflow-hidden"
                >
                  {/* Background Glow */}
                  <motion.div
                    animate={{ opacity: [0.08, 0.2, 0.08] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-32 h-32 bg-[#00C3FF] rounded-full blur-3xl pointer-events-none"
                  />

                  <div className="relative p-5 flex items-center gap-4">
                    {/* Animated Profile Avatar Circle */}
                    <div className="relative flex-shrink-0">
                      {/* Orbiting ring */}
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-1.5 rounded-full border border-dashed border-[#00C3FF]/30"
                      />
                      {/* Pulse ring */}
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.15, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -inset-1 rounded-full bg-[#00C3FF]/20"
                      />
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#00C3FF]/70 shadow-[0_0_14px_rgba(0, 195, 255,0.35)]">
                        <Image
                          src="/images/cv-avatar.jpg"
                          alt="CV Avatar"
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      {/* Status dot */}
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#00C3FF] border-2 border-[#0D0F12] shadow-[0_0_8px_#00C3FF]"
                      />
                    </div>

                    {/* CV Info Text */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white group-hover:text-[#00C3FF] transition-colors">
                        Mohammad Nazif Yosufi
                      </div>
                      <div className="text-[10px] text-[#6B7280] mt-0.5 font-medium tracking-wide">
                        Lebenslauf — IT & Web Development
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="inline-flex items-center gap-1 text-[9px] text-[#00C3FF] font-semibold bg-[#00C3FF]/10 px-2 py-0.5 rounded-full">
                          <motion.span
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-[#00C3FF] inline-block"
                          />
                          PDF
                        </span>
                        <span className="text-[9px] text-[#4B5563] font-medium">A4 • {language === "fa" ? "مشاهده آنلاین" : "Online View"}</span>
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00C3FF]/10 border border-[#00C3FF]/20 flex items-center justify-center group-hover:bg-[#00C3FF]/20 transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00C3FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Bottom Decorative Bar */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[#00C3FF]/30 to-transparent" />
                  <div className="flex items-center justify-center gap-2 py-2.5 bg-[#00C3FF]/[0.04]">
                    <motion.svg
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00C3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </motion.svg>
                    <span className="text-[10px] text-[#00C3FF]/70 font-medium tracking-wider uppercase">
                      {language === "fa" ? "برای مشاهده کلیک کنید" : "Tap to view full resume"}
                    </span>
                  </div>
                </a>
              </div>

              {/* Download CV Button — below the viewer */}
              <a
                href={settings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full py-3.5 bg-[#F2F2F0] text-[#08090B] font-semibold text-xs tracking-wide hover:bg-white transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-white/10 leading-none"
              >
                <Download className="w-4 h-4 text-[#00C3FF] shrink-0 group-hover:-translate-y-0.5 transition-transform" />
                <span className="leading-none">{pageT.downloadCV}</span>
              </a>
            </motion.div>
          )}
        </div>

        {/* Long Form Biography & Strengths */}
        <div className="lg:col-span-7 space-y-10 text-[#CBD5E1] leading-relaxed">
          <div className="space-y-5">
            <span className="mono-tag text-[#A0A5B2] block mb-2 text-xs font-medium">
              {pageT.introEyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#F8FAFC] tracking-tight leading-snug">
              {pageT.introHeadline}
            </h2>

            <div className="space-y-4 text-[15px] sm:text-[15.5px] text-[#CBD5E1] font-normal leading-[1.85]">
              {language === "fa" ? (
                pageT.defaultBio.split("\n\n").map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))
              ) : about?.fullBio ? (
                about.fullBio.split("\n\n").map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))
              ) : (
                pageT.defaultBio.split("\n\n").map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))
              )}
            </div>
          </div>

          {/* Personal Strengths */}
          <div className="pt-8 border-t border-[rgba(255,255,255,0.08)] space-y-4">
            <span className="mono-tag text-[#A0A5B2] block text-xs font-medium">
              {pageT.strengthsEyebrow}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pageT.strengthsList.map((str, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0D0F12]/60 flex items-start gap-2.5 text-xs text-[#CBD5E1] font-medium hover:border-[rgba(255,255,255,0.2)] hover:bg-[#0D0F12] hover:text-white transition-all duration-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00C3FF] mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{str}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Categorized Skills Section */}
      <MotionSection className="pt-16 border-t border-[rgba(255,255,255,0.08)] space-y-10">
        <div>
          <span className="mono-tag text-[#A0A5B2] block mb-2 text-xs font-medium">
            {pageT.capabilitiesEyebrow}
          </span>
          <h2 className="text-3xl font-medium text-[#F8FAFC]">
            {pageT.capabilitiesTitle}
          </h2>
        </div>

        <SkillsMatrix
          designSkills={designSkills}
          webSkills={webSkills}
          techSkills={techSkills}
          aiSkills={aiSkills}
        />
      </MotionSection>
    </div>
  );
}

