"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  Shield,
  Smartphone,
  Download,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Sparkles,
  Cpu,
  Lock,
  HardDrive,
  Copy,
  Check,
  AlertTriangle,
  Radio,
  ExternalLink,
} from "lucide-react";

export default function ZeroAiPortalPage() {
  const [openStep, setOpenStep] = useState<number | null>(1);
  const [isSafari, setIsSafari] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isInstalling, setIsInstalling] = useState<boolean>(false);

  useEffect(() => {
    // Check if running on iOS Safari
    if (typeof window !== "undefined") {
      const ua = window.navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(ua);
      const isWebkitSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/.test(ua);
      setIsSafari(!isIOS || isWebkitSafari);
    }
  }, []);

  const handleInstallClick = () => {
    setIsInstalling(true);
    setTimeout(() => {
      setIsInstalling(false);
    }, 4000);
  };

  const copyManifestLink = () => {
    navigator.clipboard.writeText(
      "itms-services://?action=download-manifest&url=https://urclub.vercel.app/zeroai/manifest.plist"
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 selection:bg-[#00F2FE]/30 selection:text-white font-sans relative overflow-x-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top cyan glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-b from-[#00F2FE]/15 via-[#8E2DE2]/10 to-transparent blur-[120px] rounded-full" />
        {/* Violet ambient glow */}
        <div className="absolute top-[35%] -left-40 w-[500px] h-[500px] bg-[#8E2DE2]/10 blur-[140px] rounded-full" />
        {/* Bottom subtle cyan */}
        <div className="absolute bottom-10 -right-40 w-[500px] h-[500px] bg-[#00F2FE]/10 blur-[140px] rounded-full" />

        {/* Futuristic Cyber Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00F2FE 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col min-h-screen">
        {/* Top Telemetry Navigation Bar */}
        <header className="flex items-center justify-between py-3 px-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8 sm:mb-12 shadow-2xl">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-[#00F2FE] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
            <span>UR CLUB Studio</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F2FE] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F2FE]"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-mono tracking-wider uppercase text-[#00F2FE]/90 font-semibold">
              OTA Gateway Online
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 bg-black/40 px-3 py-1 rounded-full border border-white/5">
            <span>v1.0.0</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">Stable Build</span>
          </div>
        </header>

        {/* Non-Safari Warning Notification for iOS Users */}
        {!isSafari && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 backdrop-blur-md">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              <strong className="text-amber-300">Safari Recommended:</strong> Direct Apple OTA installation requires Safari. If you are using Chrome, Instagram, or Telegram in-app browser, please tap the menu and choose <span className="underline decoration-amber-400/50">"Open in Safari"</span>.
            </div>
          </div>
        )}

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center text-center">
          {/* Brand Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00F2FE]/10 via-[#8E2DE2]/15 to-[#00F2FE]/10 border border-[#00F2FE]/30 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,242,254,0.15)] animate-pulse">
            <Radio className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#00F2FE] uppercase">
              UR CLUB STUDIO PRESENTS
            </span>
          </div>

          {/* Animated Futuristic Neon Vector Logo */}
          <div className="relative my-4 group">
            {/* Outer pulsating glow rings */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#00F2FE]/30 via-[#8E2DE2]/40 to-[#00F2FE]/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
            
            {/* Logo container */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-b from-[#141724] to-[#0A0C14] border border-[#00F2FE]/40 p-4 shadow-[0_0_40px_rgba(0,242,254,0.25)] flex items-center justify-center">
              {/* Futuristic Vector SVG Logo */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(0,242,254,0.8)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="neonCyanViolet" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F2FE" />
                    <stop offset="100%" stopColor="#8E2DE2" />
                  </linearGradient>
                  <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                  <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Ambient Core Circle */}
                <circle cx="50" cy="50" r="38" fill="url(#coreGlow)" />

                {/* Outer Cybernetic Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="url(#neonCyanViolet)"
                  strokeWidth="2.5"
                  strokeDasharray="8 6 16 6"
                  className="origin-center animate-[spin_20s_linear_infinite]"
                />

                {/* Inner Hexagonal Orbit */}
                <polygon
                  points="50,15 80,32 80,68 50,85 20,68 20,32"
                  stroke="#8E2DE2"
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                  className="origin-center animate-[spin_35s_linear_infinite_reverse]"
                />

                {/* Central "Zero / Z" Emblem */}
                <path
                  d="M32 30 H68 L32 70 H68"
                  stroke="url(#neonCyanViolet)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glowEffect)"
                />

                {/* Central Glowing Power Nodes */}
                <circle cx="32" cy="30" r="3.5" fill="#FFFFFF" />
                <circle cx="68" cy="30" r="3.5" fill="#00F2FE" />
                <circle cx="32" cy="70" r="3.5" fill="#8E2DE2" />
                <circle cx="68" cy="70" r="3.5" fill="#FFFFFF" />
              </svg>
            </div>
          </div>

          {/* Headings */}
          <h1 className="mt-6 text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent max-w-2xl leading-[1.15]">
            Zero AI <span className="text-[#00F2FE]">—</span> On-Device Intelligence for iPhone
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
            Autonomous neural intelligence engine compiled specifically for Apple Silicon. Zero server latency, zero cloud LLM dependence, running 100% natively on your hardware.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6 mb-8 max-w-2xl">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] text-xs font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.1)]">
              <Zap className="w-3.5 h-3.5" />
              <span>Pure Offline Execution</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#8E2DE2]/15 border border-[#8E2DE2]/40 text-[#c888ff] text-xs font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(142,45,226,0.15)]">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Private / No Cloud LLM</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/15 text-slate-200 text-xs font-semibold backdrop-blur-md">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hardware-Locked Security</span>
            </div>
          </div>

          {/* ACTION BUTTONS (PRIMARY & SECONDARY) */}
          <div className="w-full max-w-md flex flex-col gap-3.5 mb-12">
            {/* Primary Call-to-Action: Direct Apple OTA Install */}
            <a
              href="itms-services://?action=download-manifest&url=https://urclub.vercel.app/zeroai/manifest.plist"
              onClick={handleInstallClick}
              className="relative group w-full overflow-hidden rounded-2xl p-[2px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_35px_rgba(0,242,254,0.35)]"
            >
              {/* Animated Glowing Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F2FE] via-[#8E2DE2] to-[#00F2FE] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] rounded-2xl" />

              {/* Button Interior */}
              <div className="relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-b from-[#0F1424] to-[#090A0F] group-hover:from-[#131b33] group-hover:to-[#0d0f17] transition-all">
                <span className="text-xl sm:text-2xl transition-transform group-hover:scale-110">📲</span>
                <div className="text-left">
                  <span className="block text-base sm:text-lg font-bold text-white tracking-wide">
                    {isInstalling ? "Triggering iOS Install Prompt..." : "Install Direct on iPhone"}
                  </span>
                  <span className="block text-[11px] text-[#00F2FE]/80 font-mono">
                    Apple Wireless OTA • Build 1.0.0
                  </span>
                </div>
                <Sparkles className="w-5 h-5 text-[#00F2FE] ml-auto animate-pulse" />
              </div>
            </a>

            {/* Secondary Fallback: Direct IPA Download */}
            <div className="flex items-center gap-2">
              <a
                href="/zeroai/ZeroAI.ipa"
                download="ZeroAI.ipa"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00F2FE]/40 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-all group backdrop-blur-md"
              >
                <Download className="w-4 h-4 text-slate-400 group-hover:text-[#00F2FE] group-hover:translate-y-0.5 transition-all" />
                <span>Download Raw IPA File</span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">(For Sideloadly / Scarlet / ESign)</span>
              </a>

              {/* Copy OTA Manifest URL shortcut */}
              <button
                onClick={copyManifestLink}
                title="Copy OTA Manifest URL"
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#8E2DE2]/50 text-slate-400 hover:text-white transition-colors"
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-500">
              Compatible with iOS 16.0+ • A14 Bionic / M-Series or later
            </p>
          </div>

          {/* Quick 3-Step Setup Guide Accordion/Card */}
          <section className="w-full max-w-xl text-left bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 rounded-2xl p-5 sm:p-7 backdrop-blur-xl shadow-2xl mb-12">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#00F2FE]" />
                  <span>3-Step Quick iPhone Setup</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Apple Enterprise & Ad-Hoc Onboarding Procedure
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/20">
                100% Free OTA
              </span>
            </div>

            <div className="space-y-3">
              {/* Step 1 */}
              <div
                onClick={() => setOpenStep(openStep === 1 ? null : 1)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  openStep === 1
                    ? "bg-[#00F2FE]/[0.06] border-[#00F2FE]/40"
                    : "bg-black/30 border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#00F2FE]/20 text-[#00F2FE] font-mono text-xs font-bold flex items-center justify-center">
                      01
                    </div>
                    <span className="text-sm font-semibold text-white">
                      Tap "Install Direct" in Safari
                    </span>
                  </div>
                  {openStep === 1 ? (
                    <ChevronUp className="w-4 h-4 text-[#00F2FE]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                {openStep === 1 && (
                  <div className="mt-3 text-xs text-slate-300 pl-10 space-y-1.5 leading-relaxed">
                    <p>
                      Open this page in iOS Safari and tap the glowing <strong className="text-[#00F2FE]">Install Direct</strong> button above.
                    </p>
                    <p className="text-slate-400">
                      When iOS presents the dialog saying <em className="text-slate-200">"urclub.vercel.app would like to install 'Zero AI'"</em>, tap <strong>Install</strong>. The app icon will begin downloading on your iPhone home screen.
                    </p>
                  </div>
                )}
              </div>

              {/* Step 2 */}
              <div
                onClick={() => setOpenStep(openStep === 2 ? null : 2)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  openStep === 2
                    ? "bg-[#8E2DE2]/[0.08] border-[#8E2DE2]/40"
                    : "bg-black/30 border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#8E2DE2]/20 text-[#c888ff] font-mono text-xs font-bold flex items-center justify-center">
                      02
                    </div>
                    <span className="text-sm font-semibold text-white">
                      Trust the Profile in iOS Settings
                    </span>
                  </div>
                  {openStep === 2 ? (
                    <ChevronUp className="w-4 h-4 text-[#8E2DE2]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                {openStep === 2 && (
                  <div className="mt-3 text-xs text-slate-300 pl-10 space-y-1.5 leading-relaxed">
                    <p>
                      Before launching for the first time, navigate on your iPhone to:
                    </p>
                    <div className="p-2 rounded bg-black/50 font-mono text-[11px] text-[#00F2FE] border border-white/10">
                      Settings &gt; General &gt; VPN &amp; Device Management
                    </div>
                    <p className="text-slate-400">
                      Find the Enterprise / Developer profile for <strong>UR CLUB STUDIO</strong> and tap <strong className="text-emerald-400">"Trust"</strong>.
                    </p>
                  </div>
                )}
              </div>

              {/* Step 3 */}
              <div
                onClick={() => setOpenStep(openStep === 3 ? null : 3)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  openStep === 3
                    ? "bg-white/[0.08] border-white/30"
                    : "bg-black/30 border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-white font-mono text-xs font-bold flex items-center justify-center">
                      03
                    </div>
                    <span className="text-sm font-semibold text-white">
                      Launch &amp; Activate License Key
                    </span>
                  </div>
                  {openStep === 3 ? (
                    <ChevronUp className="w-4 h-4 text-white" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                {openStep === 3 && (
                  <div className="mt-3 text-xs text-slate-300 pl-10 space-y-1.5 leading-relaxed">
                    <p>
                      Open <strong>Zero AI</strong> from your home screen. On initial launch, the on-device weights will calibrate.
                    </p>
                    <p className="text-slate-400">
                      Enter your authorized UR CLUB License Key or contact support via WhatsApp/Telegram to bind your hardware device ID.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Technical Specs Bento Grid */}
          <section className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-3 gap-3 text-left mb-12">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="block text-[10px] font-mono text-slate-500 uppercase">Architecture</span>
              <span className="block text-xs sm:text-sm font-semibold text-slate-200 mt-1">Apple Neural Engine</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="block text-[10px] font-mono text-slate-500 uppercase">Latency</span>
              <span className="block text-xs sm:text-sm font-semibold text-[#00F2FE] mt-1">~12ms On-Device</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 col-span-2 sm:col-span-1">
              <span className="block text-[10px] font-mono text-slate-500 uppercase">Cloud Uplink</span>
              <span className="block text-xs sm:text-sm font-semibold text-rose-400 mt-1">0 KB (Zero Telemetry)</span>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="pt-6 border-t border-white/10 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00F2FE]" />
            <span>© 2026 UR CLUB STUDIO. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <a
              href="https://t.me/urclub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00F2FE] hover:underline flex items-center gap-1"
            >
              <span>Get License</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
