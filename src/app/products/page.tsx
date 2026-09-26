import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CatalogueExplorer } from "@/components/content/CatalogueExplorer";
import { FAQGroups, type FAQGroup } from "@/components/content/FAQGroups";
import { KitFinder, type KitBuyer } from "@/components/content/KitFinder";
import { LineSlider, type SliderCard } from "@/components/content/LineSlider";
import { Marquee } from "@/components/content/Marquee";
import { ProductStage, type StageLine } from "@/components/content/ProductStage";
import { SpecHotspots, type SpecSpot } from "@/components/content/SpecHotspots";
import { RangeStarter, type StarterProduct } from "@/components/content/RangeStarter";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { MEGA_MENU, whatsappHref } from "@/components/navigation/nav";
import { pageMetadata } from "@/lib/metadata";
import { LINE_SHOTS } from "@/lib/product-shots";
import {
  PRODUCTS,
  getProduct,
  productHref,
  type ProductFaq,
} from "@/lib/products";
import { siteUrl } from "@/lib/site";
import { jsonLdScript } from "@/lib/structured-data";
import apparelGroup from "../../../public/images/range/fightwear-and-apparel-group.webp";
import boxingGroup from "../../../public/images/range/boxing-gloves-group.webp";
import liftingGroup from "../../../public/images/range/lifting-gear-group.webp";
import boxingAthlete from "../../../public/images/boxing-athlete.jpg";
import specConstruction from "../../../public/images/spec/construction-exploded.jpg";

/**
 * Products index — Design System §11 Information architecture.
 *
 * The hub for every product page: the menu, the footer, the breadcrumbs and
 * "View All Products" all land here. Sections run in the order a buyer's
 * questions arrive, from broad to exact:
 *
 *   hero stage dark · marquee red · 01 line slider light · 02 kit finder
 *   dark · 03 catalogue index white · 04 specification hotspots dark ·
 *   05 grouped FAQ light · closing picker
 *
 * 01 answers "do you make my kind of thing?", 02 routes a buyer who thinks in
 * terms of their gym rather than a product, 03 answers "do you make my exact
 * item?" — every catalogue line, so the long-tail names (speed bags, dipping
 * belts, BJJ gis) are on the page as crawlable links and nothing falls off the
 * site — 04 says what can be changed on any of them and who makes it, and 05
 * answers how an order across several lines works.
 *
 * The page is also the site's hub for the head term, so the title leads with
 * "manufacturer" — the word that separates a buying query from a shopping one
 * — and the H2s carry product terms rather than instructions ("Choose the
 * category closest to your kit" said nothing a search engine could match).
 *
 * Built from `PRODUCTS` and the menu's `MEGA_MENU`, so a new product page or
 * catalogue line appears here, in the structured data and in the sitemap
 * without touching this file.
 */

export const metadata: Metadata = pageMetadata({
  path: "/products",
  title: "Custom Fight Gear and Apparel Manufacturer",
  description:
    "Custom boxing and MMA gloves, fightwear, protective gear, punch bags and lifting belts, made in Sialkot, Pakistan for gyms, clubs and private label brands.",
});

const PAGE_DESCRIPTION =
  "Boxing and MMA gloves, fightwear, protective gear, pads and bags, and lifting gear, made in Sialkot, Pakistan for gyms, clubs and private label brands. Each product is made to a specification you approve on a physical sample before bulk production.";

/** The giant word behind each line on the hero's stage, by slug. */
const STAGE_WORDS: Record<string, string> = {
  "custom-boxing-gloves": "BOXING",
  "fightwear-club-apparel": "APPAREL",
  "custom-mma-gloves": "MMA",
  "custom-lifting-belts": "LIFTING",
  "custom-protective-gear": "GUARD",
  "custom-pads-bags-mitts": "PADS",
};

/** Lines whose stage shows a group of models wearing them (scripts/compose-line-group.mjs). */
const STAGE_GROUPS: Record<string, typeof apparelGroup> = {
  "custom-boxing-gloves": boxingGroup,
  "fightwear-club-apparel": apparelGroup,
  "custom-lifting-belts": liftingGroup,
};

/**
 * The six lines for the hero's stage — from `PRODUCTS`, with each line's
 * studio shot from `LINE_SHOTS`, so a line added there appears here.
 */
const LINES: StageLine[] = PRODUCTS.flatMap((product) => {
  const shot = LINE_SHOTS[product.slug];
  if (!shot) return [];
  // Lines shown on people: the model group, as a cut-out.
  const group = STAGE_GROUPS[product.slug];
  return [
    {
      label: product.category,
      name: product.name,
      word: STAGE_WORDS[product.slug] ?? product.category.toUpperCase(),
      href: productHref(product),
      shot: group ?? shot.src,
      scene: group ? false : shot.scene,
      cutout: Boolean(group),
      types: product.types?.items.slice(0, 3).map((item) => item.title) ?? [],
    },
  ];
});

/** The strip under the hero: the range, by the names buyers search. */
const MARQUEE = [
  "Boxing gloves",
  "MMA gloves",
  "Fight shorts",
  "Rashguards",
  "Head guards",
  "Shin guards",
  "Focus mitts",
  "Punch bags",
  "Lifting belts",
  "Club hoodies",
];

const kitLine = (slug: string) => {
  const product = getProduct(slug);
  const shot = LINE_SHOTS[slug];
  if (!product || !shot) return [];
  return [{ name: product.name, label: product.category, href: productHref(product), shot: shot.src, scene: shot.scene }];
};

const KIT_ICON = "size-5";

/**
 * Buyers who know their gym better than our category names. Each lists the
 * lines that kit is usually built from; slugs, so a renamed page follows.
 */
const KIT_BUYERS: KitBuyer[] = [
  {
    title: "Boxing gyms and clubs",
    description: "Gloves for members, pads for coaches and protection for sparring.",
    icon: (
      <svg viewBox="0 0 24 24" className={KIT_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 14V8.5C7 5.5 9.2 3.5 12.5 3.5S18 5.5 18 8.5v4c0 1.5-.8 2.6-2 3" />
        <path d="M7 10c-1.7 0-3 1.3-3 3s1.3 3 3 3" />
        <path d="M6.5 16h10v4.5h-10Z" />
      </svg>
    ),
    lines: ["custom-boxing-gloves", "custom-pads-bags-mitts", "custom-protective-gear"].flatMap(kitLine),
    audience: { label: CTA.gymManufacturing, href: "/for-clubs" },
  },
  {
    title: "MMA and kickboxing gyms",
    description: "Open-palm gloves and shin guards, with fightwear to match.",
    icon: (
      <svg viewBox="0 0 24 24" className={KIT_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 10V6.5a1.5 1.5 0 0 1 3 0V10M9 9.5V5a1.5 1.5 0 0 1 3 0v4.5M12 9.5V5.5a1.5 1.5 0 0 1 3 0v4M15 9.5V7a1.5 1.5 0 0 1 3 0v6.5c0 3.5-2.5 6-6 6H11c-3 0-5-2-5-5V10" />
      </svg>
    ),
    lines: ["custom-mma-gloves", "fightwear-club-apparel", "custom-protective-gear"].flatMap(kitLine),
    audience: { label: CTA.gymManufacturing, href: "/for-clubs" },
  },
  {
    title: "Strength and fitness gyms",
    description: "Belts, straps and gloves for the lifting floor, and training wear to go with them.",
    icon: (
      <svg viewBox="0 0 24 24" className={KIT_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5M6.5 12h11" />
      </svg>
    ),
    lines: ["custom-lifting-belts", "fightwear-club-apparel"].flatMap(kitLine),
    audience: { label: CTA.gymManufacturing, href: "/for-clubs" },
  },
  {
    title: "Private label brands",
    description: "Any product line, under your own name, labels and packaging, as one product or a range.",
    icon: (
      <svg viewBox="0 0 24 24" className={KIT_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8-9 9Z" />
        <circle cx="8.5" cy="8.5" r="1.5" />
      </svg>
    ),
    lines: ["custom-boxing-gloves", "fightwear-club-apparel", "custom-lifting-belts"].flatMap(kitLine),
    audience: { label: CTA.privateLabel, href: "/private-label" },
  },
];

/** The closing band's picker: each opens a brief with the product chosen. */
const STARTER_PRODUCTS: StarterProduct[] = [
  { label: "Boxing gloves", product: "Boxing Gloves", photo: LINE_SHOTS["custom-boxing-gloves"].src },
  { label: "MMA gear", product: "MMA Gloves", photo: LINE_SHOTS["custom-mma-gloves"].src },
  { label: "Pads and bags", product: "Focus Mitts and Pads", photo: LINE_SHOTS["custom-pads-bags-mitts"].src },
  { label: "Protective gear", product: "Protective Gear", photo: LINE_SHOTS["custom-protective-gear"].src },
  { label: "Fightwear", product: "Fight Shorts", photo: LINE_SHOTS["fightwear-club-apparel"].src, fill: true },
  { label: "Lifting gear", product: "Lifting Belts and Gear", photo: LINE_SHOTS["custom-lifting-belts"].src },
];

/** Only when a real number is configured — never a dead link. */
const WHATSAPP = whatsappHref();

/**
 * The full product list — the mega menu's groups, flattened, so the page and
 * the menu can never list different products. A line with a page links to
 * it; a line without one opens the brief with it already named. This replaced
 * a six-item "Also made to order" row that covered the second case only and
 * left the long-tail names (speed bags, head harnesses, kids' boxing sets) in
 * the menu alone.
 */
const CATALOGUE = MEGA_MENU.flat();

/**
 * What a buyer can specify on any line. Every point is already a commitment
 * made elsewhere — branding methods on the product pages and the expertise
 * grid, colour and packaging in `customization.ts`, grading in `expertise.ts`
 * — so nothing here is a new claim (#5, #6).
 */
const SPEC_ICON = "size-5";

/**
 * Where each point sits on the exploded glove, in percent of the photograph:
 * the shell's colour, the foam, the lining, the strap's branding, the woven
 * label and the finished glove.
 */
const SPEC_AT: Record<string, { x: number; y: number }> = {
  "Colours matched to yours": { x: 7, y: 42 },
  "Materials and construction": { x: 33, y: 40 },
  "Kids' to adult sizing": { x: 47, y: 44 },
  "Logo and branding": { x: 63, y: 66 },
  "Private label and packaging": { x: 77.5, y: 64 },
  "A sample before bulk": { x: 86, y: 45 },
};

const SPECIFICATION: (Omit<SpecSpot, "at"> & { icon: ReactNode })[] = [
  {
    title: "Logo and branding",
    icon: (
      <svg viewBox="0 0 24 24" className={SPEC_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8-9 9Z" /><circle cx="8.5" cy="8.5" r="1.5" /></svg>
    ),
    description:
      "Embroidery, print, sublimation, embossing, patches or woven labels — the method chosen for each product and material.",
  },
  {
    title: "Colours matched to yours",
    icon: (
      <svg viewBox="0 0 24 24" className={SPEC_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5s6 6.2 6 10.5a6 6 0 0 1-12 0c0-4.3 6-10.5 6-10.5Z" /></svg>
    ),
    description:
      "Send colour codes or a physical swatch. The colour is confirmed on the sample and kept on file for reorders.",
  },
  {
    title: "Materials and construction",
    icon: (
      <svg viewBox="0 0 24 24" className={SPEC_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 13 9 5 9-5" /></svg>
    ),
    description:
      "Leather or synthetic, padding, fabrics, closures and stitching, chosen for how the product will be used.",
  },
  {
    title: "Kids' to adult sizing",
    icon: (
      <svg viewBox="0 0 24 24" className={SPEC_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5h17v7h-17Z" /><path d="M7.5 8.5v3M11.5 8.5v4M15.5 8.5v3" /></svg>
    ),
    description:
      "Junior and adult sizing can be included where available, with the size mix confirmed in the product specification.",
  },
  {
    title: "Private label and packaging",
    icon: (
      <svg viewBox="0 0 24 24" className={SPEC_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8 12 3 3 8v8l9 5 9-5Z" /><path d="m3 8 9 5 9-5M12 13v8" /></svg>
    ),
    description:
      "Your labels, polybags, retail boxes, inserts and export cartons, so the product arrives under your name.",
  },
  {
    title: "A sample before bulk",
    icon: (
      <svg viewBox="0 0 24 24" className={SPEC_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12.5 2.5 2.5 4.5-5" /></svg>
    ),
    description:
      "A physical sample is approved before bulk production begins, and bulk is made and checked against it.",
  },
];

const SPEC_SPOTS: SpecSpot[] = SPECIFICATION.map((point) => ({ ...point, at: SPEC_AT[point.title] ?? { x: 50, y: 50 } }));

/**
 * Questions about ordering across lines — the ones a buyer comparing six
 * pages asks, and that no single product page answers. MOQ and lead time
 * still commit to no number (#6).
 */
const ORDERING_FAQS: ProductFaq[] = [
  {
    question: "Can one order include several product lines?",
    answer:
      "Yes. Gloves, fightwear, pads, protective gear and lifting gear can go into one brief and be quoted together, so a club or brand can order several products at once.",
  },
  {
    question: "Is the minimum order per product or per order?",
    answer:
      "Minimum quantities depend on each product and its specification, including materials, construction and branding. The applicable requirement is confirmed with your quote, before you commit.",
  },
  {
    question: "Does each product need its own sample?",
    answer:
      "Products that require sampling are approved before their bulk production begins. Which products need a sample is confirmed with your quote.",
  },
  {
    question: "Can one logo and colour scheme carry across everything?",
    answer:
      "Yes. One colour reference and one logo treatment can be applied across every line in the order. Different materials reproduce colour differently, so the match is confirmed product by product.",
  },
  {
    question: "Can we start with one line and add others later?",
    answer:
      "Yes. Approved artwork, colour references and specifications can be kept on file, so a line added later is developed against the same reference.",
  },
  {
    question: "Do you make kids' boxing gloves and gear?",
    answer:
      "Yes. Kids' boxing, MMA and grappling gloves, head guards, punch bags and boxing sets can be made alongside the adult range, in the same colours and branding.",
  },
  {
    question: "Do you make products that are not listed here?",
    answer:
      "If the product is not listed, send a reference or a description. We can confirm whether it fits Sparwright's manufacturing capability before you proceed.",
  },
];

const FAQ_ICON = "size-5";

/** The ordering questions, by what a mixed order raises. */
const FAQ_GROUPS: FAQGroup[] = [
  {
    id: "mixed",
    title: "Mixed orders",
    icon: (
      <svg viewBox="0 0 24 24" className={FAQ_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    ),
    items: ORDERING_FAQS.slice(0, 4),
  },
  {
    id: "range",
    title: "Your range",
    icon: (
      <svg viewBox="0 0 24 24" className={FAQ_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4" />
      </svg>
    ),
    items: ORDERING_FAQS.slice(4),
  },
];

type Category = SliderCard;

/**
 * The six cards, one per product line, in the order a buyer browses — built
 * from PRODUCTS so each card is its line's page and a renamed page follows.
 * Lines with no page of their own (fitness, kit bags, uniforms) stay in the
 * full list (03), where brief-only products belong.
 */
const CARD_ORDER: { slug: string; title: string; photo?: Category["photo"] }[] = [
  { slug: "custom-boxing-gloves", title: "Boxing Gloves" },
  { slug: "custom-mma-gloves", title: "MMA Gloves & Gear" },
  { slug: "fightwear-club-apparel", title: "Fightwear & Club Apparel" },
  { slug: "custom-protective-gear", title: "Protective Gear" },
  {
    slug: "custom-pads-bags-mitts",
    title: "Pads, Bags & Mitts",
    // The training floor, rather than the line's workshop photograph, which
    // the page already shows in other places.
    photo: { src: boxingAthlete, alt: "A boxer in a gym holding a guard, ready for pad and bag work." },
  },
  { slug: "custom-lifting-belts", title: "Lifting Belts & Gear" },
];

const CATEGORIES: Category[] = CARD_ORDER.flatMap(({ slug, title, photo }) => {
  const product = getProduct(slug);
  const src = photo ?? product?.cardPhoto;
  if (!product || !src) return [];
  return [
    {
      title,
      items: product.types?.items.slice(0, 3).map((item) => item.title) ?? [],
      href: productHref(product),
      photo: { src: src.src, alt: src.alt },
    },
  ];
});

function productsJsonLd() {
  const base = siteUrl();
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: `${base}/products`,
        },
      ],
    },
    {
      // The page as a collection of the product pages, not a bare list: it
      // names what the hub is and ties the list to this URL.
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Custom fight gear, lifting gear and apparel",
      description: PAGE_DESCRIPTION,
      url: `${base}/products`,
      mainEntity: {
        "@type": "ItemList",
        name: "Custom products",
        itemListElement: PRODUCTS.map((product, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: product.name,
          url: `${base}${productHref(product)}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ORDERING_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
}

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(productsJsonLd()) }}
      />

      {/*
        Hero — a showroom stage: one line at a time, large, with its word
        behind it and its card in front; six thumbnails choose the line.
      */}
      <ProductStage
        breadcrumb={<Breadcrumb items={[{ label: "Products" }]} />}
        eyebrow="Custom products"
        title="Custom fight gear, lifting gear and apparel."
        // Names the lines and the buyers in the first lines a search engine
        // and a scanning buyer read; "six product lines" named neither.
        description={PAGE_DESCRIPTION}
        actions={
          <>
            <Button
              href="/quote"
              variant="primary"
              arrow
              data-analytics="hero_quote_click"
              data-analytics-surface="products_hero"
            >
              {CTA.quote}
            </Button>
            <Button href="/quote?intent=mockup" variant="secondary">
              {CTA.mockup}
            </Button>
          </>
        }
        lines={LINES}
      />

      <Marquee items={MARQUEE} />

      {/* 01 — The six lines, as a slider of tall photo cards. Light. */}
      <Section theme="light" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-[var(--space-9)]">
          {/* "Shop" is retail language on a manufacturer's page, and the old
              title was an instruction with no product term in it. */}
          <SectionHeader
            eyebrow="Product categories"
            index="01"
            title="Custom boxing, MMA, fightwear, protective and lifting gear."
          />
          <p className="text-body text-[var(--color-text-secondary)]">
            Six product lines,{" "}
            <span className="font-semibold text-[var(--color-text)]">
              each specified, sampled and branded in the same way.
            </span>
          </p>
        </div>
        <div className="mt-[var(--space-7)]">
          <LineSlider cards={CATEGORIES} />
        </div>
      </Section>

      {/*
        02 — By buyer: choose the gym, and the lines it usually needs
        assemble as an equation, equal to one quote. Dark.
      */}
      <Section theme="dark" width="work">
        <SectionHeader
          eyebrow="Start from your gym"
          index="02"
          title="Find the products that fit your gym or brand."
          description="Not every buyer starts with a product category. Choose the gym, club or brand closest to yours to see which product lines usually fit. One quote can cover all of them."
        />
        <div className="mt-[var(--space-7)]">
          <KitFinder
            buyers={KIT_BUYERS}
            label="Kind of gym or brand"
            quoteHref={`/quote?product=${encodeURIComponent("Multiple Products")}`}
          />
        </div>
      </Section>

      {/*
        03 — The full product list as a searchable index: a sticky category
        rail and one large search. Every product stays in the HTML as a
        crawlable link; filtering only hides. White.
      */}
      <Section theme="white" width="shell">
        <SectionHeader
          eyebrow="Full product list"
          index="03"
          title="Everything we make to order."
          description="Search the list or filter by category. Products with their own page link to it; those marked Brief open a request with the product already named."
        />
        <div className="mt-[var(--space-7)]">
          <CatalogueExplorer groups={CATALOGUE} />
        </div>
      </Section>

      {/*
        04 — What can be specified on any line, shown on the glove opened
        out: a pulsing point on each part, the detail beside it. Dark.
      */}
      <Section theme="dark" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <SectionHeader
            eyebrow="Made to your specification"
            index="04"
            title="One OEM and private label manufacturer for every line."
          />
          <p className="text-body text-[var(--color-text-secondary)]">
            Sparwright makes custom fight gear, lifting gear and apparel in Sialkot, Pakistan, for gyms, clubs and
            brands in the UK and Europe.{" "}
            <span className="font-semibold text-[var(--color-text)]">
              Every product on this page is specified in the same way, so one colour reference and one logo
              treatment can carry across a whole order.
            </span>
          </p>
        </div>
        <div className="mt-[var(--space-7)]">
          <SpecHotspots
            photo={{
              src: specConstruction,
              alt: "A black and red boxing glove beside its layers laid out in a line: the leather shell, three grades of foam padding, the lining, the wrist strap and a blank woven label.",
            }}
            spots={SPEC_SPOTS}
            label="What can be specified"
          />
        </div>
        <div className="mt-[var(--space-7)]">
          <Button href="/manufacturing" variant="inverse" arrow>
            {CTA.manufacturing}
          </Button>
        </div>
      </Section>

      {/* 05 — Ordering across lines, grouped. Light. */}
      <FAQGroups
        theme="light"
        eyebrow="Ordering"
        index="05"
        title="Ordering custom gear across product lines"
        groups={FAQ_GROUPS}
        name="products-faq"
      />

      {/* Closing — the range as a place to start a brief. */}
      <RangeStarter
        eyebrow="Start your order"
        title="Tell us what you want made."
        description="Send the product, your logo, a rough quantity and where it ships. A person reads every brief and replies with any questions left."
        surface="products_cta_product"
        intent="quote"
        pickerNote="Pick one to start a brief"
        products={STARTER_PRODUCTS}
        several={{
          label: "Several products in one order",
          description: "A full kit or range, quoted together.",
          product: "Multiple Products",
        }}
        actions={
          <>
            <Button
              href="/quote"
              variant="inverse"
              arrow
              data-analytics="hero_quote_click"
              data-analytics-surface="products_cta"
            >
              {CTA.quote}
            </Button>
            <Button
              href="/quote?intent=mockup"
              variant="secondary"
              data-analytics="hero_mockup_click"
              data-analytics-surface="products_cta"
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
