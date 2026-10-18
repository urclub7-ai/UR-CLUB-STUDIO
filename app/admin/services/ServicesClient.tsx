"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Sparkles, Check, ArrowUpRight, X } from "lucide-react";
import { slugify } from "@/lib/utils";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";
import {
  createService,
  updateService,
  deleteService,
} from "@/lib/actions/service-actions";
import { EDITORIAL_EASE, modalBackdropVariants, modalContentVariants } from "@/lib/motion";

interface ServiceItem {
  id?: string;
  title: string;
  title_fa?: string | null;
  slug: string;
  shortDescription: string;
  shortDescription_fa?: string | null;
  detailedDescription: string;
  detailedDescription_fa?: string | null;
  icon: string;
  startingPrice?: string | null;
  deliveryTime?: string | null;
  features: string;
  features_fa?: string | null;
  active: boolean;
  featured: boolean;
  displayOrder: number;
}

type LangTab = "en" | "fa";

export default function ServicesClient({
  initialServices,
}: {
  initialServices: ServiceItem[];
}) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [langTab, setLangTab] = useState<LangTab>("en");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) {
        setModalOpen(false);
      }
    },
    [modalOpen]
  );

  useEffect(() => {
    if (!modalOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, handleKeyDown]);

  const openNew = () => {
    setEditingService({
      title: "",
      title_fa: "",
      slug: "",
      shortDescription: "",
      shortDescription_fa: "",
      detailedDescription: "",
      detailedDescription_fa: "",
      icon: "Palette",
      startingPrice: "",
      deliveryTime: "",
      features: "",
      features_fa: "",
      active: true,
      featured: true,
      displayOrder: services.length + 1,
    });
    setLangTab("en");
    setModalOpen(true);
  };

  const handleTitleChange = (title: string) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      title,
      slug: editingService.id ? editingService.slug : slugify(title),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (editingService.id) {
      await updateService(editingService.id, editingService);
      setServices((prev) =>
        prev.map((s) => (s.id === editingService.id ? editingService : s))
      );
    } else {
      const res = await createService(editingService);
      if (res.success && res.data) {
        setServices((prev) => [...prev, res.data as ServiceItem]);
      }
    }

    setModalOpen(false);
    setEditingService(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await deleteService(deleteId);
    setServices((prev) => prev.filter((s) => s.id !== deleteId));
    setIsDeleting(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openNew}
          className="px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service Package</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {services.map((serv, idx) => (
            <motion.div
              key={serv.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.25), ease: EDITORIAL_EASE }}
              className="p-6 rounded-3xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="mono-tag text-xs text-zinc-400 font-semibold">
                      {serv.startingPrice || "Custom"}
                    </span>
                    {serv.title_fa && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[8px] font-mono">
                        FA ✓
                      </span>
                    )}
                  </div>
                  {serv.deliveryTime && (
                    <span className="mono-tag text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {serv.deliveryTime}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-light text-zinc-100">{serv.title}</h3>
                {serv.title_fa && (
                  <p className="text-xs text-zinc-500 mt-0.5 font-light" dir="rtl">{serv.title_fa}</p>
                )}
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2 font-light">
                  {serv.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">/{serv.slug}</span>
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setEditingService(serv);
                      setLangTab("en");
                      setModalOpen(true);
                    }}
                    className="p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-850 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, color: "#f87171" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDeleteId(serv.id || null)}
                    className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:border-red-500/30 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && editingService && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto select-none"
          >
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {editingService.id ? "Edit Service" : "New Service"}
                  </h3>
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
                </div>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                {/* English Tab */}
                {langTab === "en" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Service Title (EN) *</label>
                      <input
                        type="text"
                        required
                        value={editingService.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Graphic Design"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Slug *</label>
                      <input
                        type="text"
                        required
                        value={editingService.slug}
                        onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                        placeholder="graphic-design"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs font-mono focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Short Description (EN) *</label>
                      <textarea
                        rows={2}
                        required
                        value={editingService.shortDescription}
                        onChange={(e) =>
                          setEditingService({ ...editingService, shortDescription: e.target.value })
                        }
                        placeholder="Brief overview in English..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Detailed Description (EN)</label>
                      <textarea
                        rows={3}
                        value={editingService.detailedDescription}
                        onChange={(e) =>
                          setEditingService({ ...editingService, detailedDescription: e.target.value })
                        }
                        placeholder="Full details in English..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Features / Deliverables (EN, comma separated)</label>
                      <textarea
                        rows={3}
                        value={editingService.features}
                        onChange={(e) =>
                          setEditingService({ ...editingService, features: e.target.value })
                        }
                        placeholder="Custom visual concepts, Clean typography, High-resolution exports"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs font-light focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>
                )}

                {/* Dari Tab */}
                {langTab === "fa" && (
                  <div className="space-y-4" dir="rtl">
                    <div>
                      <label className="block text-[11px] font-medium text-emerald-400 mb-1">عنوان خدمت (دری)</label>
                      <input
                        type="text"
                        value={editingService.title_fa || ""}
                        onChange={(e) => setEditingService({ ...editingService, title_fa: e.target.value })}
                        placeholder="مثلاً: طراحی گرافیک"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-emerald-400 mb-1">توضیحات کوتاه (دری)</label>
                      <textarea
                        rows={2}
                        value={editingService.shortDescription_fa || ""}
                        onChange={(e) =>
                          setEditingService({ ...editingService, shortDescription_fa: e.target.value })
                        }
                        placeholder="توضیحات کوتاه برای کارت‌ها و صفحه اصلی..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-emerald-400 mb-1">توضیحات مفصل (دری)</label>
                      <textarea
                        rows={3}
                        value={editingService.detailedDescription_fa || ""}
                        onChange={(e) =>
                          setEditingService({ ...editingService, detailedDescription_fa: e.target.value })
                        }
                        placeholder="توضیحات تفصیلی خدمت به زبان دری..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-emerald-400 mb-1">ویژگی‌ها و اقلام تحویلی (دری، با کامه جدا کنید)</label>
                      <textarea
                        rows={3}
                        value={editingService.features_fa || ""}
                        onChange={(e) =>
                          setEditingService({ ...editingService, features_fa: e.target.value })
                        }
                        placeholder="مفاهیم بصری سفارشی، تایپوگرافی پاک، فایل‌های وکتور با کیفیت بالا"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs font-light focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                )}

                {/* Shared Fields */}
                <div className="pt-4 border-t border-zinc-900 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Icon Name</label>
                      <select
                        value={editingService.icon}
                        onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
                      >
                        <option value="Palette">Palette (Graphic Design)</option>
                        <option value="Sparkles">Sparkles (Branding & Logo)</option>
                        <option value="Layout">Layout (UI/UX)</option>
                        <option value="Code">Code (Web Development)</option>
                        <option value="Layers">Layers (General)</option>
                        <option value="Type">Type (Typography)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Starting Price (optional)</label>
                      <input
                        type="text"
                        value={editingService.startingPrice || ""}
                        onChange={(e) =>
                          setEditingService({ ...editingService, startingPrice: e.target.value })
                        }
                        placeholder="e.g. From $500 (or leave blank)"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingService.active}
                        onChange={(e) => setEditingService({ ...editingService, active: e.target.checked })}
                        className="w-4 h-4 rounded bg-zinc-900 border-zinc-800 text-zinc-100"
                      />
                      <span>Active (فعال)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingService.featured}
                        onChange={(e) =>
                          setEditingService({ ...editingService, featured: e.target.checked })
                        }
                        className="w-4 h-4 rounded bg-zinc-900 border-zinc-800 text-zinc-100"
                      />
                      <span>Feature on Home (نمایش در صفحه اول)</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-900">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-850 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs hover:bg-white transition-colors shadow-sm"
                  >
                    Save Service
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <ConfirmDeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        title="Delete Service Package"
      />
    </div>
  );
}
