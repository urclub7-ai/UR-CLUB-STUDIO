"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroPreloader() {
  const [show, setShow] = useState(true);
  const [destroyed, setDestroyed] = useState(false);

  const darkVideoRef = useRef<HTMLVideoElement>(null);
  const lightVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Play active video if not playing
    const isDark = document.documentElement.classList.contains("dark");
    const activeVideo = isDark ? darkVideoRef.current : lightVideoRef.current;
    if (activeVideo && activeVideo.paused) {
      activeVideo.play().catch(() => {});
    }

    // Dismiss smoothly at 2.85s while video is still in motion
    const dismissTimer = setTimeout(() => {
      forceDismiss();
    }, 2850);

    // Hard unmount guarantee at 3.3s
    const destroyTimer = setTimeout(() => {
      setDestroyed(true);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    }, 3300);

    return () => {
      clearTimeout(dismissTimer);
      clearTimeout(destroyTimer);
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

  if (destroyed) return null;

  return (
    <AnimatePresence onExitComplete={() => setDestroyed(true)}>
      {show && (
        <motion.div
          key="intro-splash-video"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[99999999] w-screen h-screen flex items-center justify-center select-none overflow-hidden bg-gradient-to-b from-[#E1E1E1] via-[#E8E7E5] to-[#ECEBE9] dark:from-[#131210] dark:via-[#090807] dark:to-[#050505] pointer-events-none cursor-default"
          data-preloader="true"
          style={{ opacity: 1 }}
        >
          {/* True Fullscreen Video Canvas - Zero margins, Zero borders, No skip */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
            {/* Dark Mode Video with Instant First-Frame Poster */}
            <video
              ref={darkVideoRef}
              src="/videos/yazdan_intro_dark.mp4"
              poster="/images/yazdan_intro_dark_poster.jpg"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={forceDismiss}
              className="w-full h-full object-contain md:object-cover hidden dark:block pointer-events-none"
            />

            {/* Light Mode Video with Instant First-Frame Poster */}
            <video
              ref={lightVideoRef}
              src="/videos/yazdan_intro_light.mp4"
              poster="/images/yazdan_intro_light_poster.jpg"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={forceDismiss}
              className="w-full h-full object-contain md:object-cover block dark:hidden pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
