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
import { Hero } from "@/components/content/Hero";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import {
  ProcessStepper,
  type ProcessStage,
} from "@/components/content/ProcessStepper";
import { ProductCard } from "@/components/content/ProductCard";
import { ProofBar, type ProofPoint } from "@/components/content/ProofBar";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { SITE_FAQS } from "@/lib/faq";
import { PRODUCTS, productCardItem } from "@/lib/products";

/**
 * Homepage — Design System §11 Homepage order, §A Starter copy library.
 *
 * Section stack: hero, proof bar, products, audiences, customization, process,
 * manufacturing, final CTA. §11 illustrates the recommended stack as a figure
 * rather than an ordered list, so this is the roadmap's stated assumption; the
 * roadmap flags it for confirmation before merge.
 *
 * There is no case-study or testimonial section here, deliberately: §11 says to
 * remove it until genuine evidence exists, and non-negotiable #12 says the same.
 */

/** §08 Proof bar — four factual points, no invented totals or scores. */
const PROOF_POINTS: ProofPoint[] = [
  { title: "10+ years", description: "Hands-on manufacturing experience." },
  { title: "Custom branding", description: "Club or private-label identity." },
  { title: "Sample first", description: "Approval before bulk production." },
  {
    title: "Made in Sialkot",
    description: "Transparent manufacturing origin.",
  },
];

/**
 * Product cards come from the §11 catalogue, so the homepage can only ever
 * link to pages that exist. §08 gives the card action as "Explore Custom
 * Gloves → or equivalent".
 */
const PRODUCT_ACTIONS: Record<string, string> = {
  "custom-boxing-gloves": CTA.exploreGloves,
  "fightwear-club-apparel": CTA.exploreFightwear,
};

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
      <Hero
        eyebrow="Custom fight-gear manufacturing"
        title="Custom fight gear, built for your club."
        description="Boxing gloves, fightwear and club apparel manufactured in Sialkot with your colours, logo and specifications."
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
        media={<ImagePlaceholder shot="Hero boxing-glove image" ratio="hero" />}
      />

      <ProofBar points={PROOF_POINTS} />

      <Section theme="light" width="work">
        <SectionHeader
          eyebrow="Custom products"
          title="Custom gloves, fightwear and club apparel."
          description="Two focused product pages, each manufactured against your branding, colours and product specifications."
        />
        <div className="mt-[var(--space-7)] grid gap-[var(--space-5)] sm:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.slug}
              item={productCardItem(product, PRODUCT_ACTIONS[product.slug])}
            />
          ))}
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
            <SectionHeader
              eyebrow="Manufacturing"
              title="Ten years of hands-on fight-gear manufacturing experience."
              description="Based in Sialkot, our production work is built around clear product requirements, approved samples and checks before dispatch."
            />
            <div className="mt-[var(--space-6)]">
              <Button href="/manufacturing" variant="secondary">
                {CTA.manufacturing}
              </Button>
            </div>
          </div>
          <ImagePlaceholder shot="Workshop wide view" ratio="process" />
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
