import { cn } from "@/lib/cn";

/**
 * Testimonial — Design System §08 Case studies and testimonials.
 *
 * Built, and deliberately rendered nowhere. §08 and non-negotiable #12 hide all
 * social proof until a genuine customer project can be documented.
 *
 * The prop shape enforces that rather than trusting a future editor to
 * remember: an attributed name and organisation are required, so §08's ban on
 * anonymous initials cannot be worked around, and `permission` only accepts the
 * literal `"granted"` — §08 allows a customer's name only with permission, so
 * stating it is part of rendering the component at all.
 */

export type TestimonialProps = {
  quote: string;
  /** Full name. §08 forbids anonymous initials used to look established. */
  name: string;
  role: string;
  organisation: string;
  /** Written permission from the customer to publish the above. */
  permission: "granted";
  className?: string;
};

export function Testimonial({
  quote,
  name,
  role,
  organisation,
  permission,
  className,
}: TestimonialProps) {
  // Defensive: types are erased at runtime, and this is content we must never
  // publish by accident.
  if (permission !== "granted") return null;

  return (
    <figure
      className={cn(
        "m-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6)]",
        className,
      )}
    >
      <blockquote className="text-body-large text-[var(--color-text)]">
        {quote}
      </blockquote>
      <figcaption className="mt-[var(--space-5)] text-small text-[var(--color-text-secondary)]">
        <span className="font-semibold text-[var(--color-text)]">{name}</span>
        {" — "}
        {role}, {organisation}
      </figcaption>
    </figure>
  );
}
