"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useRef, useState, type ReactNode } from "react";
import { BrandMark } from "@/components/content/BrandMark";
import { cn } from "@/lib/cn";

/**
 * BrandJourney — who private label is for, as the stages a brand grows
 * through. A rising rail of stages on the left; on the right, the brand's
 * studio: the range on display, growing from one product and its box to a
 * full line on two shelves, under the brand's own name. Below the display,
 * what the brand brings at that stage and what is built with it.
 *
 * Real ARIA tabs (one tab stop, arrow keys, Home and End). Every panel is
 * rendered on the server so all the copy is on the page for search; inactive
 * panels are `hidden`. Nothing moves on its own (§07). "Your brand" is a
 * placeholder, never a real mark; the displays repeat the words, so they are
 * hidden from screen readers.
 */

export type JourneyStage = {
  /** Short marker, e.g. "First product". */
  marker: string;
  title: string;
  description: string;
  bring: string[];
  build: string[];
  /** The display: products on the plinth, left to right; two rows from four. */
  shots: StaticImageData[];
  /** Show the branded box beside the product (the first stage). */
  box?: boolean;
  /**
   * A photographed display, used in place of the drawn shelves. `marks` put
   * the brand on its blank panels: centre and width in percent of the 3:2
   * frame.
   */
  photo?: {
    src: StaticImageData;
    marks: { x: number; y: number; w: number; ink: string }[];
  };
};

export function BrandJourney({
  stages,
  label,
  intro,
}: {
  stages: JourneyStage[];
  label: string;
  /** The section heading and lead, above the stages in the left column. */
  intro?: ReactNode;
}) {
  // Opens on the top stage: the full line is what the page is selling towards.
  const [active, setActive] = useState(stages.length - 1);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = stages.length - 1;

  function focusTab(index: number) {
    const next = Math.min(Math.max(index, 0), last);
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid grid-cols-1 gap-[var(--space-6)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-[var(--space-8)]">
      <div className="flex flex-col gap-[var(--space-6)] lg:justify-between lg:gap-[var(--space-7)]">
        {intro ? <div>{intro}</div> : null}
        {/* The stages, rising. */}
        <div
          role="tablist"
          aria-label={label}
          aria-orientation="vertical"
          className="relative grid grid-cols-3 gap-2 lg:flex lg:flex-col-reverse lg:gap-3 lg:pl-7"
          onKeyDown={(event) => {
            // The list reads bottom-up on wide screens, so up means forward.
            if (event.key === "ArrowUp" || event.key === "ArrowRight") {
              event.preventDefault();
              focusTab(active + 1);
            } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
              event.preventDefault();
              focusTab(active - 1);
            } else if (event.key === "Home") {
              event.preventDefault();
              focusTab(0);
            } else if (event.key === "End") {
              event.preventDefault();
              focusTab(last);
            }
          }}
        >
          {/* The rail, filling upward to the chosen stage. */}
          <span
            aria-hidden="true"
            className="absolute bottom-9 left-[0.6875rem] top-9 hidden w-0.5 rounded-full bg-ink-950/10 lg:block"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-9 left-[0.6875rem] hidden w-0.5 rounded-full bg-forge-600 transition-[height] duration-500 ease-out motion-reduce:transition-none lg:block"
            style={{
              height: `calc((100% - 4.5rem) * ${last > 0 ? active / last : 0})`,
            }}
          />

          {stages.map((stage, index) => {
            const selected = index === active;
            const reached = index <= active;
            return (
              <button
                key={stage.title}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={selected}
                aria-controls={`${id}-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "group relative flex min-w-0 flex-col items-start gap-2 rounded-2xl border p-3 text-left transition-[background-color,border-color,box-shadow] duration-200 lg:flex-row lg:items-start lg:gap-4 lg:p-[var(--space-4)]",
                  selected
                    ? "border-transparent bg-ink-950 text-white shadow-[0_24px_40px_-24px_rgb(0_0_0/0.6)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-ink-950/25",
                )}
              >
                {/* The top stage wears a crown: the achievement the rail climbs to. */}
                {index === last ? <Crown lit={selected} /> : null}

                {/* The node on the rail. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-7 top-[1.9rem] hidden size-6 -translate-y-1/2 items-center justify-center rounded-full ring-4 ring-[var(--color-bg)] transition-colors lg:flex",
                    reached ? "bg-forge-600" : "bg-ink-950/15",
                  )}
                >
                  {reached ? (
                    <span className="size-2 rounded-full bg-white" />
                  ) : null}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-xl font-display text-small font-bold tabular-nums lg:size-11 lg:text-body",
                    selected
                      ? "bg-forge-600 text-white"
                      : "bg-[var(--color-bg)] text-forge-700",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "hidden text-[0.6875rem] font-bold uppercase tracking-[0.12em] lg:block",
                      selected
                        ? "text-forge-600"
                        : "text-[var(--color-text-muted)]",
                    )}
                  >
                    {stage.marker}
                  </span>
                  <span className="mt-0.5 block font-body text-small font-semibold leading-snug lg:text-body-large">
                    {stage.title}
                  </span>
                  {/* The chosen stage opens to its description (from lg; the panel carries it below). */}
                  {selected ? (
                    <span aria-hidden="true" className="mt-2 hidden text-small leading-relaxed text-white/70 lg:block">
                      {stage.description}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The panels. */}
      <div>
        {stages.map((stage, index) => (
          <div
            key={stage.title}
            role="tabpanel"
            id={`${id}-panel-${index}`}
            aria-labelledby={`${id}-tab-${index}`}
            hidden={index !== active}
            className="overflow-hidden rounded-3xl bg-[var(--color-surface)] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_30px_60px_-30px_rgb(0_0_0/0.35)]"
          >
            <Display stage={stage} step={index} />

            <div className="p-[var(--space-5)] sm:p-[var(--space-6)]">
              {/* Shown under the display on small screens; from lg it sits in the chosen stage, and stays here for assistive technology. */}
              <p className="mb-[var(--space-5)] text-body text-[var(--color-text-secondary)] lg:sr-only">
                {stage.description}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <List title="You bring" items={stage.bring} tone="plain" />
                <List title="Built with you" items={stage.build} tone="forge" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The brand's studio: its name on the wall, the range on the plinth. */
function Display({ stage, step }: { stage: JourneyStage; step: number }) {
  const rows =
    stage.shots.length > 3
      ? [stage.shots.slice(0, 3), stage.shots.slice(3)]
      : [stage.shots];
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[3/2] overflow-hidden bg-[radial-gradient(120%_100%_at_50%_90%,#dcdddf,#b6b8bc)]"
    >
      {stage.photo ? (
        <>
          <Image
            key={step}
            src={stage.photo.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover motion-safe:animate-[stage-in_600ms_ease-out_both]"
          />
          {/* The brand on the photograph's blank panels. */}
          {stage.photo.marks.map((mark, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${mark.x}%`,
                top: `${mark.y}%`,
                width: `${mark.w}%`,
                color: mark.ink,
              }}
            >
              <BrandMark className="w-full" />
            </span>
          ))}
        </>
      ) : (
        /* The brand on the wall, large and faint. */
        <span className="absolute inset-x-[12%] top-[9%] opacity-[0.05]">
          <BrandMark className="w-full text-ink-950" accent="currentColor" />
        </span>
      )}
      {/* On a photograph the chip moves to the foot, clear of the brand's panels. */}
      <span
        className={cn(
          "absolute left-4 flex items-center gap-2 rounded-full bg-ink-950 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-white",
          stage.photo ? "bottom-4" : "top-4",
        )}
      >
        <span className="size-1.5 rounded-full bg-forge-600" />
        {stage.marker}
      </span>
      {stage.photo ? null : (
        <span className="absolute right-4 top-4 rounded-full bg-white/70 px-2.5 py-1 backdrop-blur-sm">
          <BrandMark className="h-4 w-auto text-ink-950" />
        </span>
      )}

      {/* Shelves: one plinth, or two shelves for a full line. */}
      {stage.photo ? null : (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex flex-col justify-end",
            rows.length > 1 ? "top-14 gap-1" : "top-16",
          )}
        >
          {rows.map((row, r) => (
            <div
              key={r}
              className="relative flex flex-1 items-end justify-center gap-[3%] px-[6%]"
            >
              {row.map((src, i) => {
                const order = r * 3 + i;
                return (
                  <span
                    key={`${step}-${order}`}
                    className={cn(
                      "relative block motion-safe:animate-[stage-in_500ms_ease-out_both]",
                      rows.length > 1
                        ? "aspect-square h-[92%]"
                        : row.length === 1
                          ? "aspect-square h-[96%]"
                          : "aspect-square h-[82%]",
                    )}
                    style={{ animationDelay: `${order * 70}ms` }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 240px, 40vw"
                      className="object-contain [mask-image:radial-gradient(closest-side,black_70%,transparent)]"
                    />
                  </span>
                );
              })}
              {stage.box && r === rows.length - 1 ? <BrandBox /> : null}
              {/* The shelf edge. */}
              <span className="absolute inset-x-[4%] bottom-0 h-2 rounded-full bg-ink-950/15 shadow-[0_6px_14px_-4px_rgb(0_0_0/0.35)]" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** The first product's box: the brand's name, the product under it. */
function BrandBox() {
  return (
    <span className="relative mb-2 flex h-[46%] min-h-24 w-[26%] min-w-28 flex-col items-center justify-center gap-2 self-end rounded-sm bg-ink-950 px-3 shadow-[0_24px_36px_-18px_rgb(0_0_0/0.8)] ring-1 ring-white/10 motion-safe:animate-[stage-in_500ms_ease-out_120ms_both]">
      <span className="absolute inset-x-0 top-0 h-1.5 bg-forge-600" />
      <BrandMark className="w-full text-white" />
      <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-white/45 sm:text-[0.625rem]">
        Boxing gloves
      </span>
    </span>
  );
}

/** A gold crown on a round badge, over the top stage card's corner. */
function Crown({ lit }: { lit: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute -right-4 -top-5 flex size-14 rotate-12 items-center justify-center rounded-full bg-ink-950 ring-4 ring-[var(--color-bg)] transition-shadow duration-300",
        lit && "shadow-[0_0_0_4px_rgb(217_176_90/0.35),0_10px_24px_-6px_rgb(217_176_90/0.7)]",
      )}
    >
      <svg viewBox="0 0 24 24" className="size-8" fill="none">
        <defs>
          <linearGradient id="crown-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F6DC94" />
            <stop offset="0.55" stopColor="#D9B05A" />
            <stop offset="1" stopColor="#A8792C" />
          </linearGradient>
        </defs>
        <path d="M3 8.5 7.5 12 12 5l4.5 7L21 8.5 19 18H5L3 8.5Z" fill="url(#crown-gold)" stroke="#8A6424" strokeWidth="0.8" strokeLinejoin="round" />
        <rect x="5" y="18.6" width="14" height="2.2" rx="0.8" fill="url(#crown-gold)" />
        <circle cx="12" cy="4.6" r="1.3" fill="#F6DC94" />
        <circle cx="3" cy="8" r="1.1" fill="#F6DC94" />
        <circle cx="21" cy="8" r="1.1" fill="#F6DC94" />
        <circle cx="12" cy="13.5" r="1.3" fill="#D83A20" />
      </svg>
    </span>
  );
}

function List({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "plain" | "forge";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-[var(--space-4)]",
        tone === "forge"
          ? "bg-forge-600/[0.07] ring-1 ring-forge-600/20"
          : "bg-[var(--color-bg)]",
      )}
    >
      <p
        className={cn(
          "text-eyebrow uppercase tracking-[0.16em]",
          tone === "forge"
            ? "text-forge-700"
            : "text-[var(--color-text-muted)]",
        )}
      >
        {title}
      </p>
      <ul className="mt-2.5 flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-small font-medium"
          >
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                tone === "forge"
                  ? "bg-forge-600 text-white"
                  : "bg-ink-950/10 text-ink-950",
              )}
            >
              <svg
                viewBox="0 0 16 16"
                className="size-2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
