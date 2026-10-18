import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        editorial: {
          bg: "#08090B",
          card: "#0D0F12",
          border: "rgba(255, 255, 255, 0.10)",
          text: "#F2F2F0",
          muted: "#8C8F96",
          subtle: "#555860",
        },
        surface: {
          50: "#fbfbfc",
          100: "#f4f4f6",
          200: "#e9e9ed",
          300: "#d6d6de",
          400: "#a3a3b3",
          500: "#73738c",
          600: "#525266",
          700: "#363644",
          800: "#22222b",
          900: "#131318",
          950: "#0b0b0e",
        },
        brand: {
          50: "#f3f6ff",
          100: "#e6edfe",
          200: "#cedcfe",
          300: "#a6c0fd",
          400: "#779bfb",
          500: "#4f72f7",
          600: "#344eed",
          700: "#2739d8",
          800: "#232fb0",
          900: "#222c8b",
          950: "#181c55",
        },
        accent: {
          electric: "#00f0ff",
          lime: "#c8ff00",
          amber: "#f59e0b",
        },
      },
      maxWidth: {
        editorial: "1200px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-sans)", "Inter", "sans-serif"],
        persian: ["Yekan Bakh", "YekanBakh", "var(--font-vazir)", "Vazirmatn", "Tahoma", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(3rem, 6vw, 6.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "500" }],
        "section-title": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "500" }],
      },
      animation: {
        "fade-in": "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
