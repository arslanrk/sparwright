import Link from "next/link";
import type { ReactNode } from "react";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { cn } from "@/lib/cn";
import type { ProductFaq } from "@/lib/products";

/**
 * FAQGroups — an FAQ section grouped by what the reader is deciding. A
 * sticky rail holds the header, the topics as jump links (from `lg`) and a
 * way to ask what is not listed; the groups run beside it as one accordion,
 * numbered through, one answer open at a time.
 *
 * Native `<details>` underneath (see `FAQAccordion`), so every answer is in
 * the HTML for search and works without script. The page still emits the
 * FAQ structured data from the same items.
 */

export type FAQGroup = { id: string; title: string; icon: ReactNode; items: ProductFaq[] };

export function FAQGroups({
  theme,
  eyebrow,
  index,
  title,
  groups,
  name,
  contactHref = "/contact",
}: {
  theme: "white" | "light";
  eyebrow: string;
  index?: string;
  title: string;
  groups: FAQGroup[];
  /** Shared `<details name>`, so one answer is open at a time. */
  name: string;
  contactHref?: string;
}) {
  return (
    <Section theme={theme} width="shell">
      <div className="grid grid-cols-1 gap-[var(--space-8)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-[var(--space-9)]">
        <div className="lg:sticky lg:top-[calc(var(--header-height)+var(--space-6))] lg:self-start">
          <SectionHeader eyebrow={eyebrow} index={index} title={title} />

          <nav aria-label="FAQ topics" className="mt-[var(--space-6)] hidden lg:block">
            <ol className="flex flex-col gap-2">
              {groups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#faq-${group.id}`}
                    className="group flex items-center gap-4 rounded-xl border border-[var(--color-border)] p-3 pr-[var(--space-4)] transition-colors hover:border-forge-600/50 hover:bg-[var(--color-surface)]"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface)] text-forge-600 transition-colors group-hover:bg-forge-600 group-hover:text-white"
                    >
                      {group.icon}
                    </span>
                    <span className="flex-1">
                      <span className="block font-body text-body font-semibold">{group.title}</span>
                      <span className="block text-small text-[var(--color-text-secondary)]">
                        {group.items.length} questions
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-[var(--color-text-muted)] transition-colors group-hover:text-forge-600">
                      <svg viewBox="0 0 16 16" className="size-4 rotate-90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <NotListed href={contactHref} className="mt-[var(--space-5)] hidden lg:block" />
        </div>

        <div className="flex flex-col gap-[var(--space-7)]">
          {groups.map((group, g) => (
            <div key={group.id} id={`faq-${group.id}`} className="scroll-mt-[calc(var(--header-height)+var(--space-5))]">
              <h3 className="flex items-center gap-3 border-b border-[var(--color-border)] pb-[var(--space-3)] text-eyebrow uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                <span aria-hidden="true" className="h-0.5 w-6 bg-forge-600" />
                {group.title}
              </h3>
              <FAQAccordion
                items={group.items}
                name={name}
                start={groups.slice(0, g).reduce((n, prev) => n + prev.items.length, 1)}
                openFirst={g === 0}
                className="mt-[var(--space-4)]"
              />
            </div>
          ))}
          <NotListed href={contactHref} className="lg:hidden" />
        </div>
      </div>
    </Section>
  );
}

/** The way out: for whatever the list does not cover. */
function NotListed({ href, className }: { href: string; className?: string }) {
  return (
    <div
      data-theme="dark"
      className={cn("relative overflow-hidden rounded-2xl bg-[var(--color-bg)] p-[var(--space-6)] text-[var(--color-text)]", className)}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-forge-600/25 blur-3xl" />
      <p className="relative font-body text-body-large font-semibold">Question not listed?</p>
      <p className="relative mt-2 text-small text-[var(--color-text-secondary)]">
        Put it in your brief — every request is read by a person — or{" "}
        <Link href={href} className="font-semibold text-white underline decoration-forge-600 decoration-2 underline-offset-4 hover:text-forge-600">
          contact the team
        </Link>
        .
      </p>
    </div>
  );
}
