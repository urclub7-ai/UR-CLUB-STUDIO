"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  X,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface TeamMemberItem {
  id: string;
  name: string;
  name_fa: string;
  nickname?: string | null;
  role: string;
  role_fa: string;
  bio?: string | null;
  bio_fa?: string | null;
  location?: string | null;
  location_fa?: string | null;
  age?: string | null;
  avatar?: string | null;
  skills?: string | null;
  skills_fa?: string | null;
  displayOrder?: number;
  active?: boolean;
}

interface TeamMembersSectionProps {
  initialMembers?: TeamMemberItem[];
}

export default function TeamMembersSection({
  initialMembers = [],
}: TeamMembersSectionProps) {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const [selectedMember, setSelectedMember] = useState<TeamMemberItem | null>(null);

  const members = (initialMembers.length > 0 ? initialMembers : []).filter(
    (m) => m.active !== false
  );

  return (
    <div id="team-members" className="relative w-full scroll-mt-28">
      {/* ─── Clean Header matching other site sections ─── */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {isFa
            ? "اعضای تیم و مهندسان سازنده استودیو"
            : "The Specialists Behind UR CLUB"}
        </h2>
        <p className="mt-2.5 text-xs sm:text-base text-[#94A3B8] leading-relaxed">
          {isFa
            ? "دسترسی مستقیم به معماران سیستم، ارتباط با مشتریان و تعهدات اجرایی و قراردادی استودیو."
            : "Direct access to system architects, client communications, and executive contract commitments."}
        </p>
      </div>

      {/* ─── 3-Column Team Grid (Clean & Minimalist) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {members.map((member, idx) => {
          const name = isFa ? member.name_fa || member.name : member.name;
          const role = isFa ? member.role_fa || member.role : member.role;
          const bio = isFa ? member.bio_fa || member.bio : member.bio;
          const skillsList = (isFa ? member.skills_fa || member.skills : member.skills)
            ? (isFa ? member.skills_fa || member.skills : member.skills)!
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [];

          const avatarUrl = member.avatar || "/images/default_avatar.png";

          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="group relative rounded-2xl bg-[#081432]/60 hover:bg-[#081432]/95 border border-white/[0.08] hover:border-[#00D2FF]/40 p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(0,210,255,0.18)]"
            >
              {/* Subtle top cyan highlight line on hover */}
              <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4">
                {/* Top Row: Avatar & Name */}
                <div className="flex items-start gap-4">
                  {/* Clickable Avatar to open modal */}
                  <button
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    title={isFa ? "مشاهده پروفایل و بیوگرافی کامل" : "View full profile and bio"}
                    className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border border-[#00D2FF]/30 hover:border-[#00D2FF] group/avatar transition-all shrink-0 bg-[#040B20] shadow-[0_0_15px_rgba(0,210,255,0.15)] hover:shadow-[0_0_25px_rgba(0,210,255,0.4)] cursor-pointer text-left rtl:text-right"
                  >
                    <Image
                      src={avatarUrl}
                      alt={name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover/avatar:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#00D2FF]/0 group-hover/avatar:bg-[#00D2FF]/15 transition-colors" />
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setSelectedMember(member)}
                        className="text-left rtl:text-right cursor-pointer"
                      >
                        <h3 className="text-base sm:text-lg font-bold text-white hover:text-[#00D2FF] transition-colors truncate">
                          {name}
                        </h3>
                      </button>
                      {member.nickname && (
                        <span className="px-2 py-0.5 rounded-md bg-[#00D2FF]/15 text-[#00D2FF] text-[10px] sm:text-[11px] font-mono font-extrabold tracking-wider border border-[#00D2FF]/30 select-none uppercase">
                          {member.nickname}
                        </span>
                      )}
                    </div>

                    <div className="text-xs sm:text-[13px] text-[#00D2FF] font-medium mt-1 leading-snug">
                      {role}
                    </div>
                  </div>
                </div>

                {/* Bio paragraph with clean truncation */}
                {bio && (
                  <p className="text-xs sm:text-[12.5px] text-[#94A3B8] leading-relaxed line-clamp-3">
                    {bio}
                  </p>
                )}

                {/* Skills tags */}
                {skillsList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skillsList.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10.5px] font-medium text-[#CBD5E1]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Row Action - Simple & Clean */}
              <div className="pt-4 mt-5 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedMember(member)}
                  className="text-xs font-semibold text-[#00D2FF] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{isFa ? "مشاهده بیوگرافی کامل" : "Full Profile & Bio"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-[10px] font-mono tracking-widest text-[#94A3B8]/40 uppercase select-none">
                  UR CLUB
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Detail Modal (Full Bio & Info) ─── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-50 bg-[#040B20]/90 backdrop-blur-xl p-4 sm:p-6 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-3xl border border-[#00D2FF]/35 bg-[#060D24] p-6 sm:p-9 shadow-[0_0_60px_rgba(0,210,255,0.2)] overflow-hidden my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 sm:top-6 left-4 sm:left-6 rtl:left-4 rtl:right-auto ltr:right-4 ltr:left-auto p-2.5 rounded-full bg-white/[0.06] text-[#94A3B8] hover:text-white hover:bg-[#00D2FF]/20 transition-all cursor-pointer border border-white/[0.08]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top Profile Header with Large High-Res Photo */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-7 pt-2">
                {/* Large, Beautiful Portrait Image Frame */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-[#00D2FF] shrink-0 bg-[#040B20] shadow-[0_0_30px_rgba(0,210,255,0.35)] ring-4 ring-[#00D2FF]/15">
                  <Image
                    src={selectedMember.avatar || "/images/default_avatar.png"}
                    alt={selectedMember.name}
                    fill
                    sizes="200px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Name, Role & Status Info */}
                <div className="flex-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left min-w-0">
                  <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {isFa ? selectedMember.name_fa || selectedMember.name : selectedMember.name}
                    </h3>
                    {selectedMember.nickname && (
                      <span className="px-3 py-1 rounded-lg bg-[#00D2FF]/20 text-[#00D2FF] text-xs sm:text-sm font-mono font-extrabold tracking-wider border border-[#00D2FF]/40 uppercase shadow-[0_0_12px_rgba(0,210,255,0.25)]">
                        {selectedMember.nickname}
                      </span>
                    )}
                  </div>

                  <div className="text-sm sm:text-base text-[#00D2FF] font-semibold mt-2 leading-relaxed">
                    {isFa ? selectedMember.role_fa || selectedMember.role : selectedMember.role}
                  </div>

                  <div className="mt-3.5 flex items-center justify-center sm:justify-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-400 font-medium">
                      {isFa ? "عضو رسمی هسته مهندسی UR CLUB" : "Official UR CLUB Core Specialist"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Gradient Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00D2FF]/30 to-transparent my-6" />

              {/* Bio & Skills Body */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-[#00D2FF] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                    <span>{isFa ? "شرح کامل مسئولیت‌ها و تخصص" : "Overview & Professional Scope"}</span>
                  </h4>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed sm:leading-loose whitespace-pre-line font-normal">
                      {isFa
                        ? selectedMember.bio_fa || selectedMember.bio
                        : selectedMember.bio || selectedMember.bio_fa}
                    </p>
                  </div>
                </div>

                {((isFa ? selectedMember.skills_fa || selectedMember.skills : selectedMember.skills) || "").trim() && (
                  <div>
                    <h4 className="text-xs font-bold text-[#00D2FF] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                      <span>{isFa ? "مهارت‌های فنی و حوزه‌های تخصصی" : "Core Competencies & Stack"}</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(isFa ? selectedMember.skills_fa || selectedMember.skills : selectedMember.skills)!
                        .split(",")
                        .map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-3 py-1.5 rounded-lg bg-[#00D2FF]/10 border border-[#00D2FF]/25 text-xs font-medium text-cyan-200 shadow-[0_0_10px_rgba(0,210,255,0.08)]"
                          >
                            {s.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {/* Action Footer */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.08]">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 font-medium text-xs transition-colors cursor-pointer"
                  >
                    {isFa ? "بستن کادر" : "Close"}
                  </button>

                  <Link
                    href="/#contact-section"
                    onClick={() => setSelectedMember(null)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] cursor-pointer"
                  >
                    <span>{isFa ? "ارتباط و ثبت درخواست همکاری" : "Connect With Specialist"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
