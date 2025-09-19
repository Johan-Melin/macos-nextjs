"use client";

import { ReactNode } from "react";
import { useAppWindow } from "../context/AppWindowContext";

export default function MacWindow({ title, children }: { title: string; children: ReactNode }) {
  const { close } = useAppWindow();

  return (
    <div
      className="pointer-events-auto overflow-hidden bg-white/95 text-neutral-800 shadow-2xl backdrop-blur-xl dark:bg-neutral-900/95 dark:text-neutral-100
                 fixed inset-0 md:static md:overflow-hidden md:rounded-xl md:border md:border-white/20 md:bg-white/80 md:dark:border-white/10 md:dark:bg-neutral-900/80"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Titlebar */}
      <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-black/5 bg-gradient-to-b from-white/80 to-white/50 px-3 py-2 backdrop-blur md:static md:border-b md:from-white/70 md:to-white/40 dark:border-white/10 dark:from-neutral-900/70 dark:to-neutral-900/50 md:dark:from-neutral-900/60 md:dark:to-neutral-900/40">
        {/* Traffic lights */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Close"
            onClick={close}
            className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ff5f57] ring-inset transition hover:brightness-95"
          >
            <span className="sr-only">Close</span>
          </button>
          <div className="h-3.5 w-3.5 rounded-full bg-[#febc2e]" />
          <div className="h-3.5 w-3.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto select-none text-sm font-medium opacity-70">
          {title}
        </div>
      </div>
      {/* Content */}
      <div className="h-[calc(100dvh-48px)] overflow-auto p-4 md:h-auto md:max-h-[70vh] md:w-[90vw] md:max-w-2xl md:overflow-auto md:p-4 md:w-[640px]">
        {children}
      </div>
    </div>
  );
}
