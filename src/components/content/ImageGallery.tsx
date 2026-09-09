"use client";

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
 * Every slot is an `ImagePlaceholder` until the §09 shoot delivers. When real
 * photography lands, swap the placeholder for `next/image` and give each frame
 * the §12 alternative text — "Black custom sparring glove with red wrist label
 * and white club logo", not "Image123".
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
        <ImagePlaceholder shot={current.shot} ratio="product" />
        <figcaption className="mt-3 text-small text-[var(--color-text-muted)]">
          {current.caption}
        </figcaption>
      </figure>

      {items.length > 1 ? (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {items.map((item, index) => {
            const selected = index === active;
            return (
              <li key={item.shot}>
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-controls={panelId}
                  onClick={() => setActive(index)}
                  className={cn(
                    // Selected state carries a border weight change, not just
                    // colour — §12 forbids colour-only status.
                    "flex aspect-[4/5] w-full items-end rounded-md border p-2 text-left transition-colors",
                    selected
                      ? "border-2 border-[var(--color-action)] bg-[var(--color-surface)]"
                      : "border-[var(--color-border)] bg-transparent hover:bg-[var(--color-surface)]",
                  )}
                >
                  <span className="line-clamp-3 text-[0.6875rem] leading-tight text-[var(--color-text-muted)]">
                    {item.shot}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
