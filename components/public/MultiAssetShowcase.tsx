"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  X,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface AssetCardItem {
  id: string;
  type: "logo" | "poster";
  title: string;
  title_fa: string;
  category: string;
  category_fa: string;
  description: string;
  description_fa: string;
  image: string;
}

const ASSET_ITEMS: AssetCardItem[] = [
  {
    id: "logo-ariatech",
    type: "logo",
    title: "AriaTech Cloud Solutions",
    title_fa: "لوگوی فناوری آریا تک",
    category: "Cloud & Software",
    category_fa: "فناوری و نرم‌افزار",
    description: "Minimalist cloud architecture layer emblem.",
    description_fa: "طراحی مینیمال برای پلتفرم‌های ابری و هوش مصنوعی.",
    image: "/showcase/designs/logo_ariatech.png",
  },
  {
    id: "logo-royalcafe",
    type: "logo",
    title: "Royal Coffee & Roastery",
    title_fa: "لوگوی کافه رویال",
    category: "Cafe & Restaurant",
    category_fa: "کافه و رستورانت",
    description: "Warm gold and espresso coffee emblem.",
    description_fa: "نشان‌واره اصیل قهوه با تایپوگرافی طلایی و گرم.",
    image: "/showcase/designs/logo_royalcafe.png",
  },
  {
    id: "logo-saze",
    type: "logo",
    title: "Saze Architecture Studio",
    title_fa: "لوگوی مهندسی سازه",
    category: "Architecture & Design",
    category_fa: "معماری و ساختمانی",
    description: "Isometric geometric cube symbol.",
    description_fa: "طراحی نماد ایزومتریک مکعبی برای شرکت‌های ساختمانی.",
    image: "/showcase/designs/logo_saze.png",
  },
  {
    id: "logo-pishro",
    type: "logo",
    title: "Pishro Currency Exchange",
    title_fa: "لوگوی صرافی پیشرو",
    category: "Fintech & Remittance",
    category_fa: "صرافی و فین‌تک",
    description: "Dynamic dual-arrow currency exchange loop.",
    description_fa: "طراحی نماد چرخه تبادل و انتقال سریع ارزها.",
    image: "/showcase/designs/logo_pishro.png",
  },
  {
    id: "poster-pharmacy",
    type: "poster",
    title: "Shefa 24/7 Pharmacy Poster",
    title_fa: "پوستر دواخانه شفا",
    category: "Promotional Poster",
    category_fa: "پوستر تبلیغاتی",
    description: "24/7 medicine delivery and doctor consultation.",
    description_fa: "معرفی خدمات ادویه، مشاوره و تحویل فوری ۲۴ ساعته.",
    image: "/showcase/designs/poster_pharmacy.png",
  },
  {
    id: "poster-cafe",
    type: "poster",
    title: "Palace Cafe & Lounge Poster",
    title_fa: "پوستر کافه پالاس",
    category: "Promotional Poster",
    category_fa: "پوستر تبلیغاتی",
    description: "Specialty roast, fresh pastries, and workspace.",
    description_fa: "معرفی قهوه دمی تخصصی، دسرها و فضای کار اختصاصی.",
    image: "/showcase/designs/poster_cafe_v2.png",
  },
];

type FilterType = "all" | "logo" | "poster";

export default function MultiAssetShowcase({
  initialAssets,
}: {
  initialAssets?: AssetCardItem[];
} = {}) {
  const assetsList = initialAssets && initialAssets.length > 0 ? initialAssets : ASSET_ITEMS;
  const { language } = useLanguage();
  const isFa = language === "fa";

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedImage, setSelectedImage] = useState<AssetCardItem | null>(null);

  const filteredItems = assetsList.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  return (
    <div className="relative w-full">
      {/* Clean Centered Header Matching Previous Sections */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white">
          {isFa ? "طراحی لوگوها و پوسترهای تبلیغاتی" : "Logos & Promotional Posters"}
        </h2>
        <p className="mt-2.5 text-xs sm:text-base text-[#94A3B8] max-w-xl leading-relaxed">
          {isFa
            ? "نمونه‌های اختصاصی هویت بصری، نشان‌واره‌ها و پوسترهای تجاری"
            : "Custom visual identities, brand emblems, and promotional posters"}
        </p>
      </div>

      {/* Filter Switcher matching other control bars */}
      <div className="mb-8 flex items-center justify-center">
        <div className="flex items-center gap-1 bg-[#081432]/80 p-1.5 rounded-xl border border-white/[0.08]">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeFilter === "all"
                ? "bg-[#00D2FF] text-[#040B20] font-bold shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            {isFa ? "همه طرح‌ها" : "All"}
          </button>
          <button
            onClick={() => setActiveFilter("logo")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeFilter === "logo"
                ? "bg-[#00D2FF] text-[#040B20] font-bold shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            {isFa ? "لوگوها" : "Logos"}
          </button>
          <button
            onClick={() => setActiveFilter("poster")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeFilter === "poster"
                ? "bg-[#00D2FF] text-[#040B20] font-bold shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            {isFa ? "پوسترها" : "Posters"}
          </button>
        </div>
      </div>

      {/* Grid of Clean 3-Column Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            className="p-5 sm:p-6 rounded-2xl bg-[#081432]/60 border border-white/[0.08] hover:border-[#00D2FF]/30 transition-all duration-300 flex flex-col justify-between text-right group overflow-hidden"
          >
            <div>
              {/* Image Container with Subtle Zoom */}
              <div
                onClick={() => setSelectedImage(item)}
                className="relative aspect-square rounded-xl overflow-hidden bg-[#040B20] border border-white/[0.05] cursor-pointer flex items-center justify-center p-3 group-hover:scale-[1.02] transition-transform duration-300"
              >
                <Image
                  src={item.image}
                  alt={isFa ? item.title_fa : item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  className="object-contain p-2"
                />
                <div className="absolute inset-0 bg-[#040B20]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 rounded-full bg-[#00D2FF] text-[#040B20] shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Short & Clean Text Details */}
              <div className="mt-4 space-y-1">
                <span className="text-[10px] font-semibold text-[#00D2FF] uppercase tracking-wide block">
                  {isFa ? item.category_fa : item.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00D2FF] transition-colors">
                  {isFa ? item.title_fa : item.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {isFa ? item.description_fa : item.description}
                </p>
              </div>
            </div>

            {/* Bottom Row: View Link & Subtle Watermark */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <button
                onClick={() => setSelectedImage(item)}
                className="text-xs text-[#00D2FF] hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{isFa ? "مشاهده طرح" : "View"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono tracking-widest text-[#94A3B8]/40 uppercase select-none">
                UrClub
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#040B20]/95 backdrop-blur-xl p-4 sm:p-8 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[90vh] rounded-2xl border border-white/[0.12] bg-[#081432] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 left-4 rtl:left-4 rtl:right-auto ltr:right-4 ltr:left-auto z-20 p-2 rounded-full bg-[#040B20]/80 text-[#CBD5E1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Preview Box */}
              <div className="relative md:w-3/5 bg-[#040B20] p-6 flex items-center justify-center min-h-[300px]">
                <div className="relative w-full h-[320px] sm:h-[440px]">
                  <Image
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Specs Box */}
              <div className="md:w-2/5 p-6 sm:p-7 flex flex-col justify-between bg-[#081432] border-t md:border-t-0 md:border-l rtl:md:border-l-0 rtl:md:border-r border-white/[0.08]">
                <div className="space-y-2.5">
                  <span className="text-xs font-semibold text-[#00D2FF] uppercase">
                    {isFa ? selectedImage.category_fa : selectedImage.category}
                  </span>

                  <h4 className="text-lg font-bold text-white">
                    {isFa ? selectedImage.title_fa : selectedImage.title}
                  </h4>

                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    {isFa ? selectedImage.description_fa : selectedImage.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-3">
                  <a
                    href={selectedImage.image}
                    download
                    className="w-full py-2.5 px-4 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isFa ? "دانلود تصویر با کیفیت اصلی" : "Download Original"}</span>
                  </a>

                  {/* Faint watermark at the bottom of modal */}
                  <div className="text-center text-[10px] font-mono tracking-widest text-slate-500/40 uppercase">
                    UrClub &bull; Official Graphic Asset
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
