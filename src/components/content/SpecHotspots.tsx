"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * SpecHotspots — what can be specified on any line, shown on the product
 * itself: the glove opened out into its layers, with a pulsing numbered
 * point on the part each specification touches (the shell's colour, the
 * foam, the lining, the strap's branding, the label, the finished glove).
 * Choosing a point, on the photograph or in the list beside it, shows its
 * detail.
 *
 * The list is the real control — one open point at a time, each a button
 * that expands its detail — and the hotspots are pointer shortcuts to the
 * same buttons, hidden from assistive technology so nothing is announced
 * twice. Every point's words are in the HTML; closed details are `hidden`.
 */

export type SpecSpot = {
  title: string;
  description: string;
  icon: ReactNode;
  /** Where the point sits on the photograph, in percent. */
  at: { x: number; y: number };
};

export function SpecHotspots({ photo, spots, label }: { photo: { src: StaticImageData; alt: string }; spots: SpecSpot[]; label: string }) {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <div className="grid grid-cols-1 gap-[var(--space-6)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-center">
      {/* The glove, opened out, with its points. */}
      <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
        <div className="relative aspect-[5/4]">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
          {spots.map((spot, index) => {
            const selected = index === active;
            return (
              <button
                key={spot.title}
                type="button"
                aria-hidden="true"
                tabIndex={-1}
                onClick={() => setActive(index)}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${spot.at.x}%`, top: `${spot.at.y}%` }}
              >
                {/* The pulse. */}
                <span className={cn("absolute inset-0 rounded-full bg-forge-600/60 motion-safe:animate-ping", selected ? "opacity-100" : "opacity-40")} />
                <span
                  className={cn(
                    "relative flex size-9 items-center justify-center rounded-full font-display text-small font-bold tabular-nums ring-4 transition-[background-color,transform] duration-200 group-hover:scale-110",
                    selected ? "bg-forge-600 text-white ring-white" : "bg-ink-950 text-white ring-white/70",
                  )}
                >
                  {index + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* The chosen point, captioned on the photograph. */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl bg-ink-950/85 p-3 pr-[var(--space-5)] text-white backdrop-blur-md sm:inset-x-auto sm:left-4 sm:bottom-4 sm:max-w-sm">
          <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-forge-600 text-white">
            {spots[active].icon}
          </span>
          <p key={active} className="font-body text-body font-semibold leading-snug motion-safe:animate-[card-up_350ms_ease-out_both]">
            {spots[active].title}
          </p>
        </div>
      </div>

      {/* The list: the real control, one point open at a time. */}
      <div>
        <div role="group" aria-label={label} className="flex flex-col gap-1.5">
          {spots.map((spot, index) => {
            const selected = index === active;
            return (
              <div key={spot.title}>
                <button
                  type="button"
                  id={`${id}-tab-${index}`}
                  aria-expanded={selected}
                  aria-controls={`${id}-panel-${index}`}
                  onClick={() => setActive(index)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    selected ? "bg-white/[0.07]" : "hover:bg-white/[0.04]",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full font-display text-[0.75rem] font-bold tabular-nums transition-colors",
                      selected ? "bg-forge-600 text-white" : "bg-white/10 text-white/70",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className={cn("font-body text-body font-semibold", selected ? "text-white" : "text-white/70")}>{spot.title}</span>
                </button>
                <div
                  role="region"
                  id={`${id}-panel-${index}`}
                  aria-labelledby={`${id}-tab-${index}`}
                  hidden={!selected}
                  className="pb-2 pl-[3.25rem] pr-3 pt-1"
                >
                  <p className="text-small text-[var(--color-text-secondary)] motion-safe:animate-[card-up_350ms_ease-out_both]">{spot.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
