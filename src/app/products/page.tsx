import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { CallToAction } from "@/components/content/CallToAction";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { HeroBanner } from "@/components/content/HeroBanner";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { MEGA_MENU } from "@/components/navigation/nav";
import { pageMetadata } from "@/lib/metadata";
import {
  PRODUCTS,
  getProduct,
  productHref,
  type ProductFaq,
} from "@/lib/products";
import { siteUrl } from "@/lib/site";
import { jsonLdScript } from "@/lib/structured-data";
import boxingAthlete from "../../../public/images/boxing-athlete.jpg";
import factoryFloor from "../../../public/images/boxing-glove-factory-floor.jpg";
import boxingGloves from "../../../public/images/boxing-gloves.jpg";
import clubTeamKit from "../../../public/images/club-team-kit.jpg";
import gymWear from "../../../public/images/gym-wear.jpg";
import mmaFighter from "../../../public/images/mma-fighter.jpg";
import strengthLifting from "../../../public/images/strength-and-lifting.jpg";

/**
 * Products index — Design System §11 Information architecture.
 *
 * The hub for every product page: the menu, the footer, the breadcrumbs and
 * "View All Products" all land here. Sections run in the order a buyer's
 * questions arrive, from broad to exact:
 *
 *   hero dark · 01 categories light · 02 by buyer white ·
 *   03 full product list light · 04 specification dark · 05 FAQ white · CTA
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
    "Custom boxing and MMA gloves, fightwear, protective gear, punch bags and lifting belts from an OEM and private label manufacturer in Sialkot, Pakistan.",
});

const PAGE_DESCRIPTION =
  "Boxing and MMA gloves, fightwear, protective gear, pads and bags, and lifting gear — made in Sialkot, Pakistan for gyms, clubs and private label brands, each to a specification you approve on a sample before bulk production.";

/**
 * Buyers who know their gym better than our category names. Each lists the
 * pages that kit is usually built from; slugs, so a renamed page follows.
 */
const BY_BUYER: {
  title: string;
  description: string;
  slugs: string[];
  /** The audience page written for this buyer. */
  audience: { label: string; href: string };
}[] = [
  {
    title: "Boxing gyms and clubs",
    description: "Gloves for members, pads for coaches, and protection for sparring.",
    slugs: ["custom-boxing-gloves", "custom-pads-bags-mitts", "custom-protective-gear"],
    audience: { label: CTA.gymManufacturing, href: "/for-clubs" },
  },
  {
    title: "MMA and kickboxing gyms",
    description: "Open-palm gloves and shin guards, with fightwear to match.",
    slugs: ["custom-mma-gloves", "fightwear-club-apparel", "custom-protective-gear"],
    audience: { label: CTA.gymManufacturing, href: "/for-clubs" },
  },
  {
    title: "Strength and fitness gyms",
    description: "Belts, straps and gloves for the floor, and training wear to go with them.",
    slugs: ["custom-lifting-belts", "fightwear-club-apparel"],
    audience: { label: CTA.gymManufacturing, href: "/for-clubs" },
  },
  {
    title: "Brands and private label",
    description: "Any line, under your own name, labels and packaging.",
    slugs: ["custom-boxing-gloves", "fightwear-club-apparel", "custom-lifting-belts"],
    audience: { label: CTA.privateLabel, href: "/private-label" },
  },
];

/**
 * The full product list — the mega menu's groups, flattened, so the page and
 * the menu can never list different products. A line with a page links to
 * it; a line without one opens the brief with it already named. This replaced
 * a six-item "Also made to order" row that covered the second case only and
 * left the long-tail names (speed bags, head harnesses, kids' boxing sets) in
 * the menu alone.
 */
const CATALOGUE = MEGA_MENU.flat();

const opensBrief = (href: string) => href.startsWith("/quote");

/**
 * What a buyer can specify on any line. Every point is already a commitment
 * made elsewhere — branding methods on the product pages and the expertise
 * grid, colour and packaging in `customization.ts`, grading in `expertise.ts`
 * — so nothing here is a new claim (#5, #6).
 */
const SPECIFICATION: { title: string; description: string }[] = [
  {
    title: "Logo and branding",
    description:
      "Embroidery, print, sublimation, embossing, patches or woven labels — the method chosen for each product and material.",
  },
  {
    title: "Colours matched to yours",
    description:
      "Send colour codes or a physical swatch. Colours are matched on the sample and kept on file for reorders.",
  },
  {
    title: "Materials and construction",
    description:
      "Leather or synthetic, padding, fabrics, closures and stitching, chosen against how the product will be used.",
  },
  {
    title: "Kids' to adult sizing",
    description:
      "Patterns graded across the full size run, so a club can order for every member in one kit.",
  },
  {
    title: "Private label and packaging",
    description:
      "Your labels, polybags, retail boxes, inserts and export cartons, so the product arrives under your name.",
  },
  {
    title: "A sample before bulk",
    description:
      "A mockup, then a physical sample of each product. Bulk production is made and checked against the one you approve.",
  },
];

/**
 * Questions about ordering across lines — the ones a buyer comparing six
 * pages asks, and that no single product page answers. MOQ and lead time
 * still commit to no number (#6).
 */
const ORDERING_FAQS: ProductFaq[] = [
  {
    question: "Can one order include several product lines?",
    answer:
      "Yes. Gloves, fightwear, pads, protective gear and lifting gear can go into one brief and be quoted together, so a club or brand orders its whole kit at once.",
  },
  {
    question: "Is the minimum order per product or per order?",
    answer:
      "Minimums are set per product, because they depend on its material, construction and branding method. We confirm the minimum for each item in your order with your quote, before you commit to anything.",
  },
  {
    question: "Does each product need its own sample?",
    answer:
      "Yes. A sample is made for each product in the order, and bulk production of that product starts only once you have approved it.",
  },
  {
    question: "Can one logo and colour scheme carry across everything?",
    answer:
      "Yes. One colour reference and one logo treatment are carried across every line in the order and checked on each sample, so gloves, shorts and hoodies read as one kit.",
  },
  {
    question: "Can we start with one line and add others later?",
    answer:
      "Yes. Your approved artwork, colour references and specifications stay on file, so a line added later is made to match the first.",
  },
  {
    question: "Do you make kids' boxing gloves and gear?",
    answer:
      "Yes. Kids' boxing, MMA and grappling gloves, head guards, punch bags and boxing sets are made alongside the adult ranges, in the same colours and branding, so a club can kit out its junior members to match.",
  },
  {
    question: "Do you make products that are not listed here?",
    answer:
      "Often, yes. The list above is what we make most often. If your product is not on it, send a brief with a reference product or a description and we confirm what is practical.",
  },
];

/**
 * The six categories under the banner — named the way a buyer browses, not
 * the way the product pages are titled. Each goes to the page that covers it;
 * Fitness and Yoga has no page of its own, so it opens the brief with the
 * line named. Fitness and Yoga are one card because yoga, once the moulded
 * mats and blocks are excluded, is a single item (straps). Protective gear
 * has no photograph of its own, so it rides in the Training card — one
 * training floor, pads and guards together — with its line linking to its
 * own page, so the grid still reaches all six product pages.
 *
 * Titles name the product, not just the sport: each card is an h3 and the
 * main body link to its page, so "Boxing Gloves" carries the term the page
 * ranks for where "Boxing" carried none.
 */
type Category = {
  title: string;
  /**
   * A few of the products inside, in the buyer's words. An item with an
   * `href` links to a different page from the card's own.
   */
  items: (string | { label: string; href: string })[];
  href: string;
  photo: { src: StaticImageData; alt: string };
};

const CATEGORIES: Category[] = [
  {
    title: "Boxing Gloves",
    items: ["Training and sparring gloves", "Bag and competition gloves", "Kids' boxing gloves"],
    href: "/products/custom-boxing-gloves",
    photo: {
      src: boxingGloves,
      alt: "A pair of matte black custom boxing gloves with a red crackle pattern.",
    },
  },
  {
    title: "MMA Gloves and Gear",
    items: ["MMA fight and sparring gloves", "Grappling gloves", "Shin guards"],
    href: "/products/custom-mma-gloves",
    photo: {
      src: mmaFighter,
      alt: "An MMA fighter throwing a jab in black open-palm MMA gloves.",
    },
  },
  {
    title: "Fitness and Yoga",
    items: ["Jump ropes", "Fitness sandbags", "Leg stretchers and yoga straps"],
    href: `/quote?product=${encodeURIComponent("Fitness and yoga accessories")}`,
    photo: {
      src: gymWear,
      alt: "An athlete in training wear standing in a gym with a jump rope at her feet.",
    },
  },
  {
    title: "Fightwear and Apparel",
    items: ["Fight shorts and rashguards", "Compression and training wear", "Club hoodies and tracksuits"],
    href: "/products/fightwear-club-apparel",
    photo: {
      src: clubTeamKit,
      alt: "Three club members in matching black hoodies and T-shirts with the same red shield.",
    },
  },
  {
    title: "Training and Protective Gear",
    items: [
      "Punch bags and focus mitts",
      "Thai pads and kicking shields",
      {
        label: "Head guards, shin guards and wraps",
        href: "/products/custom-protective-gear",
      },
    ],
    href: "/products/custom-pads-bags-mitts",
    photo: {
      src: boxingAthlete,
      alt: "A boxer in a gym holding a guard in custom boxing gloves.",
    },
  },
  {
    title: "Lifting Belts and Gear",
    items: ["Leather and nylon lifting belts", "Lifting straps and grips", "Weightlifting gloves"],
    href: "/products/custom-lifting-belts",
    photo: {
      src: strengthLifting,
      alt: "A lifter chalking his hands, wearing a black leather lifting belt.",
    },
  },
];

/**
 * A photo card: the image fills the card, a scrim carries the text at the
 * foot, and the whole card is the link. The photograph eases in on hover.
 *
 * The whole-card link is the title's, stretched over the card by its
 * `::after` — not a wrapping `<a>`, because an item may link to another page
 * and links cannot nest. The card is its own stacking context (`isolate`) so
 * the photograph and scrim can sit at -z-10 beneath the text; an item link
 * rises above the stretched area with `z-10`.
 */
function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl bg-ink-950 p-[var(--space-6)] text-white">
      <Image
        src={category.photo.src}
        alt={category.photo.alt}
        fill
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-500 ease-standard motion-safe:group-hover:scale-105"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/60 via-45% to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-forge-600 transition-transform duration-300 ease-standard group-hover:scale-x-100"
      />
      <div>
        <h3 className="font-display text-heading-3">
          <Link href={category.href} className="after:absolute after:inset-0">
            {category.title}
          </Link>
        </h3>
        <ul className="mt-[var(--space-3)] flex flex-col gap-1 text-small text-mist-300">
          {category.items.map((item) => (
            <li
              key={typeof item === "string" ? item : item.label}
              className="flex items-center gap-2"
            >
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-forge-600" />
              {typeof item === "string" ? (
                item
              ) : (
                <Link
                  href={item.href}
                  className="relative z-10 text-white underline decoration-forge-600 decoration-2 underline-offset-4 transition-colors hover:text-forge-100"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <span
          aria-hidden="true"
          className="mt-[var(--space-5)] inline-flex items-center gap-2 text-small font-semibold"
        >
          Explore {category.title}
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="size-4 text-forge-600 transition-transform motion-safe:group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
          </svg>
        </span>
      </div>
    </div>
  );
}

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
        The same photographic banner as the homepage: a full-bleed backdrop
        with the copy over it from `lg`, the photograph below the copy on a
        phone (§12). A different photograph from the homepage's, so the two
        heroes do not restate each other; the breadcrumb and the jump links
        sit inside the band.
      */}
      <HeroBanner
        compact
        image={{
          src: factoryFloor,
          alt: "Machinists at sewing benches on the Sialkot workshop floor, with finished boxing gloves, pads and fightwear hanging along the walls.",
        }}
        top={<Breadcrumb items={[{ label: "Products" }]} />}
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
        footer={
          // Jump straight to a line.
          <nav aria-label="Product lines">
            <ul className="flex flex-wrap gap-2">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={productHref(product)}
                    className="inline-flex rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 text-small font-medium text-white backdrop-blur-sm transition-colors hover:border-forge-600 hover:bg-forge-600"
                  >
                    {product.category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <Section theme="light" width="work">
        {/* "Shop" is retail language on a manufacturer's page, and the old
            title was an instruction with no product term in it. */}
        <SectionHeader
          eyebrow="Product categories"
          index="01"
          title="Custom boxing, MMA, fitness and lifting gear."
        />
        <ul className="mt-[var(--space-7)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <li key={category.title}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </Section>

      {/* By buyer — for a gym that knows what it runs, not what we call it. */}
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Find your kit"
          index="02"
          title="Not sure which page fits? Start from your gym."
          description="Most orders draw on more than one line. These are the pages a kit is usually built from — one quote covers all of them."
        />
        {/* From `lg` each card is a subgrid over four shared rows — title,
            description, links, audience page — so every row lines up across the four cards
            however long its text runs. */}
        <ul className="mt-[var(--space-7)] grid gap-[var(--space-5)] md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto_auto] lg:gap-y-0">
          {BY_BUYER.map((buyer) => (
            <li
              key={buyer.title}
              className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)] lg:row-span-4 lg:grid lg:grid-rows-subgrid"
            >
              <h3 className="font-body text-body-large font-semibold leading-snug">
                {buyer.title}
              </h3>
              <p className="mb-[var(--space-5)] mt-2 text-small text-[var(--color-text-secondary)]">
                {buyer.description}
              </p>
              <ul className="flex flex-col gap-1 border-t border-[var(--color-border)] pt-[var(--space-4)]">
                {buyer.slugs.map((slug) => {
                  const product = getProduct(slug);
                  if (!product) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={productHref(product)}
                        className="group flex items-center justify-between gap-2 rounded-sm py-1 text-small font-semibold text-[var(--color-text)] transition-colors hover:text-forge-700"
                      >
                        {/* The short category name: the full page names
                            wrapped to two lines in a quarter-width card. */}
                        {product.category}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          className="size-3.5 shrink-0 text-forge-600 transition-transform motion-safe:group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                        </svg>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {/* The page written for this buyer, below the product pages. */}
              <Link
                href={buyer.audience.href}
                // A text link, not a button: in a quarter-width card a button
                // either stretched to the full width or wrapped its label.
                className="group mt-[var(--space-4)] inline-flex items-center gap-2 self-start justify-self-start border-t-2 border-forge-600 pt-[var(--space-3)] text-small font-semibold text-forge-700 underline-offset-4 transition-colors hover:text-ink-950 hover:underline"
              >
                {buyer.audience.label}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3.5 shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/*
        The full product list — "do you make my exact item?", after the
        broader category and buyer routes. Light, between the white buyer band
        and the dark specification band. Columns rather than a grid: the groups
        run from two lines to seventeen, and columns pack them without gaps.
      */}
      <Section theme="light" width="work">
        <SectionHeader
          eyebrow="Full product list"
          index="03"
          title="Everything we make to order."
          description="Every product links to its page. Those marked + have no page of their own yet — choosing one opens a brief with it already named."
        />
        <div className="mt-[var(--space-7)] gap-x-[var(--space-6)] sm:columns-2 lg:columns-4">
          {CATALOGUE.map((group) => (
            <div key={group.heading} className="mb-[var(--space-6)] break-inside-avoid">
              <h3 className="border-b border-[var(--color-border)] pb-2 font-body text-body font-semibold">
                {group.href ? (
                  <Link href={group.href} className="transition-colors hover:text-forge-700">
                    {group.heading}
                  </Link>
                ) : (
                  group.heading
                )}
              </h3>
              <ul className="mt-2 flex flex-col">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between gap-2 py-1 text-small text-[var(--color-text-secondary)] transition-colors hover:text-forge-700"
                    >
                      {link.label}
                      {opensBrief(link.href) ? (
                        <span
                          aria-hidden="true"
                          className="text-[var(--color-text-muted)] transition-colors group-hover:text-forge-700"
                        >
                          +
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/*
        What can be specified on any line, and who makes it. The page had no
        customisation content and no statement of what Sparwright is — the two
        things a buyer comparing manufacturers checks — and it is where the
        page says "OEM", "private label" and "Sialkot" in body copy. Dark,
        between the light product list and the white FAQ.
      */}
      <Section theme="dark" width="work">
        <div className="grid gap-[var(--space-7)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div>
            <SectionHeader
              eyebrow="Made to your specification"
              index="04"
              title="One OEM and private label manufacturer for every line."
              description="Sparwright makes custom fight gear, lifting gear and apparel in Sialkot, Pakistan, for gyms, clubs and brands in the UK and Europe. Every product on this page is specified the same way, so one colour reference and one logo treatment carry across the whole order."
            />
            <div className="mt-[var(--space-6)]">
              <Button href="/manufacturing" variant="inverse" arrow>
                {CTA.manufacturing}
              </Button>
            </div>
          </div>
          <ul className="grid gap-[var(--space-5)] sm:grid-cols-2">
            {SPECIFICATION.map((point) => (
              <li
                key={point.title}
                className="border-t-2 border-forge-600 pt-[var(--space-4)]"
              >
                <h3 className="font-body text-body-large font-semibold leading-snug">
                  {point.title}
                </h3>
                <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Ordering across lines — white, after the dark specification band. */}
      <Section theme="white" width="copy">
        <SectionHeader
          eyebrow="Ordering"
          index="05"
          title="Ordering custom gear across product lines"
          description="How a mixed order works — minimums, samples, kids' sizes and one identity across everything."
        />
        <FAQAccordion
          items={ORDERING_FAQS}
          name="products-faq"
          openFirst
          className="mt-[var(--space-6)]"
        />
      </Section>

      <CallToAction
        title="Tell us what you want made."
        description="Send the product, your logo, a rough quantity and where it ships. A person replies — with any questions left, not an automated quote."
        action={{
          label: CTA.quote,
          href: "/quote",
          analytics: "hero_quote_click",
          surface: "products_cta",
        }}
        secondaryAction={{
          label: CTA.mockup,
          href: "/quote?intent=mockup",
          analytics: "hero_mockup_click",
          surface: "products_cta",
        }}
      />
    </>
  );
}
