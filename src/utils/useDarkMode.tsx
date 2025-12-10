"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react"; // Type-only import

type ThemeMode = "light" | "dark" | "system";

interface DarkModeContextProps {
  darkMode: boolean;
  themeMode: ThemeMode;
  toggleDarkMode: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

const getSystemTheme = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

interface DarkModeProviderProps {
  children: ReactNode;
}

const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("themeMode") as ThemeMode;
      return saved || "system";
    }
    return "system";
  });

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("themeMode") as ThemeMode;
    if (saved === "system" || !saved) {
      return getSystemTheme();
    }
    return saved === "dark";
  });

  // Update dark mode based on theme mode
  useEffect(() => {
    if (themeMode === "system") {
      const systemDark = getSystemTheme();
      setDarkMode(systemDark);
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        setDarkMode(e.matches);
      };
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      setDarkMode(themeMode === "dark");
    }
  }, [themeMode]);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("themeMode", mode);
    }
  };

  const toggleDarkMode = () => {
    // Cycle through: system -> light -> dark -> system
    if (themeMode === "system") {
      setThemeMode("light");
    } else if (themeMode === "light") {
      setThemeMode("dark");
    } else {
      setThemeMode("system");
    }
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, themeMode, toggleDarkMode, setThemeMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeProvider, useDarkMode };