"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Globe, Zap, Handshake, MonitorPlay, ShoppingCart } from "lucide-react";
import { EDITORIAL_EASE } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n";

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
            ? "bg-[#040B20]/90 backdrop-blur-xl border-b border-[#00D2FF]/15 py-3 shadow-[0_10px_35px_rgba(4,11,32,0.95)]"
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

            <span className="text-xl sm:text-[1.45rem] font-extrabold text-white tracking-widest group-hover:text-[#00D2FF] transition-colors leading-none font-sans drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              UR CLUB
            </span>
          </Link>

          {/* Center: Modern Floating Pill Nav (Exact 4 Tabs, Dribbble Style with dynamic active state) */}
          <nav className="hidden lg:flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#081432]/85 border border-[#00D2FF]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            {navLinks.map((link) => {
              const isActive = pathname === "/" ? activeSection === link.id : pathname === link.href;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-xs px-4 py-1.5 rounded-full transition-all duration-300 select-none ${
                    isActive
                      ? "bg-[#00D2FF]/20 text-[#00D2FF] font-bold border border-[#00D2FF]/40 shadow-[0_0_16px_rgba(0,210,255,0.35)] scale-105"
                      : "text-[#94A3B8] font-medium hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons matching User's exact images */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher matching Image 1: [ English 🌐 ] */}
            <button
              onClick={toggleLanguage}
              className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#081432]/90 hover:bg-[#00D2FF]/15 text-white border border-[#00D2FF]/35 hover:border-[#00D2FF]/75 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer select-none shadow-[0_0_15px_rgba(0,210,255,0.15)] hover:shadow-[0_0_20px_rgba(0,210,255,0.35)]"
              title={isFa ? "Switch to English" : "تغییر زبان به فارسی"}
              aria-label="Toggle language"
            >
              <span className="text-white font-semibold text-xs sm:text-sm">{isFa ? "فارسی" : "English"}</span>
              <Globe className="w-4 h-4 text-[#00D2FF] shrink-0" />
            </button>

            {/* Order Button matching Image 2: [ سفارش 🛒 ] / [ Order 🛒 ] */}
            <Link
              href="/order"
              className="h-10 px-5 inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-[#00D2FF] text-[#040B20] text-xs sm:text-sm font-bold transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(0,210,255,0.7)] cursor-pointer group"
            >
              <span className="text-xs sm:text-sm font-bold text-[#040B20]">{isFa ? "سفارش" : "Order"}</span>
              <ShoppingCart className="w-4 h-4 text-[#040B20] shrink-0" />
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="h-8 px-3 rounded-full bg-[#081432]/90 border border-[#00D2FF]/35 text-white text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(0,210,255,0.15)]"
              title={isFa ? "Switch to English" : "تغییر زبان به فارسی"}
              aria-label="Toggle language"
            >
              <span>{isFa ? "فارسی" : "English"}</span>
              <Globe className="w-3.5 h-3.5 text-[#00D2FF] shrink-0" />
            </button>

            <Link
              href="/order"
              className="h-8 px-3.5 rounded-full bg-white text-[#040B20] text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              <span>{isFa ? "سفارش" : "Order"}</span>
              <ShoppingCart className="w-3.5 h-3.5 text-[#040B20] shrink-0" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-[#00D2FF] hover:bg-[#00D2FF]/10 transition-colors"
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
            className="fixed inset-0 z-40 bg-[#040B20]/98 backdrop-blur-2xl pt-20 px-5 pb-8 flex flex-col justify-between lg:hidden overflow-y-auto"
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
                        ? "bg-[#00D2FF]/15 text-[#00D2FF] border-[#00D2FF]/40 font-bold shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                        : "text-white/90 border-[#00D2FF]/10 hover:text-[#00D2FF] hover:border-[#00D2FF]/30"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isActive ? "text-[#00D2FF]" : "text-[#00D2FF]/60"}`} />
                  </Link>
                );
              })}

              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="mt-2 w-full py-2.5 px-4 rounded-xl bg-[#081432] hover:bg-[#00D2FF]/10 border border-[#00D2FF]/25 text-white text-xs font-semibold flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#00D2FF]" />
                  <span>{isFa ? "Switch to English" : "تغییر به زبان فارسی"}</span>
                </span>
                <span className="text-xs font-bold text-[#00D2FF] font-mono">
                  {isFa ? "EN" : "فا"}
                </span>
              </button>
            </div>

            <div className="pt-5 border-t border-[#00D2FF]/20 flex flex-col gap-2.5">
              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-full bg-[#00D2FF] text-[#040B20] font-bold text-center text-xs shadow-[0_0_20px_rgba(0,210,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-[#040B20]" />
                <span>{isFa ? "ثبت سفارش آنلاین و صدور شناسه" : "Custom Project Order & Configurator"}</span>
              </Link>
              <Link
                href="/#contact-section"
                onClick={(e) => handleNavClick(e, { id: "contact-section", href: "/#contact-section" })}
                className="w-full py-3 rounded-full border border-white/15 text-white font-semibold text-center text-xs hover:bg-white/5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Handshake className="w-4 h-4 text-[#00D2FF]" />
                <span>{isFa ? "تماس سریع و مشاوره پروژه" : "Quick Contact & Consultation"}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
