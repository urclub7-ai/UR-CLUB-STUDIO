"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Globe, ChevronLeft, ChevronRight, Palette, RotateCw, ExternalLink, ShieldCheck } from "lucide-react";
import ProjectGalleryLightbox from "@/components/public/ProjectGalleryLightbox";
import MotionSection from "@/components/public/MotionSection";
import { parseList } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

interface ProjectDetailClientProps {
  project: any;
  prevProject: any;
  nextProject: any;
}

export default function ProjectDetailClient({
  project,
  prevProject,
  nextProject,
}: ProjectDetailClientProps) {
  const { dir, language, t } = useLanguage();
  const pageT = t.projectDetailPage;
  const isFa = language === "fa";

  const displayTitle = isFa && project.title_fa ? project.title_fa : project.title;
  const displayCategory = isFa && project.category_fa ? project.category_fa : project.category;
  const displayClient = isFa
    ? project.client_fa || project.client || "پروژه مستقل"
    : project.client || "Independent Project";
  const displayFullDesc = isFa && project.fullDescription_fa
    ? project.fullDescription_fa
    : project.fullDescription;
  const displayShortDesc = isFa && project.shortDescription_fa
    ? project.shortDescription_fa
    : project.shortDescription;
  const displayServicesRaw = isFa && project.servicesProvided_fa
    ? project.servicesProvided_fa
    : project.servicesProvided;

  const tools = parseList(project.toolsUsed);
  const services = parseList(displayServicesRaw);

  const hasLiveUrl = Boolean(project.projectUrl && project.projectUrl.trim().length > 0);
  const hasThumbnail = Boolean(project.thumbnail && project.thumbnail.trim().length > 0);

  const [activeTab, setActiveTab] = useState<"live" | "image">(hasLiveUrl ? "live" : "image");
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefreshIframe = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <article className="pt-28 md:pt-36 pb-24 max-w-[1050px] mx-auto px-5 sm:px-8">

      {/* ── Back Link ── */}
      <MotionSection>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-[11px] font-medium text-[#64748B] hover:text-white transition-colors group mb-8"
        >
          {dir === "rtl" ? (
            <ArrowRight className="w-3 h-3 text-[#00C3FF] group-hover:translate-x-0.5 transition-transform" />
          ) : (
            <ArrowLeft className="w-3 h-3 text-[#00C3FF] group-hover:-translate-x-0.5 transition-transform" />
          )}
          <span>{pageT.backToPortfolio}</span>
        </Link>
      </MotionSection>

      {/* ── 1. Category / Type ── */}
      <MotionSection className="mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#00C3FF]">
            {displayCategory}
          </span>
          {project.projectYear && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#333]" />
              <span className="text-[10px] font-mono text-[#71717A]">
                {project.projectYear}
              </span>
            </>
          )}
        </div>
      </MotionSection>

      {/* ── 2. Title + Live Link Button ── */}
      <MotionSection className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.15] max-w-[720px]">
            {displayTitle}
          </h1>

          {hasLiveUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00C3FF] text-white text-xs font-semibold hover:bg-[#00a8dc] transition-all shadow-[0_0_20px_rgba(0, 195, 255,0.35)] active:scale-95"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{pageT.liveSite}</span>
              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
            </a>
          )}
        </div>
      </MotionSection>

      {/* ── 3. Live Website Frame or Cover Image ── */}
      <MotionSection className="mb-12">
        {hasLiveUrl && activeTab === "live" ? (
          /* Interactive Browser Mockup Window */
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0D0F12] shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            {/* Browser Window Header */}
            <div className="px-4 py-3 bg-[#14171C] border-b border-white/10 flex items-center justify-between gap-3 select-none">
              {/* macOS Dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block shadow-sm" />
              </div>

              {/* URL Bar */}
              <div className="flex-1 max-w-[560px] mx-auto flex items-center justify-center gap-2 px-3 py-1 rounded-lg bg-[#08090B] border border-white/8 text-[11px] font-mono text-[#94A3B8]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate text-[#E2E8F0]">{project.projectUrl}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              </div>

              {/* Actions & Switcher */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRefreshIframe}
                  title="Reload Preview"
                  className="p-1.5 rounded-md text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>

                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new tab"
                  className="p-1.5 rounded-md text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {hasThumbnail && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("image")}
                    className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[#CBD5E1] transition-colors"
                  >
                    Image View
                  </button>
                )}
              </div>
            </div>

            {/* Live Iframe Body */}
            <div className="relative w-full h-[580px] sm:h-[680px] lg:h-[760px] bg-[#08090B]">
              <iframe
                key={iframeKey}
                src={project.projectUrl}
                title={displayTitle}
                className="w-full h-full border-0 bg-white"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        ) : hasThumbnail ? (
          /* Static Cover Image */
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0D0F12] shadow-2xl">
            <Image
              src={project.thumbnail}
              alt={displayTitle}
              fill
              priority
              className="object-cover"
            />
            {hasLiveUrl && (
              <button
                type="button"
                onClick={() => setActiveTab("live")}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-[#08090B]/85 backdrop-blur-md border border-white/15 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#00C3FF] transition-all shadow-lg"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Switch to Live Website</span>
              </button>
            )}
          </div>
        ) : null}
      </MotionSection>

      {/* ── 4. Description + Details (below image) ── */}
      <MotionSection className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Description */}
          <div className="lg:col-span-2">
            <div className="space-y-3 text-[13px] sm:text-sm text-[#B0B8C4] leading-[1.8]">
              {displayFullDesc ? (
                displayFullDesc.split("\n\n").map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))
              ) : displayShortDesc ? (
                <p>{displayShortDesc}</p>
              ) : null}
            </div>
          </div>

          {/* Right: Compact Specs */}
          <div className="space-y-4">
            {/* Meta rows */}
            <div className="space-y-2.5 text-[11px]">
              {displayClient && (
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[#64748B] uppercase tracking-wider font-medium">{pageT.clientLabel}</span>
                  <span className="text-[#CBD5E1] font-medium">{displayClient}</span>
                </div>
              )}
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[#64748B] uppercase tracking-wider font-medium">{pageT.disciplineLabel}</span>
                <span className="text-[#CBD5E1] font-medium">{displayCategory}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[#64748B] uppercase tracking-wider font-medium">{pageT.yearLabel}</span>
                <span className="text-[#CBD5E1] font-mono">{project.projectYear}</span>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-2">
              {hasLiveUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[100px] py-2 px-3 rounded-lg bg-white/5 border border-white/8 text-[10px] font-semibold text-white flex items-center justify-center gap-1.5 hover:bg-[#00C3FF] hover:border-[#00C3FF] transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{pageT.liveSite}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
                </a>
              )}
              {project.behanceUrl && (
                <a
                  href={project.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[100px] py-2 px-3 rounded-lg bg-white/5 border border-white/8 text-[10px] font-semibold text-[#CBD5E1] flex items-center justify-center gap-1.5 hover:bg-white/10 transition-all"
                >
                  <Palette className="w-3.5 h-3.5 text-[#00C3FF]" />
                  <span>Behance</span>
                  <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
                </a>
              )}
            </div>

            {/* Services */}
            {services.length > 0 && (
              <div>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#64748B] font-semibold block mb-2">
                  {pageT.servicesProvided}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {services.map((s: string, i: number) => (
                    <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/6 text-[10px] text-[#B0B8C4]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {tools.length > 0 && (
              <div>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#64748B] font-semibold block mb-2">
                  {pageT.toolsUsed}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tools.map((tool: string, i: number) => (
                    <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/6 text-[10px] text-[#B0B8C4] font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </MotionSection>

      {/* ── 5. Gallery ── */}
      {project.images && project.images.length > 0 && (
        <MotionSection className="mb-12 pt-8 border-t border-white/6">
          <ProjectGalleryLightbox images={project.images} />
        </MotionSection>
      )}

      {/* ── 6. Prev / Next ── */}
      <MotionSection className="pt-8 border-t border-white/6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevProject ? (
          <Link
            href={`/portfolio/${prevProject.slug}`}
            className="p-4 rounded-xl border border-white/6 bg-[#0D0F12]/60 hover:border-[#00C3FF]/30 transition-all group flex items-center gap-3"
          >
            {dir === "rtl" ? (
              <ChevronRight className="w-4 h-4 text-[#00C3FF] group-hover:translate-x-0.5 transition-transform shrink-0" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-[#00C3FF] group-hover:-translate-x-0.5 transition-transform shrink-0" />
            )}
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#64748B] block">{pageT.prevProject}</span>
              <span className="text-sm font-semibold text-white group-hover:text-[#00C3FF] transition-colors">
                {isFa && prevProject.title_fa ? prevProject.title_fa : prevProject.title}
              </span>
            </div>
          </Link>
        ) : <div />}

        {nextProject && (
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="p-4 rounded-xl border border-white/6 bg-[#0D0F12]/60 hover:border-[#00C3FF]/30 transition-all group flex items-center justify-between gap-3 text-right rtl:text-left"
          >
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#64748B] block">{pageT.nextProject}</span>
              <span className="text-sm font-semibold text-white group-hover:text-[#00C3FF] transition-colors">
                {isFa && nextProject.title_fa ? nextProject.title_fa : nextProject.title}
              </span>
            </div>
            {dir === "rtl" ? (
              <ChevronLeft className="w-4 h-4 text-[#00C3FF] group-hover:-translate-x-0.5 transition-transform shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 text-[#00C3FF] group-hover:translate-x-0.5 transition-transform shrink-0" />
            )}
          </Link>
        )}
      </MotionSection>
    </article>
  );
}
