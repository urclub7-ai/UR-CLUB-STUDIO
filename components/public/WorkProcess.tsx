"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";

export default function WorkProcess() {
  const { t } = useLanguage();

  return (
    <section className="max-w-[1200px] mx-auto px-6 lg:px-8">
      {/* Section header */}
      <div className="pb-8 border-b border-[rgba(255,255,255,0.08)]">
        <span className="mono-tag text-[#A0A5B0] block mb-2">{t.process.eyebrow}</span>
        <h2 className="text-section-title text-[#F2F2F0]">{t.process.title}</h2>
      </div>

      {/* Horizontal editorial process — desktop */}
      <div className="hidden lg:grid grid-cols-5 mt-10">
        {t.process.steps.map((step, idx) => (
          <div
            key={step.number}
            className={`group py-6 pr-8 rtl:pr-0 rtl:pl-8 ${
              idx < t.process.steps.length - 1
                ? "border-r rtl:border-r-0 rtl:border-l border-[rgba(255,255,255,0.06)]"
                : ""
            } ${idx > 0 ? "pl-8 rtl:pl-0 rtl:pr-8" : ""}`}
          >
            <span className="block text-[36px] font-medium text-[#F2F2F0]/30 leading-none mb-4 tracking-tight group-hover:text-[#00C3FF] transition-colors duration-300 font-mono">
              {step.number}
            </span>
            <h3 className="text-[16px] font-semibold text-[#F2F2F0] mb-2.5 group-hover:text-white transition-colors duration-200">
              {step.title}
            </h3>
            <p className="text-[13.5px] text-[#CBD5E1] font-normal leading-[1.8] group-hover:text-white transition-colors duration-200">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Vertical timeline — mobile/tablet */}
      <div className="lg:hidden mt-8 space-y-0">
        {t.process.steps.map((step, idx) => (
          <div
            key={step.number}
            className={`flex gap-5 py-6 ${
              idx < t.process.steps.length - 1
                ? "border-b border-[rgba(255,255,255,0.06)]"
                : ""
            }`}
          >
            <span className="text-[28px] font-medium text-[#F2F2F0]/30 leading-none tracking-tight flex-shrink-0 w-12 font-mono">
              {step.number}
            </span>
            <div>
              <h3 className="text-[16px] font-semibold text-[#F2F2F0] mb-1.5">
                {step.title}
              </h3>
              <p className="text-[13.5px] text-[#CBD5E1] font-normal leading-[1.8]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
