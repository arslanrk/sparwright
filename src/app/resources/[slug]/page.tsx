import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SectionPageShell } from "@/components/content/SectionPageShell";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { starterMetadata } from "@/lib/metadata";
import { getProduct, productHref } from "@/lib/products";
import { RESOURCES, sectionPage } from "@/lib/site-sections";

/**
 * Resources sub-pages — starter guides, one route for all of them. The Blog
 * is its own route (/blog).
 *
 * Every figure here is one the product pages already publish (the typical
 * glove weights), and every claim is one the site already makes. The MOQ
 * guide explains what sets a minimum, not a number: non-negotiable #6 rules
 * out publishing one until it is confirmed.
 */

type ResourceBody = {
  eyebrow: string;
  title: string;
  description: string;
  body: ReactNode;
};

/** Glove weights by type, read from the product pages so the two agree. */
function weightRows() {
  return ["custom-boxing-gloves", "custom-mma-gloves"].flatMap((slug) => {
    const product = getProduct(slug);
    return (product?.types?.items ?? [])
      .filter((type) => type.spec)
      .map((type) => ({
        product,
        title: type.title,
        spec: type.spec as string,
        description: type.description,
      }));
  });
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]">
      <h3 className="font-body text-body-large font-semibold">{title}</h3>
      <div className="mt-2 text-small text-[var(--color-text-secondary)]">{children}</div>
    </li>
  );
}

const BODIES: Record<string, ResourceBody> = {
  "size-guide": {
    eyebrow: "Size guide",
    title: "Glove weights and sizing, explained.",
    description:
      "Typical glove weights by type, and how sizes are confirmed for gloves, apparel and protective gear before bulk production.",
    body: (
      <>
        <Section theme="white" width="work">
          <SectionHeader
            eyebrow="Glove weights"
            index="01"
            title="Typical weight by glove type"
            description="The norms buyers order against. Every glove's weight is confirmed on your sample."
          />
          <div className="mt-[var(--space-6)] overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink-950 text-eyebrow uppercase text-[var(--color-text-muted)]">
                  <th className="py-3 pr-[var(--space-5)] font-semibold">Glove</th>
                  <th className="py-3 pr-[var(--space-5)] font-semibold">Typical weight</th>
                  <th className="py-3 font-semibold">Built for</th>
                </tr>
              </thead>
              <tbody>
                {weightRows().map((row) => (
                  <tr key={row.title} className="border-b border-[var(--color-border)] align-top">
                    <td className="py-3 pr-[var(--space-5)] font-semibold">
                      {row.product ? (
                        <Link href={productHref(row.product)} className="underline-offset-4 hover:underline">
                          {row.title}
                        </Link>
                      ) : (
                        row.title
                      )}
                    </td>
                    <td className="py-3 pr-[var(--space-5)] font-semibold tabular-nums text-forge-700">{row.spec}</td>
                    <td className="py-3 text-small text-[var(--color-text-secondary)]">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
        <Section theme="light" width="work">
          <SectionHeader eyebrow="Sizing" index="02" title="How sizes are confirmed" />
          <ul className="mt-[var(--space-6)] grid gap-[var(--space-4)] md:grid-cols-3">
            <Card title="Gloves">
              Adult and kids&rsquo; sizes. The size split is confirmed against your quantity before bulk.
            </Card>
            <Card title="Apparel">
              A size chart is agreed for each garment, then the quantity per size before production.
            </Card>
            <Card title="Protective gear">
              Head guards, protectors and supports are sized per product, in adult and kids&rsquo; ranges.
            </Card>
          </ul>
        </Section>
      </>
    ),
  },
  "moq-guide": {
    eyebrow: "MOQ guide",
    title: "How minimum order quantities work.",
    description:
      "What sets the minimum for a custom order, why it varies by product, and how to plan an order around it.",
    body: (
      <>
        <Section theme="white" width="work">
          <SectionHeader
            eyebrow="What sets a minimum"
            index="01"
            title="Four things decide your minimum"
            description="Minimums are set per product, not per order, and confirmed with your quote before you commit."
          />
          <ul className="mt-[var(--space-6)] grid gap-[var(--space-4)] md:grid-cols-2">
            <Card title="Material">
              Leather, synthetic and fabric are bought and cut in different quantities, so the shell or fabric you choose moves the minimum.
            </Card>
            <Card title="Branding method">
              Sublimation, print, embroidery and patches each have their own set-up, which affects the smallest practical run.
            </Card>
            <Card title="Colourways">
              Each extra colourway is its own run of material and branding, so more colourways usually means a higher total.
            </Card>
            <Card title="Construction">
              Custom padding, panels or closures need their own set-up; a standard construction keeps the minimum lower.
            </Card>
          </ul>
        </Section>
        <Section theme="light" width="work">
          <SectionHeader eyebrow="Planning" index="02" title="Planning an order around it" />
          <ul className="mt-[var(--space-6)] grid gap-[var(--space-4)] md:grid-cols-3">
            <Card title="Start with one line">
              Begin with the product you need most. Specs stay on file, so other lines added later match the first.
            </Card>
            <Card title="Keep colourways focused">
              One or two colourways across the kit keeps each run efficient and the identity consistent.
            </Card>
            <Card title="Send a rough quantity">
              Even an estimate lets us confirm the minimum for your exact specification before you commit.
            </Card>
          </ul>
        </Section>
      </>
    ),
  },
  "why-pakistan": {
    eyebrow: "Why Pakistani manufacturing",
    title: "Why Sialkot, and what it means for your order.",
    description:
      "Sialkot, Pakistan has made fight gear for a long time. Here is what making there — rather than sourcing and relabelling — means for a club or brand.",
    body: (
      <Section theme="white" width="work">
        <SectionHeader eyebrow="Made in Sialkot" index="01" title="What it means for your order" />
        <ul className="mt-[var(--space-6)] grid gap-[var(--space-4)] md:grid-cols-2">
          <Card title="Made where it is produced">
            Your order is made in our Sialkot workshop, not bought in from another supplier and relabelled — and its inspection record can be shared.
          </Card>
          <Card title="A long-established trade">
            Sialkot has manufactured fight gear for a long time, with the materials, trims and skills for gloves, pads and fightwear close at hand.
          </Card>
          <Card title="One maker across the kit">
            Gloves, fightwear, lifting gear and protective gear from one workshop, so a club or brand carries one identity across everything.
          </Card>
          <Card title="Built for export">
            The UK and Europe are our main markets. Packing, carton markings and export documents are prepared with every shipment.
          </Card>
        </ul>
      </Section>
    ),
  },
};

const SLUGS = Object.keys(BODIES);

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = sectionPage(RESOURCES, slug);
  const body = BODIES[slug];
  if (!page || !body) return {};
  return starterMetadata({
    path: page.href,
    title: page.label,
    description: body.description,
    ready: page.ready,
  });
}

export default async function ResourcePage({
  params,
}: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const page = sectionPage(RESOURCES, slug);
  const body = BODIES[slug];
  if (!page || !body) notFound();

  return (
    <SectionPageShell
      section={RESOURCES}
      sectionLabel="Resources"
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
