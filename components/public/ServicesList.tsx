"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Layers, Type, Package, BookOpen, Compass, Layout, Check, ArrowUpRight, Palette, Code, Sparkles } from "lucide-react";
import { EDITORIAL_EASE, defaultViewport } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n";

export interface ServiceItemProps {
  id: string;
  title: string;
  title_fa?: string | null;
  slug: string;
  shortDescription: string;
  shortDescription_fa?: string | null;
  detailedDescription: string;
  detailedDescription_fa?: string | null;
  icon?: string;
  startingPrice?: string | null;
  deliveryTime?: string | null;
  features?: string | null;
  features_fa?: string | null;
  featured?: boolean;
}

const getServiceIcon = (iconName?: string) => {
  switch (iconName?.toLowerCase()) {
    case "type":
      return <Type className="w-6 h-6 text-[#00C3FF]" />;
    case "package":
      return <Package className="w-6 h-6 text-[#00C3FF]" />;
    case "bookopen":
      return <BookOpen className="w-6 h-6 text-[#00C3FF]" />;
    case "compass":
      return <Compass className="w-6 h-6 text-[#00C3FF]" />;
    case "layout":
      return <Layout className="w-6 h-6 text-[#00C3FF]" />;
    case "palette":
      return <Palette className="w-6 h-6 text-[#00C3FF]" />;
    case "code":
      return <Code className="w-6 h-6 text-[#00C3FF]" />;
    case "sparkles":
      return <Sparkles className="w-6 h-6 text-[#00C3FF]" />;
    case "layers":
    default:
      return <Layers className="w-6 h-6 text-[#00C3FF]" />;
  }
};

export default function ServicesList({ services }: { services: ServiceItemProps[] }) {
  const prefersReducedMotion = useReducedMotion();
  const { language, t } = useLanguage();
  const pageT = t.servicesPage;
  const isFa = language === "fa";

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-[rgba(255,255,255,0.1)] rounded-2xl">
        <p className="text-[#94A3B8] text-sm">
          {isFa ? "خدمتی برای نمایش ثبت نشده است." : "No service packages available yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
      {services.map((service, index) => {
        const displayTitle = isFa && service.title_fa ? service.title_fa : service.title;
        const displayShortDesc = isFa && service.shortDescription_fa ? service.shortDescription_fa : service.shortDescription;
        const rawFeatures = isFa && service.features_fa ? service.features_fa : service.features;

        const featureList = rawFeatures
          ? rawFeatures.split(/[\n,]+/).map((f) => f.trim()).filter(Boolean)
          : [];

        return (
          <motion.div
            key={service.id || index}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ delay: prefersReducedMotion ? 0 : Math.min(index * 0.08, 0.35), duration: 0.45, ease: EDITORIAL_EASE }}
            whileHover={prefersReducedMotion ? {} : { y: -4 }}
            className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0D0F12]/80 p-8 lg:p-10 flex flex-col justify-between hover:border-[rgba(255,255,255,0.2)] hover:bg-[#0D0F12] transition-all duration-300 group select-none will-change-transform"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="p-3.5 rounded-xl bg-[#00C3FF]/10 border border-[#00C3FF]/20 text-[#00C3FF]">
                  {getServiceIcon(service.icon)}
                </div>
                {service.deliveryTime && (
                  <span className="mono-tag text-[10.5px] font-medium text-[#CBD5E1] bg-[#14171C] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.08)]">
                    {service.deliveryTime}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-[#F8FAFC] group-hover:text-white transition-colors">
                {displayTitle}
              </h3>

              <p className="text-[14px] text-[#CBD5E1] mt-3 font-normal leading-[1.8]">
                {displayShortDesc}
              </p>

              {/* Feature bullets */}
              {featureList.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)] space-y-2.5">
                  <span className="mono-tag text-[11px] font-medium text-[#A0A5B2] block mb-2">
                    {pageT.inclusionsLabel}
                  </span>
                  {featureList.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                      <Check className="w-3.5 h-3.5 text-[#00C3FF] mt-0.5 flex-shrink-0" />
                      <span className="leading-5">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Pricing & Action */}
            <div className="pt-8 mt-8 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
              <div>
                <span className="mono-tag text-[11px] font-medium text-[#94A3B8] block">
                  {pageT.investmentLabel}
                </span>
                <span className="text-base font-mono rtl:font-sans text-[#F8FAFC] font-semibold">
                  {service.startingPrice || pageT.customQuote}
                </span>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent(displayTitle)}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-lg bg-[#F2F2F0] text-[#08090B] hover:bg-white transition-all shadow-sm leading-none"
              >
                <span className="leading-none">{pageT.bookService}</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#00C3FF] rtl:rotate-90" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
