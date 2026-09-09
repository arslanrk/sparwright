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
  headingLevel: Heading = "h3",
  className,
}: {
  item: ProductCardItem;
  /**
   * §12 requires a logical heading order on every page, and that depends on
   * what the card sits under. On /products the cards follow the h1 directly,
   * so they are h2; inside a section with its own h2 they stay h3.
   */
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-white)] p-[var(--space-5)]",
        className,
      )}
    >
      <ImagePlaceholder shot={item.shot} ratio="product" />
      <p className="mt-[var(--space-5)] text-eyebrow uppercase text-[var(--color-text-muted)]">
        {item.category}
      </p>
      <Heading className="mt-2 text-heading-4">
        {/* Only the title carries the link, so the accessible name stays the
            product category — but its ::after covers the card, which makes the
            whole card the tap target. A 22px text link fails WCAG 2.5.8's 24px
            minimum; the card comfortably clears it. */}
        <Link
          href={item.href}
          data-analytics="product_card_open"
          data-analytics-product={item.title}
          className="rounded-sm after:absolute after:inset-0 after:content-['']"
        >
          {item.title}
        </Link>
      </Heading>
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
