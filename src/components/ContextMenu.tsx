"use client";

import { useEffect } from "react";

type MenuItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function ContextMenu({
  open,
  x,
  y,
  onClose,
  items,
}: {
  open: boolean;
  x: number;
  y: number;
  onClose: () => void;
  items: MenuItem[];
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onClick = (e: MouseEvent) => {
      onClose();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      <div
        className="pointer-events-auto min-w-[160px] max-w-[220px] overflow-hidden rounded-md border border-black/10 bg-white/90 p-1 text-sm shadow-xl backdrop-blur dark:border-white/10 dark:bg-black/60"
        style={{ left: x, top: y, position: "fixed" }}
        role="menu"
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (item.disabled) return;
              item.onClick();
              onClose();
            }}
            className={`block w-full select-none rounded px-2 py-1 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${
              item.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            role="menuitem"
            aria-disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
