"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { updateHomeContent } from "@/lib/actions/home-actions";
import ImageUploader from "@/components/admin/ImageUploader";
import { EDITORIAL_EASE } from "@/lib/motion";

export default function AdminHomePage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    heroGreeting: "Visual Designer & Art Director",
    heroTitle: "Distinctive visual identities for bold, visionary brands.",
    heroSubtitle: "Transforming abstract concepts into enduring aesthetics through branding, editorial design, and modern digital craft.",
    heroDescription: "Specializing in high-end brand identity systems, typography, luxury packaging, and digital art direction for global clients.",
    availabilityStatus: true,
    availabilityText: "Available for selected Q3/Q4 2026 commissions",
    heroImageUrl: "",
    profileImageUrl: "",
    primaryCtaText: "Explore Selected Works",
    primaryCtaUrl: "/portfolio",
    secondaryCtaText: "Initiate Project Inquiry",
    secondaryCtaUrl: "/contact",
    stat1Number: "8+",
    stat1Label: "Years Experience",
    stat2Number: "140+",
    stat2Label: "Projects Delivered",
    stat3Number: "18",
    stat3Label: "Design Accolades",
    stat4Number: "100%",
    stat4Label: "Client Satisfaction",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin-data?type=home");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setFormData((prev) => ({
              ...prev,
              ...data,
              heroImageUrl: data.heroImageUrl || "",
              profileImageUrl: data.profileImageUrl || "",
            }));
          }
        }
      } catch {
        // use defaults
      } finally {
        setFetching(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await updateHomeContent(formData);
      if (res.success) {
        setSuccess("Home page content updated successfully and saved to PostgreSQL.");
      } else {
        setError(res.message || "Failed to update home content.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-zinc-800">
        <div>
          <span className="mono-tag text-xs text-zinc-400 block mb-1">Content Management</span>
          <h1 className="text-2xl sm:text-3xl font-light text-zinc-100">Home Page Manager</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Edit hero copy, availability banner, primary and secondary CTAs, and performance metrics.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Changes</span>
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Copy Card */}
        <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-6">
          <h2 className="text-lg font-medium text-zinc-100 border-b border-zinc-900 pb-3">
            Hero Typography & Headlines
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Greeting / Discipline</label>
              <input
                type="text"
                value={formData.heroGreeting}
                onChange={(e) => setFormData({ ...formData, heroGreeting: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Availability Text</label>
              <input
                type="text"
                value={formData.availabilityText}
                onChange={(e) => setFormData({ ...formData, availabilityText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={formData.availabilityStatus}
                onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.checked })}
                className="w-4 h-4 rounded bg-zinc-900 border-zinc-800 text-zinc-100 focus:ring-0"
              />
              <span className="text-xs text-zinc-300">Show &ldquo;Available for Commissions&rdquo; Green Pulse Badge</span>
            </label>
          </div>

          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Main Headline (Hero Title)</label>
            <textarea
              rows={2}
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Hero Subtitle</label>
            <textarea
              rows={2}
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Curation / Card Description</label>
            <textarea
              rows={2}
              value={formData.heroDescription}
              onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500"
            />
          </div>
        </div>

        {/* Hero Visuals & CTAs */}
        <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-6">
          <h2 className="text-lg font-medium text-zinc-100 border-b border-zinc-900 pb-3">
            Imagery & Call to Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ImageUploader
              label="Hero Showcase Artwork"
              bucket="site"
              value={formData.heroImageUrl}
              onChange={(url) => setFormData({ ...formData, heroImageUrl: url })}
            />
            <ImageUploader
              label="Profile Photo (About preview)"
              bucket="profile"
              value={formData.profileImageUrl}
              onChange={(url) => setFormData({ ...formData, profileImageUrl: url })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-900">
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Primary CTA Text</label>
              <input
                type="text"
                value={formData.primaryCtaText}
                onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
              />
            </div>
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Primary CTA URL</label>
              <input
                type="text"
                value={formData.primaryCtaUrl}
                onChange={(e) => setFormData({ ...formData, primaryCtaUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
              />
            </div>
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Secondary CTA Text</label>
              <input
                type="text"
                value={formData.secondaryCtaText}
                onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
              />
            </div>
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-2">Secondary CTA URL</label>
              <input
                type="text"
                value={formData.secondaryCtaUrl}
                onChange={(e) => setFormData({ ...formData, secondaryCtaUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-6">
          <h2 className="text-lg font-medium text-zinc-100 border-b border-zinc-900 pb-3">
            Key Statistics & Counters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Stat 1 Value</label>
              <input
                type="text"
                value={formData.stat1Number}
                onChange={(e) => setFormData({ ...formData, stat1Number: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs mb-2"
              />
              <input
                type="text"
                value={formData.stat1Label}
                onChange={(e) => setFormData({ ...formData, stat1Label: e.target.value })}
                placeholder="Label"
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px]"
              />
            </div>

            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Stat 2 Value</label>
              <input
                type="text"
                value={formData.stat2Number}
                onChange={(e) => setFormData({ ...formData, stat2Number: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs mb-2"
              />
              <input
                type="text"
                value={formData.stat2Label}
                onChange={(e) => setFormData({ ...formData, stat2Label: e.target.value })}
                placeholder="Label"
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px]"
              />
            </div>

            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Stat 3 Value</label>
              <input
                type="text"
                value={formData.stat3Number}
                onChange={(e) => setFormData({ ...formData, stat3Number: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs mb-2"
              />
              <input
                type="text"
                value={formData.stat3Label}
                onChange={(e) => setFormData({ ...formData, stat3Label: e.target.value })}
                placeholder="Label"
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px]"
              />
            </div>

            <div>
              <label className="block mono-tag text-[10px] text-zinc-400 mb-1">Stat 4 Value</label>
              <input
                type="text"
                value={formData.stat4Number}
                onChange={(e) => setFormData({ ...formData, stat4Number: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs mb-2"
              />
              <input
                type="text"
                value={formData.stat4Label}
                onChange={(e) => setFormData({ ...formData, stat4Label: e.target.value })}
                placeholder="Label"
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Home Content</span>
          </button>
        </div>
      </form>
    </div>
  );
}

