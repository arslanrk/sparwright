import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";

/**
 * Building blocks for the audience pages (Gyms & Academies, Private Label),
 * in the same visual language as the product template: numbered cards with a
 * Forge rule on hover, numbered steps on a route, and ticked checklists.
 */

/** Numbered cards — a heading and a line each. */
export function NumberedCards({
  items,
  columns = 3,
}: {
  items: { title: string; description: string }[];
  columns?: 3 | 4;
}) {
  return (
    <ul
      className={cn(
        "mt-[var(--space-7)] grid gap-[var(--space-4)] sm:grid-cols-2",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
      )}
    >
      {items.map((item, i) => (
        <li
          key={item.title}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)] transition-[border-color,transform] duration-200 ease-standard hover:border-forge-600/60 motion-safe:hover:-translate-y-1"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-forge-600 transition-transform duration-300 ease-standard group-hover:scale-x-100"
          />
          <span
            aria-hidden="true"
            className="font-display text-heading-3 font-bold tabular-nums text-[var(--color-border-strong)]/50 transition-colors group-hover:text-forge-600"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-[var(--space-4)] font-body text-body-large font-semibold leading-snug">
            {item.title}
          </h3>
          <p className="mt-2 text-small text-[var(--color-text-secondary)]">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}

/**
 * Numbered steps down a route, Forge to Success. The last step is green: it
 * is where the process lands — the approved order, or the approved sample.
 */
export function StepRoute({ steps }: { steps: string[] }) {
  return (
    <ol className="relative mt-[var(--space-6)] flex flex-col gap-[var(--space-5)]">
      <span
        aria-hidden="true"
        className="absolute bottom-5 left-5 top-5 w-0.5 bg-linear-to-b from-forge-600 to-success-600"
      />
      {steps.map((step, i) => (
        <li key={step} className="relative flex items-start gap-[var(--space-4)]">
          <span
            aria-hidden="true"
            className={cn(
              "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full font-display text-small font-bold tabular-nums text-white ring-4 ring-[var(--color-bg)]",
              i === steps.length - 1 ? "bg-success-600" : "bg-forge-600",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="pt-2 text-body text-[var(--color-text-secondary)]">{step}</p>
        </li>
      ))}
    </ol>
  );
}

/** A ticked list, in one or two columns. */
export function CheckList({
  items,
  columns = 2,
  className,
}: {
  items: string[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-3",
        columns === 2 && "sm:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-4)] text-body text-[var(--color-text-secondary)]"
        >
          <span
            aria-hidden="true"
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success-600 text-white"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 8.5 3 3 7-7" />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * A photograph in a rounded frame. `cutout` for a transparent PNG: it sits
 * on the Ink ground with a Forge glow behind it rather than on a flat box.
 */
export function FramedPhoto({
  src,
  alt,
  ratio = "aspect-[4/5]",
  cutout = false,
  priority = false,
  sizes = "(min-width: 1024px) 560px, 100vw",
}: {
  src: StaticImageData;
  alt: string;
  ratio?: string;
  cutout?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        ratio,
        cutout ? "bg-ink-950" : "bg-[var(--color-surface)]",
      )}
    >
      {cutout ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgb(216_58_32/0.35),transparent_65%)]"
        />
      ) : null}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        className={cutout ? "object-contain object-bottom" : "object-cover"}
      />
    </div>
  );
}
