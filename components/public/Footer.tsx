"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Twitter, Dribbble, Palette, Globe, Handshake, Shield } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface SocialItem {
  id?: string;
  platform: string;
  url: string;
  icon?: string;
}

interface FooterProps {
  designerName?: string;
  tagline?: string;
  email?: string;
  location?: string;
  copyrightText?: string;
  socialLinks?: SocialItem[];
}

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes("behance")) return <Palette className="w-4 h-4 text-[#D4AF37]" />;
  if (p.includes("dribbble")) return <Dribbble className="w-4 h-4 text-[#D4AF37]" />;
  if (p.includes("instagram")) return <Instagram className="w-4 h-4 text-[#D4AF37]" />;
  if (p.includes("linkedin")) return <Linkedin className="w-4 h-4 text-[#D4AF37]" />;
  if (p.includes("twitter") || p.includes("x")) return <Twitter className="w-4 h-4 text-[#D4AF37]" />;
  return <Globe className="w-4 h-4 text-[#D4AF37]" />;
};

export default function Footer({
  designerName = "تیم مهندسی و نوآوری دیجیتال",
  socialLinks = [],
}: FooterProps) {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const footerLinks = [
    { href: "/", label: isFa ? "صفحه اصلی" : "Home" },
    { href: "/#projects-section", label: isFa ? "پروژه‌های قبلی" : "Projects" },
    { href: "/#about-section", label: isFa ? "درباره ما" : "About" },
    { href: "/order", label: isFa ? "سفارش پروژه" : "Order Project" },
    { href: "/#contact-section", label: isFa ? "تماس با ما" : "Contact" },
  ];

  const displaySocials = socialLinks.length > 0 ? socialLinks : [
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Globe", url: "#" },
  ];

  return (
    <footer className="border-t border-stone-200 dark:border-[#D4AF37]/20 bg-stone-100 dark:bg-[#090807] py-8 sm:py-12 transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 pb-6 md:pb-8 border-b border-stone-200 dark:border-[#D4AF37]/15">
          
          {/* Left: Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3.5 group select-none" aria-label={isFa ? "یزدان" : "YAZDAN"}>
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center drop-shadow-[0_0_20px_rgba(212,175,55,0.75)]">
              <Image
                src="/images/yazdan_emblem_transparent.png"
                alt={isFa ? "لوگوی یزدان" : "YAZDAN Logo"}
                width={64}
                height={64}
                className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {isFa ? (
              <span className="text-2xl sm:text-[2.4rem] font-bold font-nastaliq text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#705310] dark:from-[#F5DEB3] dark:via-[#D4AF37] dark:to-[#C5A880] group-hover:brightness-110 transition-colors leading-none pt-1">
                یَزدان
              </span>
            ) : (
              <span className="text-xl sm:text-[1.65rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#705310] dark:from-[#F5DEB3] dark:via-[#D4AF37] dark:to-[#C5A880] group-hover:brightness-110 transition-colors font-brand-en tracking-[0.22em]">
                YAZDAN
              </span>
            )}
          </Link>

          {/* Center: Nav Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-black dark:text-white hover:text-[#8B6914] dark:hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>


        </div>

        {/* Bottom Bar: Copyright on right, Legal Links on left (in RTL) */}
        <div className="pt-6 border-t border-stone-200/60 dark:border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black/85 dark:text-white/85 text-center sm:text-start">
          <p>
            {isFa
              ? "© ۲۰۲۶ پلتفرم رسمی YAZDAN. تمام حقوق محفوظ است."
              : "© 2026 YAZDAN Official Platform. All rights reserved."}
          </p>
          <div className="flex items-center gap-3 text-[11.5px]">
            <Link
              href="/privacy"
              className="hover:text-[#8B6914] dark:hover:text-[#D4AF37] transition-colors"
            >
              {isFa ? "حریم خصوصی" : "Privacy Policy"}
            </Link>
            <span className="text-stone-300 dark:text-white/20">•</span>
            <Link
              href="/terms"
              className="hover:text-[#8B6914] dark:hover:text-[#D4AF37] transition-colors"
            >
              {isFa ? "شرایط استفاده" : "Terms of Service"}
            </Link>
            <span className="text-stone-300 dark:text-white/20">•</span>
            <Link
              href="/policies"
              className="hover:text-[#8B6914] dark:hover:text-[#D4AF37] transition-colors"
            >
              {isFa ? "خط‌مشی پروژه‌ها" : "Project Policies"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
