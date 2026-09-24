import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { CallToAction } from "@/components/content/CallToAction";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { TextLink } from "@/components/foundation/TextLink";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  PORTFOLIO,
  PORTFOLIO_CATEGORIES,
  hasPortfolio,
  type PortfolioItem,
} from "@/lib/portfolio";

/**
 * Portfolio — finished orders, by collection.
 *
 * Until `PORTFOLIO` has a real entry the page is an honest empty state: it
 * says the work is being photographed and offers the mockup instead, which is
 * the one thing a buyer can see of their own order before it exists. It is
 * kept out of search (`robots`) and out of the sitemap until then, so an empty
 * page is never the first thing a buyer finds. Adding an entry is all it takes
 * to switch the grid on.
 */

export const metadata: Metadata = pageMetadata({
  path: "/portfolio",
  title: "Portfolio",
  description:
    "Custom boxing gloves, fightwear, lifting gear and club kit made for gyms, clubs and brands — finished orders, photographed.",
  extra: hasPortfolio ? {} : { robots: { index: false, follow: true } },
});

export default function PortfolioPage() {
  return (
    <>
      <Section theme="light" width="work" density="compact">
        <Breadcrumb items={[{ label: "Portfolio" }]} />
      </Section>

      <Section theme="light" width="work" density="compact">
        <SectionHeader
          as="h1"
          eyebrow="Portfolio"
          title="Work made to a buyer's specification."
          description="Finished orders for gyms, clubs and brands, grouped by collection — each with what the buyer chose to customise."
        />
      </Section>

      <Section theme="white" width="work">
        {hasPortfolio ? <PortfolioGrid items={PORTFOLIO} /> : <EmptyState />}
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

function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="flex flex-col gap-[var(--space-8)]">
      {PORTFOLIO_CATEGORIES.map((category) => {
        const work = items.filter((item) => item.category === category);
        if (work.length === 0) return null;
        return (
          <section key={category} aria-labelledby={`portfolio-${category}`}>
            <h2
              id={`portfolio-${category}`}
              className="flex items-center gap-[var(--space-4)] text-eyebrow uppercase text-[var(--color-text-muted)]"
            >
              <span className="shrink-0">{category}</span>
              <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-border)]" />
            </h2>
            <ul className="mt-[var(--space-5)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-3">
              {work.map((item) => (
                <li key={item.title}>
                  <article className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={item.photo.src}
                        alt={item.photo.alt}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-[var(--space-5)]">
                      <h3 className="text-heading-4">{item.title}</h3>
                      <p className="mt-1 text-small text-[var(--color-text-muted)]">
                        {item.client}
                      </p>
                      <ul className="mt-[var(--space-4)] flex flex-wrap gap-2">
                        {item.customised.map((detail) => (
                          <li
                            key={detail}
                            className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[0.75rem] font-medium text-[var(--color-text-secondary)]"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/**
 * No invented work. The collections the portfolio will be organised by are
 * shown so the page still explains itself, and the mockup is offered as the
 * way to see something now.
 */
function EmptyState() {
  return (
    <div className="mx-auto max-w-copy text-center">
      <span
        aria-hidden="true"
        className="mx-auto flex size-14 items-center justify-center rounded-full border border-dashed border-[var(--color-border-strong)] text-[var(--color-text-muted)]"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="M8 5l1.5-2h5L16 5" />
        </svg>
      </span>
      <h2 className="mt-[var(--space-5)] text-heading-3">
        Finished orders are being photographed.
      </h2>
      <p className="mt-[var(--space-4)] text-body-large text-[var(--color-text-secondary)]">
        This page will show real work, with what each buyer chose to customise
        — nothing staged and nothing borrowed. Until it is up, the quickest way
        to see what we would make for you is a mockup of your own product.
      </p>

      <ul
        aria-label="Collections the portfolio will cover"
        className="mt-[var(--space-6)] flex flex-wrap justify-center gap-2"
      >
        {PORTFOLIO_CATEGORIES.map((category) => (
          <li
            key={category}
            className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-small font-medium text-[var(--color-text-secondary)]"
          >
            {category}
          </li>
        ))}
      </ul>

      <div className="mt-[var(--space-6)] flex flex-wrap items-center justify-center gap-x-[var(--space-6)] gap-y-3">
        <TextLink href="/quote?intent=mockup">{CTA.mockup}</TextLink>
        <TextLink href="/products">{CTA.products}</TextLink>
      </div>
    </div>
  );
}
