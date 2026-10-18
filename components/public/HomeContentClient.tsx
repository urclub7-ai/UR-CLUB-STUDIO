"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Hero from "@/components/public/Hero";
import ExpertiseGrid from "@/components/public/ExpertiseGrid";
import WhyChooseUsSection from "@/components/public/WhyChooseUsSection";
import StatsHorizonSection from "@/components/public/StatsHorizonSection";
import LiveInteractiveFrame from "@/components/public/LiveInteractiveFrame";
import MultiAssetShowcase from "@/components/public/MultiAssetShowcase";
import TeamCredibilitySection from "@/components/public/TeamCredibilitySection";
import InvestorSection from "@/components/public/InvestorSection";
import ModernContactSection from "@/components/public/ModernContactSection";
import MotionSection from "@/components/public/MotionSection";

interface HomeContentClientProps {
  homeContent?: any;
  aboutContent?: any;
  projects: any[];
  certificates?: any[];
  experiences: any[];
  services: any[];
  showcaseWebsites?: any[];
  brandAssets?: any[];
}

export default function HomeContentClient({
  homeContent,
  projects,
  showcaseWebsites,
  brandAssets,
}: HomeContentClientProps) {
  return (
    <div className="space-y-14 sm:space-y-28 bg-[#040B20] text-white">
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

      {/* ─── 7. ABOUT US & TEAM CREDIBILITY (درباره ما و اعتبار تیم) ─── */}
      <div id="about-section" className="space-y-14 sm:space-y-28 scroll-mt-28">
        <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <TeamCredibilitySection />
        </MotionSection>

        {/* ─── 8. INVESTOR & CO-VENTURE OPPORTUNITIES (فرصت‌های سرمایه‌گذاری) ─── */}
        <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <InvestorSection />
        </MotionSection>
      </div>

      {/* ─── 8.5. ORDER & PROJECT CONFIGURATOR (کادر متقارن، متوازن و کاملاً تراز سفارش پروژه) ─── */}
      <MotionSection className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-5 sm:p-12 rounded-2xl bg-[#081432]/60 border border-white/[0.08] hover:border-[#00D2FF]/30 transition-all duration-300 text-center space-y-4 sm:space-y-6 overflow-hidden">
          {/* Top subtle neon line */}
          <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF]/50 to-transparent" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/25 text-[11px] sm:text-xs font-semibold text-[#00D2FF]">
            <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span>پیکربندی هوشمند و صدور شناسه پوشه اختصاصی</span>
          </div>

          <div className="space-y-2.5 max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              می‌خواهید پروژه اختصاصی خود را شروع کنید؟
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              نوع پروژه (وب‌سایت، اپلیکیشن موبایل، نرم‌افزار، طراحی پوستر)، دامنه و هاستینگ Vercel/Supabase و امکانات دلخواه را در فرم آنلاین انتخاب کنید.
            </p>
          </div>

          <div className="pt-1 sm:pt-2 flex justify-center">
            <Link
              href="/order"
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_30px_rgba(0,210,255,0.5)] inline-flex items-center gap-2 cursor-pointer group"
            >
              <span>شروع سفارش و صدور شناسه</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
