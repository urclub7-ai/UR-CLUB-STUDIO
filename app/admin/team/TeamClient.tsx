"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  MapPin,
  Sparkles,
  User,
} from "lucide-react";
import {
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  toggleTeamMemberActive,
} from "@/lib/actions/team-actions";

export interface TeamMemberItem {
  id: string;
  name: string;
  name_fa: string;
  nickname?: string | null;
  role: string;
  role_fa: string;
  location?: string | null;
  location_fa?: string | null;
  age?: string | null;
  avatar?: string | null;
  bio?: string | null;
  bio_fa?: string | null;
  skills?: string | null;
  skills_fa?: string | null;
  displayOrder?: number;
  active?: boolean;
}

interface TeamClientProps {
  initialMembers: TeamMemberItem[];
}

export default function TeamClient({ initialMembers }: TeamClientProps) {
  const [members, setMembers] = useState<TeamMemberItem[]>(initialMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [nameFa, setNameFa] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nickname, setNickname] = useState("");
  const [roleFa, setRoleFa] = useState("");
  const [roleEn, setRoleEn] = useState("");
  const [locationFa, setLocationFa] = useState("آلمان");
  const [locationEn, setLocationEn] = useState("Germany");
  const [age, setAge] = useState("");
  const [avatar, setAvatar] = useState("/images/default_avatar.png");
  const [bioFa, setBioFa] = useState("");
  const [bioEn, setBioEn] = useState("");
  const [skillsFa, setSkillsFa] = useState("");
  const [skillsEn, setSkillsEn] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [active, setActive] = useState(true);

  // Uploading state
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openCreateModal = () => {
    setEditingMember(null);
    setNameFa("");
    setNameEn("");
    setNickname("");
    setRoleFa("");
    setRoleEn("");
    setLocationFa("آلمان");
    setLocationEn("Germany");
    setAge("");
    setAvatar("/images/default_avatar.png");
    setBioFa("");
    setBioEn("");
    setSkillsFa("");
    setSkillsEn("");
    setDisplayOrder(members.length + 1);
    setActive(true);
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: TeamMemberItem) => {
    setEditingMember(item);
    setNameFa(item.name_fa || item.name || "");
    setNameEn(item.name || "");
    setNickname(item.nickname || "");
    setRoleFa(item.role_fa || item.role || "");
    setRoleEn(item.role || "");
    setLocationFa(item.location_fa || "آلمان");
    setLocationEn(item.location || "Germany");
    setAge(item.age || "");
    setAvatar(item.avatar || "/images/default_avatar.png");
    setBioFa(item.bio_fa || "");
    setBioEn(item.bio || "");
    setSkillsFa(item.skills_fa || "");
    setSkillsEn(item.skills || "");
    setDisplayOrder(item.displayOrder || 0);
    setActive(item.active !== false);
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatusMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "profile");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setAvatar(data.url);
        setStatusMessage({ type: "success", text: "تصویر با موفقیت آپلود شد." });
      } else {
        setStatusMessage({ type: "error", text: data.message || "خطا در آپلود تصویر" });
      }
    } catch {
      setStatusMessage({ type: "error", text: "خطا در ارسال تصویر به سرور" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameFa.trim() && !nameEn.trim()) {
      setStatusMessage({ type: "error", text: "نام عضو تیم الزامی است." });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("name", nameEn.trim() || nameFa.trim());
    formData.append("name_fa", nameFa.trim() || nameEn.trim());
    formData.append("nickname", nickname.trim());
    formData.append("role", roleEn.trim() || roleFa.trim());
    formData.append("role_fa", roleFa.trim() || roleEn.trim());
    formData.append("location", locationEn.trim() || "Germany");
    formData.append("location_fa", locationFa.trim() || "آلمان");
    formData.append("age", age.trim());
    formData.append("avatar", avatar.trim() || "/images/default_avatar.png");
    formData.append("bio", bioEn.trim());
    formData.append("bio_fa", bioFa.trim());
    formData.append("skills", skillsEn.trim());
    formData.append("skills_fa", skillsFa.trim());
    formData.append("displayOrder", displayOrder.toString());
    formData.append("active", active ? "true" : "false");

    try {
      if (editingMember) {
        const res = await updateTeamMember(editingMember.id, formData);
        if (res.success) {
          setMembers((prev) =>
            prev.map((m) =>
              m.id === editingMember.id
                ? {
                    ...m,
                    name: nameEn.trim() || nameFa.trim(),
                    name_fa: nameFa.trim() || nameEn.trim(),
                    nickname: nickname.trim() || null,
                    role: roleEn.trim() || roleFa.trim(),
                    role_fa: roleFa.trim() || roleEn.trim(),
                    location: locationEn.trim() || "Germany",
                    location_fa: locationFa.trim() || "آلمان",
                    age: age.trim() || null,
                    avatar: avatar.trim() || "/images/default_avatar.png",
                    bio: bioEn.trim(),
                    bio_fa: bioFa.trim(),
                    skills: skillsEn.trim(),
                    skills_fa: skillsFa.trim(),
                    displayOrder,
                    active,
                  }
                : m
            )
          );
          setIsModalOpen(false);
        } else {
          setStatusMessage({ type: "error", text: res.error || "خطا در ویرایش عضو تیم." });
        }
      } else {
        const res = await createTeamMember(formData);
        if (res.success && res.member) {
          setMembers((prev) => [...prev, res.member]);
          setIsModalOpen(false);
        } else {
          setStatusMessage({ type: "error", text: res.error || "خطا در افزودن عضو تیم." });
        }
      }
    } catch {
      setStatusMessage({ type: "error", text: "خطایی غیرمنتظره رخ داد." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`آیا از حذف "${name}" از اعضای تیم اطمینان دارید؟`)) return;

    try {
      const res = await deleteTeamMember(id);
      if (res.success) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert("خطا در حذف عضو تیم: " + res.error);
      }
    } catch {
      alert("خطا در برقراری ارتباط با سرور");
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const res = await toggleTeamMemberActive(id);
      if (res.success) {
        setMembers((prev) =>
          prev.map((m) => (m.id === id ? { ...m, active: res.active } : m))
        );
      }
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00D2FF] mb-1">
            <Users className="w-4 h-4" />
            <span>UR CLUB TEAM MANAGEMENT</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            مدیریت اعضای تیم و پروفایل‌ها
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            افزودن، ویرایش مشخصات، آپلود عکس پروفایل و مدیریت نمایش اعضای استودیو UR CLUB.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن عضو جدید</span>
        </button>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {members.map((member) => (
          <div
            key={member.id}
            className={`p-5 rounded-2xl bg-[#081432]/60 border transition-all duration-300 flex flex-col justify-between ${
              member.active
                ? "border-white/[0.08] hover:border-[#00D2FF]/40"
                : "border-white/[0.04] opacity-60"
            }`}
          >
            <div>
              <div className="flex items-start gap-3.5 mb-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[#00D2FF]/30 shrink-0 bg-[#040B20]">
                  <Image
                    src={member.avatar || "/images/default_avatar.png"}
                    alt={member.name_fa || member.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-white truncate">
                      {member.name_fa || member.name}
                    </h3>
                    {member.nickname && (
                      <span className="px-1.5 py-0.5 rounded bg-[#00D2FF]/15 text-[#00D2FF] text-[10px] font-mono font-bold border border-[#00D2FF]/30">
                        {member.nickname}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#00D2FF] font-medium mt-0.5 truncate">
                    {member.role_fa || member.role}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] mt-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#00D2FF]" />
                      <span>{member.location_fa || "آلمان"}</span>
                    </span>
                    {member.age && <span>• {member.age} ساله</span>}
                  </div>
                </div>
              </div>

              {member.bio_fa && (
                <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3 mb-3">
                  {member.bio_fa}
                </p>
              )}

              {member.skills_fa && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {member.skills_fa
                    .split(",")
                    .slice(0, 4)
                    .map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] text-[#CBD5E1]"
                      >
                        {s.trim()}
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-[#94A3B8]">
                اولویت: {member.displayOrder || 0}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleToggleActive(member.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    member.active
                      ? "text-emerald-400 hover:bg-emerald-500/10"
                      : "text-zinc-500 hover:bg-zinc-800"
                  }`}
                  title={member.active ? "غیرفعال کردن" : "فعال کردن"}
                >
                  {member.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => openEditModal(member)}
                  className="p-1.5 rounded-lg text-[#00D2FF] hover:bg-[#00D2FF]/10 transition-colors"
                  title="ویرایش"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(member.id, member.name_fa || member.name)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add / Edit */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-2xl border border-[#00D2FF]/30 bg-[#081432] p-6 sm:p-8 shadow-2xl overflow-hidden my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 left-4 p-2 rounded-full bg-[#040B20] text-[#94A3B8] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-lg font-bold text-white mb-1">
                {editingMember ? "ویرایش عضو تیم" : "افزودن عضو جدید به تیم"}
              </h2>
              <p className="text-xs text-[#94A3B8] mb-5">
                اطلاعات فارسی و انگلیسی، مهارت‌ها و تصویر پروفایل عضو تیم را مشخص کنید.
              </p>

              {statusMessage && (
                <div
                  className={`p-3 rounded-xl mb-4 text-xs flex items-center gap-2 ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                {/* Avatar Preview & Upload */}
                <div className="p-4 rounded-xl bg-[#040B20]/80 border border-white/[0.08] flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#00D2FF]/40 bg-[#081432] shrink-0">
                    <Image
                      src={avatar || "/images/default_avatar.png"}
                      alt="Avatar preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-2 flex-1">
                    <label className="block text-xs font-semibold text-[#CBD5E1]">
                      عکس پروفایل
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        disabled={uploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-1.5 rounded-lg bg-[#00D2FF]/15 hover:bg-[#00D2FF]/25 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {uploading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>{uploading ? "در حال آپلود..." : "آپلود تصویر جدید"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAvatar("/images/default_avatar.png")}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#94A3B8] hover:text-white text-xs cursor-pointer"
                      >
                        استفاده از آواتار پیش‌فرض
                      </button>
                    </div>
                    <p className="text-[11px] text-[#64748B]">
                      تصویر آپلود شده فوراً در سرور ذخیره شده و نمایش داده می‌شود.
                    </p>
                  </div>
                </div>

                {/* Names row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      نام و نام خانوادگی (فارسی) *
                    </label>
                    <input
                      type="text"
                      required
                      value={nameFa}
                      onChange={(e) => setNameFa(e.target.value)}
                      placeholder="مثلاً: نظیف یوسفی"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white placeholder-[#64748B] focus:border-[#00D2FF] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      نام کامل (انگلیسی) *
                    </label>
                    <input
                      type="text"
                      required
                      value={nameEn}
                      onChange={(e) => setNameEn(e.target.value)}
                      placeholder="e.g. Nazif Yosufi"
                      dir="ltr"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white placeholder-[#64748B] focus:border-[#00D2FF] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      نام مستعار / Nickname (اختیاری)
                    </label>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="مثلاً: levi"
                      dir="ltr"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white placeholder-[#64748B] focus:border-[#00D2FF] outline-none"
                    />
                  </div>
                </div>

                {/* Roles row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      نقش و مسئولیت (فارسی) *
                    </label>
                    <input
                      type="text"
                      required
                      value={roleFa}
                      onChange={(e) => setRoleFa(e.target.value)}
                      placeholder="مثلاً: رهبر تیم و معمار وب"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white placeholder-[#64748B] focus:border-[#00D2FF] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      Role & Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={roleEn}
                      onChange={(e) => setRoleEn(e.target.value)}
                      placeholder="e.g. Founder & Lead Software Architect"
                      dir="ltr"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white placeholder-[#64748B] focus:border-[#00D2FF] outline-none"
                    />
                  </div>
                </div>

                {/* Location & Age */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      موقعیت (فارسی)
                    </label>
                    <input
                      type="text"
                      value={locationFa}
                      onChange={(e) => setLocationFa(e.target.value)}
                      placeholder="مثلاً: آلمان"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white placeholder-[#64748B] focus:border-[#00D2FF] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      Location (English)
                    </label>
                    <input
                      type="text"
                      value={locationEn}
                      onChange={(e) => setLocationEn(e.target.value)}
                      placeholder="e.g. Germany"
                      dir="ltr"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white placeholder-[#64748B] focus:border-[#00D2FF] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      سن (اختیاری)
                    </label>
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="مثلاً: 19"
                      dir="ltr"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white placeholder-[#64748B] focus:border-[#00D2FF] outline-none"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      مهارت‌ها (فارسی - با ویرگول جدا کنید)
                    </label>
                    <input
                      type="text"
                      value={skillsFa}
                      onChange={(e) => setSkillsFa(e.target.value)}
                      placeholder="فول‌استک، سیستم ابری، هوش مصنوعی"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white placeholder-[#64748B] focus:border-[#00D2FF] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      Skills (English - comma separated)
                    </label>
                    <input
                      type="text"
                      value={skillsEn}
                      onChange={(e) => setSkillsEn(e.target.value)}
                      placeholder="Full-Stack, Cloud Architecture, AI"
                      dir="ltr"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white placeholder-[#64748B] focus:border-[#00D2FF] outline-none"
                    />
                  </div>
                </div>

                {/* Bio textareas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      شرح بیوگرافی و فعالیت‌ها (فارسی)
                    </label>
                    <textarea
                      rows={4}
                      value={bioFa}
                      onChange={(e) => setBioFa(e.target.value)}
                      placeholder="شرح کامل تجربه، سوابق و مسئولیت‌ها..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white placeholder-[#64748B] focus:border-[#00D2FF] outline-none resize-none leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      Bio & Background (English)
                    </label>
                    <textarea
                      rows={4}
                      value={bioEn}
                      onChange={(e) => setBioEn(e.target.value)}
                      placeholder="Detailed background, accomplishments and role description..."
                      dir="ltr"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white placeholder-[#64748B] focus:border-[#00D2FF] outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Controls: Order & Active */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">
                      اولویت نمایش (ترتیب)
                    </label>
                    <input
                      type="number"
                      value={displayOrder}
                      onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B20] border border-white/[0.08] text-white focus:border-[#00D2FF] outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D2FF]"></div>
                    </label>
                    <span className="font-semibold text-white">نمایش در وب‌سایت</span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-white/[0.08] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#94A3B8] hover:text-white font-bold transition-all cursor-pointer"
                  >
                    انصراف
                  </button>

                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="px-6 py-2.5 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] disabled:opacity-50 text-[#040B20] font-bold transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] cursor-pointer flex items-center gap-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{editingMember ? "ذخیره تغییرات" : "افزودن عضو تیم"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
