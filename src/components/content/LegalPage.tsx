import type { ReactNode } from "react";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

/**
 * LegalPage — Design System §06 Layout (720px prose), §11 Legal row.
 *
 * One shell for the three legal pages so they read as one document set. The
 * 720px container is the §06 prose width; legal text is the clearest case for
 * it on the whole site.
 */

export type LegalSection = {
  heading: string;
  /** Paragraphs. A string array keeps the content free of markup. */
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  /** Stated plainly, because "last updated" is the first thing a reader checks. */
  updated: string;
  sections: LegalSection[];
  footer?: ReactNode;
};

export function LegalPage({
  title,
  intro,
  updated,
  sections,
  footer,
}: LegalPageProps) {
  return (
    <>
      <Section theme="light" width="copy" density="compact">
        <Breadcrumb items={[{ label: title }]} />
      </Section>

      <Section theme="light" width="copy" density="compact">
        <SectionHeader as="h1" title={title} description={intro} />
        <p className="mt-[var(--space-5)] text-small text-[var(--color-text-muted)]">
          Last updated: {updated}
        </p>
      </Section>

      <Section theme="white" width="copy">
        <div className="flex flex-col gap-[var(--space-7)]">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-heading-3">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-body text-[var(--color-text-secondary)]"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-body text-[var(--color-text-secondary)]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
        {footer ? <div className="mt-[var(--space-7)]">{footer}</div> : null}
      </Section>
    </>
  );
}

/**
 * A visible gap where a company detail belongs. Non-negotiable #5 rules out
 * inventing a legal entity, registration number or governing jurisdiction, and
 * a legal page is the worst possible place to guess. PR 13 blocks on these.
 */
export function PendingLegalDetail({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm border border-dashed border-[var(--color-border)] px-2 py-0.5 text-small text-[var(--color-text-muted)]">
      {children} — to be confirmed before launch
    </span>
  );
}
