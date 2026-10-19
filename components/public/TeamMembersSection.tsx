"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  MessageCircle,
  Code2,
  Briefcase,
  ChevronDown,
  X,
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
      {/* ─── Clean Header matching HexaCore aesthetic ─── */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/25 text-[11px] font-mono font-bold text-[#00D2FF] uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isFa ? "اعضای تیم UR CLUB" : "UR CLUB Core Team"}</span>
        </span>

        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {isFa
            ? "متخصصان و مهندسان سازنده استودیو"
            : "The Specialists Behind UR CLUB"}
        </h2>
        <p className="mt-2.5 text-xs sm:text-base text-[#94A3B8] leading-relaxed">
          {isFa
            ? "تیم مستقر در آلمان؛ دسترسی مستقیم به معماران سیستم، روابط مشتریان و تعهدات اجرایی حضوری در سراسر اروپا."
            : "Based in Germany; direct access to system architects, client operations, and in-person contract guarantees."}
        </p>
      </div>

      {/* ─── 3-Column Team Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {members.map((member, idx) => {
          const name = isFa ? member.name_fa || member.name : member.name;
          const role = isFa ? member.role_fa || member.role : member.role;
          const bio = isFa ? member.bio_fa || member.bio : member.bio;
          const location = isFa
            ? member.location_fa || member.location || "آلمان"
            : member.location || "Germany";
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
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-[#00D2FF]/30 group-hover:border-[#00D2FF] transition-all shrink-0 bg-[#040B20] shadow-[0_0_15px_rgba(0,210,255,0.15)]">
                    <Image
                      src={avatarUrl}
                      alt={name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00D2FF] transition-colors truncate">
                        {name}
                      </h3>
                      {member.nickname && (
                        <span className="px-2 py-0.5 rounded-md bg-[#00D2FF]/15 text-[#00D2FF] text-[10px] sm:text-[11px] font-mono font-bold border border-[#00D2FF]/30 select-none">
                          {member.nickname}
                        </span>
                      )}
                    </div>

                    <div className="text-xs sm:text-[13px] text-[#00D2FF] font-medium mt-1 leading-snug">
                      {role}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-[#94A3B8] mt-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#00D2FF]" />
                        <span>{location}</span>
                      </span>
                      {member.age && (
                        <span className="font-mono">
                          {isFa ? `${member.age} ساله` : `${member.age} yrs`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio paragraph with clean truncation */}
                {bio && (
                  <p className="text-xs sm:text-[12.5px] text-[#94A3B8] leading-relaxed line-clamp-4">
                    {bio}
                  </p>
                )}

                {/* Skills tags */}
                {skillsList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
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

              {/* Bottom Row Action */}
              <div className="pt-4 mt-5 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedMember(member)}
                  className="text-xs font-semibold text-[#00D2FF] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{isFa ? "مشاهده بیوگرافی کامل" : "Full Profile & Bio"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {member.id === "member-2" ? (
                  <Link
                    href="/#contact-section"
                    className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title={isFa ? "ارتباط مستقیم با پشتیبانی" : "Direct Contact Channel"}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{isFa ? "پشتیبانی" : "Support"}</span>
                  </Link>
                ) : member.id === "member-3" ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/25">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{isFa ? "ضمانت در آلمان" : "Germany Verified"}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#00D2FF] bg-[#00D2FF]/10 px-2 py-0.5 rounded border border-[#00D2FF]/25">
                    <Code2 className="w-3 h-3" />
                    <span>{isFa ? "رهبر تیم" : "Team Lead"}</span>
                  </span>
                )}
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-2xl border border-[#00D2FF]/30 bg-[#081432] p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 sm:top-5 left-4 sm:left-5 rtl:left-4 rtl:right-auto ltr:right-4 ltr:left-auto p-2 rounded-full bg-[#040B20] text-[#94A3B8] hover:text-white hover:bg-[#00D2FF]/20 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#00D2FF] shrink-0 bg-[#040B20] shadow-[0_0_20px_rgba(0,210,255,0.3)]">
                  <Image
                    src={selectedMember.avatar || "/images/default_avatar.png"}
                    alt={selectedMember.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {isFa ? selectedMember.name_fa || selectedMember.name : selectedMember.name}
                    </h3>
                    {selectedMember.nickname && (
                      <span className="px-2 py-0.5 rounded-md bg-[#00D2FF]/15 text-[#00D2FF] text-xs font-mono font-bold border border-[#00D2FF]/30">
                        {selectedMember.nickname}
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-[#00D2FF] font-medium mt-1">
                    {isFa ? selectedMember.role_fa || selectedMember.role : selectedMember.role}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#94A3B8] mt-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00D2FF]" />
                      <span>{isFa ? selectedMember.location_fa || "آلمان" : selectedMember.location || "Germany"}</span>
                    </span>
                    {selectedMember.age && (
                      <span className="font-mono">
                        {isFa ? `${selectedMember.age} ساله` : `${selectedMember.age} yrs old`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                <div>
                  <h4 className="text-xs font-bold text-[#00D2FF] uppercase tracking-wider mb-2">
                    {isFa ? "شرح کامل تجربیات و فعالیت‌ها" : "Detailed Background & Responsibilities"}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed whitespace-pre-line">
                    {isFa
                      ? selectedMember.bio_fa || selectedMember.bio
                      : selectedMember.bio || selectedMember.bio_fa}
                  </p>
                </div>

                {((isFa ? selectedMember.skills_fa || selectedMember.skills : selectedMember.skills) || "").trim() && (
                  <div>
                    <h4 className="text-xs font-bold text-[#00D2FF] uppercase tracking-wider mb-2">
                      {isFa ? "حوزه‌های تخصصی و مهارت‌ها" : "Key Disciplines & Core Skills"}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(isFa ? selectedMember.skills_fa || selectedMember.skills : selectedMember.skills)!
                        .split(",")
                        .map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs text-[#CBD5E1]"
                          >
                            {s.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <Link
                    href="/#contact-section"
                    onClick={() => setSelectedMember(null)}
                    className="px-5 py-2.5 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,210,255,0.25)] cursor-pointer"
                  >
                    <span>{isFa ? "تماس و ارتباط با تیم" : "Contact the Team"}</span>
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
