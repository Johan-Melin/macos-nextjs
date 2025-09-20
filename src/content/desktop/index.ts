/**
 * Desktop Shortcuts Configuration
 *
 * How to add a new Desktop shortcut (e.g. "My App"):
 * 1) Add an entry to `desktopItems` below with a valid DockKey and an Icon.
 * 2) The key must exist in `src/content/dock/index.ts` (DockKey).
 */

import type { DockKey } from "../dock";
import { FiGrid, FiSettings } from "react-icons/fi";
import type { ComponentType } from "react";

export type DesktopItem = {
  key: DockKey;
  title: string;
  Icon: ComponentType<{ className?: string }>;
};

export const desktopItems: readonly DesktopItem[] = [
  { key: "Programs", title: "Programs", Icon: FiGrid },
  { key: "Settings", title: "Settings", Icon: FiSettings },
];
