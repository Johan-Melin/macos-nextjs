"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import type { DockKey } from "../content/dock";

export type AppKey = DockKey | null;

type AppWindowContextValue = {
  activeApp: AppKey;
  open: (app: Exclude<AppKey, null>) => void;
  close: () => void;
  toggle: (app: Exclude<AppKey, null>) => void;
};

const AppWindowContext = createContext<AppWindowContextValue | undefined>(undefined);

export function AppWindowProvider({ children }: { children: ReactNode }) {
  // Default to opening the News window on initial load
  const [activeApp, setActiveApp] = useState<AppKey>("News");

  const value = useMemo<AppWindowContextValue>(() => ({
    activeApp,
    open: (app) => setActiveApp(app),
    close: () => setActiveApp(null),
    toggle: (app) => setActiveApp((curr) => (curr === app ? null : app)),
  }), [activeApp]);

  return (
    <AppWindowContext.Provider value={value}>{children}</AppWindowContext.Provider>
  );
}

export function useAppWindow() {
  const ctx = useContext(AppWindowContext);
  if (!ctx) throw new Error("useAppWindow must be used within AppWindowProvider");
  return ctx;
}
