import type { Metadata } from "next";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { CONTACT } from "@/components/navigation/nav";

/**
 * Quote and mockup request — Design System §08 Quote and mockup form,
 * §14 Manual-first workflow, §06 Layout.
 *
 * The 640px form container (§06), and one job on the page: send a request that
 * a person can answer. Nothing here promises a price, a preview or a response
 * time — §14 keeps the workflow manual until demand is proven, and
 * non-negotiable #6 rules out publishing lead times.
 */

export const metadata: Metadata = {
  title: "Request a Quote or Mockup",
  description:
    "Send your product, branding, quantity and destination. A person reviews every request before confirming the next practical step.",
};

export default function QuotePage() {
  return (
    <>
      <Section theme="light" width="form" density="compact">
        <Breadcrumb items={[{ label: "Request a Quote or Mockup" }]} />
      </Section>

      <Section theme="light" width="form" density="compact">
        <SectionHeader
          as="h1"
          eyebrow="Quote and mockup request"
          title="Tell us what you need made."
          description="Two short steps: what the product is, then how we reach you. A person reads every request — you will not get an automated price."
        />
      </Section>

      <Section theme="white" width="form">
        <QuoteForm />
      </Section>

      <Section theme="light" width="form" density="compact">
        <p className="text-small text-[var(--color-text-secondary)]">
          Prefer email? Write to{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="rounded-sm font-semibold text-[var(--color-text)] underline underline-offset-4"
          >
            {CONTACT.email}
          </a>{" "}
          with the same details and we will pick it up from there.
        </p>
      </Section>
    </>
  );
}
