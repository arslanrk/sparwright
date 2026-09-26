import type { Metadata } from "next";
import Image from "next/image";
import {
  ApplicationVisual,
  BrandBento,
  CareVisual,
  ColourVisual,
  LabelsVisual,
  PackagingVisual,
  type BentoTile,
} from "@/components/content/BrandBento";
import { BrandHero } from "@/components/content/BrandHero";
import { BrandJourney, type JourneyStage } from "@/components/content/BrandJourney";
import {
  Answer,
  BriefSheet,
  LogoFile,
  ReviewRoute,
  Swatches,
  Thumbs,
  type BriefField,
  type RouteStep,
} from "@/components/content/BriefBoard";
import { FAQGroups, type FAQGroup } from "@/components/content/FAQGroups";
import { RangeBranches, type Branch } from "@/components/content/RangeBranches";
import { RangeIndex, type RangeLine } from "@/components/content/RangeIndex";
import { RangeStarter, type StarterProduct } from "@/components/content/RangeStarter";
import { SampleLoop, type LoopStage } from "@/components/content/SampleLoop";
import {
  ReferenceVisual,
  SketchVisual,
  StartPoints,
  TechPackVisual,
  type StartPoint,
} from "@/components/content/StartPoints";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { whatsappHref } from "@/components/navigation/nav";
import { pageMetadata } from "@/lib/metadata";
import { PRODUCTS, productHref, type ProductFaq } from "@/lib/products";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
} from "@/lib/structured-data";
import gloveStrikeBlackRed from "../../../public/images/concept/boxing-gloves_strike_black-red.jpg";
import gloveStrikeWhiteRedBlack from "../../../public/images/concept/boxing-gloves_strike_white-red-black.jpg";
import gloveClassicBlackTan from "../../../public/images/concept/boxing-gloves_classic_black-tan.jpg";
import rangeApparel from "../../../public/images/range/fightwear-and-club-apparel.jpg";
import rangeLifting from "../../../public/images/range/range-lifting.jpg";
import rangeMma from "../../../public/images/range/range-mma.jpg";
import rangePads from "../../../public/images/range/range-pads.jpg";
import rangeProtective from "../../../public/images/range/range-protective.jpg";
import colourCotton from "../../../public/images/spec/colour-cotton.jpg";
import colourLeather from "../../../public/images/spec/colour-leather.jpg";
import colourPolyester from "../../../public/images/spec/colour-polyester.jpg";
import inspectionPhoto from "../../../public/images/approve-the-sample.jpg";
import stageFirstProduct from "../../../public/images/private-label/stage-first-product.jpg";
import stageGrowingRange from "../../../public/images/private-label/stage-growing-range.jpg";
import stageFullLine from "../../../public/images/private-label/stage-full-line.jpg";
import factoryFloor from "../../../public/images/boxing-glove-factory-floor.jpg";

/**
 * Private Label — the page for brand owners who want fight gear made under
 * their own name. Copy: docs/content/private-label.md (reviewed).
 *
 * Each section has one job:
 *
 *   hero dark · 01 who it is for white · 02 where a product starts light ·
 *   03 your brand on the product dark · 04 the range white · 05 sample
 *   before bulk dark · 06 bulk and QC light · 07 reorders white · 08 the
 *   brief light · 09 FAQ white · closing action
 *
 * Two adjacent sections never share a surface. The audience is a brand
 * owner, so the action is the product brief rather than the mockup (§08).
 * Retailers and distributors are deliberately not segmented (project brief).
 * No MOQ, price, lead time or certification anywhere — #5 and #6; the FAQ
 * says how each is set instead.
 */

export const metadata: Metadata = pageMetadata({
  path: "/private-label",
  title: "Private Label Fight Gear Manufacturer",
  description:
    "Private label boxing gloves, MMA gear and fightwear made in Sialkot, Pakistan. Your branding, labels and packaging, with sample approval before bulk.",
});

/** Where the brand sits on the concept gloves' blank wrist panels (percent). */
const WRIST_PANELS = [
  { x: 27.5, y: 73.5, w: 20, h: 12.5 },
  { x: 72.2, y: 73.5, w: 20, h: 12.5 },
];

/** A studio shot per product line, keyed by slug. */
const LINE_SHOTS: Record<string, typeof rangeMma> = {
  "custom-boxing-gloves": gloveStrikeBlackRed,
  "custom-mma-gloves": rangeMma,
  "custom-pads-bags-mitts": rangePads,
  "custom-protective-gear": rangeProtective,
  "fightwear-club-apparel": rangeApparel,
  "custom-lifting-belts": rangeLifting,
};

/** 04 — built from PRODUCTS, so a line or type added there appears here. */
const RANGE_LINES: RangeLine[] = PRODUCTS.flatMap((product) => {
  const shot = LINE_SHOTS[product.slug];
  if (!shot) return [];
  return [
    {
      name: product.name,
      href: productHref(product),
      shot,
      fill: shot === rangeApparel,
      types: product.types?.items.map((item) => item.title) ?? [],
    },
  ];
});

/* -- 01 · Who it is for ---------------------------------------------------- */

const STAGES: JourneyStage[] = [
  {
    marker: "First product",
    title: "New brands",
    description:
      "Launching a first product. You may have a name, a logo and a clear idea of who the product is for, but no specification yet. It is built with you, one decision at a time.",
    bring: ["A brand name and a logo", "A clear idea of who the product is for"],
    build: ["The specification, one decision at a time", "A sample to approve before bulk"],
    shots: [gloveStrikeBlackRed],
    photo: {
      src: stageFirstProduct,
      // Centres measured on the photograph's blank panels (box front, wrist strap).
      marks: [
        { x: 75.2, y: 46.4, w: 20, ink: "#FFFFFF" },
        { x: 43.8, y: 80.1, w: 12.5, ink: "#E8E8E8" },
      ],
    },
  },
  {
    marker: "Growing range",
    title: "Growing brands",
    description:
      "Expanding a current range. Send the product you already sell, and the new one is specified to sit alongside it.",
    bring: ["The product you already sell", "Your artwork and colour references"],
    build: ["A new product specified to sit alongside it", "A sample to approve before bulk"],
    shots: [rangePads, gloveStrikeBlackRed, rangeProtective],
    photo: {
      src: stageGrowingRange,
      marks: [
        { x: 39.8, y: 22, w: 15.5, ink: "#FFFFFF" },
        { x: 60, y: 26.5, w: 11, ink: "#FFFFFF" },
        { x: 57.3, y: 70.7, w: 8, ink: "#E8E8E8" },
      ],
    },
  },
  {
    marker: "Full line",
    title: "Established private-label brands",
    description:
      "Adding models or categories, or updating a specification. Send your tech pack or current product as the starting reference.",
    bring: ["Your tech pack or current product", "New models, categories or updates"],
    build: ["Products developed against your reference", "A sample to approve before bulk"],
    shots: [gloveStrikeWhiteRedBlack, gloveStrikeBlackRed, rangeMma, rangePads, rangeProtective, rangeLifting],
    photo: {
      src: stageFullLine,
      // Centred on the blank header panel above the shelves.
      marks: [{ x: 49.8, y: 10.6, w: 24, ink: "#FFFFFF" }],
    },
  },
];

/* -- 02 · Where a product starts ------------------------------------------ */

const START_POINTS: StartPoint[] = [
  {
    title: "From a reference product",
    description:
      "Send photographs, measurements or the product itself. We confirm which parts of the construction can be matched and where a decision from you is needed.",
    visual: <ReferenceVisual src={gloveClassicBlackTan} />,
  },
  {
    title: "From a sketch or an idea",
    description:
      "A drawing and a description of how the product will be used are enough to start. The materials, construction and sizing are worked out with you.",
    visual: <SketchVisual />,
  },
  {
    title: "From a tech pack",
    description:
      "If you already have a technical specification, we work to it. If part of it cannot be produced as written, it is raised for review rather than assumed or changed without agreement.",
    visual: <TechPackVisual />,
  },
];

/* -- 03 · Your brand on the product ---------------------------------------- */

const BENTO: BentoTile[] = [
  {
    title: "Brand application",
    description:
      "Print, embroidery, sublimation, embossing, patches or woven badges, chosen for the product and material rather than one method for everything. Placement is agreed per product.",
    visual: (
      <ApplicationVisual
        src={gloveStrikeWhiteRedBlack}
        marks={WRIST_PANELS}
        methods={["Print", "Embroidery", "Sublimation", "Embossing", "Patches", "Woven badges"]}
      />
    ),
    className: "md:col-span-2 lg:col-span-7 lg:row-span-2 [&>div:first-child]:min-h-80",
  },
  {
    title: "Labels",
    description: "Woven or printed brand and size labels, sewn or printed where your product needs them.",
    visual: <LabelsVisual sizes={["S", "M", "L", "XL"]} />,
    className: "lg:col-span-5",
  },
  {
    title: "Care and composition information",
    description: "Care and composition labelling prepared to the wording you supply for the market you sell in.",
    visual: <CareVisual />,
    className: "lg:col-span-5",
  },
  {
    title: "Colour",
    description:
      "Colour codes or a physical colour reference. Different materials reproduce the same colour differently, so the appearance is confirmed on the sample.",
    visual: (
      <ColourVisual
        swatches={[
          { src: colourLeather, label: "Leather" },
          { src: colourPolyester, label: "Polyester" },
          { src: colourCotton, label: "Cotton" },
        ]}
      />
    ),
    className: "lg:col-span-5",
  },
  {
    title: "Packaging",
    description:
      "Polybags, printed boxes, inserts and hang tags, as your sales channel requires. Export cartons are marked and assorted to your instruction.",
    visual: <PackagingVisual />,
    className: "lg:col-span-7",
  },
];

/* -- 05 · Sample before bulk ---------------------------------------------- */

const LOOP_STAGES: LoopStage[] = [
  {
    title: "Brief",
    description: "You send the product, a reference or tech pack, your branding and an approximate quantity.",
  },
  {
    title: "Specification",
    description:
      "Materials, construction, sizing, labels and packaging are agreed, and anything that cannot be produced as described is raised.",
  },
  { title: "Sample", description: "A sample is produced to that specification for your review." },
  {
    title: "Revisions",
    description:
      "Requested changes are reviewed and, where required, a revised sample is produced for further approval.",
  },
  { title: "Approval", description: "You approve the sample. Bulk production is made and checked against it." },
];

/* -- 06 · Bulk and QC ------------------------------------------------------ */

const QC_CHECKS = [
  "Dimensions and weight",
  "Materials and construction",
  "Brand application, colour and placement",
  "Labels, care information and sizing",
  "Quantity, assortment and packing",
];

/* -- 07 · Reorders and range growth --------------------------------------- */

const BRANCH_ICON = "size-5";

const BRANCHES: Branch[] = [
  {
    text: "Reorder a product that is selling",
    icon: (
      <svg viewBox="0 0 24 24" className={BRANCH_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4" />
      </svg>
    ),
  },
  {
    text: "Add a new size, colourway or model to an existing product",
    icon: (
      <svg viewBox="0 0 24 24" className={BRANCH_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="12" r="4.5" />
        <circle cx="16" cy="12" r="4.5" />
      </svg>
    ),
  },
  {
    text: "Launch another product line under the same brand",
    icon: (
      <svg viewBox="0 0 24 24" className={BRANCH_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <path d="M17 14v6M14 17h6" />
      </svg>
    ),
  },
  {
    text: "Keep new products consistent with the ones you already sell",
    icon: (
      <svg viewBox="0 0 24 24" className={BRANCH_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H6.5A2.5 2.5 0 0 0 4 5.5v13A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V9Z" />
        <path d="M14 3v6h6M8.5 14.5l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
];

/* -- 08 · What to send ----------------------------------------------------- */

const BRIEF_FIELDS: BriefField[] = [
  {
    label: "The product or products",
    value: (
      <>
        <Answer strong>Boxing gloves</Answer>
        <Answer>Fight shorts</Answer>
      </>
    ),
  },
  {
    label: "Reference, sketch or tech pack",
    value: (
      <>
        <Thumbs shots={[gloveClassicBlackTan]} />
        <Answer>tech-pack.pdf</Answer>
      </>
    ),
  },
  { label: "Approximate quantity", value: <Answer>Not sure yet</Answer> },
  {
    label: "Logo artwork and placement",
    value: <LogoFile mark={<BrandMonogram />} name="brand-logo.svg" />,
  },
  { label: "Colour references", value: <Swatches colours={["#111111", "#D83A20", "#F4F1E8"]} /> },
  { label: "Label and care wording" },
  { label: "Packaging requirements", value: <Answer>Printed box</Answer> },
  { label: "Destination market", value: <Answer>United Kingdom</Answer> },
];

const ROUTE_ICON = "size-5";

const NEXT_STEPS: RouteStep[] = [
  {
    title: "A mockup",
    description: "Your branding on the product, before anything is made.",
    icon: (
      <svg viewBox="0 0 24 24" className={ROUTE_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m3 16 5-5 4 4 3-3 6 6" />
        <circle cx="15.5" cy="8.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: "A manufacturing quote",
    description: "When the requirement is clear enough to price.",
    icon: (
      <svg viewBox="0 0 24 24" className={ROUTE_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
        <path d="M14 3v6h6M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    title: "Questions",
    description: "The details still needed to complete the specification.",
    icon: (
      <svg viewBox="0 0 24 24" className={ROUTE_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" />
        <path d="M10 8.5a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2M12 13.5h.01" />
      </svg>
    ),
  },
];

/* -- 09 · FAQ -------------------------------------------------------------- */

const FAQ_ICON = "size-5";

const FAQ_GROUPS: FAQGroup[] = [
  {
    id: "brand",
    title: "Your brand",
    icon: (
      <svg viewBox="0 0 24 24" className={FAQ_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8-9 9Z" />
        <circle cx="8.5" cy="8.5" r="1.5" />
      </svg>
    ),
    items: [
      {
        question: "Can you make products under our brand name?",
        answer:
          "Yes. Your brand goes on the product, the labels and the packaging, and the product is made to the specification you approve.",
      },
      {
        question: "Do we need a registered brand or a finished logo?",
        answer:
          "You need the right to use the name and artwork you send us. A finished logo helps, but you can start the conversation about the product while your branding is still being completed.",
      },
      {
        question: "Can you make custom labels and packaging?",
        answer:
          "Yes. Woven or printed brand and size labels, care labels to your wording, polybags, printed boxes, inserts and hang tags, and export cartons marked to your instruction.",
      },
      {
        question: "Can you match a product we already sell?",
        answer:
          "Send the product, photographs or measurements. We confirm which parts can be matched and where a decision is needed, then the match is checked on the sample.",
      },
    ],
  },
  {
    id: "development",
    title: "Development and samples",
    icon: (
      <svg viewBox="0 0 24 24" className={FAQ_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4" />
      </svg>
    ),
    items: [
      {
        question: "Do we need a tech pack?",
        answer:
          "No. A reference product, a sketch or a clear description is enough to start. If you have a tech pack, include it.",
      },
      {
        question: "Can we revise the sample before bulk?",
        answer:
          "Yes. Requested changes are reviewed and, where required, a revised sample is produced for approval. Bulk production starts only once you approve.",
      },
      {
        question: "Can we arrange confidentiality before sharing a design?",
        answer:
          "If you need a confidentiality agreement before sharing artwork, product specifications or an unreleased design, mention it in your brief so the requirement can be discussed before you send those materials.",
      },
    ],
  },
  {
    id: "orders",
    title: "Orders",
    icon: (
      <svg viewBox="0 0 24 24" className={FAQ_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8 12 3 3 8v8l9 5 9-5Z" />
        <path d="m3 8 9 5 9-5M12 13v8" />
      </svg>
    ),
    items: [
      {
        question: "What is the minimum order quantity?",
        answer:
          "Minimum quantities depend on the product, its materials, construction and branding method. Send the products and an approximate quantity, and the requirement for each is confirmed with the quote.",
      },
      {
        question: "How long does an order take?",
        answer:
          "Timing depends on the product, the specification, the number of sample rounds, the quantity and the destination. It is confirmed with the quote once the brief has been reviewed.",
      },
      {
        question: "Can we add products to our range later?",
        answer:
          "Yes. Approved artwork, colour references and specifications can be retained, so future products and reorders are developed against the same approved reference.",
      },
    ],
  },
];

const FAQS: ProductFaq[] = FAQ_GROUPS.flatMap((group) => group.items);

/* -- Closing --------------------------------------------------------------- */

const STARTER_PRODUCTS: StarterProduct[] = [
  { label: "Boxing gloves", product: "Boxing Gloves", photo: gloveStrikeBlackRed },
  { label: "MMA gear", product: "MMA Gloves", photo: rangeMma },
  { label: "Pads and bags", product: "Focus Mitts and Pads", photo: rangePads },
  { label: "Protective gear", product: "Protective Gear", photo: rangeProtective },
  { label: "Fightwear", product: "Fight Shorts", photo: rangeApparel, fill: true },
  { label: "Lifting gear", product: "Lifting Belts and Gear", photo: rangeLifting },
];

/** Only when a real number is configured — never a dead link. */
const WHATSAPP = whatsappHref();

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

      {/* Hero — the product carrying "your brand" three ways. */}
      <BrandHero
        breadcrumb={<Breadcrumb items={[{ label: "Private Label" }]} />}
        eyebrow="Private label manufacturing"
        title="Private label fight gear, made to your specification."
        description="Boxing gloves, MMA gear, fightwear, protective equipment and lifting gear developed under your brand, with your labels, your packaging and a physical sample approved before bulk production begins."
        points={[
          "Start from a reference, a sketch or a tech pack",
          "Your brand on the product, the labels and the box",
          "One product to start, or a full range",
        ]}
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
        photo={{
          src: gloveStrikeBlackRed,
          alt: "A pair of black boxing gloves with red strike graphics, carrying a placeholder brand on the wrist straps.",
        }}
        marks={WRIST_PANELS}
      />

      {/* 01 — Who it is for: the stages a brand grows through, and its range growing on display. White. */}
      <Section theme="white" width="shell">
        <BrandJourney
          stages={STAGES}
          label="Brand stages"
          intro={
            <div>
              <SectionHeader eyebrow="Who we make for" index="01" title="Built for brands at different stages." />
              <p className="mt-[var(--space-5)] text-body text-[var(--color-text-secondary)]">
                Private label means{" "}
                <span className="font-semibold text-[var(--color-text)]">
                  we make the product and you sell it under your own brand.
                </span>{" "}
                Choose where your brand is now.
              </p>
            </div>
          }
        />
      </Section>

      {/* 02 — Where a product starts: three routes into one specification. Light. */}
      <Section theme="light" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <SectionHeader
            eyebrow="Product development"
            index="02"
            title="Start from what you already have."
            description="You do not need a finished tech pack to begin."
          />
          <p className="text-body text-[var(--color-text-secondary)]">
            Whatever you start from,{" "}
            <span className="font-semibold text-[var(--color-text)]">
              the result is a written specification you approve before anything is made in quantity.
            </span>
          </p>
        </div>
        <div className="mt-[var(--space-7)]">
          <StartPoints
            points={START_POINTS}
            sheetTitle="Your product"
            sheetFields={["Materials", "Construction", "Sizing", "Branding", "Labels", "Packaging"]}
          />
        </div>
      </Section>

      {/* 03 — Your brand on the product: a bento of where it appears. Dark. */}
      <Section theme="dark" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <SectionHeader
            eyebrow="Branding, labels and packaging"
            index="03"
            title="Your name wherever your customers look for it."
          />
          <p className="text-body text-[var(--color-text-secondary)]">
            Private label is more than a logo on the product.{" "}
            <span className="font-semibold text-[var(--color-text)]">
              Each of these is agreed as part of the specification.
            </span>
          </p>
        </div>
        <div className="mt-[var(--space-7)]">
          <BrandBento tiles={BENTO} />
        </div>
      </Section>

      {/* 04 — The range, as a catalogue index from PRODUCTS. White. */}
      <Section theme="white" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <SectionHeader eyebrow="Your range" index="04" title="One product to start, or a full range." />
          <p className="text-body text-[var(--color-text-secondary)]">
            Start with the product that matters most to your brand{" "}
            <span className="font-semibold text-[var(--color-text)]">and add others later.</span>
          </p>
        </div>
        <div className="mt-[var(--space-7)]">
          <RangeIndex lines={RANGE_LINES} />
        </div>
        <div className="mt-[var(--space-6)] flex flex-col items-start justify-between gap-[var(--space-4)] rounded-2xl bg-[var(--color-surface)] p-[var(--space-5)] sm:flex-row sm:items-center">
          <p className="text-body text-[var(--color-text-secondary)]">
            Need something else from the catalogue, such as{" "}
            <span className="font-semibold text-[var(--color-text)]">martial arts uniforms, kit bags or fitness accessories</span>?
            Include it in your brief.
          </p>
          <Button href="/products" variant="secondary" arrow className="shrink-0">
            {CTA.products}
          </Button>
        </div>
      </Section>

      {/* 05 — Sample before bulk: the revision loop. Dark. */}
      <Section theme="dark" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <SectionHeader eyebrow="Sample before bulk" index="05" title="Revisions happen before bulk, not after it." />
          <p className="text-body text-[var(--color-text-secondary)]">
            A change is easiest to make while the product is still at sample stage.{" "}
            <span className="font-semibold text-[var(--color-text)]">
              The process is designed to resolve materials, construction, sizing and branding before bulk production begins.
            </span>
          </p>
        </div>
        <div className="mt-[var(--space-7)]">
          <SampleLoop stages={LOOP_STAGES} loop={[2, 3]} loopLabel="Revise where required" />
        </div>
        <p className="mt-[var(--space-7)] flex items-center gap-3 font-body text-body-large font-semibold">
          <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-success-600 text-white">
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3.5 8.5 3 3 6-7" />
            </svg>
          </span>
          Nothing goes to bulk until you approve it.
        </p>
      </Section>

      {/*
        06 — Bulk and QC: the inspection photograph with the checks laid on
        it as an inspection card, then Sialkot and the process link. Light.
      */}
      <Section theme="light" width="shell">
        <div className="grid grid-cols-1 items-center gap-[var(--space-8)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[var(--space-9)]">
          <div className="relative pb-[var(--space-8)] lg:pb-[var(--space-9)] lg:pl-[var(--space-7)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={inspectionPhoto}
                alt="A quality inspector checking a sample boxing glove beside a scale, a tape measure and a ticked checklist."
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
            </div>
            {/* The checks, as an inspection card over the photograph's corner — clear of the glove and the inspector. */}
            <div className="absolute bottom-0 left-3 w-[min(20rem,85%)] rounded-2xl bg-[var(--color-surface)] p-[var(--space-5)] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_30px_60px_-24px_rgb(0_0_0/0.45)] lg:left-0">
              <p className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3 text-eyebrow uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                Against the approved sample
                <span aria-hidden="true" className="size-2 rounded-full bg-success-600" />
              </p>
              <p className="mt-3 text-small text-[var(--color-text-secondary)]">Quality-control checks can include:</p>
              <ul className="mt-2 flex flex-col gap-2">
                {QC_CHECKS.map((check) => (
                  <li key={check} className="flex items-start gap-2.5 text-small font-medium">
                    <span aria-hidden="true" className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded bg-success-600 text-white">
                      <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3.5 8.5 3 3 6-7" />
                      </svg>
                    </span>
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow="Production and quality control"
              index="06"
              title="Made and checked against the sample you approved."
            />
            <div className="mt-[var(--space-6)] flex items-center gap-[var(--space-4)] rounded-2xl bg-[var(--color-surface)] p-3 pr-[var(--space-5)]">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={factoryFloor}
                  alt="Machinists at sewing benches on the Sparwright production floor in Sialkot."
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-body text-body font-semibold">Made in Sialkot</h3>
                <p className="mt-1 text-small text-[var(--color-text-secondary)]">
                  Sparwright&apos;s manufacturing is based in Sialkot, Pakistan, where the product moves from sampling
                  through production, quality control and packing.
                </p>
              </div>
            </div>
            <div className="mt-[var(--space-6)]">
              <Button href="/manufacturing" variant="primary" arrow>
                {CTA.process}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 07 — Reorders and range growth: one reference, four branches. White. */}
      <Section theme="white" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <SectionHeader
            eyebrow="Reorders and range growth"
            index="07"
            title="Your second order should not start from zero."
          />
          <p className="text-body text-[var(--color-text-secondary)]">
            Approved artwork, colour references and product specifications{" "}
            <span className="font-semibold text-[var(--color-text)]">
              can be kept as the reference for future orders.
            </span>
          </p>
        </div>
        <div className="mt-[var(--space-8)]">
          <RangeBranches
            photo={gloveStrikeBlackRed}
            approved={["Artwork", "Colours", "Specification", "Sample"]}
            intro="That matters when you need to:"
            branches={BRANCHES}
          />
        </div>
        <p className="mt-[var(--space-7)] max-w-copy border-l-2 border-forge-600 pl-[var(--space-4)] text-small text-[var(--color-text-secondary)]">
          A repeat order may still need confirmation if materials, colours, sizing or construction have changed,{" "}
          <span className="font-semibold text-[var(--color-text)]">but it starts from a documented reference.</span>
        </p>
      </Section>

      {/* 08 — What to send: a brand brief as it might arrive, and its route. Light. */}
      <Section theme="light" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <SectionHeader
            eyebrow="Start with your brief"
            index="08"
            title="Tell us what your brand needs."
            description="A useful first enquiry can be simple."
          />
          <p className="text-body text-[var(--color-text-secondary)]">
            Send what you already know.{" "}
            <span className="font-semibold text-[var(--color-text)]">If something is undecided, say so.</span>
          </p>
        </div>
        <div className="mt-[var(--space-7)] grid gap-3">
          <BriefSheet
            title="Send what you have"
            fields={BRIEF_FIELDS}
            footnote={
              <>
                <span className="font-semibold text-[var(--color-text)]">Undecided is a fine answer.</span> Part of
                the process is identifying which decisions still need to be made.
              </>
            }
          />
          <ReviewRoute
            title="A person reads every brief."
            intro="Your enquiry is reviewed before the next step is decided. Depending on the brief, that next step may be:"
            steps={NEXT_STEPS}
            action={
              <Button
                href="/quote"
                variant="primary"
                arrow
                data-analytics="hero_quote_click"
                data-analytics-surface="private_label_brief"
              >
                {CTA.brief}
              </Button>
            }
          />
        </div>
      </Section>

      {/* 09 — FAQ, grouped. White. */}
      <FAQGroups
        theme="white"
        eyebrow="Private label FAQ"
        index="09"
        title="Questions about private label manufacturing."
        groups={FAQ_GROUPS}
        name="private-label-faq"
      />

      {/* Closing — the range as a place to start a brief. */}
      <RangeStarter
        eyebrow="Start your brand"
        title="Tell us about your range."
        description="One product or several, from a reference, a sketch or a tech pack. Start with what you have today."
        surface="private_label_cta_product"
        intent="quote"
        pickerNote="Pick one to start a product brief"
        products={STARTER_PRODUCTS}
        several={{
          label: "A full range under your brand",
          description: "Several product lines in one brief.",
          product: "Multiple Products",
        }}
        actions={
          <>
            <Button
              href="/quote"
              variant="inverse"
              arrow
              data-analytics="hero_quote_click"
              data-analytics-surface="private_label_cta"
            >
              {CTA.brief}
            </Button>
            <Button
              href="/quote?intent=mockup"
              variant="secondary"
              data-analytics="hero_mockup_click"
              data-analytics-surface="private_label_cta"
            >
              {CTA.mockup}
            </Button>
          </>
        }
        footnote={
          WHATSAPP ? (
            <>
              Prefer to talk first?{" "}
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
                Message us on WhatsApp
              </a>
            </>
          ) : null
        }
      />
    </>
  );
}

/** A placeholder monogram for the brief's logo file. */
function BrandMonogram() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-auto" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M7.5 7.5l4.5 5 4.5-5M12 12.5v5" stroke="#D83A20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
