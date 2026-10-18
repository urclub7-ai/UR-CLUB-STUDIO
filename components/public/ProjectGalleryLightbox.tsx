"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { EDITORIAL_EASE, modalBackdropVariants } from "@/lib/motion";

interface GalleryImage {
  id: string;
  imageUrl: string;
  altText?: string | null;
  caption?: string | null;
}

interface LightboxProps {
  images: GalleryImage[];
}

export default function ProjectGalleryLightbox({ images }: LightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const handleNext = useCallback(() => {
    if (selectedIndex === null || images.length <= 1) return;
    setDirection(1);
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
  }, [selectedIndex, images.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null || images.length <= 1) return;
    setDirection(-1);
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
  }, [selectedIndex, images.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation support (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleClose, handleNext, handlePrev]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Gallery Grid with Scroll Entrance */}
      <div className="space-y-8 lg:space-y-12">
        {images.map((img, idx) => (
          <motion.div
            key={img.id || idx}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: Math.min(idx * 0.1, 0.3), ease: EDITORIAL_EASE }}
            onClick={() => {
              setDirection(0);
              setSelectedIndex(idx);
            }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg hover:border-zinc-700 transition-all duration-500"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
              <Image
                src={img.imageUrl}
                alt={img.altText || `Gallery visual ${idx + 1}`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <div className="p-3 rounded-full bg-black/70 backdrop-blur-md text-[#00C3FF] border border-[#00C3FF]/30 transform-gpu group-hover:scale-105 transition-transform duration-300">
                  <Maximize2 className="w-5 h-5 text-[#00C3FF]" />
                </div>
              </div>
            </div>

            {img.caption && (
              <div className="px-6 py-4 bg-zinc-950/90 border-t border-zinc-850 flex items-center justify-between text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                <span>{img.caption}</span>
                <span className="mono-tag text-[10px] text-zinc-500">
                  Fig. 0{idx + 1}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Modal Lightbox with Smooth Scale + Opacity Physics */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-6 md:p-12"
            onClick={handleClose}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
              <span className="mono-tag text-zinc-400 text-xs">
                Visual {selectedIndex + 1} / {images.length}
              </span>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleClose}
                className="p-2.5 rounded-full bg-zinc-800 text-[#00C3FF] hover:text-white hover:bg-zinc-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                aria-label="Close Lightbox (Esc)"
              >
                <X className="w-6 h-6 text-[#00C3FF]" />
              </motion.button>
            </div>

            {/* Main Stage */}
            <div
              className="relative flex-grow flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          x: direction > 0 ? 25 : direction < 0 ? -25 : 0,
                          scale: 0.98,
                        }
                  }
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          x: direction > 0 ? -25 : direction < 0 ? 25 : 0,
                          scale: 0.98,
                        }
                  }
                  transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                  className="relative max-w-5xl w-full h-full max-h-[75vh]"
                >
                  <Image
                    src={images[selectedIndex].imageUrl}
                    alt={images[selectedIndex].altText || "Enlarged visual"}
                    fill
                    className="object-contain select-none"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Buttons */}
              {images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.08, x: -2 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-2 md:left-6 p-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-[#00C3FF] hover:text-white hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                    aria-label="Previous image (Left arrow)"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#00C3FF]" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08, x: 2 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-2 md:right-6 p-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-[#00C3FF] hover:text-white hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                    aria-label="Next image (Right arrow)"
                  >
                    <ChevronRight className="w-6 h-6 text-[#00C3FF]" />
                  </motion.button>
                </>
              )}
            </div>

            {/* Bottom Caption */}
            {images[selectedIndex].caption && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center z-10 text-xs text-zinc-400 font-light"
                onClick={(e) => e.stopPropagation()}
              >
                {images[selectedIndex].caption}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

