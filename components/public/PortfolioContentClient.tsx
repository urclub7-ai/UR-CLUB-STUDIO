"use client";

import React from "react";
import PortfolioGrid from "@/components/public/PortfolioGrid";
import LiveInteractiveFrame from "@/components/public/LiveInteractiveFrame";
import MultiAssetShowcase from "@/components/public/MultiAssetShowcase";
import MotionSection from "@/components/public/MotionSection";
import { useLanguage } from "@/lib/i18n";
import { Globe, Palette, MonitorPlay } from "lucide-react";

interface PortfolioContentClientProps {
  projects: any[];
  categories: string[];
}

export default function PortfolioContentClient({
  projects,
  categories,
}: PortfolioContentClientProps) {
  const { language } = useLanguage();
  const isFa = language === "fa";

  return (
    <div className="pt-28 md:pt-36 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-[#040B20]">
      {/* Page Header */}
      <div className="pb-8 border-b border-[#00D2FF]/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-semibold uppercase tracking-wider mb-3">
          <MonitorPlay className="w-3.5 h-3.5" />
          <span>{isFa ? "آرشیو پروژه‌ها، وبسایت‌های آنلاین و لوگوها" : "Live Web, Systems & Brand Portfolio"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          {isFa ? "نمونه‌کارها و پلتفرم‌های اجرا شده" : "Selected Works & Live Demonstrations"}
        </h1>
        <p className="text-[#CBD5E1] text-sm sm:text-base mt-3 max-w-2xl font-normal leading-relaxed">
          {isFa
            ? "مجموعه‌ای منتخب از وبسایت‌های تعاملی، سیستم‌های تحت وب، طراحی لوگوهای اختصاصی و پروژه‌های آماده برای رشد و سرمایه‌گذاری."
            : "A curated archive of responsive web platforms, commercial ordering engines, custom vector brand identities, and investor-ready systems."}
        </p>
      </div>

      {/* 1. Core Feature: Live Interactive Browser Frame */}
      <MotionSection>
        <LiveInteractiveFrame />
      </MotionSection>

      {/* 2. Brand Identity & Logo Showcase */}
      <MotionSection>
        <MultiAssetShowcase />
      </MotionSection>

      {/* 3. Grid of Projects */}
      <MotionSection className="pt-6">
        <div className="pb-6 border-b border-[#00D2FF]/20 mb-8">
          <h2 className="text-2xl font-bold text-white">
            {isFa ? "فهرست کامل پروژه‌ها و جزئیات فنی" : "Detailed Projects Directory"}
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1">
            {isFa ? "فیلتر بر اساس دسته‌بندی و زمینه تخصصی" : "Filter by technology stack and category"}
          </p>
        </div>
        <PortfolioGrid projects={projects} categories={categories} showFilter={true} />
      </MotionSection>
    </div>
  );
}
