"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EDITORIAL_EASE } from "@/lib/motion";

export default function PageTransitionBar() {
  const pathname = usePathname();
  const [animating, setAnimating] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Trigger the micro progress indicator on navigation
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (prefersReducedMotion || !animating) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none h-[2px] overflow-hidden">
      <AnimatePresence>
        {animating && (
          <motion.div
            initial={{ x: "-100%", opacity: 0.9 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.38,
              ease: EDITORIAL_EASE,
            }}
            className="w-full h-full bg-gradient-to-r from-transparent via-zinc-200 to-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

