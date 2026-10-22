"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Globe, Zap, Handshake, MonitorPlay, ShoppingCart, Sun, Moon } from "lucide-react";
import { EDITORIAL_EASE } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

interface NavbarProps {
  designerName?: string;
  availabilityStatus?: boolean;
}

export default function Navbar({
  designerName = "Digital Engineering Collective",
  availabilityStatus = true,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero-section");
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const isFa = language === "fa";

  // 5 tabs with Order Project placed between About and Contact
  const navLinks = [
    { id: "hero-section", href: "/", label: isFa ? "صفحه اصلی" : "Home" },
    { id: "projects-section", href: "/#projects-section", label: isFa ? "پروژه‌های قبلی" : "Projects" },
    { id: "about-section", href: "/#about-section", label: isFa ? "درباره ما" : "About" },
    { id: "order-page", href: "/order", label: isFa ? "سفارش پروژه" : "Order Project" },
    { id: "contact-section", href: "/#contact-section", label: isFa ? "تماس با ما" : "Contact" },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (pathname !== "/") return;

    // Check hash on mount / reload
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (["hero-section", "projects-section", "about-section", "contact-section"].includes(hash)) {
        setActiveSection(hash);
      }
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 15);

          const getTop = (id: string) => {
            const el = document.getElementById(id);
            if (!el) return null;
            return el.getBoundingClientRect().top + scrollY;
          };

          const projectsTop = getTop("projects-section");
          const aboutTop = getTop("about-section");
          const contactTop = getTop("contact-section");

          const scrollPos = scrollY + 280; // trigger offset for comfortable section recognition
          const isAtBottom =
            window.innerHeight + scrollY >= document.documentElement.scrollHeight - 90;

          if (isAtBottom || (contactTop && scrollPos >= contactTop)) {
            setActiveSection("contact-section");
          } else if (aboutTop && scrollPos >= aboutTop) {
            setActiveSection("about-section");
          } else if (projectsTop && scrollPos >= projectsTop) {
            setActiveSection("projects-section");
          } else {
            setActiveSection("hero-section");
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { id: string; href: string }
  ) => {
    if (pathname === "/" && (link.href.startsWith("/#") || link.href === "/")) {
      e.preventDefault();
      setActiveSection(link.id);

      if (link.id === "hero-section") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      } else {
        const el = document.getElementById(link.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${link.id}`);
        }
      }
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const isHomePage = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHomePage
            ? isDark
              ? "bg-[#040B20]/90 backdrop-blur-xl border-b border-[#00D2FF]/15 py-3 shadow-[0_10px_35px_rgba(4,11,32,0.95)]"
              : "bg-white/90 backdrop-blur-xl border-b border-slate-200/90 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.06)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand: Transparent Glowing Logo & UR CLUB in sleek uppercase English font */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, { id: "hero-section", href: "/" })}
            className="group flex items-center gap-2.5 sm:gap-3 select-none"
            aria-label="UR CLUB"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center drop-shadow-[0_0_18px_rgba(0,210,255,0.85)]">
              <Image
                src="/images/team_logo_transparent.png"
                alt="UR CLUB Logo"
                width={44}
                height={44}
                priority
                className="w-full h-full object-contain"
              />
            </div>

            <span className={`text-xl sm:text-[1.45rem] font-extrabold tracking-widest transition-colors leading-none font-sans ${
              isDark
                ? "text-white group-hover:text-[#00D2FF] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "text-slate-900 group-hover:text-sky-600"
            }`}>
              UR CLUB
            </span>
          </Link>

          {/* Center: Modern Floating Pill Nav (Exact 5 Tabs, dynamic active state) */}
          <nav className={`hidden lg:flex items-center gap-1 px-3.5 py-1.5 rounded-full border backdrop-blur-xl transition-colors duration-300 ${
            isDark
              ? "bg-[#081432]/85 border-[#00D2FF]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              : "bg-slate-100/90 border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          }`}>
            {navLinks.map((link) => {
              const isActive = pathname === "/" ? activeSection === link.id : pathname === link.href;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-xs px-4 py-1.5 rounded-full transition-all duration-300 select-none ${
                    isActive
                      ? isDark
                        ? "bg-[#00D2FF]/20 text-[#00D2FF] font-bold border border-[#00D2FF]/40 shadow-[0_0_16px_rgba(0,210,255,0.35)] scale-105"
                        : "bg-white text-sky-700 font-bold border border-sky-300 shadow-sm scale-105"
                      : isDark
                        ? "text-[#94A3B8] font-medium hover:text-white hover:bg-white/5"
                        : "text-slate-600 font-medium hover:text-slate-900 hover:bg-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Theme Switcher + Language Switcher + سفارش */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`h-10 px-3.5 inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 cursor-pointer select-none font-bold text-xs sm:text-sm ${
                isDark
                  ? "bg-white/[0.08] hover:bg-white/15 text-white border border-white/15 hover:border-[#00D2FF]/40 shadow-[0_0_15px_rgba(0,210,255,0.15)]"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 shadow-sm"
              }`}
              title={isDark ? (isFa ? "تغییر به تم روشن" : "Switch to Light Mode") : (isFa ? "تغییر به تم تاریک" : "Switch to Dark Mode")}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-300 shrink-0 animate-[spin_12s_linear_infinite]" />
                  <span className="hidden xl:inline">{isFa ? "روشن" : "Light"}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700 shrink-0" />
                  <span className="hidden xl:inline">{isFa ? "تاریک" : "Dark"}</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`h-10 px-4 inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 cursor-pointer group select-none text-xs sm:text-sm font-bold ${
                isDark
                  ? "bg-white hover:bg-[#00D2FF] text-[#040B20] shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(0,210,255,0.7)]"
                  : "bg-slate-900 hover:bg-sky-600 text-white shadow-sm"
              }`}
              title={isFa ? "Switch to English" : "تغییر زبان به فارسی"}
              aria-label="Toggle language"
            >
              <span>{isFa ? "English" : "فارسی"}</span>
              <Globe className="w-4 h-4 shrink-0" />
            </button>

            {/* Order Button */}
            <Link
              href="/order"
              className={`h-10 px-5 inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 cursor-pointer group text-xs sm:text-sm font-bold ${
                isDark
                  ? "bg-white hover:bg-[#00D2FF] text-[#040B20] shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(0,210,255,0.7)]"
                  : "bg-sky-600 hover:bg-sky-700 text-white shadow-[0_0_20px_rgba(2,132,199,0.3)]"
              }`}
            >
              <span>{isFa ? "سفارش" : "Order"}</span>
              <ShoppingCart className="w-4 h-4 shrink-0" />
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {/* Mobile Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                isDark
                  ? "bg-white/[0.1] text-amber-300 border border-white/15"
                  : "bg-slate-100 text-slate-800 border border-slate-300 shadow-sm"
              }`}
              title={isDark ? (isFa ? "تم روشن" : "Light Mode") : (isFa ? "تم تاریک" : "Dark Mode")}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-800" />}
            </button>

            {/* Mobile Language Button */}
            <button
              onClick={toggleLanguage}
              className={`h-8 px-2.5 rounded-full text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                isDark
                  ? "bg-white text-[#040B20] shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-slate-900 text-white shadow-sm"
              }`}
              title={isFa ? "Switch to English" : "تغییر زبان به فارسی"}
              aria-label="Toggle language"
            >
              <span>{isFa ? "EN" : "فا"}</span>
              <Globe className="w-3 h-3 shrink-0" />
            </button>

            {/* Mobile Order Button */}
            <Link
              href="/order"
              className={`h-8 px-3 rounded-full text-xs font-bold flex items-center gap-1 ${
                isDark
                  ? "bg-white text-[#040B20] shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-sky-600 text-white shadow-sm"
              }`}
            >
              <span>{isFa ? "سفارش" : "Order"}</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark ? "text-[#00D2FF] hover:bg-[#00D2FF]/10" : "text-slate-800 hover:bg-slate-100"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
            className={`fixed inset-0 z-40 backdrop-blur-2xl pt-20 px-5 pb-8 flex flex-col justify-between lg:hidden overflow-y-auto ${
              isDark ? "bg-[#040B20]/98 text-white" : "bg-white/98 text-slate-900 border-l border-slate-200"
            }`}
          >
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => {
                const isActive = pathname === "/" ? activeSection === link.id : pathname === link.href;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`text-sm font-semibold py-2.5 px-4 rounded-xl border flex items-center justify-between transition-all ${
                      isActive
                        ? isDark
                          ? "bg-[#00D2FF]/15 text-[#00D2FF] border-[#00D2FF]/40 font-bold shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                          : "bg-sky-50 text-sky-700 border-sky-300 font-bold shadow-sm"
                        : isDark
                          ? "text-white/90 border-[#00D2FF]/10 hover:text-[#00D2FF] hover:border-[#00D2FF]/30"
                          : "text-slate-700 border-slate-200 hover:text-sky-600 hover:border-sky-300"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isActive ? (isDark ? "text-[#00D2FF]" : "text-sky-600") : (isDark ? "text-[#00D2FF]/60" : "text-slate-400")}`} />
                  </Link>
                );
              })}

              {/* Theme Toggle row in Mobile Drawer */}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className={`mt-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between cursor-pointer transition-colors shadow-sm ${
                  isDark
                    ? "bg-white/[0.08] hover:bg-white/15 text-white border border-white/15"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
                }`}
              >
                <span className="flex items-center gap-2">
                  {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-800" />}
                  <span>{isDark ? (isFa ? "تم روشن (حالت روز)" : "Switch to Light Mode") : (isFa ? "تم تاریک (حالت شب)" : "Switch to Dark Mode")}</span>
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded font-mono font-bold ${
                  isDark ? "bg-amber-400/20 text-amber-300" : "bg-slate-800 text-white"
                }`}>
                  {isDark ? (isFa ? "روشن" : "Light") : (isFa ? "تاریک" : "Dark")}
                </span>
              </button>

              {/* Language Switcher row in Mobile Drawer */}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between cursor-pointer transition-colors shadow-sm ${
                  isDark
                    ? "bg-white hover:bg-[#00D2FF] text-[#040B20]"
                    : "bg-slate-900 hover:bg-sky-600 text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{isFa ? "Switch to English" : "تغییر به زبان فارسی"}</span>
                </span>
                <span className="text-xs font-bold">
                  {isFa ? "English" : "فارسی"}
                </span>
              </button>
            </div>

            <div className={`pt-5 border-t flex flex-col gap-2.5 ${isDark ? "border-[#00D2FF]/20" : "border-slate-200"}`}>
              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className={`w-full py-3 rounded-full font-bold text-center text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  isDark ? "bg-[#00D2FF] text-[#040B20]" : "bg-sky-600 text-white hover:bg-sky-700"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{isFa ? "ثبت سفارش آنلاین و صدور شناسه" : "Custom Project Order & Configurator"}</span>
              </Link>
              <Link
                href="/#contact-section"
                onClick={(e) => handleNavClick(e, { id: "contact-section", href: "/#contact-section" })}
                className={`w-full py-3 rounded-full border font-semibold text-center text-xs flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? "border-white/15 text-white hover:bg-white/5"
                    : "border-slate-300 text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Handshake className={`w-4 h-4 ${isDark ? "text-[#00D2FF]" : "text-sky-600"}`} />
                <span>{isFa ? "تماس سریع و مشاوره پروژه" : "Quick Contact & Consultation"}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
