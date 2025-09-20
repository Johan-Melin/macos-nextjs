"use client";

export const title = "Settings";

export default function Settings() {
  return <AppearanceSettings />;
}

import { useAppearance } from "../../context/AppearanceContext";

function AppearanceSettings() {
  const { mode, setMode, tint, setTint, backgroundStyle, setBackgroundStyle, animations, setAnimations, showDockLabels, setShowDockLabels } = useAppearance();

  const swatches: { name: string; hex: string }[] = [
    { name: "Graphite", hex: "#8e8e93" },
    { name: "Blue", hex: "#0a84ff" },
    { name: "Red", hex: "#ff453a" },
    { name: "Green", hex: "#30d158" },
    { name: "Orange", hex: "#ff9f0a" },
    { name: "Purple", hex: "#af52de" },
  ];

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Appearance</h2>
      </header>

      {/* Mode */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium opacity-80">Mode</h3>
        <div className="inline-flex overflow-hidden rounded-lg border border-black/10 bg-white/60 shadow-sm dark:border-white/10 dark:bg-white/10">
          {([
            { key: "system", label: "System", tip: "Match your OS appearance setting" },
            { key: "light", label: "Light", tip: "Always use Light appearance" },
            { key: "dark", label: "Dark", tip: "Always use Dark appearance" },
            { key: "auto", label: "Auto", tip: "Light by day, Dark by night (based on local time)" },
          ] as const).map(({ key, label, tip }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`px-3 py-1.5 text-sm transition-colors ${
                mode === key
                  ? "bg-white dark:bg-black/20 font-bold"
                  : "hover:bg-white/70 dark:hover:bg-white/10"
              }`}
              title={tip}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Dock */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium opacity-80">Dock labels</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDockLabels(!showDockLabels)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm shadow-sm transition-colors ${
              showDockLabels
                ? "border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/10"
                : "border-black/10 bg-white dark:border-white/10 dark:bg-white/10"
            }`}
            title="Show app names under Dock icons"
            aria-pressed={showDockLabels}
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: showDockLabels ? "#10b981" : "#9ca3af" }} />
            {showDockLabels ? "On" : "Off"}
          </button>
          <p className="text-xs opacity-60">Toggle labels under Dock icons.</p>
        </div>
      </section>

      {/* Tint */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium opacity-80">Tint</h3>
        <div className="flex flex-wrap items-center gap-3">
          {swatches.map(({ name, hex }) => (
            <TintDot key={hex} color={hex} label={name} active={tint.toLowerCase() === hex.toLowerCase()} onClick={() => setTint(hex)} />
          ))}
        </div>
      </section>

      {/* Desktop Background */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium opacity-80">Background</h3>
        <div className="inline-flex overflow-hidden rounded-lg border border-black/10 bg-white/60 shadow-sm dark:border-white/10 dark:bg-white/10">
          {([
            { key: "solid", label: "Solid", tip: "Softly tinted solid background" },
            { key: "linear", label: "Linear", tip: "Tinted linear gradient background" },
            { key: "radial", label: "Radial", tip: "Tinted radial gradient background" },
          ] as const).map(({ key, label, tip }) => (
            <button
              key={key}
              onClick={() => setBackgroundStyle(key)}
              className={`px-3 py-1.5 text-sm transition-colors ${
                backgroundStyle === key
                  ? "bg-white dark:bg-black/20 font-bold"
                  : "hover:bg-white/70 dark:hover:bg-white/10"
              }`}
              title={tip}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Motion */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium opacity-80">Motion</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAnimations(!animations)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm shadow-sm transition-colors ${
              animations
                ? "border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/10"
                : "border-black/10 bg-white dark:border-white/10 dark:bg-white/10"
            }`}
            title="Enable/disable window open/close animations"
            aria-pressed={animations}
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: animations ? "#10b981" : "#9ca3af" }} />
            {animations ? "On" : "Off"}
          </button>
          <p className="text-xs opacity-60">Controls open/close animations for windows.</p>
        </div>
      </section>
    </div>
  );
}

function TintDot({ color, label, active, onClick }: { color: string; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`grid h-8 w-8 place-items-center rounded-full border shadow-sm transition-colors ${
        active
          ? "border-black/20 bg-white dark:border-white/20 dark:bg-white/10"
          : "border-black/10 bg-white/60 hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
      }`}
      aria-label={`${label} tint (${color})`}
      title={`${label}`}
    >
      <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
    </button>
  );
}
