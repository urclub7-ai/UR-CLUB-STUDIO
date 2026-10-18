"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  Sparkles,
  X,
} from "lucide-react";
import {
  createBrandAsset,
  updateBrandAsset,
  deleteBrandAsset,
  toggleBrandAssetActive,
} from "@/lib/actions/brand-asset-actions";
import ImageUploader from "@/components/admin/ImageUploader";

interface BrandAssetItem {
  id: string;
  type: string;
  title: string;
  title_fa: string;
  category: string;
  category_fa: string;
  description?: string | null;
  description_fa?: string | null;
  image: string;
  displayOrder: number;
  active: boolean;
  createdAt: Date | string;
}

interface LogosClientProps {
  initialAssets: BrandAssetItem[];
}

export default function LogosClient({ initialAssets }: LogosClientProps) {
  const [assets, setAssets] = useState<BrandAssetItem[]>(initialAssets);
  const [filter, setFilter] = useState<"all" | "logo" | "poster">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<BrandAssetItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [type, setType] = useState<"logo" | "poster">("logo");
  const [titleFa, setTitleFa] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [categoryFa, setCategoryFa] = useState("");
  const [categoryEn, setCategoryEn] = useState("");
  const [descriptionFa, setDescriptionFa] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [active, setActive] = useState(true);

  const filteredAssets = assets.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const openCreateModal = () => {
    setEditingAsset(null);
    setType("logo");
    setTitleFa("");
    setTitleEn("");
    setCategoryFa("طراحی لوگو و هویت بصری");
    setCategoryEn("Branding & Identity");
    setDescriptionFa("");
    setDescriptionEn("");
    setImageUrl("");
    setDisplayOrder(assets.length + 1);
    setActive(true);
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: BrandAssetItem) => {
    setEditingAsset(item);
    setType((item.type as "logo" | "poster") || "logo");
    setTitleFa(item.title_fa || item.title);
    setTitleEn(item.title || "");
    setCategoryFa(item.category_fa || "");
    setCategoryEn(item.category || "");
    setDescriptionFa(item.description_fa || "");
    setDescriptionEn(item.description || "");
    setImageUrl(item.image || "");
    setDisplayOrder(item.displayOrder || 0);
    setActive(item.active);
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleFa.trim() || !imageUrl.trim()) {
      setStatusMessage({ type: "error", text: "لطفاً عنوان و تصویر را مشخص کنید." });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("type", type);
    formData.append("title", titleEn.trim() || titleFa.trim());
    formData.append("title_fa", titleFa.trim());
    formData.append("category", categoryEn.trim() || (type === "logo" ? "Branding" : "Poster"));
    formData.append("category_fa", categoryFa.trim() || (type === "logo" ? "طراحی لوگو و برند" : "پوستر تبلیغاتی"));
    formData.append("description", descriptionEn.trim());
    formData.append("description_fa", descriptionFa.trim());
    formData.append("image", imageUrl.trim());
    formData.append("displayOrder", displayOrder.toString());
    formData.append("active", active ? "true" : "false");

    try {
      if (editingAsset) {
        const res = await updateBrandAsset(editingAsset.id, formData);
        if (res.success && res.data) {
          setAssets((prev) =>
            prev.map((item) => (item.id === editingAsset.id ? (res.data as BrandAssetItem) : item))
          );
          setIsModalOpen(false);
        } else {
          setStatusMessage({ type: "error", text: res.message || "خطا در ویرایش" });
        }
      } else {
        const res = await createBrandAsset(formData);
        if (res.success && res.data) {
          setAssets((prev) => [...prev, res.data as BrandAssetItem]);
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
    if (!confirm("آیا از حذف این مورد اطمینان دارید؟ این عمل قابل بازگشت نیست.")) return;

    try {
      const res = await deleteBrandAsset(id);
      if (res.success) {
        setAssets((prev) => prev.filter((a) => a.id !== id));
      } else {
        alert(res.message || "خطا در حذف");
      }
    } catch {
      alert("خطا در برقراری ارتباط");
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      const res = await toggleBrandAssetActive(id, current);
      if (res.success) {
        setAssets((prev) =>
          prev.map((a) => (a.id === id ? { ...a, active: !current } : a))
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
            <Palette className="w-3.5 h-3.5" />
            <span>مدیریت بخش هویت بصری سایت</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            لوگوها و پوسترهای گرافیکی
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            تصاویر آپلود شده در این بخش مستقیماً در سکشن «طراحی لوگوها و پوسترهای تبلیغاتی» صفحه اصلی نمایش داده می‌شوند.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>آپلود لوگو یا پوستر جدید</span>
        </button>
      </div>

      {/* Filter Tabs & Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)]">
          {[
            { id: "all", label: `همه (${assets.length})` },
            { id: "logo", label: `لوگوها (${assets.filter((a) => a.type === "logo").length})` },
            { id: "poster", label: `پوسترها (${assets.filter((a) => a.type === "poster").length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === tab.id
                  ? "bg-[#00D2FF] text-[#040B20] font-bold shadow-[0_0_12px_rgba(0,210,255,0.35)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#64748B]">
          تعداد فعال در سایت: {assets.filter((a) => a.active).length} از {assets.length}
        </span>
      </div>

      {/* Grid of Logos & Posters */}
      {filteredAssets.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0D0F12] border border-[rgba(255,255,255,0.08)] space-y-3">
          <ImageIcon className="w-10 h-10 text-[#64748B] mx-auto" />
          <p className="text-sm text-[#94A3B8]">هیچ لوگو یا پوستری در این بخش یافت نشد.</p>
          <button
            onClick={openCreateModal}
            className="text-xs text-[#00D2FF] hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>اولین لوگو یا پوستر را اضافه کنید</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAssets.map((item) => (
            <div
              key={item.id}
              className={`group rounded-2xl border transition-all overflow-hidden bg-[#0D0F12] flex flex-col justify-between ${
                item.active
                  ? "border-[rgba(255,255,255,0.08)] hover:border-[#00D2FF]/40"
                  : "border-red-500/20 opacity-60"
              }`}
            >
              {/* Image Preview Box */}
              <div className="relative w-full h-48 bg-[#040B20] flex items-center justify-center p-4 border-b border-[rgba(255,255,255,0.06)] overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title_fa || item.title}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>

                {/* Badge: Type & Order */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.type === "logo"
                        ? "bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30"
                        : "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                    }`}
                  >
                    {item.type === "logo" ? "لوگو" : "پوستر"}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-black/60 text-[#94A3B8] font-mono">
                    #{item.displayOrder}
                  </span>
                </div>

                {!item.active && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">
                      غیرفعال (عدم نمایش در سایت)
                    </span>
                  </div>
                )}
              </div>

              {/* Info Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-medium text-[#00D2FF] block mb-1">
                    {item.category_fa || item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-tight line-clamp-1">
                    {item.title_fa || item.title}
                  </h3>
                  {item.title && (
                    <p className="text-[11px] text-[#64748B] font-sans line-clamp-1">
                      {item.title}
                    </p>
                  )}
                  {item.description_fa && (
                    <p className="text-xs text-[#94A3B8] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description_fa}
                    </p>
                  )}
                </div>

                {/* Actions Toolbar */}
                <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(item.id, item.active)}
                      className={`p-2 rounded-lg transition-colors ${
                        item.active
                          ? "text-[#00D2FF] hover:bg-[#00D2FF]/10"
                          : "text-[#64748B] hover:text-white hover:bg-white/5"
                      }`}
                      title={item.active ? "غیرفعال کردن" : "فعال کردن"}
                    >
                      {item.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="p-2 rounded-lg text-[#CBD5E1] hover:text-white hover:bg-white/5 transition-colors"
                      title="ویرایش"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add or Edit Brand Asset */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#0D0F12] border border-[rgba(255,255,255,0.12)] rounded-2xl shadow-2xl p-6 sm:p-7 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#00D2FF]/10 text-[#00D2FF] flex items-center justify-center">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {editingAsset ? "ویرایش لوگو / پوستر" : "آپلود لوگو یا پوستر جدید"}
                    </h3>
                    <span className="text-[11px] text-[#94A3B8]">
                      مشخصات را وارد کنید و تصویر را مستقیماً آپلود نمایید.
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
              <form onSubmit={handleSave} className="space-y-5">
                {/* Type Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-2">
                    نوع دارایی بصری:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setType("logo")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        type === "logo"
                          ? "bg-[#00D2FF]/15 border-[#00D2FF] text-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                          : "bg-[#14171C] border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:text-white"
                      }`}
                    >
                      <Palette className="w-4 h-4" />
                      <span>طراحی لوگو (Logo)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setType("poster")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        type === "poster"
                          ? "bg-purple-500/15 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                          : "bg-[#14171C] border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:text-white"
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      <span>پوستر تبلیغاتی (Poster)</span>
                    </button>
                  </div>
                </div>

                {/* Direct Image Upload Component */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-2">
                    آپلود تصویر (یا انتخاب فایل):
                  </label>
                  <ImageUploader
                    value={imageUrl}
                    onChange={(url) => setImageUrl(url)}
                    bucket="portfolio"
                    label="تصویر اصلی لوگو / پوستر"
                  />
                  {/* Or Manual URL Input */}
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="/showcase/designs/... یا آدرس مستقیم عکس"
                      className="flex-1 px-3 py-2 rounded-lg bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]"
                    />
                  </div>
                </div>

                {/* Title FA & EN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                      عنوان به فارسی *:
                    </label>
                    <input
                      type="text"
                      value={titleFa}
                      onChange={(e) => setTitleFa(e.target.value)}
                      placeholder="مثلاً: لوگوی فناوری آریا تک"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                      عنوان به انگلیسی (اختیاری):
                    </label>
                    <input
                      type="text"
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="e.g. AriaTech Cloud Logo"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF] font-sans"
                    />
                  </div>
                </div>

                {/* Category FA & EN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                      دسته‌بندی فارسی:
                    </label>
                    <input
                      type="text"
                      value={categoryFa}
                      onChange={(e) => setCategoryFa(e.target.value)}
                      placeholder="مثلاً: فناوری و نرم‌افزار / پوستر تبلیغاتی"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                      دسته‌بندی انگلیسی:
                    </label>
                    <input
                      type="text"
                      value={categoryEn}
                      onChange={(e) => setCategoryEn(e.target.value)}
                      placeholder="e.g. Cloud & Software / Promotional"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF] font-sans"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    توضیحات مختصر ایده / کانسپت (فارسی):
                  </label>
                  <textarea
                    rows={2}
                    value={descriptionFa}
                    onChange={(e) => setDescriptionFa(e.target.value)}
                    placeholder="مثلاً: طراحی مینیمال نماد ایزومتریک مکعبی برای شرکت‌های ساختمانی."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF] resize-none"
                  />
                </div>

                {/* Order & Active Status */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                      ترتیب نمایش (عدد کوچک‌تر اول):
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
                      id="asset-active"
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#00D2FF] cursor-pointer"
                    />
                    <label htmlFor="asset-active" className="text-xs font-semibold text-white cursor-pointer select-none">
                      نمایش زنده در وب‌سایت
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
                    <span>{editingAsset ? "ذخیره تغییرات" : "افزودن و انتشار"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
