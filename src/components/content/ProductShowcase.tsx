"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/foundation/Button";
import { cn } from "@/lib/cn";
import type { RangeItem } from "@/lib/product-range";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * ProductShowcase — Design System §08 product choices, §09 graphic language,
 * §07 Motion, §12 Accessibility.
 *
 * A slider through the range, composed around this brand rather than borrowed
 * wholesale. Three things drive the layout:
 *
 * The plate. §09's motifs are "fine seam lines and glove-panel outlines" and
 * "restrained coordinate-like labels", so the product sits on a technical plate
 * with corner crop marks — the way a sample is presented for approval, which is
 * the thing we are actually selling.
 *
 * The numeral. An oversized ghosted index anchors the composition and cropped
 * at the panel edge it does the work a second photograph would otherwise do —
 * useful, given there is no photography yet.
 *
 * The rail. A carousel that hides six of seven products behind two arrows
 * answers "do you make my thing" badly. Every product name stays on the rail,
 * so the range is legible at a glance and the arrows are a convenience rather
 * than the only way through.
 *
 * §07 rules out *automatic* carousels, not carousels: nothing advances on its
 * own, so there is no timer and no need for a pause control. The rail is a
 * real tablist, so arrow keys, Home and End work and the panel is labelled by
 * the product it belongs to (§12).
 */

type ProductShowcaseProps = {
  items: RangeItem[];
  action: string;
};

export function ProductShowcase({ items, action }: ProductShowcaseProps) {
  const [selected, setSelected] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = items[selected];

  if (!current) return null;

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = `${baseId}-panel`;

  /** Selection follows focus, as a tablist is expected to behave. */
  function select(next: number, moveFocus = true) {
    const i = (next + items.length) % items.length;
    setSelected(i);
    if (moveFocus) tabRefs.current[i]?.focus();
  }

  function onRailKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        select(selected + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        select(selected - 1);
        break;
      case "Home":
        event.preventDefault();
        select(0);
        break;
      case "End":
        event.preventDefault();
        select(items.length - 1);
        break;
    }
  }

  return (
    <div
      data-theme="dark"
      className="relative overflow-hidden rounded-xl bg-[var(--color-bg)] text-[var(--color-text)]"
      style={{
        // §04 palette only. The Forge light travels across the panel as you
        // move through the range, so each product is lit differently without a
        // colour being invented.
        backgroundImage: [
          `radial-gradient(55rem 38rem at ${14 + (selected / Math.max(items.length - 1, 1)) * 72}% 12%, color-mix(in srgb, var(--color-forge-600) 16%, transparent), transparent 60%)`,
          `linear-gradient(${130 + selected * 14}deg, var(--color-carbon-900), var(--color-ink-950) 70%)`,
        ].join(", "),
        transition:
          "background-image var(--motion-emphasis) var(--ease-standard)",
      }}
    >
      <div className="p-[var(--space-6)] md:p-[var(--space-8)]">
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(selected)}
          tabIndex={0}
          className="grid items-center gap-[var(--space-7)] rounded-sm lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-[var(--space-8)]"
        >
          {/* Identity and the pitch for this one product. */}
          <div key={`copy-${selected}`} className="panel-in">
            <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
              {current.family}
            </p>
            <h3 className="mt-3 text-heading-1">{current.name}</h3>
            <p className="mt-[var(--space-5)] max-w-copy text-body-large text-[var(--color-text-secondary)]">
              {current.styleProfile}
            </p>

            {/* One spec strip, hairline-divided, rather than floating cards. */}
            <dl className="mt-[var(--space-6)] grid border-t border-[var(--color-border)] sm:grid-cols-3">
              <Spec label="Shell" value={current.fabric} />
              <Spec label="Construction" value={current.construction} />
              <Spec label="Branding" value={current.branding} />
            </dl>

            <div className="mt-[var(--space-6)]">
              <Button href={current.href} variant="inverse" arrow>
                {action}
              </Button>
            </div>
          </div>

          {/*
            The plate: the product presented the way a sample is. The numeral
            and the crop marks are both anchored to the plate itself, not to
            the column, so they stay registered to it at every width.
          */}
          <div className="relative mx-auto w-full max-w-[20rem]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -top-12 select-none font-display text-[9rem] font-bold leading-none tracking-tighter text-white/[0.07] md:-right-6 md:-top-16 md:text-[12rem]"
            >
              {String(selected + 1).padStart(2, "0")}
            </span>
            <div key={`plate-${selected}`} className="panel-in relative">
              <CropMarks />
              <ImagePlaceholder
                shot={current.shot}
                ratio="portrait"
                className="border-[var(--color-border)] bg-white/[0.04]"
              />
            </div>
          </div>
        </div>

        {/*
          The rail. Every product, always readable.

          It stacks below md: sharing a row with the arrows on a 360px screen
          squeezed the rail to 136px — narrower than a single product name —
          which is worse than no rail at all.
        */}
        <div className="mt-[var(--space-7)] flex flex-col gap-4 border-t border-[var(--color-border)] pt-[var(--space-5)] md:flex-row md:items-center md:gap-[var(--space-5)]">
          <div
            role="tablist"
            aria-label="Product range"
            onKeyDown={onRailKeyDown}
            // Scrolls on a phone, wraps from md up. It must not clip: the
            // whole point of the rail is that the range is readable at a
            // glance, and a hidden seventh product defeats it.
            className="-mx-1 flex min-w-0 gap-1 overflow-x-auto px-1 md:mx-0 md:flex-1 md:flex-wrap md:overflow-visible md:px-0"
          >
            {items.map((item, i) => {
              const isSelected = i === selected;
              return (
                <button
                  key={item.name}
                  ref={(node) => {
                    tabRefs.current[i] = node;
                  }}
                  id={tabId(i)}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => select(i, false)}
                  className={cn(
                    "flex shrink-0 items-baseline gap-2 whitespace-nowrap rounded-md px-2.5 py-2 transition-colors",
                    // Weight and a rule carry the state, not colour alone (§12).
                    isSelected
                      ? "bg-white/10 font-semibold text-[var(--color-text)]"
                      : "text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-[var(--color-text)]",
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-small tabular-nums",
                      isSelected
                        ? "text-[var(--color-action)]"
                        : "text-[var(--color-text-muted)]",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-small">{item.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <Arrow
              direction="previous"
              controls={panelId}
              onClick={() => select(selected - 1, false)}
            />
            <Arrow
              direction="next"
              controls={panelId}
              onClick={() => select(selected + 1, false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[var(--color-border)] py-[var(--space-4)] sm:border-b-0 sm:border-r sm:px-[var(--space-5)] sm:py-[var(--space-4)] sm:first:pl-0 sm:last:border-r-0">
      <dt className="text-eyebrow uppercase text-[var(--color-text-muted)]">
        {label}
      </dt>
      <dd className="m-0 mt-1.5 font-body text-body font-semibold text-[var(--color-text)]">
        {value}
      </dd>
    </div>
  );
}

/** §09 "restrained coordinate-like labels" — corner marks, as on a sample plate. */
function CropMarks() {
  const corner =
    "pointer-events-none absolute size-4 border-[var(--color-action)]";
  return (
    // Set just outside the plate, the way registration marks actually sit.
    <div aria-hidden="true" className="absolute -inset-2 z-10">
      <span className={cn(corner, "left-0 top-0 border-l-2 border-t-2")} />
      <span className={cn(corner, "right-0 top-0 border-r-2 border-t-2")} />
      <span className={cn(corner, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span className={cn(corner, "bottom-0 right-0 border-b-2 border-r-2")} />
    </div>
  );
}

function Arrow({
  direction,
  controls,
  onClick,
}: {
  direction: "previous" | "next";
  controls: string;
  onClick: () => void;
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-controls={controls}
      // §12: a bare chevron has no accessible name of its own.
      aria-label={isNext ? "Next product" : "Previous product"}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-pill border border-[var(--color-border)] text-[var(--color-text)] transition-colors hover:bg-white/10"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isNext ? (
          <path d="M6 3.5 10.5 8 6 12.5" />
        ) : (
          <path d="M10 3.5 5.5 8 10 12.5" />
        )}
      </svg>
    </button>
  );
}
