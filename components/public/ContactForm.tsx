"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2, MessageSquare, Mail } from "lucide-react";
import { submitContactForm } from "@/lib/actions/message-actions";
import { EDITORIAL_EASE } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n";

export default function ContactForm() {
  const { t, language } = useLanguage();
  const formT = t.contactPage.form;

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const prefersReducedMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: formT.serviceOptions[0],
    budget: formT.budgetOptions[0],
    projectUrl: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    setFieldErrors({});

    try {
      const res = await submitContactForm(formData);
      if (res.success) {
        setSuccessMessage(
          language === "fa"
            ? "پیام شما با موفقیت ارسال شد. به‌زودی با شما تماس خواهم گرفت."
            : res.message || "Your message has been received."
        );
        setFormData({
          name: "",
          email: "",
          company: "",
          service: formT.serviceOptions[0],
          budget: formT.budgetOptions[0],
          projectUrl: "",
          message: "",
        });
      } else {
        setErrorMessage(
          language === "fa"
            ? "ارسال پیام با مشکل مواجه شد. لطفاً دوباره تلاش کنید."
            : res.message || "Failed to submit message."
        );
        if (res.errors) {
          setFieldErrors(res.errors);
        }
      }
    } catch {
      setErrorMessage(
        language === "fa"
          ? "خطای ارتباط با سرور رخ داد. لطفاً اتصال اینترنت خود را بررسی نمایید."
          : "A network error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#0D0F12] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {successMessage ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.35, ease: EDITORIAL_EASE }}
            className="text-center py-12 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#00C3FF]/10 border border-[#00C3FF]/30 flex items-center justify-center text-[#00C3FF] mb-6 shadow-[0_0_25px_rgba(0, 195, 255,0.25)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-[#F8FAFC] mb-3 tracking-tight">
              {formT.successTitle}
            </h3>
            <p className="text-sm text-[#CBD5E1] max-w-md mx-auto leading-relaxed font-normal">
              {successMessage}
            </p>
            <button
              onClick={() => setSuccessMessage(null)}
              className="mt-8 px-6 py-3 rounded-lg bg-[#14171C] border border-[rgba(255,255,255,0.1)] text-xs font-semibold text-[#CBD5E1] hover:text-white hover:bg-[#1C2026] transition-all"
            >
              {formT.sendAnother}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EDITORIAL_EASE }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block mono-tag text-[#CBD5E1] text-[11px] font-medium mb-2">
                  {formT.nameLabel} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={formT.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-[#F8FAFC] text-xs focus:outline-none focus:border-[rgba(255,255,255,0.25)] placeholder:text-[#94A3B8]/60 transition-all duration-200"
                />
                {fieldErrors.name && (
                  <p className="text-red-400 text-xs mt-1">{fieldErrors.name[0]}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mono-tag text-[#CBD5E1] text-[11px] font-medium mb-2">
                  {formT.emailLabel} <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={formT.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-[#F8FAFC] text-xs focus:outline-none focus:border-[rgba(255,255,255,0.25)] placeholder:text-[#94A3B8]/60 transition-all duration-200"
                />
                {fieldErrors.email && (
                  <p className="text-red-400 text-xs mt-1">{fieldErrors.email[0]}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Company / Brand */}
              <div>
                <label className="block mono-tag text-[#CBD5E1] text-[11px] font-medium mb-2">
                  {formT.companyLabel}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={formT.companyPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-[#F8FAFC] text-xs focus:outline-none focus:border-[rgba(255,255,255,0.25)] placeholder:text-[#94A3B8]/60 transition-all duration-200"
                />
              </div>

              {/* Service */}
              <div>
                <label className="block mono-tag text-[#CBD5E1] text-[11px] font-medium mb-2">
                  {formT.serviceLabel}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-[#F8FAFC] text-xs focus:outline-none focus:border-[rgba(255,255,255,0.25)] transition-all duration-200"
                >
                  {formT.serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#14171C] text-[#F8FAFC]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Optional Project URL */}
              <div>
                <label className="block mono-tag text-[#CBD5E1] text-[11px] font-medium mb-2">
                  {formT.projectUrlLabel}
                </label>
                <input
                  type="url"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                  placeholder={formT.projectUrlPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-[#F8FAFC] text-xs focus:outline-none focus:border-[rgba(255,255,255,0.25)] placeholder:text-[#94A3B8]/60 transition-all duration-200"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block mono-tag text-[#CBD5E1] text-[11px] font-medium mb-2">
                  {formT.budgetLabel}
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-[#F8FAFC] text-xs focus:outline-none focus:border-[rgba(255,255,255,0.25)] transition-all duration-200"
                >
                  {formT.budgetOptions.map((b) => (
                    <option key={b} value={b} className="bg-[#14171C] text-[#F8FAFC]">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block mono-tag text-[#CBD5E1] text-[11px] font-medium mb-2">
                {formT.messageLabel} <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={formT.messagePlaceholder}
                className="w-full px-4 py-3.5 rounded-xl bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-[#F8FAFC] text-xs focus:outline-none focus:border-[rgba(255,255,255,0.25)] placeholder:text-[#94A3B8]/60 resize-y transition-all duration-200 leading-[1.8]"
              />
              {fieldErrors.message && (
                <p className="text-red-400 text-xs mt-1">{fieldErrors.message[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full py-3.5 rounded-xl bg-[#F2F2F0] text-[#08090B] font-semibold text-xs tracking-wide uppercase hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 select-none leading-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
                  <span className="leading-none">{formT.sendingButton}</span>
                </>
              ) : (
                <>
                  <span className="leading-none">{formT.sendButton}</span>
                  <Send className="w-4 h-4 shrink-0 text-[#00C3FF] rtl:-scale-x-100 transition-transform duration-200" />
                </>
              )}
            </button>

            {/* Direct WhatsApp & Email Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3 text-xs">
              <a
                href={`https://wa.me/491624212685?text=${encodeURIComponent(
                  formData.name
                    ? `سلام آقای یوسفی، پیام از طرف ${formData.name} (${formData.email}):\n${formData.message}`
                    : "سلام آقای یوسفی، می‌خواهم درباره یک پروژه با شما گفتگو کنم."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/40 text-neutral-300 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Direct</span>
              </a>

              <a
                href={`mailto:nazifyosufi072@gmail.com?subject=${encodeURIComponent(
                  `Inquiry from ${formData.name || "Portfolio Visitor"}`
                )}&body=${encodeURIComponent(formData.message || "")}`}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-[#00C3FF]" />
                <span>nazifyosufi072@gmail.com</span>
              </a>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
