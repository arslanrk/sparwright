"use client";

import { useId, useState } from "react";
import { Button } from "@/components/foundation/Button";
import { cn } from "@/lib/cn";
import type { RangeItem } from "@/lib/product-range";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * ProductSlider — Design System §08 product choices, §07 Motion, §12 A11y.
 *
 * One panel that walks a buyer through the range, so "do you make my thing?"
 * is answered before they have to open a page.
 *
 * §07 rules out *automatic* carousels, not carousels. Nothing here advances on
 * its own: it moves when someone asks it to, which is why there is no timer, no
 * pause control and no reason for one. The slide change is the short
 * fade-and-slide §07 approves, keyed on the index so it replays each time.
 *
 * §12 wants the whole thing operable without a mouse. The controls are real
 * buttons, arrow keys work on the panel, and the changing half is a labelled
 * live region so a screen-reader user hears the new product rather than being
 * silently moved.
 *
 * The palette does not shift hue per slide the way the reference does — §04
 * locks the colour set and there is no second brand hue to rotate through.
 * Instead a single low-opacity Forge glow travels across the panel as you move
 * through the range, so each slide is lit differently without a colour being
 * invented. It sits at 14%, well under the level where §04 would call it an
 * action surface.
 */

type ProductSliderProps = {
  items: RangeItem[];
  /** Shown top-left, above the heading. */
  eyebrow: string;
  title: string;
  description: string;
  action: string;
};

export function ProductSlider({
  items,
  eyebrow,
  title,
  description,
  action,
}: ProductSliderProps) {
  const [index, setIndex] = useState(0);
  const panelId = useId();
  const current = items[index];

  if (!current) return null;

  const go = (next: number) => setIndex((next + items.length) % items.length);

  return (
    <div
      data-theme="dark"
      role="group"
      aria-roledescription="Product range carousel"
      aria-label="Custom product range"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(index + 1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(index - 1);
        }
      }}
      className="relative overflow-hidden rounded-xl bg-[var(--color-bg)] text-[var(--color-text)]"
      style={{
        // §04 palette only. The Forge glow tracks left to right across the
        // range; the base gradient's angle turns with it.
        backgroundImage: [
          `radial-gradient(60rem 40rem at ${12 + (index / Math.max(items.length - 1, 1)) * 76}% 18%, color-mix(in srgb, var(--color-forge-600) 14%, transparent), transparent 62%)`,
          `linear-gradient(${120 + index * 18}deg, var(--color-carbon-900), var(--color-ink-950) 68%)`,
        ].join(", "),
        transition:
          "background-image var(--motion-emphasis) var(--ease-standard)",
      }}
    >
      <div className="p-[var(--space-6)] lg:p-[var(--space-8)]">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,0.8fr)] lg:gap-[var(--space-7)]">
          {/* Left: the section's own pitch. Fixed — it does not change per slide. */}
          <div>
            <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-heading-2">{title}</h2>
            <p className="mt-[var(--space-5)] text-body text-[var(--color-text-secondary)]">
              {description}
            </p>
          </div>

          {/* Middle: the product itself. */}
          <div key={`shot-${index}`} className="slide-in self-center">
            <ImagePlaceholder
              shot={current.shot}
              ratio="portrait"
              className="mx-auto max-w-[22rem] border-[var(--color-border)] bg-white/5"
            />
          </div>

          {/*
            Right: the part that changes. Announced politely so the change is
            not silent for anyone not watching the panel.
          */}
          <div
            id={panelId}
            aria-live="polite"
            aria-atomic="true"
            className="lg:pt-[var(--space-6)]"
          >
            <p className="font-display text-body-large text-[var(--color-text-muted)]">
              <span className="text-[var(--color-text)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(items.length).padStart(2, "0")}
            </p>

            <div
              key={`profile-${index}`}
              className="slide-in mt-[var(--space-6)]"
            >
              <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
                Style profile
              </p>
              <h3 className="mt-3 text-heading-4">{current.name}</h3>
              <p className="mt-3 text-body text-[var(--color-text-secondary)]">
                {current.styleProfile}
              </p>
            </div>
          </div>
        </div>

        {/* Controls. */}
        <div className="mt-[var(--space-7)] flex flex-col gap-[var(--space-5)] lg:flex-row lg:items-center lg:justify-between">
          <Button href={current.href} variant="inverse" arrow>
            {action}
          </Button>

          <div className="flex items-center justify-between gap-[var(--space-5)] lg:justify-end">
            <div className="flex items-center gap-4">
              <ArrowButton
                direction="previous"
                controls={panelId}
                onClick={() => go(index - 1)}
              />
              <div className="min-w-[10rem] text-center">
                <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
                  {current.family}
                </p>
                <p className="mt-1 font-display text-body-large font-semibold">
                  {current.name}
                </p>
              </div>
              <ArrowButton
                direction="next"
                controls={panelId}
                onClick={() => go(index + 1)}
              />
            </div>
          </div>
        </div>

        {/* Specification row. Three decisions, per product. */}
        <dl
          key={`specs-${index}`}
          className="slide-in mt-[var(--space-6)] grid gap-[var(--space-4)] sm:grid-cols-3"
        >
          <SpecCard label="Fabric" value={current.fabric} />
          <SpecCard label="Construction" value={current.construction} />
          <SpecCard label="Branding" value={current.branding} />
        </dl>
      </div>
    </div>
  );
}

function SpecCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white/5 p-[var(--space-5)] text-center">
      <dt className="text-eyebrow uppercase text-[var(--color-text-muted)]">
        {label}
      </dt>
      <dd className="m-0 mt-2 font-body text-body font-semibold text-[var(--color-text)]">
        {value}
      </dd>
    </div>
  );
}

function ArrowButton({
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
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-pill",
        "border border-[var(--color-border)] text-[var(--color-text)]",
        "transition-colors hover:bg-white/10",
      )}
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
