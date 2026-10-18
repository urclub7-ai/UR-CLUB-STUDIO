"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, User } from "lucide-react";
import { logoutAdmin } from "@/lib/actions/auth-actions";

interface AdminHeaderProps {
  adminName?: string;
  adminEmail?: string;
}

export default function AdminHeader({
  adminName = "Nazif Yosufi",
  adminEmail = "admin@portfolio.com",
}: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="h-16 bg-[#08090B]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] px-8 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* System Status Pill with Red Pulsing Glow */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-[11px] text-[#CBD5E1] font-medium shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C3FF] opacity-80 duration-1000"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C3FF] shadow-[0_0_8px_#00C3FF]"></span>
          </span>
          <span className="font-mono text-[#F8FAFC]">System Online</span>
          <span className="text-[#555860]">·</span>
          <span className="text-[#94A3B8]">Admin Control</span>
        </div>
      </div>

      {/* Admin Profile & Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-right">
          <div>
            <span className="text-xs font-semibold text-[#F8FAFC] block">{adminName}</span>
            <span className="text-[10px] text-[#94A3B8] font-mono block">{adminEmail}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#14171C] border border-[#00C3FF]/30 flex items-center justify-center text-[#00C3FF] shadow-[0_0_10px_rgba(0, 195, 255,0.15)]">
            <User className="w-4 h-4" />
          </div>
        </div>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          title="خروج از حساب / Sign Out"
          className="p-2 rounded-lg bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:text-[#00C3FF] hover:border-[#00C3FF]/40 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </motion.button>
      </div>
    </header>
  );
}
