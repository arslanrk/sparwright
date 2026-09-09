import { cn } from "@/lib/cn";

/**
 * ImagePlaceholder — Design System §09 Imagery and graphic language.
 *
 * §09 is explicit that credibility comes from real products, real materials and
 * a visible production process, "not from stock images"; non-negotiable #1 says
 * the same. No photography exists yet, so every image region on the site names
 * the §09 minimum-launch-shot it is waiting for instead of borrowing a stand-in.
 * That keeps the layout honest and turns the shot list into something visible
 * and trackable. Replace each one with `next/image` as the shoot delivers, and
 * PR 13 will not sign off while any remain.
 */

/** §09 image ratios. */
const RATIOS = {
  hero: "aspect-[4/5]",
  product: "aspect-[4/5]",
  process: "aspect-[3/2]",
  banner: "aspect-[16/9]",
  portrait: "aspect-[3/4]",
} as const;

export type ImageRatio = keyof typeof RATIOS;

type ImagePlaceholderProps = {
  /** Item from the §09 minimum launch shot list. */
  shot: string;
  ratio?: ImageRatio;
  className?: string;
};

export function ImagePlaceholder({
  shot,
  ratio = "product",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      data-shot={shot}
      className={cn(
        "flex items-end overflow-hidden rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]",
        RATIOS[ratio],
        className,
      )}
    >
      <p className="font-body text-small text-[var(--color-text-muted)]">
        <span className="block text-eyebrow uppercase">
          Photograph required
        </span>
        <span className="mt-1 block text-[var(--color-text-secondary)]">
          {shot}
        </span>
      </p>
    </div>
  );
}
