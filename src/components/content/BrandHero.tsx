import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/content/BrandMark";
import { Section } from "@/components/foundation/Container";

/**
 * BrandHero — the Private Label page's opening. The copy on the left; on the
 * right, the point of private label shown rather than said: a product on the
 * studio grey carrying "your brand" in the three places a customer meets it —
 * on the product, on a woven label and on a hang tag.
 *
 * "Your brand" is a placeholder, never a real mark. The visual repeats what
 * the copy says, so it is hidden from screen readers; the photograph's own
 * description is on the image.
 */

export type BrandMarkSpot = { x: number; y: number; w: number; h: number };

export function BrandHero({
  breadcrumb,
  eyebrow,
  title,
  description,
  points,
  actions,
  photo,
  marks,
}: {
  /** Sits at the top of the hero rather than in a band of its own. */
  breadcrumb?: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  actions: ReactNode;
  photo: { src: StaticImageData; alt: string };
  /** Where the brand sits on the product: centre and size, in percent. */
  marks: BrandMarkSpot[];
}) {
  return (
    <Section theme="dark" width="shell" className="relative isolate overflow-hidden pt-[var(--space-6)]! lg:pt-[var(--space-7)]!">
      {/* A warm light behind the product. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 -z-10 size-[44rem] -translate-y-1/2 rounded-full bg-forge-600/15 blur-3xl"
      />

      <div className="grid grid-cols-1 items-center gap-[var(--space-8)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[var(--space-9)]">
        <div>
          {breadcrumb ? <div className="mb-[var(--space-7)]">{breadcrumb}</div> : null}
          <p className="flex items-center gap-3 text-eyebrow uppercase tracking-[0.16em] text-forge-600">
            <span aria-hidden="true" className="h-0.5 w-6 bg-forge-600" />
            {eyebrow}
          </p>
          <h1 className="mt-[var(--space-5)] font-display text-display-lg">{title}</h1>
          <p className="mt-[var(--space-5)] max-w-copy text-body-large text-[var(--color-text-secondary)]">
            {description}
          </p>
          <ul className="mt-[var(--space-6)] flex flex-col gap-2.5">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-body text-white">
                <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center rounded-full bg-forge-600/20 text-forge-600">
                  <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-[var(--space-7)] flex flex-wrap items-center gap-3">{actions}</div>
        </div>

        {/* The product, branded three ways. */}
        <div className="relative mx-auto w-full max-w-[36rem] pb-10 pr-6 sm:pr-10">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-[radial-gradient(120%_100%_at_50%_75%,#d9dadc,#b9bbbf)] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 1024px) 560px, 92vw"
              className="object-contain"
            />
            {/* On the product: the brand on each wrist panel. */}
            {marks.map((mark, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute flex items-center justify-center"
                style={{
                  left: `${mark.x - mark.w / 2}%`,
                  top: `${mark.y - mark.h / 2}%`,
                  width: `${mark.w}%`,
                  height: `${mark.h}%`,
                }}
              >
                <BrandMark className="w-[78%] text-[#E8E8E8]" />
              </span>
            ))}
            <Callout className="left-[6%] top-[8%]">On the product</Callout>
          </div>

          {/* The hang tag, on its string from the top corner. */}
          <div aria-hidden="true" className="absolute -top-3 right-0 w-[34%] rotate-[8deg] sm:right-2">
            <svg viewBox="0 0 40 60" className="absolute -top-10 left-1/2 h-14 w-8 -translate-x-1/2 text-white/40" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20 0 C 8 20, 32 30, 20 58" />
            </svg>
            <div className="relative rounded-xl bg-bone-50 px-[10%] pb-[12%] pt-[16%] text-ink-950 shadow-[0_24px_40px_-16px_rgb(0_0_0/0.7)]">
              <span className="absolute left-1/2 top-[6%] size-3 -translate-x-1/2 rounded-full bg-[var(--color-bg)] ring-2 ring-ink-950/15" />
              <BrandMark className="w-full text-ink-950" />
              <span className="mt-[10%] block h-px bg-ink-950/15" />
              <span className="mt-[8%] block text-center text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-ink-950/55 sm:text-[0.6875rem]">
                Private label
              </span>
              {/* A barcode-like strip: texture, not a real code. */}
              <span className="mx-auto mt-[10%] flex h-5 w-[80%] items-stretch justify-between opacity-70">
                {Array.from({ length: 22 }, (_, i) => (
                  <span key={i} className="bg-ink-950" style={{ width: i % 3 === 0 ? 2 : 1 }} />
                ))}
              </span>
            </div>
            <Callout className="-bottom-9 right-0">On the tag</Callout>
          </div>

          {/* The woven label, stitched at its ends. */}
          <div aria-hidden="true" className="absolute bottom-0 left-4 w-[46%] -rotate-3 sm:left-8">
            <div className="relative flex items-center justify-between gap-2 rounded-sm bg-ink-950 px-[7%] py-[5%] text-white shadow-[0_20px_36px_-14px_rgb(0_0_0/0.8)] ring-1 ring-white/10 [background-image:repeating-linear-gradient(90deg,rgb(255_255_255/0.04)_0_1px,transparent_1px_3px)]">
              <span className="absolute inset-y-1 left-1.5 border-l border-dashed border-white/40" />
              <span className="absolute inset-y-1 right-1.5 border-l border-dashed border-white/40" />
              <BrandMark className="w-[62%] text-white" />
              <span className="rounded-sm border border-white/40 px-1.5 font-display text-[0.6875rem] font-bold">M</span>
            </div>
            <Callout className="-top-8 left-0">On the label</Callout>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Callout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink-950/85 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm ${className ?? ""}`}
    >
      <span className="size-1.5 rounded-full bg-forge-600" />
      {children}
    </span>
  );
}
