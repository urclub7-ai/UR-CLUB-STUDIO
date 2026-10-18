"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Award, ExternalLink, FileText, CheckCircle2, X } from "lucide-react";
import { EDITORIAL_EASE, modalBackdropVariants, modalContentVariants } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n";

export interface CertificateItemProps {
  id: string;
  title: string;
  title_fa?: string | null;
  issuer: string;
  issuer_fa?: string | null;
  issueDate: string;
  expirationDate?: string | null;
  expirationDate_fa?: string | null;
  credentialId?: string | null;
  score?: string | null;
  verificationUrl?: string | null;
  description?: string | null;
  description_fa?: string | null;
  certificateImage?: string | null;
  pdfFile?: string | null;
  skillsCovered?: string | null;
  skillsCovered_fa?: string | null;
  featured?: boolean;
}

interface CertificateModalProps {
  certificate: CertificateItemProps;
  index?: number;
}

/** Helper: pick the correct field based on language, fallback to EN */
function loc(en: string | null | undefined, fa: string | null | undefined, isFa: boolean): string {
  if (isFa && fa && fa.trim().length > 0) return fa;
  return en || "";
}

export default function CertificateModal({ certificate, index = 0 }: CertificateModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { t, language } = useLanguage();
  const pageT = t.certificatesPage;
  const isFa = language === "fa";

  const displayTitle = loc(certificate.title, certificate.title_fa, isFa);
  const displayIssuer = loc(certificate.issuer, certificate.issuer_fa, isFa);
  const displayDescription = loc(certificate.description, certificate.description_fa, isFa);
  const displayExpiration = loc(certificate.expirationDate, certificate.expirationDate_fa, isFa);
  const displaySkills = loc(certificate.skillsCovered, certificate.skillsCovered_fa, isFa);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const skills = displaySkills
    ? displaySkills.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean)
    : [];

  const hasRealVerification = !!certificate.verificationUrl && certificate.verificationUrl.trim().length > 0;

  return (
    <>
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{
          duration: 0.45,
          delay: prefersReducedMotion ? 0 : Math.min(index * 0.08, 0.35),
          ease: EDITORIAL_EASE,
        }}
        whileHover={prefersReducedMotion ? {} : { y: -4 }}
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0D0F12]/80 p-6 sm:p-8 hover:border-[rgba(255,255,255,0.2)] hover:bg-[#0D0F12] transition-all duration-300 flex flex-col justify-between select-none will-change-transform"
      >
        <div>
          {/* Certificate Image Banner */}
          {certificate.certificateImage ? (
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#060709] border border-[rgba(255,255,255,0.08)] mb-5 group-hover:border-[#00C3FF]/40 transition-all duration-500 flex items-center justify-center p-3.5">
              <div
                className="absolute inset-0 bg-cover bg-center blur-3xl opacity-50 scale-150 saturate-[2.2] brightness-110 pointer-events-none transition-all duration-500 group-hover:opacity-75 group-hover:scale-165"
                style={{ backgroundImage: `url(${certificate.certificateImage})` }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(6,7,9,0.75)_100%)] pointer-events-none" />
              <div className="relative w-full h-full z-10 flex items-center justify-center">
                <Image
                  src={certificate.certificateImage}
                  alt={displayTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.7)] rounded-md group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          ) : (
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#14171C] via-[#0D0F12] to-[#08090B] border border-[rgba(255,255,255,0.06)] mb-5 flex items-center justify-center group-hover:border-[#00C3FF]/30 transition-all duration-300">
              <div className="flex flex-col items-center gap-2 text-[#94A3B8] group-hover:text-[#00C3FF] transition-colors">
                <Award className="w-10 h-10 stroke-[1.5]" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#CBD5E1]">
                  {displayIssuer}
                </span>
              </div>
            </div>
          )}

          {/* Header Badges */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="mono-tag text-[10.5px] font-medium text-[#CBD5E1] bg-[#14171C] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.08)]">
              {displayIssuer}
            </span>
            <span className="mono-tag text-[10.5px] font-mono text-[#94A3B8]">
              {certificate.issueDate}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-[#F8FAFC] group-hover:text-white transition-colors">
            {displayTitle}
          </h3>

          {displayDescription && (
            <p className="text-[13.5px] text-[#CBD5E1] mt-3 line-clamp-3 leading-[1.8] font-normal">
              {displayDescription}
            </p>
          )}

          {certificate.score && (
            <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-[11px] font-mono rtl:font-sans text-[#CBD5E1] leading-none">
              <span className="leading-none">{isFa ? "نمره کسب‌شده:" : "Score Achieved:"}</span>
              <span className="font-bold text-[#00C3FF] font-mono leading-none">{certificate.score}</span>
            </div>
          )}
        </div>

        <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          {hasRealVerification ? (
            <div className="flex items-center gap-1.5 text-xs text-[#00C3FF] font-mono rtl:font-sans leading-none">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span className="leading-none">{isFa ? "مدرک معتبر" : "Verified Credential"}</span>
            </div>
          ) : (
            <span className="text-xs text-[#94A3B8] font-mono rtl:font-sans leading-none">
              {isFa ? "سرتیفیکت رسمی" : "Official Certificate"}
            </span>
          )}

          {hasRealVerification ? (
            <a
              href={certificate.verificationUrl!}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F2F2F0] text-[#08090B] hover:bg-white text-xs font-semibold uppercase rtl:normal-case shadow-sm hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 leading-none group/btn cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="leading-none font-sans font-semibold whitespace-nowrap">{pageT.verifyOnline}</span>
              <ExternalLink className="w-3 h-3 text-[#00C3FF] shrink-0 rtl:rotate-90 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14171C] border border-[rgba(255,255,255,0.1)] text-[#F8FAFC] hover:bg-white hover:text-[#08090B] text-xs font-semibold uppercase rtl:normal-case shadow-sm hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 leading-none group/btn cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="leading-none font-sans font-semibold whitespace-nowrap">{pageT.viewCert}</span>
              <ExternalLink className="w-3 h-3 text-[#00C3FF] shrink-0 rtl:rotate-90 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={handleClose}
          >
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#0D0F12] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 rtl:right-auto rtl:left-6 p-2 rounded-full bg-[#14171C] text-[#00C3FF] hover:text-white hover:bg-[#1C2026] transition-colors"
                aria-label="Close Modal (Esc)"
              >
                <X className="w-5 h-5 text-[#00C3FF]" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#00C3FF]/10 border border-[#00C3FF]/20 text-[#00C3FF]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="mono-tag text-xs font-medium text-[#A0A5B2] block">{displayIssuer}</span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#F8FAFC]">{displayTitle}</h3>
                </div>
              </div>

              {/* Certificate Image Preview */}
              {certificate.certificateImage && (
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] my-6 bg-[#060709] flex items-center justify-center p-4">
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-3xl opacity-50 scale-150 saturate-[2.2] brightness-110 pointer-events-none"
                    style={{ backgroundImage: `url(${certificate.certificateImage})` }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(6,7,9,0.75)_100%)] pointer-events-none" />
                  <div className="relative w-full h-full z-10 flex items-center justify-center">
                    <Image
                      src={certificate.certificateImage}
                      alt={displayTitle}
                      fill
                      sizes="100vw"
                      className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.75)] rounded-md"
                    />
                  </div>
                </div>
              )}

              {displayDescription && (
                <div className="text-sm text-[#CBD5E1] leading-[1.8] font-normal mt-4">
                  {displayDescription}
                </div>
              )}

              {/* Key Metadata Table */}
              <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[#94A3B8] block mono-tag text-[10px] mb-1">{pageT.issueDate}</span>
                  <span className="text-[#F8FAFC] font-medium">{certificate.issueDate}</span>
                </div>
                {certificate.score && (
                  <div>
                    <span className="text-[#94A3B8] block mono-tag text-[10px] mb-1">{isFa ? "نمره" : "Score"}</span>
                    <span className="text-[#00C3FF] font-mono font-bold">{certificate.score}</span>
                  </div>
                )}
                <div>
                  <span className="text-[#94A3B8] block mono-tag text-[10px] mb-1">{isFa ? "اعتبار" : "Validity"}</span>
                  <span className="text-[#F8FAFC] font-medium">
                    {displayExpiration || (isFa ? "دایمی و معتبر" : "Verified")}
                  </span>
                </div>
                {certificate.credentialId && (
                  <div className="col-span-2 sm:col-span-3">
                    <span className="text-[#94A3B8] block mono-tag text-[10px] mb-1">{pageT.credentialId}</span>
                    <span className="text-[#CBD5E1] font-mono text-xs select-all bg-[#14171C] px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] inline-block mt-1">
                      {certificate.credentialId}
                    </span>
                  </div>
                )}
              </div>

              {/* Skills Tags */}
              {skills.length > 0 && (
                <div className="mt-6">
                  <span className="text-[#A0A5B2] block mono-tag text-[10px] font-medium mb-2">
                    {isFa ? "مهارت‌های ارزیابی‌شده" : "Competencies Evaluated"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#14171C] border border-[rgba(255,255,255,0.08)] text-xs text-[#CBD5E1]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center gap-3">
                {hasRealVerification && (
                  <a
                    href={certificate.verificationUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F2F2F0] text-[#08090B] font-semibold text-xs uppercase rtl:normal-case hover:bg-white transition-all shadow-md leading-none"
                  >
                    <span className="leading-none">{pageT.verifyOnline}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 rtl:rotate-90" />
                  </a>
                )}
                {certificate.pdfFile && (
                  <a
                    href={certificate.pdfFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#14171C] border border-[rgba(255,255,255,0.1)] text-[#CBD5E1] font-semibold text-xs uppercase rtl:normal-case hover:text-white transition-colors leading-none"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span className="leading-none">{pageT.viewCert}</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
