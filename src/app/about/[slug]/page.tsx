import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ExpertiseGrid } from "@/components/content/ExpertiseGrid";
import { QualityMatrix } from "@/components/content/QualityMatrix";
import {
  ComingSoon,
  SectionPageShell,
} from "@/components/content/SectionPageShell";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { EXPERTISE } from "@/lib/expertise";
import { starterMetadata } from "@/lib/metadata";
import { ABOUT, sectionPage } from "@/lib/site-sections";

/**
 * About Us sub-pages — starter pages, one route for all of them.
 *
 * Each body reuses content the site already stands behind: the workshop
 * stages (`EXPERTISE`), the recorded quality checks (`QualityMatrix`), the
 * export commitments from the FAQ. Nothing here is new claim; Gallery has no
 * real material yet, so it says so. "Our Process" is not served here — it is
 * the How It Works page.
 */

type AboutBody = {
  eyebrow: string;
  title: string;
  description: string;
  body: ReactNode;
};

/** Export, stated as the steps the FAQ and product pages already commit to. */
const EXPORT_STEPS = [
  {
    title: "Packing to your instruction",
    text: "Polybagging, inner packing and carton assortment by size and colourway, as you specify.",
  },
  {
    title: "Carton markings and labels",
    text: "Cartons marked to your instruction, with your labels and care information on every piece.",
  },
  {
    title: "Export documentation",
    text: "The paperwork for the destination prepared with the shipment, confirmed with your quote.",
  },
  {
    title: "Shipping method and cost",
    text: "Set by the quantity and destination and confirmed with your quote. The UK and Europe are our main markets.",
  },
  {
    title: "Duties and local taxes",
    text: "Import duty and local taxes are the buyer's responsibility unless we agree otherwise in writing.",
  },
];

const BODIES: Record<string, AboutBody> = {
  capabilities: {
    eyebrow: "Capabilities",
    title: "What the workshop can make, and how.",
    description:
      "Six capabilities that take a sketch or a tech pack into volume production — each one in-house in Sialkot.",
    body: (
      <ExpertiseGrid
        theme="white"
        eyebrow="Capabilities"
        index="01"
        title="From tech pack to bulk order"
        description="Development, cutting, decoration, assembly, testing and packing — the stages every product passes through."
        items={EXPERTISE}
      />
    ),
  },
  "factory-tour": {
    eyebrow: "Factory tour",
    title: "Inside the Sialkot workshop.",
    description:
      "A walk through the floor in the order your products move through it — from the pattern table to the dispatch bay.",
    body: (
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="The floor"
          index="01"
          title="Stage by stage"
          description="Every order passes through these six stations. Ask to see your own order at any of them."
        />
        <ol className="mt-[var(--space-7)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE.map((stage, i) =>
            stage.photo ? (
              <li key={stage.title} className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={stage.photo.src}
                    alt={stage.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-[var(--space-4)] top-[var(--space-4)] rounded-full bg-ink-950/75 px-3 py-1 font-display text-small font-bold tabular-nums text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-[var(--space-5)]">
                  <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">{stage.phase}</p>
                  <h3 className="mt-1 text-heading-4">{stage.title}</h3>
                  <p className="mt-2 text-small text-[var(--color-text-secondary)]">{stage.description}</p>
                </div>
              </li>
            ) : null,
          )}
        </ol>
      </Section>
    ),
  },
  "quality-standards": {
    eyebrow: "Quality and compliance",
    title: "Quality standards you can check.",
    description:
      "Every order is checked against the sample you approved, and every check is recorded. This page lists what we check — not certifications we do not hold.",
    body: (
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Quality control"
          index="01"
          title="The checks, and the evidence for each"
          description="Performed and recorded on every order before it leaves the workshop."
        />
        <QualityMatrix
          caption="Quality-control checks and the evidence recorded for each"
          className="mt-[var(--space-6)]"
        />
        <div className="mt-[var(--space-7)] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6)]">
          <h3 className="text-heading-4">Compliance</h3>
          <p className="mt-2 max-w-copy text-body text-[var(--color-text-secondary)]">
            Labelling, care information, packaging and documentation are set to
            your market&rsquo;s requirements and confirmed per order. If your
            brand or retailer needs a specific audit or test report, tell us in
            your brief and we confirm what we can provide before you order.
          </p>
        </div>
      </Section>
    ),
  },
  "export-process": {
    eyebrow: "Export process",
    title: "From our dispatch bay to your door.",
    description:
      "How a finished order is packed, documented and shipped to clubs and brands in the UK and Europe.",
    body: (
      <Section theme="white" width="work">
        <SectionHeader eyebrow="Export" index="01" title="Five things confirmed before dispatch" />
        <ol className="mt-[var(--space-7)] grid gap-[var(--space-4)] md:grid-cols-2">
          {EXPORT_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-[var(--space-4)] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]"
            >
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forge-600 font-display text-small font-bold tabular-nums text-white"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-body text-body-large font-semibold">{step.title}</h3>
                <p className="mt-1 text-small text-[var(--color-text-secondary)]">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    ),
  },
  gallery: {
    eyebrow: "Gallery",
    title: "The workshop and the work.",
    description:
      "Photographs from the floor and of finished orders — real work, nothing staged.",
    body: (
      <ComingSoon
        title="The gallery is being photographed."
        body="Until it is up, the factory tour shows each stage of the workshop, and the portfolio will carry finished orders as they are shot."
        links={[
          { label: "Take the factory tour", href: "/about/factory-tour" },
          { label: "See the portfolio", href: "/portfolio" },
        ]}
      />
    ),
  },
};

/** Only the pages this route serves — "Our Process" lives at /how-it-works. */
const SLUGS = Object.keys(BODIES);

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/about/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = sectionPage(ABOUT, slug);
  const body = BODIES[slug];
  if (!page || !body) return {};
  return starterMetadata({
    path: page.href,
    title: page.label,
    description: body.description,
    ready: page.ready,
  });
}

export default async function AboutSubPage({
  params,
}: PageProps<"/about/[slug]">) {
  const { slug } = await params;
  const page = sectionPage(ABOUT, slug);
  const body = BODIES[slug];
  if (!page || !body) notFound();

  return (
    <SectionPageShell
      section={ABOUT}
      sectionLabel="About Us"
      pageLabel={page.label}
      href={page.href}
      eyebrow={body.eyebrow}
      title={body.title}
      description={body.description}
    >
      {body.body}
    </SectionPageShell>
  );
}
