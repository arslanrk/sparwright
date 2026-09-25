"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * HeroSlider — a full-bleed photographic hero whose content changes by slide.
 *
 * Manual, never automatic: §07 rules out auto-rotating carousels, because a
 * slide that moves while it is being read is a slide that is not read. The
 * buyer moves it with the dots, the arrows, the arrow keys or a swipe.
 *
 * Every slide is in the markup, stacked in one grid cell, so a search engine
 * reads all of them and the band is as tall as its tallest slide — changing
 * slide never makes the page below jump. Inactive slides are `inert`, so
 * neither the keyboard nor a screen reader lands on a slide that is not shown.
 *
 * The photograph sits on the right from `lg`, faded into Ink on its left edge
 * so the type reads on a flat ground; on a phone it fills the band behind a
 * scrim that rises from the foot, where the type sits.
 *
 * No social proof beside the action, where the references carry "5000+
 * partners": non-negotiable #12. The products line stands in that slot.
 */

export type HeroSlide = {
  /** Short uppercase label, e.g. "Boxing clubs". */
  eyebrow: string;
  title: string;
  description: string;
  products: { label: string; href?: string }[];
  action: ReactNode;
  photo: {
    src: StaticImageData;
    alt: string;
    position?: string;
    /**
     * "right" (default) and "full" sit on the right from `lg`, faded into Ink
     * towards the type; "full" is a wide banner, shown whole from `xl` and as
     * a strip on a phone. "cutout" is a transparent PNG of figures: shown
     * whole, standing on the band's floor, with a glow behind — never cropped.
     */
    layout?: "right" | "full" | "cutout";
  };
};

type HeroSliderProps = {
  slides: HeroSlide[];
  /** Above the slides, e.g. the breadcrumb and the page's h1. */
  top?: ReactNode;
  /** Accessible name for the carousel. */
  label: string;
};

export function HeroSlider({ slides, top, label }: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const count = slides.length;

  // Functional updates, so two quick clicks move two slides, not one.
  const goTo = (index: number) => setActive((index + count) % count);
  const step = (delta: number) =>
    setActive((current) => (current + delta + count) % count);

  return (
    <section
      data-theme="dark"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        touchStart.current = null;
        if (Math.abs(delta) > 48) step(delta < 0 ? 1 : -1);
      }}
      className="relative isolate overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      {/* The photographs, one per slide, cross-faded. */}
      {slides.map((slide, index) => {
        const full = slide.photo.layout === "full";
        const cutout = slide.photo.layout === "cutout";
        return (
        <div
          key={slide.title}
          aria-hidden={index === active ? undefined : true}
          className={cn(
            "absolute inset-0 -z-10 transition-opacity duration-500 ease-standard motion-reduce:transition-none",
            // From `lg` every photograph takes the right-hand area and fades
            // out towards the type with a mask (an overlay left a 1px seam), so
            // the type always sits on flat Ink — never over a photograph. A
            // wide banner is cropped to its figures there by its position.
            !cutout &&
              "lg:left-auto lg:w-[58%] lg:[mask-image:linear-gradient(to_right,transparent,black_45%)]",
            // Figures on a transparent ground need no fade: they stand on the
            // floor of the right-hand area, whole. On a phone they stand at
            // the head of the band, above the type.
            cutout &&
              "bottom-auto top-[var(--space-7)] h-[16rem] sm:h-[20rem] lg:top-[var(--space-8)] lg:bottom-0 lg:left-auto lg:right-[max(1rem,3vw)] lg:h-auto lg:w-[52%]",
            // On a phone a banner is a strip across the head of the band,
            // fading out above the type, rather than zoomed to the band's
            // full height.
            full &&
              "bottom-auto h-[24rem] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] sm:h-[28rem] lg:bottom-0 lg:h-auto",
            // From `xl` a banner is shown whole: full width at its own
            // proportions, centred in the band, its top and bottom edges
            // faded into the Ink. The type sits on the dark third the banner
            // was composed with, in a column that ends before its figures.
            full &&
              "xl:inset-x-0 xl:top-1/2 xl:bottom-auto xl:w-full xl:-translate-y-1/2 xl:aspect-[var(--banner-ratio)] xl:[mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]",
            index === active ? "opacity-100" : "opacity-0",
          )}
          style={
            full
              ? ({
                  "--banner-ratio": `${slide.photo.src.width} / ${slide.photo.src.height}`,
                } as CSSProperties)
              : undefined
          }
        >
          {/* Behind cut-out figures: a Forge glow to stand them in, the same
              device the audience cards use for their cut-outs. */}
          {cutout ? (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 top-[10%] bg-[radial-gradient(ellipse_at_50%_62%,rgb(216_58_32/0.42),transparent_68%)]"
            />
          ) : null}
          <Image
            src={slide.photo.src}
            alt={slide.photo.alt}
            fill
            priority={index === 0}
            sizes={
              full
                ? "(min-width: 1280px) 100vw, (min-width: 1024px) 58vw, 100vw"
                : cutout
                  ? "(min-width: 1024px) 52vw, 100vw"
                  : "(min-width: 1024px) 58vw, 100vw"
            }
            className={cn(
              cutout
                ? "object-contain object-bottom"
                : "object-cover [object-position:var(--photo-position)]",
            )}
            style={
              {
                "--photo-position": slide.photo.position ?? "center 30%",
              } as CSSProperties
            }
          />
          {/* Phone: a shade at the head for the breadcrumb, which otherwise
              sat on the bright gym window in the photographs. */}
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-ink-950/85 to-transparent lg:hidden" />
          {/* Phone: a scrim rising from the foot, under the type. Not for a
              banner, whose strip ends above the type and fades by its mask. */}
          {!full && !cutout ? (
            <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/85 via-55% to-ink-950/30 lg:hidden" />
          ) : null}
          {/* Desktop: a soft foot, so the controls sit on a quiet ground —
              and cut-out figures fade into the floor rather than stop at it. */}
          <span aria-hidden="true" className={cn("absolute inset-x-0 bottom-0 hidden bg-linear-to-t from-ink-950 to-transparent lg:block", cutout ? "h-24" : "h-40")} />
        </div>
        );
      })}

      {/*
        The band fills the window below the sticky header, and from `lg` runs
        as a column: the breadcrumb at the head, the slide centred, the
        controls at the foot. The content is inset a share of the viewport
        rather than held to the page container, so it sits on the flat Ink to
        the left of the photograph at every width.
      */}
      <div className="relative flex min-h-[calc(100svh-var(--header-height))] w-full flex-col px-5 pb-[var(--space-6)] pt-[var(--space-5)] md:px-6 lg:pl-[max(2rem,8vw)] lg:pr-[max(2rem,4vw)]">
        {top}

        {/* All slides in one cell: the tallest sets the height. */}
        <div className="mt-[18rem] grid sm:mt-[22rem] lg:my-auto lg:pb-[var(--space-9)] lg:pt-[var(--space-5)]">
          {slides.map((slide, index) => {
            const current = index === active;
            return (
              <div
                key={slide.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}: ${slide.eyebrow}`}
                inert={!current}
                className={cn(
                  "col-start-1 row-start-1 max-w-[38rem] lg:max-w-[31rem] transition-[opacity,translate] duration-500 ease-standard motion-reduce:transition-none",
                  // Over a whole banner the column ends at ~36% of the width
                  // (8vw inset + 28vw), inside the banner's dark third.
                  slide.photo.layout === "full" && "xl:max-w-[28vw]",
                  current ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                )}
              >
                <p className="inline-flex rounded-sm bg-forge-600 px-3 py-1.5 font-body text-eyebrow font-semibold uppercase tracking-[0.14em] text-white">
                  {slide.eyebrow}
                </p>
                <h2 className="mt-[var(--space-4)] text-display-lg text-white [text-wrap:balance] lg:text-[clamp(2.5rem,3.6vw,3.75rem)]">
                  {slide.title}
                </h2>
                <p className="mt-[var(--space-4)] text-body-large text-mist-300">
                  {slide.description}
                </p>

                {/* Named for assistive technology; on screen the pills say it. */}
                <div className="mt-[var(--space-5)]">
                  <ul aria-label="Products" className="flex flex-wrap gap-2">
                    {slide.products.map((product) => (
                      <li key={product.label}>
                        {product.href ? (
                          <Link
                            href={product.href}
                            className="inline-flex rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 text-small font-medium text-white backdrop-blur-sm transition-colors hover:border-forge-600 hover:bg-forge-600"
                          >
                            {product.label}
                          </Link>
                        ) : (
                          <span className="inline-flex rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 text-small font-medium text-white">
                            {product.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-[var(--space-6)]">{slide.action}</div>
              </div>
            );
          })}
        </div>

        {/* Controls: a fixed row, so they never move between slides. From
            `lg` it is pinned to the foot, so it adds no height to the band. */}
        <div className="mt-[var(--space-6)] flex items-center gap-[var(--space-5)] lg:absolute lg:bottom-[var(--space-5)] lg:left-[max(2rem,8vw)] lg:right-[max(2rem,4vw)] lg:mt-0">
          <div className="flex gap-2">
            <ArrowButton direction="previous" onClick={() => step(-1)} />
            <ArrowButton direction="next" onClick={() => step(1)} />
          </div>
          <ol className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <li key={slide.title}>
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
                  aria-current={index === active ? "true" : undefined}
                  className="flex h-6 items-center"
                >
                  <span
                    className={cn(
                      "block h-1 rounded-full transition-all duration-300 ease-standard",
                      index === active ? "w-10 bg-forge-600" : "w-5 bg-white/30 hover:bg-white/60",
                    )}
                  />
                </button>
              </li>
            ))}
          </ol>
          <p className="ml-auto font-display text-small font-bold tabular-nums text-mist-300" aria-live="polite">
            <span className="text-white">{String(active + 1).padStart(2, "0")}</span>
            {" / "}
            {String(count).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "previous" ? "Previous slide" : "Next slide"}
      className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-ink-950"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className={cn("size-4", direction === "previous" && "rotate-180")}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </button>
  );
}
