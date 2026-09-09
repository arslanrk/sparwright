import type { Metadata } from "next";
import { CallToAction } from "@/components/content/CallToAction";
import { Hero } from "@/components/content/Hero";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { SpecificationTable } from "@/components/content/SpecificationTable";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import type { SpecRow } from "@/lib/products";

/**
 * Private Label — Design System §11 Private-label template, §A Starter copy.
 *
 * The template's nine sections in order: brand-oriented hero, product
 * development, materials and construction, labels and brand application,
 * packaging, sampling and revisions, bulk production and QC, approved
 * specification retention, structured quote entry point.
 *
 * The audience here is a brand owner rather than a club, so the action is the
 * product brief rather than the mockup (§08 CTA library). The quote workflow
 * itself ships in PR 9; this page is its entry point.
 */

export const metadata: Metadata = {
  title: "Private Label",
  description:
    "Develop fightwear products, labels and packaging through an approved sample before bulk production begins.",
};

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
    title: "From a defined brief",
    description:
      "If you already have a technical pack, we work to it and raise anything that is not practical rather than quietly substituting it.",
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
    value:
      "Your size chart, or one developed with you, fixed by the approved sample.",
  },
  {
    label: "Finish",
    value:
      "Stitching, trims and hardware specified per product rather than assumed.",
  },
];

/** §11 "Labels, care information and brand application." */
const BRANDING: SpecRow[] = [
  {
    label: "Brand application",
    value:
      "Print, sublimation, embroidery or applied badge, chosen per product against your artwork.",
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
    value: "Polybags, boxes, inserts or hang tags as your channel requires.",
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
  "You send the brief, reference or technical pack with your branding and quantity expectation.",
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

export default function PrivateLabelPage() {
  return (
    <>
      <Section theme="light" width="work" density="compact">
        <Breadcrumb items={[{ label: "Private Label" }]} />
      </Section>

      {/* 1 — Brand-oriented hero and positioning. §A copy, verbatim. */}
      <Hero
        eyebrow="Private label"
        title="Your fightwear brand, supported by a clear manufacturing process."
        description="Develop products, labels and packaging through an approved sample before bulk production begins."
        actions={
          <>
            <Button href="/quote" variant="primary" arrow>
              {CTA.brief}
            </Button>
            <Button href="/manufacturing" variant="secondary">
              {CTA.manufacturing}
            </Button>
          </>
        }
        media={
          <ImagePlaceholder shot="Finished sample ready to ship" ratio="hero" />
        }
      />

      {/* 2 — Product development. */}
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Product development"
          title="Three ways a product starts."
          description="Whichever you have, the outcome is the same: a written specification you approve before anything is produced in quantity."
        />
        <ul className="mt-[var(--space-7)] grid gap-[var(--space-5)] lg:grid-cols-3">
          {DEVELOPMENT.map((item) => (
            <li
              key={item.title}
              className="border-t border-[var(--color-border)] pt-[var(--space-4)]"
            >
              <h3 className="text-heading-4">{item.title}</h3>
              <p className="mt-2 text-body text-[var(--color-text-secondary)]">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3 — Materials and construction. 4 — Labels and brand application. */}
      <Section theme="light" width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Materials and construction"
              title="What gets specified"
              description="Each row is a decision made with you and then fixed by the sample you approve."
            />
            <SpecificationTable
              rows={CONSTRUCTION}
              className="mt-[var(--space-5)]"
            />
          </div>
          <div>
            <SectionHeader
              eyebrow="Labels and branding"
              title="How your brand is applied"
              description="Your name on the product, in the places your buyers look for it."
            />
            <SpecificationTable
              rows={BRANDING}
              className="mt-[var(--space-5)]"
            />
          </div>
        </div>
      </Section>

      {/* 5 — Packaging and presentation. */}
      <Section theme="white" width="work">
        <div className="grid gap-[var(--space-7)] lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <ImagePlaceholder shot="Packaging" ratio="process" />
          <div>
            <SectionHeader
              eyebrow="Packaging"
              title="How the product arrives."
              description="Packaging is part of the specification, not an afterthought at dispatch."
            />
            <SpecificationTable
              rows={PACKAGING}
              className="mt-[var(--space-5)]"
            />
          </div>
        </div>
      </Section>

      {/* 6 — Sampling and revisions. */}
      <Section theme="dark" width="copy">
        <SectionHeader
          eyebrow="Sampling and revisions"
          title="Revisions happen before bulk, not after it."
          description="A revision at sample stage costs a sample. A revision after bulk costs the order, so the process is built to find problems at the first stage."
        />
        <ol className="mt-[var(--space-6)] flex flex-col gap-[var(--space-4)]">
          {SAMPLING.map((step, index) => (
            <li
              key={step}
              className="flex gap-[var(--space-4)] border-t border-[var(--color-border)] pt-[var(--space-4)]"
            >
              <span className="font-display text-body-large font-semibold text-[var(--color-action)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-body text-[var(--color-text-secondary)]">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      {/* 7 — Bulk production and quality control. */}
      <Section theme="light" width="work">
        <div className="grid gap-[var(--space-7)] lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeader
              eyebrow="Bulk and quality control"
              title="Checked against the specification you approved."
              // §11: publish only checks the team will consistently perform
              // and record. Keep this list short rather than impressive.
              description="These are the checks the team performs and records on every order."
            />
            <div className="mt-[var(--space-6)]">
              <Button href="/manufacturing" variant="secondary">
                {CTA.manufacturing}
              </Button>
            </div>
          </div>
          <ul className="flex flex-col gap-3">
            {QUALITY.map((check) => (
              <li
                key={check}
                className="border-b border-[var(--color-border)] pb-3 text-body text-[var(--color-text-secondary)]"
              >
                {check}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 8 — Approved specification retention for reorders. */}
      <Section theme="white" width="copy">
        <SectionHeader
          eyebrow="Reorders"
          title="Your approved specification is retained."
          description="Artwork, colour references, construction details, label wording, packaging and the approved sample record are kept against your brand. A repeat order is produced against that reference rather than developed again, which is what keeps a second production run consistent with the first."
        />
      </Section>

      {/* 9 — Structured quote form entry point. The form itself ships in PR 9. */}
      <Section theme="light" width="copy">
        <SectionHeader
          eyebrow="Send your brief"
          title="What to include in a product brief."
          description="The more of this you can send, the more specific the first reply will be."
        />
        <ul className="mt-[var(--space-5)] grid gap-3 sm:grid-cols-2">
          {[
            "Product type and intended use",
            "Reference product, sketch or technical pack",
            "Approximate quantity",
            "Materials or construction you have in mind",
            "Colour references",
            "Logo artwork and where it goes",
            "Label and care wording",
            "Packaging requirements",
            "Destination market",
          ].map((item) => (
            <li
              key={item}
              className="border-t border-[var(--color-border)] pt-3 text-body text-[var(--color-text-secondary)]"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-[var(--space-6)]">
          <Button href="/quote" variant="primary" arrow>
            {CTA.brief}
          </Button>
        </div>
      </Section>

      <CallToAction
        title="Ready to develop your own range?"
        description="Send your product, branding, quantity and destination."
        action={{ label: CTA.quote, href: "/quote" }}
      />
    </>
  );
}
