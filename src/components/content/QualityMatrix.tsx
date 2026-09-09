import { cn } from "@/lib/cn";

/**
 * QualityMatrix — Design System §11 Quality-control evidence matrix.
 *
 * A check paired with the evidence that proves it happened. §11 is explicit
 * that only checks the team will consistently perform and record may be
 * published, so this component takes a caller-supplied list rather than
 * defining an aspirational one of its own.
 *
 * A real `<table>` here, unlike `SpecificationTable`: this is a two-column
 * matrix with column headers that mean something, so the header association
 * carries information a description list would lose. §12 wants specifications
 * stacked on mobile, so it scrolls inside its own container rather than forcing
 * the page to scroll sideways.
 */

export type QualityCheck = {
  /** What is checked. */
  check: string;
  /** What is recorded to show it was checked. */
  evidence: string;
};

/**
 * §11 QC evidence matrix, verbatim. Covers dimensions, weight, material,
 * stitching, closure, branding, colour, labels, quantity and packaging.
 */
export const QC_EVIDENCE: QualityCheck[] = [
  {
    check: "Dimensions and weight",
    evidence:
      "Measurement against the approved sample or product specification.",
  },
  {
    check: "Material and construction",
    evidence:
      "Shell, fabric, padding, closure and stitching verified as agreed.",
  },
  {
    check: "Branding and colour",
    evidence: "Logo placement, method and agreed colour reference checked.",
  },
  {
    check: "Labels and sizing",
    evidence:
      "Size, care, wrist, neck or packaging labels checked where applicable.",
  },
  {
    check: "Quantity and packing",
    evidence:
      "Count, assortment, inner packing and export-carton details recorded.",
  },
  {
    check: "Final approval",
    evidence: "Photographs or inspection record retained before dispatch.",
  },
];

type QualityMatrixProps = {
  checks?: QualityCheck[];
  /** Accessible name for the table. */
  caption: string;
  className?: string;
};

export function QualityMatrix({
  checks = QC_EVIDENCE,
  caption,
  className,
}: QualityMatrixProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b-2 border-[var(--color-border)]">
            <th
              scope="col"
              className="py-[var(--space-3)] pr-[var(--space-5)] text-eyebrow uppercase text-[var(--color-text-muted)]"
            >
              Check
            </th>
            <th
              scope="col"
              className="py-[var(--space-3)] text-eyebrow uppercase text-[var(--color-text-muted)]"
            >
              Evidence recorded
            </th>
          </tr>
        </thead>
        <tbody>
          {checks.map((row) => (
            <tr
              key={row.check}
              className="border-b border-[var(--color-border)] align-top"
            >
              <th
                scope="row"
                className="py-[var(--space-4)] pr-[var(--space-5)] font-body text-body font-semibold text-[var(--color-text)]"
              >
                {row.check}
              </th>
              <td className="py-[var(--space-4)] text-body text-[var(--color-text-secondary)]">
                {row.evidence}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
