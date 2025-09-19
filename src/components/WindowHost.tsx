"use client";

// WindowHost renders the active app's content in a MacWindow.
// Content lives under `src/content/dock/` where each file is a standalone module
// that default-exports a React component and exports a `title` string.
// To customize: add/remove files in that folder and register them in index.ts.

import MacWindow from "./MacWindow";
import { useAppWindow } from "../context/AppWindowContext";
import { dockContentRegistry, type DockKey } from "../content/dock";

export default function WindowHost() {
  const { activeApp } = useAppWindow();

  if (!activeApp) return null;

  const key = activeApp as DockKey;
  const mod = dockContentRegistry[key];

  if (!mod) return null;

  const { Component, title } = mod;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4 py-8 md:py-16">
      <MacWindow title={title}>
        <Component />
      </MacWindow>
    </div>
  );
}
