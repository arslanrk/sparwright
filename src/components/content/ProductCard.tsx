import Link from "next/link";
import { TextLink } from "@/components/foundation/TextLink";
import { cn } from "@/lib/cn";
import type { ProductCardItem } from "@/lib/products";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * ProductCard — Design System §08 Product card, §09 Image ratios.
 *
 * White surface, Line border, 10px radius, 24px padding, 4:5 image. The title
 * is the product category, not marketing poetry, and the description runs to
 * three lines at most: use, buyer and customization (§08, §10).
 *
 * §08 also allows pricing on this card "only when the offer is genuinely
 * standardized" — it is not, so the card has no price slot at all.
 */

export type { ProductCardItem };

export function ProductCard({
  item,
  className,
}: {
  item: ProductCardItem;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-white)] p-[var(--space-5)]",
        className,
      )}
    >
      <ImagePlaceholder shot={item.shot} ratio="product" />
      <p className="mt-[var(--space-5)] text-eyebrow uppercase text-[var(--color-text-muted)]">
        {item.category}
      </p>
      <h3 className="mt-2 text-heading-4">
        {/* The whole card is the target, but only the title carries the link so
            the accessible name stays the product category (§12). */}
        <Link href={item.href} className="rounded-sm">
          {item.title}
        </Link>
      </h3>
      <p className="mt-3 text-body text-[var(--color-text-secondary)]">
        {item.description}
      </p>
      <div className="mt-[var(--space-5)] pt-1">
        <TextLink href={item.href} tabIndex={-1} aria-hidden="true">
          {item.action}
        </TextLink>
      </div>
    </article>
  );
}
