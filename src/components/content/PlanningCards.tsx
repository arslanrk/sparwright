import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * PlanningCards — the four things to plan in a club order, each a card whose
 * head is a picture of the point on the studio grey, drawn from the site's
 * own product shots: three gloves for three uses, one glove at two sizes,
 * a run of size tags, the product lines together.
 *
 * Illustrations of a brief's shape only: no quantities, prices or minimums
 * (#5, #6). The visuals repeat what each card says, so they are hidden from
 * screen readers; the words carry the meaning.
 */

export type PlanningCard = {
  title: string;
  description: string;
  visual: ReactNode;
};

export function PlanningCards({ cards }: { cards: PlanningCard[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <li
          key={card.title}
          className="flex flex-col overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_32px_-20px_rgb(0_0_0/0.25)]"
        >
          <div
            aria-hidden="true"
            className="relative h-52 overflow-hidden bg-[radial-gradient(120%_100%_at_50%_80%,#d9dadc,#c3c5c8)]"
          >
            {card.visual}
          </div>
          <div className="flex flex-1 flex-col p-[var(--space-5)]">
            <p className="font-display text-small font-bold tabular-nums text-forge-700">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1.5 font-body text-body-large font-semibold leading-snug">{card.title}</h3>
            <p className="mt-2 text-small text-[var(--color-text-secondary)]">{card.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* -- Visuals -------------------------------------------------------------- */

/** A studio shot, shown whole with its edges blended into the grey. */
function Shot({ src, className }: { src: StaticImageData; className?: string }) {
  return (
    <span className={cn("relative block", className)}>
      <Image
        src={src}
        alt=""
        fill
        sizes="200px"
        className="object-contain [mask-image:radial-gradient(closest-side,black_70%,transparent)]"
      />
    </span>
  );
}

function Tag({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.06em]",
        strong ? "bg-forge-600 text-white" : "bg-ink-950 text-white",
      )}
    >
      {children}
    </span>
  );
}

/** Three gloves, three uses, three weights. */
export function UsesVisual({ gloves }: { gloves: { src: StaticImageData; use: string; weight: string }[] }) {
  return (
    <div className="absolute inset-0 grid grid-cols-3 items-end px-2 pb-3">
      {gloves.map((glove) => (
        <div key={glove.use} className="flex flex-col items-center gap-1.5">
          <Shot src={glove.src} className="aspect-square w-full" />
          <Tag>{glove.weight}</Tag>
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-950/70">{glove.use}</span>
        </div>
      ))}
    </div>
  );
}

/** The same glove at junior and adult size. */
export function SizesVisual({ glove }: { glove: StaticImageData }) {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-3 pb-3">
      <div className="flex flex-col items-center gap-2">
        <Shot src={glove} className="size-24" />
        <Tag strong>Junior</Tag>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Shot src={glove} className="size-36" />
        <Tag>Adult</Tag>
      </div>
    </div>
  );
}

/** A run of hang tags, one per apparel size. */
export function SizeTagsVisual() {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* The rail the tags hang from. */}
      <span className="absolute inset-x-6 top-[38%] h-px bg-ink-950/30" />
      <div className="relative flex gap-1.5">
        {sizes.map((size, i) => (
          <span
            key={size}
            className={cn(
              "relative flex h-16 w-10 flex-col items-center justify-end rounded-md pb-2 font-display text-small font-bold shadow-[0_6px_14px_-8px_rgb(0_0_0/0.5)]",
              i === 2 ? "bg-forge-600 text-white" : "bg-white text-ink-950",
              i % 2 ? "rotate-2" : "-rotate-2",
            )}
          >
            <span className="absolute top-2 size-2 rounded-full border border-current opacity-50" />
            {size}
          </span>
        ))}
      </div>
    </div>
  );
}

/** The product lines together, under the form's "Multiple Products". */
export function ProductsVisual({ shots }: { shots: StaticImageData[] }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pb-2">
      <div className="grid grid-cols-2 gap-x-3">
        {shots.map((src, i) => (
          <Shot key={i} src={src} className="size-[5.25rem]" />
        ))}
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[0.75rem] font-semibold text-ink-950 shadow-[0_4px_12px_-6px_rgb(0_0_0/0.4)]">
        <span className="flex size-3.5 items-center justify-center rounded-full border border-forge-600">
          <span className="size-1.5 rounded-full bg-forge-600" />
        </span>
        Multiple Products
      </span>
    </div>
  );
}

/**
 * The form's quantity choices, inline, "Not sure" selected — for the strip
 * that says you can start without a number.
 */
export function QuantityChips({ choices }: { choices: readonly string[] }) {
  return (
    <div aria-hidden="true" className="flex flex-wrap gap-1.5">
      {choices.map((choice, i) => (
        <span
          key={choice}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-small",
            i === 0 ? "border-forge-600 bg-forge-600 font-semibold text-white" : "border-white/15 text-white/45",
          )}
        >
          {i === 0 ? (
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3.5 8.5 3 3 6-7" />
            </svg>
          ) : null}
          {choice}
        </span>
      ))}
    </div>
  );
}
