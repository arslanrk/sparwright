"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import colourCotton from "../../../public/images/spec/colour-cotton.jpg";
import colourLeather from "../../../public/images/spec/colour-leather.jpg";
import colourPolyester from "../../../public/images/spec/colour-polyester.jpg";

/**
 * SpecSheet — the club's decisions laid out as a tech-pack sheet.
 *
 * A title block across the head (as on a manufacturing drawing), then a tab
 * list of the areas a brief can specify, each with a code, and a panel per
 * area pairing its words with a visual of its own. Real ARIA tabs: one tab
 * stop, arrow keys, Home and End. Every panel is rendered on the server, so
 * all of the copy is on the page for search; inactive panels are `hidden`.
 *
 * Nothing changes on its own (§07).
 */

export type SpecArea = {
  /** Sheet code, e.g. "BR". */
  code: string;
  title: string;
  /** One line under the tab. */
  summary: string;
  body: ReactNode;
  visual: ReactNode;
};

export function SpecSheet({ areas, label }: { areas: SpecArea[]; label: string }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function focusTab(index: number) {
    const next = (index + areas.length) % areas.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_24px_48px_-24px_rgb(0_0_0/0.18)]">
      {/* Title block, as on a manufacturing drawing. */}
      <div className="flex flex-wrap items-center justify-between gap-x-[var(--space-6)] gap-y-2 border-b border-[var(--color-border)] px-[var(--space-5)] py-3 sm:px-[var(--space-6)]">
        <p className="flex items-center gap-3 text-eyebrow uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          <span aria-hidden="true" className="size-2 rounded-full bg-forge-600" />
          Club specification
        </p>
        <p aria-hidden="true" className="hidden gap-[var(--space-5)] text-eyebrow uppercase tracking-[0.16em] text-[var(--color-text-muted)] sm:flex">
          <span>Sheet 02</span>
          <span>Rev. before sampling</span>
        </p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <div
          role="tablist"
          aria-label={label}
          aria-orientation="vertical"
          className="flex gap-2 overflow-x-auto border-b border-[var(--color-border)] p-3 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-[var(--space-4)]"
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
              event.preventDefault();
              focusTab(active + 1);
            } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
              event.preventDefault();
              focusTab(active - 1);
            } else if (event.key === "Home") {
              event.preventDefault();
              focusTab(0);
            } else if (event.key === "End") {
              event.preventDefault();
              focusTab(areas.length - 1);
            }
          }}
        >
          {areas.map((area, index) => {
            const selected = index === active;
            return (
              <button
                key={area.code}
                ref={(el) => {
                  tabs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={selected}
                aria-controls={`${id}-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "group relative flex shrink-0 items-start gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-200 lg:w-full lg:py-4",
                  selected
                    ? "bg-ink-950 text-white"
                    : "text-[var(--color-text)] hover:bg-[var(--color-bg)]",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 flex h-7 min-w-9 items-center justify-center rounded-md px-1.5 font-display text-small font-bold tracking-wide",
                    selected ? "bg-forge-600 text-white" : "bg-[var(--color-bg)] text-[var(--color-text-secondary)] group-hover:bg-white",
                  )}
                >
                  {area.code}
                </span>
                <span className="min-w-0">
                  <span className="block whitespace-nowrap font-body text-body font-semibold lg:whitespace-normal">
                    {area.title}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 hidden text-small lg:block",
                      selected ? "text-mist-300" : "text-[var(--color-text-muted)]",
                    )}
                  >
                    {area.summary}
                  </span>
                </span>
                {selected ? (
                  <span aria-hidden="true" className="absolute inset-y-3 -right-px hidden w-1 rounded-l-full bg-forge-600 lg:block" />
                ) : null}
              </button>
            );
          })}
        </div>

        {areas.map((area, index) => (
          <div
            key={area.code}
            role="tabpanel"
            id={`${id}-panel-${index}`}
            aria-labelledby={`${id}-tab-${index}`}
            hidden={index !== active}
            tabIndex={0}
            className="grid gap-[var(--space-6)] p-[var(--space-5)] outline-none sm:p-[var(--space-6)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center lg:min-h-[31rem] lg:p-[var(--space-7)]"
          >
            <div className="order-2 md:order-1">
              <p className="text-eyebrow uppercase tracking-[0.16em] text-forge-700">
                {area.code} · {area.summary}
              </p>
              <h3 className="mt-3 font-display text-heading-3 font-bold tracking-[-0.02em]">
                {area.title}
              </h3>
              <div className="mt-[var(--space-4)] flex flex-col gap-[var(--space-4)] text-body text-[var(--color-text-secondary)]">
                {area.body}
              </div>
            </div>
            <div className="order-1 md:order-2">{area.visual}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -- Visuals -------------------------------------------------------------- */

/** A photograph in the sheet's frame, with a spec tag in the corner. */
export function SpecPhoto({
  src,
  alt,
  tag,
  position,
  contain = false,
}: {
  src: StaticImageData;
  alt: string;
  tag: string;
  position?: string;
  contain?: boolean;
}) {
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[5/4]", contain ? "bg-ink-950" : "bg-[var(--color-bg)]")}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 460px, 90vw"
        className={contain ? "object-contain p-[var(--space-4)]" : "object-cover"}
        style={{ objectPosition: position }}
      />
      <span className="absolute left-3 top-3 rounded-sm bg-white/90 px-2 py-1 text-eyebrow uppercase tracking-[0.14em] text-ink-950 backdrop-blur-sm">
        {tag}
      </span>
      {/* Registration marks: the drawing-sheet motif (§09). */}
      <CornerMarks />
    </div>
  );
}

function CornerMarks() {
  const mark = "absolute size-4 border-white/70";
  return (
    <span aria-hidden="true" className="pointer-events-none">
      <span className={cn(mark, "right-3 top-3 border-r-2 border-t-2")} />
      <span className={cn(mark, "bottom-3 left-3 border-b-2 border-l-2")} />
      <span className={cn(mark, "bottom-3 right-3 border-b-2 border-r-2")} />
    </span>
  );
}

/** Icon tiles: branding methods, packaging items. */
export function IconTiles({
  items,
  columns = 3,
}: {
  items: { label: string; icon: SpecIcon }[];
  columns?: 2 | 3;
}) {
  return (
    <ul className={cn("grid grid-cols-2 gap-2", columns === 3 && "sm:grid-cols-3")}>
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 text-small font-medium text-[var(--color-text)]"
        >
          <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white text-forge-700 shadow-[0_1px_2px_rgb(0_0_0/0.08)]">
            {ICONS[item.icon]}
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  );
}

/** Numbered construction points, in two columns. */
export function PointList({ items }: { items: string[] }) {
  return (
    <ol className="grid grid-cols-2 gap-x-[var(--space-5)] gap-y-2">
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-2.5 border-b border-[var(--color-border)] py-1.5 text-small font-medium text-[var(--color-text)]">
          <span aria-hidden="true" className="font-display text-small font-bold tabular-nums text-forge-600">
            {String(i + 1).padStart(2, "0")}
          </span>
          {item}
        </li>
      ))}
    </ol>
  );
}

/**
 * The colour panel's visual: one club colour reference, then the same colour
 * as it reads on three materials — the reason colour is confirmed on the
 * sample rather than promised from a code.
 */
export function ColourStudy() {
  const materials: { name: string; note: string; photo: StaticImageData }[] = [
    {
      name: "Leather",
      note: "Deeper, with sheen",
      photo: colourLeather,
    },
    {
      name: "Polyester",
      note: "Brighter when sublimated",
      photo: colourPolyester,
    },
    {
      name: "Cotton",
      note: "Softer, more matt",
      photo: colourCotton,
    },
  ];
  return (
    <div className="rounded-xl bg-ink-950 p-[var(--space-5)] text-white">
      <div className="flex items-center gap-[var(--space-4)]">
        <span aria-hidden="true" className="size-16 shrink-0 rounded-lg bg-forge-600 ring-1 ring-white/20" />
        <div>
          <p className="text-eyebrow uppercase tracking-[0.16em] text-mist-300">Your colour reference</p>
          <p className="mt-1 font-display text-heading-4 font-bold">Club red</p>
          <p className="text-small tabular-nums text-mist-300">#D83A20 · or a physical swatch</p>
        </div>
      </div>
      <ul className="mt-[var(--space-5)] grid grid-cols-3 gap-2">
        {materials.map((material) => (
          <li key={material.name}>
            <span aria-hidden="true" className="relative block aspect-[4/5] overflow-hidden rounded-lg ring-1 ring-white/10">
              <Image src={material.photo} alt="" fill sizes="(min-width: 1024px) 120px, 30vw" className="object-cover" />
            </span>
            <p className="mt-2 text-small font-semibold">{material.name}</p>
            <p className="text-[0.75rem] leading-snug text-mist-300">{material.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-[var(--space-4)] flex items-center gap-2 border-t border-white/10 pt-[var(--space-4)] text-small font-semibold">
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0 text-success-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 8.5 3 3 7-7" />
        </svg>
        Confirmed on the physical sample
      </p>
    </div>
  );
}

/* -- Icons: one line family, 1.75px stroke, as the rest of the site. ------ */

export type SpecIcon =
  | "print"
  | "embroidery"
  | "sublimation"
  | "embossing"
  | "patch"
  | "label"
  | "polybag"
  | "box"
  | "insert"
  | "tag"
  | "carton";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const ICONS: Record<SpecIcon, ReactNode> = {
  // A roller over a surface.
  print: (
    <Icon>
      <rect x="4" y="4" width="13" height="5" rx="1.5" />
      <path d="M17 6.5h2.5v5H11V14" />
      <rect x="9.5" y="14" width="3" height="6" rx="1" />
    </Icon>
  ),
  // A needle and a stitched line.
  embroidery: (
    <Icon>
      <path d="M19 5 8 16" />
      <circle cx="18" cy="6" r="1.5" />
      <path d="M4 20c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0" strokeDasharray="2 2" />
    </Icon>
  ),
  // Heat into fabric: droplets and waves.
  sublimation: (
    <Icon>
      <path d="M12 3.5s-4 4.5-4 7.5a4 4 0 0 0 8 0c0-3-4-7.5-4-7.5Z" />
      <path d="M4 19c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 4-1.5" />
    </Icon>
  ),
  // A raised mark on a surface.
  embossing: (
    <Icon>
      <path d="M3 16h18" />
      <path d="M7 16v-3.5a5 5 0 0 1 10 0V16" />
      <path d="M10 16v-3a2 2 0 0 1 4 0v3" />
    </Icon>
  ),
  // A shield-shaped badge with a stitched edge.
  patch: (
    <Icon>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6Z" />
      <path d="M12 6.5 8 8.2v3c0 2.8 1.8 5 4 6.3 2.2-1.3 4-3.5 4-6.3v-3Z" strokeDasharray="1.6 1.6" />
    </Icon>
  ),
  // A woven label, folded.
  label: (
    <Icon>
      <rect x="4" y="7" width="16" height="10" rx="1" />
      <path d="M8 10.5h8M8 13.5h5" />
    </Icon>
  ),
  polybag: (
    <Icon>
      <path d="M6 7h12l1 13H5Z" />
      <path d="M9 7V5.5a3 3 0 0 1 6 0V7" />
    </Icon>
  ),
  box: (
    <Icon>
      <path d="M4 8 12 4l8 4v8l-8 4-8-4Z" />
      <path d="m4 8 8 4 8-4M12 12v8" />
    </Icon>
  ),
  insert: (
    <Icon>
      <rect x="5" y="4" width="14" height="16" rx="1.5" />
      <path d="M9 9h6M9 12.5h6M9 16h3" />
    </Icon>
  ),
  tag: (
    <Icon>
      <path d="M20.5 13.5 13 21a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 2.6 12l.4-7a2 2 0 0 1 2-1.9l7-.4a2 2 0 0 1 1.5.6l7 7a2 2 0 0 1 0 2.8Z" />
      <circle cx="8" cy="8" r="1.5" />
    </Icon>
  ),
  carton: (
    <Icon>
      <rect x="3" y="6" width="18" height="14" rx="1" />
      <path d="M3 10h18M10 6v4M14 6v4" />
      <path d="m15 15 2 2 3-3" />
    </Icon>
  ),
};
