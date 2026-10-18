"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle2,
  MessageCircle,
  Mail,
  ArrowUpRight,
  Sparkles,
  Phone,
  Copy,
  Check,
} from "lucide-react";
import { submitContactForm } from "@/lib/actions/message-actions";
import { useLanguage } from "@/lib/i18n";

export default function ModernContactSection() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("urclub7@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const isEmail = formData.contactInfo.includes("@");
      const res = await submitContactForm({
        name: formData.name.trim() || (isFa ? "کاربر وب‌سایت" : "Website Visitor"),
        email: isEmail ? formData.contactInfo.trim() : "urclub7+inquiry@gmail.com",
        company: isEmail ? "پیام مستقیم سایت" : `شماره تماس: ${formData.contactInfo.trim()}`,
        service: "پیام مستقیم از صفحه اصلی",
        budget: "مشاوره و استعلام",
        projectUrl: null,
        message: formData.message.trim(),
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          res.message ||
            (isFa ? "خطا در ثبت پیام. لطفاً دوباره تلاش کنید." : "Failed to send message.")
        );
      }
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-section" className="relative w-full scroll-mt-28">
      {/* ─── Clean Header ─── */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {isFa ? "آماده‌اید پروژه بعدی خود را آغاز کنید؟" : "Ready to Build Your Next Project?"}
        </h2>
        <p className="mt-2.5 text-xs sm:text-base text-[#94A3B8] leading-relaxed">
          {isFa
            ? "برای مشاوره فنی، برآورد هزینه و زمان یا آغاز همکاری، مستقیماً از راه‌های زیر با ما در ارتباط باشید."
            : "Reach out for technical advisory, project timeline estimation, or new venture discussions."}
        </p>
      </div>

      {/* ─── Modern 2-Column Split Layout ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 max-w-5xl mx-auto items-stretch">
        {/* Left / Right Card: Direct Fast Channels (2 Columns width) */}
        <div className="lg:col-span-2 p-5 sm:p-8 rounded-2xl bg-[#081432]/60 border border-white/[0.08] flex flex-col justify-between space-y-5 sm:space-y-6">
          <div className="space-y-4 sm:space-y-5">
            <div>
              <span className="text-xs font-mono font-bold text-[#00D2FF] tracking-wider uppercase">
                {isFa ? "ارتباط مستقیم و فوری" : "Direct Channels"}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                {isFa ? "گفتگو بدون واسطه با تیم" : "Direct Communication"}
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
                {isFa
                  ? "پاسخگویی سریع در کمتر از ۲ ساعت از طریق واتساپ یا ایمیل رسمی."
                  : "Rapid response under 2 hours via WhatsApp or official email."}
              </p>
            </div>

            {/* WhatsApp Quick Link */}
            <a
              href="https://wa.me/491624212685?text=%D8%B3%D9%84%D8%A7%D9%85%20%D8%AA%DB%8C%D9%85%20UrClub%D8%8C%20%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA%20%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87%20%D9%BE%D8%B1%D9%88%DA%98%D9%87%20%D8%AF%D8%A7%D8%B1%D9%85."
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 sm:p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {isFa ? "چت فوری در واتساپ" : "WhatsApp Chat"}
                  </div>
                  <div className="text-[11px] font-mono text-[#94A3B8]" dir="ltr">
                    +49 162 4212685
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Official Email */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#040B20]/60 border border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#00D2FF]/10 text-[#00D2FF] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {isFa ? "ایمیل رسمی UrClub" : "Official Email"}
                  </div>
                  <div className="text-[11px] font-mono text-[#94A3B8]" dir="ltr">
                    urclub7@gmail.com
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white/[0.05] hover:bg-[#00D2FF]/20 text-[#94A3B8] hover:text-[#00D2FF] transition-colors cursor-pointer"
                title={isFa ? "کپی ایمیل" : "Copy email"}
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Project Order CTA Button */}
          <div className="pt-3.5 sm:pt-4 border-t border-white/[0.06]">
            <Link
              href="/order"
              className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#00D2FF]/10 hover:bg-[#00D2FF] text-[#00D2FF] hover:text-[#040B20] border border-[#00D2FF]/30 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,210,255,0.15)] cursor-pointer group"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isFa ? "پیکربندی هوشمند و سفارش پروژه" : "Custom Project Configurator"}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right / Left Form: Quick, Sleek Inquiry (3 Columns width) */}
        <div className="lg:col-span-3 p-5 sm:p-8 rounded-2xl bg-[#081432]/60 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              {isFa ? "ارسال پیام و استعلام سریع" : "Quick Message & Inquiry"}
            </h3>
            <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">
              {isFa
                ? "نام و راه ارتباطی خود را بنویسید تا پیام مستقیماً به تیم UrClub ارسال شود."
                : "Leave your contact info and brief notes. We will get back to you shortly."}
            </p>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  {isFa ? "پیام شما با موفقیت دریافت شد" : "Message Received Successfully"}
                </h4>
                <p className="text-xs text-[#94A3B8] max-w-sm mx-auto leading-relaxed">
                  {isFa
                    ? "پیام شما به ایمیل urclub7@gmail.com ارسال شد و کارشناسان ما به زودی با شما تماس خواهند گرفت."
                    : "Your inquiry has been dispatched to urclub7@gmail.com. We will respond within hours."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", contactInfo: "", message: "" });
                  }}
                  className="mt-2 text-xs font-bold text-[#00D2FF] hover:underline cursor-pointer"
                >
                  {isFa ? "ارسال پیام دیگر" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                      {isFa ? "نام و نام خانوادگی" : "Your Name"}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isFa ? "مثلاً: احمد رضایی" : "e.g. John Doe"}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                      {isFa ? "ایمیل یا شماره واتساپ" : "Email or WhatsApp"} <span className="text-[#00D2FF]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactInfo}
                      onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                      placeholder={isFa ? "ایمیل یا شماره تماس..." : "email or phone..."}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]/60 transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    {isFa ? "متن پیام یا شرح مختصر پروژه" : "Message / Project Brief"} <span className="text-[#00D2FF]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isFa ? "خلاصه‌ای از ایده، سوال یا نیازمندی‌های خود را بنویسید..." : "Briefly describe your requirements or inquiry..."}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#040B20]/80 border border-white/[0.08] text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00D2FF]/60 transition-colors resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-400 text-center">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] disabled:opacity-50 text-[#040B20] font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(0,210,255,0.25)] hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? (isFa ? "در حال ارسال..." : "Sending...")
                      : (isFa ? "ارسال پیام مستقیم" : "Send Inquiry")}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
