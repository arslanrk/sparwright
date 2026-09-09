import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CallToAction } from "@/components/content/CallToAction";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { ImageGallery } from "@/components/content/ImageGallery";
import { ProductCard } from "@/components/content/ProductCard";
import { SpecificationTable } from "@/components/content/SpecificationTable";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  PRODUCTS,
  getProduct,
  getRelatedProducts,
  productCardItem,
} from "@/lib/products";

/**
 * Product page — Design System §11 Product page template.
 *
 * The ten sections in order: breadcrumb and hero, gallery with overview, use
 * cases, materials and construction, customization, sample and approval,
 * quality-control points, related products, product FAQ, quote CTA.
 *
 * The FAQ section renders the product's own narrower question set through
 * `FAQAccordion` (§08); the site-wide nine live on the homepage.
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

  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <>
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
              title={product.name}
              description={product.summary}
            />
            <div className="mt-[var(--space-6)] flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href="/quote" variant="primary" arrow>
                {CTA.mockup}
              </Button>
              <Button href="/quote" variant="secondary">
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

      {/* 3 — Available use cases. */}
      <Section theme="white" width="work">
        <SectionHeader
          title="Where these are used"
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

      {/* 4 — Materials and construction. 5 — Customization options. */}
      <Section theme="light" width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-2">
          <div>
            <SectionHeader
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

      {/* 6 — Sample and approval process. */}
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
          <Button href="/quote" variant="inverse" arrow>
            {CTA.sample}
          </Button>
        </div>
      </Section>

      {/* 7 — Quality-control points. */}
      <Section theme="white" width="copy">
        <SectionHeader
          eyebrow="Quality control"
          title="What is checked before dispatch"
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

      {/* 8 — Related products. */}
      {related.length > 0 ? (
        <Section theme="light" width="work">
          <SectionHeader title="Related products" />
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

      {/* 9 — Product-specific FAQ. */}
      <Section theme="white" width="copy">
        <SectionHeader
          eyebrow="Questions"
          title={`${product.name} — common questions`}
        />
        <FAQAccordion items={product.faqs} className="mt-[var(--space-6)]" />
      </Section>

      {/* 10 — Quote or mockup CTA. */}
      <CallToAction
        title="Ready to develop your custom fight gear?"
        description="Send your product, branding, quantity and destination."
        action={{ label: CTA.quote, href: "/quote" }}
      />
    </>
  );
}
