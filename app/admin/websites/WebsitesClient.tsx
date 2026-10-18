"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  ExternalLink,
  Monitor,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  Play,
  RotateCw,
} from "lucide-react";
import {
  createShowcaseWebsite,
  updateShowcaseWebsite,
  deleteShowcaseWebsite,
  toggleShowcaseWebsiteActive,
} from "@/lib/actions/showcase-website-actions";

interface ShowcaseWebsiteItem {
  id: string;
  name: string;
  name_fa: string;
  url: string;
  displayOrder: number;
  active: boolean;
  createdAt: Date | string;
}

interface WebsitesClientProps {
  initialWebsites: ShowcaseWebsiteItem[];
}

export default function WebsitesClient({ initialWebsites }: WebsitesClientProps) {
  const [websites, setWebsites] = useState<ShowcaseWebsiteItem[]>(initialWebsites);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<ShowcaseWebsiteItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Live Iframe Preview Modal State
  const [previewModalUrl, setPreviewModalUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  // Form State
  const [nameFa, setNameFa] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [url, setUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [active, setActive] = useState(true);

  const openCreateModal = () => {
    setEditingWebsite(null);
    setNameFa("");
    setNameEn("");
    setUrl("");
    setDisplayOrder(websites.length + 1);
    setActive(true);
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: ShowcaseWebsiteItem) => {
    setEditingWebsite(item);
    setNameFa(item.name_fa);
    setNameEn(item.name || "");
    setUrl(item.url);
    setDisplayOrder(item.displayOrder || 0);
    setActive(item.active);
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameFa.trim() || !url.trim()) {
      setStatusMessage({ type: "error", text: "نام و آدرس وبسایت الزامی هستند." });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("name", nameEn.trim() || nameFa.trim());
    formData.append("name_fa", nameFa.trim());
    formData.append("url", url.trim());
    formData.append("displayOrder", displayOrder.toString());
    formData.append("active", active ? "true" : "false");

    try {
      if (editingWebsite) {
        const res = await updateShowcaseWebsite(editingWebsite.id, formData);
        if (res.success && res.data) {
          setWebsites((prev) =>
            prev.map((item) => (item.id === editingWebsite.id ? (res.data as ShowcaseWebsiteItem) : item))
          );
          setIsModalOpen(false);
        } else {
          setStatusMessage({ type: "error", text: res.message || "خطا در ویرایش" });
        }
      } else {
        const res = await createShowcaseWebsite(formData);
        if (res.success && res.data) {
          setWebsites((prev) => [...prev, res.data as ShowcaseWebsiteItem]);
          setIsModalOpen(false);
        } else {
          setStatusMessage({ type: "error", text: res.message || "خطا در ایجاد" });
        }
      }
    } catch {
      setStatusMessage({ type: "error", text: "خطای سرور رخ داد." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این وب‌سایت از کادر آنلاین اطمینان دارید؟")) return;

    try {
      const res = await deleteShowcaseWebsite(id);
      if (res.success) {
        setWebsites((prev) => prev.filter((w) => w.id !== id));
      } else {
        alert(res.message || "خطا در حذف");
      }
    } catch {
      alert("خطا در برقراری ارتباط");
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      const res = await toggleShowcaseWebsiteActive(id, current);
      if (res.success) {
        setWebsites((prev) =>
          prev.map((w) => (w.id === id ? { ...w, active: !current } : w))
        );
      }
    } catch {
      alert("خطا در تغییر وضعیت");
    }
  };

  return (
    <div className="space-y-8 select-none" dir="rtl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(255,255,255,0.08)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D2FF]/10 text-[#00D2FF] text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>مدیریت کادر تعاملی زنده وبسایت‌ها</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            وب‌سایت‌های آنلاین (کادر تعاملی Live Frame)
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            وب‌سایت‌هایی که در این بخش تعریف می‌شوند، در سکشن «مشاهده و اسکرول در وبسایت‌های قبلی» به عنوان تب‌های تعاملی لود می‌شوند و کاربر می‌تواند مستقیماً داخل کادر سایت را بررسی و اسکرول کند.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن وب‌سایت جدید به کادر</span>
        </button>
      </div>

      {/* Website Table / Cards */}
      <div className="bg-[#0D0F12] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-2">
            <Monitor className="w-4 h-4 text-[#00D2FF]" />
            <span>لیست وب‌سایت‌های فعال در کادر آنلاین ({websites.length})</span>
          </span>
          <span className="text-xs text-[#64748B]">
            فعال در سایت: {websites.filter((w) => w.active).length}
          </span>
        </div>

        {websites.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Globe className="w-10 h-10 text-[#64748B] mx-auto" />
            <p className="text-sm text-[#94A3B8]">هیچ وب‌سایتی برای نمایش در کادر آنلاین تعریف نشده است.</p>
            <button
              onClick={openCreateModal}
              className="text-xs text-[#00D2FF] hover:underline inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>اولین وب‌سایت را اضافه کنید</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[rgba(255,255,255,0.04)]">
            {websites.map((site) => (
              <div
                key={site.id}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:bg-white/[0.02] ${
                  !site.active ? "opacity-60 bg-red-500/[0.02]" : ""
                }`}
              >
                {/* Left Info */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/20 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        {site.name_fa}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-black/60 text-[#94A3B8] font-mono">
                        ترتیب: #{site.displayOrder}
                      </span>
                      {!site.active && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/15 text-red-400 border border-red-500/30">
                          غیرفعال
                        </span>
                      )}
                    </div>
                    {site.name && site.name !== site.name_fa && (
                      <p className="text-[11px] text-[#64748B] font-sans">
                        {site.name}
                      </p>
                    )}
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#00D2FF] hover:underline font-mono inline-flex items-center gap-1 mt-1 direction-ltr text-left"
                    >
                      <span>{site.url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {/* Test Preview Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewModalUrl(site.url);
                      setPreviewTitle(site.name_fa);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#00D2FF]/10 hover:bg-[#00D2FF] text-[#00D2FF] hover:text-[#040B20] text-xs font-semibold transition-all flex items-center gap-1.5"
                    title="تست در کادر زنده"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>تست زنده</span>
                  </button>

                  {/* Toggle Active */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(site.id, site.active)}
                    className={`p-2 rounded-lg transition-colors ${
                      site.active
                        ? "text-[#00D2FF] hover:bg-[#00D2FF]/10"
                        : "text-[#64748B] hover:text-white hover:bg-white/5"
                    }`}
                    title={site.active ? "غیرفعال کردن" : "فعال کردن"}
                  >
                    {site.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => openEditModal(site)}
                    className="p-2 rounded-lg text-[#CBD5E1] hover:text-white hover:bg-white/5 transition-colors"
                    title="ویرایش"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDelete(site.id)}
                    className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Add or Edit Showcase Website */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0D0F12] border border-[rgba(255,255,255,0.12)] rounded-2xl shadow-2xl p-6 sm:p-7 space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#00D2FF]/10 text-[#00D2FF] flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {editingWebsite ? "ویرایش وب‌سایت کادر تعاملی" : "افزودن وب‌سایت جدید به کادر آنلاین"}
                    </h3>
                    <span className="text-[11px] text-[#94A3B8]">
                      نام و آدرس URL سایت را جهت نمایش در کادر تعاملی مشخص کنید.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                      : "bg-red-500/10 border border-red-500/30 text-red-400"
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

              {/* Modal Form */}
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    نام وب‌سایت (به فارسی برای دکمه تب) *:
                  </label>
                  <input
                    type="text"
                    value={nameFa}
                    onChange={(e) => setNameFa(e.target.value)}
                    placeholder="مثلاً: فروشگاه آنلاین آریا / کارت ویزیت هوشمند"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    نام وب‌سایت به انگلیسی (اختیاری):
                  </label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="e.g. Apex Platform / Nova Store"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    آدرس اینترنتی وب‌سایت (URL) *:
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com یا /showcase/.../index.html"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF] font-mono direction-ltr text-left"
                  />
                  <span className="text-[11px] text-[#64748B] mt-1 block">
                    نکته: می‌توانید آدرس سایت آنلاین یا مسیر فایل‌های لوکال در پوشه showcase را وارد کنید.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                      ترتیب نمایش:
                    </label>
                    <input
                      type="number"
                      value={displayOrder}
                      onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-xs text-white focus:outline-none focus:border-[#00D2FF]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="website-active"
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#00D2FF] cursor-pointer"
                    />
                    <label htmlFor="website-active" className="text-xs font-semibold text-white cursor-pointer select-none">
                      نمایش در کادر آنلاین
                    </label>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-[#14171C] text-[#94A3B8] hover:text-white text-xs font-semibold transition-colors"
                  >
                    انصراف
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{editingWebsite ? "ذخیره تغییرات" : "افزودن وب‌سایت"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Iframe Test Modal */}
      <AnimatePresence>
        {previewModalUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-5xl h-[85vh] bg-[#081432] border border-[#00D2FF]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Iframe Header */}
              <div className="p-3.5 bg-[#040B20] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-bold text-white">
                    پیش‌نمایش زنده: {previewTitle}
                  </span>
                  <span className="text-[11px] text-[#94A3B8] font-mono direction-ltr">
                    ({previewModalUrl})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={previewModalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-[#00D2FF] hover:bg-white/5 transition-colors"
                    title="باز کردن در پنجره جدید"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setPreviewModalUrl(null)}
                    className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Iframe Body */}
              <div className="flex-1 w-full bg-white">
                <iframe
                  src={previewModalUrl}
                  title={previewTitle}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
