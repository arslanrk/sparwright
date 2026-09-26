import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * RangeIndex — the product lines as a catalogue index: one row per line,
 * with its studio shot, its name (linking to its page) and the product types
 * inside it as tags. Built from `PRODUCTS`, so a line or type added there
 * appears here without an edit.
 */

export type RangeLine = {
  name: string;
  href: string;
  shot: StaticImageData;
  types: string[];
  /** A scene rather than a studio shot: fill the frame. */
  fill?: boolean;
};

export function RangeIndex({ lines }: { lines: RangeLine[] }) {
  return (
    <ol className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {lines.map((line, i) => (
        <li key={line.href}>
          <Link
            href={line.href}
            className="group grid h-full grid-cols-[6rem_minmax(0,1fr)] items-center gap-[var(--space-4)] rounded-2xl border border-[var(--color-border)] p-3 pr-[var(--space-5)] transition-[border-color,box-shadow,background-color] hover:border-transparent hover:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_18px_36px_-22px_rgb(0_0_0/0.35)] sm:grid-cols-[8rem_minmax(0,1fr)]"
          >
            <span aria-hidden="true" className="relative aspect-square overflow-hidden rounded-xl bg-[radial-gradient(120%_100%_at_50%_80%,#d9dadc,#c3c5c8)]">
              <Image
                src={line.shot}
                alt=""
                fill
                sizes="128px"
                className={cn(
                  "transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.06]",
                  line.fill ? "object-cover" : "object-contain p-1.5 [mask-image:radial-gradient(closest-side,black_72%,transparent)]",
                )}
              />
            </span>
            <span className="min-w-0">
              <span className="flex items-baseline justify-between gap-3">
                <span className="flex items-baseline gap-2.5">
                  <span className="font-display text-small font-bold tabular-nums text-forge-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-body-large font-semibold leading-snug">{line.name}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] transition-colors group-hover:border-forge-600 group-hover:bg-forge-600 group-hover:text-white"
                >
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                  </svg>
                </span>
              </span>
              <span className="mt-2.5 flex flex-wrap gap-1.5">
                {line.types.map((type) => (
                  <span key={type} className="rounded-full bg-[var(--color-surface)] px-2.5 py-0.5 text-[0.75rem] text-[var(--color-text-secondary)]">
                    {type}
                  </span>
                ))}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
