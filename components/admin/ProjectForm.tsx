"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Sparkles,
  X,
  Globe,
} from "lucide-react";
import { slugify } from "@/lib/utils";
import ImageUploader from "@/components/admin/ImageUploader";
import { createProject, updateProject } from "@/lib/actions/project-actions";

interface ProjectImageItem {
  id?: string;
  imageUrl: string;
  altText?: string | null;
  altText_fa?: string | null;
  caption?: string | null;
  caption_fa?: string | null;
  displayOrder?: number;
}

interface ProjectFormProps {
  initialData?: {
    id?: string;
    title: string;
    title_fa?: string | null;
    slug: string;
    category: string;
    category_fa?: string | null;
    shortDescription: string;
    shortDescription_fa?: string | null;
    fullDescription: string;
    fullDescription_fa?: string | null;
    client?: string | null;
    client_fa?: string | null;
    projectYear?: string;
    toolsUsed?: string;
    servicesProvided?: string;
    servicesProvided_fa?: string | null;
    thumbnail: string;
    projectUrl?: string | null;
    behanceUrl?: string | null;
    featured?: boolean;
    published?: boolean;
    displayOrder?: number;
    images?: ProjectImageItem[];
  };
  isEditing?: boolean;
}

const DEFAULT_CATEGORIES = [
  "Web Development",
  "Graphic Design",
  "Poster Design",
  "UI/UX",
  "AI",
  "Branding",
  "Typography",
  "Editorial",
  "Packaging",
  "Other",
];

type LangTab = "en" | "fa";

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [langTab, setLangTab] = useState<LangTab>("en");

  const [categoryList, setCategoryList] = useState<string[]>(() => {
    const set = new Set(DEFAULT_CATEGORIES);
    if (initialData?.category) set.add(initialData.category);
    return Array.from(set);
  });
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    title_fa: initialData?.title_fa || "",
    slug: initialData?.slug || "",
    category: initialData?.category || DEFAULT_CATEGORIES[0],
    category_fa: initialData?.category_fa || "",
    shortDescription: initialData?.shortDescription || "",
    shortDescription_fa: initialData?.shortDescription_fa || "",
    fullDescription: initialData?.fullDescription || "",
    fullDescription_fa: initialData?.fullDescription_fa || "",
    client: initialData?.client || "",
    client_fa: initialData?.client_fa || "",
    projectYear: initialData?.projectYear || "2026",
    toolsUsed: initialData?.toolsUsed || "Adobe Illustrator, Figma",
    servicesProvided: initialData?.servicesProvided || "Visual Identity, Art Direction",
    servicesProvided_fa: initialData?.servicesProvided_fa || "",
    thumbnail: initialData?.thumbnail || "",
    projectUrl: initialData?.projectUrl || "",
    behanceUrl: initialData?.behanceUrl || "",
    featured: initialData?.featured ?? false,
    published: initialData?.published ?? true,
    displayOrder: initialData?.displayOrder ?? 0,
  });

  const handleAddCustomCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (!categoryList.includes(trimmed)) {
      setCategoryList((prev) => [...prev, trimmed]);
    }
    setFormData((prev) => ({ ...prev, category: trimmed }));
    setNewCategoryName("");
    setShowNewCategoryInput(false);
  };

  const [galleryImages, setGalleryImages] = useState<ProjectImageItem[]>(
    initialData?.images || []
  );

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : slugify(title),
    }));
  };

  const handleAddGalleryImage = () => {
    setGalleryImages((prev) => [
      ...prev,
      {
        imageUrl: "",
        altText: "",
        altText_fa: "",
        caption: "",
        caption_fa: "",
        displayOrder: prev.length + 1,
      },
    ]);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGalleryChange = (index: number, field: keyof ProjectImageItem, val: string) => {
    setGalleryImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, [field]: val } : img))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      ...formData,
      client: formData.client || null,
      client_fa: formData.client_fa || null,
      title_fa: formData.title_fa || null,
      category_fa: formData.category_fa || null,
      shortDescription_fa: formData.shortDescription_fa || null,
      fullDescription_fa: formData.fullDescription_fa || null,
      servicesProvided_fa: formData.servicesProvided_fa || null,
      projectUrl: formData.projectUrl || "",
      behanceUrl: formData.behanceUrl || "",
      images: galleryImages.filter((img) => img.imageUrl.trim() !== ""),
    };

    try {
      let res;
      if (isEditing && initialData?.id) {
        res = await updateProject(initialData.id, payload);
      } else {
        res = await createProject(payload);
      }

      if (res.success) {
        setSuccess("Project saved successfully.");
        setTimeout(() => {
          router.push("/admin/projects");
          router.refresh();
        }, 1000);
      } else {
        setError(res.message || "Failed to save project.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-light text-zinc-100">
              {isEditing ? `Edit: ${formData.title || initialData?.title}` : "Create New Project"}
            </h1>
            <span className="mono-tag text-[10px] text-zinc-400">
              {isEditing ? "Update existing project record" : "Add new portfolio project"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher Tabs */}
          <div className="flex items-center gap-1 bg-zinc-900 rounded-xl p-1 border border-zinc-800">
            <button
              type="button"
              onClick={() => setLangTab("en")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${
                langTab === "en"
                  ? "bg-zinc-100 text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              🇬🇧 English
            </button>
            <button
              type="button"
              onClick={() => setLangTab("fa")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${
                langTab === "fa"
                  ? "bg-zinc-100 text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              🇦🇫 دری
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isEditing ? "Update Project" : "Publish Project"}</span>
          </motion.button>
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

      {/* Main Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <h2 className="text-base font-medium text-zinc-100">
                {langTab === "en" ? "Case Study Content (English)" : "محتوای پروژه (دری)"}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                {langTab === "en" ? "🇬🇧 EN Active" : "🇦🇫 دری فعال"}
              </span>
            </div>

            {/* Category Selector */}
            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00C3FF]" />
                  <label className="mono-tag text-[11px] font-semibold text-zinc-100 tracking-wider uppercase">
                    {langTab === "en" ? "Project Category *" : "دسته‌بندی پروژه (انگلیسی) *"}
                  </label>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  Selected: <span className="text-[#00C3FF] font-semibold">{formData.category || "None"}</span>
                </span>
              </div>

              {/* Interactive Category Pills */}
              <div className="flex flex-wrap gap-2 items-center">
                {categoryList.map((cat) => {
                  const isSelected = formData.category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 border ${
                        isSelected
                          ? "bg-[#00C3FF] text-white border-[#00C3FF] shadow-[0_0_12px_rgba(0, 195, 255,0.35)] scale-[1.02]"
                          : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white hover:bg-zinc-900"
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                      <span>{cat}</span>
                    </button>
                  );
                })}

                {!showNewCategoryInput ? (
                  <button
                    type="button"
                    onClick={() => setShowNewCategoryInput(true)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-zinc-950 text-[#00C3FF] border border-[#00C3FF]/30 hover:border-[#00C3FF] hover:bg-[#00C3FF]/10 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 shrink-0" />
                    <span>+ Add Category</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-zinc-950 border border-[#00C3FF]/60 shadow-inner">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustomCategory();
                        } else if (e.key === "Escape") {
                          setShowNewCategoryInput(false);
                        }
                      }}
                      placeholder="e.g. AI UI, 3D Design..."
                      autoFocus
                      className="px-2.5 py-1 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none w-36 sm:w-44"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomCategory}
                      className="px-3 py-1 rounded-lg bg-[#00C3FF] text-white text-[11px] font-semibold hover:brightness-110 transition-all shadow"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewCategoryInput(false);
                        setNewCategoryName("");
                      }}
                      className="p-1 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Dari Category Name */}
              {langTab === "fa" && (
                <div className="pt-2 border-t border-zinc-800" dir="rtl">
                  <label className="block text-[11px] font-medium text-emerald-400 mb-1">
                    نام دسته‌بندی به دری (اختیاری — مثلاً: توسعه وب، طراحی گرافیک، طراحی پوستر)
                  </label>
                  <input
                    type="text"
                    value={formData.category_fa || ""}
                    onChange={(e) => setFormData({ ...formData, category_fa: e.target.value })}
                    placeholder="مثلاً: طراحی گرافیک"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}
            </div>

            {/* English Fields */}
            {langTab === "en" && (
              <div className="space-y-4">
                <div>
                  <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Project Title (EN) *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. LUMEN Spatial Brand Identity"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block mono-tag text-[10px] text-zinc-400 mb-2">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="lumen-spatial-brand-identity"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs font-mono focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Short Description (EN) *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Brief 1-2 sentence overview for cards and meta descriptions..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Full Description & Story (EN) *</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    placeholder="In-depth narrative of the design challenge, typographic choices, and materials..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500 font-light"
                  />
                </div>
              </div>
            )}

            {/* Dari Fields */}
            {langTab === "fa" && (
              <div className="space-y-4" dir="rtl">
                <div>
                  <label className="block text-[11px] font-medium text-emerald-400 mb-2">عنوان پروژه (دری)</label>
                  <input
                    type="text"
                    value={formData.title_fa || ""}
                    onChange={(e) => setFormData({ ...formData, title_fa: e.target.value })}
                    placeholder="مثلاً: مفهوم هویت بصری و گرافیکی عصری"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-emerald-400 mb-2">توضیحات کوتاه (دری)</label>
                  <textarea
                    rows={2}
                    value={formData.shortDescription_fa || ""}
                    onChange={(e) => setFormData({ ...formData, shortDescription_fa: e.target.value })}
                    placeholder="توضیحات مختصر ۱-۲ جمله‌ای برای کارت‌های پروژه..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-emerald-400 mb-2">داستان و توضیحات کامل پروژه (دری)</label>
                  <textarea
                    rows={6}
                    value={formData.fullDescription_fa || ""}
                    onChange={(e) => setFormData({ ...formData, fullDescription_fa: e.target.value })}
                    placeholder="توضیحات تفصیلی، رویکرد دیزاین، چالش‌ها و نتایج پروژه به زبان دری..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500 font-light"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Multi-Image Gallery */}
          <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <div>
                <h2 className="text-base font-medium text-zinc-100">Gallery Imagery</h2>
                <span className="mono-tag text-[10px] text-zinc-400">Add detailed visual slides to the case study</span>
              </div>
              <button
                type="button"
                onClick={handleAddGalleryImage}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image</span>
              </button>
            </div>

            <div className="space-y-6">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-zinc-850 bg-zinc-900/40 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="mono-tag text-[10px] text-zinc-400">
                      Visual Slide No. 0{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <ImageUploader
                    label="Gallery Visual"
                    bucket="portfolio"
                    value={img.imageUrl}
                    onChange={(url) => handleGalleryChange(idx, "imageUrl", url)}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Alt Text (EN)"
                      value={img.altText || ""}
                      onChange={(e) => handleGalleryChange(idx, "altText", e.target.value)}
                      className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Caption (EN)"
                      value={img.caption || ""}
                      onChange={(e) => handleGalleryChange(idx, "caption", e.target.value)}
                      className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Main Thumbnail / Cover Photo */}
          <div className="p-6 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#00C3FF]" />
                <h3 className="mono-tag text-xs font-semibold text-zinc-100 uppercase">
                  Project Cover Photo
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Optional</span>
            </div>
            <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
              اگر عکس آپلود نکنید و لینک وبسایت زنده وارد شده باشد، پیش‌نمایش سایت نشان داده می‌شود.
            </p>
            <ImageUploader
              label="Upload Cover Image"
              bucket="portfolio"
              value={formData.thumbnail}
              onChange={(url) => setFormData({ ...formData, thumbnail: url })}
            />
          </div>

          {/* Project Specifications */}
          <div className="p-6 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-4">
            <h3 className="mono-tag text-xs text-zinc-400 border-b border-zinc-900 pb-2">
              Specifications
            </h3>

            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Client Name (EN)</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="e.g. Independent Project"
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Client Name (دری)</label>
              <input
                type="text"
                dir="rtl"
                value={formData.client_fa || ""}
                onChange={(e) => setFormData({ ...formData, client_fa: e.target.value })}
                placeholder="مثلاً: پروژه مستقل"
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Project Year</label>
              <input
                type="text"
                value={formData.projectYear}
                onChange={(e) => setFormData({ ...formData, projectYear: e.target.value })}
                placeholder="2026"
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Tools & Software</label>
              <input
                type="text"
                value={formData.toolsUsed}
                onChange={(e) => setFormData({ ...formData, toolsUsed: e.target.value })}
                placeholder="Illustrator, Next.js, Figma, Tailwind"
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Services Provided (EN)</label>
              <input
                type="text"
                value={formData.servicesProvided}
                onChange={(e) => setFormData({ ...formData, servicesProvided: e.target.value })}
                placeholder="Visual Identity, Frontend Development, UI/UX"
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Services Provided (دری)</label>
              <input
                type="text"
                dir="rtl"
                value={formData.servicesProvided_fa || ""}
                onChange={(e) => setFormData({ ...formData, servicesProvided_fa: e.target.value })}
                placeholder="مثلاً: توسعه وب، معماری دیتابیس"
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Links & Visibility */}
          <div className="p-6 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-4">
            <h3 className="mono-tag text-xs font-semibold text-zinc-100 border-b border-zinc-900 pb-2 uppercase flex items-center justify-between">
              <span>Links & Visibility</span>
              <span className="text-[10px] text-[#00C3FF] font-mono lowercase">optional</span>
            </h3>

            {/* Live Website URL */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-2">
              <label className="block mono-tag text-[11px] font-medium text-zinc-200">
                🌐 Live Website / Demo URL
              </label>
              <input
                type="url"
                value={formData.projectUrl}
                onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                placeholder="https://mywebsite.com"
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs font-mono focus:outline-none focus:border-[#00C3FF]"
              />
            </div>

            {/* Behance URL */}
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Behance / Case Study Link</label>
              <input
                type="url"
                value={formData.behanceUrl}
                onChange={(e) => setFormData({ ...formData, behanceUrl: e.target.value })}
                placeholder="https://behance.net/gallery/..."
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="pt-2 space-y-3 border-t border-zinc-900">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded bg-zinc-900 border-zinc-800 text-[#00C3FF] focus:ring-0"
                />
                <span className="text-xs text-zinc-300">Published (نمایش در سایت)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded bg-zinc-900 border-zinc-800 text-[#00C3FF] focus:ring-0"
                />
                <span className="text-xs text-zinc-300">Featured (پروژه ویژه صفحه اول)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
