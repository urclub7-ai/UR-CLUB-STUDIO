"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem("site_theme") as Theme | null;
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
        applyTheme(savedTheme, false);
      } else {
        // Automatically match system theme (phone or computer OS theme)
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        const systemTheme: Theme = prefersDark ? "dark" : "light";
        setThemeState(systemTheme);
        applyTheme(systemTheme, false);
      }

      // Listen for OS system theme changes if no manual preference is locked
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemChange = (e: MediaQueryListEvent) => {
        const manualSaved = localStorage.getItem("site_theme");
        if (!manualSaved) {
          const autoTheme: Theme = e.matches ? "dark" : "light";
          setThemeState(autoTheme);
          applyTheme(autoTheme, false);
        }
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleSystemChange);
        return () => mediaQuery.removeEventListener("change", handleSystemChange);
      }
    } catch {
      // fallback
    }
  }, []);

  const applyTheme = (targetTheme: Theme, persist = true) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(targetTheme);
    root.setAttribute("data-theme", targetTheme);
    if (persist) {
      try {
        localStorage.setItem("site_theme", targetTheme);
      } catch {}
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme, true);
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
