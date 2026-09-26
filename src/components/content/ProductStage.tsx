"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Section } from "@/components/foundation/Container";
import { cn } from "@/lib/cn";

/**
 * ProductStage — the products hub's hero as a showroom stage. The copy on
 * the left; on the right a studio stage showing one line at a time: the
 * product large and a giant outlined word for the line behind it; the whole
 * stage links to the line's page. Six thumbnails under the stage choose the
 * line.
 *
 * It moves on by itself every `interval` ms, as the Gyms & Academies hero
 * does (the owner's call over §07), with the active thumbnail filling as a
 * progress bar. It holds while hovered or focused, and never moves under
 * reduced motion or in a hidden tab. Every line's name and link is in the
 * HTML (the stage links the active one; a visually hidden list links all
 * six), so the hero stays the hub's jump menu for search.
 */

export type StageLine = {
  /** Short name, e.g. "Boxing gloves". */
  label: string;
  /** The line's page title, e.g. "Custom Boxing Gloves". */
  name: string;
  /** The giant word behind the product, e.g. "BOXING". */
  word: string;
  href: string;
  shot: StaticImageData;
  scene?: boolean;
  /** A transparent cut-out that fills the stage, feet on its floor. */
  cutout?: boolean;
  types: string[];
};

export function ProductStage({
  breadcrumb,
  eyebrow,
  title,
  description,
  actions,
  lines,
  interval = 6000,
}: {
  breadcrumb: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  actions: ReactNode;
  lines: StageLine[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [still, setStill] = useState(false);
  // Bumped on every manual move, so the timer restarts from the choice.
  const [cycle, setCycle] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const line = lines[active];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(reduce.matches || document.hidden);
    update();
    reduce.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      reduce.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (held || still) return;
    const timer = window.setTimeout(
      () => setActive((a) => (a + 1) % lines.length),
      interval,
    );
    return () => window.clearTimeout(timer);
  }, [active, held, still, cycle, interval, lines.length]);

  function choose(index: number, focus = false) {
    const next = (index + lines.length) % lines.length;
    setActive(next);
    setCycle((c) => c + 1);
    if (focus) tabs.current[next]?.focus();
  }

  const running = !held && !still;

  return (
    <Section
      theme="dark"
      width="shell"
      className="relative isolate overflow-hidden pt-[var(--space-6)]! lg:pt-[var(--space-7)]!"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 -z-10 size-[40rem] rounded-full bg-forge-600/12 blur-3xl"
      />

      <div className="grid grid-cols-1 items-center gap-[var(--space-8)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-[var(--space-8)]">
        <div>
          <div className="mb-[var(--space-7)]">{breadcrumb}</div>
          <p className="flex items-center gap-3 text-eyebrow uppercase tracking-[0.16em] text-forge-600">
            <span aria-hidden="true" className="h-0.5 w-6 bg-forge-600" />
            {eyebrow}
          </p>
          <h1 className="mt-[var(--space-5)] font-display text-display-lg">
            {title}
          </h1>
          <p className="mt-[var(--space-5)] max-w-copy text-body-large text-[var(--color-text-secondary)]">
            {description}
          </p>
          <div className="mt-[var(--space-7)] flex flex-wrap items-center gap-3">
            {actions}
          </div>
        </div>

        <div
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node))
              setHeld(false);
          }}
        >
          {/* The stage: the whole of it links to the line's page. */}
          <div
            role="tabpanel"
            id={`${id}-panel`}
            aria-labelledby={`${id}-tab-${active}`}
            className="relative"
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-[radial-gradient(90%_90%_at_68%_62%,#d4d5d7,#a1a4a9)] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] sm:aspect-[16/11]">
              {/* The line's word, huge and outlined, behind the product. */}
              <span
                key={`word-${active}`}
                aria-hidden="true"
                className="absolute inset-x-0 top-[6%] select-none text-center font-display whitespace-nowrap text-[clamp(3.5rem,9vw,8.5rem)] font-black leading-none tracking-tight text-transparent [-webkit-text-stroke:2px_rgb(11_13_16/0.14)] motion-safe:animate-[word-in_700ms_ease-out_both]"
              >
                {line.word}
              </span>

              {line.cutout ? (
              <span key={`shot-${active}`} className="absolute inset-x-[4%] bottom-0 top-[8%] block motion-safe:animate-[stage-in_600ms_ease-out_both]">
                <Image src={line.shot} alt="" fill sizes="(min-width: 1024px) 620px, 96vw" className="object-contain object-bottom drop-shadow-[0_18px_24px_rgb(0_0_0/0.25)]" />
              </span>
            ) : line.scene ? (
                <Image
                  key={`shot-${active}`}
                  src={line.shot}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="object-cover motion-safe:animate-[stage-in_600ms_ease-out_both]"
                />
              ) : (
                // The studio shot in its own square, centred, its edges
                // faded into the stage.
                <span
                  key={`shot-${active}`}
                  className="absolute bottom-[2%] left-1/2 block aspect-square h-[94%] -translate-x-1/2 [mask-image:radial-gradient(closest-side,black_66%,transparent)] motion-safe:animate-[stage-in_600ms_ease-out_both]"
                >
                  <Image
                    src={line.shot}
                    alt=""
                    fill
                    priority={active === 0}
                    sizes="(min-width: 1024px) 520px, 90vw"
                    className="object-contain"
                  />
                </span>
              )}

              <Link
                href={line.href}
                aria-label={`Explore ${line.name}`}
                className="absolute inset-0 rounded-3xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-forge-600"
              />

              {/* The count, bottom left. */}
              <p aria-hidden="true" className="pointer-events-none absolute bottom-4 left-5 font-display text-small font-bold tabular-nums text-ink-950/70">
                {String(active + 1).padStart(2, "0")} <span className="text-ink-950/35">/ {String(lines.length).padStart(2, "0")}</span>
              </p>

              {/* Previous and next, on the stage's right edge. */}
              <div className="absolute right-3 top-3 flex gap-1.5 sm:right-5 sm:top-5">
                <StageArrow
                  label="Previous product line"
                  onClick={() => choose(active - 1)}
                  flip
                />
                <StageArrow
                  label="Next product line"
                  onClick={() => choose(active + 1)}
                />
              </div>
            </div>

          </div>

          {/* The six lines. */}
          <div
            role="tablist"
            aria-label="Product lines"
            className="mt-3 grid grid-cols-6 gap-2"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                choose(active + 1, true);
              } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                choose(active - 1, true);
              }
            }}
          >
            {lines.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.href}
                  ref={(node) => {
                    tabs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${index}`}
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  aria-label={item.name}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => choose(index)}
                  className={cn(
                    "group relative overflow-hidden rounded-xl bg-[radial-gradient(120%_100%_at_50%_75%,#d9dadc,#a9acb1)] ring-2 transition-[box-shadow,transform,opacity] duration-300",
                    selected
                      ? "ring-forge-600"
                      : "opacity-60 ring-transparent hover:opacity-100",
                  )}
                >
                  <span className="relative block aspect-square">
                    <Image
                      src={item.shot}
                      alt=""
                      fill
                      sizes="96px"
                      className={cn(
                        item.scene
                          ? "object-cover"
                          : "object-contain p-1 [mask-image:radial-gradient(closest-side,black_72%,transparent)]",
                      )}
                    />
                  </span>
                  {/* The progress fill, on the chosen line while it runs. */}
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-ink-950/30">
                    {selected ? (
                      <span
                        key={`${active}-${cycle}-${running}`}
                        className={cn(
                          "block h-full origin-left bg-forge-600",
                          running
                            ? "animate-[hero-progress_linear_forwards]"
                            : "",
                        )}
                        style={
                          running
                            ? { animationDuration: `${interval}ms` }
                            : undefined
                        }
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Every line, linked, for search and for anyone who wants the list. */}
      <nav aria-label="All product lines" className="sr-only">
        <ul>
          {lines.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  );
}

function StageArrow({
  label,
  onClick,
  flip = false,
}: {
  label: string;
  onClick: () => void;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full bg-ink-950/80 text-white backdrop-blur-sm transition-colors hover:bg-forge-600"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className={cn("size-4", flip && "rotate-180")}
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
