"use client";

import React from "react";
import Link from "next/link";
import Hero from "@/components/public/Hero";
import ExpertiseGrid from "@/components/public/ExpertiseGrid";
import WhyChooseUsSection from "@/components/public/WhyChooseUsSection";
import StatsHorizonSection from "@/components/public/StatsHorizonSection";
import LiveInteractiveFrame from "@/components/public/LiveInteractiveFrame";
import MultiAssetShowcase from "@/components/public/MultiAssetShowcase";
import TeamCredibilitySection from "@/components/public/TeamCredibilitySection";
import TeamMembersSection from "@/components/public/TeamMembersSection";
import InvestorSection from "@/components/public/InvestorSection";
import ModernContactSection from "@/components/public/ModernContactSection";
import MotionSection from "@/components/public/MotionSection";
import { YazdanOrderCartIcon } from "@/components/ui/YazdanIcons";
import { useLanguage } from "@/lib/i18n";

interface HomeContentClientProps {
  homeContent?: any;
  aboutContent?: any;
  projects: any[];
  certificates?: any[];
  experiences: any[];
  services: any[];
  showcaseWebsites?: any[];
  brandAssets?: any[];
  teamMembers?: any[];
}

export default function HomeContentClient({
  homeContent,
  projects,
  showcaseWebsites,
  brandAssets,
  teamMembers,
}: HomeContentClientProps) {
  const { language } = useLanguage();
  const isFa = language === "fa";

  return (
    <div className="space-y-8 sm:space-y-28 bg-background text-foreground transition-colors duration-200">
      {/* ─── 1. HERO SECTION (Dribbble HexaCore Centered Aesthetic) ─── */}
      <Hero />

      {/* ─── 2. OUR EXPERTISE (6-Card Grid matching Dribbble HexaCore) ─── */}
      <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <ExpertiseGrid />
      </MotionSection>

      {/* ─── 3. WHY COMPANIES CHOOSE URCLUB (5 Visual Cards matching Dribbble) ─── */}
      <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <WhyChooseUsSection />
      </MotionSection>

      {/* ─── 4. STATS HORIZON (Glowing Curved Cyan Arc matching Dribbble) ─── */}
      <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <StatsHorizonSection />
      </MotionSection>

      {/* ─── 5. PREVIOUS PROJECTS IN LIVE INTERACTIVE FRAME (پروژه‌های قبلی در کادر آنلاین) ─── */}
      <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <LiveInteractiveFrame initialProjects={showcaseWebsites} />
      </MotionSection>

      {/* ─── 6. LOGOS & BRAND IDENTITY SHOWCASE (لوگوها و هویت بصری) ─── */}
      <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <MultiAssetShowcase initialAssets={brandAssets} />
      </MotionSection>

      {/* ─── 7. ABOUT US, TEAM CREDIBILITY & MEMBERS (درباره ما، اعتبار تیم و اعضای استودیو) ─── */}
      <div id="about-section" className="space-y-8 sm:space-y-28 scroll-mt-28">
        <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <TeamCredibilitySection />
        </MotionSection>

        {/* ─── 7.5. CORE TEAM MEMBERS (اعضای تیم UR CLUB) ─── */}
        <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <TeamMembersSection initialMembers={teamMembers} />
        </MotionSection>

        {/* ─── 8. INVESTOR & CO-VENTURE OPPORTUNITIES (فرصت‌های سرمایه‌گذاری) ─── */}
        <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <InvestorSection />
        </MotionSection>
      </div>

      {/* ─── 8.5. ORDER & PROJECT CONFIGURATOR (ساده و لوکس با تم یزدان) ─── */}
      <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#13110E]/80 border border-stone-200/90 dark:border-[#D4AF37]/25 hover:border-[#D4AF37]/50 shadow-sm hover:shadow-md transition-all duration-300 text-center space-y-3 sm:space-y-4">
          <span className="text-[11px] sm:text-xs font-semibold text-[#8B6914] dark:text-[#E5C396] tracking-wide block font-mono uppercase">
            {isFa
              ? "سفارش مستقیم و آسان"
              : "Fast & Direct Ordering"}
          </span>

          <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-black dark:text-white tracking-tight">
            {isFa
              ? "پروژه خود را آغاز کنید"
              : "Ready to Build Your Custom Project?"}
          </h3>

          <p className="text-xs sm:text-sm text-black dark:text-white max-w-2xl mx-auto leading-relaxed">
            {isFa
              ? "نوع پروژه (سایت، اپلیکیشن یا دیزاین) را انتخاب نموده و مشخصات ره ارسال کنید."
              : "Select your project type (website, app, or design) and submit your specifications."}
          </p>

          <div className="pt-2 flex justify-center">
            <Link
              href="/order"
              className="px-7 sm:px-9 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#E5C396] via-[#D4AF37] to-[#C5A880] text-[#090807] font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:brightness-110 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <YazdanOrderCartIcon className="w-4 h-4 text-[#090807]" />
              <span>{isFa ? "ثبت سفارش آنلاین" : "Start Order Online"}</span>
            </Link>
          </div>
        </div>
      </MotionSection>

      {/* ─── 9. CONTACT & DIRECT CHANNELS (تماس با ما، واتساپ و استعلام سریع) ─── */}
      <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ModernContactSection />
      </MotionSection>
    </div>
  );
}
