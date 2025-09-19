/**
 * Copy this file to create a new Dock app content module.
 *
 * Requirements:
 * - Export a `title` string. This appears in the window title and Dock tooltip.
 * - Default-export a React component with your content.
 * - Register it in `src/content/dock/index.ts` (see that file for instructions).
 */

export const title = "My App";

export default function Template() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">My App</h2>
      <p className="opacity-80">
        Replace this content with your own. You can use any React components here.
      </p>
    </div>
  );
}
