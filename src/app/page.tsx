import {
  AudienceCard,
  type AudienceCardItem,
} from "@/components/content/AudienceCard";
import { CallToAction } from "@/components/content/CallToAction";
import { FAQSection } from "@/components/content/FAQSection";
import { CustomizationShowcase } from "@/components/content/CustomizationShowcase";
import { ExpertiseGrid } from "@/components/content/ExpertiseGrid";
import { HeroBanner } from "@/components/content/HeroBanner";
import { ProcessStepper } from "@/components/content/ProcessStepper";
import { ProductShowcase } from "@/components/content/ProductShowcase";
import { WhyUs, type WhyUsReason } from "@/components/content/WhyUs";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { Eyebrow, SectionHeader } from "@/components/foundation/SectionHeader";
import { TextLink } from "@/components/foundation/TextLink";
import { CTA } from "@/components/foundation/cta";
import Image from "next/image";
import { FAQ_GROUPS, SITE_FAQS } from "@/lib/faq";
import { COLLECTIONS } from "@/lib/collections";
import { EXPERTISE } from "@/lib/expertise";
import {
  CUSTOMIZATION,
  CUSTOMIZATION_IMAGE,
  CUSTOMIZATION_SHOT,
} from "@/lib/customization";
import { PROCESS_STAGES } from "@/lib/process";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import type { Metadata } from "next";

/**
 * The homepage states its own canonical rather than inheriting one: set in
 * the layout, "/" was inherited by every route. Its title is the brand line,
 * not the "| Sparwright" template other pages use.
 */
const HOME_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GB",
    url: "/",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
  },
};






import gymAthletes from "../../public/images/gyms-and-academies.png";
import labelModels from "../../public/images/private-label.png";
import factoryFloor from "../../public/images/boxing-glove-factory-floor.jpg";
import mockupToGlove from "../../public/images/logo-mockup-to-finished-glove.jpg";

/**
 * Homepage — Design System §11 Homepage order, §A Starter copy library.
 *
 * Section stack, in the order a buyer's questions arrive: hero (what is
 * this?), products (do you make my thing?), audiences (is it for me?), why
 * Sparwright (why you?), customization (what can I change?), process (how
 * does an order run?), expertise (can you make it?), about (who is behind
 * this?), FAQ (what is the catch?), final CTA. §11 illustrates the recommended
 * stack as a figure rather than an ordered list, so this is the roadmap's
 * stated assumption; the roadmap flags it for confirmation before merge.
 *
 * Surfaces alternate down the page and the bands are what separate one section
 * from the next:
 *
 *   hero dark · range light · audiences white · why us light ·
 *   customization dark · process white · expertise light · about white ·
 *   FAQ light · CTA action
 *
 * Two adjacent sections must never share a surface — they merge into one
 * unbroken block. Moving a section means re-checking the run from that point
 * down, not just the section that moved.
 *
 * §08 specifies the four proof points twice — once as the Hero's own "Proof"
 * field and again as the proof bar beneath it. Running both would state the
 * same four things twice in a row, so they live in the hero, where they carry
 * the photograph. `ProofBar` is still available for a page that wants the
 * expanded form.
 *
 * There is no case-study or testimonial section here, deliberately: §11 says to
 * remove it until genuine evidence exists, and non-negotiable #12 says the same.
 */

/**
 * §08 Hero "Proof".
 *
 * §08 gives these as "10+ Years; Custom Branding; Sample Before Bulk; Made in
 * Sialkot". Two of those are supplier credentials rather than buyer outcomes —
 * how long we have traded, and where we are — and the brief is to sell what the
 * buyer gets. Origin still earns its place on /manufacturing, where a buyer
 * doing due diligence goes looking for it.
 *
 * What replaced them has to clear non-negotiables #5 and #6 the same way: every
 * line here is a commitment the rest of the site already makes, and none of it
 * is a throughput figure, a customer count, an MOQ or a lead time.
 */
const HERO_PROOF = [
  "Custom club and private-label branding",
  "Approved sample before bulk production",
  "Gloves and apparel under one identity",
  "Your artwork and specs kept for reorders",
];

/**
 * Two buyer types, named the way this market names them.
 *
 * The cards were headed "For clubs and gyms" and "Private label" under a
 * section titled "Who we manufacture for" — but the heading above them read
 * "Two ways buyers work with us", which is a different question. One framing
 * asks who the buyer is, the other how the work is structured. Both cards now
 * answer "who", and the section label is all that sits above them: a heading
 * and a standfirst as well was the same answer given three times before the
 * reader reached the cards that give it properly.
 *
 * The private-label card said "your fightwear brand". The catalogue runs to 89
 * products across eleven categories — lifting belts, gym wear, yoga straps,
 * bags — so a lifting brand reading that card concluded we were not for them.
 * It now names the breadth it actually covers.
 *
 * "Practical ordering requirements" was the one abstraction in an otherwise
 * concrete section (§10 Specific). What it meant was ordering across member
 * sizes and matching a reorder to the first run, so it says that instead.
 *
 * NOT SEGMENTED FOR RETAILERS OR DISTRIBUTORS, deliberately. Comparable makers
 * in this segment list both alongside gyms and private label, and they place
 * the largest orders. Confirmed as out of scope for now; revisit here first if
 * that changes, because the section is the page's whole answer to who buys.
 */
const AUDIENCES: AudienceCardItem[] = [
  {
    eyebrow: "Gyms & Academies",
    title: "Custom kit in your club colours.",
    href: "/for-clubs",
    action: CTA.gymManufacturing,
    photo: {
      src: gymAthletes,
      alt: "A boxer and a club member in matching custom kit, both carrying the same club emblem.",
    },
  },
  {
    eyebrow: "Private Label",
    title: "Private label fightwear and gym wear.",
    href: "/private-label",
    action: CTA.privateLabel,
    actionVariant: "secondary",
    photo: {
      src: labelModels,
      alt: "A man and a woman in plain unbranded training apparel, carrying no logo of any kind.",
    },
  },
];



/**
 * Why Sparwright. Six reasons, each already a commitment made elsewhere on the
 * site — Sialkot and ten years (/manufacturing), the sample, specification,
 * reorder and reply commitments (FAQ) — so nothing here is a new claim. Titles
 * carry the terms buyers search ("custom", "private label", "reorder") only
 * where they read naturally.
 */
const WHY_US: WhyUsReason[] = [
  {
    icon: "location",
    title: "Made in Sialkot, not relabelled",
    description:
      "Ten years of hands-on fight-gear manufacturing in Sialkot, Pakistan. Your order is made there — and its inspection record can be shared.",
  },
  {
    icon: "sample",
    title: "A sample before bulk production",
    description:
      "You approve a mockup, then a physical sample. Every finished piece is checked against the sample you signed off.",
  },
  {
    icon: "spec",
    // Not "Built to your specification": the Customization card already uses
    // that as its h3, and two identical headings on one page split the signal.
    title: "Your specification, not a catalogue",
    description:
      "Materials, padding, closure, colours, logo placement and packaging are your decisions, confirmed before sampling.",
  },
  {
    icon: "range",
    title: "One maker for gloves, fightwear and kit",
    description:
      "Custom boxing gloves, fightwear, lifting gear and club apparel from one manufacturer, with one colour reference and logo treatment throughout.",
  },
  {
    icon: "reorder",
    title: "Reorders that match the first run",
    description:
      "Artwork, colour references and the sample record stay on file, so a repeat order is made to the original, not developed again.",
  },
  {
    icon: "person",
    title: "A person reads every request",
    description:
      "No automated quotes. The team reviews your brief and confirms sampling and production dates in writing with your quote.",
  },
];

/**
 * schema.org FAQPage for the site-wide questions. Google no longer shows FAQ
 * rich results for commercial sites, but the markup still states each question
 * and answer unambiguously for search and AI answer engines.
 */
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SITE_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Home() {
  return (
    <>
      <HeroBanner
        eyebrow="Custom fight gear manufacturer"
        title="Custom boxing gloves and fightwear, built to your specification."
        description="Gloves, fightwear and club apparel made with your logo, your colours and your construction — approved on a sample before anything goes to bulk."
        proof={HERO_PROOF}
        actions={
          <>
            <Button
              href="/quote?intent=mockup"
              variant="primary"
              arrow
              data-analytics="hero_mockup_click"
              data-analytics-surface="hero"
            >
              {CTA.customQuote}
            </Button>
            <Button href="/products" variant="secondary">
              {CTA.sampleOrder}
            </Button>
          </>
        }
      />

      <Section theme="light" width="work">
        {/*
          The range, not the routing. A cold buyer's first question is whether
          we make their product at all, and two catalogue cards do not answer
          it — five collections that each name their products do.

          The section keeps its own heading outside the panel, so the panel is
          the range and nothing else.
        */}
        <SectionHeader
          eyebrow="Custom product range"
          index="01"
          title="Gloves, fightwear, lifting gear and club apparel."
          description="Custom fight gear, protective equipment, strength gear and team apparel — kids' sizes and martial arts uniforms included — from custom MMA gloves to team kit, made to your specification."
        />
        <div className="mt-[var(--space-6)]">
          <ProductShowcase items={COLLECTIONS} />
        </div>
        <div className="mt-[var(--space-5)]">
          <TextLink href="/products">{CTA.products}</TextLink>
        </div>
      </Section>

      <Section theme="white" width="work">
        {/*
          Label only — the cards carry the message, so a heading and a standfirst
          above them restated in prose what the two cards say in full directly
          below. This is the one section on the page without a SectionHeader.

          It is an h2 styled as an eyebrow, not a paragraph. The two cards are
          h3s, and with no h2 here they would attach to the previous section's
          heading and the document outline would read as though gyms and private
          label were part of the product range. It stays a real heading for
          that reason; only its appearance is the eyebrow's.

          White: it sits between the light range and the light Why Sparwright
          band. Straight after the range, because "is this for me?" follows
          "do you make my thing?".
        */}
        <h2>
          <Eyebrow as="span" index="02">
            Custom manufacturing for gyms, clubs and private label brands
          </Eyebrow>
        </h2>
        <div className="mt-[var(--space-6)] grid gap-[var(--space-5)] lg:grid-cols-2">
          {AUDIENCES.map((audience) => (
            <AudienceCard key={audience.href} item={audience} />
          ))}
        </div>
      </Section>

      {/*
        Why Sparwright, fourth: once a buyer knows what we make and that it is
        for them, "why you rather than someone else" is the next question. It
        was eighth, after most readers have gone. The sections below — what can
        be customised, how an order runs, what the workshop does — are the
        detail that stands these reasons up.

        Light: it sits between the white audiences band and the dark
        customization band.
      */}
      <WhyUs
        theme="light"
        eyebrow="Why Sparwright"
        index="03"
        title="Why gyms and brands choose Sparwright."
        description="A custom boxing gloves and fightwear manufacturer in Sialkot, Pakistan, working to your specification for clubs and private label brands across the UK and Europe."
        reasons={WHY_US}
      />

      <Section theme="dark" width="work">
        {/*
          Written for clubs and brands alike — the homepage serves both, and
          the club-only headline also duplicated the For Clubs page word for
          word. The visual pairs the mockup with the glove made from it — the
          promise in the headline, shown.
        */}
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <SectionHeader
            eyebrow="Customization"
            index="04"
            title="Custom logos, colours and construction — see it before it's made."
            description="Send your logo and what you need. We come back with a mockup of your product, then a physical sample for you to sign off."
          />
          <Image
            src={mockupToGlove}
            alt="A flat design mockup of a black and tan boxing glove with a shield emblem on the cuff, beside the finished leather glove with the same shield embroidered in tan thread."
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full rounded-lg border border-[var(--color-border)]"
          />
        </div>
        <div className="mt-[var(--space-8)]">
          <CustomizationShowcase
            items={CUSTOMIZATION}
            image={CUSTOMIZATION_IMAGE}
            shot={CUSTOMIZATION_SHOT}
          />
        </div>
        <div className="mt-[var(--space-7)]">
          <Button
            href="/quote?intent=mockup"
            variant="inverse"
            arrow
            data-analytics="hero_mockup_click"
            data-analytics-surface="customization"
          >
            {CTA.mockup}
          </Button>
        </div>
      </Section>

      <ProcessStepper
        id="how-it-works"
        theme="white"
        eyebrow="How it works"
        index="05"
        title="How custom gloves, fightwear and apparel are manufactured."
        description="Custom boxing gloves, fightwear, lifting gear and club apparel move through the same five stages — your specification, an approved pre-production sample, bulk production with quality control recorded against that sample, then packing and export documentation. You sign off each stage before the next begins."
        stages={PROCESS_STAGES}
      />

      {/*
        Capability rather than sequence. The stepper above says what happens
        when; this says what we can actually do to a product, which is the
        question that decides whether a buyer's item is makeable here at all.

        Light: it sits between the white process stepper and the white About
        band, and no two adjacent sections may share a surface.
      */}
      <ExpertiseGrid
        theme="light"
        eyebrow="Our expertise"
        index="06"
        title="Fight gear manufacturing, from tech pack to bulk order."
        description="Six capabilities that take an idea into volume production — a tech pack written or worked to, patterns digitised and graded across the size run, laser and die cutting, sublimation and embroidery, industrial assembly, and testing against the sample you approved."
        items={EXPERTISE}
      />

      {/*
        The entity block. Everything else on this page describes the product or
        the process; nothing says what Sparwright *is*, which leaves both a
        buyer doing due diligence and a crawler building an entity with only
        fragments to work from.

        Placed late, not straight under the hero. There it restated the hero's
        own promise before the page had shown anything; here it closes the
        detail sections as the "who is behind this" a buyer doing due diligence
        looks for, just before the FAQ. Search engines read it wherever it sits.

        Deliberately not a process block. The page already gives the process
        its own sections — the stepper and the expertise grid above — so this
        one stays on who we are, what we make and who for. §10 preferred
        vocabulary throughout, and nothing here claims a year, a certification,
        a client count or a capacity figure (#5, #6).

        The photograph is the facility, not the product: an about block's job is
        proof that there is a real operation behind the claims (§09 — "real
        products, real materials, real makers and a visible production process"),
        and the page has carried the product from the range down.

        White: it sits between the light expertise band and the light FAQ.

        It must not restate the hero. `banner.jpg` is an eye-level view straight
        down a single bench row with the left half of the frame empty floor, so
        this one is shot from height and across the width of the hall. Same
        building, different vantage — which is also what stops it reading as a
        stock factory photograph.
      */}
      <Section theme="white" width="work">
        <div className="grid items-center gap-[var(--space-7)] lg:grid-cols-2">
          <div>
            {/* §10 headline formula, service + buyer. */}
            <SectionHeader
              eyebrow="About Sparwright"
              index="07"
              title="A custom fight gear manufacturer for clubs and fightwear brands."
            />
            {/* Spaced with an explicit margin on the second paragraph, which
                is how every other stacked block on the site does it. `space-y`
                is not used anywhere in this codebase and generated no rule at
                all here — the paragraphs rendered flush against each other. */}
            <p className="mt-[var(--space-5)] max-w-copy text-body-large text-[var(--color-text-secondary)]">
              Sparwright is an OEM and private label manufacturer in Sialkot,
              Pakistan, making custom boxing gloves, fightwear, lifting gear and
              club apparel for gyms, clubs and fightwear brands. Every product
              is made to a specification you set — materials and
              construction, colours, closure, logo placement and packaging —
              rather than picked from a catalogue and relabelled.
            </p>
            <p className="mt-[var(--space-4)] max-w-copy text-body-large text-[var(--color-text-secondary)]">
              Working with one manufacturer across all four keeps a single
              identity on everything a club or brand puts its name to: the same
              colour references, the same logo treatment, and your artwork and
              specifications kept on file so a reorder matches the first run.
              Clubs order across member sizes; brands develop their own products
              under their own label.
            </p>
            <div className="mt-[var(--space-6)]">
              <Button
                href="/how-it-works"
                variant="secondary"
                className="border-ink-950! bg-ink-950! text-white! hover:bg-ink-950/85!"
              >
                {CTA.process}
              </Button>
            </div>
          </div>
          {/*
            §09 "Workshop wide view". Source is 2528x1696 (1.4906) against the
            slot's 3:2, so `object-cover` trims well under a percent.

            §12 alt text describes the work, not the file.
          */}
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
            <Image
              src={factoryFloor}
              alt="Machinists at sewing benches assembling custom boxing gloves on the Sparwright production floor."
              fill
              placeholder="blur"
              // Half the work-width grid, so it never renders wider than this.
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/*
        Light: it follows the white About band. The heading names the
        subject rather than counting the questions — a count goes stale the
        moment one is added, and says nothing a search engine can match. The
        FAQPage data is built from the same list, so the markup can never claim
        an answer the page does not show.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_JSON_LD).replace(/</g, "\\u003c"),
        }}
      />
      <FAQSection
        theme="light"
        eyebrow="Questions"
        index="08"
        title="Custom fight gear manufacturing, answered."
        description="Minimums, samples, branding, materials, lead times and shipping — grouped by where you are in the order."
        groups={FAQ_GROUPS}
        action={{ label: CTA.brief, href: "/quote" }}
      />

      {/* §A gives this action as "REQUEST A QUOTE"; the §08 CTA library is
          normative for labels, so it renders as "Get a Manufacturing Quote". */}
      {/*
        "Ready to develop your custom fight gear?" was a stock question shared
        word for word with four other pages, and its line listed what to send
        without saying what happens once you have. The heading now asks for the
        brief directly, the line says who answers it, and the ticket beside it
        carries the next steps. The mockup is offered as the lighter first step.
      */}
      <CallToAction
        title="Tell us what you want made."
        description="Send the product, your logo, a rough quantity and where it ships. A person replies — with any questions left, not an automated quote."
        action={{
          label: CTA.quote,
          href: "/quote",
          analytics: "hero_quote_click",
          surface: "final_cta",
        }}
        secondaryAction={{
          label: CTA.mockup,
          href: "/quote?intent=mockup",
          analytics: "hero_mockup_click",
          surface: "final_cta",
        }}
      />
    </>
  );
}
