import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * BriefBoard — section 05's two halves. `BriefSheet` is a club brief as it
 * might arrive: each thing worth sending, filled in with an example answer,
 * and two left open — because "undecided" is a fine answer. `ReviewRoute` is
 * what happens next: one person reads it, and the brief goes one of three
 * ways.
 *
 * The example answers illustrate the shape of a brief only (no quantities,
 * prices or minimums: #5, #6), so they are hidden from screen readers; the
 * field names carry the meaning.
 */

export type BriefField = {
  label: string;
  /** The example answer. Omit to show the field left open. */
  value?: ReactNode;
};

export function BriefSheet({
  title,
  fields,
  footnote,
}: {
  title: string;
  fields: BriefField[];
  footnote: ReactNode;
}) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_24px_48px_-28px_rgb(0_0_0/0.3)]">
      {/* The sheet's head: a title and a draft stamp. */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] px-[var(--space-5)] py-[var(--space-4)] sm:px-[var(--space-6)]">
        <h3 className="font-body text-body-large font-semibold">{title}</h3>
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-dashed border-forge-600/60 px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-forge-700"
        >
          <span className="size-1.5 rounded-full bg-forge-600 motion-safe:animate-pulse" />
          Draft brief
        </span>
      </div>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
        {fields.map((field, i) => (
          <li
            key={field.label}
            className="flex flex-col gap-2.5 border-b border-[var(--color-border)] px-[var(--space-5)] py-[var(--space-4)] sm:px-[var(--space-6)] sm:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(4n)]:border-r-0"
          >
            <p className="flex items-baseline gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
              <span className="font-display tabular-nums text-forge-700">{String(i + 1).padStart(2, "0")}</span>
              {field.label}
            </p>
            <div aria-hidden="true" className="flex min-h-9 flex-wrap items-center gap-1.5">
              {field.value ?? <OpenAnswer />}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-start gap-3 px-[var(--space-5)] py-[var(--space-5)] sm:px-[var(--space-6)]">
        <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-forge-600 font-display text-small font-bold text-white">
          ?
        </span>
        <p className="text-small text-[var(--color-text-secondary)]">{footnote}</p>
      </div>
    </div>
  );
}

/** A field left open on purpose. */
function OpenAnswer() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-ink-950/25 px-2.5 py-1 text-small italic text-[var(--color-text-secondary)]">
      Not decided yet
    </span>
  );
}

/* -- Example answers ------------------------------------------------------ */

export function Answer({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-small font-semibold",
        strong ? "bg-ink-950 text-white" : "bg-white text-ink-950 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]",
      )}
    >
      {children}
    </span>
  );
}

export function Swatches({ colours }: { colours: string[] }) {
  return (
    <span className="flex -space-x-1.5">
      {colours.map((colour) => (
        <span
          key={colour}
          className="size-7 rounded-full shadow-[0_0_0_2px_var(--color-surface),inset_0_0_0_1px_rgb(0_0_0/0.12)]"
          style={{ background: colour }}
        />
      ))}
    </span>
  );
}

export function Thumbs({ shots }: { shots: StaticImageData[] }) {
  return (
    <span className="flex gap-1.5">
      {shots.map((src, i) => (
        <span key={i} className="relative size-11 overflow-hidden rounded-md bg-[#c8c9cb] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]">
          <Image src={src} alt="" fill sizes="44px" className="object-cover" />
        </span>
      ))}
    </span>
  );
}

/** A logo file, as an attachment. */
export function LogoFile({ mark, name }: { mark: ReactNode; name: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md bg-white py-1 pl-1 pr-2.5 text-small font-semibold text-ink-950 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]">
      <span className="flex size-7 items-center justify-center rounded bg-ink-950 p-1 text-white">{mark}</span>
      {name}
    </span>
  );
}

/* -- The route ------------------------------------------------------------ */

export type RouteStep = { title: string; description: string; icon: ReactNode };

export function ReviewRoute({
  title,
  intro,
  steps,
  action,
}: {
  title: string;
  intro: string;
  steps: RouteStep[];
  action: ReactNode;
}) {
  return (
    <div
      data-theme="dark"
      className="relative grid gap-[var(--space-7)] overflow-hidden rounded-2xl bg-[var(--color-bg)] p-[var(--space-6)] text-[var(--color-text)] sm:p-[var(--space-7)] lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-x-[var(--space-9)] lg:gap-y-[var(--space-6)]"
    >
      {/* A warm glow where the brief arrives. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-forge-600/20 blur-3xl"
      />

      <div className="relative lg:self-end">
        <h3 className="text-heading-3">{title}</h3>
        <p className="mt-[var(--space-3)] text-body text-[var(--color-text-secondary)]">{intro}</p>
      </div>

      {/* After the steps on small screens; under the heading on large ones. */}
      <div className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
        {/* The reviewer: where every brief goes first. */}
        <div aria-hidden="true" className="flex items-center gap-3 lg:flex-col lg:gap-2">
          <span className="flex size-11 items-center justify-center rounded-full bg-forge-600 text-white ring-4 ring-forge-600/25">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4.5 20.5c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
            </svg>
          </span>
          <span className="text-small font-semibold uppercase tracking-[0.08em] text-white/70">Reviewed by a person</span>
          <span className="hidden h-4 w-px bg-white/20 lg:block" />
        </div>

        {/*
          Three ways out, branching from the reviewer: down the left edge on
          small screens; across and down into three columns on large ones.
        */}
        <ul className="relative mt-3 flex flex-col gap-2.5 pl-[1.3125rem] lg:mt-0 lg:grid lg:grid-cols-3 lg:gap-3 lg:pl-0 lg:pt-6 lg:before:absolute lg:before:inset-x-[calc((100%-1.5rem)/6)] lg:before:top-0 lg:before:h-px lg:before:bg-white/20">
          {steps.map((step, i) => (
            <li key={step.title} className="relative pl-7 lg:pl-0">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-0 w-px bg-white/20 lg:hidden",
                  i === steps.length - 1 ? "h-[calc(50%+1px)]" : "-bottom-2.5",
                )}
              />
              <span aria-hidden="true" className="absolute left-0 top-1/2 h-px w-7 bg-white/20 lg:hidden" />
              <span aria-hidden="true" className="absolute -top-6 left-1/2 hidden h-6 w-px bg-white/20 lg:block" />
              <div className="flex h-full items-center gap-4 rounded-xl border border-[var(--color-border)] bg-white/[0.03] p-[var(--space-4)] transition-colors hover:border-forge-600/60 hover:bg-white/[0.06] lg:flex-col lg:items-start lg:gap-3 lg:p-[var(--space-5)]">
                <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.07] text-forge-600">
                  {step.icon}
                </span>
                <div>
                  <p className="font-body text-body font-semibold">{step.title}</p>
                  <p className="mt-0.5 text-small text-[var(--color-text-secondary)]">{step.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative lg:col-start-1 lg:self-start">{action}</div>
    </div>
  );
}
