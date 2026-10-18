"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, ExternalLink, Star, Eye, EyeOff, Award, FileText, CheckCircle2, X, Languages } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import ImageUploader from "@/components/admin/ImageUploader";
import ConfirmDeleteDialog from "@/components/admin/ConfirmDeleteDialog";
import {
  createCertificate,
  updateCertificate,
  deleteCertificate,
  toggleCertificatePublished,
  toggleCertificateFeatured,
} from "@/lib/actions/certificate-actions";
import { EDITORIAL_EASE, modalBackdropVariants, modalContentVariants } from "@/lib/motion";

interface CertificateItem {
  id?: string;
  title: string;
  title_fa?: string | null;
  issuer: string;
  issuer_fa?: string | null;
  issueDate: string;
  expirationDate?: string | null;
  expirationDate_fa?: string | null;
  credentialId?: string | null;
  score?: string | null;
  verificationUrl?: string | null;
  description?: string | null;
  description_fa?: string | null;
  certificateImage?: string | null;
  pdfFile?: string | null;
  skillsCovered?: string | null;
  skillsCovered_fa?: string | null;
  featured: boolean;
  published: boolean;
  displayOrder: number;
}

type LangTab = "en" | "fa";

export default function CertificatesClient({
  initialCertificates,
}: {
  initialCertificates: CertificateItem[];
}) {
  const [certificates, setCertificates] = useState<CertificateItem[]>(initialCertificates);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificateItem | null>(null);
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
    setEditingCert({
      title: "",
      title_fa: "",
      issuer: "",
      issuer_fa: "",
      issueDate: "2026",
      expirationDate: "Lifetime",
      expirationDate_fa: "اعتبار دایمی",
      credentialId: "",
      verificationUrl: "",
      description: "",
      description_fa: "",
      certificateImage: "",
      pdfFile: "",
      skillsCovered: "",
      skillsCovered_fa: "",
      featured: false,
      published: true,
      displayOrder: certificates.length + 1,
    });
    setLangTab("en");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    if (editingCert.id) {
      await updateCertificate(editingCert.id, editingCert);
      setCertificates((prev) =>
        prev.map((c) => (c.id === editingCert.id ? editingCert : c))
      );
    } else {
      const res = await createCertificate(editingCert);
      if (res.success && res.data) {
        setCertificates((prev) => [...prev, res.data as CertificateItem]);
      }
    }

    setModalOpen(false);
    setEditingCert(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await deleteCertificate(deleteId);
    setCertificates((prev) => prev.filter((c) => c.id !== deleteId));
    setIsDeleting(false);
    setDeleteId(null);
  };

  const handleTogglePublished = async (id?: string, current?: boolean) => {
    if (!id) return;
    const next = !current;
    setCertificates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, published: next } : c))
    );
    await toggleCertificatePublished(id, next);
  };

  const handleToggleFeatured = async (id?: string, current?: boolean) => {
    if (!id) return;
    const next = !current;
    setCertificates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, featured: next } : c))
    );
    await toggleCertificateFeatured(id, next);
  };

  const LangTabSwitcher = () => (
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
  );

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
          <span>Add Certificate</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.25), ease: EDITORIAL_EASE }}
              className="p-6 rounded-3xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="mono-tag text-[9px] px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {cert.issuer}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {cert.title_fa && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[8px] font-mono">
                        FA ✓
                      </span>
                    )}
                    {cert.featured && <StatusBadge status="FEATURED" />}
                    <StatusBadge status={cert.published ? "PUBLISHED" : "DRAFT"} />
                  </div>
                </div>

                <h3 className="text-base font-medium text-zinc-100">{cert.title}</h3>
                {cert.title_fa && (
                  <p className="text-xs text-zinc-500 mt-0.5 font-light" dir="rtl">{cert.title_fa}</p>
                )}
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2 font-light">
                  {cert.description}
                </p>

                {cert.credentialId && (
                  <div className="mt-3 text-[10px] font-mono text-zinc-500 bg-zinc-900/80 px-2 py-1 rounded border border-zinc-850 inline-block">
                    ID: {cert.credentialId}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleToggleFeatured(cert.id, cert.featured)}
                    title="Toggle Featured"
                    className={`p-2 rounded-lg border text-xs transition-colors ${
                      cert.featured
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                    }`}
                  >
                    <Star className="w-3.5 h-3.5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleTogglePublished(cert.id, cert.published)}
                    title="Toggle Published"
                    className={`p-2 rounded-lg border text-xs transition-colors ${
                      cert.published
                        ? "bg-[#00C3FF]/15 text-[#00C3FF] border-[#00C3FF]/40 shadow-[0_0_8px_rgba(0, 195, 255,0.2)]"
                        : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                    }`}
                  >
                    {cert.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </motion.button>
                </div>

                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setEditingCert(cert);
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
                    onClick={() => setDeleteId(cert.id || null)}
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
        {modalOpen && editingCert && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
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
                    {editingCert.id ? "Edit Certificate" : "New Certificate"}
                  </h3>
                  <LangTabSwitcher />
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
                {/* ===== ENGLISH TAB ===== */}
                {langTab === "en" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-900 px-2 py-0.5 rounded">🇬🇧 English Fields</span>
                    </div>

                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Title (EN) *</label>
                      <input
                        type="text"
                        required
                        value={editingCert.title}
                        onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                        placeholder="e.g. Computer Hardware Basics"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Issuer Organization (EN) *</label>
                        <input
                          type="text"
                          required
                          value={editingCert.issuer}
                          onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                          placeholder="e.g. Cisco Networking Academy"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                        />
                      </div>
                      <div>
                        <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Issue Date *</label>
                        <input
                          type="text"
                          required
                          value={editingCert.issueDate}
                          onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Expiration / Validity (EN)</label>
                        <input
                          type="text"
                          value={editingCert.expirationDate || ""}
                          onChange={(e) => setEditingCert({ ...editingCert, expirationDate: e.target.value })}
                          placeholder="e.g. Lifetime Credential"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                        />
                      </div>
                      <div>
                        <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Credential ID / Code</label>
                        <input
                          type="text"
                          value={editingCert.credentialId || ""}
                          onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs font-mono focus:outline-none focus:border-zinc-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Verification URL</label>
                      <input
                        type="url"
                        value={editingCert.verificationUrl || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, verificationUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Description (EN)</label>
                      <textarea
                        rows={3}
                        value={editingCert.description || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                        placeholder="Describe the certificate in English..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Skills Covered (EN, comma separated)</label>
                      <input
                        type="text"
                        value={editingCert.skillsCovered || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, skillsCovered: e.target.value })}
                        placeholder="e.g. Computer Hardware, Networking, Troubleshooting"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>
                )}

                {/* ===== DARI / FARSI TAB ===== */}
                {langTab === "fa" && (
                  <div className="space-y-4" dir="rtl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">🇦🇫 فیلدهای دری</span>
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1 font-medium">عنوان سرتیفیکت (دری)</label>
                      <input
                        type="text"
                        value={editingCert.title_fa || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, title_fa: e.target.value })}
                        placeholder="مثلاً: اساسات سخت‌افزار کمپیوتر"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1 font-medium">سازمان صادرکننده (دری)</label>
                      <input
                        type="text"
                        value={editingCert.issuer_fa || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, issuer_fa: e.target.value })}
                        placeholder="مثلاً: اکادمی شبکه سیسکو"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1 font-medium">اعتبار / مدت (دری)</label>
                      <input
                        type="text"
                        value={editingCert.expirationDate_fa || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, expirationDate_fa: e.target.value })}
                        placeholder="مثلاً: اعتبار دایمی"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1 font-medium">توضیحات (دری)</label>
                      <textarea
                        rows={3}
                        value={editingCert.description_fa || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, description_fa: e.target.value })}
                        placeholder="توضیحات سرتیفیکت ره به دری بنویسید..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1 font-medium">مهارت‌های پوشش‌داده‌شده (دری، با کامه جدا کنید)</label>
                      <input
                        type="text"
                        value={editingCert.skillsCovered_fa || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, skillsCovered_fa: e.target.value })}
                        placeholder="مثلاً: سخت‌افزار کمپیوتر، شبکه، عیب‌یابی"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>
                )}

                {/* ===== SHARED FIELDS (always visible) ===== */}
                <div className="pt-4 border-t border-zinc-800 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-900 px-2 py-0.5 rounded">📎 Shared / Media</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Score</label>
                      <input
                        type="text"
                        value={editingCert.score || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, score: e.target.value })}
                        placeholder="e.g. 93.33% or Verified"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUploader
                      label="Certificate Image Preview"
                      value={editingCert.certificateImage}
                      onChange={(url) => setEditingCert({ ...editingCert, certificateImage: url })}
                      bucket="certificates"
                    />

                    <ImageUploader
                      label="Certificate PDF File"
                      value={editingCert.pdfFile}
                      onChange={(url) => setEditingCert({ ...editingCert, pdfFile: url })}
                      bucket="certificates"
                      helperText="Upload official PDF or enter URL"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                      <input
                        type="checkbox"
                        checked={editingCert.published}
                        onChange={(e) => setEditingCert({ ...editingCert, published: e.target.checked })}
                        className="rounded bg-zinc-900 border-zinc-800 text-zinc-100"
                      />
                      <span>Published</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                      <input
                        type="checkbox"
                        checked={editingCert.featured}
                        onChange={(e) => setEditingCert({ ...editingCert, featured: e.target.checked })}
                        className="rounded bg-zinc-900 border-zinc-800 text-zinc-100"
                      />
                      <span>Feature on Home</span>
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
                    Save Certificate
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
        title="Delete Certificate Record"
      />
    </div>
  );
}
