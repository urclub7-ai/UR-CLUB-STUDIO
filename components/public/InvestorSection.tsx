"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Send, CheckCircle2, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { submitContactForm } from "@/lib/actions/message-actions";

export default function InvestorSection() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("scale-up");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "€5,000 – €15,000",
    model: "سرمایه‌گذاری روی محصولات آماده",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        company: formData.phone ? `WhatsApp/Phone: ${formData.phone}` : "Investor Inquiry",
        service: `سرمایه‌گذاری: ${formData.model}`,
        budget: formData.budget,
        projectUrl: null,
        message: formData.message || "درخواست دریافت مستندات سرمایه‌گذاری و دک معرفی پروژه‌ها",
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const investmentModels = [
    {
      id: "scale-up",
      num: "۰۱",
      num_en: "01",
      title: "سرمایه‌گذاری روی محصولات آماده",
      title_en: "Scale-Up Product Funding",
      subtitle: "Scale-Up Funding",
      badge: "سهم از درآمد",
      badge_en: "Revenue Share",
      isFeatured: false,
      desc: "تزریق سرمایه به پروژه‌هایی که توسعه فنی آنها تکمیل شده و آماده ورود فوری به بازار اروپا و جذب مشتری هستند.",
      desc_en: "Capital injection into fully validated, built platforms to accelerate marketing, sales, and European expansion.",
      bullets: [
        "پلتفرم‌های تست‌شده با کاربران واقعی",
        "شروع درآمدزایی بدون تأخیر در توسعه",
        "گزارش‌های شفاف ماهانه از عملکرد مالی",
      ],
      bullets_en: [
        "Tested platforms with real users",
        "Zero development lag; instant launch",
        "Transparent monthly performance reporting",
      ],
    },
    {
      id: "joint-venture",
      num: "۰۲",
      num_en: "02",
      title: "توسعه محصول مشترک",
      title_en: "Joint Venture Co-Founding",
      subtitle: "Joint Venture (JV)",
      badge: "مدل پیشنهادی",
      badge_en: "Recommended",
      isFeatured: true,
      desc: "شما ایده و بازار را تأمین می‌کنید؛ تیم ما از صفر تا صد مهندسی نرم‌افزار، هویت برند، زیرساخت و نگهداری را اجرا می‌کند.",
      desc_en: "You provide capital and market insights; our collective executes end-to-end engineering, branding, and operations.",
      bullets: [
        "تحویل اولین نسخه MVP در کمتر از ۳۰ روز",
        "کاهش ۶۰٪ در هزینه‌های فنی سنتی",
        "مالکیت مشترک دارایی‌های فکری و برند",
      ],
      bullets_en: [
        "Rapid MVP turnaround under 30 days",
        "60% reduction in traditional dev costs",
        "Shared IP and brand equity",
      ],
    },
    {
      id: "tech-equity",
      num: "۰۳",
      num_en: "03",
      title: "شراکت تکنولوژی در ازای سهام",
      title_en: "Tech-for-Equity Acceleration",
      subtitle: "Tech for Equity",
      badge: "برای بنیان‌گذاران",
      badge_en: "For Founders",
      isFeatured: false,
      desc: "مناسب برای استارتاپ‌های نوآور که نیاز به یک بازوی فنی قدرتمند و مطمئن بدون هزینه‌های سنگین استخدام دارند.",
      desc_en: "Dedicated technical arm for visionary startups needing enterprise-grade engineering without agency overhead.",
      bullets: [
        "معماری سیستم‌های مدرن و مقیاس‌پذیر",
        "پشتیبانی فنی و امنیتی دائمی",
        "آماده‌سازی برای راندهای بعدی جذب سرمایه",
      ],
      bullets_en: [
        "Next-gen scalable web architecture",
        "Continuous technical & security oversight",
        "Preparation for venture funding rounds",
      ],
    },
  ];

  return (
    <div id="investor-section" className="relative w-full scroll-mt-28">
      {/* ─── Clean Centered Header (Matching upper sections) ─── */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {isFa
            ? "فرصت‌های سرمایه‌گذاری و شراکت استراتژیک"
            : "Investment & Co-Venture Opportunities"}
        </h2>
        <p className="mt-2.5 text-xs sm:text-base text-[#94A3B8] leading-relaxed">
          {isFa
            ? "مدل‌های همکاری شفاف و سودآور برای مقیاس‌دهی محصولات فناورانه و رشد ارزش بلندمدت"
            : "Transparent, yield-focused partnership models to scale digital assets with technical excellence."}
        </p>
      </div>

      {/* ─── 3 Investment Cards (Sleek cards, glow ONLY on hover) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {investmentModels.map((m) => {
          return (
            <div
              key={m.id}
              className="group relative p-5 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 overflow-hidden bg-[#081432]/60 border border-white/[0.08] hover:border-[#00D2FF]/40 hover:bg-[#081432]/90 hover:shadow-[0_0_30px_rgba(0,210,255,0.15)]"
            >
              {/* Top glow line - only visible on hover */}
              <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-3.5 sm:space-y-4">
                {/* Header Row: Badge */}
                <div>
                  <span className="inline-block text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/25">
                    {isFa ? m.badge : m.badge_en}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-white group-hover:text-[#00D2FF] transition-colors leading-snug">
                    {isFa ? m.title : m.title_en}
                  </h3>
                  {!isFa && (
                    <div className="text-[11px] sm:text-xs font-mono text-[#00D2FF]/80 mt-1">
                      {m.subtitle}
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                    {isFa ? m.desc : m.desc_en}
                  </p>
                </div>

                {/* Clean Bullet Points (Minimal, no redundant icons) */}
                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  {(isFa ? m.bullets : m.bullets_en).map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-white/[0.06]">
                <button
                  onClick={() => {
                    setSelectedModel(m.id);
                    setFormData((prev) => ({
                      ...prev,
                      model: isFa ? m.title : m.title_en,
                    }));
                    setIsModalOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer bg-[#00D2FF]/10 hover:bg-[#00D2FF] text-[#00D2FF] hover:text-[#040B20] border border-[#00D2FF]/30 hover:shadow-[0_0_20px_rgba(0,210,255,0.35)]"
                >
                  <span>{isFa ? "انتخاب این مدل و ثبت درخواست" : "Select Model & Apply"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Investment Application Modal ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#040B20]/90 backdrop-blur-xl p-4 sm:p-6 flex items-center justify-center overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full rounded-2xl border border-[#00D2FF]/30 bg-[#081432] p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
            >
              {/* Close Button (Left-aligned in RTL to prevent text overlap) */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 sm:top-5 left-4 sm:left-5 rtl:left-4 rtl:sm:left-5 rtl:right-auto ltr:right-4 ltr:sm:right-5 ltr:left-auto z-20 p-2 rounded-full bg-[#040B20] text-[#94A3B8] hover:text-white hover:bg-[#00D2FF]/20 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#00D2FF]/20 border border-[#00D2FF] text-[#00D2FF] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {isFa ? "درخواست سرمایه‌گذاری دریافت شد" : "Investment Inquiry Received"}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
                    {isFa
                      ? "اطلاعات شما در سیستم ثبت گردید. دک معرفی پروژه‌ها و جزئیات بازگشت سرمایه حداکثر ظرف ۲۴ ساعت برای شما ارسال خواهد شد."
                      : "Your inquiry is registered. The pitch deck and financial metrics will be emailed within 24 hours."}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setIsModalOpen(false);
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#00D2FF] text-[#040B20] font-bold text-xs hover:bg-[#38bdf8] transition-all cursor-pointer"
                  >
                    {isFa ? "بستن پنجره" : "Close Window"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1 rtl:pl-10 ltr:pr-10">
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      {isFa ? "دریافت دک معرفی و جلسه مشاوره" : "Request Pitch Deck & Consultation"}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {isFa
                        ? "لطفاً اطلاعات اولیه خود را درج نمایید تا اسناد مالی و مدل‌های بازگشت سرمایه برای شما ارسال شود."
                        : "Enter your contact details to receive our pitch deck and investment parameters."}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-medium text-[#CBD5E1] block mb-1">
                        {isFa ? "نام و تخلص یا نام شرکت *" : "Your Name / Organization *"}
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isFa ? "مثال: علی احمدی یا شرکت سرمایه‌گذاری صبا" : "e.g. John Doe / Venture Partners"}
                        className="w-full h-10 px-3.5 rounded-xl bg-[#040B20] border border-[#00D2FF]/25 text-white text-xs placeholder:text-[#64748B] focus:outline-none focus:border-[#00D2FF]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-[#CBD5E1] block mb-1">
                          {isFa ? "آدرس ایمیل *" : "Email Address *"}
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="investor@example.com"
                          className="w-full h-10 px-3.5 rounded-xl bg-[#040B20] border border-[#00D2FF]/25 text-white text-xs placeholder:text-[#64748B] focus:outline-none focus:border-[#00D2FF]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[#CBD5E1] block mb-1">
                          {isFa ? "شماره واتساپ / تلفن" : "Phone / WhatsApp"}
                        </label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+49 ... / +93 ..."
                          className="w-full h-10 px-3.5 rounded-xl bg-[#040B20] border border-[#00D2FF]/25 text-white text-xs placeholder:text-[#64748B] focus:outline-none focus:border-[#00D2FF]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-[#CBD5E1] block mb-1">
                          {isFa ? "میزان بودجه / سرمایه‌گذاری" : "Target Investment Scope"}
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full h-10 px-3 rounded-xl bg-[#040B20] border border-[#00D2FF]/25 text-white text-xs focus:outline-none focus:border-[#00D2FF]"
                        >
                          <option value="€2,000 – €5,000">€2,000 – €5,000</option>
                          <option value="€5,000 – €15,000">€5,000 – €15,000</option>
                          <option value="€15,000 – €50,000">€15,000 – €50,000</option>
                          <option value="€50,000+">€50,000+</option>
                          <option value="مذاکره و توافق بعدی">{isFa ? "مذاکره و توافق بعدی" : "Flexible / Negotiation"}</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-[#CBD5E1] block mb-1">
                          {isFa ? "مدل همکاری مورد نظر" : "Partnership Model"}
                        </label>
                        <select
                          value={formData.model}
                          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                          className="w-full h-10 px-3 rounded-xl bg-[#040B20] border border-[#00D2FF]/25 text-white text-xs focus:outline-none focus:border-[#00D2FF]"
                        >
                          <option value="سرمایه‌گذاری روی محصولات آماده">
                            {isFa ? "سرمایه‌گذاری روی محصولات آماده" : "Scale-Up Product Funding"}
                          </option>
                          <option value="توسعه محصول مشترک">
                            {isFa ? "توسعه محصول مشترک" : "Joint Venture Co-Founding"}
                          </option>
                          <option value="شراکت تکنولوژی در ازای سهام">
                            {isFa ? "شراکت تکنولوژی در ازای سهام" : "Tech-for-Equity Acceleration"}
                          </option>
                          <option value="سفارش توسعه اختصاصی انترپرایز">
                            {isFa ? "سفارش توسعه اختصاصی انترپرایز" : "Custom Enterprise Development"}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[#CBD5E1] block mb-1">
                        {isFa ? "اهداف سرمایه‌گذاری یا پیام شما (اختیاری)" : "Investment Goals or Notes (Optional)"}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={isFa ? "در مورد زمینه علاقه‌مندی یا سوالات خود بنویسید..." : "Tell us about your target sector or specific questions..."}
                        className="w-full p-3 rounded-xl bg-[#040B20] border border-[#00D2FF]/25 text-white text-xs placeholder:text-[#64748B] focus:outline-none focus:border-[#00D2FF] resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 rounded-xl bg-[#00D2FF] hover:bg-[#38bdf8] text-[#040B20] font-bold text-xs transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? (isFa ? "در حال ارسال..." : "Sending...") : (isFa ? "ارسال درخواست سرمایه‌گذاری" : "Submit Investment Request")}</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
