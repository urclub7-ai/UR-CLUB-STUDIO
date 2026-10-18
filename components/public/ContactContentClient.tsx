"use client";

import React from "react";
import ContactForm from "@/components/public/ContactForm";
import ProjectInquiryForm from "@/components/public/ProjectInquiryForm";
import MotionSection from "@/components/public/MotionSection";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface ContactContentClientProps {
  settings: any;
}

export default function ContactContentClient({
  settings,
}: ContactContentClientProps) {
  const { t, language } = useLanguage();
  const pageT = t.contactPage;
  const isFa = language === "fa";

  const [activeTab, setActiveTab] = React.useState<"quick" | "order">("quick");

  return (
    <div className="pt-32 md:pt-40 pb-24 max-w-[1200px] mx-auto px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="pb-8 border-b border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
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

        {/* Tab Switcher Pills */}
        <div className="p-1.5 rounded-2xl bg-[#0D0F14] border border-white/10 flex items-center gap-1.5 self-start md:self-end">
          <button
            type="button"
            onClick={() => setActiveTab("quick")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "quick"
                ? "bg-[#00C3FF] text-white shadow-[0_0_15px_rgba(0, 195, 255,0.4)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {activeTab === "quick" && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            <span>{isFa ? "پیام سریع" : "Quick Message"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("order")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "order"
                ? "bg-[#00C3FF] text-white shadow-[0_0_15px_rgba(0, 195, 255,0.4)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {activeTab === "order" && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            <span>{isFa ? "فرم کامل سفارش پروژه" : "Detailed Project Brief"}</span>
          </button>
        </div>
      </div>

      {activeTab === "order" ? (
        <MotionSection>
          <ProjectInquiryForm />
        </MotionSection>
      ) : (
        <MotionSection className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Contact Info & Studio Notes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0D0F12]/80 space-y-6">
              <div>
                <span className="mono-tag text-[#94A3B8] text-xs font-medium block mb-1">
                  {pageT.directEmail}
                </span>
                <a
                  href={`mailto:${settings?.email || "contact@nazifyosufi.com"}`}
                  className="text-base sm:text-lg font-semibold text-[#F8FAFC] hover:text-[#00C3FF] transition-colors flex items-center gap-2.5 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#00C3FF]/10 border border-[#00C3FF]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#00C3FF]" />
                  </div>
                  <span dir="ltr" className="leading-none">{settings?.email || "contact@nazifyosufi.com"}</span>
                </a>
              </div>

              {settings?.phone && (
                <div className="pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <span className="mono-tag text-[#94A3B8] text-xs font-medium block mb-1">
                    {pageT.studioPhone}
                  </span>
                  <span className="text-sm text-[#CBD5E1] font-mono flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#00C3FF]/10 border border-[#00C3FF]/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-[#00C3FF]" />
                    </div>
                    <span dir="ltr" className="leading-none">{settings.phone}</span>
                  </span>
                </div>
              )}

              <div className="pt-4 border-t border-[rgba(255,255,255,0.06)]">
                <span className="mono-tag text-[#94A3B8] text-xs font-medium block mb-1">
                  {pageT.location}
                </span>
                <span className="text-sm text-[#CBD5E1] font-medium flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00C3FF]/10 border border-[#00C3FF]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#00C3FF]" />
                  </div>
                  <span className="leading-none">{settings?.location || "Germany"}</span>
                </span>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0D0F12]/50 space-y-2.5 text-xs text-[#CBD5E1] font-normal leading-[1.8]">
              <h4 className="mono-tag text-[#F8FAFC] text-xs font-semibold">
                {pageT.responseTitle}
              </h4>
              <p>{pageT.responseDesc}</p>
            </div>
          </div>

          {/* Right Form Component */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </MotionSection>
      )}
    </div>
  );
}

