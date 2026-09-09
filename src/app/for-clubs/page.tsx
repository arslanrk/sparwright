import type { Metadata } from "next";
import { CallToAction } from "@/components/content/CallToAction";
import { Hero } from "@/components/content/Hero";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { ProductCard } from "@/components/content/ProductCard";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { PRODUCTS, productCardItem } from "@/lib/products";

/**
 * For Clubs and Gyms — Design System §11 For Clubs template, §A Starter copy.
 *
 * The template's eight sections in order: hero, common requirements,
 * coordinated kit visual, product options, mockup request, size and quantity
 * planning, sampling and production, reorders.
 *
 * This is the primary audience page, so the one conversion action throughout is
 * the mockup (§10 allows "Build Your Club Kit" here because the destination is
 * unambiguous). No MOQ, price break or lead time appears anywhere —
 * non-negotiables #5 and #6.
 */

export const metadata: Metadata = {
  title: "For Clubs and Gyms",
  description:
    "Custom gloves, fightwear and apparel created around your club colours, logo and practical ordering requirements.",
};

/** §11 "Explain typical club equipment and apparel needs." */
const REQUIREMENTS = [
  {
    title: "One identity across the kit",
    description:
      "Gloves, shorts, rashguards and apparel that use the same colours and logo treatment rather than three suppliers' interpretations of them.",
  },
  {
    title: "Ordering across members",
    description:
      "A size split that reflects who actually trains at the club, not a guess made at the point of ordering.",
  },
  {
    title: "Equipment that suits the session",
    description:
      "Different padding and construction for general training, sparring and pad work, specified rather than assumed.",
  },
  {
    title: "Something to show the committee",
    description:
      "A mockup and an approved sample you can put in front of members or a committee before money is committed.",
  },
];

/** §11 "Support member and team ordering." */
const PLANNING = [
  {
    title: "Collect sizes before you order",
    description:
      "Gather member sizes first and send the split with your requirements. It is the detail that most often delays a club order.",
  },
  {
    title: "Order the kit as one specification",
    description:
      "Specifying gloves and apparel together keeps colour references and logo placement consistent across everything.",
  },
  {
    title: "Plan for members who join later",
    description:
      "Your approved specification is retained, so a later top-up matches what the club already has.",
  },
];

/** §11 "Reduce overseas-manufacturing uncertainty." */
const SAMPLING = [
  "You send your club colours, logo artwork, the products you need and an approximate quantity.",
  "We confirm what is practical, flag anything that needs a decision, and align the specification with you.",
  "A sample is produced and photographed for your review.",
  "You approve the sample — or ask for a revision — before any bulk production starts.",
  "Bulk is checked against that approved sample before it is packed and dispatched.",
];

export default function ForClubsPage() {
  return (
    <>
      <Section theme="light" width="work" density="compact">
        <Breadcrumb items={[{ label: "For Clubs and Gyms" }]} />
      </Section>

      {/* 1 — Hero. §A copy, verbatim. */}
      <Hero
        eyebrow="For clubs and gyms"
        title="Put your club identity across the entire kit."
        description="Custom gloves, fightwear and apparel created around your club colours, logo and practical ordering requirements."
        actions={
          <>
            <Button href="/quote" variant="primary" arrow>
              {CTA.mockup}
            </Button>
            <Button href="/products" variant="secondary">
              {CTA.products}
            </Button>
          </>
        }
        media={
          <ImagePlaceholder
            shot="Coordinated product collection"
            ratio="hero"
          />
        }
      />

      {/* 2 — Common requirements. */}
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Common requirements"
          title="What clubs usually need sorted."
          description="Most club enquiries come down to the same four things. Getting them decided early is what keeps an order straightforward."
        />
        <ul className="mt-[var(--space-7)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-4">
          {REQUIREMENTS.map((item) => (
            <li
              key={item.title}
              className="border-t border-[var(--color-border)] pt-[var(--space-4)]"
            >
              <h3 className="text-heading-4">{item.title}</h3>
              <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3 — Coordinated kit visual. */}
      <Section theme="light" width="work">
        <div className="grid items-center gap-[var(--space-7)] lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="One identity"
              title="Gloves, fightwear and apparel under one club identity."
              description="The same colour references and logo treatment applied across every product, so the kit reads as one set rather than separate orders that happen to share a badge."
            />
            <div className="mt-[var(--space-6)]">
              <Button href="/quote" variant="secondary">
                {CTA.clubKit}
              </Button>
            </div>
          </div>
          <ImagePlaceholder
            shot="Coordinated product collection"
            ratio="process"
          />
        </div>
      </Section>

      {/* 4 — Product options. */}
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Product options"
          title="Start from the category closest to your kit."
          description="Both pages cover what is customizable and what is confirmed before sampling."
        />
        <div className="mt-[var(--space-7)] grid gap-[var(--space-5)] sm:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.slug}
              item={productCardItem(product, CTA.products)}
            />
          ))}
        </div>
      </Section>

      {/* 5 — Mockup request. */}
      <Section theme="dark" width="work">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <SectionHeader
            eyebrow="Mockup request"
            title="See your club identity before production."
            description="Send your logo, colour references, the products you need and an approximate quantity. We review it and come back with the practical concept or the sampling step — not an automated quote."
          />
          <ul className="flex flex-col gap-3 text-body text-[var(--color-text-secondary)]">
            <li className="border-t border-[var(--color-border)] pt-3">
              Club logo artwork, in any of the usual formats
            </li>
            <li className="border-t border-[var(--color-border)] pt-3">
              Your colour references
            </li>
            <li className="border-t border-[var(--color-border)] pt-3">
              The products you want in the kit
            </li>
            <li className="border-t border-[var(--color-border)] pt-3">
              An approximate quantity, even a rough one
            </li>
          </ul>
        </div>
        <div className="mt-[var(--space-7)]">
          <Button href="/quote" variant="inverse" arrow>
            {CTA.mockup}
          </Button>
        </div>
      </Section>

      {/* 6 — Size and quantity planning. */}
      <Section theme="light" width="work">
        <SectionHeader
          eyebrow="Sizes and quantities"
          title="Planning an order across your members."
          description="Club orders are rarely one size and one quantity. These are the three things worth settling before you send requirements."
        />
        <ol className="mt-[var(--space-7)] grid gap-[var(--space-5)] lg:grid-cols-3">
          {PLANNING.map((item, index) => (
            <li
              key={item.title}
              className="border-t-2 border-[var(--color-border)] pt-[var(--space-4)]"
            >
              <p className="font-display text-heading-4 text-[var(--color-action)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-body text-body-large font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 7 — Sampling and production. */}
      <Section theme="white" width="copy">
        <SectionHeader
          eyebrow="Sampling and production"
          title="Nothing is produced in bulk until you have approved it."
          description="Ordering from another country is mostly a question of what you can check, and when. This is where those points are."
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

      {/* 8 — Reorders. */}
      <Section theme="light" width="copy">
        <SectionHeader
          eyebrow="Reorders"
          title="Your approved specification is kept."
          description="Artwork, colour references, construction details and the approved sample record are retained against your club. A repeat order is produced against that reference rather than developed from scratch, so kit ordered later matches kit ordered now."
        />
      </Section>

      <CallToAction
        title="Ready to build your club kit?"
        description="Send your club colours, logo, products and approximate quantity."
        action={{ label: CTA.mockup, href: "/quote" }}
      />
    </>
  );
}
