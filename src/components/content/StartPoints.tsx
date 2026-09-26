import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

/**
 * StartPoints — the three ways a product starts, converging on the one thing
 * they all produce: a written specification for your approval. Three
 * starting cards on the left, lines running into a specification sheet on
 * the right (below them on small screens).
 *
 * The sheet is an illustration of the document's shape — field names only,
 * no values that could read as a promise — so it is hidden from screen
 * readers; the section copy says the same in words.
 */

export type StartPoint = { title: string; description: string; visual: ReactNode };

export function StartPoints({
  points,
  sheetTitle,
  sheetFields,
}: {
  points: StartPoint[];
  sheetTitle: string;
  sheetFields: string[];
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-[var(--space-6)] lg:grid-cols-[minmax(0,1.15fr)_auto_minmax(0,0.85fr)] lg:gap-0">
      <ol className="flex flex-col gap-3">
        {points.map((point, i) => (
          <li
            key={point.title}
            className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-[var(--space-4)] rounded-2xl bg-[var(--color-surface)] p-3 pr-[var(--space-5)] shadow-[0_1px_2px_rgb(0_0_0/0.04)] sm:grid-cols-[7rem_minmax(0,1fr)]"
          >
            <div aria-hidden="true" className="relative aspect-square overflow-hidden rounded-xl bg-[radial-gradient(120%_100%_at_50%_80%,#d9dadc,#c3c5c8)]">
              {point.visual}
            </div>
            <div>
              <p className="font-display text-small font-bold tabular-nums text-forge-700">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-0.5 font-body text-body-large font-semibold leading-snug">{point.title}</h3>
              <p className="mt-1.5 text-small text-[var(--color-text-secondary)]">{point.description}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Three lines converging on the sheet. */}
      <svg aria-hidden="true" viewBox="0 0 80 300" className="hidden h-full w-20 self-stretch lg:block" preserveAspectRatio="none" fill="none">
        {[50, 150, 250].map((y) => (
          <path key={y} d={`M0 ${y} C 45 ${y}, 35 150, 80 150`} stroke="#D83A20" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <span aria-hidden="true" className="mx-auto h-8 w-px border-l border-dashed border-forge-600/60 lg:hidden" />

      {/* The one result. */}
      <div aria-hidden="true" className="relative mx-auto w-full max-w-sm lg:mx-0">
        <span className="absolute inset-0 translate-x-2 translate-y-2 rotate-2 rounded-2xl bg-[var(--color-surface)]/60" />
        <div className="relative rounded-2xl bg-[var(--color-surface)] p-[var(--space-5)] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_24px_48px_-24px_rgb(0_0_0/0.35)]">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
            <p className="text-eyebrow uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Specification</p>
            <span className="rounded-full border border-dashed border-forge-600/60 px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-forge-700">
              For approval
            </span>
          </div>
          <p className="mt-3 font-body text-body-large font-semibold">{sheetTitle}</p>
          <ul className="mt-3 flex flex-col gap-2">
            {sheetFields.map((field, i) => (
              <li key={field} className="flex items-center gap-3 text-small">
                <span className="w-24 shrink-0 text-[var(--color-text-secondary)]">{field}</span>
                {/* Lines of a document, not values. */}
                <span className="h-1.5 flex-1 rounded-full bg-ink-950/10" style={{ maxWidth: `${60 + ((i * 17) % 35)}%` }} />
              </li>
            ))}
          </ul>
          <div className="mt-[var(--space-4)] flex items-center gap-2 border-t border-[var(--color-border)] pt-3 text-small font-semibold">
            <span className="flex size-5 items-center justify-center rounded-full border-2 border-dashed border-forge-600/60" />
            Your approval
          </div>
        </div>
      </div>
    </div>
  );
}

/* -- Starting-point visuals ---------------------------------------------- */

/** A reference product: the shot with a measuring line across it. */
export function ReferenceVisual({ src }: { src: StaticImageData }) {
  return (
    <>
      <Image src={src} alt="" fill sizes="112px" className="object-contain p-2 [mask-image:radial-gradient(closest-side,black_72%,transparent)]" />
      <span className="absolute inset-x-3 bottom-3 flex items-center">
        <span className="h-2 w-px bg-ink-950/60" />
        <span className="h-px flex-1 bg-ink-950/60" />
        <span className="h-2 w-px bg-ink-950/60" />
      </span>
    </>
  );
}

/** A sketch: a glove drawn in line on paper. */
export function SketchVisual() {
  return (
    <span className="absolute inset-2 flex items-center justify-center rounded-lg bg-white [background-image:linear-gradient(rgb(0_0_0/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(0_0_0/0.04)_1px,transparent_1px)] [background-size:10px_10px]">
      <svg viewBox="0 0 64 64" className="h-[78%] text-ink-950/75" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 44V24c0-9 6-15 14-15s13 6 13 14v9c0 4-2 7-5 8" />
        <path d="M22 30c-4 0-7 3-7 7s3 7 7 7" />
        <path d="M20 44h24v11H20z" />
        <path d="M30 18c3-2 8-2 11 1" stroke="#D83A20" />
        <path d="M24 49h16" strokeDasharray="2 2" />
      </svg>
    </span>
  );
}

/** A tech pack: a document with a flat drawing and spec lines. */
export function TechPackVisual() {
  return (
    <span className="absolute inset-3 flex flex-col gap-1.5 rounded-md bg-white p-2 shadow-[0_6px_14px_-8px_rgb(0_0_0/0.5)]">
      <span className="flex items-center justify-between">
        <span className="h-1.5 w-8 rounded-full bg-ink-950/70" />
        <span className="h-1.5 w-4 rounded-full bg-forge-600" />
      </span>
      <span className="flex flex-1 gap-1.5">
        <span className="flex-1 rounded-sm border border-ink-950/20 [background-image:linear-gradient(135deg,transparent_45%,rgb(0_0_0/0.15)_45%,rgb(0_0_0/0.15)_55%,transparent_55%)]" />
        <span className="flex w-[40%] flex-col gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-1 rounded-full bg-ink-950/20" />
          ))}
        </span>
      </span>
      <span className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 rounded-sm bg-ink-950/10" />
        ))}
      </span>
    </span>
  );
}
