import { cn } from "@/lib/cn";

/**
 * CustomizationCard — Design System §08 Customization panel.
 *
 * The four things a buyer actually controls. The uppercase tag is the §09
 * "product specification tag" motif (MODEL / USE / SHELL / BRANDING) rather
 * than an icon — no icon family exists yet, and §09 rules out mixing one in
 * ad hoc.
 */

export type CustomizationItem = {
  tag: string;
  title: string;
  description: string;
};

export function CustomizationCard({
  item,
  className,
}: {
  item: CustomizationItem;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full border-t border-[var(--color-border)] pt-[var(--space-5)]",
        className,
      )}
    >
      <p className="text-eyebrow uppercase text-[var(--color-action)]">
        {item.tag}
      </p>
      <h3 className="mt-3 text-heading-4">{item.title}</h3>
      <p className="mt-3 text-body text-[var(--color-text-secondary)]">
        {item.description}
      </p>
    </div>
  );
}
