import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * ReorderFile — section 07's two halves. `ReferenceFile` is the approved
 * product kept on file: a record card with the product on the studio grey,
 * what was approved, and the orders that followed from it, with earlier
 * cards stacked behind like a folder. `ReorderNeeds` is when that record
 * earns its keep, one row per reason, each with an icon.
 *
 * The record is an illustration of the idea (no codes, dates, quantities or
 * prices: #5, #6), so it is hidden from screen readers; the words beside it
 * carry the meaning.
 */

export function ReferenceFile({
  photo,
  product,
  approved,
  orders,
}: {
  photo: StaticImageData;
  product: string;
  approved: string[];
  orders: string[];
}) {
  return (
    <div aria-hidden="true" className="relative pt-7">
      {/* Earlier cards in the file, tabs showing. */}
      <span className="absolute inset-x-8 top-0 h-24 rounded-2xl bg-[var(--color-surface)]/50 shadow-[0_1px_2px_rgb(0_0_0/0.04)]" />
      <span className="absolute inset-x-4 top-3.5 h-24 rounded-2xl bg-[var(--color-surface)]/80 shadow-[0_1px_2px_rgb(0_0_0/0.05)]" />

      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_24px_48px_-24px_rgb(0_0_0/0.3)]">
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* The product, on the studio grey. */}
          <div className="relative aspect-[4/3] bg-[radial-gradient(120%_100%_at_50%_70%,#d9dadc,#c3c5c8)] sm:aspect-auto">
            <Image
              src={photo}
              alt=""
              fill
              sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 100vw"
              className="object-contain p-[var(--space-4)] [mask-image:radial-gradient(closest-side,black_72%,transparent)]"
            />
            {/* The stamp. */}
            <span className="absolute left-[var(--space-4)] top-[var(--space-4)] -rotate-6 rounded-md border-2 border-forge-600 px-2 py-0.5 font-display text-small font-bold uppercase tracking-[0.12em] text-forge-600">
              Approved
            </span>
          </div>

          <div className="flex flex-col p-[var(--space-5)] sm:p-[var(--space-6)]">
            <p className="text-eyebrow uppercase tracking-[0.16em] text-[var(--color-text-muted)]">On file</p>
            <p className="mt-1.5 font-body text-body-large font-semibold leading-snug">{product}</p>

            <ul className="mt-[var(--space-4)] flex flex-col divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {approved.map((item) => (
                <li key={item} className="flex items-center justify-between gap-3 py-2.5 text-small">
                  <span className="text-[var(--color-text-secondary)]">{item}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-success-600">
                    <Tick className="size-3.5" />
                    Approved
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The orders that started from it, across the foot of the card. */}
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)]/60 px-[var(--space-5)] py-[var(--space-4)] sm:px-[var(--space-6)]">
          <p className="text-eyebrow uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Orders from this record</p>
          <ol className="mt-3 flex items-center">
            {orders.map((order, i) => {
              const next = i === orders.length - 1;
              return (
                <li key={order} className={cn("flex items-center", i > 0 && "flex-1")}>
                  {i > 0 ? (
                    <span
                      className={cn(
                        "mx-1 min-w-1.5 flex-1 sm:mx-2",
                        next ? "border-t-2 border-dashed border-forge-600/60" : "h-0.5 bg-ink-950",
                      )}
                    />
                  ) : null}
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[0.6875rem] font-semibold sm:gap-1.5 sm:px-3 sm:text-[0.75rem]",
                      next ? "border border-dashed border-forge-600 bg-[var(--color-surface)] text-forge-700" : "bg-ink-950 text-white",
                    )}
                  >
                    {next ? <span className="size-1.5 rounded-full bg-forge-600 motion-safe:animate-pulse" /> : <Tick className="hidden size-3 sm:block" />}
                    {order}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export type ReorderNeed = { text: string; icon: ReactNode };

export function ReorderNeeds({ intro, needs }: { intro: string; needs: ReorderNeed[] }) {
  return (
    <div>
      <p className="font-body text-body-large font-semibold">{intro}</p>
      <ul className="mt-[var(--space-4)] flex flex-col gap-2">
        {needs.map((need) => (
          <li
            key={need.text}
            className="group flex items-center gap-4 rounded-xl bg-[var(--color-surface)] p-3 pr-[var(--space-5)] shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-shadow hover:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_24px_-16px_rgb(0_0_0/0.3)]"
          >
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-bg)] text-forge-600 transition-colors group-hover:bg-forge-600 group-hover:text-white"
            >
              {need.icon}
            </span>
            <span className="text-body font-medium">{need.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}
