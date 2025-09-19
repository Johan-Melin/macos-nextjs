"use client";

import { useMemo } from "react";
import { useAppWindow } from "../context/AppWindowContext";
import { dockItems } from "../content/dock";

export default function Dock() {
  const apps = useMemo(() => dockItems, []);
  const { toggle, activeApp } = useAppWindow();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-0 md:bottom-4 md:px-4"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <nav
        aria-label="Dock"
        className="pointer-events-auto flex w-full max-w-none items-center justify-around gap-1 border-t border-white/20 bg-white/70 p-1.5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/40 md:w-auto md:max-w-fit md:justify-center md:gap-3 md:rounded-2xl md:border md:p-2"
      >
        {apps.map(({ Icon, title, key }) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`group relative grid h-12 w-12 place-items-center rounded-xl ring-inset transition-colors duration-150 md:h-16 md:w-16 md:transition-transform md:hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/60 
            ${activeApp === key ? "bg-white text-neutral-900 dark:bg-white/20 dark:text-white" : "bg-white/60 text-neutral-700 md:hover:bg-white/80 dark:bg-white/10 dark:text-neutral-200 md:dark:hover:bg-white/20"}`}
            title={title}
          >
            <Icon className="h-6 w-6 md:h-8 md:w-8" />
            <span className="pointer-events-none absolute -top-7 hidden rounded-md bg-black/80 px-2 py-0.5 text-xs text-white opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100 md:block">
              {title}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
