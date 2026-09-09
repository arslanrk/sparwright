"use client";

import type { ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";
import { FieldError } from "./FormField";

/**
 * Checkbox — Design System §08 Quote and mockup form, §13 Required states.
 *
 * A native input with a drawn box, so the checked state is programmatic as well
 * as visual. The tick is a shape, not a colour change: §12 forbids status
 * carried by colour alone.
 */

type CheckboxProps = {
  label: ReactNode;
  hint?: string;
  error?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
};

export function Checkbox({
  label,
  hint,
  error,
  checked,
  onChange,
  name,
  disabled,
  className,
}: CheckboxProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        className={cn(
          "flex cursor-pointer items-start gap-3",
          disabled && "cursor-not-allowed opacity-50",
          "has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-[var(--color-ink-950)]",
        )}
      >
        <input
          type="checkbox"
          name={name}
          checked={checked}
          disabled={disabled}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          onChange={(event) => onChange(event.target.checked)}
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border",
            checked
              ? "border-[var(--color-action)] bg-[var(--color-action)] text-white"
              : "border-[var(--color-text-muted)] bg-[var(--color-white)]",
          )}
        >
          {checked ? (
            <svg
              viewBox="0 0 16 16"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8.5 6.5 12 13 4.5" />
            </svg>
          ) : null}
        </span>
        <span className="font-body text-body text-[var(--color-text)]">
          {label}
        </span>
      </label>

      {hint ? (
        <p
          id={hintId}
          className="ml-8 text-small text-[var(--color-text-muted)]"
        >
          {hint}
        </p>
      ) : null}

      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}
