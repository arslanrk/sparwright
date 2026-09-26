import { cn } from "@/lib/cn";

/**
 * SampleLoop — the five stages from brief to approval, with the part that
 * makes private label safe drawn as what it is: a loop. Sample and revisions
 * sit inside a bracket with a return arrow, "where required", and approval
 * sits past a gate after it. A row of five on wide screens; a column below.
 */

export type LoopStage = { title: string; description: string };

export function SampleLoop({
  stages,
  loop,
  loopLabel,
}: {
  stages: LoopStage[];
  /** Indexes of the two stages the loop runs between (sample, revisions). */
  loop: [number, number];
  loopLabel: string;
}) {
  const last = stages.length - 1;
  return (
    <div className="relative">
      <ol className="relative grid grid-cols-1 gap-3 lg:grid-cols-5">
        {stages.map((stage, i) => {
          const inLoop = i >= loop[0] && i <= loop[1];
          const approval = i === last;
          return (
            <li
              key={stage.title}
              className={cn(
                "relative flex flex-col rounded-2xl border p-[var(--space-5)]",
                approval
                  ? "border-success-600/50 bg-success-600/10"
                  : inLoop
                    ? "border-forge-600/40 bg-forge-600/[0.07]"
                    : "border-[var(--color-border)] bg-white/[0.03]",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-10 items-center justify-center rounded-full font-display text-small font-bold tabular-nums text-white",
                  approval ? "bg-success-600" : inLoop ? "bg-forge-600" : "bg-white/10",
                )}
              >
                {approval ? (
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              <h3 className="mt-[var(--space-4)] font-body text-body-large font-semibold">{stage.title}</h3>
              <p className="mt-1.5 text-small text-[var(--color-text-secondary)]">{stage.description}</p>

              {/* Arrow on to the next stage (wide screens). */}
              {i < last ? (
                <span aria-hidden="true" className="absolute -right-3 top-9 z-10 hidden size-6 items-center justify-center rounded-full bg-[var(--color-bg)] text-white/60 ring-1 ring-white/15 lg:flex">
                  <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                  </svg>
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      {/* The loop: a bracket under sample and revisions, arrowing back. */}
      <div
        aria-hidden="true"
        className="relative mt-3 hidden h-14 lg:block"
        style={{
          marginLeft: `calc((100% - 3rem) / 5 * ${loop[0]} + 0.75rem * ${loop[0]})`,
          width: `calc((100% - 3rem) / 5 * ${loop[1] - loop[0] + 1} + 0.75rem * ${loop[1] - loop[0]})`,
        }}
      >
        <svg viewBox="0 0 400 56" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none">
          <path d="M340 2 V 26 Q 340 46 320 46 H 80 Q 60 46 60 26 V 8" stroke="#D83A20" strokeWidth="1.75" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />
          <path d="M52 14 L 60 4 L 68 14" stroke="#D83A20" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--color-bg)] px-3 text-eyebrow uppercase tracking-[0.16em] text-forge-600">
          {loopLabel}
        </span>
      </div>
      <p aria-hidden="true" className="mt-3 flex items-center gap-2 text-eyebrow uppercase tracking-[0.16em] text-forge-600 lg:hidden">
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 8a5 5 0 1 1-1.5-3.5M13 2.5v3h-3" />
        </svg>
        Stages {loop[0] + 1}–{loop[1] + 1}: {loopLabel}
      </p>
    </div>
  );
}
