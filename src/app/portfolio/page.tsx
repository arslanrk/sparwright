import type { Metadata } from "next";
import Image from "next/image";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Lookbook, type LookbookItem } from "@/components/content/Lookbook";
import { RangeStarter, type StarterProduct } from "@/components/content/RangeStarter";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { pageMetadata } from "@/lib/metadata";
import { LINE_SHOTS } from "@/lib/product-shots";
import type { ProductFaq } from "@/lib/products";
import { PORTFOLIO, PORTFOLIO_CATEGORIES, hasPortfolio, type PortfolioItem } from "@/lib/portfolio";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/structured-data";
import gloveClassicBlackRed from "../../../public/images/concept/boxing-gloves_classic_black-red.jpg";
import gloveClassicBlackTan from "../../../public/images/concept/boxing-gloves_classic_black-tan.jpg";
import gloveClassicWhiteRedBlack from "../../../public/images/concept/boxing-gloves_classic_white-red-black.jpg";
import gloveCrackleBlackRed from "../../../public/images/concept/boxing-gloves_crackle_black-red.jpg";
import gloveCrackleBlackTan from "../../../public/images/concept/boxing-gloves_crackle_black-tan.jpg";
import gloveCrackleWhiteRedBlack from "../../../public/images/concept/boxing-gloves_crackle_white-red-black.jpg";
import gloveStrikeBlackRed from "../../../public/images/concept/boxing-gloves_strike_black-red.jpg";
import gloveStrikeBlackTan from "../../../public/images/concept/boxing-gloves_strike_black-tan.jpg";
import gloveStrikeWhiteRedBlack from "../../../public/images/concept/boxing-gloves_strike_white-red-black.jpg";
import clubApparelGroup from "../../../public/images/club-apparel-group.webp";
import mockupToGlove from "../../../public/images/logo-mockup-to-finished-glove.jpg";
import boxingGroup from "../../../public/images/range/boxing-gloves-group.webp";
import apparelGroup from "../../../public/images/range/fightwear-and-apparel-group.webp";
import rangeLifting from "../../../public/images/range/range-lifting.jpg";
import rangeMma from "../../../public/images/range/range-mma.jpg";
import rangePads from "../../../public/images/range/range-pads.jpg";
import rangeProtective from "../../../public/images/range/range-protective.jpg";
import specConstruction from "../../../public/images/spec/construction-exploded.jpg";

/**
 * Portfolio — a lookbook of concept designs now, finished orders when they
 * are photographed. Copy: docs/content/portfolio.md.
 *
 *   hero + lookbook dark · 01 one design, three colourways light ·
 *   02 finished orders white · 03 FAQ light · closing picker
 *
 * Nothing here is presented as delivered work: every design is labelled a
 * concept, and the finished-orders section stays an honest "being
 * photographed" until `PORTFOLIO` (src/lib/portfolio.ts) has a real entry —
 * then the grid switches on by itself (#5, #12: no invented clients, case
 * studies or social proof).
 *
 * Indexed: the lookbook is real, useful content for "custom boxing glove
 * designs" and the like, labelled for what it is.
 */

export const metadata: Metadata = pageMetadata({
  path: "/portfolio",
  title: "Custom Fight Gear Designs and Portfolio",
  description:
    "Concept designs for custom boxing gloves, MMA gear, fightwear, protective and lifting gear — the styles, colourways and branding Sparwright can make for your gym or brand.",
});

const LINES = ["Boxing", "MMA", "Apparel", "Protective", "Pads and bags", "Lifting"];

/** The lookbook: every entry a concept design, not an order. */
const LOOKBOOK: LookbookItem[] = [
  {
    title: "Club boxing range",
    line: "Boxing",
    product: "Boxing Gloves",
    description:
      "Adult and junior gloves, a head guard and wraps in one club's colours — sparring, bag and kids' gloves designed as a set.",
    customised: ["Glove design per use", "Junior sizing", "Colourway", "Logo on the strap"],
    photo: {
      src: boxingGroup,
      alt: "Four boxers — two women, a man and a boy — in custom gloves, one holding a head guard, another wearing one.",
    },
    span: "feature",
  },
  {
    title: "Strike design, black and red",
    line: "Boxing",
    product: "Boxing Gloves",
    description: "Angular strike graphics across the backhand, with a blank wrist panel for the club or brand mark.",
    customised: ["Backhand graphic", "Colourway", "Wrist-panel branding"],
    photo: { src: gloveStrikeBlackRed, alt: "A pair of black boxing gloves with red and grey angular strike graphics." },
    studio: true,
  },
  {
    title: "Crackle design, white, red and black",
    line: "Boxing",
    product: "Boxing Gloves",
    description: "A crackle pattern over a white shell — a bold look for competition or a statement club glove.",
    customised: ["Printed pattern", "Shell colour", "Cuff and strap colour"],
    photo: { src: gloveCrackleWhiteRedBlack, alt: "A pair of white boxing gloves with a red and black crackle pattern." },
    studio: true,
    span: "tall",
  },
  {
    title: "Fightwear and club apparel",
    line: "Apparel",
    product: "Multiple Products",
    description:
      "A range worn together: a rashguard, fight shorts, boxing trunks and training sets, each in its own colours.",
    customised: ["Sublimated graphics", "Waistband panel", "Colour per garment", "Sizes across the range"],
    photo: {
      src: apparelGroup,
      alt: "Four athletes in a rashguard, boxing trunks and two training sets in beige and brown.",
    },
    span: "feature",
  },
  {
    title: "Classic design, black and tan",
    line: "Boxing",
    product: "Boxing Gloves",
    description: "A clean classic glove in black with tan accents — understated, for a brand or a coach's range.",
    customised: ["Accent colour", "Leather or synthetic shell", "Embossed or printed mark"],
    photo: { src: gloveClassicBlackTan, alt: "A pair of black boxing gloves with tan accents and cuffs." },
    studio: true,
  },
  {
    title: "MMA gloves and shin guards",
    line: "MMA",
    product: "MMA Gloves",
    description: "Open-palm MMA gloves and matching shin guards with the same angular graphics.",
    customised: ["Matching graphics", "Padding", "Closure", "Strap branding"],
    photo: { src: rangeMma, alt: "Black MMA gloves and shin guards with red angular graphics." },
    studio: true,
  },
  {
    title: "Training wear for a whole squad",
    line: "Apparel",
    product: "Hoodies and Tracksuits",
    description: "Hoodies, tracksuits, leggings and training tops in several colourways, made as one range for a squad.",
    customised: ["Colourways per garment", "Branding placement", "Sizes across the squad"],
    photo: { src: clubApparelGroup, alt: "A group of athletes in training wear: hoodies, tracksuit tops, leggings and sports tops in black, grey and pink." },
  },
  {
    title: "Head guard and shin guards",
    line: "Protective",
    product: "Protective Gear",
    description: "Protective gear designed to match the gloves — head guard, shin guards and wraps in one colour story.",
    customised: ["Matching colourway", "Padding", "Strap branding"],
    photo: { src: rangeProtective, alt: "A black head guard and shin guards with red graphics." },
    studio: true,
  },
  {
    title: "Pads, bag and mitts set",
    line: "Pads and bags",
    product: "Focus Mitts and Pads",
    description: "A punch bag, Thai pads and focus mitts made as one set for the gym floor.",
    customised: ["Set colourway", "Filled or unfilled bag", "Panel branding"],
    photo: { src: rangePads, alt: "A punch bag, Thai pads and focus mitts in black with red graphics." },
    studio: true,
  },
  {
    title: "Lifting belt, gloves and straps",
    line: "Lifting",
    product: "Lifting Belts and Gear",
    description: "A lever belt with matching lifting gloves, straps and wraps for a strength brand or gym.",
    customised: ["Belt material", "Buckle type", "Stitching colour", "Embossed or printed mark"],
    photo: { src: rangeLifting, alt: "A black lifting belt with red stitching, lifting gloves, straps and wrist wraps." },
    studio: true,
  },
  {
    title: "From mockup to finished glove",
    line: "Boxing",
    product: "Boxing Gloves",
    description: "A flat mockup beside the glove made from it — the branding agreed on screen before anything is made.",
    customised: ["Logo artwork", "Placement", "Colour match"],
    photo: { src: mockupToGlove, alt: "A flat mockup of a black and tan glove beside the finished glove with the same emblem." },
  },
  {
    title: "Construction, layer by layer",
    line: "Boxing",
    product: "Boxing Gloves",
    description: "The shell, three grades of foam, the lining, the strap and the label — each chosen for how the glove is used.",
    customised: ["Shell material", "Foam layers", "Lining", "Woven label"],
    photo: {
      src: specConstruction,
      alt: "A boxing glove beside its layers laid out in a line: leather shell, foam padding, lining, strap and label.",
    },
    span: "wide",
  },
];

/** 01 — one glove design in three colourways, three times. */
const MATRIX = [
  { design: "Strike", shots: [gloveStrikeWhiteRedBlack, gloveStrikeBlackRed, gloveStrikeBlackTan] },
  { design: "Classic", shots: [gloveClassicWhiteRedBlack, gloveClassicBlackRed, gloveClassicBlackTan] },
  { design: "Crackle", shots: [gloveCrackleWhiteRedBlack, gloveCrackleBlackRed, gloveCrackleBlackTan] },
];
const COLOURWAYS = [
  { name: "White, red and black", swatches: ["#F4F1E8", "#D83A20", "#111111"] },
  { name: "Black and red", swatches: ["#111111", "#D83A20"] },
  { name: "Black and tan", swatches: ["#111111", "#B98A5A"] },
];

/** 02 — what every finished-order entry will show. */
const ENTRY_SHOWS = [
  { title: "The product", description: "What was made, photographed as delivered — never a render." },
  { title: "The buyer", description: "Named with their permission; otherwise described, such as a boxing club in Manchester." },
  { title: "What was customised", description: "The decisions behind it: branding method, colours, materials, sizing, packaging." },
];

const FAQS: ProductFaq[] = [
  {
    question: "Are these designs finished orders?",
    answer:
      "No. They are concept designs showing the styles, colourways and branding Sparwright can make. Finished orders will be shown here once they are photographed, with each buyer's permission.",
  },
  {
    question: "Can we have one of these designs made with our branding?",
    answer:
      "Yes. Any design here can be a starting point. Your logo, colours and specification are agreed with you, and the product is confirmed on a physical sample before bulk production.",
  },
  {
    question: "Will our order appear in the portfolio?",
    answer:
      "Only if you agree. With your permission your order can be shown with your name; otherwise it can be described without naming you, or not shown at all.",
  },
  {
    question: "Can a design be changed for a different product?",
    answer:
      "Often, yes. A glove graphic can carry onto pads, shin guards or apparel so a range reads as one set. What is practical on each product is confirmed with your brief.",
  },
];

const STARTER_PRODUCTS: StarterProduct[] = [
  { label: "Boxing gloves", product: "Boxing Gloves", photo: LINE_SHOTS["custom-boxing-gloves"].src },
  { label: "MMA gear", product: "MMA Gloves", photo: LINE_SHOTS["custom-mma-gloves"].src },
  { label: "Pads and bags", product: "Focus Mitts and Pads", photo: LINE_SHOTS["custom-pads-bags-mitts"].src },
  { label: "Protective gear", product: "Protective Gear", photo: LINE_SHOTS["custom-protective-gear"].src },
  { label: "Fightwear", product: "Fight Shorts", photo: LINE_SHOTS["fightwear-club-apparel"].src, fill: true },
  { label: "Lifting gear", product: "Lifting Belts and Gear", photo: LINE_SHOTS["custom-lifting-belts"].src },
];

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([breadcrumbJsonLd([{ name: "Portfolio", path: "/portfolio" }]), faqJsonLd(FAQS)]),
        }}
      />

      {/* Hero and lookbook, one dark band: the designs are the first thing seen. */}
      <Section theme="dark" width="shell" className="relative isolate overflow-hidden pt-[var(--space-6)]! lg:pt-[var(--space-7)]!">
        <span aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[44rem] rounded-full bg-forge-600/12 blur-3xl" />
        <Breadcrumb items={[{ label: "Portfolio" }]} />
        <div className="mt-[var(--space-7)] grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <div>
            <p className="flex items-center gap-3 text-eyebrow uppercase tracking-[0.16em] text-forge-600">
              <span aria-hidden="true" className="h-0.5 w-6 bg-forge-600" />
              Portfolio
            </p>
            <h1 className="mt-[var(--space-5)] font-display text-display-lg">Custom fight gear designs, and the work behind them.</h1>
          </div>
          <div>
            <p className="text-body-large text-[var(--color-text-secondary)]">
              Gloves, fightwear, protective, pads and lifting gear — the styles, colourways and branding we make for
              gyms, clubs and brands.
            </p>
            <p className="mt-[var(--space-4)] inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-small text-white/75 ring-1 ring-white/10">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-forge-600" />
              Concept designs — finished orders are being photographed.
            </p>
          </div>
        </div>
        <div className="mt-[var(--space-8)]">
          <Lookbook items={LOOKBOOK} lines={LINES} />
        </div>
      </Section>

      {/* 01 — One design, three colourways: the 3×3 glove matrix. Light. */}
      <Section theme="light" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <SectionHeader eyebrow="Design and colour" index="01" title="One glove, three designs, three colourways." />
          <p className="text-body text-[var(--color-text-secondary)]">
            The same glove changes character with its graphic and its colours.{" "}
            <span className="font-semibold text-[var(--color-text)]">
              Choose a design and a colourway, or send your own — each is confirmed on a sample.
            </span>
          </p>
        </div>

        <div className="mt-[var(--space-7)] overflow-x-auto [scrollbar-width:none]">
          <table className="w-full min-w-[40rem] table-fixed border-separate border-spacing-2">
            <caption className="sr-only">Three glove designs, each shown in three colourways</caption>
            <thead>
              <tr>
                <th scope="col" className="w-28 lg:w-36" />
                {COLOURWAYS.map((colourway) => (
                  <th key={colourway.name} scope="col" className="pb-2 text-left font-normal">
                    <span className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="flex -space-x-1.5">
                        {colourway.swatches.map((colour) => (
                          <span key={colour} className="size-5 rounded-full ring-2 ring-[var(--color-bg)]" style={{ background: colour }} />
                        ))}
                      </span>
                      <span className="text-small font-semibold">{colourway.name}</span>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((row) => (
                <tr key={row.design}>
                  <th scope="row" className="pr-2 text-left align-middle">
                    <span className="block font-display text-heading-4 font-bold">{row.design}</span>
                    <span className="text-small text-[var(--color-text-secondary)]">design</span>
                  </th>
                  {row.shots.map((shot, i) => (
                    <td key={i}>
                      <div className="group relative aspect-square overflow-hidden rounded-2xl bg-[radial-gradient(120%_100%_at_50%_75%,#d9dadc,#b9bbbf)] transition-shadow hover:shadow-[0_24px_40px_-24px_rgb(0_0_0/0.5)]">
                        <Image
                          src={shot}
                          alt={`${row.design} design boxing gloves in ${COLOURWAYS[i].name.toLowerCase()}.`}
                          fill
                          sizes="(min-width: 1024px) 300px, 30vw"
                          className="object-contain p-2 transition-transform duration-500 ease-out [mask-image:radial-gradient(closest-side,black_72%,transparent)] motion-safe:group-hover:scale-[1.08]"
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-[var(--space-6)]">
          <Button href="/for-clubs" variant="secondary" arrow>
            Try the concept studio
          </Button>
        </div>
      </Section>

      {/* 02 — Finished orders: honest until real entries exist, then the grid. White. */}
      <Section theme="white" width="shell">
        {hasPortfolio ? (
          <>
            <SectionHeader eyebrow="Finished orders" index="02" title="Work made to a buyer's specification." />
            <div className="mt-[var(--space-7)]">
              <PortfolioGrid items={PORTFOLIO} />
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 items-center gap-[var(--space-8)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[var(--space-9)]">
            <div>
              <SectionHeader
                eyebrow="Finished orders"
                index="02"
                title="Real orders, photographed as delivered."
                description="Finished orders are being photographed. When they go up, each entry shows three things — and nothing staged or borrowed."
              />
              <ol className="mt-[var(--space-6)] flex flex-col gap-3">
                {ENTRY_SHOWS.map((point, i) => (
                  <li key={point.title} className="flex gap-4 rounded-2xl bg-[var(--color-surface)] p-[var(--space-4)]">
                    <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-forge-600 font-display text-small font-bold text-white">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-body text-body font-semibold">{point.title}</span>
                      <span className="mt-0.5 block text-small text-[var(--color-text-secondary)]">{point.description}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-[var(--space-6)]">
                <Button href="/quote?intent=mockup" variant="primary" arrow data-analytics="hero_mockup_click" data-analytics-surface="portfolio_orders">
                  {CTA.mockup}
                </Button>
              </div>
            </div>

            {/* The shape of an entry, drawn but empty. */}
            <div aria-hidden="true" className="relative mx-auto w-[calc(100%-1rem)] max-w-md sm:w-full">
              <span className="absolute inset-0 translate-x-2 translate-y-3 rotate-2 rounded-3xl border-2 border-dashed sm:translate-x-4 sm:translate-y-4 sm:rotate-3 border-[var(--color-border-strong)]" />
              <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)]">
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-[var(--color-bg)] text-[var(--color-text-muted)]">
                  <svg viewBox="0 0 24 24" className="size-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <circle cx="12" cy="12" r="3.5" />
                    <path d="M8 5l1.5-2h5L16 5" />
                  </svg>
                  <span className="text-eyebrow uppercase tracking-[0.16em]">Being photographed</span>
                </div>
                <div className="p-[var(--space-5)]">
                  <span className="block h-3 w-2/3 rounded-full bg-ink-950/10" />
                  <span className="mt-2 block h-2.5 w-1/3 rounded-full bg-ink-950/10" />
                  <span className="mt-4 flex flex-wrap gap-2">
                    {["Branding", "Colours", "Sizing"].map((tag) => (
                      <span key={tag} className="rounded-full border border-dashed border-[var(--color-border-strong)] px-3 py-1 text-[0.75rem] text-[var(--color-text-muted)]">
                        {tag}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* 03 — FAQ. Light. */}
      <Section theme="light" width="copy">
        <SectionHeader eyebrow="Portfolio FAQ" index="03" title="Questions about these designs." />
        <FAQAccordion items={FAQS} name="portfolio-faq" openFirst className="mt-[var(--space-6)]" />
      </Section>

      <RangeStarter
        eyebrow="Start your design"
        title="Seen a style you like?"
        description="Send your logo and colours with the product, and we show it on your gear before anything is made."
        surface="portfolio_cta_product"
        intent="mockup"
        products={STARTER_PRODUCTS}
        several={{ label: "A full range in one design", description: "Gloves, pads, protection and apparel together.", product: "Multiple Products" }}
        actions={
          <>
            <Button href="/quote?intent=mockup" variant="inverse" arrow data-analytics="hero_mockup_click" data-analytics-surface="portfolio_cta">
              {CTA.mockup}
            </Button>
            <Button href="/quote" variant="secondary" data-analytics="hero_quote_click" data-analytics-surface="portfolio_cta">
              {CTA.quote}
            </Button>
          </>
        }
      />
    </>
  );
}

/** Real finished orders, by collection — shown once `PORTFOLIO` has entries. */
function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="flex flex-col gap-[var(--space-8)]">
      {PORTFOLIO_CATEGORIES.map((category) => {
        const work = items.filter((item) => item.category === category);
        if (work.length === 0) return null;
        return (
          <section key={category} aria-labelledby={`portfolio-${category}`}>
            <h3
              id={`portfolio-${category}`}
              className="flex items-center gap-[var(--space-4)] text-eyebrow uppercase text-[var(--color-text-muted)]"
            >
              <span className="shrink-0">{category}</span>
              <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-border)]" />
            </h3>
            <ul className="mt-[var(--space-5)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-3">
              {work.map((item) => (
                <li key={item.title}>
                  <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={item.photo.src}
                        alt={item.photo.alt}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-[var(--space-5)]">
                      <h4 className="text-heading-4">{item.title}</h4>
                      <p className="mt-1 text-small text-[var(--color-text-muted)]">{item.client}</p>
                      <ul className="mt-[var(--space-4)] flex flex-wrap gap-2">
                        {item.customised.map((detail) => (
                          <li
                            key={detail}
                            className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[0.75rem] font-medium text-[var(--color-text-secondary)]"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
