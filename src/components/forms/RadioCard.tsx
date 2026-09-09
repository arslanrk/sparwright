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
  className?: string;
};

const COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
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

      <div className={cn("mt-3 grid gap-3", COLUMNS[columns])}>
        {items.map((item) => {
          const selected = value === item.value;
          return (
            <label
              key={item.value}
              className={cn(
                "group flex cursor-pointer items-start gap-3 rounded-md border bg-[var(--color-white)] p-4 transition-colors",
                selected
                  ? "border-2 border-[var(--color-action)] p-[calc(1rem-1px)]"
                  : "border-[var(--color-border)] hover:border-[var(--color-text-muted)]",
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
              <RadioDot selected={selected} />
              <span>
                <span className="block font-body text-body font-medium text-[var(--color-text)]">
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

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
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
