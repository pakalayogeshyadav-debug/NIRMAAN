/**
 * NIRMAAN — Placeholder Page
 *
 * Used for routes not yet implemented.
 * Displays a clean "Coming Soon" message.
 */

export function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <p className="text-overline text-text-tertiary mb-2">Coming Soon</p>
        <h1 className="text-h2 text-text-primary">{title}</h1>
      </div>
    </div>
  );
}
