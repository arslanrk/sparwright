import Link from "next/link";
import { cn } from "@/lib/cn";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * CaseStudyCard — Design System §08 Case studies and testimonials, §09 ratios.
 *
 * Built, and deliberately rendered nowhere: §11 removes the case-study section
 * until genuine evidence exists, and non-negotiable #12 says the same.
 *
 * §08 requires a case study to show buyer type, requirement, products, process
 * and approved result — "not only a flattering quote" — so all five are
 * required props. `permission` accepts only `"granted"`, because §08 permits a
 * customer's name, logo and imagery only with permission.
 */

export type CaseStudyCardProps = {
  /** Club, gym or brand — the kind of buyer, stated plainly. */
  buyerType: string;
  customerName: string;
  requirement: string;
  products: string[];
  process: string;
  approvedResult: string;
  /** §09 case-study banner, 16:9. Omit until the photography exists. */
  bannerShot?: string;
  href?: string;
  /** Written permission to publish the customer's name and imagery. */
  permission: "granted";
  className?: string;
};

export function CaseStudyCard({
  buyerType,
  customerName,
  requirement,
  products,
  process,
  approvedResult,
  bannerShot,
  href,
  permission,
  className,
}: CaseStudyCardProps) {
  if (permission !== "granted") return null;

  const heading = href ? (
    <Link href={href} className="rounded-sm">
      {customerName}
    </Link>
  ) : (
    customerName
  );

  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-white)]",
        className,
      )}
    >
      {bannerShot ? (
        <ImagePlaceholder
          shot={bannerShot}
          ratio="banner"
          className="rounded-none border-0 border-b border-dashed"
        />
      ) : null}
      <div className="p-[var(--space-6)]">
        <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
          {buyerType}
        </p>
        <h3 className="mt-3 text-heading-4">{heading}</h3>

        <dl className="mt-[var(--space-5)] grid gap-[var(--space-4)]">
          <CaseStudyRow label="Requirement" value={requirement} />
          <CaseStudyRow label="Products" value={products.join(", ")} />
          <CaseStudyRow label="Process" value={process} />
          <CaseStudyRow label="Approved result" value={approvedResult} />
        </dl>
      </div>
    </article>
  );
}

function CaseStudyRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-eyebrow uppercase text-[var(--color-text-muted)]">
        {label}
      </dt>
      <dd className="m-0 mt-1 text-body text-[var(--color-text-secondary)]">
        {value}
      </dd>
    </div>
  );
}
