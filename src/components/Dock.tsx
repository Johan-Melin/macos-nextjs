"use client";

import { useMemo, useState } from "react";
import { useAppWindow } from "../context/AppWindowContext";
import { dockItems } from "../content/dock";
import { useAppearance } from "../context/AppearanceContext";
import { useDesktopShortcuts } from "../context/DesktopShortcutsContext";
import ContextMenu from "./ContextMenu";

export default function Dock() {
  const apps = useMemo(() => dockItems, []);
  const { toggle, activeApp } = useAppWindow();
  const { showDockLabels } = useAppearance();
  const { add, has } = useDesktopShortcuts();

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [menuKey, setMenuKey] = useState<string | null>(null);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-0 md:bottom-4 md:px-4"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <nav
        aria-label="Dock"
        className="pointer-events-auto flex w-full max-w-none items-center justify-around gap-1 border-t border-white/20 bg-white/70 p-1.5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/40 md:w-auto md:max-w-fit md:justify-center md:gap-3 md:rounded-2xl md:border md:p-2"
        style={{ color: "var(--dock-fg)" }}
      >
        {apps.map(({ Icon, title, key }) => {
          let pressTimer: number | null = null;

          const openMenu = (clientX: number, clientY: number) => {
            setMenuKey(key);
            setMenuPos({ x: clientX, y: clientY });
            setMenuOpen(true);
          };

          const onPointerDown = (e: any) => {
            // long-press (600ms) to open menu
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
              onClick={() => toggle(key as any)}
              onContextMenu={(e) => {
                e.preventDefault();
                openMenu(e.clientX, e.clientY);
              }}
              onPointerDown={onPointerDown}
              onPointerUp={clearTimer}
              onPointerLeave={clearTimer}
              className={`group relative flex flex-col items-center justify-center ${showDockLabels ? "gap-1 h-16 w-16" : "h-12 w-12 md:h-16 md:w-16"} rounded-xl ring-inset transition-colors duration-150 md:transition-transform md:hover:-translate-y-0.5`}
              style={{ color: "var(--dock-fg)" }}
              title={title}
            >
              <Icon className="h-6 w-6 md:h-8 md:w-8" style={{ color: "var(--dock-fg)" }} />
              {showDockLabels ? (
                <span className="mt-0.5 text-[10px] leading-none md:text-xs opacity-90" style={{ color: "var(--dock-fg)" }}>
                  {title}
                </span>
              ) : (
                <span className="pointer-events-none absolute -top-7 hidden rounded-md bg-black/80 px-2 py-0.5 text-xs text-white opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100 md:block">
                  {title}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <ContextMenu
        open={menuOpen}
        x={menuPos.x}
        y={menuPos.y}
        onClose={() => setMenuOpen(false)}
        items={[
          {
            label: has(menuKey as any) ? "Added to Desktop" : "Add to Desktop",
            onClick: () => {
              if (menuKey && !has(menuKey as any)) add(menuKey as any);
            },
            disabled: menuKey ? has(menuKey as any) : true,
          },
        ]}
      />
    </div>
  );
}

