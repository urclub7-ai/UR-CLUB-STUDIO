"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ProjectCard, { type ProjectCardProps } from "./ProjectCard";
import { EDITORIAL_EASE } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n";

interface PortfolioGridProps {
  projects: ProjectCardProps[];
  categories?: string[];
  showFilter?: boolean;
}

export default function PortfolioGrid({
  projects,
  categories = ["All", "Branding", "Packaging", "Poster", "Editorial", "UI/UX", "Typography"],
  showFilter = true,
}: PortfolioGridProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="w-full">
      {/* Category Filter Tabs */}
      {showFilter && (
        <div className="flex flex-wrap items-center gap-2 pb-10 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
            const displayLabel = cat.toLowerCase() === "all" ? t.portfolioPage.allCategory : cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative mono-tag text-xs px-4 py-2 rounded-xl border transition-all select-none cursor-pointer ${
                  isActive
                    ? "text-[#040B20] font-bold border-[#00D2FF] bg-[#00D2FF] shadow-[0_0_12px_rgba(0,210,255,0.4)]"
                    : "bg-[#081432] text-[#CBD5E1] border-[#00D2FF]/20 hover:text-white hover:border-[#00D2FF]/50"
                }`}
              >
                <span className="relative z-10">{displayLabel}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Projects Grid */}
      <motion.div
        layout
        transition={{ duration: 0.4, ease: EDITORIAL_EASE }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 min-h-[300px]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} index={idx} {...project} />
            ))
          ) : (
            <div className="text-center py-20 border border-dashed border-[rgba(255,255,255,0.1)] rounded-2xl col-span-full w-full">
              <p className="text-[#94A3B8] text-sm">{t.portfolioPage.emptyNotice}</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
