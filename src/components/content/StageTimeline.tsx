"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * StageTimeline — the five stages from brief to delivery as one rail, split
 * in two by the sample: the stages up to its approval come before bulk, the
 * rest are the full order. A gate marks the split, because that is the
 * point of the section — nothing is made in bulk until the sample is agreed.
 *
 * Real ARIA tabs (one tab stop, arrow keys, Home and End); each stage's
 * panel pairs a photograph with its words. Every panel is rendered on the
 * server so the copy is on the page for search; inactive panels are
 * `hidden`. Nothing changes on its own (§07).
 */

export type Stage = {
  title: string;
  description: string;
  checks?: string[];
  photo: { src: StaticImageData; alt: string };
};

export function StageTimeline({
  stages,
  gateAfter,
  label,
}: {
  stages: Stage[];
  /** Index of the stage the gate follows: the sample approval. */
  gateAfter: number;
  label: string;
}) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = stages.length - 1;

  function focusTab(index: number) {
    const next = Math.min(Math.max(index, 0), last);
    setActive(next);
    tabs.current[next]?.focus();
  }

  // The rail runs through the centres of the first and last stop.
  const fill = last > 0 ? active / last : 0;
  // The gate sits on the boundary between its stage and the next.
  const gateLeft = `calc(100% / ${stages.length} * ${gateAfter + 1})`;

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      {/* The rail. */}
      <div className="border-b border-[var(--color-border)] px-[var(--space-4)] pb-[var(--space-5)] pt-[var(--space-5)] sm:px-[var(--space-7)]">
        {/* The two phases, either side of the gate. */}
        <div aria-hidden="true" className="relative mb-5 hidden h-5 text-eyebrow uppercase tracking-[0.16em] sm:block">
          <PhaseBracket label={PHASES[0]} style={{ left: "0.75rem", right: `calc(100% - ${gateLeft} + 0.75rem)` }} />
          <PhaseBracket label={PHASES[1]} strong style={{ left: `calc(${gateLeft} + 0.75rem)`, right: "0.75rem" }} />
        </div>

        <div className="relative">
          {/* Track and progress, through the stop centres. */}
          <span aria-hidden="true" className="absolute top-5 h-0.5 bg-white/15" style={railInset(stages.length)} />
          <span
            aria-hidden="true"
            className="absolute top-5 h-0.5 bg-forge-600 transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ ...railInset(stages.length), right: "auto", width: `calc((100% - 100% / ${stages.length}) * ${fill})` }}
          />

          {/* The gate: the sample is approved here. */}
          <span
            aria-hidden="true"
            className="absolute -top-2 bottom-0 flex w-0 justify-center"
            style={{ left: gateLeft }}
          >
            <span className="absolute inset-y-0 w-px border-l border-dashed border-forge-600/70" />
            <span className="relative mt-2.5 flex size-5 items-center justify-center rounded-full bg-[var(--color-surface)] text-forge-600 ring-1 ring-forge-600">
              <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
            </span>
          </span>

          <div
            role="tablist"
            aria-label={label}
            className="relative grid"
            style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                focusTab(active + 1);
              } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
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
            {stages.map((stage, index) => {
              const selected = index === active;
              const done = index < active;
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
                  className="group flex flex-col items-center gap-3 rounded-lg px-1 pb-1 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forge-600"
                >
                  <span
                    className={cn(
                      "relative flex size-10 items-center justify-center rounded-full font-display text-small font-bold tabular-nums ring-4 ring-[var(--color-surface)] transition-colors",
                      selected
                        ? "bg-forge-600 text-white shadow-[0_0_0_7px_rgb(216_58_32/0.25)]"
                        : done
                          ? "bg-forge-700 text-white"
                          : "bg-carbon-900 text-white/60 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)] group-hover:text-white",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "hidden text-small font-semibold leading-snug transition-colors md:block",
                      selected ? "text-white" : "text-white/55 group-hover:text-white/85",
                    )}
                  >
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* The panels. */}
      {stages.map((stage, index) => (
        <div
          key={stage.title}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={index !== active}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-carbon-900 lg:aspect-auto lg:min-h-[26rem]">
            <Image
              src={stage.photo.src}
              alt={stage.photo.alt}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover motion-safe:animate-[stage-in_600ms_ease-out]"
            />
            <span className="absolute left-[var(--space-4)] top-[var(--space-4)] rounded-full bg-black/60 px-3 py-1 text-eyebrow uppercase tracking-[0.16em] text-white backdrop-blur-sm">
              Stage {String(index + 1).padStart(2, "0")} of {String(stages.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex flex-col p-[var(--space-6)] sm:p-[var(--space-7)]">
            <p className="text-eyebrow uppercase tracking-[0.16em] text-forge-600">
              {index <= gateAfter ? PHASES[0] : PHASES[1]}
            </p>
            <h3 className="mt-[var(--space-3)] text-heading-3">{stage.title}</h3>
            <p className="mt-[var(--space-4)] text-body text-[var(--color-text-secondary)]">{stage.description}</p>

            {stage.checks ? (
              <ul className="mt-[var(--space-5)] grid gap-2 sm:grid-cols-2">
                {stage.checks.map((check) => (
                  <li
                    key={check}
                    className="flex items-center gap-2.5 rounded-lg border border-[var(--color-border)] bg-white/[0.03] px-3 py-2.5 text-small text-white"
                  >
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0 text-forge-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3.5 8.5 3 3 6-7" />
                    </svg>
                    {check}
                  </li>
                ))}
              </ul>
            ) : null}

            {index === gateAfter ? (
              <p className="mt-[var(--space-5)] flex items-start gap-3 rounded-xl border border-dashed border-forge-600/60 bg-forge-600/10 p-[var(--space-4)] text-small text-white">
                <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center rounded-full bg-forge-600">
                  <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                </span>
                The full order is produced only against the sample you approve.
              </p>
            ) : null}

            {/* Step through without going back to the rail. */}
            <div className="mt-auto flex items-center gap-2 pt-[var(--space-6)]">
              <StepButton direction="prev" disabled={index === 0} onClick={() => focusTab(index - 1)} />
              <StepButton direction="next" disabled={index === last} onClick={() => focusTab(index + 1)} />
              {index < last ? (
                <span className="ml-2 truncate text-small text-[var(--color-text-secondary)]">
                  Next: {stages[index + 1].title}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const PHASES = ["Before bulk", "The full order"] as const;

/** A phase's label, centred on a bracket over its stages. */
function PhaseBracket({ label, strong = false, style }: { label: string; strong?: boolean; style: CSSProperties }) {
  return (
    <span
      className={cn(
        "absolute top-0 flex h-5 items-start justify-center rounded-t-md border-x border-t",
        strong ? "border-forge-600/60 text-forge-600" : "border-white/20 text-white/55",
      )}
      style={style}
    >
      <span className="-mt-2.5 bg-[var(--color-surface)] px-3">{label}</span>
    </span>
  );
}

/** Left and right insets that put the rail through the first and last stop's centre. */
function railInset(count: number) {
  return { left: `calc(100% / ${count} / 2)`, right: `calc(100% / ${count} / 2)` };
}

function StepButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous stage" : "Next stage"}
      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-white transition-colors hover:border-forge-600 hover:bg-forge-600 disabled:pointer-events-none disabled:opacity-30"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("size-4", direction === "prev" && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </button>
  );
}
