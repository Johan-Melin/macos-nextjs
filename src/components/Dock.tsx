"use client";

import { useMemo, type ComponentType } from "react";
import { FiInfo, FiGlobe, FiGrid, FiSettings } from "react-icons/fi";

type DockItem = {
  label: "About" | "News" | "Programs" | "Settings";
  Icon: ComponentType<{ className?: string }>;
};

const items: DockItem[] = [
  { label: "About", Icon: FiInfo },
  { label: "News", Icon: FiGlobe },
  { label: "Programs", Icon: FiGrid },
  { label: "Settings", Icon: FiSettings },
];

export default function Dock() {
  const apps = useMemo(() => items, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Dock"
        className="pointer-events-auto flex gap-3 rounded-2xl border border-white/20 bg-white/25 p-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/30"
      >
        {apps.map(({ Icon, label }) => (
          <button
            key={label}
            className="group relative grid h-14 w-14 place-items-center rounded-xl bg-white/60 text-neutral-700 ring-inset transition-all duration-150 hover:-translate-y-0.5 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/20 md:h-16 md:w-16"
            title={label}
          >
            <Icon className="h-7 w-7 md:h-8 md:w-8" />
            <span className="pointer-events-none absolute -top-7 rounded-md bg-black/80 px-2 py-0.5 text-xs text-white opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100">
              {label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
