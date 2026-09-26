import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/content/BrandMark";

/**
 * RangeBranches — one approved reference, and what grows from it. A record
 * card on the left (the approved product, what was approved); lines branch
 * from it to each thing a brand does next: reorder, add a variant, launch a
 * line, keep the range consistent. On small screens the branches stack under
 * the card.
 *
 * The record is an illustration (no codes, dates or quantities: #5, #6), so
 * it is hidden from screen readers; the branch list carries the meaning.
 */

export type Branch = { text: string; icon: ReactNode };

export function RangeBranches({
  photo,
  approved,
  intro,
  branches,
}: {
  photo: StaticImageData;
  approved: string[];
  intro: string;
  branches: Branch[];
}) {
  return (
    <div className="grid grid-cols-1 items-end gap-[var(--space-6)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-0">
      {/* The approved reference. */}
      <div
        aria-hidden="true"
        className="relative mx-auto w-full max-w-md lg:mr-0"
      >
        <span className="absolute inset-x-4 -top-3 h-12 rounded-2xl bg-[var(--color-surface)]/70" />
        <div className="relative overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_24px_48px_-24px_rgb(0_0_0/0.3)]">
          <div className="relative aspect-[5/3] bg-[radial-gradient(120%_100%_at_50%_75%,#d9dadc,#c3c5c8)]">
            <Image
              src={photo}
              alt=""
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-contain p-3 [mask-image:radial-gradient(closest-side,black_75%,transparent)]"
            />
            <span className="absolute left-4 top-4 -rotate-6 rounded-md border-2 border-forge-600 px-2 py-0.5 font-display text-small font-bold uppercase tracking-[0.12em] text-forge-600">
              Approved
            </span>
          </div>
          <div className="p-[var(--space-5)]">
            <div className="flex items-center justify-between gap-3">
              <BrandMark className="w-32 text-ink-950" />
              <span className="text-eyebrow uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                Reference
              </span>
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-[var(--color-border)] pt-3">
              {approved.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 text-small text-[var(--color-text-secondary)]"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3.5 shrink-0 text-success-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <p className="font-body text-body-large font-semibold lg:pl-20">{intro}</p>
        <div className="relative mt-[var(--space-4)] lg:pl-20">
          {/* The branches, fanning from the record to each row's centre. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 80 400"
            preserveAspectRatio="none"
            className="absolute inset-y-0 left-0 hidden h-full w-20 lg:block"
            fill="none"
          >
            {branches.map((_, i) => {
              const y = ((i + 0.5) / branches.length) * 400;
              return (
                <path
                  key={i}
                  d={`M0 200 C 40 200, 40 ${y}, 80 ${y}`}
                  stroke="#D83A20"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>
          <ul className="flex flex-col gap-2">
            {branches.map((branch) => (
              <li
                key={branch.text}
                className="group flex items-center gap-4 rounded-xl bg-[var(--color-surface)] p-3 pr-[var(--space-5)] shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-shadow hover:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_24px_-16px_rgb(0_0_0/0.3)]"
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-bg)] text-forge-600 transition-colors group-hover:bg-forge-600 group-hover:text-white"
                >
                  {branch.icon}
                </span>
                <span className="text-body font-medium">{branch.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
