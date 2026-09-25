"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * RolePanels — an expanding strip of full-height photo panels, one per role.
 *
 * From `lg` the panels sit side by side. One is open: wide, in full colour,
 * with its heading, line and products. The others close to dimmed, desaturated
 * slivers carrying a large number and the role, set vertically. Hover, click
 * or keyboard focus opens a panel; nothing moves on its own (§07).
 *
 * Below `lg` every panel is a full card with its content showing, stacked —
 * the strip is a desktop arrangement of the same content, not a different
 * one. Content inside a closed panel is `inert` on a desktop only, so the
 * keyboard never lands on a link that cannot be seen.
 *
 * The open panel's type sits in a fixed-width column pinned to the foot, so
 * it does not reflow while the panel widens.
 */

export type RolePanel = {
  label: string;
  title: string;
  description: string;
  products: { label: string; href: string }[];
  photo: {
    src: StaticImageData;
    alt: string;
    position?: string;
    /**
     * "right": when open on a desktop, the photo takes the right of the panel
     * and fades into the Ink under the type — for a portrait shot whose
     * subject would otherwise sit behind the words.
     */
    side?: "right";
  };
};

export function RolePanels({ panels }: { panels: RolePanel[] }) {
  const [active, setActive] = useState(0);
  const desktop = useMedia("(min-width: 1024px)");
  const baseId = useId();

  return (
    <ul
      className="flex flex-col gap-3 lg:h-[clamp(32rem,40vw,40rem)] lg:flex-row"
      onKeyDown={(event) => {
        if (!desktop) return;
        if (event.key === "ArrowRight") setActive((a) => Math.min(a + 1, panels.length - 1));
        if (event.key === "ArrowLeft") setActive((a) => Math.max(a - 1, 0));
      }}
    >
      {panels.map((panel, index) => {
        const open = index === active;
        const contentId = `${baseId}-${index}`;
        const number = String(index + 1).padStart(2, "0");
        return (
          <li
            key={panel.label}
            data-theme="dark"
            onMouseEnter={() => setActive(index)}
            className={cn(
              "group relative isolate flex min-h-[28rem] overflow-hidden rounded-2xl bg-ink-950 text-white sm:min-h-[30rem] lg:min-h-0 lg:basis-0",
              "transition-[flex-grow] duration-700 ease-standard motion-reduce:transition-none",
              open ? "lg:grow-[3.6]" : "lg:grow",
            )}
          >
            <div
              className={cn(
                "absolute inset-y-0 right-0 -z-10 w-full overflow-hidden transition-[width] duration-700 ease-standard motion-reduce:transition-none",
                panel.photo.side === "right" && open && "lg:w-[60%] lg:[mask-image:linear-gradient(to_right,transparent,black_35%)]",
              )}
            >
            <Image
              src={panel.photo.src}
              alt={panel.photo.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className={cn(
                "object-cover transition-[filter,transform] duration-700 ease-standard motion-reduce:transition-none",
                open
                  ? "lg:scale-100"
                  : "lg:scale-110 lg:brightness-[0.45] lg:grayscale lg:group-hover:brightness-[0.65]",
              )}
              style={{ objectPosition: panel.photo.position }}
            />
            </div>
            {/* The foot scrim the type stands on. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/55 via-45% to-ink-950/0"
            />
            {/* Open, from `lg`: a shade from the left under the type column. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 -z-10 hidden bg-linear-to-r from-ink-950/85 via-ink-950/40 via-40% to-transparent to-65% transition-opacity duration-700 lg:block",
                open ? "opacity-100" : "opacity-0",
              )}
            />
            {/* The Forge edge that marks the open panel. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 top-0 hidden h-1 origin-left bg-forge-600 transition-transform duration-700 ease-standard lg:block",
                open ? "scale-x-100" : "scale-x-0",
              )}
            />

            {/* Closed: a number, the role set vertically, and a plus. */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 hidden flex-col items-center justify-between py-[var(--space-6)] transition-opacity duration-300 lg:flex",
                open ? "opacity-0" : "opacity-100 delay-200",
              )}
            >
              <span className="font-display text-heading-3 font-bold tabular-nums text-white/90">
                {number}
              </span>
              <span className="rotate-180 font-display text-heading-4 font-bold uppercase tracking-[0.22em] text-white [writing-mode:vertical-rl]">
                {panel.label}
              </span>
              <span className="flex size-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors group-hover:border-forge-600 group-hover:bg-forge-600">
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M8 3v10M3 8h10" />
                </svg>
              </span>
            </div>

            {/* The whole closed panel opens on click or focus. */}
            {desktop && !open ? (
              <button
                type="button"
                aria-expanded={false}
                aria-controls={contentId}
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="absolute inset-0 z-10 rounded-2xl"
              >
                <span className="sr-only">Show {panel.label}</span>
              </button>
            ) : null}

            {/* Open: the role, fixed-width at the foot so it never reflows. */}
            <div
              id={contentId}
              inert={desktop && !open}
              className={cn(
                "relative flex w-full flex-col justify-end p-[var(--space-6)] sm:p-[var(--space-7)] lg:absolute lg:inset-y-0 lg:left-0 lg:w-[31rem] lg:max-w-full",
                "transition-[opacity,translate] duration-500 ease-standard motion-reduce:transition-none",
                open ? "lg:translate-y-0 lg:opacity-100 lg:delay-300" : "lg:translate-y-6 lg:opacity-0",
              )}
            >
              <p className="flex items-center gap-3">
                <span className="font-display text-body-large font-bold tabular-nums text-white/70">
                  {number}
                </span>
                <span className="inline-flex rounded-sm bg-forge-600 px-2.5 py-1 text-eyebrow font-semibold uppercase tracking-[0.14em] text-white">
                  {panel.label}
                </span>
              </p>
              <h3 className="mt-[var(--space-4)] font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.025em] [text-wrap:balance]">
                {panel.title}
              </h3>
              <p className="mt-[var(--space-4)] max-w-[28rem] text-body text-mist-300 lg:text-body-large">
                {panel.description}
              </p>
              <ul aria-label={`Products for ${panel.label.toLowerCase()}`} className="mt-[var(--space-5)] flex flex-wrap gap-2">
                {panel.products.map((product) => (
                  <li key={product.label}>
                    <Link
                      href={product.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 text-small font-medium text-white backdrop-blur-sm transition-colors hover:border-forge-600 hover:bg-forge-600"
                    >
                      {product.label}
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** True while the media query matches; false on the server and first paint. */
function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);
  return matches;
}
