import type { Metadata } from "next";
import {
  LegalPage,
  PendingLegalDetail,
  type LegalSection,
} from "@/components/content/LegalPage";
import { CONTACT } from "@/components/navigation/nav";

/**
 * Privacy — Design System §11 Legal row.
 *
 * This describes what the site actually does today: a quote form that emails a
 * person, a consent choice stored in the browser, and nothing else. It claims
 * no certification, names no processor we have not chosen, and leaves the
 * company identification as a marked gap rather than inventing an entity
 * (non-negotiable #5). Have it reviewed by someone qualified before launch —
 * the PR 13 checklist blocks on it.
 */

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What we collect when you send a quote or mockup request, why we hold it, and how to ask us to delete it.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "What this covers",
    paragraphs: [
      "This page explains what happens to information you send us through this website. It is written to be read, not to be survived.",
    ],
  },
  {
    heading: "What we collect",
    paragraphs: [
      "Only what you type into the quote and mockup form, and only when you submit it:",
    ],
    bullets: [
      "Your product requirements: category, product type, quantity, intended use, materials, colours, reference products and target delivery month.",
      "Your contact details: name, club or business, destination country, email address, phone or WhatsApp number, website or social handle, and your preferred contact method.",
      "Any notes you add, and any logo artwork you choose to upload.",
    ],
  },
  {
    heading: "What we do with it",
    paragraphs: [
      "We use it to answer your enquiry: to work out what is practical, to prepare a quote or a sample, and to contact you about it. A person reads every request — there is no automated pricing or profiling behind this form.",
      "We do not sell your information, and we do not use it to send marketing you did not ask for.",
    ],
  },
  {
    heading: "Artwork you upload",
    paragraphs: [
      "Logo artwork is used to assess whether it suits the branding method you want, and to produce your order if you go ahead. We keep approved artwork and specifications so a reorder can be produced against the same reference — that retention is the point of it. Ask us to delete it and we will.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "The site stores your cookie choice in your browser so it does not have to keep asking. That choice is not sent to us and is not shared with anyone. Nothing beyond that runs unless you accept analytics cookies — the cookie page sets out exactly what those are.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "Enquiries that do not become orders are kept while they might still be useful to you and to us, and then deleted. Records connected to an order — approved artwork, specifications and inspection records — are kept so we can reproduce that order accurately.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Email us and we will deal with it. If you are in the UK or the EU, you also have the right to complain to your data protection authority.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      intro="What we collect when you send a request, why we hold it, and how to ask us to delete it."
      updated="September 2026"
      sections={SECTIONS}
      footer={
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]">
          <h2 className="font-body text-body font-semibold">Contact us</h2>
          <p className="mt-2 text-body text-[var(--color-text-secondary)]">
            For anything on this page, email{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-sm font-semibold text-[var(--color-text)] underline underline-offset-4"
            >
              {CONTACT.email}
            </a>
            .
          </p>
          <p className="mt-4 flex flex-wrap gap-2 text-small">
            <PendingLegalDetail>
              Registered company name, number and address
            </PendingLegalDetail>
            <PendingLegalDetail>Data protection contact</PendingLegalDetail>
          </p>
        </div>
      }
    />
  );
}
