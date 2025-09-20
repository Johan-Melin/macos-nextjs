"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AppearanceMode = "system" | "light" | "dark" | "auto";

export type AppearanceState = {
  mode: AppearanceMode;
  tint: string; // hex color to tint UI subtly
  backgroundStyle: "solid" | "linear" | "radial";
  animations: boolean;
  showDockLabels: boolean;
};

type AppearanceContextValue = AppearanceState & {
  setMode: (m: AppearanceMode) => void;
  setTint: (hex: string) => void;
  setBackgroundStyle: (s: AppearanceState["backgroundStyle"]) => void;
  setAnimations: (a: boolean) => void;
  setShowDockLabels: (v: boolean) => void;
};

const STORAGE_KEY = "macos-appearance";

const DEFAULT_STATE: AppearanceState = {
  mode: "system",
  tint: "#a2845e", // a pleasant brown by default
  backgroundStyle: "solid",
  animations: true,
  showDockLabels: false,
};

const AppearanceContext = createContext<AppearanceContextValue | undefined>(undefined);

export function AppearanceProvider({ children }: { children: ReactNode }) {
  // Initialize with defaults on both server and first client render.
  // Then, after mount, merge any saved preferences from localStorage.
  const [state, setState] = useState<AppearanceState>(DEFAULT_STATE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<AppearanceState>;
        setState((s) => ({ ...s, ...saved }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const hour = new Date().getHours();
    const autoDark = hour < 7 || hour >= 19; // simple 7-19 schedule

    const systemDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;

    const dark = state.mode === "dark" || (state.mode === "system" && systemDark) || (state.mode === "auto" && autoDark);

    // Toggle Tailwind dark:
    root.classList.toggle("dark", dark);
    root.setAttribute("data-theme", dark ? "dark" : "light");
    root.style.colorScheme = dark ? "dark" : "light";

    // Compute base surfaces and subtle tint
    // Base backgrounds for site
    const baseBg = dark ? "#1f2937" : "#ffffff"; // stronger dark base
    const fg = dark ? "#ededed" : "#171717";

    // Apply site foreground
    root.style.setProperty("--foreground", fg);

    const tint = state.tint;

    // Backgrounds depending on preference
    const solidBg = dark
      ? `color-mix(in oklab, ${baseBg} 85%, ${tint} 15%)`
      : `color-mix(in oklab, ${baseBg} 90%, ${tint} 10%)`;
    const linearBg = dark
      ? `linear-gradient(135deg, color-mix(in oklab, ${baseBg} 78%, ${tint} 22%) 0%, ${baseBg} 55%, color-mix(in oklab, ${baseBg} 85%, ${tint} 15%) 100%)`
      : `linear-gradient(135deg, color-mix(in oklab, ${baseBg} 88%, ${tint} 12%) 0%, ${baseBg} 60%, color-mix(in oklab, ${baseBg} 92%, ${tint} 8%) 100%)`;
    const radialBg = dark
      ? `radial-gradient(1200px circle at 15% 10%, color-mix(in oklab, ${baseBg} 78%, ${tint} 22%) 0%, ${baseBg} 55%)`
      : `radial-gradient(1200px circle at 15% 10%, color-mix(in oklab, ${baseBg} 90%, ${tint} 10%) 0%, ${baseBg} 60%)`;
    const pageBg = state.backgroundStyle === "linear" ? linearBg : state.backgroundStyle === "radial" ? radialBg : solidBg;

    // Window and panel with stronger tint; panel slightly contrasted from window
    const windowBg = dark
      ? `color-mix(in oklab, ${baseBg} 75%, ${tint} 25%)`
      : `color-mix(in oklab, ${baseBg} 88%, ${tint} 12%)`;
    const panelBg = dark
      ? `color-mix(in oklab, ${windowBg} 82%, white 18%)` // ~#374151 for tint near gray
      : `color-mix(in oklab, ${windowBg} 92%, black 8%)`;

    // Use the tinted mix as the global background so the whole site subtly tints
    root.style.setProperty("--background", pageBg);
    root.style.setProperty("--window-bg", windowBg);
    root.style.setProperty("--panel-bg", panelBg);
    // High contrast dock icon/text color
    root.style.setProperty("--dock-fg", dark ? "#ffffff" : "#0b0b0c");

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo<AppearanceContextValue>(
    () => ({
      ...state,
      setMode: (mode) => setState((s) => ({ ...s, mode })),
      setTint: (tint) => setState((s) => ({ ...s, tint })),
      setBackgroundStyle: (backgroundStyle) => setState((s) => ({ ...s, backgroundStyle })),
      setAnimations: (animations) => setState((s) => ({ ...s, animations })),
      setShowDockLabels: (showDockLabels) => setState((s) => ({ ...s, showDockLabels })),
    }),
    [state]
  );

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
}

export function useAppearance() {
  const ctx = useContext(AppearanceContext);
  if (!ctx) throw new Error("useAppearance must be used within AppearanceProvider");
  return ctx;
}

