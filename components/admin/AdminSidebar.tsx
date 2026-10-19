"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  LayoutDashboard,
  Home,
  User,
  FolderKanban,
  Award,
  Briefcase,
  Sparkles,
  Inbox,
  Settings,
  ExternalLink,
  Palette,
  Globe,
  Users,
} from "lucide-react";

interface AdminSidebarProps {
  unreadCount?: number;
}

const navItems = [
  { href: "/admin/dashboard", label: "داشبورد (Dashboard)", icon: LayoutDashboard },
  { href: "/admin/team", label: "اعضای تیم (Team Members)", icon: Users },
  { href: "/admin/projects", label: "مدیریت پروژه‌ها (Projects)", icon: FolderKanban },
  { href: "/admin/logos", label: "لوگوها و پوسترها (Logos & Posters)", icon: Palette },
  { href: "/admin/websites", label: "وب‌سایت‌های آنلاین (Live Frame)", icon: Globe },
  { href: "/admin/home", label: "محتوای صفحه اصلی (Home)", icon: Home },
  { href: "/admin/about", label: "درباره ما و تیم (About & Team)", icon: User },
  { href: "/admin/messages", label: "پیام‌های دریافتی (Messages)", icon: Inbox, badgeKey: "unread" },
  { href: "/admin/settings", label: "تنظیمات سایت (Settings)", icon: Settings },
];

export default function AdminSidebar({ unreadCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <aside className="w-64 bg-[#08090B] border-r border-[rgba(255,255,255,0.08)] flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      {/* Brand & Animated UR CLUB Logo */}
      <div>
        <div className="p-5 border-b border-[rgba(255,255,255,0.08)]">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            {/* Glowing Transparent UR CLUB Shield Logo */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center p-1"
            >
              <motion.div
                animate={{
                  opacity: [0.25, 0.75, 0.25],
                  scale: [0.92, 1.1, 0.92],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="absolute -inset-1 rounded-full bg-[#00D2FF]/30 blur-md pointer-events-none"
              />
              <div className="relative z-10 w-9 h-9 flex items-center justify-center">
                <Image
                  src="/images/team_logo_transparent.png"
                  alt="UR CLUB Logo"
                  width={36}
                  height={36}
                  priority
                  className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(0,210,255,0.7)] group-hover:drop-shadow-[0_0_18px_rgba(0,210,255,0.95)] transition-all duration-300"
                />
              </div>
            </motion.div>

            <div>
              <h2 className="text-sm font-extrabold text-white tracking-widest group-hover:text-[#00D2FF] transition-colors font-sans">
                UR CLUB
              </h2>
              <span className="text-[10px] text-[#00D2FF] font-mono block">
                Studio Admin Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-3.5 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin/dashboard"
                ? pathname === "/admin/dashboard" || pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#00C3FF]/12 border border-[#00C3FF]/40 text-[#F8FAFC] font-semibold shadow-[0_0_15px_rgba(0, 195, 255,0.18)]"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#14171C] border border-transparent"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId={prefersReducedMotion ? undefined : "admin-active-nav-indicator"}
                    className="absolute inset-0 bg-[#00C3FF]/10 rounded-xl pointer-events-none"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                    }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-[#00C3FF]" : "text-[#94A3B8]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badgeKey === "unread" && unreadCount > 0 ? (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="relative z-10 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00C3FF] text-white shadow-[0_0_8px_#00C3FF]"
                  >
                    {unreadCount}
                  </motion.span>
                ) : (
                  isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C3FF] shadow-[0_0_8px_#00C3FF] shrink-0 relative z-10" />
                  )
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Public Link */}
      <div className="p-3.5 border-t border-[rgba(255,255,255,0.08)]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0D0F12] border border-[rgba(255,255,255,0.08)] hover:border-[#00C3FF]/40 text-[#CBD5E1] hover:text-white hover:bg-[#14171C] text-xs font-medium transition-all duration-200 group shadow-sm"
        >
          <span>مشاهده سایت / Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#00C3FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </aside>
  );
}
