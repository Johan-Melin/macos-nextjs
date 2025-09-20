"use client";

import { desktopItems } from "../content/desktop";
import { useAppWindow } from "../context/AppWindowContext";

export default function Desktop() {
  const { open } = useAppWindow();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 select-none"
      aria-label="Desktop"
    >
      <div className="pointer-events-auto p-4 md:p-6 grid grid-cols-4 gap-4 w-fit">
        {desktopItems.map(({ key, title, Icon }) => (
          <button
            key={key}
            onClick={() => open(key)}
            className="group flex flex-col items-center gap-2 rounded-md p-2 hover:bg-white/20 hover:backdrop-blur-sm transition"
            title={title}
          >
            <span className="grid h-14 w-14 place-items-center rounded-lg bg-white/70 dark:bg-black/30 shadow-sm" style={{ color: "var(--dock-fg)" }}>
              <Icon className="h-7 w-7" />
            </span>
            <span className="text-xs font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
              {title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

