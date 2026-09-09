import type { SpecRow } from "@/lib/products";
import { cn } from "@/lib/cn";

/**
 * SpecificationTable — Design System §11 Product page template, §12 Responsive.
 *
 * A description list rather than a `<table>`: §12 requires specifications to
 * stack on mobile, and label/value pairs are exactly what a `<dl>` describes.
 * A grid gives the two-column reading on wider screens without the row-splitting
 * that a stacked table needs.
 */

type SpecificationTableProps = {
  rows: SpecRow[];
  className?: string;
};

export function SpecificationTable({
  rows,
  className,
}: SpecificationTableProps) {
  return (
    <dl className={cn("grid gap-0", className)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 border-b border-[var(--color-border)] py-[var(--space-4)] sm:grid-cols-[14rem_1fr] sm:gap-[var(--space-5)]"
        >
          <dt className="font-body text-body font-semibold text-[var(--color-text)]">
            {row.label}
          </dt>
          <dd className="m-0 text-body text-[var(--color-text-secondary)]">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
