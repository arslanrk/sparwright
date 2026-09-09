"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/foundation/Button";
import { CTA } from "@/components/foundation/cta";
import { cn } from "@/lib/cn";

/**
 * SuccessPanel — Design System §A Form confirmation, §12 Accessibility.
 *
 * Replaces the form once a request is accepted. The heading takes focus on
 * mount: the form the buyer was working in has gone, and without moving focus a
 * keyboard or screen-reader user is left at a control that no longer exists.
 *
 * §14 is a manual-first workflow, so this says a person will read the request.
 * It promises no response time — non-negotiable #6.
 */

type SuccessPanelProps = {
  title?: string;
  description?: string;
  /** What the buyer can usefully do next. */
  nextSteps?: string[];
  reference?: string;
  className?: string;
};

export function SuccessPanel({
  // §A Form confirmation, verbatim.
  title = "Your request has been received.",
  description = "We’ll review your product, quantity, branding and destination details before confirming the next practical step.",
  nextSteps = [
    "A person reads your request — nothing here is automated.",
    "We come back with anything that needs a decision before a specification can be written.",
    "If a sample is the right next step, we confirm what it involves before you commit.",
  ],
  reference,
  className,
}: SuccessPanelProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--color-border)] bg-[var(--color-white)] p-[var(--space-6)]",
        className,
      )}
    >
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-heading-3 outline-offset-4"
      >
        {title}
      </h2>
      <p className="mt-4 text-body-large text-[var(--color-text-secondary)]">
        {description}
      </p>

      {reference ? (
        <p className="mt-[var(--space-5)] text-small text-[var(--color-text-muted)]">
          Your reference:{" "}
          <span className="font-semibold text-[var(--color-text)]">
            {reference}
          </span>
        </p>
      ) : null}

      <h3 className="mt-[var(--space-6)] font-body text-body font-semibold">
        What happens next
      </h3>
      <ol className="mt-3 flex flex-col gap-3">
        {nextSteps.map((step, index) => (
          <li
            key={step}
            className="flex gap-3 text-body text-[var(--color-text-secondary)]"
          >
            <span className="font-display font-semibold text-[var(--color-action)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-[var(--space-6)] flex flex-wrap gap-4">
        <Button href="/products" variant="secondary">
          {CTA.products}
        </Button>
        <Button href="/manufacturing" variant="text" arrow>
          {CTA.manufacturing}
        </Button>
      </div>
    </div>
  );
}
