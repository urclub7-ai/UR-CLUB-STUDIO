"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, ExternalLink, Eye, EyeOff, Briefcase, MapPin, X } from "lucide-react";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";
import {
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/lib/actions/experience-actions";
import { EDITORIAL_EASE, modalBackdropVariants, modalContentVariants } from "@/lib/motion";

interface ExperienceItem {
  id?: string;
  jobTitle: string;
  jobTitle_fa?: string | null;
  company: string;
  company_fa?: string | null;
  employmentType: string;
  employmentType_fa?: string | null;
  location: string;
  location_fa?: string | null;
  startDate: string;
  endDate?: string | null;
  currentlyWorkingHere: boolean;
  description: string;
  description_fa?: string | null;
  responsibilities: string;
  responsibilities_fa?: string | null;
  toolsUsed: string;
  companyLogo?: string | null;
  websiteUrl?: string | null;
  displayOrder: number;
  published: boolean;
}

type LangTab = "en" | "fa";

export default function ExperienceClient({
  initialExperiences,
}: {
  initialExperiences: ExperienceItem[];
}) {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(initialExperiences);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
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
    setEditingExp({
      jobTitle: "",
      jobTitle_fa: "",
      company: "",
      company_fa: "",
      employmentType: "Independent Practice",
      employmentType_fa: "فعالیت مستقل",
      location: "Germany",
      location_fa: "آلمان",
      startDate: "2024",
      endDate: "Present",
      currentlyWorkingHere: true,
      description: "",
      description_fa: "",
      responsibilities: "",
      responsibilities_fa: "",
      toolsUsed: "Figma, Visual Studio Code, Tailwind CSS, Next.js",
      websiteUrl: "",
      displayOrder: experiences.length + 1,
      published: true,
    });
    setLangTab("en");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    if (editingExp.id) {
      await updateExperience(editingExp.id, editingExp);
      setExperiences((prev) =>
        prev.map((exp) => (exp.id === editingExp.id ? editingExp : exp))
      );
    } else {
      const res = await createExperience(editingExp);
      if (res.success && res.data) {
        setExperiences((prev) => [...prev, res.data as ExperienceItem]);
      }
    }

    setModalOpen(false);
    setEditingExp(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await deleteExperience(deleteId);
    setExperiences((prev) => prev.filter((exp) => exp.id !== deleteId));
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
          <span>Add Career Role</span>
        </motion.button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.25), ease: EDITORIAL_EASE }}
              className="p-6 rounded-3xl border border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="mono-tag text-xs text-zinc-400 font-semibold">{exp.company}</span>
                  {exp.company_fa && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[8px] font-mono">
                      FA ✓
                    </span>
                  )}
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs text-zinc-500 font-mono">{exp.location}</span>
                  <span className="mono-tag text-[10px] text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {exp.startDate} – {exp.currentlyWorkingHere ? "Present" : exp.endDate}
                  </span>
                </div>
                <h3 className="text-base font-medium text-zinc-100">{exp.jobTitle}</h3>
                {exp.jobTitle_fa && (
                  <p className="text-xs text-zinc-500 mt-0.5 font-light" dir="rtl">{exp.jobTitle_fa}</p>
                )}
                <p className="text-xs text-zinc-400 mt-1 line-clamp-1 font-light">{exp.description}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setEditingExp(exp);
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
                  onClick={() => setDeleteId(exp.id || null)}
                  className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:border-red-500/30 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && editingExp && (
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
                    {editingExp.id ? "Edit Career Entry" : "New Career Entry"}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Job Title (EN) *</label>
                        <input
                          type="text"
                          required
                          value={editingExp.jobTitle}
                          onChange={(e) => setEditingExp({ ...editingExp, jobTitle: e.target.value })}
                          placeholder="e.g. Independent Web & Graphic Designer"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                        />
                      </div>
                      <div>
                        <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Company / Studio (EN) *</label>
                        <input
                          type="text"
                          required
                          value={editingExp.company}
                          onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                          placeholder="e.g. Independent Projects"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Employment Type (EN)</label>
                        <input
                          type="text"
                          value={editingExp.employmentType}
                          onChange={(e) => setEditingExp({ ...editingExp, employmentType: e.target.value })}
                          placeholder="Independent Practice"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                        />
                      </div>
                      <div>
                        <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Location (EN)</label>
                        <input
                          type="text"
                          value={editingExp.location}
                          onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                          placeholder="Germany"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Overview Description (EN)</label>
                      <textarea
                        rows={2}
                        value={editingExp.description}
                        onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                        placeholder="Overview of your role..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Key Responsibilities (EN, one per line)</label>
                      <textarea
                        rows={4}
                        value={editingExp.responsibilities}
                        onChange={(e) => setEditingExp({ ...editingExp, responsibilities: e.target.value })}
                        placeholder="Building responsive websites with modern frontend...&#10;Creating visual design concepts..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>
                )}

                {/* Dari Tab */}
                {langTab === "fa" && (
                  <div className="space-y-4" dir="rtl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-medium text-emerald-400 mb-1">عنوان شغل (دری)</label>
                        <input
                          type="text"
                          value={editingExp.jobTitle_fa || ""}
                          onChange={(e) => setEditingExp({ ...editingExp, jobTitle_fa: e.target.value })}
                          placeholder="مثلاً: طراح مستقل وب و گرافیک"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-emerald-400 mb-1">کمپنی / نام فعالیت (دری)</label>
                        <input
                          type="text"
                          value={editingExp.company_fa || ""}
                          onChange={(e) => setEditingExp({ ...editingExp, company_fa: e.target.value })}
                          placeholder="مثلاً: پروژه‌های مستقل"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-medium text-emerald-400 mb-1">نوعیت فعالیت (دری)</label>
                        <input
                          type="text"
                          value={editingExp.employmentType_fa || ""}
                          onChange={(e) => setEditingExp({ ...editingExp, employmentType_fa: e.target.value })}
                          placeholder="مثلاً: فعالیت مستقل"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-emerald-400 mb-1">موقعیت (دری)</label>
                        <input
                          type="text"
                          value={editingExp.location_fa || ""}
                          onChange={(e) => setEditingExp({ ...editingExp, location_fa: e.target.value })}
                          placeholder="مثلاً: آلمان"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-emerald-400 mb-1">توضیحات کلی (دری)</label>
                      <textarea
                        rows={2}
                        value={editingExp.description_fa || ""}
                        onChange={(e) => setEditingExp({ ...editingExp, description_fa: e.target.value })}
                        placeholder="توضیحات خلاصه فعالیت به زبان دری..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-emerald-400 mb-1">مسئولیت‌های کلیدی (دری، هر مورد در یک خط)</label>
                      <textarea
                        rows={4}
                        value={editingExp.responsibilities_fa || ""}
                        onChange={(e) => setEditingExp({ ...editingExp, responsibilities_fa: e.target.value })}
                        placeholder="ساخت وبسایت‌های ریسپانسیو با تکنالوژی‌های عصری...&#10;ساخت مفاهیم طراحی بصری..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                )}

                {/* Shared Fields */}
                <div className="pt-4 border-t border-zinc-900 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Start Date</label>
                      <input
                        type="text"
                        value={editingExp.startDate}
                        onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                        placeholder="2024"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">End Date</label>
                      <input
                        type="text"
                        value={editingExp.endDate || ""}
                        onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                        disabled={editingExp.currentlyWorkingHere}
                        placeholder="Present or 2025"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingExp.currentlyWorkingHere}
                        onChange={(e) =>
                          setEditingExp({
                            ...editingExp,
                            currentlyWorkingHere: e.target.checked,
                            endDate: e.target.checked ? "Present" : "",
                          })
                        }
                        className="rounded bg-zinc-900 border-zinc-800 text-zinc-100"
                      />
                      <span>Currently Working Here (در حال حاضر کار می‌کنم)</span>
                    </label>
                  </div>

                  <div>
                    <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Tools Used (comma separated)</label>
                    <input
                      type="text"
                      value={editingExp.toolsUsed}
                      onChange={(e) => setEditingExp({ ...editingExp, toolsUsed: e.target.value })}
                      placeholder="Figma, Illustrator, Next.js, Tailwind CSS"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Website URL (optional)</label>
                    <input
                      type="url"
                      value={editingExp.websiteUrl || ""}
                      onChange={(e) => setEditingExp({ ...editingExp, websiteUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                    />
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
                    Save Entry
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
        title="Delete Experience Entry"
      />
    </div>
  );
}
