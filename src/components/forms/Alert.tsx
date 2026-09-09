import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ErrorIcon } from "./FormField";

/**
 * Alert — Design System §13 Required component states, §12 Accessibility.
 *
 * Every tone carries an icon and a heading as well as a colour, because §12
 * forbids status communicated by appearance alone. An error alert is a live
 * region: it usually appears in response to a submission the buyer just made,
 * and they need to hear about it without hunting for it.
 */

export type AlertTone = "error" | "success" | "info";

const TONES: Record<AlertTone, string> = {
  error: "border-[var(--color-action)] bg-[var(--color-forge-100)]",
  success: "border-[var(--color-success-600)] bg-[var(--color-white)]",
  info: "border-[var(--color-border)] bg-[var(--color-white)]",
};

const ICON_TONES: Record<AlertTone, string> = {
  error: "text-[var(--color-action)]",
  success: "text-[var(--color-success-600)]",
  info: "text-[var(--color-text-muted)]",
};

type AlertProps = {
  tone?: AlertTone;
  title: string;
  children?: ReactNode;
  className?: string;
};

export function Alert({
  tone = "info",
  title,
  children,
  className,
}: AlertProps) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-md border p-[var(--space-4)]",
        TONES[tone],
        className,
      )}
    >
      <span className={cn("shrink-0", ICON_TONES[tone])}>
        {tone === "success" ? <SuccessIcon /> : <ErrorIcon className="mt-0" />}
      </span>
      <div className="text-ink-950">
        <p className="font-body text-body font-semibold">{title}</p>
        {children ? (
          <div className="mt-1 text-small text-[var(--color-text-secondary)]">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SuccessIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="7.5" />
      <path d="m6.75 10.25 2.25 2.25 4.25-4.75" />
    </svg>
  );
}
