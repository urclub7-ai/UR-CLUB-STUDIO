"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARACTERS = Array.from("𝓤𝓡 𝓒𝓛𝓤𝓑");

// Smooth staggered typing variants
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const charVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function IntroPreloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // 1. Text typing finishes at ~0.62s (7 chars * 80ms + 50ms delay)
    // 2. Holds for ~0.5s as requested ("حدود 0.5 ثانیه بماند و بعد محو شود")
    // 3. Closes at ~1150ms with 350ms fade-out -> Total ~1.5s total (fast and responsive)
    const dismissTimer = setTimeout(() => {
      forceDismiss();
    }, 1150);

    return () => {
      clearTimeout(dismissTimer);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };
  }, []);

  const forceDismiss = () => {
    setShow(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            pointerEvents: "none",
            transition: { duration: 0.35, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[99999999] flex items-center justify-center bg-[#040e26] select-none cursor-pointer"
          onClick={forceDismiss}
        >
          <div className="relative flex items-center justify-center px-4" dir="ltr">
            {/* ─── Ultra-Smooth Typewriter Reveal with Subtle Glow and No Keyboard Cursor ─── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 text-center tracking-wider text-white font-black flex items-center justify-center select-none"
              style={{
                textShadow:
                  "0 0 10px rgba(255, 255, 255, 0.8), 0 0 24px rgba(255, 255, 255, 0.4)",
              }}
            >
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl select-none inline-flex items-center">
                {CHARACTERS.map((char, index) => (
                  <motion.span
                    key={index}
                    variants={charVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
