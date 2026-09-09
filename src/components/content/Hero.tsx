import type { ReactNode } from "react";
import { Section, type SectionTheme } from "@/components/foundation/Container";

/**
 * Hero — Design System §08 Hero component, §05 Typography, §09 Image ratios.
 *
 * Eyebrow, one dominant heading, a body line that states products, Sialkot
 * manufacturing and buyer relevance, then one primary and one secondary action.
 * The media column takes a 5:6 or 4:5 image (§09).
 */

type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  /** Primary first, secondary second — §02 keeps one dominant action. */
  actions: ReactNode;
  media?: ReactNode;
  theme?: SectionTheme;
};

export function Hero({
  eyebrow,
  title,
  description,
  actions,
  media,
  theme = "light",
}: HeroProps) {
  return (
    <Section theme={theme} width="shell" as="section">
      <div className="grid items-center gap-[var(--space-7)] lg:grid-cols-[1.1fr_1fr] lg:gap-[var(--space-8)]">
        <div>
          {eyebrow ? (
            <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-4 text-display-lg">{title}</h1>
          <p className="mt-[var(--space-5)] max-w-copy text-body-large text-[var(--color-text-secondary)]">
            {description}
          </p>
          <div className="mt-[var(--space-6)] flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            {actions}
          </div>
        </div>
        {media ? (
          <div className="lg:justify-self-end lg:w-full">{media}</div>
        ) : null}
      </div>
    </Section>
  );
}
