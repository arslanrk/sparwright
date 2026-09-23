import {
  AudienceCard,
  type AudienceCardItem,
} from "@/components/content/AudienceCard";
import { CallToAction } from "@/components/content/CallToAction";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import {
  CustomizationCard,
  type CustomizationItem,
} from "@/components/content/CustomizationCard";
import {
  ExpertiseGrid,
  type ExpertiseItem,
} from "@/components/content/ExpertiseGrid";
import { HeroBanner } from "@/components/content/HeroBanner";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import {
  ProcessStepper,
  type ProcessStage,
} from "@/components/content/ProcessStepper";
import { ProductShowcase } from "@/components/content/ProductShowcase";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { TextLink } from "@/components/foundation/TextLink";
import { CTA } from "@/components/foundation/cta";
import Image from "next/image";
import { SITE_FAQS } from "@/lib/faq";
import { COLLECTIONS } from "@/lib/collections";
import techPackDesk from "../../public/images/design-and-tech-pack-development.jpg";
import cuttingTable from "../../public/images/pattern-making-and-cutting.jpg";
import sublimationPrinter from "../../public/images/printing-and-decoration.jpg";
import bindingMachine from "../../public/images/stitching-and-assembly.jpg";
import inspectionBench from "../../public/images/quality-testing.jpg";
import dispatchWarehouse from "../../public/images/packing-and-export.jpg";
import factoryFloor from "../../public/images/boxing-glove-factory-floor.jpg";

/**
 * Homepage — Design System §11 Homepage order, §A Starter copy library.
 *
 * Section stack: hero, about, products, process, audiences, customization,
 * manufacturing, FAQ, final CTA. §11 illustrates the recommended stack as a
 * figure rather than an ordered list, so this is the roadmap's stated
 * assumption; the roadmap flags it for confirmation before merge.
 *
 * The process sits directly under the range rather than after the audiences:
 * a buyer who has just seen what we make asks how it gets made before asking
 * who else we make it for.
 *
 * Surfaces alternate down the page and the bands are what separate one section
 * from the next:
 *
 *   hero dark · about white · range light · process white · audiences light ·
 *   customization dark · manufacturing white · FAQ light · CTA action
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

/** Headings and body copy taken verbatim from the §A audience-page heroes. */
const AUDIENCES: AudienceCardItem[] = [
  {
    eyebrow: "For clubs and gyms",
    title: "Put your club identity across the entire kit.",
    description:
      "Custom gloves, fightwear and apparel created around your club colours, logo and practical ordering requirements.",
    href: "/for-clubs",
    action: CTA.clubKit,
  },
  {
    eyebrow: "Private label",
    title: "Your fightwear brand, supported by a clear manufacturing process.",
    description:
      "Develop products, labels and packaging through an approved sample before bulk production begins.",
    href: "/private-label",
    action: CTA.privateLabel,
  },
];

/** §08 Customization panel, verbatim. */
const CUSTOMIZATION: CustomizationItem[] = [
  {
    tag: "Branding",
    title: "Your brand",
    description:
      "Logo placement, print, patch, label or embroidery where suitable.",
  },
  {
    tag: "Colour",
    title: "Your colours",
    description: "Club or brand colour combinations with agreed references.",
  },
  {
    tag: "Construction",
    title: "Your construction",
    description:
      "Materials, padding, closure, stitching and performance requirement.",
  },
  {
    tag: "Packaging",
    title: "Your packaging",
    description: "Labels, bags, boxes, inserts and export cartons.",
  },
];

/**
 * Capability, not procedure.
 *
 * These were the six operations that finish a boxing glove — cutting, padding,
 * stitching, decoration, inspection, packing. That was too narrow twice over:
 * it described one product out of the 89 in `product-list.ts`, and "padding and
 * forming" means nothing for a yoga strap, a lifting belt or a rashguard.
 *
 * A buyer placing a bulk order is not asking how a thumb is attached. They are
 * asking whether a tech pack can be turned into units — whether there is a team
 * to develop the spec, equipment to cut and decorate at volume, and a way to
 * hold quality across a run. So these six are the stages every product in the
 * catalogue passes through, stated as what the business can do rather than what
 * happens to a glove.
 *
 * Card copy is kept to roughly fifteen to twenty words. These ran to
 * forty-six at the longest and seventeen at the shortest, which made the grid
 * ragged and put the explaining in the card rather than in /manufacturing,
 * which the section links to. What survived the trim is the specific nouns —
 * laser, steel die, BOM, flatlock, overlock, sublimation — because those are
 * what prove the capability; what went was the clauses explaining why each one
 * matters.
 *
 * Tech pack development is confirmed: the business writes the specification
 * where a buyer does not already have one, which is why the first card offers
 * both routes in rather than assuming a brand arrives with paperwork. It is
 * also the difference between a development partner and a job shop, so it
 * leads.
 *
 * STILL NEEDS CONFIRMATION. Unlike the copy elsewhere on this site, the rest
 * of these name equipment — digitised and graded patterns, laser and steel die
 * cutting, sublimation, flatlock and overlock machines, per-batch recorded
 * testing. Those are exactly the claims a buyer verifies in an audit, so each
 * needs checking against what is actually on the floor before this ships
 * (#5, #6).
 */
const EXPERTISE: ExpertiseItem[] = [
  {
    phase: "Development",
    title: "Design and tech pack development",
    description:
      "Arrive with a tech pack and we build to it. Arrive with a sketch and we write one — measurements, materials, BOM, artwork placement.",
    shot: "Design and tech pack development",
    photo: {
      src: techPackDesk,
      alt: "A pattern maker holding a leather swatch against a printed glove pattern, with the panel layout open on screen beside them.",
    },
  },
  {
    phase: "Production",
    title: "Pattern making and cutting",
    description:
      "Patterns digitised and graded across the full size run, then cut by laser or steel die.",
    shot: "Pattern cutting",
    photo: {
      src: cuttingTable,
      alt: "A cutter guiding a straight-knife machine through a stack of navy fabric plies on a cutting table, following a pinned paper marker.",
    },
  },
  {
    phase: "Production",
    title: "Printing and decoration",
    description:
      "Sublimation onto flat panels before assembly, plus screen print, transfer, vinyl and embroidery.",
    shot: "Printing or embroidery",
    photo: {
      src: sublimationPrinter,
      alt: "An operator at the control panel of a wide-format sublimation printer, watching a printed transfer roll feed out.",
    },
  },
  {
    phase: "Production",
    title: "Stitching and assembly",
    description:
      "Machines set per operation — flatlock and overlock on knits, heavy lockstitch on leather and webbing.",
    shot: "Stitching process",
    photo: {
      src: bindingMachine,
      alt: "A machinist feeding the curved cuff of a boxing glove through a binding attachment, red edge tape running off a roll into the guide.",
    },
  },
  {
    phase: "Quality",
    title: "Quality testing",
    description:
      "Inline checks through the run, then measurements, colour and logo placement verified against your approved sample.",
    shot: "Quality inspection",
    photo: {
      src: inspectionBench,
      alt: "Two inspectors checking finished headguards and gloves into crates at the end of a stitching line.",
    },
  },
  {
    phase: "Dispatch",
    title: "Packing and export",
    description:
      "Polybagging, carton assortment and markings to your instruction, with export documentation for the destination.",
    shot: "Packaging",
    photo: {
      src: dispatchWarehouse,
      alt: "A dispatch warehouse with bagged gloves and sealed cartons on pallet racking, and a worker at a terminal on the floor.",
    },
  },
];

/** §08 Process stepper, verbatim. */
const STAGES: ProcessStage[] = [
  {
    number: "01",
    title: "Share requirements",
    outcome: "Product, quantity, logo, use case and destination are captured.",
  },
  {
    number: "02",
    title: "Review the concept",
    outcome: "Colours, logo placement and initial specifications are aligned.",
  },
  {
    number: "03",
    title: "Approve the sample",
    outcome: "Materials, construction, sizing and finish are confirmed.",
  },
  {
    number: "04",
    title: "Production and QC",
    outcome: "Bulk is made against the approved specification and checked.",
  },
  {
    number: "05",
    title: "Packing and delivery",
    outcome:
      "Final quantity, packing and shipment documentation are completed.",
  },
];

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

      {/*
        The entity block. Everything else on this page describes the product or
        the process; nothing says what Sparwright *is*, which leaves both a
        buyer doing due diligence and a crawler building an entity with only
        fragments to work from. Two paragraphs of sustained prose is also the
        only body copy above the fold — the rest of the homepage is headings and
        short supporting lines.

        Deliberately not a process block. The page already gives the process
        two sections of its own — the stepper directly below and "Manufacturing
        you can inspect before bulk" — so this one stays on who we are, what we
        make and who for. §10 preferred vocabulary throughout, and nothing here
        claims a year, a certification, a client count or a capacity figure
        (#5, #6).

        The photograph is the facility, not the product: an about block's job is
        proof that there is a real operation behind the claims (§09 — "real
        products, real materials, real makers and a visible production process"),
        and the collections slider immediately below already carries the product.

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
              title="A custom fight gear manufacturer for clubs and fightwear brands."
            />
            {/* Spaced with an explicit margin on the second paragraph, which
                is how every other stacked block on the site does it. `space-y`
                is not used anywhere in this codebase and generated no rule at
                all here — the paragraphs rendered flush against each other. */}
            <p className="mt-[var(--space-5)] max-w-copy text-body-large text-[var(--color-text-secondary)]">
              Sparwright manufactures custom boxing gloves, fightwear, lifting
              gear and club apparel for gyms, clubs and fightwear brands. Every
              product is made to a specification you set — materials and
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
              <Button href="/manufacturing" variant="secondary">
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
          title="Gloves, fightwear, lifting gear and club apparel."
          description="We manufacture custom fight gear, strength equipment and team apparel to your specification — your shell, your construction, your branding, approved on a sample before bulk production."
        />
        <div className="mt-[var(--space-6)]">
          <ProductShowcase items={COLLECTIONS} />
        </div>
        <div className="mt-[var(--space-5)]">
          <TextLink href="/products">{CTA.products}</TextLink>
        </div>
      </Section>

      <ProcessStepper
        id="how-it-works"
        theme="white"
        eyebrow="How it works"
        title="How custom gloves, fightwear and apparel are manufactured."
        description="Custom boxing gloves, fightwear, lifting gear and club apparel move through the same five stages — your specification, an approved pre-production sample, bulk production with quality control recorded against that sample, then packing and export documentation. You sign off each stage before the next begins."
        stages={STAGES}
      />

      <Section theme="light" width="work">
        <SectionHeader
          eyebrow="Who we manufacture for"
          title="Two ways buyers work with us."
          description="Clubs ordering a coordinated kit, and brands developing their own products against an approved specification."
        />
        <div className="mt-[var(--space-7)] grid gap-[var(--space-5)] lg:grid-cols-2">
          {AUDIENCES.map((audience) => (
            <AudienceCard key={audience.href} item={audience} />
          ))}
        </div>
      </Section>

      <Section theme="dark" width="work">
        <SectionHeader
          eyebrow="Customization"
          title="See your club identity before production."
          description={
            <>
              Upload your logo and send your product requirements. We&rsquo;ll
              review the practical concept or sampling step before bulk
              production.
            </>
          }
        />
        <div className="mt-[var(--space-7)] grid gap-[var(--space-6)] sm:grid-cols-2 lg:grid-cols-4">
          {CUSTOMIZATION.map((item) => (
            <CustomizationCard key={item.tag} item={item} />
          ))}
        </div>
        <div className="mt-[var(--space-7)]">
          <Button
            href="/quote?intent=mockup"
            variant="inverse"
            arrow
            data-analytics="hero_mockup_click"
          >
            {CTA.mockup}
          </Button>
        </div>
      </Section>

      {/*
        Capability rather than sequence. The stepper above says what happens
        when; this says what we can actually do to a product, which is the
        question that decides whether a buyer's item is makeable here at all.

        Light: it sits between the dark customization band and the white
        manufacturing band, and no two adjacent sections may share a surface.
      */}
      <ExpertiseGrid
        theme="light"
        eyebrow="Our expertise"
        title="From a sketch or tech pack to a shipped bulk order."
        description="Six capabilities that take an idea into volume production — a tech pack written or worked to, patterns digitised and graded across the size run, laser and die cutting, sublimation and embroidery, industrial assembly, and testing against the sample you approved."
        items={EXPERTISE}
        href="/manufacturing"
        linkLabel={CTA.manufacturing}
      />

      <Section theme="white" width="work">
        <div className="grid items-center gap-[var(--space-7)] lg:grid-cols-2">
          <div>
            {/*
              §10 headline formula, proof + stage. The §A manufacturing intro
              leads on years traded and location; both are supplier credentials,
              and they still open /manufacturing, where a buyer checking us out
              goes looking for them.
            */}
            <SectionHeader
              eyebrow="Manufacturing"
              title="Manufacturing you can inspect before bulk."
              description="Clear product requirements, a sample you sign off, and checks recorded against that sample before anything is packed. Nothing about the process is a black box."
            />
            <div className="mt-[var(--space-6)]">
              <Button href="/manufacturing" variant="secondary">
                {CTA.manufacturing}
              </Button>
            </div>
          </div>
          <ImagePlaceholder shot="Stitching process" ratio="process" />
        </div>
      </Section>

      <Section theme="light" width="copy">
        <SectionHeader
          eyebrow="Questions"
          title="The nine things buyers ask first."
          description="If your question is not here, send it with your requirements — a person reads every request."
        />
        <FAQAccordion items={SITE_FAQS} className="mt-[var(--space-6)]" />
      </Section>

      {/* §A gives this action as "REQUEST A QUOTE"; the §08 CTA library is
          normative for labels, so it renders as "Get a Manufacturing Quote". */}
      <CallToAction
        title="Ready to develop your custom fight gear?"
        description="Send your product, branding, quantity and destination."
        action={{
          label: CTA.quote,
          href: "/quote",
          analytics: "hero_quote_click",
        }}
      />
    </>
  );
}
