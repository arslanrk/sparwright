import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CallToAction } from "@/components/content/CallToAction";
import { ProcessStepper } from "@/components/content/ProcessStepper";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { HOW_IT_WORKS_READY, PROCESS_STAGES } from "@/lib/process";

/**
 * How It Works — how a custom order runs, stage by stage.
 *
 * A STARTER PAGE. The design and the long-form content are still to come; for
 * now it carries the same five stages as the homepage section (one shared
 * list, `PROCESS_STAGES`), so it is never blank. Until `HOW_IT_WORKS_READY`
 * is set it stays out of search and the sitemap — the stepper alone repeats
 * the homepage word for word.
 *
 * What it is being built for: each stage expanded — what the buyer sends, what
 * comes back, what is signed off and what is checked — which is the detail a
 * search for "how custom boxing gloves are made" is asking for.
 */

export const metadata: Metadata = pageMetadata({
  path: "/how-it-works",
  title: "How It Works",
  description:
    "How a custom boxing glove, fightwear or club apparel order runs — from your brief and an approved sample to bulk production, quality checks and export.",
  extra: HOW_IT_WORKS_READY ? {} : { robots: { index: false, follow: true } },
});

export default function HowItWorksPage() {
  return (
    <>
      <Section theme="light" width="work" density="compact">
        <Breadcrumb items={[{ label: "How It Works" }]} />
      </Section>

      <Section theme="light" width="work" density="compact">
        <SectionHeader
          as="h1"
          eyebrow="How it works"
          title="How a custom fight gear order is made."
          description="From your brief to a shipped bulk order in five stages — and you sign off each one before the next begins."
        />
      </Section>

      <ProcessStepper
        theme="white"
        eyebrow="The five stages"
        title="From your specification to your door."
        stages={PROCESS_STAGES}
      />

      <CallToAction
        title="Tell us what you want made."
        description="Send the product, your logo, a rough quantity and where it ships. A person replies — with any questions left, not an automated quote."
        action={{ label: CTA.quote, href: "/quote" }}
        secondaryAction={{ label: CTA.mockup, href: "/quote?intent=mockup" }}
      />
    </>
  );
}
