import { Variants, Transition } from "framer-motion";

/**
 * Editorial cubic-bezier easing curve.
 * Subtle, confident, and smooth.
 */
export const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;
export const SMOOTH_EASE = [0.25, 0.1, 0.25, 1] as const;

export const TRANSITION_FAST: Transition = {
  duration: 0.2,
  ease: EDITORIAL_EASE,
};

export const TRANSITION_BASE: Transition = {
  duration: 0.4,
  ease: EDITORIAL_EASE,
};

export const TRANSITION_SLOW: Transition = {
  duration: 0.55,
  ease: EDITORIAL_EASE,
};

export const defaultViewport = {
  once: true,
  margin: "50px",
};

/**
 * Page entrance variants — minimal, confident.
 */
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: EDITORIAL_EASE,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

export const reducedPageVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.15, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1, ease: "easeIn" },
  },
};

/**
 * Fade in — no translation.
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: EDITORIAL_EASE },
  },
};

/**
 * Subtle upward reveal — 12px offset (was 16).
 */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EDITORIAL_EASE },
  },
};

export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EDITORIAL_EASE },
  },
};

/**
 * Staggered container — tighter timing.
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.03,
    },
  },
};

export const staggerFastContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EDITORIAL_EASE },
  },
};

/**
 * Modal backdrop.
 */
export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

/**
 * Modal content.
 */
export const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: EDITORIAL_EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 4,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};
