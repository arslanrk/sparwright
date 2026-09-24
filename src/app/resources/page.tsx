import type { Metadata } from "next";
import { SectionPageShell } from "@/components/content/SectionPageShell";
import { starterMetadata } from "@/lib/metadata";
import { RESOURCES } from "@/lib/site-sections";

/** Resources hub — the guide list is the shell's "In this section" grid. */

export const metadata: Metadata = starterMetadata({
  path: RESOURCES.hub.href,
  title: "Resources",
  description:
    "Guides for gyms, clubs and brands ordering custom fight gear: sizing, minimum orders and manufacturing in Pakistan.",
  ready: RESOURCES.hub.ready,
});

export default function ResourcesPage() {
  return (
    <SectionPageShell
      section={RESOURCES}
      sectionLabel="Resources"
      href={RESOURCES.hub.href}
      eyebrow="Resources"
      title="Guides for ordering custom fight gear."
      description="Sizing, minimum orders, why we make in Sialkot, and articles for gyms, clubs and brands planning a custom order."
    />
  );
}
