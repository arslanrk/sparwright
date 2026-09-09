import type { Metadata } from "next";
import { CallToAction } from "@/components/content/CallToAction";
import { Hero } from "@/components/content/Hero";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { QualityMatrix } from "@/components/content/QualityMatrix";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

/**
 * Manufacturing and Quality — Design System §11 Manufacturing template.
 *
 * The credibility page. §11: open with ten years of hands-on experience, name
 * who owns each responsibility, show the actual production stages, and publish
 * only quality checks the team will consistently perform and record.
 *
 * Two honesty constraints shape this page. Non-negotiable #5 forbids inventing
 * people or certifications, so the named-ownership section carries the roles
 * and responsibilities with the names left as an explicit gap rather than
 * filled with plausible ones. And §09 forbids artificial or borrowed factory
 * imagery, so each production stage names the shot it is waiting for. Both are
 * PR 13 blockers.
 */

export const metadata: Metadata = {
  title: "Manufacturing and Quality",
  description:
    "Ten years of hands-on fight-gear manufacturing in Sialkot, built around clear product requirements, approved samples and checks before dispatch.",
};

/**
 * §11 "Name who owns product development, manufacturing, quality, buyer
 * communication and digital systems."
 *
 * `name: null` is deliberate. Non-negotiable #5 rules out inventing people, so
 * the real names go in here before launch and the page shows the gap until they
 * do — §10 is clear that named roles beat anonymous corporate voice.
 */
type Owner = { name: string | null; role: string; responsibility: string };

const OWNERSHIP: Owner[] = [
  {
    name: null,
    role: "Product development",
    responsibility:
      "Turns a reference, sketch or brief into a specification that can actually be made, and raises what is not practical before sampling.",
  },
  {
    name: null,
    role: "Manufacturing",
    responsibility:
      "Owns cutting, padding, stitching and assembly against the approved sample, and the workshop schedule behind them.",
  },
  {
    name: null,
    role: "Quality control",
    responsibility:
      "Performs and records the checks below, and holds the order if something does not match the approved specification.",
  },
  {
    name: null,
    role: "Buyer communication",
    responsibility:
      "Your point of contact from first enquiry through sampling, production and dispatch.",
  },
  {
    name: null,
    role: "Digital systems",
    responsibility:
      "Keeps approved artwork, specifications and inspection records retrievable, so a reorder is produced against the original reference.",
  },
];

/** §09 manufacturing photography subjects, in production order. */
const STAGES = [
  {
    title: "Pattern cutting",
    description:
      "Panels cut to the approved pattern, with the material confirmed against the specification.",
    shot: "Pattern cutting",
  },
  {
    title: "Padding and assembly",
    description:
      "Padding profile built up and components assembled to the sample you signed off.",
    shot: "Padding or construction detail",
  },
  {
    title: "Stitching",
    description:
      "Panel stitching and reinforcement points worked to the agreed construction.",
    shot: "Stitching process",
  },
  {
    title: "Printing and embroidery",
    description:
      "Branding applied by the method agreed for that product, against your artwork.",
    shot: "Printing or embroidery",
  },
  {
    title: "Inspection",
    description:
      "Each check below performed and recorded against the approved specification.",
    shot: "Quality inspection",
  },
  {
    title: "Packing",
    description:
      "Count, assortment, inner packing and carton details recorded before dispatch.",
    shot: "Packaging",
  },
];

export default function ManufacturingPage() {
  return (
    <>
      <Section theme="light" width="work" density="compact">
        <Breadcrumb items={[{ label: "Manufacturing and Quality" }]} />
      </Section>

      {/* §11: open with ten years of hands-on experience. §A copy, verbatim. */}
      <Hero
        eyebrow="Manufacturing and quality"
        title="Ten years of hands-on fight-gear manufacturing experience."
        description="Based in Sialkot, our production work is built around clear product requirements, approved samples and checks before dispatch."
        actions={
          <>
            <Button href="/quote" variant="primary" arrow>
              {CTA.quote}
            </Button>
            <Button href="/products" variant="secondary">
              {CTA.products}
            </Button>
          </>
        }
        media={<ImagePlaceholder shot="Workshop wide view" ratio="hero" />}
      />

      {/* §11 — named ownership. */}
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Who does what"
          title="The people behind each part of your order."
          description="Manufacturing goes wrong in the gaps between responsibilities, so here is who holds each one."
        />
        <ul className="mt-[var(--space-7)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-3">
          {OWNERSHIP.map((owner) => (
            <li
              key={owner.role}
              className="border-t border-[var(--color-border)] pt-[var(--space-4)]"
            >
              <h3 className="text-heading-4">{owner.role}</h3>
              <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                {owner.responsibility}
              </p>
              <p className="mt-3">
                {owner.name ? (
                  <span className="font-body text-small font-semibold text-[var(--color-text)]">
                    {owner.name}
                  </span>
                ) : (
                  <PendingName />
                )}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* §11 — actual production stages and workshop evidence. */}
      <Section theme="light" width="work">
        <SectionHeader
          eyebrow="Production stages"
          title="What actually happens to your order."
          description="Six stages, each one something we can show you rather than describe."
        />
        <ol className="mt-[var(--space-7)] grid gap-[var(--space-6)] sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((stage, index) => (
            <li key={stage.title}>
              <ImagePlaceholder shot={stage.shot} ratio="process" />
              <p className="mt-[var(--space-4)] font-display text-heading-4 text-[var(--color-action)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-body text-body-large font-semibold">
                {stage.title}
              </h3>
              <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* §11 — quality-control evidence matrix. */}
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Quality control"
          title="Every check, and what is recorded to prove it."
          description="This list is short because it only contains checks the team performs and records on every order. If a check is not on it, do not assume it happens."
        />
        <QualityMatrix
          caption="Quality-control checks and the evidence recorded for each"
          className="mt-[var(--space-6)]"
        />
      </Section>

      {/* §11 — origin, stated plainly. No certifications are claimed. */}
      <Section theme="light" width="copy">
        <SectionHeader
          eyebrow="Origin"
          title="Made in Sialkot."
          description="Sialkot has manufactured fight gear for a long time, and we work there rather than sourcing from elsewhere and relabelling. If you want to verify something about how your order is made, ask — the inspection record for your order is retained and can be shared."
        />
      </Section>

      <CallToAction
        title="Ready to develop your custom fight gear?"
        description="Send your product, branding, quantity and destination."
        action={{ label: CTA.quote, href: "/quote" }}
      />
    </>
  );
}

/**
 * A visible, trackable gap where a real name belongs. §10 asks for named roles;
 * non-negotiable #5 rules out inventing one to fill the space, so the page says
 * so plainly until the names are added.
 */
function PendingName() {
  return (
    <span className="inline-block rounded-sm border border-dashed border-[var(--color-border)] px-2 py-1 text-eyebrow uppercase text-[var(--color-text-muted)]">
      Name to be confirmed before launch
    </span>
  );
}
