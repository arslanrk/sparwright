import { HOW_IT_WORKS_READY } from "./process";

/**
 * The About and Resources sections, and the Contact page — one list each for
 * the header dropdowns, the mobile drawer, the section hubs and the sitemap,
 * so none of them can disagree.
 *
 * STARTER PAGES. Each page has a layout and whatever real content already
 * exists on the site (the workshop stages, the quality matrix, the glove
 * weights), but the long-form content is still to come. Until a page's
 * `ready` is set it is noindex and left out of the sitemap: a buyer can still
 * open it from the menu, a search engine does not index a half-built page.
 */

export type SectionPage = {
  slug: string;
  /** Menu label, and the page title. */
  label: string;
  href: string;
  /** One line, for the dropdown and the section hub. */
  description: string;
  ready: boolean;
};

export type SiteSection = {
  /** The hub page, which lists the section's pages. */
  hub: { label: string; href: string; ready: boolean };
  pages: SectionPage[];
};

export const ABOUT: SiteSection = {
  hub: { label: "About Sparwright", href: "/about", ready: false },
  pages: [
    // Our process is the How It Works page, not a copy of it.
    {
      slug: "our-process",
      label: "Our Process",
      href: "/how-it-works",
      description: "How an order runs, from brief to bulk.",
      ready: HOW_IT_WORKS_READY,
    },
    {
      slug: "capabilities",
      label: "Capabilities",
      href: "/about/capabilities",
      description: "Development, cutting, decoration and assembly.",
      ready: false,
    },
    {
      slug: "factory-tour",
      label: "Factory Tour",
      href: "/about/factory-tour",
      description: "Inside the Sialkot workshop, stage by stage.",
      ready: false,
    },
    {
      slug: "quality-standards",
      label: "Quality Standards and Compliance",
      href: "/about/quality-standards",
      description: "What is checked, and what is recorded.",
      ready: false,
    },
    {
      slug: "export-process",
      label: "Export Process",
      href: "/about/export-process",
      description: "Packing, documents and shipping.",
      ready: false,
    },
    {
      slug: "gallery",
      label: "Gallery",
      href: "/about/gallery",
      description: "The workshop and the work, photographed.",
      ready: false,
    },
  ],
};

export const RESOURCES: SiteSection = {
  hub: { label: "All Resources", href: "/resources", ready: false },
  pages: [
    {
      slug: "size-guide",
      label: "Size Guide",
      href: "/resources/size-guide",
      description: "Glove weights and how sizing is confirmed.",
      ready: false,
    },
    {
      slug: "moq-guide",
      label: "MOQ Guide",
      href: "/resources/moq-guide",
      description: "What sets a minimum order, and how to plan one.",
      ready: false,
    },
    {
      slug: "why-pakistan",
      label: "Why Pakistani Manufacturing",
      href: "/resources/why-pakistan",
      description: "Sialkot and what it means for your order.",
      ready: false,
    },
    {
      slug: "blog",
      label: "Blog",
      href: "/blog",
      description: "Guides for gyms, clubs and brands.",
      ready: false,
    },
  ],
};

export const CONTACT_PAGE = { label: "Contact", href: "/contact", ready: false };

/** A page within a section, by slug — for the dynamic section routes. */
export function sectionPage(section: SiteSection, slug: string) {
  return section.pages.find((page) => page.slug === slug);
}

/** Every starter route that is ready, for the sitemap. */
export function readySectionPaths(): string[] {
  const all = [
    ABOUT.hub,
    ...ABOUT.pages,
    RESOURCES.hub,
    ...RESOURCES.pages,
    CONTACT_PAGE,
  ];
  // How It Works is listed by the sitemap on its own.
  return all
    .filter((page) => page.ready && page.href !== "/how-it-works")
    .map((page) => page.href);
}
