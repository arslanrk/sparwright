"use client";

import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { FIELD_CONTROL, FormField } from "./FormField";

/**
 * SelectField — Design System §08 Quote and mockup form.
 *
 * A native `<select>`. It is keyboard-operable, works with every assistive
 * technology and behaves correctly at 360px without any of the scripting a
 * custom listbox would need (§12).
 */

type SelectFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optionalLabel?: boolean;
  /** Shown as the empty first option. */
  placeholder?: string;
  options: readonly string[];
  className?: string;
} & Omit<ComponentPropsWithoutRef<"select">, "id" | "className" | "children">;

export function SelectField({
  label,
  hint,
  error,
  required,
  optionalLabel,
  placeholder = "Select an option",
  options,
  className,
  ...selectProps
}: SelectFieldProps) {
  return (
    <FormField
      label={label}
      hint={hint}
      error={error}
      required={required}
      optionalLabel={optionalLabel}
      className={className}
    >
      {(field) => (
        <select
          {...selectProps}
          {...field}
          className={cn(FIELD_CONTROL, "appearance-none pr-10", SELECT_ARROW)}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </FormField>
  );
}

/**
 * The chevron is a background image rather than an overlaid icon, so it cannot
 * intercept a click meant for the control.
 */
const SELECT_ARROW =
  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20stroke%3D%22%2369737e%22%20stroke-width%3D%221.75%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%22/%3E%3C/svg%3E')] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat";
