import Link from "next/link";
import type { ReactNode } from "react";
import { CallToAction } from "@/components/content/CallToAction";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { cn } from "@/lib/cn";
import type { SiteSection } from "@/lib/site-sections";

/**
 * SectionPageShell — the frame for an About or Resources page.
 *
 * Breadcrumb, the page heading, the page's own body, then the other pages in
 * the same section — so a starter page still leads somewhere — and the quote
 * band. The body is the page's; the shell only guarantees the frame is the
 * same across the section.
 */

type SectionPageShellProps = {
  section: SiteSection;
  /** The section's name in the breadcrumb, e.g. "About Us". */
  sectionLabel: string;
  /** This page's breadcrumb label; omit on the hub itself. */
  pageLabel?: string;
  /** This page's href, so it is left out of "More in this section". */
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function SectionPageShell({
  section,
  sectionLabel,
  pageLabel,
  href,
  eyebrow,
  title,
  description,
  children,
}: SectionPageShellProps) {
  const siblings = section.pages.filter((page) => page.href !== href);

  return (
    <>
      <Section theme="light" width="work" density="compact">
        <Breadcrumb
          items={
            pageLabel
              ? [{ label: sectionLabel, href: section.hub.href }, { label: pageLabel }]
              : [{ label: sectionLabel }]
          }
        />
      </Section>

      <Section theme="light" width="work" density="compact">
        <SectionHeader as="h1" eyebrow={eyebrow} title={title} description={description} />
      </Section>

      {children}

      <Section theme="white" width="work">
        <SectionHeader
          eyebrow={pageLabel ? `More in ${sectionLabel}` : sectionLabel}
          title={pageLabel ? "Keep reading" : "In this section"}
        />
        <ul className="mt-[var(--space-6)] grid gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-3">
          {siblings.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className={cn(
                  "group flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]",
                  "transition-[border-color,transform] duration-200 ease-standard hover:border-forge-600/60 motion-safe:hover:-translate-y-0.5",
                )}
              >
                <span className="flex items-center justify-between gap-3 font-body text-body-large font-semibold text-[var(--color-text)]">
                  {page.label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="size-4 shrink-0 text-forge-600 transition-transform motion-safe:group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                  </svg>
                </span>
                <span className="mt-2 text-small text-[var(--color-text-secondary)]">
                  {page.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction
        title="Tell us what you want made."
        description="Send the product, your logo, a rough quantity and where it ships. A person replies — with any questions left, not an automated quote."
        action={{ label: CTA.quote, href: "/quote" }}
        secondaryAction={{ label: CTA.mockup, href: "/quote?intent=mockup" }}
      />
    </>
  );
}

/** Honest placeholder for a page whose real material does not exist yet. */
export function ComingSoon({
  title,
  body,
  links,
}: {
  title: string;
  body: string;
  links: { label: string; href: string }[];
}) {
  return (
    <Section theme="white" width="copy">
      <div className="text-center">
        <span
          aria-hidden="true"
          className="mx-auto flex size-14 items-center justify-center rounded-full border border-dashed border-[var(--color-border-strong)] text-[var(--color-text-muted)]"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 7v5l3 2" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </span>
        <h2 className="mt-[var(--space-5)] text-heading-3">{title}</h2>
        <p className="mt-[var(--space-4)] text-body-large text-[var(--color-text-secondary)]">{body}</p>
        <div className="mt-[var(--space-6)] flex flex-wrap justify-center gap-x-[var(--space-6)] gap-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 font-body text-body font-semibold text-[var(--color-text)] underline-offset-4 hover:underline"
            >
              {link.label}
              <span aria-hidden="true" className="text-forge-600">→</span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
