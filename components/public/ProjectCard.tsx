"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { EDITORIAL_EASE } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n";

export interface ProjectCardProps {
  id: string;
  title: string;
  title_fa?: string | null;
  slug: string;
  category: string;
  category_fa?: string | null;
  shortDescription: string;
  shortDescription_fa?: string | null;
  client?: string | null;
  client_fa?: string | null;
  projectYear?: string;
  thumbnail: string;
  projectUrl?: string | null;
  featured?: boolean;
  index?: number;
}

export default function ProjectCard({
  title,
  title_fa,
  slug,
  category,
  category_fa,
  shortDescription,
  shortDescription_fa,
  client,
  client_fa,
  projectYear = "2026",
  thumbnail,
  projectUrl,
  index = 0,
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const isFa = language === "fa";

  const displayTitle = isFa && title_fa ? title_fa : title;
  const displayCategory = isFa && category_fa ? category_fa : category;
  const displayDesc = isFa && shortDescription_fa ? shortDescription_fa : shortDescription;
  const displayClient = isFa
    ? client_fa || client || "پروژه مستقل"
    : client || "Independent Work";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 220, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches)) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 6);
    mouseY.set(y * 6);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      layout
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 10 }}
      transition={{
        duration: 0.38,
        delay: prefersReducedMotion ? 0 : Math.min(index * 0.05, 0.25),
        ease: EDITORIAL_EASE,
        layout: { duration: 0.38, ease: EDITORIAL_EASE },
      }}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      className="group relative flex flex-col will-change-transform"
    >
      <Link
        href={`/portfolio/${slug}`}
        className="block overflow-hidden rounded-2xl border border-[#00D2FF]/20 bg-[#081432] group-hover:border-[#00D2FF]/60 group-hover:shadow-[0_16px_36px_rgba(0,210,255,0.2)] transition-all duration-300 focus-visible:outline-none select-none"
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-[#040B20]"
        >
          <motion.div
            style={prefersReducedMotion ? {} : { x: smoothX, y: smoothY, scale: 1.02 }}
            className="relative w-full h-full transform-gpu will-change-transform"
          >
            {thumbnail && thumbnail.trim().length > 0 ? (
              thumbnail.startsWith("/") || thumbnail.includes("supabase") || thumbnail.includes("unsplash") ? (
                <Image
                  src={thumbnail}
                  alt={displayTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.04] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={thumbnail}
                  alt={displayTitle}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              )
            ) : projectUrl ? (
              <div className="relative w-full h-full overflow-hidden bg-[#08090B]" dir="ltr">
                <div className="absolute top-0 left-0 w-[250%] h-[250%] origin-top-left transform scale-[0.4] pointer-events-none select-none">
                  <iframe
                    src={projectUrl}
                    title={displayTitle}
                    className="w-full h-full border-0 bg-[#08090B]"
                    tabIndex={-1}
                    loading="lazy"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#14171C] to-[#08090B] text-zinc-500 p-6 text-center">
                <Globe className="w-8 h-8 text-[#00C3FF]/60 mb-2" />
                <span className="text-xs font-mono text-zinc-400">{displayTitle}</span>
              </div>
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/85 via-[#08090B]/10 to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="mono-tag text-[10.5px] font-medium px-3 py-1 rounded-full bg-[#08090B]/85 backdrop-blur-md text-[#CBD5E1] border border-[rgba(255,255,255,0.1)] group-hover:border-[rgba(255,255,255,0.25)] group-hover:text-white transition-all duration-200">
                {displayCategory}
              </span>
              {projectUrl && (
                <span className="mono-tag text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-[#00C3FF]/15 text-[#00C3FF] border border-[#00C3FF]/30 backdrop-blur-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C3FF] animate-pulse" />
                  <span>Live</span>
                </span>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-[#08090B]/85 backdrop-blur-md flex items-center justify-center text-[#00C3FF] border border-[rgba(255,255,255,0.1)] group-hover:bg-[#00C3FF] group-hover:text-[#08090B] group-hover:border-[#00C3FF] group-hover:scale-105 transition-all duration-200">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 rtl:rotate-90" />
            </div>
          </div>
        </div>
      </Link>

      {/* Project Meta Information */}
      <div className="pt-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs text-[#94A3B8]">
          <span className="mono-tag font-medium">
            {displayClient}
          </span>
          <span className="font-mono text-[11px]">{projectYear}</span>
        </div>

        <h3 className="text-lg sm:text-[19px] font-semibold tracking-tight text-[#F8FAFC] group-hover:text-white transition-colors duration-200">
          <Link
            href={`/portfolio/${slug}`}
            className="hover:underline underline-offset-4"
          >
            {displayTitle}
          </Link>
        </h3>

        <p className="text-[13.5px] text-[#CBD5E1] line-clamp-2 leading-[1.75] font-normal transition-colors duration-200">
          {displayDesc}
        </p>
      </div>
    </motion.div>
  );
}
