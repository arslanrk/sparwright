import {
  AudienceCard,
  type AudienceCardItem,
} from "@/components/content/AudienceCard";
import { CallToAction } from "@/components/content/CallToAction";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import {
  CustomizationCard,
  type CustomizationItem,
} from "@/components/content/CustomizationCard";
import { HeroBanner } from "@/components/content/HeroBanner";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import {
  ProcessStepper,
  type ProcessStage,
} from "@/components/content/ProcessStepper";
import { ProductShowcase } from "@/components/content/ProductShowcase";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { TextLink } from "@/components/foundation/TextLink";
import { CTA } from "@/components/foundation/cta";
import { SITE_FAQS } from "@/lib/faq";
import { PRODUCT_RANGE } from "@/lib/product-range";

/**
 * Homepage — Design System §11 Homepage order, §A Starter copy library.
 *
 * Section stack: hero, products, audiences, customization, process,
 * manufacturing, final CTA. §11 illustrates the recommended stack as a figure
 * rather than an ordered list, so this is the roadmap's stated assumption; the
 * roadmap flags it for confirmation before merge.
 *
 * §08 specifies the four proof points twice — once as the Hero's own "Proof"
 * field and again as the proof bar beneath it. Running both would state the
 * same four things twice in a row, so they live in the hero, where they carry
 * the photograph. `ProofBar` is still available for a page that wants the
 * expanded form.
 *
 * There is no case-study or testimonial section here, deliberately: §11 says to
 * remove it until genuine evidence exists, and non-negotiable #12 says the same.
 */

/**
 * §08 Hero "Proof".
 *
 * §08 gives these as "10+ Years; Custom Branding; Sample Before Bulk; Made in
 * Sialkot". Two of those are supplier credentials rather than buyer outcomes —
 * how long we have traded, and where we are — and the brief is to sell what the
 * buyer gets. Origin still earns its place on /manufacturing, where a buyer
 * doing due diligence goes looking for it.
 *
 * What replaced them has to clear non-negotiables #5 and #6 the same way: every
 * line here is a commitment the rest of the site already makes, and none of it
 * is a throughput figure, a customer count, an MOQ or a lead time.
 */
const HERO_PROOF = [
  "Custom club and private-label branding",
  "Approved sample before bulk production",
  "Gloves and apparel under one identity",
  "Your artwork and specs kept for reorders",
];

/** Headings and body copy taken verbatim from the §A audience-page heroes. */
const AUDIENCES: AudienceCardItem[] = [
  {
    eyebrow: "For clubs and gyms",
    title: "Put your club identity across the entire kit.",
    description:
      "Custom gloves, fightwear and apparel created around your club colours, logo and practical ordering requirements.",
    href: "/for-clubs",
    action: CTA.clubKit,
  },
  {
    eyebrow: "Private label",
    title: "Your fightwear brand, supported by a clear manufacturing process.",
    description:
      "Develop products, labels and packaging through an approved sample before bulk production begins.",
    href: "/private-label",
    action: CTA.privateLabel,
  },
];

/** §08 Customization panel, verbatim. */
const CUSTOMIZATION: CustomizationItem[] = [
  {
    tag: "Branding",
    title: "Your brand",
    description:
      "Logo placement, print, patch, label or embroidery where suitable.",
  },
  {
    tag: "Colour",
    title: "Your colours",
    description: "Club or brand colour combinations with agreed references.",
  },
  {
    tag: "Construction",
    title: "Your construction",
    description:
      "Materials, padding, closure, stitching and performance requirement.",
  },
  {
    tag: "Packaging",
    title: "Your packaging",
    description: "Labels, bags, boxes, inserts and export cartons.",
  },
];

/** §08 Process stepper, verbatim. */
const STAGES: ProcessStage[] = [
  {
    number: "01",
    title: "Share requirements",
    outcome: "Product, quantity, logo, use case and destination are captured.",
  },
  {
    number: "02",
    title: "Review the concept",
    outcome: "Colours, logo placement and initial specifications are aligned.",
  },
  {
    number: "03",
    title: "Approve the sample",
    outcome: "Materials, construction, sizing and finish are confirmed.",
  },
  {
    number: "04",
    title: "Production and QC",
    outcome: "Bulk is made against the approved specification and checked.",
  },
  {
    number: "05",
    title: "Packing and delivery",
    outcome:
      "Final quantity, packing and shipment documentation are completed.",
  },
];

export default function Home() {
  return (
    <>
      <HeroBanner
        eyebrow="Custom fight gear manufacturer"
        title="Custom boxing gloves and fightwear, built to your specification."
        description="Gloves, fightwear and club apparel made with your logo, your colours and your construction — approved on a sample before anything goes to bulk."
        proof={HERO_PROOF}
        actions={
          <>
            <Button
              href="/quote?intent=mockup"
              variant="primary"
              arrow
              data-analytics="hero_mockup_click"
              data-analytics-surface="hero"
            >
              {CTA.mockup}
            </Button>
            <Button href="/products" variant="secondary">
              {CTA.products}
            </Button>
          </>
        }
      />

      <Section theme="light" width="work">
        {/*
          The range, not the routing. A cold buyer's first question is whether
          we make their product at all, and two catalogue cards do not answer
          it — the seven §08 product choices do. Each entry still routes to
          whichever of the two pages covers it.

          The section keeps its own heading outside the panel, so the panel is
          the product and nothing else.
        */}
        <SectionHeader
          eyebrow="Custom product range"
          title="Custom gloves, fightwear and club apparel."
          description="Every product is made to a specification you approve. Step through the range to see what gets decided before anything is cut."
        />
        <div className="mt-[var(--space-6)]">
          <ProductShowcase items={PRODUCT_RANGE} action={CTA.exploreProduct} />
        </div>
        <div className="mt-[var(--space-5)]">
          <TextLink href="/products">{CTA.products}</TextLink>
        </div>
      </Section>

      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Who we manufacture for"
          title="Two ways buyers work with us."
          description="Clubs ordering a coordinated kit, and brands developing their own products against an approved specification."
        />
        <div className="mt-[var(--space-7)] grid gap-[var(--space-5)] lg:grid-cols-2">
          {AUDIENCES.map((audience) => (
            <AudienceCard key={audience.href} item={audience} />
          ))}
        </div>
      </Section>

      <Section theme="dark" width="work">
        <SectionHeader
          eyebrow="Customization"
          title="See your club identity before production."
          description={
            <>
              Upload your logo and send your product requirements. We&rsquo;ll
              review the practical concept or sampling step before bulk
              production.
            </>
          }
        />
        <div className="mt-[var(--space-7)] grid gap-[var(--space-6)] sm:grid-cols-2 lg:grid-cols-4">
          {CUSTOMIZATION.map((item) => (
            <CustomizationCard key={item.tag} item={item} />
          ))}
        </div>
        <div className="mt-[var(--space-7)]">
          <Button
            href="/quote?intent=mockup"
            variant="inverse"
            arrow
            data-analytics="hero_mockup_click"
          >
            {CTA.mockup}
          </Button>
        </div>
      </Section>

      <ProcessStepper
        id="how-it-works"
        eyebrow="How it works"
        title="From requirements to delivery."
        description="Five stages, each with something specific for you to approve before the next one begins."
        stages={STAGES}
      />

      <Section theme="white" width="work">
        <div className="grid items-center gap-[var(--space-7)] lg:grid-cols-2">
          <div>
            {/*
              §10 headline formula, proof + stage. The §A manufacturing intro
              leads on years traded and location; both are supplier credentials,
              and they still open /manufacturing, where a buyer checking us out
              goes looking for them.
            */}
            <SectionHeader
              eyebrow="Manufacturing"
              title="Manufacturing you can inspect before bulk."
              description="Clear product requirements, a sample you sign off, and checks recorded against that sample before anything is packed. Nothing about the process is a black box."
            />
            <div className="mt-[var(--space-6)]">
              <Button href="/manufacturing" variant="secondary">
                {CTA.manufacturing}
              </Button>
            </div>
          </div>
          <ImagePlaceholder shot="Stitching process" ratio="process" />
        </div>
      </Section>

      <Section theme="light" width="copy">
        <SectionHeader
          eyebrow="Questions"
          title="The nine things buyers ask first."
          description="If your question is not here, send it with your requirements — a person reads every request."
        />
        <FAQAccordion items={SITE_FAQS} className="mt-[var(--space-6)]" />
      </Section>

      {/* §A gives this action as "REQUEST A QUOTE"; the §08 CTA library is
          normative for labels, so it renders as "Get a Manufacturing Quote". */}
      <CallToAction
        title="Ready to develop your custom fight gear?"
        description="Send your product, branding, quantity and destination."
        action={{
          label: CTA.quote,
          href: "/quote",
          analytics: "hero_quote_click",
        }}
      />
    </>
  );
}
