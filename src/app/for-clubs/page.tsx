import type { Metadata } from "next";
import {
  CheckList,
  FramedPhoto,
  NumberedCards,
  StepRoute,
} from "@/components/content/AudienceBlocks";
import { CallToAction } from "@/components/content/CallToAction";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Hero } from "@/components/content/Hero";
import { ProductCard } from "@/components/content/ProductCard";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { pageMetadata } from "@/lib/metadata";
import { PRODUCTS, productCardItem, type ProductFaq } from "@/lib/products";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
} from "@/lib/structured-data";
import clubTeamKit from "../../../public/images/club-team-kit.jpg";
import gymAthletes from "../../../public/images/gyms-and-academies.png";

/**
 * Gyms & Academies — Design System §11 For Clubs template, §A Starter copy.
 *
 * The primary audience page. Named as the navbar and the homepage card name
 * it; the route stays /for-clubs so existing links hold.
 *
 * Sections: hero, what clubs usually need, one identity, the six product
 * lines, the mockup request, planning across members, sampling, and the
 * club's own questions. Reorders, which were a heading with no body, are now
 * answered in the FAQ and in planning. The one conversion action throughout
 * is the mockup. No MOQ, price break or lead time — non-negotiables #5 and #6.
 */

export const metadata: Metadata = pageMetadata({
  path: "/for-clubs",
  title: "Custom Gym and Club Kit Manufacturer",
  description:
    "Custom boxing and MMA gloves, fightwear, protective gear and club apparel for gyms and academies — in your colours, with your logo, sized for every member.",
});

/** §11 "Explain typical club equipment and apparel needs." */
const REQUIREMENTS = [
  {
    title: "One identity across the kit",
    description:
      "Gloves, shorts, rashguards and apparel in the same colours and logo treatment, not three suppliers' interpretations of them.",
  },
  {
    title: "Ordering across members",
    description:
      "A size split that reflects who actually trains at the club — adults and juniors — not a guess made at ordering.",
  },
  {
    title: "Equipment that suits the session",
    description:
      "Different padding and construction for training, sparring and pad work, specified rather than assumed.",
  },
  {
    title: "Something to show the committee",
    description:
      "A mockup and an approved sample to put in front of members or a committee before money is committed.",
  },
];

/** §11 "Support member and team ordering." */
const PLANNING = [
  {
    title: "Collect sizes before you order",
    description:
      "Gather member sizes first and send the split with your brief. It is the detail that most often delays a club order.",
  },
  {
    title: "Order the kit as one specification",
    description:
      "Specifying gloves and apparel together keeps colour references and logo placement consistent across everything.",
  },
  {
    title: "Plan for members who join later",
    description:
      "Your approved specification is kept, so a later top-up matches what the club already wears.",
  },
];

/** §11 "Reduce overseas-manufacturing uncertainty." */
const SAMPLING = [
  "You send your club colours, logo artwork, the products you need and an approximate quantity.",
  "We confirm what is practical, flag anything that needs a decision, and align the specification with you.",
  "A mockup, then a physical sample, is produced and photographed for your review.",
  "You approve the sample — or ask for a revision — before any bulk production starts.",
  "Bulk is made and checked against the sample you approved, then packed and dispatched.",
];

/** What a club sends for a mockup. */
const MOCKUP_NEEDS = [
  "Club logo artwork — SVG, PDF, AI, EPS, PNG or JPG",
  "Your colour references, or a physical swatch",
  "The products you want in the kit",
  "An approximate quantity and size split",
];

const FAQS: ProductFaq[] = [
  {
    question: "Can you make kit in our exact club colours?",
    answer:
      "Yes. Send colour codes or a physical swatch. Colours are matched on the sample, and the same reference is carried across every product in the order.",
  },
  {
    question: "Can one order cover different sizes?",
    answer:
      "Yes. Send the size split with your brief and we confirm it against the quantity before bulk production, so the whole club is covered in one run.",
  },
  {
    question: "Do you make kids' sizes for junior members?",
    answer:
      "Yes — kids' boxing and MMA gloves, head guards and protective gear are made to order in the same colours as the club's adult kit.",
  },
  {
    question: "Can we see the kit before we commit?",
    answer:
      "Yes. You get a mockup of your products first, then a physical sample to approve. Nothing goes to bulk until you have signed it off.",
  },
  {
    question: "Can new members order matching kit later?",
    answer:
      "Yes. Your approved artwork, colour references and specifications stay on file, so a later top-up matches what the club already has.",
  },
  {
    question: "What is the minimum order for club kit?",
    answer:
      "Minimums are set per product, by its material and branding method. Send the products and a rough quantity and we confirm the minimum for each before you commit.",
  },
];

export default function ForClubsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd([{ name: "Gyms & Academies", path: "/for-clubs" }]),
            faqJsonLd(FAQS),
          ]),
        }}
      />

      <Section theme="light" width="work" density="compact">
        <Breadcrumb items={[{ label: "Gyms & Academies" }]} />
      </Section>

      {/* Hero. §A title, verbatim; the line now names every line we make. */}
      <Hero
        eyebrow="Gyms & Academies"
        title="Put your club identity across the entire kit."
        description="Custom gloves, fightwear, protective gear and club apparel for boxing, MMA and fitness gyms — in your club colours, with your logo, sized for every member."
        actions={
          <>
            <Button
              href="/quote?intent=mockup"
              variant="primary"
              arrow
              data-analytics="hero_mockup_click"
              data-analytics-surface="clubs_hero"
            >
              {CTA.mockup}
            </Button>
            <Button href="/products" variant="secondary">
              {CTA.products}
            </Button>
          </>
        }
        media={
          <FramedPhoto
            src={clubTeamKit}
            alt="Three members of one club standing together in matching black hoodies and T-shirts, each with the same red shield on the chest."
            priority
          />
        }
      />

      {/* 01 — What clubs usually need. */}
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Common requirements"
          index="01"
          title="What clubs usually need sorted."
          description="Most club enquiries come down to the same four things. Deciding them early is what keeps an order straightforward."
        />
        <NumberedCards items={REQUIREMENTS} columns={4} />
      </Section>

      {/* 02 — One identity. */}
      <Section theme="light" width="work">
        <div className="grid items-center gap-[var(--space-7)] lg:grid-cols-2">
          <FramedPhoto
            src={gymAthletes}
            alt="A boxer and a club member in matching custom kit, both carrying the same club emblem."
            ratio="aspect-square"
            cutout
          />
          <div>
            <SectionHeader
              eyebrow="One identity"
              index="02"
              title="Gloves, fightwear and apparel under one club identity."
              description="The same colour references and logo treatment across every product, so the kit reads as one set rather than separate orders that happen to share a badge."
            />
            <CheckList
              className="mt-[var(--space-6)]"
              columns={1}
              items={[
                "One colour reference, matched on every sample",
                "One logo treatment, placed per product",
                "One specification, kept for every reorder",
              ]}
            />
            <div className="mt-[var(--space-6)]">
              <Button href="/quote?intent=mockup" variant="primary" arrow>
                {CTA.clubKit}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 — The product lines. */}
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Build your kit"
          index="03"
          title="Everything a gym orders, from one maker."
          description="Six product lines, each specified and sampled with you. Most club kits draw on two or three of them — one brief covers all of them."
        />
        <div className="mt-[var(--space-7)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} item={productCardItem(product)} />
          ))}
        </div>
      </Section>

      {/* 04 — The mockup request. */}
      <Section theme="dark" width="work">
        <div className="grid gap-[var(--space-7)] lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Mockup request"
              index="04"
              title="Send your logo. See your kit before it is made."
              description="We come back with a mockup of your products, then a physical sample to approve — reviewed by a person, not an automated quote."
            />
            <div className="mt-[var(--space-6)]">
              <Button
                href="/quote?intent=mockup"
                variant="inverse"
                arrow
                data-analytics="hero_mockup_click"
                data-analytics-surface="clubs_mockup"
              >
                {CTA.mockup}
              </Button>
            </div>
          </div>
          <div>
            <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
              What to send
            </p>
            <CheckList className="mt-[var(--space-4)]" columns={1} items={MOCKUP_NEEDS} />
          </div>
        </div>
      </Section>

      {/* 05 — Planning across members. */}
      <Section theme="light" width="work">
        <SectionHeader
          eyebrow="Sizes and quantities"
          index="05"
          title="Planning an order across your members."
          description="Club orders are rarely one size and one quantity. These are the three things worth settling before you send your brief."
        />
        <NumberedCards items={PLANNING} />
      </Section>

      {/* 06 — Sampling and production. */}
      <Section theme="white" width="work">
        <div className="grid gap-[var(--space-7)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <SectionHeader
            eyebrow="Sampling and production"
            index="06"
            title="Nothing is produced in bulk until you have approved it."
            description="Ordering from another country is mostly a question of what you can check, and when. These are the checkpoints."
          />
          <StepRoute steps={SAMPLING} />
        </div>
      </Section>

      {/* 07 — Club questions. */}
      <Section theme="light" width="copy">
        <SectionHeader
          eyebrow="Questions"
          index="07"
          title="Club kit — common questions"
        />
        <FAQAccordion
          items={FAQS}
          name="clubs-faq"
          openFirst
          className="mt-[var(--space-6)]"
        />
      </Section>

      <CallToAction
        title="Ready to build your club kit?"
        description="Send your club colours, logo, the products and a rough size split. A person replies with anything left to confirm."
        action={{
          label: CTA.mockup,
          href: "/quote?intent=mockup",
          analytics: "hero_mockup_click",
          surface: "clubs_cta",
        }}
        secondaryAction={{
          label: CTA.quote,
          href: "/quote",
          analytics: "hero_quote_click",
          surface: "clubs_cta",
        }}
      />
    </>
  );
}
