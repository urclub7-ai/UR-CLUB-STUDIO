"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Plus, Trash2, Edit2, Loader2, CheckCircle2, AlertCircle, Layers, X } from "lucide-react";
import { updateAboutContent } from "@/lib/actions/about-actions";
import { createSkill, updateSkill, deleteSkill } from "@/lib/actions/skill-actions";
import ImageUploader from "@/components/admin/ImageUploader";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";
import { EDITORIAL_EASE, modalBackdropVariants, modalContentVariants } from "@/lib/motion";

interface SkillItem {
  id?: string;
  name: string;
  name_fa?: string | null;
  category: string;
  category_fa?: string | null;
  proficiency: number;
  displayOrder: number;
  active: boolean;
}

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    bioSummary: "",
    fullBio: "",
    profilePhotoUrl: "",
    resumeUrl: "",
    location: "Germany",
    yearsOfExperience: 3,
    completedProjects: 20,
    happyClients: 15,
    languages: "Persian / Dari (Native), German (B1), English (Technical)",
  });

  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [deleteSkillId, setDeleteSkillId] = useState<string | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && skillModalOpen) {
        setSkillModalOpen(false);
      }
    },
    [skillModalOpen]
  );

  useEffect(() => {
    if (!skillModalOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [skillModalOpen, handleKeyDown]);

  const loadData = async () => {
    try {
      const res = await fetch("/api/admin-data?type=about");
      if (res.ok) {
        const data = await res.json();
        if (data.about) {
          setFormData({
            ...data.about,
            profilePhotoUrl: data.about.profilePhotoUrl || "",
            resumeUrl: data.about.resumeUrl || "",
          });
        }
        if (data.skills) {
          setSkills(data.skills);
        }
      }
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await updateAboutContent(formData);
      if (res.success) {
        setSuccess("About content updated successfully and persisted to PostgreSQL.");
      } else {
        setError(res.message || "Failed to update about content.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    if (editingSkill.id) {
      await updateSkill(editingSkill.id, editingSkill);
    } else {
      await createSkill(editingSkill);
    }

    setSkillModalOpen(false);
    setEditingSkill(null);
    loadData();
  };

  const handleDeleteSkill = async () => {
    if (!deleteSkillId) return;
    await deleteSkill(deleteSkillId);
    setDeleteSkillId(null);
    loadData();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-zinc-800">
        <div>
          <span className="mono-tag text-xs text-zinc-400 block mb-1">Biography & Capabilities</span>
          <h1 className="text-2xl sm:text-3xl font-light text-zinc-100">About & Skills Manager</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your design philosophy, biography text, profile imagery, CV URL, and technical skills.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAboutSubmit}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save About Info</span>
        </motion.button>
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

      {/* 1. About Information Form */}
      <form onSubmit={handleAboutSubmit} className="space-y-8">
        <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-6">
          <h2 className="text-lg font-medium text-zinc-100 border-b border-zinc-900 pb-3">
            Editorial Biography & Headlines
          </h2>

          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Main Heading</label>
            <textarea
              rows={2}
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Subheading</label>
            <input
              type="text"
              value={formData.subheading}
              onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Short Bio Summary (Home page & cards)</label>
            <textarea
              rows={3}
              value={formData.bioSummary}
              onChange={(e) => setFormData({ ...formData, bioSummary: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Full Biography (About page, separate paragraphs with double newline)</label>
            <textarea
              rows={6}
              value={formData.fullBio}
              onChange={(e) => setFormData({ ...formData, fullBio: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500 font-light"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-zinc-900">
            <ImageUploader
              label="Profile Photo Portrait"
              bucket="profile"
              value={formData.profilePhotoUrl}
              onChange={(url) => setFormData({ ...formData, profilePhotoUrl: url })}
            />

            <div className="space-y-4">
              <div>
                <label className="block mono-tag text-[10px] text-zinc-400 mb-2">CV / Resume PDF URL</label>
                <input
                  type="text"
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  placeholder="/cv-nazif-yosufi.pdf or https://..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Studio Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
                />
              </div>

              <div>
                <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Languages Spoken</label>
                <input
                  type="text"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* 2. Skills & Proficiencies Manager */}
      <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div>
            <h2 className="text-lg font-medium text-zinc-100">Skills & Toolset Disciplines</h2>
            <span className="mono-tag text-[10px] text-zinc-400">Manage individual software, typography, and design proficiencies</span>
          </div>

          <button
            onClick={() => {
              setEditingSkill({
                name: "",
                name_fa: "",
                category: "DESIGN",
                proficiency: 90,
                displayOrder: skills.length + 1,
                active: true,
              });
              setSkillModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 rounded-2xl border border-zinc-850 bg-zinc-900/40 flex items-center justify-between"
            >
              <div>
                <span className="mono-tag text-[9px] text-zinc-400 block">{skill.category}</span>
                <h4 className="text-sm font-medium text-zinc-200">{skill.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-16 bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-zinc-300 h-full rounded-full" style={{ width: `${skill.proficiency}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{skill.proficiency}%</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setEditingSkill(skill);
                    setSkillModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteSkillId(skill.id || null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Modal */}
      <AnimatePresence>
        {skillModalOpen && editingSkill && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSkillModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none"
          >
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                <h3 className="text-lg font-semibold text-zinc-100">
                  {editingSkill.id ? "Edit Skill" : "Add New Skill"}
                </h3>
                <button
                  type="button"
                  onClick={() => setSkillModalOpen(false)}
                  className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveSkill} className="space-y-4">
                <div>
                  <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Skill Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={editingSkill.name}
                    onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                    placeholder="e.g. Graphic Design, Frontend Development"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-emerald-400 mb-1 font-medium">نام مهارت (دری)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={editingSkill.name_fa || ""}
                    onChange={(e) => setEditingSkill({ ...editingSkill, name_fa: e.target.value })}
                    placeholder="مثلاً: طراحی گرافیک، توسعه فرانت‌اند"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Category *</label>
                  <select
                    value={editingSkill.category}
                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
                  >
                    <option value="DESIGN">DESIGN (طراحی بصری و گرافیک)</option>
                    <option value="WEB">WEB (توسعه وب و فرانت‌اند)</option>
                    <option value="TECHNOLOGY">TECHNOLOGY (تکنالوژی و سیستم‌ها)</option>
                    <option value="AI & MODERN TECHNOLOGY">AI & MODERN TECHNOLOGY (هوش مصنوعی و تکنالوژی عصری)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="mono-tag text-[10px] text-zinc-400">Proficiency Score</label>
                    <span className="mono-tag text-xs text-zinc-300">{editingSkill.proficiency}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={editingSkill.proficiency}
                    onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: parseInt(e.target.value) })}
                    className="w-full accent-zinc-100"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-900">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setSkillModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-850 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs hover:bg-white transition-all shadow-sm"
                  >
                    Save Skill
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Dialog */}
      <ConfirmDeleteDialog
        isOpen={!!deleteSkillId}
        onClose={() => setDeleteSkillId(null)}
        onConfirm={handleDeleteSkill}
        title="Delete Skill Record"
      />
    </div>
  );
}

