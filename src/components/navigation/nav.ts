import { CTA } from "@/components/foundation/cta";

/**
 * Navigation model — Design System §08 Header and navigation, §08 Footer.
 *
 * One source of truth for the header, the mobile drawer and the footer, so the
 * three can never drift apart. §08 caps primary navigation at six items; the
 * five below are the launch information architecture.
 */

export type NavLink = {
  label: string;
  href: string;
  /** Short line shown under the label in the Products dropdown and drawer. */
  description?: string;
};

export type PrimaryNavItem = NavLink & {
  /** Renders as a dropdown trigger in the desktop header (§08). */
  children?: NavLink[];
};

/**
 * The Products dropdown (§08). Slugs land with the product template in PR 5 —
 * reconcile these three with `src/lib/products.ts` when that PR seeds content.
 */
export const PRODUCT_LINKS: NavLink[] = [
  {
    label: "Custom Boxing Gloves",
    href: "/products/custom-boxing-gloves",
    description: "Your logo, colours and specification.",
  },
  {
    label: "Fightwear",
    href: "/products/fightwear",
    description: "Shorts, rash guards and training kit.",
  },
  {
    label: "Club Apparel",
    href: "/products/club-apparel",
    description: "Coordinated kit for gyms and clubs.",
  },
];

export const PRIMARY_NAV: PrimaryNavItem[] = [
  { label: "Products", href: "/products", children: PRODUCT_LINKS },
  { label: "For Clubs", href: "/for-clubs" },
  { label: "Private Label", href: "/private-label" },
  { label: "Manufacturing", href: "/manufacturing" },
  // The process stepper lives on the homepage (PR 4, §11), so this is an
  // anchor rather than a route of its own.
  { label: CTA.howItWorks, href: "/#how-it-works" },
];

/** Primary header action. §08 keeps one conversion action in the header. */
export const HEADER_CTA = { label: CTA.mockup, href: "/quote" } as const;

/**
 * Contact details are unconfirmed placeholders on a working brand (§03). The
 * PR 13 launch checklist verifies them before anything goes live; no phone
 * number is published until there is one to publish (non-negotiable #5).
 */
export const CONTACT = {
  email: "hello@sparwright.com",
  location: "Sialkot, Pakistan",
} as const;

export type FooterColumn = { heading: string; links: NavLink[] };

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Products",
    links: [
      ...PRODUCT_LINKS.map(({ label, href }) => ({ label, href })),
      {
        label: "All Products",
        href: "/products",
      },
    ],
  },
  {
    heading: "Manufacturing",
    links: [
      { label: "Manufacturing & Quality", href: "/manufacturing" },
      { label: CTA.howItWorks, href: "/#how-it-works" },
      { label: "For Clubs", href: "/for-clubs" },
      { label: "Private Label", href: "/private-label" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: CTA.mockup, href: "/quote" },
      { label: CTA.quote, href: "/quote" },
      { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    ],
  },
];

/** Legal row. The three pages ship in PR 10. */
export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

/** Active-state test for navigation links. Anchors are never marked active. */
export function isActivePath(pathname: string, href: string) {
  if (href.includes("#") || href.startsWith("mailto:")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
