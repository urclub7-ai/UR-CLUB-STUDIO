"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  X,
  ZoomIn,
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
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);

  const members = (initialMembers.length > 0 ? initialMembers : []).filter(
    (m) => m.active !== false
  );

  return (
    <div id="team-members" className="relative w-full scroll-mt-28">
      {/* ─── Clean Header matching other site sections ─── */}
      <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isFa
            ? "اعضای تیم و مهندسان سازنده استودیو"
            : "The Specialists Behind UR CLUB"}
        </h2>
        <p className="mt-2.5 text-xs sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
          {isFa
            ? "دسترسی مستقیم به معماران سیستم، ارتباط با مشتریان و تعهدات اجرایی و قراردادی استودیو."
            : "Direct access to system architects, client communications, and executive contract commitments."}
        </p>
      </div>

      {/* ─── Mobile Compact Stacked Rows ─── */}
      <div className="block sm:hidden space-y-2">
        {members.map((member, idx) => {
          const name = isFa ? member.name_fa || member.name : member.name;
          const role = isFa ? member.role_fa || member.role : member.role;
          const avatarUrl = member.avatar || "/images/default_avatar.png";

          return (
            <motion.div
              key={`mobile-${member.id}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.25 }}
              onClick={() => {
                setSelectedMember(member);
                setIsPhotoZoomed(false);
              }}
              className="group relative p-2.5 rounded-xl bg-white dark:bg-[#081432]/60 active:bg-slate-100 dark:active:bg-[#081432]/95 border border-slate-200/80 dark:border-white/[0.08] active:border-sky-500/60 dark:active:border-[#00D2FF]/60 shadow-sm dark:shadow-none flex items-center justify-between gap-3 cursor-pointer select-none transition-all duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Compact Avatar */}
                <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-sky-300 dark:border-[#00D2FF]/30 shrink-0 bg-slate-100 dark:bg-[#040B20]">
                  <Image
                    src={avatarUrl}
                    alt={name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>

                {/* Name & Role */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-[#00D2FF] transition-colors truncate">
                      {name}
                    </span>
                    {member.nickname && (
                      <span className="px-1.5 py-0.2 rounded bg-sky-50 dark:bg-[#00D2FF]/15 text-sky-700 dark:text-[#00D2FF] text-[9.5px] font-mono font-extrabold tracking-wider border border-sky-200 dark:border-[#00D2FF]/30 uppercase">
                        {member.nickname}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-sky-600 dark:text-[#00D2FF] font-medium truncate mt-0.5 leading-tight">
                    {role}
                  </p>
                </div>
              </div>

              {/* Action indicator pill */}
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-[#94A3B8] shrink-0 bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/[0.06]">
                <span>{isFa ? "مشاهده" : "View"}</span>
                <ArrowUpRight className="w-3 h-3 text-sky-600 dark:text-[#00D2FF]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Desktop Team Layout ─── */}
      <div className="hidden sm:flex flex-wrap justify-center gap-5 sm:gap-6 items-stretch">
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
              onClick={() => {
                setSelectedMember(member);
                setIsPhotoZoomed(false);
              }}
              title={isFa ? "برای مشاهده بیوگرافی و پروفایل کلیک کنید" : "Click to view full bio and profile"}
              className={`group relative rounded-2xl bg-white dark:bg-[#081432]/60 hover:bg-slate-50 dark:hover:bg-[#081432]/95 border border-slate-200/80 dark:border-white/[0.08] hover:border-sky-500/40 dark:hover:border-[#00D2FF]/60 p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 overflow-hidden shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-md dark:hover:shadow-[0_0_35px_rgba(0,210,255,0.25)] cursor-pointer select-none w-full sm:w-[calc(50%-12px)] ${members.length === 4 ? "lg:w-[calc(25%-18px)]" : "lg:w-[calc(33.333%-16px)]"}`}
            >
              {/* Subtle top highlight line on hover */}
              <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/40 dark:via-[#00D2FF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4">
                {/* Top Row: Avatar & Name */}
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border border-sky-300 dark:border-[#00D2FF]/30 group-hover:border-sky-500 dark:group-hover:border-[#00D2FF] transition-all shrink-0 bg-slate-100 dark:bg-[#040B20] shadow-sm dark:shadow-[0_0_15px_rgba(0,210,255,0.15)]">
                    <Image
                      src={avatarUrl}
                      alt={name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-108"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-[#00D2FF] transition-colors truncate">
                        {name}
                      </h3>
                      {member.nickname && (
                        <span className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-[#00D2FF]/15 text-sky-700 dark:text-[#00D2FF] text-[10px] sm:text-[11px] font-mono font-extrabold tracking-wider border border-sky-200 dark:border-[#00D2FF]/30 uppercase">
                          {member.nickname}
                        </span>
                      )}
                    </div>

                    <div className="text-xs sm:text-[13px] text-sky-600 dark:text-[#00D2FF] font-medium mt-1 leading-snug">
                      {role}
                    </div>
                  </div>
                </div>

                {/* Bio paragraph with clean truncation */}
                {bio && (
                  <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-[#94A3B8] leading-relaxed line-clamp-3">
                    {bio}
                  </p>
                )}

                {/* Skills tags */}
                {skillsList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skillsList.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] text-[10.5px] font-medium text-slate-700 dark:text-[#CBD5E1]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Row Action - Simple & Clean */}
              <div className="pt-4 mt-5 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between">
                <div className="text-xs font-semibold text-sky-600 dark:text-[#00D2FF] group-hover:text-slate-900 dark:group-hover:text-white flex items-center gap-1.5 transition-colors">
                  <span>{isFa ? "مشاهده بیوگرافی کامل" : "Full Profile & Bio"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-[#94A3B8]/40 uppercase">
                  UR CLUB
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Detail Modal (Full Bio & Large Profile Image) ─── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedMember(null);
              setIsPhotoZoomed(false);
            }}
            className="fixed inset-0 z-50 bg-black/60 dark:bg-[#040B20]/90 backdrop-blur-xl p-4 sm:p-6 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-3xl border border-slate-200 dark:border-[#00D2FF]/35 bg-white dark:bg-[#060D24] p-6 sm:p-9 shadow-2xl dark:shadow-[0_0_60px_rgba(0,210,255,0.2)] overflow-hidden my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedMember(null);
                  setIsPhotoZoomed(false);
                }}
                className="absolute top-4 sm:top-6 left-4 sm:left-6 rtl:left-4 rtl:right-auto ltr:right-4 ltr:left-auto p-2.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#00D2FF]/20 transition-all cursor-pointer border border-slate-200 dark:border-white/[0.08] z-10"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top Profile Header with Large High-Res Photo */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-7 pt-2">
                {/* Large, Beautiful Portrait Image Frame (Clickable to zoom) */}
                <div
                  onClick={() => setIsPhotoZoomed(true)}
                  title={isFa ? "کلیک برای مشاهده اندازه بزرگ تصویر" : "Click to view full photo"}
                  className="group/avatar relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-sky-500 dark:border-[#00D2FF] shrink-0 bg-slate-100 dark:bg-[#040B20] shadow-md dark:shadow-[0_0_30px_rgba(0,210,255,0.35)] ring-4 ring-sky-500/10 dark:ring-[#00D2FF]/15 cursor-pointer"
                >
                  <Image
                    src={selectedMember.avatar || "/images/default_avatar.png"}
                    alt={selectedMember.name}
                    fill
                    sizes="220px"
                    className="object-cover transition-transform duration-300 group-hover/avatar:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-[#040B20]/0 group-hover/avatar:bg-[#040B20]/40 transition-colors flex items-center justify-center opacity-0 group-hover/avatar:opacity-100">
                    <div className="p-2 rounded-full bg-[#00D2FF] text-[#040B20] shadow-lg">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Name, Role & Status Info */}
                <div className="flex-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left min-w-0">
                  <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {isFa ? selectedMember.name_fa || selectedMember.name : selectedMember.name}
                    </h3>
                    {selectedMember.nickname && (
                      <span className="px-3 py-1 rounded-lg bg-sky-50 dark:bg-[#00D2FF]/20 text-sky-600 dark:text-[#00D2FF] text-xs sm:text-sm font-mono font-extrabold tracking-wider border border-sky-200 dark:border-[#00D2FF]/40 uppercase shadow-sm dark:shadow-[0_0_12px_rgba(0,210,255,0.25)]">
                        {selectedMember.nickname}
                      </span>
                    )}
                  </div>

                  <div className="text-sm sm:text-base text-sky-600 dark:text-[#00D2FF] font-semibold mt-2 leading-relaxed">
                    {isFa ? selectedMember.role_fa || selectedMember.role : selectedMember.role}
                  </div>

                  <div className="mt-3.5 flex items-center justify-center sm:justify-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                      {isFa ? "عضو رسمی هسته مهندسی UR CLUB" : "Official UR CLUB Core Specialist"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Gradient Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-[#00D2FF]/30 to-transparent my-6" />

              {/* Bio & Skills Body */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-sky-600 dark:text-[#00D2FF] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-[#00D2FF]" />
                    <span>{isFa ? "شرح کامل مسئولیت‌ها و تخصص" : "Overview & Professional Scope"}</span>
                  </h4>
                  <div className="rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-200 leading-relaxed sm:leading-loose whitespace-pre-line font-normal">
                      {isFa
                        ? selectedMember.bio_fa || selectedMember.bio
                        : selectedMember.bio || selectedMember.bio_fa}
                    </p>
                  </div>
                </div>

                {((isFa ? selectedMember.skills_fa || selectedMember.skills : selectedMember.skills) || "").trim() && (
                  <div>
                    <h4 className="text-xs font-bold text-sky-600 dark:text-[#00D2FF] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-[#00D2FF]" />
                      <span>{isFa ? "مهارت‌های فنی و حوزه‌های تخصصی" : "Core Competencies & Stack"}</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(isFa ? selectedMember.skills_fa || selectedMember.skills : selectedMember.skills)!
                        .split(",")
                        .map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-[#00D2FF]/10 border border-sky-200 dark:border-[#00D2FF]/25 text-xs font-medium text-sky-700 dark:text-cyan-200 shadow-sm dark:shadow-[0_0_10px_rgba(0,210,255,0.08)]"
                          >
                            {s.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {/* Action Footer */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-white/[0.08]">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-zinc-300 font-medium text-xs transition-colors cursor-pointer"
                  >
                    {isFa ? "بستن کادر" : "Close"}
                  </button>

                  <Link
                    href="/#contact-section"
                    onClick={() => setSelectedMember(null)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-500 dark:bg-[#00D2FF] hover:bg-sky-600 dark:hover:bg-[#38bdf8] text-white dark:text-[#040B20] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md dark:shadow-[0_0_20px_rgba(0,210,255,0.3)] cursor-pointer"
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

      {/* ─── Fullscreen Photo Zoom Lightbox ─── */}
      <AnimatePresence>
        {isPhotoZoomed && selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPhotoZoomed(false)}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl p-4 flex flex-col items-center justify-center cursor-zoom-out"
          >
            <button
              onClick={() => setIsPhotoZoomed(false)}
              className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              aria-label="Close photo"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-lg w-full aspect-square rounded-3xl overflow-hidden border-2 border-[#00D2FF]/50 shadow-[0_0_50px_rgba(0,210,255,0.4)]"
            >
              <Image
                src={selectedMember.avatar || "/images/default_avatar.png"}
                alt={selectedMember.name}
                fill
                sizes="500px"
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-white">
                {isFa ? selectedMember.name_fa || selectedMember.name : selectedMember.name}
              </h3>
              <p className="text-xs text-[#00D2FF] mt-0.5">
                {isFa ? selectedMember.role_fa || selectedMember.role : selectedMember.role}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
