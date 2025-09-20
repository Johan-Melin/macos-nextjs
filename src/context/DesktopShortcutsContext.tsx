"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DockKey } from "../content/dock";
import { desktopItems as defaultDesktopItems } from "../content/desktop";

const STORAGE_KEY = "macos-desktop-shortcuts";

type DesktopShortcutsContextValue = {
  shortcuts: DockKey[];
  has: (key: DockKey) => boolean;
  add: (key: DockKey) => void;
  remove: (key: DockKey) => void;
  toggle: (key: DockKey) => void;
};

const DesktopShortcutsContext = createContext<DesktopShortcutsContextValue | undefined>(undefined);

export function DesktopShortcutsProvider({ children }: { children: ReactNode }) {
  // Initialize with defaults (SSR-safe), then hydrate from localStorage after mount
  const [shortcuts, setShortcuts] = useState<DockKey[]>(() => defaultDesktopItems.map((d) => d.key as DockKey));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as DockKey[];
        setShortcuts(saved);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shortcuts));
    } catch {}
  }, [shortcuts]);

  const value = useMemo<DesktopShortcutsContextValue>(() => ({
    shortcuts,
    has: (key) => shortcuts.includes(key),
    add: (key) => setShortcuts((s) => (s.includes(key) ? s : [...s, key])),
    remove: (key) => setShortcuts((s) => s.filter((k) => k !== key)),
    toggle: (key) => setShortcuts((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key])),
  }), [shortcuts]);

  return <DesktopShortcutsContext.Provider value={value}>{children}</DesktopShortcutsContext.Provider>;
}

export function useDesktopShortcuts() {
  const ctx = useContext(DesktopShortcutsContext);
  if (!ctx) throw new Error("useDesktopShortcuts must be used within DesktopShortcutsProvider");
  return ctx;
}
