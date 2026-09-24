import type { Metadata } from "next";
import {
  CheckList,
  FramedPhoto,
  NumberedCards,
  StepRoute,
} from "@/components/content/AudienceBlocks";
import { CallToAction } from "@/components/content/CallToAction";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Hero } from "@/components/content/Hero";
import { ProductCard } from "@/components/content/ProductCard";
import { SpecificationTable } from "@/components/content/SpecificationTable";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { pageMetadata } from "@/lib/metadata";
import {
  PRODUCTS,
  productCardItem,
  type ProductFaq,
  type SpecRow,
} from "@/lib/products";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
} from "@/lib/structured-data";
import mockupToGlove from "../../../public/images/logo-mockup-to-finished-glove.jpg";
import dispatchWarehouse from "../../../public/images/packing-and-export.jpg";

/**
 * Private Label — Design System §11 Private-label template, §A Starter copy.
 *
 * Sections: brand-oriented hero, product development, the six product lines
 * (a brand can put its name on any of them, which the page never used to
 * say), specification and branding, packaging, sampling and revisions, bulk
 * and quality control, what to put in a brief, and the brand's own questions.
 * Reorders, a heading with no body, are answered in the FAQ.
 *
 * The audience is a brand owner, so the action is the product brief rather
 * than the mockup (§08 CTA library).
 */

export const metadata: Metadata = pageMetadata({
  path: "/private-label",
  title: "Private Label Fight Gear Manufacturer",
  description:
    "Private label boxing gloves, fightwear, lifting gear and protective gear made in Sialkot, Pakistan — your brand, labels and packaging, approved on a sample.",
});

/** §11 "Product development from reference, sketch or defined brief." */
const DEVELOPMENT = [
  {
    title: "From a reference product",
    description:
      "Send photographs, measurements or the product itself. We confirm which parts of the construction can be matched and which need a decision from you.",
  },
  {
    title: "From a sketch or idea",
    description:
      "A drawing and a description of the intended use is enough to start. The specification is built up with you before anything is cut.",
  },
  {
    title: "From a tech pack",
    description:
      "Already have a technical pack? We work to it and raise anything that is not practical rather than quietly substituting it.",
  },
];

/** §11 "Materials and construction choices." */
const CONSTRUCTION: SpecRow[] = [
  {
    label: "Materials",
    value:
      "Shell, fabric, padding and lining selected against the intended use and confirmed before sampling.",
  },
  {
    label: "Construction",
    value:
      "Panel layout, seam type, reinforcement and closure agreed as part of the specification.",
  },
  {
    label: "Sizing",
    value: "Your size chart, or one developed with you, fixed by the approved sample.",
  },
  {
    label: "Finish",
    value: "Stitching, trims and hardware specified per product rather than assumed.",
  },
];

/** §11 "Labels, care information and brand application." */
const BRANDING: SpecRow[] = [
  {
    label: "Brand application",
    value:
      "Print, sublimation, embroidery or an applied badge, chosen per product against your artwork.",
  },
  {
    label: "Neck and size labels",
    value: "Woven or printed labels carrying your brand and size marking.",
  },
  {
    label: "Care information",
    value:
      "Care and composition labelling prepared to the wording you supply for your market.",
  },
  {
    label: "Colour references",
    value:
      "Agreed colour references recorded with the specification so repeat orders match.",
  },
];

/** §11 "Packaging and presentation." */
const PACKAGING: SpecRow[] = [
  {
    label: "Individual packing",
    value: "Polybags, boxes, inserts or hang tags, as your channel requires.",
  },
  {
    label: "Branded presentation",
    value: "Printed packaging and inserts produced against your artwork.",
  },
  {
    label: "Export cartons",
    value:
      "Carton count, assortment and markings recorded before dispatch, matching your paperwork.",
  },
];

/** §11 "Sampling and revisions." */
const SAMPLING = [
  "You send the brief, reference or tech pack, with your branding and quantity expectation.",
  "We confirm the specification, raise anything impractical, and agree materials, labels and packaging.",
  "A sample is produced and photographed for your review.",
  "You request revisions, and a revised sample is produced, until the specification is right.",
  "You approve the sample. That approved specification is what bulk is made and checked against.",
];

/** §11 "Bulk production and quality control." */
const QUALITY = [
  "Dimensions and weight measured against the approved sample.",
  "Materials, construction and finish verified as agreed.",
  "Brand application, colour reference and placement checked.",
  "Labels, care information and sizing checked per product.",
  "Quantity, assortment, inner packing and carton details recorded.",
  "Inspection record retained before dispatch.",
];

const BRIEF = [
  "Product type and intended use",
  "Reference product, sketch or tech pack",
  "Approximate quantity",
  "Materials or construction in mind",
  "Colour references",
  "Logo artwork and placement",
  "Label and care wording",
  "Packaging requirements",
  "Destination market",
];

const FAQS: ProductFaq[] = [
  {
    question: "Can you make products under our brand name?",
    answer:
      "Yes. Your brand goes on the product, the labels and the packaging. We make it to the specification you approve and ship it as your product.",
  },
  {
    question: "Which products can we sell under private label?",
    answer:
      "Any of the six lines — boxing and MMA gloves, fightwear and apparel, lifting gear, protective gear, and punch bags, pads and mitts — plus martial arts uniforms, kit bags and fitness accessories made to order.",
  },
  {
    question: "Can we revise the sample before bulk?",
    answer:
      "Yes. You can ask for revisions, and a revised sample is produced, until the specification is right. Bulk starts only once you approve.",
  },
  {
    question: "Do you make custom labels and packaging?",
    answer:
      "Yes — woven or printed neck and size labels, care labels to your wording, printed boxes, polybags, inserts and export cartons marked to your instruction.",
  },
  {
    question: "Can we add products to our range later?",
    answer:
      "Yes. Your artwork, colour references and specifications stay on file, so a new product matches the ones you already sell, and a reorder matches its first run.",
  },
  {
    question: "What is the minimum order for private label?",
    answer:
      "Minimums are set per product, by its material, construction and branding method. Send the products and a rough quantity and we confirm the minimum for each before you commit.",
  },
];

export default function PrivateLabelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd([{ name: "Private Label", path: "/private-label" }]),
            faqJsonLd(FAQS),
          ]),
        }}
      />

      <Section theme="light" width="work" density="compact">
        <Breadcrumb items={[{ label: "Private Label" }]} />
      </Section>

      {/* Hero. "Fightwear brand" undersold a range that covers six lines. */}
      <Hero
        eyebrow="Private label"
        title="Your fight gear brand, built on a clear manufacturing process."
        description="Develop boxing gloves, fightwear, lifting gear and protective gear under your own name — with your labels and packaging, approved on a sample before bulk production."
        actions={
          <>
            <Button
              href="/quote"
              variant="primary"
              arrow
              data-analytics="hero_quote_click"
              data-analytics-surface="private_label_hero"
            >
              {CTA.brief}
            </Button>
            <Button href="/manufacturing" variant="secondary">
              {CTA.manufacturing}
            </Button>
          </>
        }
        media={
          <FramedPhoto
            src={mockupToGlove}
            alt="A flat mockup of a black and tan glove with a shield emblem beside the finished glove, the emblem embroidered on the cuff."
            ratio="aspect-[3/2]"
            priority
          />
        }
      />

      {/* 01 — Product development. */}
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Product development"
          index="01"
          title="Three ways a product starts."
          description="Whichever you have, the outcome is the same: a written specification you approve before anything is produced in quantity."
        />
        <NumberedCards items={DEVELOPMENT} />
      </Section>

      {/* 02 — The product lines. */}
      <Section theme="light" width="work">
        <SectionHeader
          eyebrow="Your range"
          index="02"
          title="Put your name on any of six product lines."
          description="Start with one line and add others later — each is specified, sampled and branded to the same standard."
        />
        <div className="mt-[var(--space-7)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} item={productCardItem(product)} />
          ))}
        </div>
      </Section>

      {/* 03 — Specification and branding. */}
      <Section theme="white" width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Materials and construction"
              index="03"
              title="What gets specified"
              description="Each row is a decision made with you, then fixed by the sample you approve."
            />
            <SpecificationTable rows={CONSTRUCTION} className="mt-[var(--space-5)]" />
          </div>
          <div>
            <SectionHeader
              eyebrow="Labels and branding"
              title="How your brand is applied"
              description="Your name on the product, in the places your buyers look for it."
            />
            <SpecificationTable rows={BRANDING} className="mt-[var(--space-5)]" />
          </div>
        </div>
      </Section>

      {/* 04 — Packaging. */}
      <Section theme="light" width="work">
        <div className="grid items-center gap-[var(--space-7)] lg:grid-cols-[1fr_1.1fr]">
          <FramedPhoto
            src={dispatchWarehouse}
            alt="A dispatch warehouse with bagged gloves and sealed export cartons on pallet racking."
            ratio="aspect-[4/3]"
          />
          <div>
            <SectionHeader
              eyebrow="Packaging"
              index="04"
              title="How the product arrives."
              description="Packaging is part of the specification, not an afterthought at dispatch."
            />
            <SpecificationTable rows={PACKAGING} className="mt-[var(--space-5)]" />
          </div>
        </div>
      </Section>

      {/* 05 — Sampling and revisions. */}
      <Section theme="dark" width="work">
        <div className="grid gap-[var(--space-7)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <SectionHeader
            eyebrow="Sampling and revisions"
            index="05"
            title="Revisions happen before bulk, not after it."
            description="A revision at sample stage costs a sample. A revision after bulk costs the order, so the process is built to find problems at the first stage."
          />
          <StepRoute steps={SAMPLING} />
        </div>
      </Section>

      {/* 06 — Bulk production and quality control. */}
      <Section theme="light" width="work">
        <div className="grid gap-[var(--space-7)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <SectionHeader
              eyebrow="Bulk and quality control"
              index="06"
              title="Checked against the specification you approved."
              // §11: publish only checks the team will consistently perform
              // and record. Keep this list short rather than impressive.
              description="These are the checks the team performs and records on every order."
            />
            <div className="mt-[var(--space-6)]">
              <Button href="/about/quality-standards" variant="secondary">
                Quality Standards
              </Button>
            </div>
          </div>
          <CheckList items={QUALITY} />
        </div>
      </Section>

      {/* 07 — What to put in a brief. */}
      <Section theme="white" width="work">
        <div className="grid gap-[var(--space-7)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Send your brief"
              index="07"
              title="What to include in a product brief."
              description="The more of this you can send, the more specific the first reply. Missing some of it? Send what you have — we will ask for the rest."
            />
            <div className="mt-[var(--space-6)]">
              <Button href="/quote" variant="primary" arrow>
                {CTA.brief}
              </Button>
            </div>
          </div>
          <CheckList items={BRIEF} />
        </div>
      </Section>

      {/* 08 — Brand questions. */}
      <Section theme="light" width="copy">
        <SectionHeader
          eyebrow="Questions"
          index="08"
          title="Private label — common questions"
        />
        <FAQAccordion
          items={FAQS}
          name="private-label-faq"
          openFirst
          className="mt-[var(--space-6)]"
        />
      </Section>

      <CallToAction
        title="Tell us about your range."
        description="Send the products, a reference or tech pack, your branding and a rough quantity. A person replies with anything left to confirm."
        action={{
          label: CTA.brief,
          href: "/quote",
          analytics: "hero_quote_click",
          surface: "private_label_cta",
        }}
        secondaryAction={{
          label: CTA.mockup,
          href: "/quote?intent=mockup",
          analytics: "hero_mockup_click",
          surface: "private_label_cta",
        }}
      />
    </>
  );
}
