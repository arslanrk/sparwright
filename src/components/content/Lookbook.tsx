"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Lookbook — concept designs as a filterable masonry wall, each opening in a
 * full-screen viewer with its details and previous/next.
 *
 * Every tile is labelled "Concept design": these are designs showing what can
 * be made, not delivered orders (#5, #12 — no invented clients or work). The
 * filter hides with `hidden`, so every design and its words stay in the HTML.
 * The viewer is a native <dialog>: focus is trapped and Escape closes it for
 * free; arrow keys step through the visible designs.
 */

export type LookbookItem = {
  title: string;
  line: string;
  description: string;
  customised: string[];
  /** The quote form's product choice the mockup link pre-selects. */
  product: string;
  photo: { src: StaticImageData; alt: string };
  /** Studio shot on grey: float it; a scene or group: fill the tile. */
  studio?: boolean;
  /** Size on the wall from lg: feature (2×2), tall (1×2) or wide (2×1). */
  span?: "feature" | "tall" | "wide";
};

const ALL = "All designs";

export function Lookbook({ items, lines }: { items: LookbookItem[]; lines: string[] }) {
  const [line, setLine] = useState(ALL);
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const visible = items.map((item, i) => ({ item, i })).filter(({ item }) => line === ALL || item.line === line);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open !== null && !el.open) el.showModal();
    if (open === null && el.open) el.close();
  }, [open]);

  function step(direction: 1 | -1) {
    if (open === null) return;
    const at = visible.findIndex(({ i }) => i === open);
    const next = visible[(at + direction + visible.length) % visible.length];
    setOpen(next.i);
  }

  const current = open !== null ? items[open] : null;

  return (
    <div>
      {/* Filter. */}
      <div role="group" aria-label="Filter designs by product line" className="flex flex-wrap gap-2">
        {[ALL, ...lines].map((name) => {
          const selected = name === line;
          const count = name === ALL ? items.length : items.filter((item) => item.line === name).length;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={selected}
              onClick={() => setLine(name)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-small font-semibold transition-colors",
                selected ? "bg-forge-600 text-white" : "bg-white/[0.06] text-white/75 ring-1 ring-white/10 hover:text-white",
              )}
            >
              {name}
              <span className={cn("text-[0.75rem] tabular-nums", selected ? "text-white/70" : "text-white/40")}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* The wall. */}
      <ul className="mt-[var(--space-6)] grid auto-rows-[15rem] grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-4">
        {items.map((item, i) => {
          const shown = line === ALL || item.line === line;
          return (
            <li
              key={item.title}
              hidden={!shown}
              className={cn(
                item.span === "feature" && "sm:col-span-2 lg:row-span-2",
                item.span === "tall" && "lg:row-span-2",
                item.span === "wide" && "sm:col-span-2",
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View ${item.title}`}
                className="group relative block size-full overflow-hidden rounded-2xl bg-[radial-gradient(120%_100%_at_50%_75%,#d9dadc,#a9acb1)] text-left ring-1 ring-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forge-600 motion-safe:animate-[stage-in_450ms_ease-out_both]"
              >
                <Image
                  src={item.photo.src}
                  alt=""
                  fill
                  sizes={item.span === "feature" || item.span === "wide" ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"}
                  className={cn(
                    "transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.06]",
                    item.studio ? "object-contain p-4 [mask-image:radial-gradient(closest-side,black_72%,transparent)]" : "object-cover object-top",
                  )}
                />
                <span className="absolute left-3 top-3 rounded-full bg-ink-950/75 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                  Concept
                </span>
                {/* The caption, rising on hover and focus. */}
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-ink-950 via-ink-950/80 to-transparent p-4 pt-16 text-white">
                  <span>
                    <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-forge-600">{item.line}</span>
                    <span className="mt-0.5 block font-body text-body font-semibold leading-snug">{item.title}</span>
                  </span>
                  <span aria-hidden="true" className="flex size-9 shrink-0 translate-y-1 items-center justify-center rounded-full bg-white/15 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 8h10M8 3v10" />
                    </svg>
                  </span>
                </span>
              </button>
              {/* The words, for search and for anyone who never opens the viewer. */}
              <p className="sr-only">
                {item.description} Customised: {item.customised.join(", ")}.
              </p>
            </li>
          );
        })}
      </ul>

      {/* The viewer. */}
      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        aria-label={current?.title ?? "Design"}
        className="m-auto w-[min(72rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-3xl bg-ink-950 p-0 text-white shadow-[0_40px_120px_-20px_rgb(0_0_0/0.9)] backdrop:bg-ink-950/85 backdrop:backdrop-blur-sm"
      >
        {current ? (
          <div className="grid max-h-[90svh] grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div key={open} className="relative aspect-[4/3] bg-[radial-gradient(120%_100%_at_50%_75%,#d9dadc,#a9acb1)] motion-safe:animate-[stage-in_400ms_ease-out_both] lg:aspect-auto lg:min-h-[34rem]">
              <Image
                src={current.photo.src}
                alt={current.photo.alt}
                fill
                sizes="(min-width: 1024px) 700px, 100vw"
                className={current.studio ? "object-contain p-6 [mask-image:radial-gradient(closest-side,black_75%,transparent)]" : "object-cover object-top"}
              />
            </div>
            <div className="flex flex-col overflow-y-auto p-[var(--space-6)] sm:p-[var(--space-7)]">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-forge-600/15 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-forge-600">
                  Concept design · {current.line}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="Close"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-forge-600"
                >
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </div>
              <h3 className="mt-[var(--space-5)] font-display text-heading-3">{current.title}</h3>
              <p className="mt-[var(--space-3)] text-body text-white/70">{current.description}</p>
              <p className="mt-[var(--space-6)] text-eyebrow uppercase tracking-[0.16em] text-white/50">What can be customised</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {current.customised.map((detail) => (
                  <li key={detail} className="rounded-full bg-white/[0.07] px-3 py-1.5 text-small ring-1 ring-white/10">
                    {detail}
                  </li>
                ))}
              </ul>
              <p className="mt-[var(--space-6)] text-small text-white/50">
                A concept design showing what can be made — not a delivered order.
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-[var(--space-6)]">
                <a
                  href={`/quote?intent=mockup&product=${encodeURIComponent(current.product)}`}
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-forge-600 px-5 text-small font-semibold transition-colors hover:bg-forge-700"
                >
                  Request a mockup like this
                </a>
                <div className="flex gap-2">
                  <ViewerArrow label="Previous design" onClick={() => step(-1)} flip />
                  <ViewerArrow label="Next design" onClick={() => step(1)} />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

function ViewerArrow({ label, onClick, flip = false }: { label: string; onClick: () => void; flip?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-forge-600"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("size-4", flip && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </button>
  );
}
