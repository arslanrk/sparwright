"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Fragment, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * KitFinder — "not sure which page fits? Start from your gym." Choose the
 * kind of gym or brand; its kit assembles as an equation: the product lines
 * it is usually built from, joined by pluses, equal to one quote. Each line
 * links to its page; the last tile opens a multi-product brief; the page
 * written for that buyer sits under the equation.
 *
 * Real ARIA tabs (one tab stop, arrow keys, Home and End). Every panel is
 * rendered on the server, so every link is in the HTML for search; inactive
 * panels are `hidden`. Nothing changes on its own (§07).
 */

export type KitLine = { name: string; label: string; href: string; shot: StaticImageData; scene?: boolean };

export type KitBuyer = {
  title: string;
  description: string;
  icon: ReactNode;
  lines: KitLine[];
  audience: { label: string; href: string };
};

export function KitFinder({
  buyers,
  label,
  quoteHref,
}: {
  buyers: KitBuyer[];
  label: string;
  /** Where the "= one quote" tile goes. */
  quoteHref: string;
}) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = buyers.length - 1;

  function focusTab(index: number) {
    const next = (index + buyers.length) % buyers.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="grid grid-cols-2 gap-2 lg:grid-cols-4"
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
        {buyers.map((buyer, index) => {
          const selected = index === active;
          return (
            <button
              key={buyer.title}
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
              className={cn(
                "group flex items-center gap-3 rounded-2xl border p-3 text-left transition-[background-color,border-color,box-shadow] duration-200 sm:p-[var(--space-4)]",
                selected
                  ? "border-transparent bg-ink-950 text-white shadow-[0_20px_36px_-22px_rgb(0_0_0/0.6)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-ink-950/25",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "hidden size-10 shrink-0 items-center justify-center rounded-xl transition-colors sm:flex",
                  selected ? "bg-forge-600 text-white" : "bg-[var(--color-bg)] text-forge-600",
                )}
              >
                {buyer.icon}
              </span>
              <span className="font-body text-small font-semibold leading-snug sm:text-body">{buyer.title}</span>
            </button>
          );
        })}
      </div>

      {buyers.map((buyer, index) => (
        <div
          key={buyer.title}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={index !== active}
          className="mt-3 rounded-3xl bg-[var(--color-surface)] p-[var(--space-5)] sm:p-[var(--space-6)]"
        >
          <p className="max-w-copy text-body text-[var(--color-text-secondary)]">{buyer.description}</p>

          {/* The kit, as an equation: line + line + line = one quote. */}
          <ol className="mt-[var(--space-5)] flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
            {buyer.lines.map((line, i) => (
              <Fragment key={line.href}>
                {i > 0 ? <Operator symbol="+" /> : null}
                <li className="md:flex-1">
                  <Link
                    href={line.href}
                    className="group flex h-full items-center gap-3 overflow-hidden rounded-2xl bg-[var(--color-bg)] p-2 pr-4 ring-1 ring-[var(--color-border)] transition-shadow hover:shadow-[0_18px_32px_-20px_rgb(0_0_0/0.4)] md:flex-col md:items-stretch md:p-0 md:pr-0 motion-safe:animate-[stage-in_450ms_ease-out_both]"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <span aria-hidden="true" className="relative block aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-[radial-gradient(120%_100%_at_50%_75%,#d9dadc,#b9bbbf)] md:aspect-[4/3] md:w-full md:rounded-none">
                      <Image
                        src={line.shot}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 220px, 80px"
                        className={cn(
                          "transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.05]",
                          line.scene ? "object-cover" : "object-contain p-2 [mask-image:radial-gradient(closest-side,black_72%,transparent)]",
                        )}
                      />
                    </span>
                    <span className="flex flex-1 items-center justify-between gap-2 md:px-4 md:py-3">
                      <span className="font-body text-body font-semibold leading-snug">{line.label}</span>
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0 text-forge-600 transition-transform motion-safe:group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                      </svg>
                    </span>
                  </Link>
                </li>
              </Fragment>
            ))}
            <Operator symbol="=" />
            <li className="md:w-44 md:shrink-0">
              <Link
                href={quoteHref}
                className="group flex h-full flex-row items-center justify-between gap-3 rounded-2xl bg-ink-950 p-4 text-white transition-colors hover:bg-forge-600 md:flex-col md:items-start md:justify-center"
              >
                <span>
                  <span className="block text-eyebrow uppercase tracking-[0.16em] text-white/55 group-hover:text-white/80">One brief</span>
                  <span className="mt-1 block font-display text-heading-4 font-bold">One quote</span>
                </span>
                <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                  </svg>
                </span>
              </Link>
            </li>
          </ol>

          <p className="mt-[var(--space-5)] flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[var(--color-border)] pt-[var(--space-4)] text-small text-[var(--color-text-secondary)]">
            Written for {buyer.title.toLowerCase()}:
            <Link
              href={buyer.audience.href}
              className="group inline-flex items-center gap-1.5 font-semibold text-forge-700 underline-offset-4 hover:underline"
            >
              {buyer.audience.label}
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 transition-transform motion-safe:group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
              </svg>
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
}

/** The plus between lines, and the equals before the quote. */
function Operator({ symbol }: { symbol: "+" | "=" }) {
  return (
    <li aria-hidden="true" className="flex items-center justify-center md:w-10 md:shrink-0">
      <span className="flex size-7 items-center justify-center rounded-full bg-forge-600 font-display text-body font-bold leading-none text-white">
        {symbol}
      </span>
    </li>
  );
}
