import type { Metadata } from "next";
import { CallToAction } from "@/components/content/CallToAction";
import { ProductCard } from "@/components/content/ProductCard";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { PRODUCTS, productCardItem } from "@/lib/products";

/**
 * Products index — Design System §11 Information architecture, §12 Responsive.
 *
 * Two focused pages rather than a wide shallow catalogue: §11 launches with the
 * anchor product and one combined fightwear and apparel page, and
 * non-negotiable #7 rules out dozens of weak product pages. The grid is capped
 * at four cards per row (§12 desktop rules) so it stays right as the range
 * grows.
 */

/**
 * §08 gives the product-card action as "Explore Custom Gloves → or equivalent",
 * so each category gets its own unambiguous label from the locked CTA library.
 */
const PRODUCT_ACTIONS: Record<string, string> = {
  "custom-boxing-gloves": CTA.exploreGloves,
  "fightwear-club-apparel": CTA.exploreFightwear,
};

export const metadata: Metadata = {
  title: "Custom Products",
  description:
    "Custom boxing gloves, fightwear and club apparel manufactured in Sialkot against your branding, colours and product specifications.",
};

export default function ProductsPage() {
  return (
    <>
      <Section theme="light" width="work" density="compact">
        <Breadcrumb items={[{ label: "Products" }]} />
      </Section>

      <Section theme="light" width="work" density="compact">
        <SectionHeader
          as="h1"
          eyebrow="Custom products"
          title="Custom gloves, fightwear and club apparel."
          description="Every product is made to a specification you approve. Choose the category closest to what you need and send your requirements — the detail is confirmed before anything is produced."
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

      <Section theme="white" width="copy">
        <SectionHeader
          title="Not sure which category fits?"
          description="Send the product you have in mind, a reference if you have one, and the quantity range you are planning. We will confirm what is practical before you commit to a specification."
        />
        <ul className="mt-[var(--space-5)] flex flex-col gap-2 text-body text-[var(--color-text-secondary)]">
          {PRODUCTS.map((product) => (
            <li key={product.slug}>
              <span className="font-semibold text-[var(--color-text)]">
                {product.name}
              </span>{" "}
              — {product.cardDescription}
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction
        title="Ready to develop your custom fight gear?"
        description="Send your product, branding, quantity and destination."
        action={{ label: CTA.quote, href: "/quote" }}
      />
    </>
  );
}
