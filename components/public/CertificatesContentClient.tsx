"use client";

import React from "react";
import CertificateModal from "@/components/public/CertificateModal";
import MotionSection from "@/components/public/MotionSection";
import { useLanguage } from "@/lib/i18n";

interface CertificatesContentClientProps {
  certificates: any[];
}

export default function CertificatesContentClient({
  certificates,
}: CertificatesContentClientProps) {
  const { t } = useLanguage();
  const pageT = t.certificatesPage;

  return (
    <div className="pt-32 md:pt-40 pb-24 max-w-[1200px] mx-auto px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="pb-10 border-b border-[rgba(255,255,255,0.08)]">
        <span className="mono-tag text-[#A0A5B2] block mb-2 text-xs font-medium">
          {pageT.eyebrow}
        </span>
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-[#F8FAFC]">
          {pageT.title}
        </h1>
        <p className="text-[#CBD5E1] text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed">
          {pageT.subtitle}
        </p>
      </div>

      {/* Grid */}
      {certificates.length > 0 ? (
        <MotionSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, idx) => (
            <CertificateModal key={cert.id} index={idx} certificate={cert} />
          ))}
        </MotionSection>
      ) : (
        <div className="text-center py-20 border border-dashed border-[rgba(255,255,255,0.1)] rounded-2xl">
          <p className="text-[#94A3B8] text-sm">{pageT.emptyNotice}</p>
        </div>
      )}
    </div>
  );
}

