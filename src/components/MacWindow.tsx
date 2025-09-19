"use client";

import { ReactNode } from "react";
import { useAppWindow } from "../context/AppWindowContext";

export default function MacWindow({ title, children }: { title: string; children: ReactNode }) {
  const { close } = useAppWindow();

  return (
    <div className="pointer-events-auto overflow-hidden rounded-xl border border-white/20 bg-white/80 text-neutral-800 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/80 dark:text-neutral-100">
      {/* Titlebar */}
      <div className="flex items-center gap-2 border-b border-black/5 bg-gradient-to-b from-white/70 to-white/40 px-3 py-2 dark:border-white/10 dark:from-neutral-900/60 dark:to-neutral-900/40">
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
      <div className="max-h-[70vh] w-[90vw] max-w-2xl overflow-auto p-4 md:w-[640px]">
        {children}
      </div>
    </div>
  );
}
