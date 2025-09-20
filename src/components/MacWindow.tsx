"use client";

import { ReactNode } from "react";
import { useAppWindow } from "../context/AppWindowContext";
import { useAppearance } from "../context/AppearanceContext";

export default function MacWindow({ title, children }: { title: string; children: ReactNode }) {
  const { close } = useAppWindow();
  const { osStyle } = useAppearance();

  return (
    <div
      className="pointer-events-auto overflow-hidden shadow-2xl backdrop-blur-xl
                 fixed inset-0 md:static md:overflow-hidden md:rounded-xl md:border md:border-white/20 md:dark:border-white/10"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        background: "var(--window-bg)",
        color: "var(--foreground)",
      }}
    >
      {/* Titlebar */}
      <div
        className="sticky top-0 z-10 relative flex items-center gap-2 border-b border-black/5 px-3 py-2 backdrop-blur md:static dark:border-white/10"
        style={{ background: "var(--panel-bg)" }}
      >
        {osStyle === "mac" ? (
          <>
            {/* macOS close (traffic light) on the left */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Close"
                onClick={close}
                className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ff5f57] ring-inset transition hover:brightness-95"
              >
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 select-none text-sm font-medium opacity-70">
              {title}
            </div>
          </>
        ) : (
          <>
            {/* Windows close on the right */}
            <div className="absolute left-3 select-none text-sm font-medium opacity-70">
              {title}
            </div>
            <div className="ml-auto flex items-center">
              <button
                aria-label="Close"
                onClick={close}
                className="grid h-7 w-11 place-items-center rounded hover:bg-red-500/90 hover:text-white transition-colors"
                title="Close"
              >
                <span aria-hidden className="text-base leading-none">×</span>
              </button>
            </div>
          </>
        )}
      </div>
      {/* Content */}
      <div className="h-[calc(100dvh-48px)] overflow-auto p-4 md:h-auto md:max-h-[70vh] md:w-[90vw] md:max-w-2xl md:overflow-auto md:p-4 md:w-[640px]">
        {children}
      </div>
    </div>
  );
}
