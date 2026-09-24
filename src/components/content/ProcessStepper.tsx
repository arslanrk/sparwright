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
 * Composed as a route: numbered stations on a track, each with a card beneath
 * it. On a phone the track turns and runs down the left, so the same idea reads
 * as a timeline rather than collapsing into five unrelated blocks.
 *
 * Each stage carries its own accent, stepping from Forge at the brief to
 * Success at delivery, and the track is a gradient between them — so the route
 * reads as moving from start to done, not as five identical stamps.
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
  /** Section number on its page, shown in the eyebrow. */
  index?: string;
  title: string;
  description?: string;
  stages: ProcessStage[];
};

export function ProcessStepper({
  id,
  theme = "light",
  eyebrow,
  index,
  title,
  description,
  stages,
}: ProcessStepperProps) {
  return (
    <Section id={id} theme={theme} width="work">
      <SectionHeader
        eyebrow={eyebrow}
        index={index}
        title={title}
        description={description}
      />

      <ol className="relative mt-[var(--space-8)] grid gap-y-[var(--space-5)] lg:grid-cols-5 lg:gap-x-[var(--space-4)]">
        {/*
          The route. Vertical down the stations below `lg`, horizontal across
          their centres from `lg` — the same line, turned. Inset so it starts
          and ends under the first and last station rather than trailing off.
        */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute rounded-full from-forge-600 via-amber-500 to-success-600",
            "left-[1.1875rem] top-5 bottom-5 w-0.5 bg-linear-to-b",
            "lg:left-[10%] lg:right-[10%] lg:top-[1.1875rem] lg:bottom-auto lg:h-0.5 lg:w-auto lg:bg-linear-to-r",
          )}
        />

        {stages.map((stage, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <li
              key={stage.number}
              className="relative flex gap-[var(--space-4)] lg:flex-col lg:items-center lg:gap-[var(--space-5)]"
            >
              {/* The station: the stage number, stamped in its accent. */}
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full font-display text-small font-bold tabular-nums text-white",
                  "ring-4 ring-[var(--color-bg)] shadow-sm",
                  accent.node,
                )}
              >
                {stage.number}
              </span>

              <div
                className={cn(
                  "group relative min-w-0 flex-1 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)] lg:w-full",
                  "transition-[transform,box-shadow] duration-200 ease-standard motion-safe:hover:-translate-y-1 hover:shadow-lg",
                )}
              >
                {/* Accent rule along the top edge of the card. */}
                <span
                  aria-hidden="true"
                  className={cn("absolute inset-x-0 top-0 h-1", accent.node)}
                />

                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-12 items-center justify-center rounded-lg transition-transform duration-200 motion-safe:group-hover:scale-110",
                    accent.tile,
                  )}
                >
                  {STATION_ICONS[i] ?? <IconSpec />}
                </span>

                <p
                  className={cn(
                    "mt-[var(--space-4)] font-display text-eyebrow uppercase tracking-[0.12em]",
                    accent.label,
                  )}
                >
                  Stage {stage.number}
                </p>
                <h3 className="mt-1 font-body text-body-large leading-snug font-semibold">
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
 * One accent per stage, from Forge at the brief to Success at delivery. The
 * middle three step through orange, amber and teal so neighbours never clash
 * and the gradient track passes through each in turn.
 */
const ACCENTS = [
  { node: "bg-forge-600", tile: "bg-forge-100 text-forge-700", label: "text-forge-700" },
  { node: "bg-orange-500", tile: "bg-orange-100 text-orange-700", label: "text-orange-700" },
  { node: "bg-amber-500", tile: "bg-amber-100 text-amber-700", label: "text-amber-700" },
  { node: "bg-teal-600", tile: "bg-teal-100 text-teal-700", label: "text-teal-700" },
  { node: "bg-success-600", tile: "bg-emerald-100 text-success-600", label: "text-success-600" },
];

/* -------------------------------------------------------------------------
   §09 iconography: one line family, ~1.75px stroke, drawn in currentColor so
   each tile's accent colours its icon.

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
