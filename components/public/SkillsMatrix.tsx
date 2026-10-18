"use client";

import React from "react";
import { Layers, Code, Wrench, Bot } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface SkillItem {
  id: string;
  name: string;
  name_fa?: string | null;
  category: string;
  category_fa?: string | null;
  level?: string | null;
}

interface SkillsMatrixProps {
  designSkills: SkillItem[];
  webSkills: SkillItem[];
  techSkills: SkillItem[];
  aiSkills: SkillItem[];
}

export default function SkillsMatrix({
  designSkills,
  webSkills,
  techSkills,
  aiSkills,
}: SkillsMatrixProps) {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const categories = [
    {
      title: isFa ? "طراحی بصری و رابط کاربری" : "Design & UI",
      icon: Layers,
      skills: designSkills,
    },
    {
      title: isFa ? "توسعه وب و فرانت‌اند" : "Web Development",
      icon: Code,
      skills: webSkills,
    },
    {
      title: isFa ? "تکنالوژی و سیستم‌ها" : "Technology & IT",
      icon: Wrench,
      skills: techSkills,
    },
    {
      title: isFa ? "هوش مصنوعی و تکنالوژی عصری" : "AI & Modern Tech",
      icon: Bot,
      skills: aiSkills,
    },
  ];

  const totalSkills = designSkills.length + webSkills.length + techSkills.length + aiSkills.length;
  if (totalSkills === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-[rgba(255,255,255,0.08)] rounded-2xl">
        <p className="text-[#94A3B8] text-xs">
          {isFa ? "مهارتی برای نمایش ثبت نشده است." : "No skills added yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((cat) => {
        const Icon = cat.icon;
        if (cat.skills.length === 0) return null;

        return (
          <div
            key={cat.title}
            className="p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0D0F12]/80 space-y-4 hover:border-[rgba(255,255,255,0.2)] hover:bg-[#0D0F12] transition-all duration-200 select-none"
          >
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-7 h-7 rounded-lg bg-[#00C3FF]/10 border border-[#00C3FF]/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-[#00C3FF]" />
              </div>
              <h3 className="mono-tag text-xs font-semibold text-[#F8FAFC] leading-none">
                {cat.title}
              </h3>
            </div>

            <div className="space-y-2 pt-1">
              {cat.skills.map((s) => {
                const displayName = isFa && s.name_fa ? s.name_fa : s.name;
                return (
                  <div
                    key={s.id}
                    className="text-xs text-[#CBD5E1] font-normal flex items-center justify-between group/skill hover:text-white transition-all duration-150 py-0.5"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.2)] shrink-0 group-hover/skill:bg-[#00C3FF] group-hover/skill:scale-125 group-hover/skill:shadow-[0_0_8px_#00C3FF] transition-all duration-150" />
                      <span className="leading-none">{displayName}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}