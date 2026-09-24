"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { FieldError } from "./FormField";

/**
 * RadioCardGroup — Design System §08 Quote and mockup form, §13 Required states.
 *
 * A real radio group: a `<fieldset>` with a `<legend>`, native inputs, and one
 * tab stop with arrow-key movement between options, all of which come free from
 * the platform (§12). The card is the label, so the whole surface is the target
 * — which is what makes it usable at 360px.
 *
 * §13 requires selection to be persistent and shown by more than colour, so a
 * selected card gains a 2px Forge border and a filled radio dot, matching the
 * §06 "selected" border token.
 */

export type RadioCardOption = {
  value: string;
  /** Optional supporting line under the label. */
  description?: string;
};

type RadioCardGroupProps = {
  legend: string;
  hint?: string;
  error?: string;
  name: string;
  value: string;
  options: readonly (string | RadioCardOption)[];
  onChange: (value: string) => void;
  /** Cards per row at the largest breakpoint. */
  columns?: 2 | 3 | 4;
  /**
   * Tighter cards, two to a row even on a phone — for a long list of short
   * labels (product types, quantity ranges) that would otherwise run a
   * screen and a half at one per row.
   */
  compact?: boolean;
  className?: string;
};

const COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

const COMPACT_COLUMNS = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
} as const;

export function RadioCardGroup({
  legend,
  hint,
  error,
  name,
  value,
  options,
  onChange,
  columns = 3,
  compact = false,
  className,
}: RadioCardGroupProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  const items = options.map((option) =>
    typeof option === "string" ? { value: option } : option,
  );

  return (
    <fieldset
      className={cn("m-0 border-0 p-0", className)}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
    >
      <legend className="font-body text-small font-semibold text-[var(--color-text)]">
        {legend}
      </legend>

      {hint ? (
        <p
          id={hintId}
          className="mt-2 text-small text-[var(--color-text-muted)]"
        >
          {hint}
        </p>
      ) : null}

      <div
        className={cn(
          "mt-3 grid",
          compact ? "gap-2" : "gap-3",
          compact ? COMPACT_COLUMNS[columns] : COLUMNS[columns],
        )}
      >
        {items.map((item) => {
          const selected = value === item.value;
          return (
            <label
              key={item.value}
              className={cn(
                "group flex cursor-pointer rounded-md border bg-[var(--color-white)] transition-colors",
                compact ? "items-center gap-2.5 px-3 py-3" : "items-start gap-3 p-4",
                selected
                  ? cn(
                      "border-2 border-[var(--color-action)] bg-forge-100/40",
                      compact ? "px-[calc(0.75rem-1px)] py-[calc(0.75rem-1px)]" : "p-[calc(1rem-1px)]",
                    )
                  : "border-[var(--color-border-strong)] hover:border-[var(--color-text)]",
                // The visible focus ring belongs on the card, not the hidden input.
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-[var(--color-ink-950)]",
              )}
            >
              <input
                type="radio"
                name={name}
                value={item.value}
                checked={selected}
                onChange={() => onChange(item.value)}
                className="sr-only"
              />
              <RadioDot selected={selected} className={compact ? undefined : "mt-0.5"} />
              <span className="min-w-0">
                <span
                  className={cn(
                    "block font-body font-medium text-[var(--color-text)]",
                    compact ? "text-small leading-snug" : "text-body",
                  )}
                >
                  {item.value}
                </span>
                {item.description ? (
                  <span className="mt-1 block text-small text-[var(--color-text-secondary)]">
                    {item.description}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>

      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </fieldset>
  );
}

function RadioDot({ selected, className }: { selected: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full border",
        className,
        selected
          ? "border-[var(--color-action)]"
          : "border-[var(--color-text-muted)]",
      )}
    >
      {selected ? (
        <span className="size-2.5 rounded-full bg-[var(--color-action)]" />
      ) : null}
    </span>
  );
}
