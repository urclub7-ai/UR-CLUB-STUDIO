"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroPreloader() {
  const [show, setShow] = useState(true);
  const [destroyed, setDestroyed] = useState(false);

  const darkDesktopRef = useRef<HTMLVideoElement>(null);
  const darkMobileRef = useRef<HTMLVideoElement>(null);
  const lightDesktopRef = useRef<HTMLVideoElement>(null);
  const lightMobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Play active videos immediately
    const vids = [
      darkDesktopRef.current,
      darkMobileRef.current,
      lightDesktopRef.current,
      lightMobileRef.current,
    ];
    vids.forEach((v) => {
      if (v && v.paused) {
        v.play().catch(() => {});
      }
    });

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
          className="fixed inset-0 z-[99999999] w-screen h-screen flex items-center justify-center select-none overflow-hidden bg-gradient-to-b from-[#E1E1E1] via-[#E8E7E5] to-[#ECEBE9] dark:bg-black pointer-events-none cursor-default"
          data-preloader="true"
          style={{ opacity: 1 }}
        >
          {/* True Fullscreen Video Canvas - Responsive Mobile & Desktop */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
            {/* 1. Dark Mode Mobile Video (Portrait 720x1280) */}
            <video
              ref={darkMobileRef}
              src="/videos/yazdan_intro_dark_mobile.mp4"
              poster="/images/yazdan_intro_dark_mobile_poster.jpg"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={forceDismiss}
              className="w-full h-full object-cover pointer-events-none hidden dark:block md:dark:hidden"
            />

            {/* 2. Dark Mode Desktop Video (Landscape 1280x720) */}
            <video
              ref={darkDesktopRef}
              src="/videos/yazdan_intro_dark.mp4"
              poster="/images/yazdan_intro_dark_poster.jpg"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={forceDismiss}
              className="w-full h-full object-cover pointer-events-none hidden md:dark:block"
            />

            {/* 3. Light Mode Mobile Video (Portrait 720x1280) */}
            <video
              ref={lightMobileRef}
              src="/videos/yazdan_intro_light_mobile.mp4"
              poster="/images/yazdan_intro_light_mobile_poster.jpg"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={forceDismiss}
              className="w-full h-full object-cover pointer-events-none block dark:hidden md:hidden"
            />

            {/* 4. Light Mode Desktop Video (Landscape 1280x720) */}
            <video
              ref={lightDesktopRef}
              src="/videos/yazdan_intro_light.mp4"
              poster="/images/yazdan_intro_light_poster.jpg"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={forceDismiss}
              className="w-full h-full object-cover pointer-events-none hidden md:block md:dark:hidden"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
