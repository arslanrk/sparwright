import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FramedPhoto } from "@/components/content/AudienceBlocks";
import { CallToAction } from "@/components/content/CallToAction";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { HeroSlider, type HeroSlide } from "@/components/content/HeroSlider";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import type { ProductFaq } from "@/lib/products";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
} from "@/lib/structured-data";
import boxingClubsBanner from "../../../public/images/boxing-clubs-banner.jpg";
import factoryFloor from "../../../public/images/boxing-glove-factory-floor.jpg";
import clubApparelGroup from "../../../public/images/club-apparel-group.webp";
import gymAthletes from "../../../public/images/gyms-and-academies.png";
import mockupToGlove from "../../../public/images/logo-mockup-to-finished-glove.jpg";
import mmaAcademiesBanner from "../../../public/images/mma-academies-banner.jpg";

/**
 * Gyms & Academies — Design System §11 For Clubs template.
 *
 * The primary audience page. Named as the navbar and the homepage card name
 * it; the route stays /for-clubs so existing links hold.
 *
 * Sections run from who the kit is for to what happens after the order:
 *
 *   hero slider dark · 01 who it is for white · 02 what can be specified
 *   light · 03 product lines white · 04 one product or a full kit dark ·
 *   05 sizes and planning light · 06 the brief white · 07 sample before bulk
 *   dark · 08 reorders light · 09 FAQ white · closing CTA action
 *
 * Two adjacent sections never share a surface. The page's one h1 is the
 * slider's (screen-reader only); every section below opens with an h2.
 *
 * Every product line links to its page (03), and every action goes where the
 * internal linking plan sends it: mockups and "Build Your Club Kit" to
 * /quote?intent=mockup, briefs and quotes to /quote, the process to
 * /manufacturing. No MOQ, price, lead time or certification anywhere —
 * non-negotiables #5 and #6; the FAQ answers both by saying how they are set.
 */

export const metadata: Metadata = pageMetadata({
  path: "/for-clubs",
  title: "Custom Gym and Club Kit Manufacturer",
  description:
    "Custom boxing and MMA gloves, fightwear, protective gear and club apparel for gyms and academies — in your colours, with your logo, sized for every member.",
});

const PAGE = {
  gloves: "/products/custom-boxing-gloves",
  mma: "/products/custom-mma-gloves",
  pads: "/products/custom-pads-bags-mitts",
  protective: "/products/custom-protective-gear",
  apparel: "/products/fightwear-club-apparel",
  lifting: "/products/custom-lifting-belts",
};

/** The hero's one action, the same on every slide. */
function MockupAction({ slide }: { slide: string }) {
  return (
    <Button
      href="/quote?intent=mockup"
      variant="primary"
      arrow
      data-analytics="hero_mockup_click"
      data-analytics-surface={`clubs_hero_${slide}`}
    >
      {CTA.mockup}
    </Button>
  );
}

/**
 * One slide per kind of club. Each product links to the page that covers
 * it, so the hero is also the page's first route into the range.
 */
const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: "Boxing clubs",
    title: "Custom boxing gear for your club.",
    description:
      "Equip members, fighters and coaches with boxing gloves, pads, protective equipment and training gear made around your club colours, branding and product requirements.",
    products: [
      { label: "Boxing Gloves", href: PAGE.gloves },
      { label: "Focus Mitts & Pads", href: PAGE.pads },
      { label: "Punch Bags", href: PAGE.pads },
      { label: "Protective Gear", href: PAGE.protective },
    ],
    action: <MockupAction slide="boxing" />,
    photo: {
      src: boxingClubsBanner,
      alt: "Boxers of every level in one gym: a fighter in a head guard, a woman in white gloves, a coach holding focus mitts and junior members on the bag.",
      // Cropped to its figures — the right-hand photo area on a desktop, a
      // strip on a phone — centred on the boxer in white gloves.
      position: "62% center",
      layout: "full",
    },
  },
  {
    eyebrow: "MMA & martial arts",
    title: "Custom MMA gear built around your academy.",
    description:
      "Create MMA gloves, shin protection, grappling gear and fightwear around the way your members train, compete and represent your academy.",
    products: [
      { label: "MMA Gloves", href: PAGE.mma },
      { label: "Shin Guards", href: PAGE.mma },
      { label: "Grappling Gear", href: PAGE.mma },
      { label: "Rashguards & Fight Shorts", href: PAGE.apparel },
    ],
    action: <MockupAction slide="mma" />,
    photo: {
      src: mmaAcademiesBanner,
      alt: "Martial artists in a caged training gym: an MMA fighter in fight shorts and hand wraps, a woman in open-palm MMA gloves, a kickboxer, a fighter at the heavy bag and a martial artist wrapping his hands.",
      // Shown whole from xl; where it is cropped (the right-hand area, or a
      // strip on a phone) it centres on the woman in MMA gloves.
      position: "58% center",
      layout: "full",
    },
  },
  {
    eyebrow: "Fightwear & club apparel",
    title: "Take your club identity beyond the training floor.",
    description:
      "Bring your colours and branding across fightwear and apparel for fighters, coaches and members — from competition gear to everyday club clothing.",
    products: [
      { label: "Fight Shorts", href: PAGE.apparel },
      { label: "Rashguards", href: PAGE.apparel },
      { label: "T-Shirts", href: PAGE.apparel },
      { label: "Hoodies", href: PAGE.apparel },
      { label: "Tracksuits", href: PAGE.apparel },
    ],
    action: <MockupAction slide="apparel" />,
    // The six models in public/images/modals, composed into one transparent
    // group (public/images/club-apparel-group.webp): models 4 and 6 front and
    // centre at full size, 1 and 5 behind on the left, 3 and 2 on the right,
    // smaller and dimmed.
    photo: {
      src: clubApparelGroup,
      alt: "Six club members standing together in training apparel: at the front a long-sleeve top with striped leggings and a colour-block jacket with joggers, behind them a sports bra and leggings, a pullover hoodie, a T-shirt and shorts, and a matching pink set.",
      layout: "cutout",
    },
  },
];

/* -- 01 · For the way your club trains ------------------------------------ */

/** Who in the club the kit is for — each a different requirement. */
const EQUIP = [
  {
    label: "Members",
    title: "Equip your members",
    description:
      "Customise training equipment around the products, sizes and intended uses your members need. That can include boxing gloves, MMA gloves, protective gear and other products used during regular club sessions.",
  },
  {
    label: "Coaches",
    title: "Equip your coaches",
    description:
      "Build the equipment used for drills and coaching, including focus mitts, Thai pads, kicking shields, training sticks and punch bags.",
  },
  {
    label: "Fighters",
    title: "Equip your fighters",
    description:
      "Where the product line allows it, define different requirements for training, sparring and competition use rather than treating every glove or piece of equipment as interchangeable.",
  },
  {
    label: "Team",
    title: "Equip your team",
    description:
      "Carry the club identity beyond training equipment with fight shorts, rashguards, T-shirts, hoodies, tracksuits and other club apparel.",
  },
];

/* -- 02 · Made to your requirements --------------------------------------- */

const BRANDING_METHODS = [
  "Print",
  "Embroidery",
  "Sublimation",
  "Embossing",
  "Patches",
  "Woven labels",
];

const CONSTRUCTION_POINTS = [
  "Shell or fabric",
  "Padding",
  "Closure",
  "Stitching",
  "Sizing",
  "Finish",
  "Branding placement",
];

/* -- 03 · Equipment and apparel ------------------------------------------- */

const PRODUCT_LINES = [
  {
    title: "Custom boxing gloves",
    description:
      "Training, sparring, bag, competition and junior boxing gloves can be developed around intended use, agreed construction, club colours and branding.",
    link: { label: CTA.exploreGloves, href: PAGE.gloves },
  },
  {
    title: "Custom MMA gloves and gear",
    description:
      "Custom options include MMA fight gloves, sparring gloves, grappling and hybrid gloves, shin guards and junior MMA gloves.",
    link: { label: CTA.exploreMMA, href: PAGE.mma },
  },
  {
    title: "Pads, mitts and punch bags",
    description:
      "Build branded training equipment for coaches and gym sessions, including focus mitts, Thai pads, kicking shields, paddle mitts, training sticks and punch bags.",
    link: { label: CTA.explorePads, href: PAGE.pads },
  },
  {
    title: "Protective gear",
    description:
      "Customise equipment such as head guards, chest and body protectors, groin guards, shin and instep guards, hand wraps and other protective products.",
    link: { label: CTA.exploreProtective, href: PAGE.protective },
  },
  {
    title: "Fightwear and club apparel",
    description:
      "Carry your identity onto fight shorts, boxing trunks, rashguards, compression wear, T-shirts, hoodies, sweatshirts and tracksuits.",
    link: { label: CTA.exploreClubApparel, href: PAGE.apparel },
  },
  {
    title: "Strength and lifting gear",
    description:
      "For facilities that combine combat training with strength work, the range also includes lifting belts, training belts, straps, grips and weightlifting gloves.",
    link: { label: CTA.exploreLifting, href: PAGE.lifting },
  },
];

/* -- 04 · One product or a complete club range ---------------------------- */

const SINGLE_STARTS = [
  "Custom boxing gloves for members",
  "New pads for coaches",
  "Protective equipment",
  "Branded rashguards",
  "Club hoodies or tracksuits",
];

const CLUB_KIT = [
  {
    title: "Training floor",
    items: [
      "Boxing gloves",
      "MMA gloves",
      "Focus mitts",
      "Thai pads",
      "Punch bags",
      "Protective gear",
    ],
  },
  {
    title: "Fighters",
    items: [
      "Sparring equipment",
      "Fight shorts",
      "Rashguards",
      "Protective equipment",
    ],
  },
  {
    title: "Club apparel",
    items: ["T-shirts", "Hoodies", "Sweatshirts", "Tracksuits"],
  },
];

/* -- 05 · Sizes and order planning ---------------------------------------- */

const PLANNING = [
  {
    title: "Different equipment for different uses",
    description:
      "A glove intended for sparring does not necessarily have the same requirement as one intended for bag work or another training purpose. Tell us how the product will be used so the relevant specification can be discussed before sampling.",
  },
  {
    title: "Junior and adult requirements",
    description:
      "Where the product is available across junior and adult options, include the expected mix in your brief.",
  },
  {
    title: "Apparel size breakdowns",
    description:
      "For fightwear and club apparel, provide the expected size mix when you know it. If the final breakdown is not ready at the enquiry stage, begin with the information you have.",
  },
  {
    title: "Ordering several products",
    description:
      "Choose Multiple Products on the request form when your enquiry covers more than one line. You can explain the range you are considering in one brief.",
  },
];

/* -- 06 · Start with your brief ------------------------------------------- */

const BRIEF_ITEMS = [
  "The product or products",
  "Approximate quantity",
  "Club or academy logo",
  "Destination country",
  "Intended use",
  "Preferred colours",
  "Reference photographs or products",
  "Material or construction preferences, if known",
];

const NEXT_STEPS = [
  { title: "A mockup", description: "Your branding on the product, before anything is made." },
  { title: "A manufacturing quote", description: "When the requirement is clear enough to price." },
  {
    title: "Questions",
    description: "The details still needed to complete the specification.",
  },
];

/* -- 07 · Sample before bulk ---------------------------------------------- */

const STAGES: { title: string; description: string; checks?: string[] }[] = [
  {
    title: "Share your requirements",
    description:
      "Product, approximate quantity, logo, intended use and destination form the starting brief. Add colours, references and product requirements where you already know them.",
  },
  {
    title: "Review the concept",
    description:
      "The initial product direction is aligned, including branding, colour and the specifications that need to be defined.",
  },
  {
    title: "Approve the sample",
    description:
      "Materials, construction, sizing and finish are confirmed through the physical sample before bulk production.",
  },
  {
    title: "Production and quality control",
    description:
      "The order is produced against the approved specification. Quality-control checks can include:",
    checks: [
      "Dimensions and weight",
      "Materials and construction",
      "Branding and colour",
      "Labels and sizing",
      "Quantity and packing",
    ],
  },
  {
    title: "Packing and delivery",
    description:
      "Final quantities, packing requirements and shipment documentation are completed for the order.",
  },
];

/* -- 08 · Reorders -------------------------------------------------------- */

const REORDER_NEEDS = [
  "Replace regularly used equipment",
  "Add products for new members",
  "Order another run of apparel",
  "Expand into another product line",
  "Return to an existing approved design",
];

/* -- 09 · FAQ -------------------------------------------------------------- */

const FAQS: ProductFaq[] = [
  {
    question: "Can you put our club logo on boxing gloves and equipment?",
    answer:
      "Yes. Club branding can be applied using methods suited to the product and material, including print, embroidery, sublimation, embossing, patches and woven labels. Logo placement and branding method are agreed as part of the product specification.",
  },
  {
    question: "Can we start with only one product?",
    answer:
      "Yes. You do not need to order a complete club kit. Your enquiry can begin with one product, such as boxing gloves, pads, protective equipment, fightwear or apparel. If you later want to expand the range, existing approved artwork and specifications can provide a reference.",
  },
  {
    question: "Can we order several types of equipment together?",
    answer:
      "Yes. A club brief can cover multiple product types. Choose Multiple Products on the request form and describe the equipment and apparel you are considering.",
  },
  {
    question: "Do we need a complete tech pack?",
    answer:
      "No. A logo, product idea and basic requirements are enough to start the discussion. If you already have a tech pack, sketch or detailed reference, include it. Otherwise, the next step is to identify what must be defined before sampling.",
  },
  {
    question: "Can we order different sizes for different members?",
    answer:
      "Yes. Orders can be planned around the size mix required by the club, including junior and adult options where available. Provide the size breakdown when you know it.",
  },
  {
    question: "What is the minimum order quantity?",
    answer:
      "Minimum quantities depend on the product and specification. Material, construction, branding method and colour requirements can affect how an order needs to be planned. Send the product and approximate quantity you are considering and the applicable requirement can be confirmed with the quote.",
  },
  {
    question: "How long does an order take?",
    answer:
      "Timing depends on the products, specification, sampling requirements, quantity and destination. The relevant production and delivery requirements are confirmed with the quote once the brief has been reviewed.",
  },
  {
    question: "Can we approve a sample before bulk production?",
    answer:
      "Yes. The process is built around confirming the physical sample and product specification before bulk production. Materials, construction, sizing, branding and finish are agreed at the sample stage, and production is then checked against the approved reference.",
  },
  {
    question: "Can you keep our design for future orders?",
    answer:
      "Approved artwork and product specifications can be retained as a reference for reorders. Any changes to colours, materials, construction, sizing or other requirements should still be identified before the next production run.",
  },
];

/** The closing ticket: what happens after the brief, as section 06 says. */
const CLOSING_STEPS = [
  {
    title: "Send what you know",
    description: "The product, approximate quantity, logo and destination.",
  },
  {
    title: "A person reviews it",
    description: "Every brief is read before the next step is decided.",
  },
  {
    title: "The next step is defined",
    description: "A mockup, a manufacturing quote or the questions still open.",
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

      {/*
        Hero: three slides, one per kind of club — boxing, MMA and martial
        arts, then apparel. The page's h1 is constant and names the page for
        search; each slide's headline is an h2, since the slides are
        alternatives shown one at a time, not a document outline.
      */}
      <HeroSlider
        label="Custom gear for gyms and academies"
        slides={HERO_SLIDES}
        top={
          <>
            <Breadcrumb items={[{ label: "Gyms & Academies" }]} />
            <h1 className="sr-only">Custom fight gear for gyms and academies.</h1>
          </>
        }
      />

      {/* 01 — Who the kit is for. Intro left, the four people it serves right. */}
      <Section theme="white" width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <SectionHeader
              eyebrow="For the way your club trains"
              index="01"
              title="The right equipment depends on who is using it and how they train."
              description="A boxing club, MMA gym or martial-arts academy rarely has one equipment requirement."
            />
            <Prose className="mt-[var(--space-5)]">
              <p>
                Members may need training gloves. Fighters may need different
                equipment for sparring and competition preparation. Coaches work
                with pads, mitts and shields. Junior sessions bring their own
                size requirements. Outside the training floor, the club may also
                want fightwear and apparel carrying the same identity.
              </p>
              <p>
                Your manufacturing brief can reflect those differences instead
                of forcing every product into one standard specification.
              </p>
            </Prose>
            <div className="mt-[var(--space-6)]">
              <Button href="/quote" variant="primary" arrow>
                {CTA.brief}
              </Button>
            </div>
          </div>
          <ul className="grid gap-[var(--space-4)] sm:grid-cols-2">
            {EQUIP.map((item) => (
              <li
                key={item.title}
                className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]"
              >
                <span className="inline-flex self-start rounded-sm bg-forge-100 px-2 py-1 text-eyebrow uppercase text-forge-700">
                  {item.label}
                </span>
                <h3 className="mt-[var(--space-4)] font-body text-body-large font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 02 — What can be specified, and a start from only a logo. */}
      <Section theme="light" width="work">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-2 lg:items-end lg:gap-[var(--space-8)]">
          <SectionHeader
            eyebrow="Made to your requirements"
            index="02"
            title="Your club should not have to fit an off-the-shelf product."
            description="Custom manufacturing starts with defining what you actually need."
          />
          <Prose>
            <p>
              That may be as simple as adding your club identity to an
              established product type, or it may involve decisions about
              materials, construction, sizing, branding and packaging.
            </p>
            <p>
              You do not need every detail decided before you contact us. The
              purpose of the first brief is to establish what is already known
              and what still needs to be defined before sampling.
            </p>
          </Prose>
        </div>

        <ul className="mt-[var(--space-7)] grid gap-[var(--space-4)] md:grid-cols-2">
          <SpecCard title="Club branding">
            <p>
              Add your club crest, wordmark, sponsor artwork or other approved
              branding. Depending on the product and material, available methods
              can include:
            </p>
            <Chips items={BRANDING_METHODS} />
          </SpecCard>
          <SpecCard title="Club colours">
            <p>Supply colour codes or a physical colour reference where available.</p>
            <p>
              Because different materials can reproduce colour differently, the
              relevant appearance is confirmed through the product and sample
              process.
            </p>
          </SpecCard>
          <SpecCard title="Product construction">
            <p>Depending on the product, your specification may cover:</p>
            <Chips items={CONSTRUCTION_POINTS} />
          </SpecCard>
          <SpecCard title="Packaging">
            <p>
              Where required, the manufacturing brief can also define polybags,
              retail boxes, inserts, labels and export cartons.
            </p>
          </SpecCard>
        </ul>

        {/* The reassurance, with the mockup that shows where it leads. */}
        <div
          data-theme="dark"
          className="mt-[var(--space-7)] grid overflow-hidden rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] lg:grid-cols-2"
        >
          <div className="relative aspect-[16/10] bg-ink-950 lg:aspect-auto">
            <Image
              src={mockupToGlove}
              alt="A flat mockup of a black and tan glove with a shield emblem beside the finished glove, the emblem embroidered on the cuff."
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-contain p-[var(--space-5)]"
            />
          </div>
          <div className="p-[var(--space-6)] sm:p-[var(--space-7)]">
            <h3 className="text-heading-3">Starting with only a logo and an idea?</h3>
            <p className="mt-[var(--space-4)] text-body-large text-[var(--color-text-secondary)]">
              That is a valid starting point.
            </p>
            <Prose className="mt-[var(--space-4)]">
              <p>
                Send the product you are considering, your club logo,
                approximate quantity and any colours or references you already
                have.
              </p>
              <p>
                The remaining product decisions can then be identified before a
                sample is approved.
              </p>
            </Prose>
            <div className="mt-[var(--space-6)]">
              <Button
                href="/quote?intent=mockup"
                variant="inverse"
                arrow
                data-analytics="hero_mockup_click"
                data-analytics-surface="clubs_requirements"
              >
                {CTA.mockup}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 — The six product lines, each linked to its page. */}
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Equipment and apparel"
          index="03"
          title="Custom combat-sports products across the gym."
          description="Start with one product or combine several product lines in the same club brief."
        />
        <ul className="mt-[var(--space-7)] grid gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_LINES.map((line, i) => (
            <li
              key={line.title}
              className="group relative flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)] transition-[border-color,transform] duration-200 ease-standard hover:border-forge-600/60 motion-safe:hover:-translate-y-1"
            >
              <span
                aria-hidden="true"
                className="font-display text-heading-3 font-bold tabular-nums text-[var(--color-border-strong)]/50 transition-colors group-hover:text-forge-600"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-[var(--space-4)] font-body text-body-large font-semibold leading-snug">
                {line.title}
              </h3>
              <p className="mt-2 flex-1 text-small text-[var(--color-text-secondary)]">
                {line.description}
              </p>
              {/* The link's ::after covers the card, so the card is the target. */}
              <Link
                href={line.link.href}
                className="mt-[var(--space-5)] inline-flex items-center gap-2 text-small font-semibold text-forge-700 after:absolute after:inset-0 after:rounded-xl"
              >
                {line.link.label}
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 04 — One product or the whole kit. Dark, with the coordinated kit laid out. */}
      <Section theme="dark" width="work">
        <div className="grid items-center gap-[var(--space-8)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <SectionHeader
              eyebrow="One product or a complete club range"
              index="04"
              title="Order what your gym actually needs."
              description="You do not have to build a complete club range to work with Sparwright."
            />
            <p className="mt-[var(--space-6)] text-body text-[var(--color-text-secondary)]">
              Some gyms may begin with one clearly defined requirement:
            </p>
            <Chips items={SINGLE_STARTS} tone="dark" className="mt-[var(--space-4)]" />
            <p className="mt-[var(--space-5)] text-body text-[var(--color-text-secondary)]">
              Others may want several products developed together.
            </p>
          </div>
          <FramedPhoto
            src={gymAthletes}
            alt="A boxer and a club member in matching custom kit, both carrying the same club emblem."
            ratio="aspect-[5/4]"
            cutout
          />
        </div>

        <div className="mt-[var(--space-8)] rounded-xl border border-[var(--color-border)] bg-white/[0.03] p-[var(--space-6)] sm:p-[var(--space-7)]">
          <h3 className="text-heading-3">Build a coordinated club kit when it makes sense.</h3>
          <p className="mt-[var(--space-4)] max-w-copy text-body text-[var(--color-text-secondary)]">
            If you do want a broader club kit, your equipment and apparel can be
            planned around the same identity. For example:
          </p>
          <div className="mt-[var(--space-6)] grid gap-[var(--space-5)] md:grid-cols-3">
            {CLUB_KIT.map((group) => (
              <div key={group.title} className="border-t-2 border-forge-600 pt-[var(--space-4)]">
                <h4 className="font-body text-body font-semibold">{group.title}</h4>
                <TickList items={group.items} className="mt-[var(--space-3)]" />
              </div>
            ))}
          </div>
          <div className="mt-[var(--space-6)] grid gap-[var(--space-5)] border-t border-[var(--color-border)] pt-[var(--space-5)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <p className="max-w-copy text-body text-[var(--color-text-secondary)]">
              The products do not need to be identical. The aim is to carry the
              agreed club identity across the range while giving each item the
              construction and specification appropriate to its use.
            </p>
            <Button
              href="/quote?intent=mockup"
              variant="inverse"
              arrow
              data-analytics="hero_mockup_click"
              data-analytics-surface="clubs_kit"
            >
              {CTA.clubKit}
            </Button>
          </div>
        </div>
      </Section>

      {/* 05 — Sizes and order planning. */}
      <Section theme="light" width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <SectionHeader
              eyebrow="Sizes and order planning"
              index="05"
              title="Plan the order around the people who will use it."
              description="Club orders often include more variation than a single standard product."
            />
            <Prose className="mt-[var(--space-5)]">
              <p>
                You may need different glove weights, junior and adult products,
                several apparel sizes or separate equipment for members, fighters
                and coaches.
              </p>
              <p>Those requirements should be identified before production.</p>
            </Prose>
          </div>
          <NumberedCardList items={PLANNING} />
        </div>

        {/* "Not sure" is a real answer — said plainly, with the way in. */}
        <div className="mt-[var(--space-7)] grid gap-[var(--space-5)] rounded-xl border border-forge-600/30 bg-forge-100/60 p-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h3 className="text-heading-4">Not sure about quantity yet?</h3>
            <p className="mt-2 max-w-copy text-body text-[var(--color-text-secondary)]">
              You can still start. The enquiry form accepts Not sure as a
              quantity option. Minimum quantities depend on the product and
              specification and are confirmed as part of the quote rather than
              published as one number for every order.
            </p>
          </div>
          <Button href="/quote" variant="primary" arrow>
            {CTA.brief}
          </Button>
        </div>
      </Section>

      {/* 06 — Start with your brief: what to send, and what happens to it. */}
      <Section theme="white" width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <SectionHeader
              eyebrow="Start with your brief"
              index="06"
              title="Tell us what you want to make."
              description="You do not need a finished tech pack to begin. A useful first enquiry can be simple."
            />
            <h3 className="mt-[var(--space-7)] font-body text-body-large font-semibold">
              Send what you already know
            </h3>
            <TickList items={BRIEF_ITEMS} columns={2} className="mt-[var(--space-4)]" />
            <p className="mt-[var(--space-6)] border-l-2 border-forge-600 pl-[var(--space-4)] text-body text-[var(--color-text-secondary)]">
              If something is undecided, say so. The purpose of the request is to
              establish the requirement, not to pretend every decision has already
              been made.
            </p>
          </div>

          <div
            data-theme="dark"
            className="self-start rounded-xl bg-[var(--color-bg)] p-[var(--space-6)] text-[var(--color-text)] sm:p-[var(--space-7)]"
          >
            <h3 className="text-heading-3">A person reviews every request.</h3>
            <p className="mt-[var(--space-4)] text-body text-[var(--color-text-secondary)]">
              Your submission is reviewed before the next step is decided.
              Depending on the brief, that next step may be:
            </p>
            <ul className="mt-[var(--space-5)] flex flex-col gap-3">
              {NEXT_STEPS.map((step) => (
                <li
                  key={step.title}
                  className="rounded-lg border border-[var(--color-border)] p-[var(--space-4)]"
                >
                  <p className="font-body text-body font-semibold">{step.title}</p>
                  <p className="mt-1 text-small text-[var(--color-text-secondary)]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-[var(--space-6)]">
              <Button
                href="/quote?intent=mockup"
                variant="inverse"
                arrow
                data-analytics="hero_mockup_click"
                data-analytics-surface="clubs_brief"
              >
                {CTA.mockup}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 07 — Sample before bulk: the five stages, and where they happen. */}
      <Section theme="dark" width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <SectionHeader
              eyebrow="Sample before bulk"
              index="07"
              title="Approve what is being made before the full order is produced."
              description="For an overseas manufacturing relationship, confidence should come from an agreed product — not from vague promises."
            />
            <p className="mt-[var(--space-5)] text-body text-[var(--color-text-secondary)]">
              The Sparwright process moves through five stages.
            </p>

            <div className="mt-[var(--space-7)] overflow-hidden rounded-xl border border-[var(--color-border)]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={factoryFloor}
                  alt="Machinists at sewing benches on the Sparwright production floor in Sialkot."
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-[var(--space-5)]">
                <h3 className="font-body text-body-large font-semibold">Made in Sialkot</h3>
                <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                  Sparwright&apos;s manufacturing is based in Sialkot, Pakistan. The
                  product moves from specification and sampling through
                  production, quality control and packing against the agreed
                  requirements.
                </p>
                <div className="mt-[var(--space-5)]">
                  <Button href="/manufacturing" variant="inverse" arrow>
                    {CTA.process}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <ol className="relative flex flex-col gap-[var(--space-5)]">
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-5 top-6 w-0.5 bg-linear-to-b from-forge-600 to-success-600"
            />
            {STAGES.map((stage, i) => (
              <li key={stage.title} className="relative flex gap-[var(--space-5)]">
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full font-display text-small font-bold tabular-nums text-white ring-4 ring-[var(--color-bg)]",
                    i === STAGES.length - 1 ? "bg-success-600" : "bg-forge-600",
                  )}
                >
                  {i + 1}
                </span>
                <div className="flex-1 rounded-xl border border-[var(--color-border)] bg-white/[0.03] p-[var(--space-5)]">
                  <h3 className="font-body text-body-large font-semibold leading-snug">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                    {stage.description}
                  </p>
                  {stage.checks ? (
                    <Chips items={stage.checks} tone="dark" className="mt-[var(--space-4)]" />
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 08 — Reorders. */}
      <Section theme="light" width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Reorders"
              index="08"
              title="Your next order should not begin from zero."
              description="A useful manufacturing relationship continues after the first order."
            />
            <Prose className="mt-[var(--space-5)]">
              <p>
                Once artwork and product specifications have been approved, they
                can be kept as the reference for future orders.
              </p>
            </Prose>
            <div className="mt-[var(--space-6)]">
              <Button
                href="/quote"
                variant="primary"
                arrow
                data-analytics="hero_quote_click"
                data-analytics-surface="clubs_reorders"
              >
                {CTA.quote}
              </Button>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6)]">
            <p className="font-body text-body font-semibold">That matters when your club needs to:</p>
            <TickList items={REORDER_NEEDS} className="mt-[var(--space-4)]" />
            <p className="mt-[var(--space-5)] border-t border-[var(--color-border)] pt-[var(--space-4)] text-small text-[var(--color-text-secondary)]">
              A repeat order may still need confirmation if materials, colours,
              sizing, quantity or construction have changed. But the agreed
              product has a documented starting point.
            </p>
          </div>
        </div>
      </Section>

      {/* 09 — Club questions. */}
      <Section theme="white" width="copy">
        <SectionHeader
          eyebrow="Gyms & academies FAQ"
          index="09"
          title="Questions about custom equipment for your club."
        />
        <FAQAccordion
          items={FAQS}
          name="clubs-faq"
          openFirst
          className="mt-[var(--space-6)]"
        />
      </Section>

      {/*
        The closing band keeps to a heading and one short paragraph — §04 rules
        out long copy on red — so the brief's five questions are folded into
        one line, and the ticket carries what happens after the click.
      */}
      <CallToAction
        title="Start with the gear your club needs now."
        description="Gloves for your members, pads and protective equipment for the gym, fightwear for your fighters, club apparel — or several products under one identity. Start with the requirement you have today."
        steps={CLOSING_STEPS}
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

/* -- Page-local building blocks ------------------------------------------- */

/** Stacked paragraphs in the section's secondary text colour. */
function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex max-w-copy flex-col gap-[var(--space-4)] text-body text-[var(--color-text-secondary)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Short labels as tags: branding methods, construction points, checks. */
function Chips({
  items,
  tone = "light",
  className,
}: {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "rounded-full border px-3 py-1 text-small font-medium",
            tone === "dark"
              ? "border-white/20 bg-white/5 text-white"
              : "border-[var(--color-border-strong)]/40 bg-[var(--color-surface)] text-[var(--color-text)]",
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A plain ticked list — lighter than `CheckList`'s bordered cards. */
function TickList({
  items,
  columns = 1,
  className,
}: {
  items: string[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-x-[var(--space-6)] gap-y-2.5", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-body text-[var(--color-text-secondary)]">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="mt-1 size-4 shrink-0 text-forge-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3.5 8.5 3 3 6-7" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** One specification area in section 02. */
function SpecCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)] sm:p-[var(--space-6)]">
      <h3 className="font-body text-body-large font-semibold">{title}</h3>
      <div className="mt-[var(--space-3)] flex flex-col gap-[var(--space-3)] text-body text-[var(--color-text-secondary)]">
        {children}
      </div>
    </li>
  );
}

/** Numbered planning cards, stacked in two columns beside the section intro. */
function NumberedCardList({ items }: { items: { title: string; description: string }[] }) {
  return (
    <ul className="grid gap-[var(--space-4)] sm:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={item.title}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]"
        >
          <span
            aria-hidden="true"
            className="font-display text-heading-4 font-bold tabular-nums text-forge-600"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-[var(--space-3)] font-body text-body-large font-semibold leading-snug">
            {item.title}
          </h3>
          <p className="mt-2 text-small text-[var(--color-text-secondary)]">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
