import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import { CallToAction } from "@/components/content/CallToAction";
import { CustomizationShowcase } from "@/components/content/CustomizationShowcase";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { ImageGallery } from "@/components/content/ImageGallery";
import { ProductCard } from "@/components/content/ProductCard";
import { SpecificationTable } from "@/components/content/SpecificationTable";
import { Button } from "@/components/foundation/Button";
import { Section, type SectionTheme } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  CUSTOMIZATION,
  CUSTOMIZATION_IMAGE,
  CUSTOMIZATION_SHOT,
} from "@/lib/customization";
import { cn } from "@/lib/cn";
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
 * types within the line, use cases, a material comparison, the exploded-glove
 * customization block, the specification, sample and approval, quality
 * control, related products, the product's own FAQ, and the quote band.
 * Several are optional — a product without types, a material comparison or a
 * showcase simply skips them.
 *
 * Because sections come and go, the page does not hand out surfaces or
 * numbers by hand. Each section after the hero is declared in `sections`;
 * light ones alternate light and white so no two neighbours match, dark ones
 * keep their own band, and every one takes the next number in its eyebrow —
 * the homepage's numbered-sheet treatment.
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

/** One section after the hero. `dark` keeps the dark band; the rest alternate. */
type PageSection = {
  key: string;
  dark?: boolean;
  render: (theme: SectionTheme, index: string) => ReactNode;
};

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

  const sections: PageSection[] = [];

  if (product.types) {
    const types = product.types;
    sections.push({
      key: "types",
      render: (theme, index) => (
        <Section theme={theme} width="work">
          <SectionHeader
            eyebrow={types.eyebrow}
            index={index}
            title={types.title}
            description={types.description}
          />
          <ul
            className={cn(
              "mt-[var(--space-7)] grid gap-[var(--space-4)] sm:grid-cols-2",
              // Six fill two rows of three; five sit in one row.
              types.items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-5",
            )}
          >
            {types.items.map((type, i) => (
              <li
                key={type.title}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)] transition-[border-color,transform] duration-200 ease-standard hover:border-forge-600/60 motion-safe:hover:-translate-y-1"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-forge-600 transition-transform duration-300 ease-standard group-hover:scale-x-100"
                />
                <span
                  aria-hidden="true"
                  className="font-display text-heading-3 font-bold tabular-nums text-[var(--color-border-strong)]/50 transition-colors group-hover:text-forge-600"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-[var(--space-4)] font-body text-body-large font-semibold leading-snug">
                  {type.title}
                </h3>
                <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                  {type.description}
                </p>
                {type.spec ? (
                  <p className="mt-auto pt-[var(--space-5)]">
                    {/* Rounded rather than a pill: in a narrow card a long
                        spec wraps, and a wrapped pill reads as a mistake. */}
                    <span className="inline-flex rounded-md bg-forge-100 px-2.5 py-1 text-small font-semibold leading-snug text-forge-700">
                      {type.spec}
                    </span>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ),
    });
  }

  sections.push({
    key: "use-cases",
    render: (theme, index) => (
      <Section theme={theme} width="work">
        <SectionHeader
          eyebrow="Use cases"
          index={index}
          title={`Where ${noun} are used`}
          description="The intended use decides the construction, so it is the first thing we confirm."
        />
        <ul className="mt-[var(--space-6)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-4">
          {product.useCases.map((useCase) => (
            <li
              key={useCase.title}
              className="border-l-2 border-forge-600 pl-[var(--space-4)]"
            >
              <h3 className="text-heading-4">{useCase.title}</h3>
              <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                {useCase.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    ),
  });

  if (product.materialOptions) {
    const options = product.materialOptions;
    sections.push({
      key: "material-options",
      render: (theme, index) => (
        <Section theme={theme} width="work">
          <SectionHeader
            eyebrow={options.eyebrow}
            index={index}
            title={options.title}
            description={options.description}
          />
          <div className="relative mt-[var(--space-7)] grid gap-[var(--space-5)] md:grid-cols-2">
            {/* The "or" between the two, where they meet. */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 z-10 hidden size-12 -translate-1/2 items-center justify-center rounded-full bg-ink-950 font-display text-small font-bold uppercase text-white ring-4 ring-[var(--color-bg)] md:flex"
            >
              or
            </span>
            {options.options.map((option, i) => (
              <div
                key={option.name}
                className={cn(
                  "rounded-xl border p-[var(--space-6)]",
                  i === 0
                    ? "border-transparent bg-ink-950 text-white [--color-text-secondary:var(--color-mist-300)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]",
                )}
              >
                <h3 className="text-heading-3">{option.name}</h3>
                <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                  <span className="font-semibold uppercase tracking-wide">
                    Best for
                  </span>{" "}
                  — {option.bestFor}
                </p>
                <ul className="mt-[var(--space-5)] flex flex-col gap-3 border-t border-current/15 pt-[var(--space-5)]">
                  {option.points.map((point) => (
                    <li key={point} className="flex gap-3 text-body">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="mt-1 size-4 shrink-0 text-forge-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m3 8.5 3 3 7-7" />
                      </svg>
                      <span className="text-[var(--color-text-secondary)]">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      ),
    });
  }

  if (product.customizationShowcase) {
    sections.push({
      key: "customization",
      dark: true,
      render: (theme, index) => (
        <Section theme={theme} width="work">
          <SectionHeader
            eyebrow="Customization"
            index={index}
            title={`Every part of your ${noun.replace(/s$/, "")}, your call.`}
            description="Branding, colour, construction and packaging are decided with you and fixed on the sample before bulk production."
          />
          <div className="mt-[var(--space-8)]">
            <CustomizationShowcase
              items={CUSTOMIZATION}
              image={CUSTOMIZATION_IMAGE}
              shot={CUSTOMIZATION_SHOT}
            />
          </div>
        </Section>
      ),
    });
  }

  sections.push({
    key: "specification",
    render: (theme, index) => (
      <Section theme={theme} width="work">
        {product.customizationShowcase ? (
          // Customization is already shown above, so the specification stands
          // alone: its header beside the table rather than above it.
          <div className="grid gap-[var(--space-7)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionHeader
              eyebrow="Specification"
              index={index}
              title="Materials and construction"
              description="What gets decided before sampling, and what the approved sample then fixes."
            />
            <SpecificationTable rows={product.materials} />
          </div>
        ) : (
          <div className="grid gap-[var(--space-8)] lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Specification"
                index={index}
                title="Materials and construction"
                description="What gets decided before sampling, and what the approved sample then fixes."
              />
              <SpecificationTable
                rows={product.materials}
                className="mt-[var(--space-5)]"
              />
            </div>
            <div>
              {/* An eyebrow, unnumbered, so this heading lines up with the
                  numbered one beside it — it is the same section. */}
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
        )}
      </Section>
    ),
  });

  sections.push({
    key: "sample",
    dark: true,
    render: (theme, index) => (
      <Section theme={theme} width="work">
        <SectionHeader
          eyebrow="Sample and approval"
          index={index}
          title="Nothing goes to bulk before you approve a sample."
        />
        <ol className="relative mt-[var(--space-7)] grid gap-[var(--space-5)] md:grid-cols-2 lg:grid-cols-4">
          {/* The route between the steps, from `lg`. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-[12%] top-5 hidden h-0.5 bg-linear-to-r from-forge-600 to-success-600 lg:block"
          />
          {product.sampling.map((step, i) => (
            <li key={step} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 flex size-10 items-center justify-center rounded-full font-display text-small font-bold tabular-nums text-white ring-4 ring-[var(--color-bg)]",
                  i === product.sampling.length - 1 ? "bg-success-600" : "bg-forge-600",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-[var(--space-4)] text-body text-[var(--color-text-secondary)]">
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
    ),
  });

  sections.push({
    key: "quality",
    render: (theme, index) => (
      <Section theme={theme} width="work">
        <div className="grid gap-[var(--space-7)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <SectionHeader
            eyebrow="Quality control"
            index={index}
            title={`What is checked on ${noun} before dispatch`}
            // §11: only checks the team will consistently perform and record.
            description="Every one of these is performed and recorded before the order leaves the workshop."
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {product.qualityPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-4)] text-body text-[var(--color-text-secondary)]"
              >
                <span
                  aria-hidden="true"
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success-600 text-white"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 8.5 3 3 7-7" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    ),
  });

  if (related.length > 0) {
    sections.push({
      key: "related",
      render: (theme, index) => (
        <Section theme={theme} width="work">
          <SectionHeader
            eyebrow="Also made to order"
            index={index}
            title="More custom products"
          />
          <div className="mt-[var(--space-6)] grid gap-[var(--space-5)] sm:grid-cols-2 xl:grid-cols-4">
            {related.map((item) => (
              <ProductCard
                key={item.slug}
                item={productCardItem(item)}
              />
            ))}
          </div>
        </Section>
      ),
    });
  }

  sections.push({
    key: "faq",
    render: (theme, index) => (
      <Section theme={theme} width="copy">
        <SectionHeader
          eyebrow="Questions"
          index={index}
          title={`${Noun} — common questions`}
        />
        <FAQAccordion
          items={product.faqs}
          openFirst
          className="mt-[var(--space-6)]"
        />
      </Section>
    ),
  });

  // Surfaces and numbers. The hero is light, so the run starts on white.
  let lastLight: SectionTheme = "light";
  const rendered = sections.map((section, i) => {
    let theme: SectionTheme;
    if (section.dark) {
      theme = "dark";
    } else {
      theme = lastLight === "light" ? "white" : "light";
      lastLight = theme;
    }
    return (
      <Fragment key={section.key}>
        {section.render(theme, String(i + 1).padStart(2, "0"))}
      </Fragment>
    );
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(productJsonLd(product)) }}
      />

      {/* Breadcrumb and product hero. */}
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
            <p className="mt-[var(--space-6)] max-w-copy border-l-2 border-forge-600 pl-[var(--space-4)] text-body text-[var(--color-text-secondary)]">
              {product.overview}
            </p>
          </div>
          <ImageGallery items={product.gallery} />
        </div>
      </Section>

      {rendered}

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
