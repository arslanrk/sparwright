import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * SectionHeader — Design System §05 Typography and §02 visual decision rules.
 *
 * One dominant message per section. The eyebrow is a muted label (§04 Slate),
 * not another red accent; keep red for actions and stage numbers.
 */

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Section headings are h2 by default; a page title should pass "h1". */
  as?: "h1" | "h2" | "h3";
  /** §05: do not centre paragraphs longer than two lines. */
  align?: "start" | "center";
  className?: string;
};

const TITLE_SIZE = {
  h1: "text-heading-1",
  h2: "text-heading-2",
  h3: "text-heading-3",
} as const;

export function SectionHeader({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "start",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        align === "center" ? "mx-auto text-center" : "",
        "max-w-copy",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
          {eyebrow}
        </p>
      ) : null}
      <Heading className={cn(TITLE_SIZE[Heading], eyebrow ? "mt-3" : "")}>
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-body-large text-[var(--color-text-secondary)]">
          {description}
        </p>
      ) : null}
    </header>
  );
}
