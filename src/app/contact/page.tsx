import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { CONTACT, whatsappHref } from "@/components/navigation/nav";
import { starterMetadata } from "@/lib/metadata";
import { CONTACT_PAGE } from "@/lib/site-sections";

/**
 * Contact — the ways to reach the team, most useful first.
 *
 * The brief leads because it is what gets a useful first reply; email and
 * WhatsApp follow. WhatsApp appears only once a real number is configured
 * (`NEXT_PUBLIC_WHATSAPP_NUMBER`) — never a dead link. No phone number and no
 * response time are published until there is one to stand behind (#5, #6).
 *
 * Kept noindex until the contact details are confirmed: `CONTACT.email` is
 * still a placeholder on the launch checklist.
 */

export const metadata: Metadata = starterMetadata({
  path: CONTACT_PAGE.href,
  title: "Contact",
  description:
    "Contact Sparwright, a custom fight gear manufacturer in Sialkot, Pakistan. Send a brief, email the team or message us.",
  ready: CONTACT_PAGE.ready,
});

function ContactCard({
  eyebrow,
  title,
  children,
  featured = false,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  featured?: boolean;
}) {
  return (
    <li
      data-theme={featured ? "dark" : undefined}
      className={
        featured
          ? "flex flex-col rounded-xl bg-[var(--color-bg)] p-[var(--space-6)] text-[var(--color-text)]"
          : "flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6)]"
      }
    >
      <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">{eyebrow}</p>
      <h2 className="mt-2 text-heading-4">{title}</h2>
      <div className="mt-3 flex flex-1 flex-col text-body text-[var(--color-text-secondary)]">
        {children}
      </div>
    </li>
  );
}

const LINK =
  "mt-auto inline-flex items-center gap-2 pt-[var(--space-5)] font-body text-body font-semibold text-[var(--color-text)] underline-offset-4 hover:underline";

export default function ContactPage() {
  const whatsapp = whatsappHref();

  return (
    <>
      <Section theme="light" width="work" density="compact">
        <Breadcrumb items={[{ label: CONTACT_PAGE.label }]} />
      </Section>

      <Section theme="light" width="work" density="compact">
        <SectionHeader
          as="h1"
          eyebrow="Contact"
          title="Talk to the team in Sialkot."
          description="A person reads every message and replies with any questions left and the practical next step — not an automated quote."
        />
      </Section>

      <Section theme="white" width="work">
        <ul className="grid gap-[var(--space-5)] md:grid-cols-2 lg:grid-cols-3">
          <ContactCard eyebrow="Best first step" title="Send your brief" featured>
            <p>
              The product, your logo, a rough quantity and where it ships. It
              gets the most useful first reply.
            </p>
            <Link href="/quote" className={LINK}>
              {CTA.quote}
              <span aria-hidden="true" className="text-forge-600">→</span>
            </Link>
          </ContactCard>

          <ContactCard eyebrow="Email" title="Write to us">
            {/* Shown as text: a mail link does not always open a client. */}
            <p className="font-semibold text-[var(--color-text)]">{CONTACT.email}</p>
            <p className="mt-2">Attach artwork or reference photos if you have them.</p>
            <a
              href={`mailto:${CONTACT.email}`}
              data-analytics="email_click"
              className={LINK}
            >
              Open in your email app
              <span aria-hidden="true" className="text-forge-600">→</span>
            </a>
          </ContactCard>

          {whatsapp ? (
            <ContactCard eyebrow="WhatsApp" title="Message us">
              <p>Quick questions before you send a full brief.</p>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="whatsapp_click"
                className={LINK}
              >
                Open WhatsApp
                <span aria-hidden="true" className="text-forge-600">→</span>
              </a>
            </ContactCard>
          ) : null}

          <ContactCard eyebrow="Location" title="Where we make">
            <p className="font-semibold text-[var(--color-text)]">{CONTACT.location}</p>
            <p className="mt-2">
              Our workshop, where every order is cut, stitched and checked.
            </p>
            <Link href="/about/factory-tour" className={LINK}>
              Take the factory tour
              <span aria-hidden="true" className="text-forge-600">→</span>
            </Link>
          </ContactCard>
        </ul>
      </Section>
    </>
  );
}
