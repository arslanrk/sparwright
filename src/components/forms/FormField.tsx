"use client";

import type { ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * FormField — Design System §08 Quote and mockup form, §12 Accessibility,
 * §13 Required component states.
 *
 * Wraps one control with its label, optional hint and error. §12 requires
 * proper programmatic labels and an error icon alongside written error text, so
 * the field owns the `id`/`aria-describedby`/`aria-invalid` wiring rather than
 * leaving it to each call site to remember.
 */

export const FIELD_CONTROL =
  "w-full rounded-md border bg-[var(--color-white)] px-4 py-3 font-body text-body text-[var(--color-text)] " +
  "border-[var(--color-border-strong)] transition-colors placeholder:text-[var(--color-text-muted)] " +
  "hover:border-[var(--color-text)] disabled:cursor-not-allowed disabled:opacity-50 " +
  "aria-[invalid=true]:border-2 aria-[invalid=true]:border-[var(--color-action)]";

export type FieldRenderProps = {
  id: string;
  "aria-describedby": string | undefined;
  "aria-invalid": true | undefined;
  required?: boolean;
};

type FormFieldProps = {
  label: string;
  /** Guidance shown before the control, not after the mistake. */
  hint?: string;
  error?: string;
  required?: boolean;
  /** Say so explicitly rather than leaving the buyer to guess. */
  optionalLabel?: boolean;
  children: (props: FieldRenderProps) => ReactNode;
  className?: string;
};

export function FormField({
  label,
  hint,
  error,
  required,
  optionalLabel = false,
  children,
  className,
}: FormFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="font-body text-small font-semibold text-[var(--color-text)]"
      >
        {label}
        {optionalLabel ? (
          <span className="ml-2 font-normal text-[var(--color-text-muted)]">
            Optional
          </span>
        ) : null}
      </label>

      {hint ? (
        <p id={hintId} className="text-small text-[var(--color-text-muted)]">
          {hint}
        </p>
      ) : null}

      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        required,
      })}

      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

/**
 * §12: an error icon plus the written message. Neither the icon nor the colour
 * carries the meaning on its own.
 */
export function FieldError({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <p
      id={id}
      className="flex items-start gap-2 font-body text-small font-medium text-[var(--color-action-text)]"
    >
      <ErrorIcon />
      <span>{children}</span>
    </p>
  );
}

export function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={cn("mt-0.5 size-4 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6.5v4.25" />
      <path d="M10 13.6v.05" />
    </svg>
  );
}
