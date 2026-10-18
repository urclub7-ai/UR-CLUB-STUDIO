"use client";

import React from "react";
import ServicesList from "@/components/public/ServicesList";
import MotionSection from "@/components/public/MotionSection";
import { useLanguage } from "@/lib/i18n";

interface ServicesContentClientProps {
  services: any[];
}

export default function ServicesContentClient({
  services,
}: ServicesContentClientProps) {
  const { t } = useLanguage();
  const pageT = t.servicesPage;

  return (
    <div className="pt-32 md:pt-40 pb-24 max-w-[1200px] mx-auto px-6 lg:px-8 space-y-16">
      {/* Header */}
      <MotionSection className="pb-10 border-b border-[rgba(255,255,255,0.08)]">
        <span className="mono-tag text-[#A0A5B2] block mb-2 text-xs font-medium">
          {pageT.eyebrow}
        </span>
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-[#F8FAFC]">
          {pageT.title}
        </h1>
        <p className="text-[#CBD5E1] text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed">
          {pageT.subtitle}
        </p>
      </MotionSection>

      {/* Services Grid */}
      <ServicesList services={services} />

      {/* Process FAQ & Scope banner */}
      <MotionSection className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0D0F12]/80 p-8 sm:p-12 space-y-8">
        <div>
          <span className="mono-tag text-[#A0A5B2] block mb-2 text-xs font-medium">
            {pageT.processEyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-[#F8FAFC]">
            {pageT.processTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {pageT.phases.map((phase, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#14171C]/70 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.2)] transition-all duration-200 space-y-2.5 group"
            >
              <span className="mono-tag text-[#94A3B8] text-xs font-medium">{phase.tag}</span>
              <h4 className="text-[15.5px] font-semibold text-[#F8FAFC] group-hover:text-white transition-colors">
                {phase.title}
              </h4>
              <p className="text-xs sm:text-[13px] text-[#CBD5E1] font-normal leading-[1.75]">
                {phase.desc}
              </p>
            </div>
          ))}
        </div>
      </MotionSection>
    </div>
  );
}

