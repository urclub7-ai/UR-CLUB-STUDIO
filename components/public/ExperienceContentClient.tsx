"use client";

import React from "react";
import { MapPin, ExternalLink, CheckCircle2, Sparkles } from "lucide-react";
import { parseList } from "@/lib/utils";
import MotionSection from "@/components/public/MotionSection";
import { useLanguage } from "@/lib/i18n";

interface ExperienceContentClientProps {
  experiences: any[];
}

export default function ExperienceContentClient({
  experiences,
}: ExperienceContentClientProps) {
  const { language, t } = useLanguage();
  const pageT = t.experiencePage;
  const isFa = language === "fa";

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

      {/* Timeline List */}
      {experiences.length > 0 ? (
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-12 rtl:before:left-auto rtl:before:right-8 rtl:md:before:right-12 before:w-px before:bg-[rgba(255,255,255,0.08)]">
          {experiences.map((exp, index) => {
            const displayTitle = isFa && exp.jobTitle_fa ? exp.jobTitle_fa : exp.jobTitle;
            const displayCompany = isFa && exp.company_fa ? exp.company_fa : exp.company;
            const displayLocation = isFa && exp.location_fa ? exp.location_fa : exp.location;
            const displayDesc = isFa && exp.description_fa ? exp.description_fa : exp.description;
            const displayEmpType = isFa && exp.employmentType_fa ? exp.employmentType_fa : exp.employmentType;
            const rawResp = isFa && exp.responsibilities_fa ? exp.responsibilities_fa : exp.responsibilities;

            const responsibilities = parseList(rawResp);
            const tools = parseList(exp.toolsUsed);

            return (
              <MotionSection
                key={exp.id || index}
                className="relative pl-16 md:pl-24 rtl:pl-0 rtl:pr-16 rtl:md:pr-24 group"
              >
                {/* Timeline Indicator Pin */}
                <div className="absolute left-6 md:left-10 rtl:left-auto rtl:right-6 rtl:md:right-10 top-8 -translate-x-1/2 rtl:translate-x-1/2 w-5 h-5 rounded-full bg-[#08090B] border-2 border-[rgba(255,255,255,0.2)] group-hover:border-white group-hover:scale-110 transition-all duration-200 flex items-center justify-center">
                  {exp.currentlyWorkingHere && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C3FF] animate-ping" />
                  )}
                </div>

                {/* Main Card */}
                <div className="p-8 sm:p-10 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0D0F12]/80 group-hover:border-[rgba(255,255,255,0.2)] group-hover:bg-[#0D0F12] transition-all duration-200 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <span className="mono-tag text-xs text-[#F8FAFC] font-semibold bg-[#14171C] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.1)]">
                          {displayCompany}
                        </span>
                        {exp.websiteUrl && (
                          <a
                            href={exp.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center text-[#00C3FF] hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#00C3FF]" />
                          </a>
                        )}
                        <span className="text-[#94A3B8] select-none">•</span>
                        <span className="text-xs text-[#CBD5E1] font-mono rtl:font-sans flex items-center gap-1 leading-none">
                          <MapPin className="w-3 h-3 shrink-0 text-[#00C3FF]" />
                          <span className="leading-none">{displayLocation}</span>
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-semibold text-[#F8FAFC] group-hover:text-white transition-colors">
                        {displayTitle}
                      </h2>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 flex-shrink-0">
                      <span className="mono-tag text-xs text-[#F8FAFC] bg-[#14171C] px-3.5 py-1.5 rounded-full border border-[rgba(255,255,255,0.1)] font-mono font-medium">
                        {exp.startDate} – {exp.currentlyWorkingHere ? pageT.present : exp.endDate || "2024"}
                      </span>
                      <span className="text-[11px] text-[#94A3B8] font-mono rtl:font-sans mt-1">
                        {displayEmpType}
                      </span>
                    </div>
                  </div>

                  <p className="text-[14.5px] text-[#CBD5E1] font-normal leading-[1.8]">
                    {displayDesc}
                  </p>

                  {/* Key Responsibilities */}
                  {responsibilities.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                      <span className="mono-tag text-[11px] text-[#A0A5B2] block mb-2 font-medium">
                        {pageT.scopeLabel}
                      </span>
                      {responsibilities.map((resp: string, rIdx: number) => (
                        <div key={rIdx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1] font-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00C3FF] mt-0.5 flex-shrink-0" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tools */}
                  {tools.length > 0 && (
                    <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center gap-2">
                      <span className="mono-tag text-[11px] text-[#A0A5B2] mr-2 font-medium">
                        {pageT.toolkitLabel}
                      </span>
                      {tools.map((tool: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-[11px] text-[#CBD5E1] font-mono"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </MotionSection>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-[rgba(255,255,255,0.1)] rounded-2xl">
          <p className="text-[#94A3B8] text-sm">
            {isFa ? "تجربه‌ای برای نمایش ثبت نشده است." : "No experience entries added yet."}
          </p>
        </div>
      )}

      {/* Experience Growing Notice */}
      <MotionSection className="rounded-2xl border border-dashed border-[rgba(255,255,255,0.12)] bg-[#0D0F12]/40 p-8 text-center space-y-2">
        <div className="w-10 h-10 rounded-full bg-[#14171C] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#00C3FF] mx-auto mb-2">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="text-base font-semibold text-[#F8FAFC]">
          {pageT.growingTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-lg mx-auto font-normal leading-[1.8]">
          {pageT.growingDesc}
        </p>
      </MotionSection>
    </div>
  );
}
