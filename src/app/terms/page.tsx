import type { Metadata } from "next";
import {
  LegalPage,
  PendingLegalDetail,
  type LegalSection,
} from "@/components/content/LegalPage";
import { CONTACT } from "@/components/navigation/nav";

/**
 * Terms — Design System §11 Legal row.
 *
 * Terms for using the website and for how an enquiry becomes an order. It
 * commits to nothing the site does not already do: no MOQ, no lead time, no
 * warranty period invented for the sake of having one (non-negotiables #5, #6).
 * Company identification and governing law are marked gaps — guessing a
 * jurisdiction would be worse than leaving it blank. Have this reviewed by
 * someone qualified before launch.
 */

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms for using this website, and how a quote request becomes a confirmed order.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Using this website",
    paragraphs: [
      "You are welcome to browse this site and send us a request. Please do not misuse it — no attempting to break it, scrape it wholesale, or use it to send anything unlawful.",
      "The text, layout and product photography on this site belong to us. Ask before republishing them.",
    ],
  },
  {
    heading: "Quotes are not offers",
    paragraphs: [
      "Nothing on this site is a priced offer. Sending the quote or mockup form starts a conversation: we review what you need and reply with what is practical. A quote we send you is valid for the period stated on it and may be revised if your requirements change.",
      "We do not publish minimum order quantities or production lead times, because they depend on the product, the materials and the branding method. Both are confirmed in writing for your specific order.",
    ],
  },
  {
    heading: "Samples and approval",
    paragraphs: [
      "Bulk production begins only after you approve a sample. The approved sample and its written specification are the reference the finished order is made and checked against.",
      "If you ask for changes after approving a sample, they are treated as a new specification and may affect price and timing.",
    ],
  },
  {
    heading: "Your artwork",
    paragraphs: [
      "You keep ownership of any logo or artwork you send us. By sending it you confirm you have the right to have it applied to manufactured products, and you permit us to use it to produce and check your order.",
      "We keep approved artwork and specifications so a reorder can be produced against the same reference. Ask us to delete them and we will, though that means a future reorder has to be developed again.",
    ],
  },
  {
    heading: "Orders, payment and delivery",
    paragraphs: [
      "Payment terms, delivery terms and shipping arrangements are agreed per order and set out in the quote or order confirmation, not here. Import duty and local taxes are the buyer's responsibility unless we agree otherwise in writing.",
    ],
  },
  {
    heading: "If something is wrong",
    paragraphs: [
      "If a delivered order does not match the approved specification, tell us promptly and send photographs. We will look at it against our inspection record for that order and put right what is genuinely our error.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      intro="Terms for using this website, and how a request becomes a confirmed order."
      updated="September 2026"
      sections={SECTIONS}
      footer={
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]">
          <h2 className="font-body text-body font-semibold">
            Company and governing law
          </h2>
          <p className="mt-2 flex flex-wrap gap-2 text-small">
            <PendingLegalDetail>
              Registered company name, number and address
            </PendingLegalDetail>
            <PendingLegalDetail>
              Governing law and jurisdiction
            </PendingLegalDetail>
          </p>
          <p className="mt-4 text-body text-[var(--color-text-secondary)]">
            Questions about these terms? Email{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-sm font-semibold text-[var(--color-text)] underline underline-offset-4"
            >
              {CONTACT.email}
            </a>
            .
          </p>
        </div>
      }
    />
  );
}
