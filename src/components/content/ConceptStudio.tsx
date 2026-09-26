"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * ConceptStudio — "a logo, a colour and an idea" becoming a product, as a
 * small studio window the visitor can play with.
 *
 * Left, the brief (before): the product, a logo, a colourway and a design
 * direction. Right, the finished product (after). Nothing is generated —
 * each colourway / design pairing is a photograph, and the chosen logo is
 * set onto the product's label area as a patch, so switching the logo is
 * visible on the product too. The patch also covers any mark the source
 * photograph carries.
 *
 * Design and colourway are independent choices over a grid of photographs
 * shot identically, so a switch reads as the product changing, not the
 * picture. All state is local; nothing moves on its own (§07).
 */

export type ConceptLogo = { id: string; label: string; mark: ReactNode };

/** Where the logo sits on a photograph, in percent of the square frame. */
export type LogoPatch = {
  x: number;
  y: number;
  w: number;
  h: number;
  /** "transparent" on a blank panel; a colour to cover a mark in the photo. */
  ground: string;
  ink: string;
};

export type Colourway = {
  id: string;
  label: string;
  swatches: string[];
  /** Logo colour on this colourway, when it differs from the patch's. */
  logoInk?: string;
};

export type ConceptPhoto = {
  src: StaticImageData;
  alt: string;
  /** Overrides the product's patches for this photograph. */
  patches?: LogoPatch[];
};

/**
 * A product is a grid: every design in every colourway, one photograph per
 * cell, keyed "design_colourway". Design and colourway are chosen
 * independently; a cell without a photograph is not offered.
 */
export type ConceptProduct = {
  id: string;
  label: string;
  designs: { id: string; label: string }[];
  colourways: Colourway[];
  photos: Record<string, ConceptPhoto>;
  /** Default logo placement for every photograph of the product. */
  patches?: LogoPatch[];
};

export function ConceptStudio({
  products,
  logos,
}: {
  products: ConceptProduct[];
  logos: ConceptLogo[];
}) {
  const [productId, setProductId] = useState(products[0].id);
  const [logoId, setLogoId] = useState(logos[0].id);
  const [designId, setDesignId] = useState(products[0].designs[0].id);
  const [colourwayId, setColourwayId] = useState(products[0].colourways[0].id);

  const product = products.find((p) => p.id === productId) ?? products[0];
  const has = (d: string, c: string) => Boolean(product.photos[`${d}_${c}`]);
  const design = product.designs.find((d) => d.id === designId) ?? product.designs[0];
  const colourway =
    product.colourways.find((c) => c.id === colourwayId && has(design.id, c.id)) ??
    product.colourways.find((c) => has(design.id, c.id)) ??
    product.colourways[0];
  const currentKey = `${product.id}:${design.id}_${colourway.id}`;
  const logo = logos.find((l) => l.id === logoId) ?? logos[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-carbon-900 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
      {/* Window bar. */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        <p className="text-small text-mist-300">
          Sparwright studio <span aria-hidden="true">/</span>{" "}
          <span className="font-semibold text-white">Concept</span>
        </p>
        <span className="rounded-sm border border-forge-600/60 px-1.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-forge-600">
          Draft
        </span>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Before: the brief. */}
        <div className="flex flex-col gap-[var(--space-5)] p-[var(--space-5)] md:border-r md:border-white/10">
          <StepLabel step="Before" title="Your brief" />

          {/* Only offered when there is more than one product. */}
          {products.length > 1 ? (
            <Field label="Product">
              <div role="radiogroup" aria-label="Product" className="grid grid-cols-2 gap-1 rounded-lg bg-white/5 p-1">
                {products.map((p) => (
                  <Option
                    key={p.id}
                    selected={p.id === productId}
                    onSelect={() => {
                      setProductId(p.id);
                      setDesignId(p.designs[0].id);
                      setColourwayId(p.colourways[0].id);
                    }}
                    className="justify-center rounded-md px-2 py-2 text-small font-semibold"
                    selectedClass="bg-white text-ink-950"
                    idleClass="text-mist-300 hover:text-white"
                  >
                    {p.label}
                  </Option>
                ))}
              </div>
            </Field>
          ) : null}

          <Field label="Logo">
            <div role="radiogroup" aria-label="Logo" className="grid grid-cols-3 gap-2">
              {logos.map((l) => (
                <Option
                  key={l.id}
                  selected={l.id === logoId}
                  onSelect={() => setLogoId(l.id)}
                  className="min-w-0 flex-col gap-1.5 rounded-lg border px-1.5 py-2.5"
                  selectedClass="border-forge-600 bg-forge-600/10 text-white"
                  idleClass="border-white/10 text-mist-300 hover:border-white/30"
                >
                  <span aria-hidden="true" className="flex h-8 items-center text-white">
                    {l.mark}
                  </span>
                  {/* Sentence case: spaced capitals overran the narrow tiles. */}
                  <span className="max-w-full truncate text-[0.75rem] font-semibold">{l.label}</span>
                </Option>
              ))}
            </div>
          </Field>

          <Field label="Colourway">
            <div role="radiogroup" aria-label="Colourway" className="flex flex-col gap-1.5">
              {product.colourways.filter((c) => has(design.id, c.id)).map((c) => (
                <Option
                  key={c.id}
                  selected={c.id === colourway.id}
                  onSelect={() => setColourwayId(c.id)}
                  className="gap-3 rounded-lg border px-3 py-2 text-small"
                  selectedClass="border-white/60 bg-white/5 text-white"
                  idleClass="border-white/10 text-mist-300 hover:border-white/30"
                >
                  <span aria-hidden="true" className="flex -space-x-1.5">
                    {c.swatches.map((colour) => (
                      <span
                        key={colour}
                        className="size-5 rounded-full ring-2 ring-carbon-900"
                        style={{ background: colour }}
                      />
                    ))}
                  </span>
                  {c.label}
                </Option>
              ))}
            </div>
          </Field>

          <Field label="Design direction">
            <div role="radiogroup" aria-label="Design direction" className="flex flex-wrap gap-1.5">
              {product.designs.map((d) => (
                <Option
                  key={d.id}
                  selected={d.id === design.id}
                  onSelect={() => setDesignId(d.id)}
                  className="rounded-full border px-3 py-1.5 text-small font-semibold"
                  selectedClass="border-forge-600 bg-forge-600 text-white"
                  idleClass="border-white/15 text-mist-300 hover:border-white/40 hover:text-white"
                >
                  {d.label}
                </Option>
              ))}
            </div>
          </Field>
        </div>

        {/* After: the finished product. First on a phone, so a choice shows
            where it lands without scrolling past the brief. */}
        <div className="order-first flex flex-col gap-[var(--space-4)] border-b border-white/10 p-[var(--space-5)] md:order-none md:border-b-0">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
            <StepLabel step="After" title="Finished product" />
            <span className="flex items-center gap-1.5 whitespace-nowrap text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-success-600">
              <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-success-600 motion-reduce:animate-none" />
              Live preview
            </span>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-xl bg-ink-950">
            {/* Every photograph stacked, cross-faded, so a switch is instant. */}
            {products.flatMap((p) =>
              Object.entries(p.photos).map(([cell, c]) => {
                const key = `${p.id}:${cell}`;
                const shown = key === currentKey;
                const ink = p.colourways.find((cw) => cell.endsWith(`_${cw.id}`))?.logoInk;
                return (
                  <div
                    key={key}
                    aria-hidden={!shown}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500 ease-standard motion-reduce:transition-none",
                      shown ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <Image src={c.src} alt={shown ? c.alt : ""} fill sizes="(min-width: 1024px) 420px, 90vw" className="object-cover" />
                    {(c.patches ?? p.patches)?.map((patch, i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        className={cn(
                          "absolute flex items-center justify-center rounded-[6px]",
                          patch.ground !== "transparent" && "shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]",
                        )}
                        style={{
                          left: `${patch.x - patch.w / 2}%`,
                          top: `${patch.y - patch.h / 2}%`,
                          width: `${patch.w}%`,
                          height: `${patch.h}%`,
                          background: patch.ground,
                          color: ink ?? patch.ink,
                        }}
                      >
                        <span className="flex h-[70%] w-[80%] items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                          {logo.mark}
                        </span>
                      </span>
                    ))}
                  </div>
                );
              }),
            )}
            {/* Registration marks, the drawing-sheet motif (§09). */}
            <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 size-4 border-l-2 border-t-2 border-white/60" />
            <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 size-4 border-r-2 border-t-2 border-white/60" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 size-4 border-b-2 border-l-2 border-white/60" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 size-4 border-b-2 border-r-2 border-white/60" />
          </div>

          <p aria-live="polite" className="flex flex-wrap items-center gap-x-2 text-small text-mist-300">
            <span className="font-semibold text-white">{product.label}</span>
            <span aria-hidden="true">·</span>
            {design.label}
            <span aria-hidden="true">·</span>
            {colourway.label}
            <span aria-hidden="true">·</span>
            {logo.label} logo
          </p>
        </div>
      </div>
    </div>
  );
}

function StepLabel({ step, title }: { step: string; title: string }) {
  return (
    <p className="flex items-center gap-2">
      <span className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-mist-300">
        {step}
      </span>
      <span className="whitespace-nowrap font-body text-body font-semibold text-white">{title}</span>
    </p>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-mist-300">{label}</p>
      {children}
    </div>
  );
}

/** A radio option drawn as a button: `role="radio"` with `aria-checked`. */
function Option({
  selected,
  onSelect,
  className,
  selectedClass,
  idleClass,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  className?: string;
  selectedClass: string;
  idleClass: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex items-center text-left transition-colors duration-200",
        className,
        selected ? selectedClass : idleClass,
      )}
    >
      {children}
    </button>
  );
}
