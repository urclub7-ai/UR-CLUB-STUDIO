"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, ArrowRight, Loader2, AlertCircle, ShieldCheck, ArrowLeft } from "lucide-react";
import { loginAdmin } from "@/lib/actions/auth-actions";
import { EDITORIAL_EASE } from "@/lib/motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passcode, setPasscode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append("password", passcode.trim());

    try {
      const res = await loginAdmin(data);
      if (res.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(res.message || "کد دسترسی نادرست است");
      }
    } catch {
      setError("خطایی در ارتباط رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090B] flex flex-col items-center justify-center p-6 select-none relative overflow-hidden">
      {/* Background Ambient Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00C3FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to website button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#CBD5E1] hover:text-white px-3 py-1.5 rounded-lg bg-[#14171C] border border-[rgba(255,255,255,0.08)] hover:border-[#00C3FF]/40 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#00C3FF]" />
          <span>بازگشت به سایت / Website</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Header with animated UR CLUB Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="relative inline-flex items-center justify-center mb-3"
          >
            <div className="absolute -inset-2 rounded-full bg-[#00D2FF]/30 blur-lg" />
            <div className="w-16 h-16 relative z-10 flex items-center justify-center drop-shadow-[0_0_16px_rgba(0,210,255,0.7)]">
              <Image
                src="/images/team_logo_transparent.png"
                alt="UR CLUB Logo"
                width={64}
                height={64}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          <h1 className="text-xl font-extrabold tracking-widest text-white font-sans">
            UR CLUB
          </h1>
          <p className="text-[12px] text-[#00D2FF] mt-0.5 font-medium">
            پنل اختصاصی مدیریت و کنترل بخش‌های سایت
          </p>
          <p className="text-[11px] text-[#94A3B8] mt-1 font-sans">
            کد دسترسی (Passcode) را برای ورود وارد کنید
          </p>
        </div>

        {/* Login Passcode Card */}
        <div className="bg-[#0D0F12]/90 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] shadow-[0_20px_50px_rgba(0,0,0,0.85)] rounded-2xl p-7 space-y-5">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span className="leading-snug">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11.5px] font-medium text-[#CBD5E1] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#00C3FF]" />
                  <span>کد دسترسی (Passcode)</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  maxLength={64}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="رمز عبور یا Passcode..."
                  className="w-full text-center text-sm sm:text-base font-mono font-bold py-3.5 px-4 rounded-xl bg-[#08090B] border border-[rgba(255,255,255,0.12)] text-[#F8FAFC] focus:outline-none focus:border-[#00C3FF] focus:shadow-[0_0_15px_rgba(0,195,255,0.25)] placeholder:text-[#555860] placeholder:font-normal transition-all duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#F2F2F0] text-[#08090B] font-semibold text-xs uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 select-none cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#08090B]" />
                  <span>در حال اعتبارسنجی...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#00C3FF]" />
                  <span>ورود به پنل مدیریت</span>
                  <ArrowRight className="w-4 h-4 text-[#08090B]" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security badge */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-[#555860] font-mono">
            SECURE ACCESS · MOHAMMAD NAZIF YOSUSFI
          </p>
        </div>
      </motion.div>
    </div>
  );
}
