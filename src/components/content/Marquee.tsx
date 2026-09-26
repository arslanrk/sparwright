import { cn } from "@/lib/cn";

/**
 * Marquee — a forge-red strip of the range's names, moving slowly left, as a
 * divider between the hero and the first band. Decorative: the names are all
 * links elsewhere on the page, so the strip is hidden from screen readers.
 * Two identical runs sit side by side and the track shifts by half, so the
 * loop has no seam. It stands still under reduced motion.
 */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const run = (key: string) => (
    <ul key={key} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-[var(--space-6)] pr-[var(--space-6)]">
          <span className="whitespace-nowrap font-display text-heading-3 font-bold uppercase tracking-tight text-white">{item}</span>
          <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-ink-950" fill="currentColor">
            <path d="M12 2 14.6 9.4 22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6Z" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden="true" className={cn("overflow-hidden bg-forge-600 py-[var(--space-4)]", className)}>
      <div className="flex w-max motion-safe:animate-[marquee_40s_linear_infinite]">
        {run("a")}
        {run("b")}
      </div>
    </div>
  );
}
