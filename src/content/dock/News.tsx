export const title = "News";

export default function News() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">News</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Breaking: Design system shaping up.</li>
        <li>Dock supports responsive behavior and windows.</li>
      </ul>
    </div>
  );
}
