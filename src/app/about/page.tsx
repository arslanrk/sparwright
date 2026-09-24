import type { Metadata } from "next";
import { SectionPageShell } from "@/components/content/SectionPageShell";
import { starterMetadata } from "@/lib/metadata";
import { ABOUT } from "@/lib/site-sections";

/**
 * About Us hub. The page list below the heading is the section itself — the
 * shell's "In this section" grid — so the hub is never out of step with the
 * menu. The about copy itself is a starter; the homepage About block and the
 * Manufacturing page carry the long form for now.
 */

export const metadata: Metadata = starterMetadata({
  path: ABOUT.hub.href,
  title: "About Sparwright",
  description:
    "Sparwright is an OEM and private label manufacturer of custom fight gear, lifting gear and apparel in Sialkot, Pakistan.",
  ready: ABOUT.hub.ready,
});

export default function AboutPage() {
  return (
    <SectionPageShell
      section={ABOUT}
      sectionLabel="About Us"
      href={ABOUT.hub.href}
      eyebrow="About Sparwright"
      title="A custom fight gear manufacturer in Sialkot, Pakistan."
      description="Sparwright makes custom boxing and MMA gloves, fightwear, lifting gear, protective gear and club apparel for gyms, clubs and private label brands — each made to a specification the buyer approves, and checked against an approved sample before it ships."
    />
  );
}
