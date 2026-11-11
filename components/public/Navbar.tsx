"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Zap, Handshake, MonitorPlay, Sun, Moon } from "lucide-react";
import { YazdanOrderCartIcon, YazdanNavGlobeIcon } from "@/components/ui/YazdanIcons";
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

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // 1. Definite Home/Hero state: when within top 200px
      if (scrollY < 200) {
        setActiveSection("hero-section");
        if (typeof window !== "undefined" && window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
        return;
      }

      // 2. Measure section positions relative to viewport
      const getSectionTop = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return el.getBoundingClientRect().top;
      };

      const projectsTop = getSectionTop("projects-section");
      const aboutTop = getSectionTop("about-section");
      const contactTop = getSectionTop("contact-section");

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );

      // Check if user has genuinely reached the bottom of page (and has scrolled significantly)
      const isAtBottom =
        scrollY > 800 && window.innerHeight + scrollY >= docHeight - 90;

      // Evaluation from bottom to top with generous 350px offset below header
      if (isAtBottom || (contactTop !== null && contactTop <= 350)) {
        setActiveSection("contact-section");
      } else if (aboutTop !== null && aboutTop <= 350) {
        setActiveSection("about-section");
      } else if (projectsTop !== null && projectsTop <= 350) {
        setActiveSection("projects-section");
      } else {
        setActiveSection("hero-section");
      }
    };

    // Check hash on mount/reload with safety
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (["hero-section", "projects-section", "about-section", "contact-section"].includes(hash)) {
        if (window.scrollY > 200) {
          setActiveSection(hash);
        } else {
          setActiveSection("hero-section");
          // Clear stale hash if user is actually at the top
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }
    }

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("hashchange", handleScroll);
    window.addEventListener("resize", throttledScroll);

    // Re-check after layout shifts (e.g. language or theme toggle, fonts loading)
    const t1 = setTimeout(handleScroll, 80);
    const t2 = setTimeout(handleScroll, 300);

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("hashchange", handleScroll);
      window.removeEventListener("resize", throttledScroll);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, language]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { id: string; href: string }
  ) => {
    if (pathname === "/" && (link.href.startsWith("/#") || link.href === "/")) {
      e.preventDefault();
      setActiveSection(link.id);

      if (link.id === "hero-section") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      } else {
        const el = document.getElementById(link.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", `#${link.id}`);
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
              ? "bg-[#090807]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 py-3 shadow-[0_10px_35px_rgba(9,8,7,0.95)]"
              : "bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#D4AF37]/25 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.06)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand: Luxury Gold Emblem & YAZDAN in sleek serif/sans or Nastaliq font */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, { id: "hero-section", href: "/" })}
            className="group flex items-center gap-2.5 sm:gap-3.5 select-none"
            aria-label={isFa ? "یزدان" : "YAZDAN"}
          >
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-[5.5rem] md:h-[5.5rem] shrink-0 flex items-center justify-center drop-shadow-[0_0_24px_rgba(212,175,55,0.85)]">
              <Image
                src="/images/yazdan_emblem_transparent.png"
                alt={isFa ? "لوگوی یزدان" : "YAZDAN Logo"}
                width={96}
                height={96}
                priority
                className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {isFa ? (
              <span className={`text-2xl sm:text-[2.5rem] md:text-[2.75rem] font-bold font-nastaliq transition-all leading-none select-none pt-1.5 ${
                isDark
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-[#F5DEB3] via-[#D4AF37] to-[#C5A880] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:brightness-110"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#705310] group-hover:brightness-110"
              }`}>
                یَزدان
              </span>
            ) : (
              <span className={`text-xl sm:text-[1.85rem] md:text-[2rem] font-bold tracking-[0.22em] transition-colors leading-none font-brand-en ${
                isDark
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-[#F5DEB3] via-[#D4AF37] to-[#C5A880] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:brightness-110"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#705310] group-hover:brightness-110"
              }`}>
                YAZDAN
              </span>
            )}
          </Link>

          {/* Center: Modern Floating Pill Nav (Exact 5 Tabs, dynamic active state) */}
          <nav className={`hidden lg:flex items-center gap-1 px-3.5 py-1.5 rounded-full border backdrop-blur-xl transition-colors duration-300 ${
            isDark
              ? "bg-[#13110E]/85 border-[#D4AF37]/25 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
              : "bg-white/90 border-[#D4AF37]/25 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
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
                        ? "bg-[#D4AF37]/20 text-[#F5DEB3] font-bold border border-[#D4AF37]/45 shadow-[0_0_16px_rgba(212,175,55,0.35)] scale-105"
                        : "bg-[#B8860B]/15 text-[#8B6914] font-bold border border-[#B8860B]/40 shadow-sm scale-105"
                      : isDark
                        ? "text-[#A8A095] font-medium hover:text-white hover:bg-white/5"
                        : "text-[#575048] font-medium hover:text-black hover:bg-black/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Unified Gold Cards (All 3 identical to "دیدن پروژه‌ها" with deep obsidian text #090807) */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* 1. Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              suppressHydrationWarning
              className="h-10 px-3.5 sm:px-4 inline-flex items-center justify-center gap-2 rounded-full cursor-pointer select-none font-bold text-xs sm:text-sm bg-gradient-to-r from-[#E5C396] via-[#D4AF37] to-[#C5A880] text-[#090807] border border-[#B8860B]/40 shadow-[0_4px_16px_rgba(212,175,55,0.32)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.55)] hover:brightness-105 transition-all duration-300"
              title={isDark ? (isFa ? "تغییر به تم روشن" : "Switch to Light Mode") : (isFa ? "تغییر به تم تاریک" : "Switch to Dark Mode")}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-[#090807] shrink-0 animate-[spin_12s_linear_infinite]" />
                  <span>{isFa ? "روشن" : "Light"}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#090807] shrink-0" />
                  <span>{isFa ? "تاریک" : "Dark"}</span>
                </>
              )}
            </button>

            {/* 2. Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-full cursor-pointer select-none font-bold text-xs sm:text-sm bg-gradient-to-r from-[#E5C396] via-[#D4AF37] to-[#C5A880] text-[#090807] border border-[#B8860B]/40 shadow-[0_4px_16px_rgba(212,175,55,0.32)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.55)] hover:brightness-105 transition-all duration-300"
              title={isFa ? "Switch to English" : "تغییر زبان به فارسی"}
              aria-label="Toggle language"
            >
              <span>{isFa ? "English" : "فارسی"}</span>
              <YazdanNavGlobeIcon className="w-4 h-4 shrink-0 text-[#090807]" />
            </button>

            {/* 3. Order Button */}
            <Link
              href="/order"
              className="h-10 px-5 inline-flex items-center justify-center gap-2 rounded-full cursor-pointer select-none font-bold text-xs sm:text-sm bg-gradient-to-r from-[#E5C396] via-[#D4AF37] to-[#C5A880] text-[#090807] border border-[#B8860B]/40 shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.6)] hover:brightness-105 transition-all duration-300"
            >
              <span>{isFa ? "سفارش" : "Order"}</span>
              <YazdanOrderCartIcon className="w-4 h-4 shrink-0 text-[#090807]" />
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {/* Mobile Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              suppressHydrationWarning
              className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-all bg-gradient-to-r from-[#E5C396] via-[#D4AF37] to-[#C5A880] text-[#090807] border border-[#B8860B]/40 shadow-[0_3px_10px_rgba(212,175,55,0.3)]"
              title={isDark ? (isFa ? "تم روشن" : "Light Mode") : (isFa ? "تم تاریک" : "Dark Mode")}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-[#090807]" /> : <Moon className="w-3.5 h-3.5 text-[#090807]" />}
            </button>

            {/* Mobile Language Button */}
            <button
              onClick={toggleLanguage}
              className="h-8 px-2.5 rounded-full text-[11px] font-bold flex items-center gap-1 cursor-pointer bg-gradient-to-r from-[#E5C396] via-[#D4AF37] to-[#C5A880] text-[#090807] border border-[#B8860B]/40 shadow-[0_3px_10px_rgba(212,175,55,0.3)]"
              title={isFa ? "Switch to English" : "تغییر زبان به فارسی"}
              aria-label="Toggle language"
            >
              <span>{isFa ? "EN" : "فا"}</span>
              <YazdanNavGlobeIcon className="w-3 h-3 shrink-0 text-[#090807]" />
            </button>

            {/* Mobile Order Button */}
            <Link
              href="/order"
              className="h-8 px-3 rounded-full text-xs font-bold flex items-center gap-1 bg-gradient-to-r from-[#E5C396] via-[#D4AF37] to-[#C5A880] text-[#090807] border border-[#B8860B]/40 shadow-[0_3px_10px_rgba(212,175,55,0.3)]"
            >
              <span>{isFa ? "سفارش" : "Order"}</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark ? "text-[#D4AF37] hover:bg-[#D4AF37]/10" : "text-stone-800 hover:bg-stone-100"
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
              isDark ? "bg-[#090807]/98 text-[#FDFBF7]" : "bg-[#FAF8F5]/98 text-stone-900 border-l border-stone-200"
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
                          ? "bg-[#D4AF37]/15 text-[#F5DEB3] border-[#D4AF37]/40 font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                          : "bg-[#B8860B]/10 text-[#8B6914] border-[#B8860B]/40 font-bold shadow-sm"
                        : isDark
                          ? "text-stone-300 border-[#D4AF37]/10 hover:text-[#F5DEB3] hover:border-[#D4AF37]/30"
                          : "text-stone-700 border-stone-200 hover:text-[#8B6914] hover:border-[#B8860B]/30"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isActive ? (isDark ? "text-[#D4AF37]" : "text-[#8B6914]") : (isDark ? "text-[#D4AF37]/60" : "text-stone-400")}`} />
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
                    : "bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300"
                }`}
              >
                <span className="flex items-center gap-2">
                  {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-800" />}
                  <span>{isDark ? (isFa ? "تم روشن (حالت روز)" : "Switch to Light Mode") : (isFa ? "تم تاریک (حالت شب)" : "Switch to Dark Mode")}</span>
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded font-mono font-bold ${
                  isDark ? "bg-amber-400/20 text-amber-300" : "bg-stone-800 !text-white"
                }`}>
                  {isDark ? (isFa ? "روشن" : "Light") : (isFa ? "تاریک" : "Dark")}
                </span>
              </button>

              {/* Language Switcher row in Mobile Drawer (Gold pill with obsidian text) */}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between cursor-pointer transition-colors shadow-sm bg-gradient-to-r from-[#E5C396] via-[#D4AF37] to-[#C5A880] text-[#090807] border border-[#B8860B]/40"
              >
                <span className="flex items-center gap-2">
                  <YazdanNavGlobeIcon className="w-4 h-4 text-[#090807]" />
                  <span>{isFa ? "Switch to English" : "تغییر به زبان فارسی"}</span>
                </span>
                <span className="text-xs font-bold text-[#090807]">
                  {isFa ? "English" : "فارسی"}
                </span>
              </button>
            </div>

            <div className={`pt-5 border-t flex flex-col gap-2.5 ${isDark ? "border-[#D4AF37]/20" : "border-stone-200"}`}>
              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-full font-bold text-center text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#E5C396] via-[#D4AF37] to-[#C5A880] text-[#090807] border border-[#B8860B]/40"
              >
                <YazdanOrderCartIcon className="w-4 h-4 text-[#090807]" />
                <span>{isFa ? "ثبت سفارش آنلاین و صدور شناسه" : "Custom Project Order & Configurator"}</span>
              </Link>
              <Link
                href="/#contact-section"
                onClick={(e) => handleNavClick(e, { id: "contact-section", href: "/#contact-section" })}
                className={`w-full py-3 rounded-full border font-semibold text-center text-xs flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? "border-white/15 text-white hover:bg-white/5"
                    : "border-stone-300 text-stone-800 hover:bg-stone-50"
                }`}
              >
                <Handshake className={`w-4 h-4 ${isDark ? "text-[#D4AF37]" : "text-[#8B6914]"}`} />
                <span>{isFa ? "تماس سریع و مشاوره پروژه" : "Quick Contact & Consultation"}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
