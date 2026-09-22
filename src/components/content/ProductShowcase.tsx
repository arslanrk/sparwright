"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { Button } from "@/components/foundation/Button";
import { cn } from "@/lib/cn";
import type { Collection } from "@/lib/collections";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * ProductShowcase — Design System §08 product choices, §09 graphic language,
 * §07 Motion, §12 Accessibility.
 *
 * A slider through the range, composed around this brand rather than borrowed
 * wholesale. Four things drive the layout:
 *
 * The track. Every slide is in the document and the rail moves across them, so
 * the change is one continuous motion in the direction you asked for rather
 * than a panel blinking out and another blinking in. §07 rules out *automatic*
 * carousels, not carousels: nothing advances on its own, so there is no timer
 * and no need for a pause control. The 360ms travel is `--motion-emphasis`,
 * which §07 assigns to exactly this — a panel transition.
 *
 * Rendering every slide also keeps the range readable to a crawler. Only the
 * selected slide used to exist in the markup; the rest reached the page as
 * serialized props inside a script tag, which is not content.
 *
 * The plate. §09's motifs are "fine seam lines and glove-panel outlines" and
 * "restrained coordinate-like labels", so the product sits on a technical plate
 * with corner crop marks — the way a sample is presented for approval, which is
 * the thing we are actually selling.
 *
 * The numeral. An oversized ghosted index anchors the composition and cropped
 * at the panel edge it does the work a second photograph would otherwise do —
 * useful, given most of the photography is still outstanding.
 *
 * The index. A carousel that hides most of the range behind two arrows
 * answers "do you make my thing" badly, and a tab strip under the panel is
 * just that carousel with the arrows spelled out. So the navigation is a
 * drawing's contents column instead: every collection stays readable. The arrows
 * sit under it as a second way through, not the only one.
 *
 * The index is a real tablist, so arrow keys, Home and End work and each slide
 * is labelled by the product it belongs to (§12). Slides that are off-stage are
 * `inert`, so neither a screen reader nor the Tab key wanders into them.
 */

type ProductShowcaseProps = {
  items: Collection[];
};

/** Drag distance, in px, that commits to the next slide instead of springing back. */
const SWIPE_THRESHOLD = 56;

export function ProductShowcase({ items }: ProductShowcaseProps) {
  const [selected, setSelected] = useState(0);
  /** Live finger/pointer offset in px while dragging; 0 when settled. */
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  /** Set once a pointer has travelled far enough to be a drag, not a click. */
  const dragged = useRef(false);
  /** The selection as last requested, ahead of the re-render that applies it. */
  const pending = useRef(0);

  const current = items[selected];
  if (!current) return null;

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const slideId = (i: number) => `${baseId}-slide-${i}`;

  /** Selection follows focus, as a tablist is expected to behave. */
  function select(next: number, moveFocus = true) {
    const i = ((next % items.length) + items.length) % items.length;
    // Two clicks inside one tick both read `selected` from the same render, so
    // a quick double-tap on Next would advance a single slide. The ref is
    // written synchronously and is what relative moves count from.
    pending.current = i;
    setSelected(i);
    if (moveFocus) tabRefs.current[i]?.focus();
  }

  /**
   * Relative move. The tablist wraps, because that is what arrow keys in a
   * tablist do; the two arrow buttons clamp, because they are disabled at the
   * ends and should not appear to do nothing.
   */
  function move(delta: number, opts: { wrap: boolean; moveFocus: boolean }) {
    const next = pending.current + delta;
    select(
      opts.wrap ? next : Math.min(Math.max(next, 0), items.length - 1),
      opts.moveFocus,
    );
  }

  function onRailKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        move(1, { wrap: true, moveFocus: true });
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        move(-1, { wrap: true, moveFocus: true });
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

  /* ---- Drag to change slide -------------------------------------------
     `touch-action: pan-y` on the viewport leaves vertical scrolling to the
     page and gives us the horizontal axis, so a swipe down the homepage on a
     phone never snags on the slider. ------------------------------------ */

  function onPointerDown(event: React.PointerEvent) {
    // Let the buttons and the link inside a slide behave normally.
    if (event.button !== 0) return;
    dragStartX.current = event.clientX;
    dragged.current = false;
    setDragging(true);
  }

  function onPointerMove(event: React.PointerEvent) {
    if (!dragging) return;
    const dx = event.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) dragged.current = true;
    // Resist at the two ends, so the range feels finite rather than broken.
    const atEnd =
      (selected === 0 && dx > 0) || (selected === items.length - 1 && dx < 0);
    setDragOffset(atEnd ? dx * 0.25 : dx);
  }

  function endDrag() {
    if (!dragging) return;
    setDragging(false);
    if (dragOffset <= -SWIPE_THRESHOLD) move(1, { wrap: false, moveFocus: false });
    else if (dragOffset >= SWIPE_THRESHOLD) move(-1, { wrap: false, moveFocus: false });
    setDragOffset(0);
  }

  /** A drag that ends on a control must not also fire that control. */
  function onClickCapture(event: React.MouseEvent) {
    if (dragged.current) {
      event.preventDefault();
      event.stopPropagation();
      dragged.current = false;
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
        transition: "background-image 360ms var(--ease-standard)",
      }}
    >
      <div className="p-[var(--space-6)] md:p-[var(--space-8)]">
        <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-[var(--space-7)]">
          {/*
            The index. A drawing's contents column rather than a tab bar:
            every product stays readable, and it fills the height the plate
            creates instead of adding a strip under everything.
          */}
          <div className="lg:flex lg:flex-col">
            <div
              role="tablist"
              aria-label="Product range"
              aria-orientation="vertical"
              onKeyDown={onRailKeyDown}
              className={cn(
                "-mx-1 flex gap-1 overflow-x-auto px-1 pb-2",
                "lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0",
              )}
            >
              <p className="hidden text-eyebrow uppercase text-[var(--color-text-muted)] lg:mb-4 lg:block">
                Range
              </p>
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
                    aria-controls={slideId(i)}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => select(i, false)}
                    className={cn(
                      "flex shrink-0 items-baseline gap-2.5 whitespace-nowrap rounded-md px-2.5 py-2 text-left transition-colors",
                      // Weight and a rule carry the state, not colour alone (§12).
                      "lg:w-full lg:whitespace-normal lg:rounded-none lg:border-l-2 lg:px-3 lg:py-2.5",
                      isSelected
                        ? "bg-white/10 font-semibold text-[var(--color-text)] lg:border-[var(--color-action)] lg:bg-white/[0.06]"
                        : "text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-[var(--color-text)] lg:border-transparent lg:hover:border-[var(--color-border)]",
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

            <SliderControls
              selected={selected}
              total={items.length}
              onPrev={() => move(-1, { wrap: false, moveFocus: false })}
              onNext={() => move(1, { wrap: false, moveFocus: false })}
            />
          </div>

          {/* The viewport. Slides live in a rail that moves across it. */}
          <div
            ref={viewportRef}
            className="relative mt-[var(--space-6)] overflow-hidden lg:mt-0"
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
          >
            <div
              className="flex"
              style={{
                transform: `translate3d(calc(${selected * -100}% + ${dragOffset}px), 0, 0)`,
                // No transition while a finger is down: the rail has to track
                // the pointer exactly, then ease once it is let go.
                transition: dragging
                  ? "none"
                  : "transform 360ms var(--ease-standard)",
              }}
            >
              {items.map((item, i) => {
                const isActive = i === selected;
                return (
                  <div
                    key={item.name}
                    id={slideId(i)}
                    role="tabpanel"
                    aria-labelledby={tabId(i)}
                    // Off-stage slides stay in the document — a crawler should
                    // see the whole range — but are taken out of the tab order
                    // and the accessibility tree.
                    inert={!isActive}
                    aria-hidden={!isActive}
                    className={cn(
                      "w-full shrink-0",
                      // The slide arriving lifts to full strength as it lands,
                      // so the change reads as arrival rather than as a
                      // filmstrip sliding past.
                      "transition-[opacity,transform] duration-[360ms] ease-[var(--ease-standard)]",
                      // Off-stage slides are fully transparent, not merely
                      // dimmed: the oversized numeral overhangs its own slide
                      // by ~23px, so a visible neighbour bleeds a sliver of its
                      // index into the slide on stage.
                      isActive ? "opacity-100" : "scale-[0.98] opacity-0",
                    )}
                  >
                    <Slide item={item} index={i} isActive={isActive} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   One slide
------------------------------------------------------------------------- */

function Slide({
  item,
  index,
  isActive,
}: {
  item: Collection;
  index: number;
  isActive: boolean;
}) {
  /**
   * The parts settle in order rather than arriving as one block. The class is
   * only on the active slide, so it starts when the slide becomes active and
   * the off-stage slides sit at their resting state — which is also what they
   * look like under `prefers-reduced-motion`, where the global rule collapses
   * both the delay and the duration.
   */
  const part = (delay: number) =>
    isActive
      ? { className: "panel-in", style: { animationDelay: `${delay}ms` } }
      : { className: undefined, style: undefined };

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.74fr)] lg:gap-x-[var(--space-7)] lg:gap-y-[var(--space-6)]">
      {/* Identity and the pitch for this one product. */}
      <div className="lg:self-center">
        <p
          className={cn(
            "text-eyebrow uppercase text-[var(--color-text-muted)]",
            part(80).className,
          )}
          style={part(80).style}
        >
          {item.audience}
        </p>
        <h3
          className={cn("mt-3 text-heading-1", part(130).className)}
          style={part(130).style}
        >
          {item.name}
        </h3>
        <p
          className={cn(
            "mt-[var(--space-5)] max-w-copy text-body-large text-[var(--color-text-secondary)]",
            part(180).className,
          )}
          style={part(180).style}
        >
          {item.styleProfile}
        </p>
      </div>

      {/*
        The plate: the product presented the way a sample is. The numeral and
        the crop marks are both anchored to the plate itself, not to the
        column, so they stay registered to it at every width.
      */}
      <div className="relative mx-auto mt-[var(--space-7)] w-full max-w-[20rem] lg:mt-0 lg:self-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 -top-12 select-none font-display text-[9rem] font-bold leading-none tracking-tighter text-white/[0.07] md:-right-6 md:-top-16 md:text-[12rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div
          className={cn("relative", part(150).className)}
          style={part(150).style}
        >
          <CropMarks />
          <Plate item={item} />
        </div>
      </div>

      {/* What is in the collection, and the action, under the copy column. */}
      <div
        // Spans the copy and plate columns: confined to the copy column the
        // product names wrapped onto four lines each.
        className={cn(
          "mt-[var(--space-6)] lg:col-span-2 lg:mt-0 lg:self-start",
          part(230).className,
        )}
        style={part(230).style}
      >
        {/*
          The products, named. This replaces the old Shell / Construction /
          Branding row, which described one product and cannot describe a
          collection — belts, straps and lifting gloves have three different
          shells between them. It is also the part that keeps a collection slide
          from being a bare label: "Boxing" alone tells a buyer nothing about
          whether we make focus mitts.
        */}
        {item.products && item.products.length > 0 && (
          <div className="border-t border-[var(--color-border)] pt-[var(--space-4)]">
            <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
              In this collection
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-[var(--space-5)] gap-y-2">
              {item.products.map((product) => (
                <li
                  key={product}
                  className="flex items-center gap-2.5 font-body text-body font-semibold text-[var(--color-text)]"
                >
                  <Tick />
                  {product}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-[var(--space-6)]">
          {/*
            §08 text-link rule: "no ambiguous label". The destination is named,
            and collections without a product page say "brief" rather than
            "explore", because there is nothing yet to explore.
          */}
          <Button href={item.href} variant="inverse" arrow>
            {item.linkLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * The plate's contents: the photograph where one exists, otherwise the brief for
 * the photograph that is still missing. Both wear the same frame at the same
 * ratio, so the crop marks stay registered to the plate either way.
 */
function Plate({ item }: { item: Collection }) {
  if (!item.photo) {
    return (
      <ImagePlaceholder
        shot={item.shot}
        ratio="portrait"
        className="border-[var(--color-border)] bg-white/[0.04]"
      />
    );
  }

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-[var(--color-border)] bg-white/[0.04]">
      <Image
        src={item.photo.src}
        alt={item.photo.alt}
        fill
        placeholder="blur"
        // The plate is capped at 20rem and never renders wider, so there is no
        // point offering the browser a candidate sized to the viewport.
        sizes="320px"
        className="object-cover"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------
   Controls
------------------------------------------------------------------------- */

function SliderControls({
  selected,
  total,
  onPrev,
  onNext,
}: {
  selected: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-[var(--space-6)] lg:mt-auto lg:pt-[var(--space-7)]">
      <div className="flex items-center gap-3">
        <ArrowButton
          label="Previous product"
          onClick={onPrev}
          disabled={selected === 0}
          direction="prev"
        />
        <ArrowButton
          label="Next product"
          onClick={onNext}
          disabled={selected === total - 1}
          direction="next"
        />
        {/* Position in the range. The count is the accessible version of the bar. */}
        <p className="ml-auto font-display text-small tabular-nums text-[var(--color-text-muted)]">
          <span className="sr-only">Product </span>
          {String(selected + 1).padStart(2, "0")}
          <span className="sr-only"> of </span>
          <span aria-hidden="true"> / </span>
          {String(total).padStart(2, "0")}
        </p>
      </div>

      {/* Full width under the controls — a stub of a bar reads as a mistake. */}
      <div
        aria-hidden="true"
        className="mt-[var(--space-4)] h-px w-full bg-[var(--color-border)]"
      >
        <div
          className="h-px bg-[var(--color-action)] transition-[width] duration-[360ms] ease-[var(--ease-standard)]"
          style={{ width: `${((selected + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function ArrowButton({
  label,
  onClick,
  disabled,
  direction,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex size-10 items-center justify-center rounded-md border transition-colors",
        disabled
          ? "cursor-not-allowed border-[var(--color-border)] text-[var(--color-text-muted)] opacity-40"
          : "border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-action)] hover:bg-white/5",
      )}
    >
      {/* §09 iconography: one line family, ~1.75px stroke. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className={cn("size-4", direction === "prev" && "rotate-180")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10h12M11 5l5 5-5 5" />
      </svg>
    </button>
  );
}

/** §09 iconography: one line family, ~1.75px stroke, Forge for emphasis. */
function Tick() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-4 shrink-0 text-[var(--color-action)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 10.5 8.5 14.5l7-9" />
    </svg>
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
