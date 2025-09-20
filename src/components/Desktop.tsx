"use client";

import { useAppWindow } from "../context/AppWindowContext";
import { useAppearance } from "../context/AppearanceContext";
import { useDesktopShortcuts } from "../context/DesktopShortcutsContext";
import { dockItems } from "../content/dock";
import { useState } from "react";
import ContextMenu from "./ContextMenu";

export default function Desktop() {
  const { open } = useAppWindow();
  const { desktopShortcutsOrientation } = useAppearance();
  const { shortcuts, remove } = useDesktopShortcuts();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [menuKey, setMenuKey] = useState<string | null>(null);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 select-none"
      aria-label="Desktop"
    >
      <div
        className={`pointer-events-auto p-4 md:p-6 grid gap-4 w-fit ${
          desktopShortcutsOrientation === "vertical" ? "grid-cols-1" : "grid-cols-4"
        }`}
      >
        {shortcuts.map((key) => {
          const match = dockItems.find((d) => d.key === key);
          if (!match) return null;
          const { title, Icon } = match;

          let pressTimer: number | null = null;

          const openMenu = (clientX: number, clientY: number) => {
            setMenuKey(key);
            setMenuPos({ x: clientX, y: clientY });
            setMenuOpen(true);
          };

          const onPointerDown = (e: React.PointerEvent) => {
            // long-press to open menu (600ms)
            const { clientX, clientY } = e;
            pressTimer = window.setTimeout(() => openMenu(clientX, clientY), 600);
          };
          const clearTimer = () => {
            if (pressTimer) {
              window.clearTimeout(pressTimer);
              pressTimer = null;
            }
          };

          return (
            <button
              key={key}
              onClick={() => open(key)}
              onContextMenu={(e) => {
                e.preventDefault();
                openMenu(e.clientX, e.clientY);
              }}
              onPointerDown={onPointerDown}
              onPointerUp={clearTimer}
              onPointerLeave={clearTimer}
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
          );
        })}
      </div>
      <ContextMenu
        open={menuOpen}
        x={menuPos.x}
        y={menuPos.y}
        onClose={() => setMenuOpen(false)}
        items={[
          {
            label: "Remove from Desktop",
            onClick: () => {
              if (menuKey) remove(menuKey as any);
            },
          },
        ]}
      />
    </div>
  );
}

