import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction } from "@/components/content/CallToAction";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { ProductCard } from "@/components/content/ProductCard";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { pageMetadata } from "@/lib/metadata";
import {
  PRODUCTS,
  getProduct,
  productCardItem,
  productHref,
  type ProductFaq,
} from "@/lib/products";
import { siteUrl } from "@/lib/site";
import { jsonLdScript } from "@/lib/structured-data";

/**
 * Products index — Design System §11 Information architecture.
 *
 * The hub for every product page: the menu, the footer, the breadcrumbs and
 * "View All Products" all land here. So it does four jobs, in order — shows
 * every page (the grid), routes a buyer who thinks in terms of their gym
 * rather than a product (by buyer, with the audience page for each), names
 * the lines that are made to order but have no page of their own, so nothing
 * a buyer is looking for silently falls off the site, and answers how an
 * order across several lines works.
 *
 * Everything is built from `PRODUCTS`, so a new product page appears here, in
 * the structured data and in the sitemap without touching this file.
 */

export const metadata: Metadata = pageMetadata({
  path: "/products",
  title: "Custom Fight Gear, Lifting Gear and Apparel",
  description:
    "Custom boxing and MMA gloves, fightwear, lifting belts, protective gear, punch bags and pads, made in Sialkot, Pakistan to your specification.",
});

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
 * Made to order, no page of its own — each opens the brief with the line
 * already named (`quotePrefill`). The same lines the mega menu sends to the
 * brief, so the two agree.
 */
const ALSO_MADE: string[] = [
  "BJJ Gi",
  "Karate Uniforms",
  "Kit Bags",
  "Jump Ropes",
  "Fitness Sandbags",
  "Sauna Suits",
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
    question: "Do you make products that are not listed here?",
    answer:
      "Often, yes. Martial arts uniforms, kit bags, fitness accessories and sauna wear are made to order too. Send a brief with a reference product or a description and we confirm what is practical.",
  },
];

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
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Custom products",
      itemListElement: PRODUCTS.map((product, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: product.name,
        url: `${base}${productHref(product)}`,
      })),
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

      <Section theme="light" width="work" density="compact">
        <Breadcrumb items={[{ label: "Products" }]} />
      </Section>

      <Section theme="light" width="work" density="compact">
        <div className="flex flex-col gap-[var(--space-6)] lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            as="h1"
            eyebrow="Custom products"
            title="Custom fight gear, lifting gear and apparel."
            description="Six product lines, all made to a specification you approve in Sialkot, Pakistan. Choose the line closest to what you need — every detail is confirmed on a sample before bulk production."
          />
          {/* Jump straight to a line. */}
          <nav aria-label="Product lines" className="lg:max-w-[26rem]">
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={productHref(product)}
                    className="inline-flex rounded-full border border-[var(--color-border-strong)]/40 bg-[var(--color-white)] px-3.5 py-1.5 text-small font-medium text-[var(--color-text)] transition-colors hover:border-forge-600 hover:text-forge-700"
                  >
                    {product.category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-[var(--space-7)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.slug}
              headingLevel="h2"
              item={productCardItem(product)}
            />
          ))}
        </div>
      </Section>

      {/* By buyer — for a gym that knows what it runs, not what we call it. */}
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Find your kit"
          index="01"
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

      {/* Made to order without a page — so nothing a buyer wants falls off the site. */}
      <Section theme="light" width="work">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
          <SectionHeader
            eyebrow="Also made to order"
            index="02"
            title="Looking for something else?"
            description="Martial arts uniforms, kit bags, fitness accessories and sauna wear are made to order too. Pick one to start a brief with it already named."
          />
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {ALSO_MADE.map((name) => (
              <li key={name}>
                <Link
                  href={`/quote?product=${encodeURIComponent(name)}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink-950 px-4 py-2 text-small font-semibold text-white transition-colors hover:bg-forge-600"
                >
                  {name}
                  <span aria-hidden="true" className="text-white/60 transition-colors group-hover:text-white">
                    +
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Ordering across lines — white, after the light made-to-order band. */}
      <Section theme="white" width="copy">
        <SectionHeader
          eyebrow="Ordering"
          index="03"
          title="Ordering across product lines"
          description="How a mixed order works — minimums, samples and one identity across everything."
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
