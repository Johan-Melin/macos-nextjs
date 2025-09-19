/**
 * Dock Content Configuration
 *
 * How to add a new Dock item (e.g. "My App"):
 * 1) Create `src/content/dock/MyApp.tsx` that:
 *    - exports `export const title = "My App";`
 *    - default-exports a React component with your content
 *    See `Template.tsx` for a starter file.
 * 2) Import your module below and add it to BOTH:
 *    - `dockItems` (to configure icon and order in the Dock)
 *    - `dockContentRegistry` (to point to the component to render)
 *
 * To remove an item: delete its file (optional), then remove it from
 * `dockItems` and `dockContentRegistry`.
 */

import About, { title as aboutTitle } from "./About";
import News, { title as newsTitle } from "./News";
import Programs, { title as programsTitle } from "./Programs";
import Settings, { title as settingsTitle } from "./Settings";
import type { ComponentType } from "react";
import { FiInfo, FiGlobe, FiGrid, FiSettings } from "react-icons/fi";

export type DockItem = {
  key: string; // literal keys (e.g., "About"); type refines below
  title: string;
  Icon: ComponentType<{ className?: string }>;
};

// Ordered list controls the Dock order and icons.
export const dockItems = [
  { key: "About", title: aboutTitle, Icon: FiInfo },
  { key: "News", title: newsTitle, Icon: FiGlobe },
  { key: "Programs", title: programsTitle, Icon: FiGrid },
  { key: "Settings", title: settingsTitle, Icon: FiSettings },
] as const satisfies readonly DockItem[];

// Derive DockKey from dockItems to avoid manual union maintenance.
export type DockKey = typeof dockItems[number]["key"];

export type DockModule = {
  title: string;
  Component: ComponentType;
};

export const dockContentRegistry: Record<DockKey, DockModule> = {
  About: { title: aboutTitle, Component: About },
  News: { title: newsTitle, Component: News },
  Programs: { title: programsTitle, Component: Programs },
  Settings: { title: settingsTitle, Component: Settings },
};
