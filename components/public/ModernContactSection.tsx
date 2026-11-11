"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import {
  YazdanWhatsAppIcon,
  YazdanMailIcon,
  YazdanSendActionIcon,
} from "@/components/ui/YazdanIcons";
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

      fetch("https://formsubmit.co/ajax/urclub7@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `پیام جدید از وبسایت YAZDAN: ${formData.name.trim() || "کاربر سایت"}`,
          "نام فرستنده": formData.name.trim() || "کاربر وب‌سایت",
          "اطلاعات تماس (ایمیل یا واتساپ)": formData.contactInfo.trim(),
          "متن پیام": formData.message.trim(),
          _replyto: isEmail ? formData.contactInfo.trim() : "urclub7@gmail.com",
          _captcha: "false",
          _template: "table",
        }),
      }).catch(() => {});

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
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
          {isFa ? "در تماس شوید" : "Get in Touch"}
        </h2>
        <p className="mt-2 text-xs sm:text-base text-black dark:text-white leading-relaxed">
          {isFa
            ? "برای مشوره تخنیکی یا برآورد قیمت پروژه با ما در ارتباط شوید."
            : "Contact us for technical advisory, project scopes, or timeline estimates."}
        </p>
      </div>

      {/* ─── Modern 2-Column Split Layout ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-6 max-w-5xl mx-auto items-stretch">
        {/* Left / Right Card: Direct Fast Channels (2 Columns width) */}
        <div className="lg:col-span-2 p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-[#13110E]/90 border border-stone-200/90 dark:border-[#D4AF37]/25 shadow-sm flex flex-col justify-between space-y-4 sm:space-y-6">
          <div className="space-y-4 sm:space-y-5">
            <div>
              <span className="text-xs font-mono font-bold text-[#8B6914] dark:text-[#E5C396] tracking-wider uppercase">
                {isFa ? "ارتباط مستقیم و فوری" : "Direct Channels"}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-black dark:text-white mt-1">
                {isFa ? "گفتگو بدون واسطه با ما" : "Direct Communication"}
              </h3>
              <p className="text-xs text-black dark:text-white mt-1.5 leading-relaxed">
                {isFa
                  ? "پاسخگویی سریع در واتساپ یا ایمیل رسمی."
                  : "Fast response via WhatsApp or official email."}
              </p>
            </div>

            {/* WhatsApp Quick Link */}
            <a
              href="https://wa.me/491624212685?text=%D8%B3%D9%84%D8%A7%D9%85%20%D8%AA%DB%8C%D9%85%20YAZDAN%D8%8C%20%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA%20%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87%20%D9%BE%D8%B1%D9%88%DA%98%D9%87%20%D8%AF%D8%A7%D8%B1%D9%85."
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 sm:p-4 rounded-xl bg-stone-50 dark:bg-white/[0.04] hover:bg-stone-100 dark:hover:bg-[#D4AF37]/10 border border-stone-200 dark:border-[#D4AF37]/25 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF8F5] dark:bg-[#090807] border border-[#B8860B]/30 dark:border-[#D4AF37]/35 dark:shadow-[0_0_12px_rgba(212,175,55,0.12)] flex items-center justify-center shrink-0">
                  <YazdanWhatsAppIcon className="w-5 h-5 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-white group-hover:text-[#8B6914] dark:group-hover:text-[#E5C396] transition-colors">
                    {isFa ? "چت فوری در واتساپ" : "WhatsApp Chat"}
                  </div>
                  <div className="text-[11px] font-mono text-stone-500 dark:text-[#A8A095]" dir="ltr">
                    +49 162 4212685
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#8B6914] dark:text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Official Email */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50 dark:bg-white/[0.04] border border-stone-200 dark:border-[#D4AF37]/25 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF8F5] dark:bg-[#090807] border border-[#B8860B]/30 dark:border-[#D4AF37]/35 dark:shadow-[0_0_12px_rgba(212,175,55,0.12)] flex items-center justify-center shrink-0">
                  <YazdanMailIcon className="w-5 h-5 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-white">
                    {isFa ? "ایمیل رسمی YAZDAN" : "Official Email"}
                  </div>
                  <div className="text-[11px] font-mono text-stone-500 dark:text-[#A8A095]" dir="ltr">
                    urclub7@gmail.com
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-stone-100 dark:bg-white/[0.08] hover:bg-[#D4AF37]/20 text-stone-600 dark:text-[#A8A095] hover:text-[#8B6914] dark:hover:text-[#E5C396] transition-colors cursor-pointer"
                title={isFa ? "کپی ایمیل" : "Copy email"}
              >
                {copiedEmail ? <Check className="w-4 h-4 text-[#8B6914] dark:text-[#D4AF37]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Project Order CTA Button */}
          <div className="pt-3.5 sm:pt-4 border-t border-stone-200 dark:border-white/[0.08]">
            <Link
              href="/order"
              className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#8B6914] dark:text-[#E5C396] hover:text-[#090807] dark:hover:text-[#090807] border border-[#D4AF37]/30 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md dark:shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer group"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isFa ? "پیکربندی هوشمند و سفارش پروژه" : "Custom Project Configurator"}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right / Left Form: Quick, Sleek Inquiry (3 Columns width) */}
        <div className="lg:col-span-3 p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-[#13110E]/90 border border-stone-200/90 dark:border-[#D4AF37]/25 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white mb-1">
              {isFa ? "ارسال پیام و استعلام سریع" : "Quick Message & Inquiry"}
            </h3>
            <p className="text-xs text-stone-600 dark:text-[#A8A095] mb-4 sm:mb-6 leading-relaxed">
              {isFa
                ? "نام و راه ارتباطی خود را بنویسید تا پیام مستقیماً به تیم YAZDAN ارسال شود."
                : "Leave your contact info and brief notes. We will get back to you shortly."}
            </p>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#8B6914] dark:text-[#E5C396] mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-stone-900 dark:text-white">
                  {isFa ? "پیام شما با موفقیت دریافت شد" : "Message Received Successfully"}
                </h4>
                <p className="text-xs text-stone-600 dark:text-[#A8A095] max-w-sm mx-auto leading-relaxed">
                  {isFa
                    ? "پیام شما ارسال شد و کارشناسان ما به زودی با شما به تماس خواهند شد."
                    : "Your inquiry has been dispatched. We will respond within hours."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", contactInfo: "", message: "" });
                  }}
                  className="mt-2 text-xs font-bold text-[#8B6914] dark:text-[#D4AF37] hover:underline cursor-pointer"
                >
                  {isFa ? "ارسال پیام دیگر" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-[#CBD5E1] mb-1.5">
                      {isFa ? "نام و تخلص" : "Your Name"}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isFa ? "مثلاً: احمد رضایی" : "e.g. John Doe"}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-[#090807] border border-stone-200 dark:border-[#D4AF37]/25 text-xs sm:text-sm text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-[#CBD5E1] mb-1.5">
                      {isFa ? "ایمیل یا شماره واتساپ" : "Email or WhatsApp"} <span className="text-[#8B6914] dark:text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactInfo}
                      onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                      placeholder={isFa ? "ایمیل یا شماره تماس..." : "email or phone..."}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-[#090807] border border-stone-200 dark:border-[#D4AF37]/25 text-xs sm:text-sm text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-[#CBD5E1] mb-1.5">
                    {isFa ? "متن پیام یا شرح مختصر پروژه" : "Message / Project Brief"} <span className="text-[#8B6914] dark:text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isFa ? "خلاصه‌ای از ایده، سوال یا نیازمندی‌های خود را بنویسید..." : "Briefly describe your requirements or inquiry..."}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-[#090807] border border-stone-200 dark:border-[#D4AF37]/25 text-xs sm:text-sm text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-500 dark:text-rose-400 text-center">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E5C396] via-[#D4AF37] to-[#C5A880] text-[#090807] font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <YazdanSendActionIcon className="w-4 h-4 text-[#090807]" />
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