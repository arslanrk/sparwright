import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/content/BrandMark";
import { cn } from "@/lib/cn";

/**
 * BrandBento — where a private-label brand appears, as a bento of tiles on a
 * dark band: the product itself, the labels, the care label, the colour and
 * the packaging. Each tile pairs its words with a visual of that thing
 * carrying "your brand" (the placeholder mark, never a real one). The
 * visuals repeat the words, so they are hidden from screen readers.
 */

export type BentoTile = {
  title: string;
  description: string;
  visual: ReactNode;
  /** Grid placement from `lg`; tiles stack below it. */
  className?: string;
};

export function BrandBento({ tiles }: { tiles: BentoTile[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12">
      {tiles.map((tile) => (
        <li
          key={tile.title}
          className={cn(
            "flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]",
            tile.className,
          )}
        >
          <div aria-hidden="true" className="relative min-h-44 flex-1 overflow-hidden">
            {tile.visual}
          </div>
          <div className="border-t border-[var(--color-border)] p-[var(--space-5)]">
            <h3 className="font-body text-body-large font-semibold">{tile.title}</h3>
            <p className="mt-1.5 text-small text-[var(--color-text-secondary)]">{tile.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* -- Visuals -------------------------------------------------------------- */

/** The product, the brand on its wrist panels, and the methods beside it. */
export function ApplicationVisual({
  src,
  marks,
  methods,
}: {
  src: StaticImageData;
  marks: { x: number; y: number; w: number; h: number }[];
  methods: string[];
}) {
  return (
    <div className="absolute inset-0 grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] bg-[radial-gradient(120%_100%_at_35%_75%,#d9dadc,#b9bbbf)]">
      <div className="relative">
        <div className="absolute inset-0 m-auto aspect-square max-h-full max-w-full [mask-image:radial-gradient(closest-side,black_82%,transparent)]">
          <Image src={src} alt="" fill sizes="(min-width: 1024px) 380px, 60vw" className="object-contain" />
          {marks.map((m, i) => (
            <span
              key={i}
              className="absolute flex items-center justify-center"
              style={{ left: `${m.x - m.w / 2}%`, top: `${m.y - m.h / 2}%`, width: `${m.w}%`, height: `${m.h}%` }}
            >
              <BrandMark className="w-[80%] text-[#E8E8E8]" />
            </span>
          ))}
        </div>
      </div>
      <ul className="flex flex-col justify-center gap-1.5 py-4 pr-4">
        {methods.map((method, i) => (
          <li
            key={method}
            className={cn(
              "w-fit whitespace-nowrap rounded-full px-2.5 py-1 text-[0.75rem] font-semibold sm:px-3 sm:text-small",
              i === 0 ? "bg-forge-600 text-white" : "bg-white/85 text-ink-950",
            )}
          >
            {method}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A woven brand label, and size labels fanned beneath it. */
export function LabelsVisual({ sizes }: { sizes: string[] }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(90%_80%_at_50%_40%,rgb(255_255_255/0.06),transparent)] p-6">
      <Woven className="w-56 -rotate-2">
        <BrandMark className="w-full text-white" />
      </Woven>
      <div className="flex gap-2">
        {sizes.map((size, i) => (
          <Woven key={size} className={cn("w-12", i % 2 ? "rotate-3" : "-rotate-2")}>
            <span className="block text-center font-display text-body font-bold">{size}</span>
          </Woven>
        ))}
      </div>
    </div>
  );
}

function Woven({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "relative block rounded-sm bg-ink-950 px-3 py-2 text-white shadow-[0_14px_28px_-12px_rgb(0_0_0/0.9)] ring-1 ring-white/10 [background-image:repeating-linear-gradient(90deg,rgb(255_255_255/0.05)_0_1px,transparent_1px_3px)]",
        className,
      )}
    >
      <span className="absolute inset-y-1 left-1 border-l border-dashed border-white/35" />
      <span className="absolute inset-y-1 right-1 border-l border-dashed border-white/35" />
      {children}
    </span>
  );
}

/** A satin care label: brand, composition lines and care symbols. */
export function CareVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="w-40 rotate-3 rounded-b-md bg-bone-50 px-4 pb-4 pt-5 text-ink-950 shadow-[0_18px_32px_-14px_rgb(0_0_0/0.9)]">
        <span className="block border-b border-dashed border-ink-950/25 pb-2">
          <BrandMark className="w-full text-ink-950" />
        </span>
        <span className="mt-3 flex flex-col gap-1.5">
          {[88, 70, 80, 56].map((w, i) => (
            <span key={i} className="h-1 rounded-full bg-ink-950/25" style={{ width: `${w}%` }} />
          ))}
        </span>
        {/* Generic care glyphs: wash, no bleach, iron, dry. */}
        <span className="mt-4 flex justify-between text-ink-950/70">
          <svg viewBox="0 0 20 16" className="h-4 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
            <path d="M2 3l2 11h12l2-11M1 3c3 2 6-2 9 0s6-2 9 0" />
          </svg>
          <svg viewBox="0 0 20 16" className="h-4 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
            <path d="M10 2 2 14h16Z M5 5l10 10M15 5 5 15" />
          </svg>
          <svg viewBox="0 0 20 16" className="h-4 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
            <path d="M3 13h14l-2-7H8c-3 0-5 3-5 7Z" />
          </svg>
          <svg viewBox="0 0 20 16" className="h-4 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="3" y="1.5" width="14" height="13" rx="1" />
            <circle cx="10" cy="8" r="4" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/** One colour reference, and the same colour on three materials. */
export function ColourVisual({ swatches }: { swatches: { src: StaticImageData; label: string }[] }) {
  return (
    <div className="absolute inset-0 flex items-center gap-3 p-5">
      <span className="flex h-full w-16 shrink-0 flex-col justify-end rounded-lg bg-forge-600 p-2 ring-1 ring-white/20">
        <span className="text-[0.625rem] font-bold uppercase tracking-[0.1em] text-white/85">Ref.</span>
      </span>
      <span className="grid h-full flex-1 grid-cols-3 gap-2">
        {swatches.map((swatch) => (
          <span key={swatch.label} className="relative overflow-hidden rounded-lg ring-1 ring-white/10">
            <Image src={swatch.src} alt="" fill sizes="96px" className="object-cover" />
            <span className="absolute inset-x-1.5 bottom-1.5 rounded bg-ink-950/70 px-1.5 py-0.5 text-center text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
              {swatch.label}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}

/** A printed box with its lid lifted, a polybag and a hang tag. */
export function PackagingVisual() {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-5 bg-[radial-gradient(90%_80%_at_50%_80%,rgb(255_255_255/0.06),transparent)] px-6 pb-6 pt-10">
      {/* Polybag. */}
      <span className="relative h-32 w-24 -rotate-6 rounded-md bg-white/10 ring-1 ring-white/25 backdrop-blur-sm [background-image:linear-gradient(160deg,rgb(255_255_255/0.18),transparent_40%)]">
        <span className="absolute inset-x-2 top-2 h-px bg-white/30" />
        <span className="absolute inset-x-3 top-8">
          <BrandMark className="w-full text-white/80" />
        </span>
      </span>
      {/* Box and lid. */}
      <span className="relative">
        <span className="absolute -top-7 left-1 right-1 h-6 -rotate-3 rounded-sm bg-forge-600 shadow-[0_10px_18px_-10px_rgb(0_0_0/0.8)]" />
        <span className="relative flex h-32 w-44 flex-col items-center justify-center gap-2 rounded-sm bg-ink-950 ring-1 ring-white/15 shadow-[0_24px_40px_-18px_rgb(0_0_0/0.9)]">
          <BrandMark className="w-32 text-white" />
          <span className="h-px w-24 bg-white/15" />
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/45">Boxing gloves</span>
        </span>
      </span>
      {/* Hang tag. */}
      <span className="relative mb-6 w-16 rotate-6 rounded-md bg-bone-50 px-2 pb-2 pt-4 shadow-[0_14px_24px_-12px_rgb(0_0_0/0.8)]">
        <span className="absolute left-1/2 top-1 size-2 -translate-x-1/2 rounded-full bg-[var(--color-surface)]" />
        <BrandMark className="w-full text-ink-950" />
      </span>
    </div>
  );
}
