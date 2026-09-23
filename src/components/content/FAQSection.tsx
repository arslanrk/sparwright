import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Button } from "@/components/foundation/Button";
import { Section, type SectionTheme } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { cn } from "@/lib/cn";
import type { FaqGroup } from "@/lib/faq";

/**
 * FAQSection — the homepage's grouped FAQ.
 *
 * Two columns from `lg`. The left one holds the heading and a dark card for
 * the question that is not on the list, and stays in view while the questions
 * scroll past it. The right column is the groups themselves, numbered in one
 * run so "question 07" means the same thing wherever it is referred to. The
 * first question starts open, and opening another closes it.
 *
 * Below `lg` the card moves under the questions, where someone who read to the
 * end without finding their answer arrives at it.
 */

type FAQSectionProps = {
  groups: FaqGroup[];
  eyebrow: string;
  title: string;
  description: string;
  theme?: SectionTheme;
  /** Where the "ask us" card sends someone whose question is not listed. */
  action: { label: string; href: string };
};

export function FAQSection({
  groups,
  eyebrow,
  title,
  description,
  theme = "white",
  action,
}: FAQSectionProps) {
  // Running number of the first question in each group.
  const starts = groups.reduce<number[]>(
    (acc, group, i) => [...acc, i === 0 ? 1 : acc[i - 1] + groups[i - 1].items.length],
    [],
  );

  return (
    <Section theme={theme} width="work">
      <div className="grid gap-[var(--space-7)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-[var(--space-9)]">
        {/*
          The left column. Below `lg` it dissolves (`contents`) so its two
          parts can sit either side of the questions: heading first, card last.
          It only sticks on a screen tall enough to show all of it — a sticky
          column taller than the viewport hides its own bottom for good.
        */}
        <div
          className={cn(
            "contents lg:col-start-1 lg:row-start-1 lg:block lg:self-start",
            "[@media(min-width:64rem)_and_(min-height:50rem)]:sticky",
            "[@media(min-width:64rem)_and_(min-height:50rem)]:top-[calc(var(--header-height)+var(--space-6))]",
          )}
        >
          <div className="order-1">
            <SectionHeader eyebrow={eyebrow} title={title} description={description} />
          </div>
          <AskCard action={action} className="order-3 lg:mt-[var(--space-7)]" />
        </div>

        <div className="order-2 flex flex-col gap-[var(--space-7)] lg:col-start-2 lg:row-start-1">
          {groups.map((group, i) => (
            <div key={group.id} id={group.id}>
              <h3 className="mb-[var(--space-4)] flex items-center gap-[var(--space-4)] text-eyebrow uppercase text-[var(--color-text-muted)]">
                <span className="shrink-0">{group.label}</span>
                <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-border)]" />
              </h3>
              {/* One shared name: the whole list opens one answer at a time,
                  starting with the first. */}
              <FAQAccordion
                items={group.items}
                start={starts[i]}
                name="site-faq"
                openFirst={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** The question that is not on the list: a person, not a form, answers it. */
function AskCard({
  action,
  className,
}: {
  action: FAQSectionProps["action"];
  className?: string;
}) {
  return (
    <div
      data-theme="dark"
      className={cn(
        "relative overflow-hidden rounded-xl bg-[var(--color-bg)] p-[var(--space-6)] text-[var(--color-text)]",
        className,
      )}
    >
      {/* A Forge glow in the corner — the one warm note in the column. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[radial-gradient(closest-side,rgb(216_58_32/0.35),transparent)]"
      />
      <p className="relative text-eyebrow uppercase text-[var(--color-text-muted)]">
        Not on the list?
      </p>
      <p className="relative mt-2 font-display text-heading-4">
        Ask a person, not a form.
      </p>
      <p className="relative mt-2 text-small text-[var(--color-text-secondary)]">
        Send your question with whatever you have so far. Every request is
        read by the team, and the reply asks for anything missing.
      </p>
      <div className="relative mt-[var(--space-5)]">
        <Button href={action.href} variant="inverse" arrow>
          {action.label}
        </Button>
      </div>
    </div>
  );
}
