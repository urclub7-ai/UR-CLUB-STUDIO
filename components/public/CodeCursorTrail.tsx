"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EDITORIAL_EASE } from "@/lib/motion";

interface TrailItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  src: string;
  text: string;
  width: number;
}

const TRAIL_DATA = [
  { text: "HELLO, WORLD", src: "/trail/hello_world.png", width: 190 },
  { text: "ERROR", src: "/trail/error.png", width: 110 },
  { text: "PRINT", src: "/trail/print.png", width: 105 },
  { text: "404", src: "/trail/404.png", width: 85 },
  { text: "IMPORT", src: "/trail/import.png", width: 120 },
];

const DISTANCE_THRESHOLD = 36; // px distance to drop next item
const MAX_ACTIVE_ITEMS = 8;    // maximum concurrent trail items
const ITEM_LIFETIME = 600;     // Disappears quickly and smoothly (600ms)

export default function CodeCursorTrail() {
  const [items, setItems] = useState<TrailItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const counterRef = useRef<number>(0);
  const idRef = useRef<number>(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const spawn = useCallback((x: number, y: number) => {
    const idx = counterRef.current % TRAIL_DATA.length;
    counterRef.current += 1;

    const data = TRAIL_DATA[idx];
    const id = ++idRef.current;
    // Elegant slight rotation between -10 deg and +10 deg
    const rotation = (Math.random() - 0.5) * 20;

    const newItem: TrailItem = {
      id,
      x,
      y,
      rotation,
      src: data.src,
      text: data.text,
      width: data.width,
    };

    setItems((prev) => {
      const next = [...prev, newItem];
      return next.length > MAX_ACTIVE_ITEMS ? next.slice(next.length - MAX_ACTIVE_ITEMS) : next;
    });

    // Individual item fade-out timer
    setTimeout(() => {
      setItems((prev) => prev.filter((it) => it.id !== id));
    }, ITEM_LIFETIME);
  }, []);

  const handlePoint = useCallback(
    (x: number, y: number) => {
      // Clear any pending mouse idle timer
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      // If mouse stops moving for 220ms, smoothly clear all remaining items quickly
      idleTimerRef.current = setTimeout(() => {
        setItems([]);
        lastPosRef.current = null;
      }, 220);

      if (!lastPosRef.current) {
        lastPosRef.current = { x, y };
        spawn(x, y);
        return;
      }

      const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);
      if (dist >= DISTANCE_THRESHOLD) {
        lastPosRef.current = { x, y };
        spawn(x, y);
      }
    },
    [spawn]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const targetElement = containerRef.current.parentElement || containerRef.current;
      const rect = targetElement.getBoundingClientRect();

      // STRICT CHECK: Only active inside the Hero section bounds
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        handlePoint(x, y);
      } else {
        lastPosRef.current = null;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [handlePoint]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none"
      aria-hidden="true"
    >
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              scale: 0.35,
              rotate: item.rotation * 1.3,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: item.rotation,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              filter: "blur(3px)",
              transition: { duration: 0.26, ease: EDITORIAL_EASE },
            }}
            transition={{
              duration: 0.18,
              ease: EDITORIAL_EASE,
            }}
            style={{
              position: "absolute",
              left: `${item.x - item.width / 2}px`,
              top: `${item.y - 20}px`,
              zIndex: item.id,
            }}
            className="pointer-events-none select-none will-change-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.text}
              style={{ width: `${item.width}px`, height: "auto" }}
              className="select-none pointer-events-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]"
              draggable={false}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
