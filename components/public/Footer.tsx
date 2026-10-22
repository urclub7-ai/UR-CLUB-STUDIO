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
  if (p.includes("behance")) return <Palette className="w-4 h-4 text-[#00D2FF]" />;
  if (p.includes("dribbble")) return <Dribbble className="w-4 h-4 text-[#00D2FF]" />;
  if (p.includes("instagram")) return <Instagram className="w-4 h-4 text-[#00D2FF]" />;
  if (p.includes("linkedin")) return <Linkedin className="w-4 h-4 text-[#00D2FF]" />;
  if (p.includes("twitter") || p.includes("x")) return <Twitter className="w-4 h-4 text-[#00D2FF]" />;
  return <Globe className="w-4 h-4 text-[#00D2FF]" />;
};

export default function Footer({
  designerName = "تیم مهندسی و نوآوری دیجیتال",
  socialLinks = [],
}: FooterProps) {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const footerLinks = [
    { href: "/", label: isFa ? "صفحه اصلی" : "Home" },
    { href: "/#projects-section", label: isFa ? "پروژه‌های قبلی" : "Showcase & Projects" },
    { href: "/#about-section", label: isFa ? "درباره ما" : "About Us" },
    { href: "/#contact-section", label: isFa ? "تماس با ما" : "Contact Us" },
  ];

  const displaySocials = socialLinks.length > 0 ? socialLinks : [
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Globe", url: "#" },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-[#00D2FF]/20 bg-slate-100 dark:bg-[#040B20] py-8 sm:py-12 transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 pb-6 md:pb-8 border-b border-slate-200 dark:border-[#00D2FF]/15">
          
          {/* Left: Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-2.5 group select-none">
            <div className="relative w-8 h-8 shrink-0 flex items-center justify-center drop-shadow-[0_0_12px_rgba(0,210,255,0.7)]">
              <Image
                src="/images/team_logo_transparent.png"
                alt={isFa ? "لوگوی آر کلاب" : "UR CLUB Logo"}
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-[#00D2FF] transition-colors font-sans tracking-widest">
              UR CLUB
            </span>
          </Link>

          {/* Center: Nav Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-slate-600 dark:text-[#CBD5E1] hover:text-sky-600 dark:hover:text-[#00D2FF] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>


        </div>

        {/* Bottom Bar: Copyright on right, Legal Links on left (in RTL) */}
        <div className="pt-6 border-t border-slate-200/60 dark:border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-[#94A3B8] text-center sm:text-start">
          <p>
            {isFa
              ? "© ۲۰۲۶ پلتفرم رسمی UR CLUB. تمام حقوق محفوظ است."
              : "© 2026 UR CLUB Official Platform. All rights reserved."}
          </p>
          <div className="flex items-center gap-3 text-[11.5px]">
            <Link
              href="/privacy"
              className="hover:text-sky-600 dark:hover:text-[#00D2FF] transition-colors"
            >
              {isFa ? "حریم خصوصی" : "Privacy Policy"}
            </Link>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <Link
              href="/terms"
              className="hover:text-sky-600 dark:hover:text-[#00D2FF] transition-colors"
            >
              {isFa ? "شرایط استفاده" : "Terms of Service"}
            </Link>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <Link
              href="/policies"
              className="hover:text-sky-600 dark:hover:text-[#00D2FF] transition-colors"
            >
              {isFa ? "خط‌مشی پروژه‌ها" : "Project Policies"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
