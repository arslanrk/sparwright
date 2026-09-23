"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Button } from "@/components/foundation/Button";
import { cn } from "@/lib/cn";
import type { Collection } from "@/lib/collections";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * ProductShowcase — Design System §08 product choices, §09 graphic language,
 * §07 Motion, §12 Accessibility.
 *
 * A drawing sheet, not a retail hero. §09 asks for "fine seam lines and
 * glove-panel outlines", "measurement marks and restrained coordinate-like
 * labels" and "product specification tags such as MODEL / USE / SHELL /
 * BRANDING"; this takes that literally. The panel is a framed sheet with
 * registration marks at its corners, the plate is dimensioned on two edges, and
 * the collection's particulars sit in a ruled title block.
 *
 * Two things it does that a product-on-a-stage layout could not:
 *
 * It says manufacturer rather than shop. Every reference this section grew from
 * sells a finished object with a price; a drawing sheet presents something being
 * specified, which is what Sparwright actually does.
 *
 * It survives missing photography. Most collections are still on placeholders,
 * and a sheet whose STATUS cell reads "In development" is coherent — where a
 * retail stage with no product on it just reads as broken. That cell is driven
 * off whether the collection has a photograph, so it keeps itself honest as
 * shots land.
 *
 * Navigation is a stepper under the copy — prev, the current collection, next —
 * with the position stated at the top of the field. It replaced an index strip
 * that listed all five collections at once. That strip was there for a reason:
 * under 1% of visitors ever advance past a carousel's first slide, so a buyer
 * who cannot see the whole range may never learn we make lifting gear. Stepping
 * is the brief; the risk it carries is recorded here rather than forgotten.
 *
 * It advances on its own every 7s, which §07 puts on its Avoid list under
 * "automatic carousels". Auto-rotation also triggers WCAG 2.2.2 (Pause, Stop,
 * Hide), so it comes with the three things that obligation actually requires:
 * a visible pause control, a stop on hover and on focus-within, and no rotation
 * at all under `prefers-reduced-motion`. Rotation wraps; the arrows do not.
 *
 * ARIA follows the APG carousel pattern rather than tabs. With the index strip
 * gone there are no tabs to own the panels, so the sheet is a `region` with
 * `aria-roledescription="carousel"` and each slide a labelled `group`. The live
 * region is off while rotating and polite once stopped, which is what the
 * pattern asks for: announcing a slide nobody asked for is noise.
 *
 * Every slide stays in the document — rendering only the selected one left the
 * rest reaching the page as serialized props inside a script tag, which is not
 * content. Off-stage slides are `inert`, so neither a screen reader nor the Tab
 * key wanders into them. Relative moves count from a synchronously-written ref,
 * so three rapid clicks advance three slides rather than one.
 */

type Props = { items: Collection[] };

/** Drag distance, in px, that commits to the next slide instead of springing back. */
const SWIPE_THRESHOLD = 56;

/** Dwell between automatic advances. Long enough to read the style profile. */
const ROTATE_MS = 7000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

export function ProductShowcase({ items }: Props) {
  const [selected, setSelected] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  /** The pause control's own state — what the visitor last asked for. */
  const [playing, setPlaying] = useState(true);
  /** Transient holds: pointer over the sheet, or focus inside it. */
  const [held, setHeld] = useState(false);

  const baseId = useId();
  const dragStartX = useRef(0);
  const dragged = useRef(false);
  const pending = useRef(0);

  /**
   * Subscribed rather than read into state in an effect, which is what
   * `react-hooks/set-state-in-effect` objects to and what
   * `useSyncExternalStore` exists for. The server snapshot is `false`: the
   * preference is unknowable there, and rendering as if motion were reduced
   * would flash a paused control at everyone on first paint.
   */
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    () => false,
  );

  const rotating = playing && !held && !reduceMotion && items.length > 1;

  useEffect(() => {
    if (!rotating) return;
    const id = window.setInterval(() => {
      // Read through the ref rather than `selected`, so the timer advances from
      // whatever is actually on stage if a click landed mid-interval.
      pending.current = (pending.current + 1) % items.length;
      setSelected(pending.current);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
    // `selected` restarts the clock after a manual move, so a visitor who just
    // clicked gets a full dwell rather than the tail of the previous one.
  }, [rotating, selected, items.length]);

  if (!items[selected]) return null;

  const slideId = (i: number) => `${baseId}-slide-${i}`;

  function select(next: number) {
    const i = ((next % items.length) + items.length) % items.length;
    // Written synchronously so two clicks inside one tick do not both read the
    // same `selected` and collapse into a single move.
    pending.current = i;
    setSelected(i);
  }

  /**
   * The arrows clamp rather than wrap: they are disabled at the ends, and a
   * control that looks dead but jumps to the far end is worse than one that
   * does nothing. Automatic rotation wraps, because it has to keep going.
   */
  function move(delta: number, opts: { wrap: boolean }) {
    const next = pending.current + delta;
    select(opts.wrap ? next : Math.min(Math.max(next, 0), items.length - 1));
  }

  function onPointerDown(event: React.PointerEvent) {
    if (event.button !== 0) return;
    dragStartX.current = event.clientX;
    dragged.current = false;
    setDragging(true);
  }

  function onPointerMove(event: React.PointerEvent) {
    if (!dragging) return;
    const dx = event.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) dragged.current = true;
    const atEnd =
      (selected === 0 && dx > 0) || (selected === items.length - 1 && dx < 0);
    setDragOffset(atEnd ? dx * 0.25 : dx);
  }

  function endDrag() {
    if (!dragging) return;
    setDragging(false);
    if (dragOffset <= -SWIPE_THRESHOLD) {
      move(1, { wrap: false });
    } else if (dragOffset >= SWIPE_THRESHOLD) {
      move(-1, { wrap: false });
    }
    setDragOffset(0);
  }

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
      role="region"
      aria-roledescription="carousel"
      aria-label="Custom product range"
      className="relative rounded-xl bg-[var(--color-ink-950)] p-[var(--space-4)] text-[var(--color-text)] md:p-[var(--space-5)]"
      // WCAG 2.2.2: rotation stops while a pointer is over the sheet or focus
      // is anywhere inside it, so it cannot move out from under someone
      // reading or tabbing through.
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHeld(false);
        }
      }}
    >
      {/*
        The sheet frame. A drawing is bordered inside its sheet rather than
        printed to the edge, so the whole panel gets an inset rule and four
        registration marks — the crop marks that used to sit on the plate,
        promoted to the sheet itself.
      */}
      <div className="relative border border-[var(--color-border)]">
        <SheetMarks />

        <div
          className="overflow-hidden"
          aria-live={rotating ? "off" : "polite"}
        >
          <div
            className="flex"
            style={{
              transform: `translate3d(calc(${selected * -100}% + ${dragOffset}px), 0, 0)`,
              transition: dragging
                ? "none"
                : "transform 360ms var(--ease-standard)",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
          >
            {items.map((item, i) => {
              const isActive = i === selected;
              return (
                <div
                  key={item.name}
                  id={slideId(i)}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${items.length}: ${item.name}`}
                  inert={!isActive}
                  aria-hidden={!isActive}
                  className={cn(
                    "w-full shrink-0 transition-opacity duration-[360ms] ease-[var(--ease-standard)]",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                  style={{ touchAction: "pan-y" }}
                >
                  <Sheet
                    item={item}
                    index={i}
                    total={items.length}
                    onPrev={() => move(-1, { wrap: false })}
                    onNext={() => move(1, { wrap: false })}
                    atStart={i === 0}
                    atEnd={i === items.length - 1}
                    canRotate={!reduceMotion && items.length > 1}
                    playing={playing}
                    onTogglePlay={() => setPlaying((v) => !v)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   One sheet
------------------------------------------------------------------------- */

function Sheet({
  item,
  index,
  total,
  onPrev,
  onNext,
  atStart,
  atEnd,
  canRotate,
  playing,
  onTogglePlay,
}: {
  item: Collection;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  atStart: boolean;
  atEnd: boolean;
  canRotate: boolean;
  playing: boolean;
  onTogglePlay: () => void;
}) {
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_22rem]">
      {/* The dimensioned field. */}
      <div className="relative flex flex-col border-b border-[var(--color-border)] p-[var(--space-6)] lg:border-b-0 lg:border-r">
        {/*
          Position, stated at the head of the sheet. A drawing numbers itself in
          the corner before anything else on it means much.
        */}
        <p className="font-display text-small tabular-nums text-[var(--color-text-muted)]">
          <span className="sr-only">Collection </span>
          <span className="text-[var(--color-action)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="sr-only"> of </span>
          <span aria-hidden="true"> / </span>
          {String(total).padStart(2, "0")}
        </p>

        <div className="relative mx-auto mt-[var(--space-5)] w-full max-w-[18rem]">
          <div className="relative">
            <Plate item={item} />
            {/* Dimension rules on two sides, as a drawing carries them. */}
            <DimensionRule axis="x" />
            <DimensionRule axis="y" />
          </div>
        </div>

        <p className="mt-[var(--space-6)] max-w-copy text-body text-[var(--color-text-secondary)]">
          {item.styleProfile}
        </p>

        {/*
          The stepper. `mt-auto` pins it to the foot of the field so it holds
          the same line whatever length the style profile runs to — otherwise
          it jumped between slides.
        */}
        <div className="mt-auto flex items-center justify-center gap-[var(--space-4)] pt-[var(--space-6)]">
          <SheetArrow
            label="Previous collection"
            onClick={onPrev}
            disabled={atStart}
            direction="prev"
          />

          <p className="min-w-[12rem] text-center">
            <span className="font-display text-small tabular-nums text-[var(--color-action)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="ml-2 font-body text-body font-semibold uppercase tracking-wide text-[var(--color-text)]">
              {item.name}
            </span>
          </p>

          <SheetArrow
            label="Next collection"
            onClick={onNext}
            disabled={atEnd}
            direction="next"
          />

          {/*
            WCAG 2.2.2 requires a mechanism to stop content that moves on its
            own. Hidden when rotation cannot happen at all — under reduced
            motion there is nothing to pause.
          */}
          {canRotate && (
            <button
              type="button"
              onClick={onTogglePlay}
              aria-pressed={!playing}
              aria-label={
                playing
                  ? "Pause automatic rotation"
                  : "Resume automatic rotation"
              }
              className="ml-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-action)] hover:text-[var(--color-text)]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="size-3.5"
                fill="currentColor"
              >
                {playing ? (
                  <>
                    <rect x="5.5" y="4" width="3" height="12" rx="1" />
                    <rect x="11.5" y="4" width="3" height="12" rx="1" />
                  </>
                ) : (
                  <path d="M6 4.2v11.6a1 1 0 0 0 1.53.85l9.1-5.8a1 1 0 0 0 0-1.7l-9.1-5.8A1 1 0 0 0 6 4.2Z" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/*
        The title block. A real drawing puts its particulars in a ruled grid in
        the corner of the sheet, each cell labelled. These are §09's own
        specification tags adapted from a single product to a collection.
      */}
      <div className="flex flex-col">
        <TitleCell label="Collection">
          <h3 className="text-heading-2">{item.name}</h3>
        </TitleCell>

        <TitleCell label="Made for">
          <p className="font-body text-body text-[var(--color-text)]">
            {item.audience}
          </p>
        </TitleCell>

        <TitleCell label="Parts" grow>
          {item.products && item.products.length > 0 ? (
            <ul className="grid gap-2">
              {item.products.map((product, i) => (
                <li
                  key={product}
                  className="flex items-baseline gap-3 font-body text-body text-[var(--color-text)]"
                >
                  <span className="font-display text-eyebrow tabular-nums text-[var(--color-action)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {product}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-body text-small italic text-[var(--color-text-muted)]">
              Not yet scheduled
            </p>
          )}
        </TitleCell>

        <div className="grid grid-cols-2 border-b border-[var(--color-border)]">
          <div className="border-r border-[var(--color-border)] px-[var(--space-5)] py-[var(--space-4)]">
            <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
              Sheet
            </p>
            <p className="mt-1 font-display text-body tabular-nums text-[var(--color-text)]">
              {String(index + 1).padStart(2, "0")} of{" "}
              {String(total).padStart(2, "0")}
            </p>
          </div>
          <div className="px-[var(--space-5)] py-[var(--space-4)]">
            <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
              Status
            </p>
            <p className="mt-1 font-display text-body text-[var(--color-text)]">
              {item.photo ? "Sampled" : "In development"}
            </p>
          </div>
        </div>

        <div className="p-[var(--space-5)]">
          <Button href={item.href} variant="inverse" arrow>
            {item.linkLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

function TitleCell({
  label,
  children,
  grow,
}: {
  label: string;
  children: React.ReactNode;
  grow?: boolean;
}) {
  return (
    <div
      className={cn(
        "border-b border-[var(--color-border)] px-[var(--space-5)] py-[var(--space-4)]",
        grow && "flex-1",
      )}
    >
      <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Drawing furniture
------------------------------------------------------------------------- */

/** Registration marks at the four corners of the sheet, set just inside it. */
function SheetMarks() {
  const corner =
    "pointer-events-none absolute size-3 border-[var(--color-action)]";
  return (
    // `pointer-events-none` belongs on this wrapper, not only on the marks it
    // holds. It spans the whole sheet at z-10, so while it was hit-testable it
    // swallowed every click inside — the arrows, the pause control and the
    // action link were all dead.
    <div aria-hidden="true" className="pointer-events-none absolute inset-2 z-10">
      <span className={cn(corner, "left-0 top-0 border-l border-t")} />
      <span className={cn(corner, "right-0 top-0 border-r border-t")} />
      <span className={cn(corner, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(corner, "bottom-0 right-0 border-b border-r")} />
    </div>
  );
}

/**
 * A dimension rule along one edge of the plate: a witness line with ticks and
 * arrow ends, the way a drawing states an extent. §09's "measurement marks".
 */
function DimensionRule({ axis }: { axis: "x" | "y" }) {
  const TICKS = 16;
  const horizontal = axis === "x";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute flex",
        horizontal
          ? "-bottom-[var(--space-4)] left-0 right-0 items-end justify-between"
          : "-left-[var(--space-4)] bottom-0 top-0 flex-col items-start justify-between",
      )}
    >
      {Array.from({ length: TICKS }, (_, i) => {
        const end = i === 0 || i === TICKS - 1;
        const major = i % 4 === 0;
        return (
          <span
            key={i}
            className={cn(
              end
                ? "bg-[var(--color-action)]"
                : major
                  ? "bg-white/30"
                  : "bg-white/15",
              horizontal
                ? cn("w-px", end ? "h-3" : major ? "h-2" : "h-1")
                : cn("h-px", end ? "w-3" : major ? "w-2" : "w-1"),
            )}
          />
        );
      })}
    </div>
  );
}

function SheetArrow({
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
        "flex w-12 shrink-0 items-center justify-center transition-colors",
        direction === "prev"
          ? "border-r border-[var(--color-border)]"
          : "border-l border-[var(--color-border)]",
        disabled
          ? "cursor-not-allowed text-[var(--color-text-muted)] opacity-40"
          : "text-[var(--color-text)] hover:bg-white/5",
      )}
    >
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

/** The photograph where one exists, otherwise the brief it is waiting on. */
function Plate({ item }: { item: Collection }) {
  if (!item.photo) {
    return (
      <ImagePlaceholder
        shot={item.shot}
        ratio="portrait"
        className="rounded-none border-[var(--color-border)] bg-white/[0.03]"
      />
    );
  }
  return (
    <div className="relative aspect-[3/4] overflow-hidden border border-[var(--color-border)]">
      <Image
        src={item.photo.src}
        alt={item.photo.alt}
        fill
        placeholder="blur"
        sizes="288px"
        className="object-cover"
      />
    </div>
  );
}
