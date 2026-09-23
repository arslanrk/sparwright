import type { ReactNode } from "react";
import {
  Section,
  type SectionTheme,
} from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { cn } from "@/lib/cn";

/**
 * ProcessStepper — Design System §08 Process stepper, §09 iconography.
 *
 * Five stages, each stated as the outcome for the buyer rather than as our
 * internal workflow (§10 Direct, Specific). The stage number is one of the two
 * places §04 permits Forge outside an action.
 *
 * Composed as a route card — the traveller that follows a job through a shop,
 * stamped at each station. The badges are the stations and the dashed rule
 * between them is the route; on a phone that rule turns and runs down the left,
 * so the same idea reads as a timeline rather than collapsing into five
 * unrelated blocks.
 *
 * The icons are a single colour, not Forge. §09 allows Forge "only for active
 * or emphasized states", and nothing here is active — these five describe a
 * process rather than track progress through one. Forge stays on the numerals,
 * where §04 already permits it.
 *
 * `id` matters: the header's "How It Works" item links to this section.
 *
 * `theme` is a prop rather than a constant because the homepage alternates
 * surfaces and this section has to take whichever one its position calls for.
 * It was hardcoded to "light", which meant that moving the section under the
 * range — also light — merged the two into one unbroken band with no way to
 * fix it from the page.
 */

export type ProcessStage = {
  /** 01–05. */
  number: string;
  title: string;
  outcome: string;
};

type ProcessStepperProps = {
  id?: string;
  /** Defaults to the light surface; pass "white" where the run calls for it. */
  theme?: SectionTheme;
  eyebrow?: string;
  title: string;
  description?: string;
  stages: ProcessStage[];
};

export function ProcessStepper({
  id,
  theme = "light",
  eyebrow,
  title,
  description,
  stages,
}: ProcessStepperProps) {
  return (
    <Section id={id} theme={theme} width="work">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <ol className="mt-[var(--space-8)] grid gap-x-[var(--space-4)] gap-y-[var(--space-6)] sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
        {stages.map((stage, i) => {
          const last = i === stages.length - 1;
          return (
            <li key={stage.number} className="relative flex gap-[var(--space-5)] lg:block">
              {/*
                The route. Horizontal between stations from `lg`, and a vertical
                rule down the left below it — the same line, turned. It stops at
                the last station rather than trailing into nothing.
              */}
              {!last && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute border-dashed border-[var(--color-border-strong)]",
                    // Vertical: from under the badge to the next item.
                    "left-7 top-14 h-[calc(100%+var(--space-6)-3.5rem)] border-l",
                    // Horizontal: from the badge's right edge across the gap.
                    "lg:left-14 lg:top-7 lg:h-0 lg:w-[calc(100%-3.5rem)] lg:border-l-0 lg:border-t",
                  )}
                />
              )}

              <StationBadge>{STATION_ICONS[i] ?? <IconSpec />}</StationBadge>

              <div className="min-w-0 flex-1 lg:mt-[var(--space-5)]">
                <p className="font-display text-eyebrow tabular-nums tracking-[0.12em] text-[var(--color-action-text)]">
                  {stage.number}
                </p>
                <h3 className="mt-1.5 font-body text-body-large font-semibold">
                  {stage.title}
                </h3>
                <p className="mt-2 max-w-copy text-small text-[var(--color-text-secondary)]">
                  {stage.outcome}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

/**
 * A station on the route. The ring is solid and the surface is the section's
 * own, so the badge reads as a stamp on the sheet rather than a button.
 */
function StationBadge({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------
   §09 iconography: one line family, ~1.75px stroke, single colour.

   Indexed to the §08 stages in order — specification, concept, sample,
   production and QC, packing. Held here rather than on `ProcessStage` so the
   §08 content stays content; the fallback covers a stage list that outgrows
   the set.
------------------------------------------------------------------------- */

const ICON = {
  "aria-hidden": true as const,
  viewBox: "0 0 24 24",
  className: "size-6",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** 01 — Share requirements: a specification sheet. */
function IconSpec() {
  return (
    <svg {...ICON}>
      <path d="M14.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5Z" />
      <path d="M14.5 3v4.5H19M8.5 12h7M8.5 16h4.5" />
    </svg>
  );
}

/** 02 — Review the concept: colour swatches laid over one another. */
function IconConcept() {
  return (
    <svg {...ICON}>
      <rect x="3" y="3" width="11" height="11" rx="1.5" />
      <path d="M17 7h3a1 1 0 0 1 1 1v3M21 14v6a1 1 0 0 1-1 1h-6M10 21H8a1 1 0 0 1-1-1v-2" />
    </svg>
  );
}

/** 03 — Approve the sample: a sample tag, signed off. */
function IconSample() {
  return (
    <svg {...ICON}>
      <path d="M20.5 13.5 13 21a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 2.6 12l.4-7a2 2 0 0 1 2-1.9l7-.4a2 2 0 0 1 1.5.6l7 7a2 2 0 0 1 0 2.8Z" />
      <path d="M7.5 7.5h.01" />
      <path d="m10 13 2 2 4-4" />
    </svg>
  );
}

/** 04 — Production and QC: a bulk run checked against the sample. */
function IconInspect() {
  return (
    <svg {...ICON}>
      <path d="M3 8.5 12 4l9 4.5-9 4.5Z" />
      <path d="M3 8.5V16l6 3" />
      <circle cx="16.5" cy="16.5" r="3.5" />
      <path d="m19.2 19.2 1.8 1.8" />
    </svg>
  );
}

/** 05 — Packing and delivery: an export carton, taped and marked. */
function IconPack() {
  return (
    <svg {...ICON}>
      <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5Z" />
      <path d="M3 7.5 12 12l9-4.5M12 12v9" />
      <path d="M7.5 5.25 16.5 9.75" />
    </svg>
  );
}

const STATION_ICONS = [
  <IconSpec key="spec" />,
  <IconConcept key="concept" />,
  <IconSample key="sample" />,
  <IconInspect key="inspect" />,
  <IconPack key="pack" />,
];
