"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Plus, Trash2, Loader2, CheckCircle2, AlertCircle, Shield, Key } from "lucide-react";
import { updateSiteSettings, saveSocialLinks } from "@/lib/actions/settings-actions";
import { updateAdminProfile } from "@/lib/actions/auth-actions";
import { EDITORIAL_EASE } from "@/lib/motion";

interface SocialLinkItem {
  id?: string;
  platform: string;
  url: string;
  icon: string;
  displayOrder: number;
  active: boolean;
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [settingsData, setSettingsData] = useState({
    siteName: "UR CLUB — Digital Engineering & Brand Architecture",
    designerName: "UR CLUB",
    title: "توسعه وبسایت‌های مقیاس‌پذیر • هویت برند • پلتفرم سرمایه‌گذاری",
    tagline: "تیم تخصصی طراحی، توسعه محصولات دیجیتال و جذب سرمایه‌گذاری روی پروژه‌های نوآورانه.",
    logoUrl: "/images/team_logo_transparent.png",
    faviconUrl: "/favicon.ico",
    metaDescription: "UR CLUB — استودیو تخصصی طراحی سایت، توسعه نرم‌افزار، کارت ویزیت آنلاین، طراحی لوگو و برندینگ در افغانستان و آلمان.",
    keywords: "طراحی سایت در افغانستان, ساخت وبسایت حرفه‌ای, طراح لوگو و برندینگ, کارت ویزیت آنلاین, برنامه‌نویسی و ساخت اپلیکیشن, ساخت فروشگاه اینترنتی, طراحی وبسایت شرکتی در کابل و هرات, طراحی سایت در کابل, طراحی وبسایت در هرات, طراح وبسایت افغان, شرکت طراحی سایت افغانستان, یو آر کلاب استودیو, نظیف یوسفی, Web Design in Afghanistan, Professional Website Development, Logo Design & Branding, Smart Digital Business Card, Software & App Development, E-commerce Website Development, Corporate Website Design Kabul Herat, Web Designer Afghanistan, Web Design Kabul, Web Design Herat, UR CLUB Studio, Mohammad Nazif Yosufi, Digital Engineering Collective, Webdesign in Afghanistan, Professionelle Website-Entwicklung, Logo-Design & Branding, Digitale Web-Visitenkarte, Software & App Entwicklung, E-Commerce Onlineshop Erstellung, Unternehmenswebsite Design Kabul Herat, Webdesigner Afghanistan Deutschland, Webagentur Afghanistan",
    email: "urclub7@gmail.com",
    phone: "+49 162 4212685",
    location: "Germany / Global",
    copyrightText: "© 2026 UR CLUB. All rights reserved.",
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinkItem[]>([]);
  const [adminName, setAdminName] = useState("Nazif Yosufi");
  const [newPassword, setNewPassword] = useState("");

  const loadData = async () => {
    try {
      const res = await fetch("/api/admin-data?type=settings");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setSettingsData({
            siteName: data.siteName || "",
            designerName: data.designerName || "",
            title: data.title || "",
            tagline: data.tagline || "",
            logoUrl: data.logoUrl || "/images/team_logo.png",
            faviconUrl: data.faviconUrl || "/images/favicon_white.png",
            metaDescription: data.metaDescription || "",
            keywords: data.keywords || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            copyrightText: data.copyrightText || "",
          });
          if (data.socialLinks) {
            setSocialLinks(data.socialLinks);
          }
        }
      }
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const resSettings = await updateSiteSettings(settingsData);
      const resSocial = await saveSocialLinks(socialLinks);

      if (resSettings.success && resSocial.success) {
        setSuccess("Settings and social profiles updated in PostgreSQL.");
      } else {
        setError(resSettings.message || resSocial.message || "Failed to save settings.");
      }
    } catch {
      setError("An error occurred while saving settings.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setSuccess(null);
    setError(null);

    const formData = new FormData();
    formData.append("name", adminName);
    if (newPassword) {
      formData.append("newPassword", newPassword);
    }

    try {
      const res = await updateAdminProfile(formData);
      if (res.success) {
        setSuccess("Admin profile and password updated.");
        setNewPassword("");
      } else {
        setError(res.message || "Failed to update profile.");
      }
    } catch {
      setError("Failed to update profile.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleAddSocial = () => {
    setSocialLinks((prev) => [
      ...prev,
      {
        platform: "Behance",
        url: "https://behance.net",
        icon: "Globe",
        displayOrder: prev.length + 1,
        active: true,
      },
    ]);
  };

  const handleSocialChange = (index: number, field: keyof SocialLinkItem, value: any) => {
    setSocialLinks((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const handleRemoveSocial = (index: number) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="pb-8 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <span className="mono-tag text-xs text-zinc-400 block mb-1">Global Configuration</span>
          <h1 className="text-2xl sm:text-3xl font-light text-zinc-100">Site Settings & SEO</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure site metadata, brand identities, social profiles, and admin security.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="p-4 rounded-2xl bg-[#00C3FF]/10 border border-[#00C3FF]/25 text-[#00C3FF] text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(0, 195, 255,0.15)]"
          >
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[#00C3FF]" />
            <span className="text-[#F8FAFC]">{success}</span>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Global Settings */}
      <form onSubmit={handleSettingsSubmit} className="space-y-8">
        {/* Team Logo & Favicon Configuration Section */}
        <div className="p-8 rounded-3xl border border-[#00D2FF]/30 bg-[#081432] space-y-6">
          <div className="flex items-center justify-between border-b border-[#00D2FF]/20 pb-3">
            <div>
              <h2 className="text-base font-bold text-white">
                لوگو و نشان‌واره تیم و فاوآیکون (Team Logo & Favicon)
              </h2>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                تنظیم لوگوی اصلی تیم و آیکون بخش آدرس‌بار (URL Tab) با استایل بکگراند شفاف یا سفید
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#00D2FF] px-2.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30">
              ACTIVE BRAND ASSETS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Official Team Logo */}
            <div className="p-4 rounded-2xl bg-[#040B20] border border-[#00D2FF]/20 space-y-3">
              <label className="block text-xs font-semibold text-white">
                لوگوی رسمی تیم (Team Logo - Navbar & Headers)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl border border-[#00D2FF]/40 bg-[#081432] p-1 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,210,255,0.3)]">
                  <img
                    src={settingsData.logoUrl || "/images/team_logo.png"}
                    alt="Team Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <input
                    type="text"
                    value={settingsData.logoUrl}
                    onChange={(e) => setSettingsData({ ...settingsData, logoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#081432] border border-[#00D2FF]/30 text-white text-xs font-mono"
                    placeholder="/images/team_logo.png"
                  />
                  <p className="text-[10px] text-[#94A3B8]">
                    لوگوی سپر سایبری نئون با پس‌زمینه تیره / شفاف
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Favicon on White Background */}
            <div className="p-4 rounded-2xl bg-[#040B20] border border-[#00D2FF]/20 space-y-3">
              <label className="block text-xs font-semibold text-white">
                فاوآیکون بخش آدرس‌بار (URL / Tab Icon - با بک‌گراند سفید)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl border border-[#00D2FF]/40 bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
                  <img
                    src={settingsData.faviconUrl || "/images/favicon_white.png"}
                    alt="Favicon"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <input
                    type="text"
                    value={settingsData.faviconUrl}
                    onChange={(e) => setSettingsData({ ...settingsData, faviconUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#081432] border border-[#00D2FF]/30 text-white text-xs font-mono"
                    placeholder="/images/favicon_white.png"
                  />
                  <p className="text-[10px] text-[#94A3B8]">
                    آیکون با کانتینر سفید برای وضوح فوق‌العاده در تب مرورگر
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-6">
          <h2 className="text-base font-medium text-zinc-100 border-b border-zinc-900 pb-3">
            General Branding & Studio Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Website Name</label>
              <input
                type="text"
                required
                value={settingsData.siteName}
                onChange={(e) => setSettingsData({ ...settingsData, siteName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
              />
            </div>
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Designer Full Name</label>
              <input
                type="text"
                required
                value={settingsData.designerName}
                onChange={(e) =>
                  setSettingsData({ ...settingsData, designerName: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Professional Title</label>
              <input
                type="text"
                required
                value={settingsData.title}
                onChange={(e) => setSettingsData({ ...settingsData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
              />
            </div>
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Location Badge</label>
              <input
                type="text"
                required
                value={settingsData.location}
                onChange={(e) => setSettingsData({ ...settingsData, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Tagline / Brand Statement</label>
            <input
              type="text"
              value={settingsData.tagline}
              onChange={(e) => setSettingsData({ ...settingsData, tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Contact Email</label>
              <input
                type="email"
                required
                value={settingsData.email}
                onChange={(e) => setSettingsData({ ...settingsData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Studio Telephone</label>
              <input
                type="text"
                value={settingsData.phone || ""}
                onChange={(e) => setSettingsData({ ...settingsData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Footer Copyright Text</label>
            <input
              type="text"
              required
              value={settingsData.copyrightText}
              onChange={(e) => setSettingsData({ ...settingsData, copyrightText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>

          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Global SEO Meta Description</label>
            <textarea
              rows={2}
              required
              value={settingsData.metaDescription}
              onChange={(e) =>
                setSettingsData({ ...settingsData, metaDescription: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
            />
          </div>

          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-1">SEO Keywords (comma separated)</label>
            <input
              type="text"
              value={settingsData.keywords}
              onChange={(e) => setSettingsData({ ...settingsData, keywords: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs font-mono"
            />
          </div>
        </div>

        {/* 2. Social Links */}
        <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <div>
              <h2 className="text-base font-medium text-zinc-100">Social Profiles & Portfolios</h2>
              <span className="mono-tag text-[10px] text-zinc-400">Links shown in footer and contact channels</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleAddSocial}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Link</span>
            </motion.button>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {socialLinks.map((social, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-2xl border border-zinc-850 bg-zinc-900/40 flex flex-col sm:flex-row items-center gap-4"
                >
                  <input
                    type="text"
                    placeholder="Platform (Behance, Dribbble, etc.)"
                    value={social.platform}
                    onChange={(e) => handleSocialChange(idx, "platform", e.target.value)}
                    className="w-full sm:w-44 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={social.url}
                    onChange={(e) => handleSocialChange(idx, "url", e.target.value)}
                    className="flex-1 w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={social.active}
                        onChange={(e) => handleSocialChange(idx, "active", e.target.checked)}
                        className="w-3.5 h-3.5 rounded bg-zinc-900 border-zinc-800"
                      />
                      <span>Active</span>
                    </label>
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#f87171" }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => handleRemoveSocial(idx)}
                      className="p-2 text-zinc-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-end pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Site Configuration</span>
            </motion.button>
          </div>
        </div>
      </form>

      {/* 3. Admin Security & Profile */}
      <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-6">
        <h2 className="text-base font-medium text-zinc-100 border-b border-zinc-900 pb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#00C3FF]" />
          <span>Admin Account & Password Security</span>
        </h2>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Display Name</label>
            <input
              type="text"
              required
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-1">New Password (leave empty to keep current)</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={passwordLoading}
            className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-850 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-sm"
          >
            {passwordLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Key className="w-3.5 h-3.5" />
            )}
            <span>Update Admin Security</span>
          </motion.button>
        </form>
      </div>
    </div>
  );
}

