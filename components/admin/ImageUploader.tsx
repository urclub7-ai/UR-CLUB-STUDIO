"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, Link2, Check, Image as ImageIcon } from "lucide-react";
import { uploadAssetAction } from "@/lib/actions/storage-actions";
import type { StorageBucket } from "@/lib/supabase";

interface ImageUploaderProps {
  value?: string | null;
  onChange: (url: string) => void;
  bucket?: StorageBucket;
  label?: string;
  helperText?: string;
}

export default function ImageUploader({
  value,
  onChange,
  bucket = "portfolio",
  label = "Upload Image",
  helperText = "PNG, JPG, WEBP or SVG up to 10MB",
}: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualUrl, setManualUrl] = useState(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadAssetAction(formData, bucket);
      if (res.success && res.data?.url) {
        onChange(res.data.url);
        setManualUrl(res.data.url);
      } else {
        setError(res.message || "Upload failed");
      }
    } catch {
      setError("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleManualApply = () => {
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setError(null);
    }
  };

  const handleRemove = () => {
    onChange("");
    setManualUrl("");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="mono-tag text-[11px] text-zinc-400 block">{label}</label>
        <button
          type="button"
          onClick={() => setManualMode(!manualMode)}
          className="text-[10px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors"
        >
          <Link2 className="w-3 h-3" />
          <span>{manualMode ? "Switch to File Upload" : "Enter Direct URL"}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#08090B] group shadow-inner"
          >
            <div
              className="absolute inset-0 bg-cover bg-center blur-xl opacity-25 scale-125 pointer-events-none"
              style={{ backgroundImage: `url(${value})` }}
            />
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              className="object-contain p-2 relative z-10 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px] z-20">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.1)] text-xs text-[#F8FAFC] font-medium hover:bg-white hover:text-[#08090B] transition-colors shadow-md"
              >
                تغییر عکس / Replace
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleRemove}
                className="p-2 rounded-xl bg-[#00C3FF]/20 text-[#00C3FF] border border-[#00C3FF]/40 hover:bg-[#00C3FF] hover:text-white transition-all shadow-md"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ) : manualMode ? (
          <motion.div
            key="manual"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex gap-2"
          >
            <input
              type="url"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-zinc-500 placeholder:text-zinc-600 transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleManualApply}
              className="px-4 py-3 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs hover:bg-white transition-colors flex items-center gap-1 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer border-2 border-dashed border-zinc-800 hover:border-zinc-600 rounded-2xl p-8 text-center bg-zinc-950/40 hover:bg-zinc-900/30 transition-all duration-300 flex flex-col items-center justify-center group"
          >
            {loading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
                <span className="text-xs text-zinc-400 font-mono">Uploading to Supabase Storage...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-zinc-200 group-hover:scale-110 group-hover:border-zinc-700 transition-all">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs text-zinc-300 font-medium mt-1 group-hover:text-white transition-colors">
                  Click to browse or drag file here
                </p>
                <span className="mono-tag text-[10px] text-zinc-400">{helperText}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

