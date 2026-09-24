import type { Metadata } from "next";
import {
  ComingSoon,
  SectionPageShell,
} from "@/components/content/SectionPageShell";
import { starterMetadata } from "@/lib/metadata";
import { RESOURCES, sectionPage } from "@/lib/site-sections";

/**
 * Blog index — a starter. There are no articles yet, so it says so and points
 * to the guides that do exist. When the first article lands, this becomes the
 * article list and the page is marked ready in `site-sections.ts`.
 */

const PAGE = sectionPage(RESOURCES, "blog")!;

export const metadata: Metadata = starterMetadata({
  path: PAGE.href,
  title: "Blog",
  description:
    "Articles for gyms, clubs and brands on ordering custom boxing gloves, fightwear and club kit.",
  ready: PAGE.ready,
});

export default function BlogPage() {
  return (
    <SectionPageShell
      section={RESOURCES}
      sectionLabel="Resources"
      pageLabel={PAGE.label}
      href={PAGE.href}
      eyebrow="Blog"
      title="Articles for gyms, clubs and brands."
      description="Practical guides on specifying, ordering and reordering custom fight gear."
    >
      <ComingSoon
        title="The first articles are being written."
        body="Until they are up, the size and MOQ guides answer the questions buyers ask most before ordering."
        links={[
          { label: "Size guide", href: "/resources/size-guide" },
          { label: "MOQ guide", href: "/resources/moq-guide" },
        ]}
      />
    </SectionPageShell>
  );
}
