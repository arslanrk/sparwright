import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CallToAction } from "@/components/content/CallToAction";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { ImageGallery } from "@/components/content/ImageGallery";
import { ProductCard } from "@/components/content/ProductCard";
import { SpecificationTable } from "@/components/content/SpecificationTable";
import { Button } from "@/components/foundation/Button";
import { Section, type SectionTheme } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { pageMetadata } from "@/lib/metadata";
import {
  PRODUCTS,
  getProduct,
  getRelatedProducts,
  productCardItem,
  productHref,
  type Product,
} from "@/lib/products";
import { siteUrl } from "@/lib/site";
import { jsonLdScript } from "@/lib/structured-data";

/**
 * Product page — Design System §11 Product page template.
 *
 * Sections in order: breadcrumb and hero with the gallery and overview, the
 * types within the line, use cases, a material comparison, materials and
 * customization, sample and approval, quality control, related products, the
 * product's own FAQ, and the quote band. Types and the material comparison are
 * optional — a product that has neither simply skips them.
 *
 * Section headings are built from `product.noun` so each carries the search
 * term ("custom boxing gloves") rather than "these". The FAQ is the product's
 * own set, not the homepage's, so the two pages do not repeat each other.
 */

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return pageMetadata({
    path: productHref(product),
    title: product.seo?.title ?? product.name,
    description: product.seo?.description ?? product.summary,
  });
}

/** The other light surface — the run alternates so neighbours never match. */
const next = (theme: SectionTheme): SectionTheme =>
  theme === "light" ? "white" : "light";

/**
 * Breadcrumb and FAQ data for search engines. Product data is left out on
 * purpose: Google treats a Product without a price, offer or review as an
 * invalid item, and a made-to-order page has none of the three to give.
 */
function productJsonLd(product: Product) {
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
        {
          "@type": "ListItem",
          position: 3,
          name: product.name,
          item: `${base}${productHref(product)}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: product.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const noun = product.noun ?? product.name.toLowerCase();
  const Noun = noun.charAt(0).toUpperCase() + noun.slice(1);

  // Links that carry the product into the quote form, so the buyer does not
  // have to say it twice. `quotePrefill` reads `?product=`.
  const productParam = product.quoteProduct
    ? `product=${encodeURIComponent(product.quoteProduct)}`
    : "";
  const quoteHref = productParam ? `/quote?${productParam}` : "/quote";
  const mockupHref = `/quote?intent=mockup${productParam ? `&${productParam}` : ""}`;

  // The light run between the hero and the dark sample band.
  const typesTheme: SectionTheme = "white";
  const useCasesTheme: SectionTheme = product.types ? next(typesTheme) : "white";
  const optionsTheme = next(useCasesTheme);
  const materialsTheme = product.materialOptions
    ? next(optionsTheme)
    : next(useCasesTheme);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(productJsonLd(product)) }}
      />

      {/* 1 — Breadcrumb and product hero. */}
      <Section theme="light" width="work" density="compact">
        <Breadcrumb
          items={[
            { label: "Products", href: "/products" },
            { label: product.name },
          ]}
        />
      </Section>

      <Section theme="light" width="work" density="compact">
        <div className="grid gap-[var(--space-7)] lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeader
              as="h1"
              eyebrow={product.category}
              title={product.heading ?? product.name}
              description={product.summary}
            />
            <div className="mt-[var(--space-6)] flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                href={mockupHref}
                variant="primary"
                arrow
                data-analytics="hero_mockup_click"
                data-analytics-product={product.name}
                data-analytics-surface="product_hero"
              >
                {CTA.mockup}
              </Button>
              <Button
                href={quoteHref}
                variant="secondary"
                data-analytics="hero_quote_click"
                data-analytics-product={product.name}
                data-analytics-surface="product_hero"
              >
                {CTA.quote}
              </Button>
            </div>
            {/* 2 — Short product overview, beside the gallery. */}
            <p className="mt-[var(--space-6)] max-w-copy text-body text-[var(--color-text-secondary)]">
              {product.overview}
            </p>
          </div>
          <ImageGallery items={product.gallery} />
        </div>
      </Section>

      {/* 3 — The types within the line. */}
      {product.types ? (
        <Section theme={typesTheme} width="work">
          <SectionHeader
            eyebrow="Glove types"
            title={product.types.title}
            description={product.types.description}
          />
          <ul className="mt-[var(--space-6)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-5">
            {product.types.items.map((type) => (
              <li
                key={type.title}
                className="border-t border-[var(--color-border)] pt-[var(--space-4)]"
              >
                <h3 className="text-heading-4">{type.title}</h3>
                {type.spec ? (
                  <p className="mt-1 text-small font-semibold text-[var(--color-text)]">
                    {type.spec}
                  </p>
                ) : null}
                <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                  {type.description}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 4 — Where they are used. */}
      <Section theme={useCasesTheme} width="work">
        <SectionHeader
          eyebrow="Use cases"
          title={`Where ${noun} are used`}
          description="The intended use decides the construction, so it is the first thing we confirm."
        />
        <ul className="mt-[var(--space-6)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-4">
          {product.useCases.map((useCase) => (
            <li
              key={useCase.title}
              className="border-t border-[var(--color-border)] pt-[var(--space-4)]"
            >
              <h3 className="text-heading-4">{useCase.title}</h3>
              <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                {useCase.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5 — The material choice, side by side. */}
      {product.materialOptions ? (
        <Section theme={optionsTheme} width="work">
          <SectionHeader
            eyebrow="Materials"
            title={product.materialOptions.title}
            description={product.materialOptions.description}
          />
          <div className="mt-[var(--space-6)] grid gap-[var(--space-5)] md:grid-cols-2">
            {product.materialOptions.options.map((option) => (
              <div
                key={option.name}
                className="rounded-xl border border-[var(--color-border)] p-[var(--space-6)]"
              >
                <h3 className="text-heading-4">{option.name}</h3>
                <p className="mt-1 text-small text-[var(--color-text-secondary)]">
                  <span className="font-semibold text-[var(--color-text)]">
                    Best for:
                  </span>{" "}
                  {option.bestFor}
                </p>
                <ul className="mt-[var(--space-4)] flex flex-col gap-2">
                  {option.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 text-body text-[var(--color-text-secondary)]"
                    >
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-forge-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* 6 — Materials and construction; customization options. */}
      <Section theme={materialsTheme} width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Specification"
              title="Materials and construction"
              description="What gets decided before sampling, and what the approved sample then fixes."
            />
            <SpecificationTable
              rows={product.materials}
              className="mt-[var(--space-5)]"
            />
          </div>
          <div>
            <SectionHeader
              eyebrow="Customization"
              title="Customization options"
              description="The four things you control on every order."
            />
            <SpecificationTable
              rows={product.customization}
              className="mt-[var(--space-5)]"
            />
          </div>
        </div>
      </Section>

      {/* 7 — Sample and approval process. */}
      <Section theme="dark" width="work">
        <SectionHeader
          eyebrow="Sample and approval"
          title="Nothing goes to bulk before you approve a sample."
        />
        <ol className="mt-[var(--space-6)] grid gap-[var(--space-5)] md:grid-cols-2 lg:grid-cols-4">
          {product.sampling.map((step, index) => (
            <li
              key={step}
              className="border-t-2 border-[var(--color-border)] pt-[var(--space-4)]"
            >
              <p className="font-display text-heading-4 text-[var(--color-action-text)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-body text-[var(--color-text-secondary)]">
                {step}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-[var(--space-7)]">
          <Button
            href={mockupHref}
            variant="inverse"
            arrow
            data-analytics="sample_request"
            data-analytics-product={product.name}
          >
            {CTA.sample}
          </Button>
        </div>
      </Section>

      {/* 8 — Quality-control points. */}
      <Section theme="white" width="copy">
        <SectionHeader
          eyebrow="Quality control"
          title={`What is checked on ${noun} before dispatch`}
          // §11: only checks the team will consistently perform and record.
          description="Every one of these is performed and recorded before the order leaves the workshop."
        />
        <ul className="mt-[var(--space-5)] flex flex-col gap-3">
          {product.qualityPoints.map((point) => (
            <li
              key={point}
              className="border-b border-[var(--color-border)] pb-3 text-body text-[var(--color-text-secondary)]"
            >
              {point}
            </li>
          ))}
        </ul>
      </Section>

      {/* 9 — Related products. */}
      {related.length > 0 ? (
        <Section theme="light" width="work">
          <SectionHeader eyebrow="Also made to order" title="More custom products" />
          <div className="mt-[var(--space-6)] grid gap-[var(--space-5)] sm:grid-cols-2 xl:grid-cols-4">
            {related.map((item) => (
              <ProductCard
                key={item.slug}
                item={productCardItem(item, CTA.products)}
              />
            ))}
          </div>
        </Section>
      ) : null}

      {/* 10 — Product-specific FAQ. */}
      <Section theme="white" width="copy">
        <SectionHeader eyebrow="Questions" title={`${Noun} — common questions`} />
        <FAQAccordion
          items={product.faqs}
          openFirst
          className="mt-[var(--space-6)]"
        />
      </Section>

      {/* 11 — Quote or mockup CTA. */}
      <CallToAction
        title={product.closing?.title ?? "Tell us what you want made."}
        description={
          product.closing?.description ??
          "Send the product, your logo, a rough quantity and where it ships. A person replies — with any questions left, not an automated quote."
        }
        action={{
          label: CTA.quote,
          href: quoteHref,
          analytics: "hero_quote_click",
          surface: "product_cta",
        }}
        secondaryAction={{
          label: CTA.mockup,
          href: mockupHref,
          analytics: "hero_mockup_click",
          surface: "product_cta",
        }}
      />
    </>
  );
}
