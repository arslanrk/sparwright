"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { GalleryShot } from "@/lib/products";
import { cn } from "@/lib/cn";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * ImageGallery — Design System §11 Product page template, §09 Image ratios,
 * §12 Accessibility.
 *
 * One large 4:5 view with a thumbnail strip. The thumbnails are buttons rather
 * than a tablist: each one swaps the main view, so `aria-pressed` describes the
 * state honestly and arrow keys are not expected to move selection.
 *
 * A slot with a photograph renders it; one without still shows the §09 shot it
 * is waiting on, so a gap stays visible rather than being filled with a
 * stand-in. The main view is the page's first image, so it loads eagerly.
 */

type ImageGalleryProps = {
  items: GalleryShot[];
  className?: string;
};

export function ImageGallery({ items, className }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const current = items[active];

  if (!current) return null;

  return (
    <div className={cn("flex flex-col gap-[var(--space-4)]", className)}>
      <figure id={panelId} className="m-0">
        {current.photo ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink-950">
            <Image
              key={current.shot}
              src={current.photo.src}
              alt={current.photo.alt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              loading={active === 0 ? "eager" : undefined}
              fetchPriority={active === 0 ? "high" : undefined}
              className={cn(
                "motion-safe:animate-[gallery-in_300ms_var(--ease-standard)]",
                current.photo.fit === "contain" ? "object-contain" : "object-cover",
              )}
            />
            <span className="absolute left-[var(--space-4)] top-[var(--space-4)] rounded-full bg-ink-950/70 px-3 py-1 font-display text-small font-bold tabular-nums text-white backdrop-blur-sm">
              {String(active + 1).padStart(2, "0")}
              <span className="font-normal text-white/60">
                {" "}/ {String(items.length).padStart(2, "0")}
              </span>
            </span>
          </div>
        ) : (
          <ImagePlaceholder shot={current.shot} ratio="product" />
        )}
        <figcaption className="mt-3 text-small text-[var(--color-text-muted)]">
          {current.caption}
        </figcaption>
      </figure>

      {items.length > 1 ? (
        <ul
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${Math.min(items.length, 6)}, minmax(0, 1fr))` }}
        >
          {items.map((item, index) => {
            const selected = index === active;
            return (
              <li key={item.shot}>
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-controls={panelId}
                  aria-label={`Show image ${index + 1}: ${item.caption}`}
                  onClick={() => setActive(index)}
                  className={cn(
                    // Selected state carries a ring and an opacity change, not
                    // just colour — §12 forbids colour-only status.
                    "relative flex aspect-square w-full items-end overflow-hidden rounded-md border p-2 text-left transition-[opacity,box-shadow]",
                    selected
                      ? "border-transparent ring-2 ring-[var(--color-action)] ring-offset-2 ring-offset-[var(--color-bg)]"
                      : "border-[var(--color-border)] opacity-70 hover:opacity-100",
                  )}
                >
                  {item.photo ? (
                    <Image
                      src={item.photo.src}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="line-clamp-3 text-[0.6875rem] leading-tight text-[var(--color-text-muted)]">
                      {item.shot}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
