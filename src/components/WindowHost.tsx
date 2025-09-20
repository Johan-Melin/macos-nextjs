"use client";

// WindowHost renders the active app's content in a MacWindow.
// Content lives under `src/content/dock/` where each file is a standalone module
// that default-exports a React component and exports a `title` string.
// To customize: add/remove files in that folder and register them in index.ts.

import MacWindow from "./MacWindow";
import { useAppWindow } from "../context/AppWindowContext";
import { dockContentRegistry, type DockKey } from "../content/dock";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppearance } from "../context/AppearanceContext";

export default function WindowHost() {
  const { activeApp } = useAppWindow();
  const { animations } = useAppearance();

  // Manage animated presence: keep the window mounted during exit animation
  const [mountedKey, setMountedKey] = useState<DockKey | null>(null);
  const [anim, setAnim] = useState<"enter" | "idle" | "exit">("idle");
  const exitTimer = useRef<number | null>(null);

  const mod = useMemo(() => {
    if (!mountedKey) return null;
    return dockContentRegistry[mountedKey] ?? null;
  }, [mountedKey]);

  // Sync activeApp to mountedKey with animations
  useEffect(() => {
    // New window open
    if (activeApp) {
      // If switching between apps, just swap content and play enter
      setMountedKey(activeApp as DockKey);
      if (!animations) {
        setAnim("idle");
        return;
      }
      // Important: render first frame as 'enter' (opacity 0) to avoid flash,
      // then transition to 'idle' on the next frame.
      setAnim("enter");
      const raf = requestAnimationFrame(() => setAnim("idle"));
      return () => cancelAnimationFrame(raf);
    }

    // Close current window -> play exit then unmount
    if (!activeApp && mountedKey) {
      if (!animations) {
        setMountedKey(null);
        setAnim("idle");
        return;
      }
      setAnim("exit");
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
      exitTimer.current = window.setTimeout(() => {
        setMountedKey(null);
        setAnim("idle");
      }, 180);
    }
  }, [activeApp, mountedKey, animations]);

  useEffect(() => () => {
    if (exitTimer.current) window.clearTimeout(exitTimer.current);
  }, []);

  if (!mountedKey || !mod) return null;

  const { Component, title } = mod;

  // Animation classes
  const wrapperBase = `pointer-events-none fixed inset-0 z-40 flex items-center justify-center px-4 py-8 md:py-16 ${
    animations ? "transition-all duration-200 ease-out" : ""
  }`;
  const stateClass = animations
    ? anim === "enter"
      ? "opacity-0 translate-y-2 scale-[0.98]"
      : anim === "exit"
      ? "opacity-0 translate-y-2 scale-[0.98]"
      : "opacity-100 translate-y-0 scale-100"
    : "opacity-100 translate-y-0 scale-100";

  return (
    <div className={`${wrapperBase} ${stateClass}`}>
      <MacWindow title={title}>
        <Component />
      </MacWindow>
    </div>
  );
}
