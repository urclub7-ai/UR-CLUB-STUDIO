"use client";

import { motion } from "framer-motion";

export default function RootLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 select-none">
      <div className="relative flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0.6, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200 font-bold text-sm shadow-xl"
        >
          NY
        </motion.div>
        <div className="w-24 h-1 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/80">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full bg-gradient-to-r from-transparent via-zinc-400 to-transparent"
          />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          Loading Experience
        </span>
      </div>
    </div>
  );
}
