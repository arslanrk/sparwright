import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * SectionHeader — Design System §05 Typography and §02 visual decision rules.
 *
 * One dominant message per section. The eyebrow is a muted label (§04 Slate)
 * led by a short Forge rule. The rule is the only red in it: it is decorative,
 * so it needs no text contrast, while the label stays muted and an optional
 * section number takes the body colour. Small Forge type would fail §12 on the
 * dark band (4.21:1), which is why the red is a shape and not the words.
 */

type SectionHeaderProps = {
  eyebrow?: string;
  /**
   * Position of the section on its page, e.g. "03". The homepage numbers its
   * sections so the page reads as one numbered sheet; other pages omit it.
   */
  index?: string;
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
  index,
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
      {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
      <Heading className={cn(TITLE_SIZE[Heading], eyebrow ? "mt-4" : "")}>
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

/**
 * The eyebrow on its own, for a section that needs the label without a full
 * header — or as the text of a heading (`as="span"` inside an h2).
 */
export function Eyebrow({
  index,
  as: Tag = "p",
  className,
  children,
}: {
  index?: string;
  as?: "p" | "span";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-3 text-eyebrow uppercase text-[var(--color-text-muted)]",
        className,
      )}
    >
      <span aria-hidden="true" className="h-0.5 w-6 shrink-0 rounded-full bg-forge-600" />
      {index ? (
        <>
          <span className="font-display font-bold tabular-nums tracking-normal text-[var(--color-text)]">
            {index}
          </span>
          <span aria-hidden="true" className="text-[var(--color-border-strong)]">
            ·
          </span>
        </>
      ) : null}
      <span>{children}</span>
    </Tag>
  );
}
