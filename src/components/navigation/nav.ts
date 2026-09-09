import { CTA } from "@/components/foundation/cta";
import { PRODUCTS, productHref } from "@/lib/products";

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
 * The Products dropdown (§08), built from the catalogue so the menu can only
 * ever offer pages that exist.
 *
 * §11 launches with two product pages, not three: the anchor product and one
 * combined Fightwear and Club Apparel page. PR 3 guessed at three separate
 * slugs before the catalogue existed; PR 5 reconciled them here.
 */
const PRODUCT_BLURBS: Record<string, string> = {
  "custom-boxing-gloves": "Your logo, colours and specification.",
  "fightwear-club-apparel": "Shorts, rashguards and coordinated club kit.",
};

export const PRODUCT_LINKS: NavLink[] = PRODUCTS.map((product) => ({
  label: product.name,
  href: productHref(product),
  description: PRODUCT_BLURBS[product.slug],
}));

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

/**
 * Is this link the section the visitor is in? True for the exact page and for
 * anything below it, so "Products" stays highlighted on a product page.
 * Anchors and mail links are never active.
 */
export function isActivePath(pathname: string, href: string) {
  if (href.includes("#") || href.startsWith("mailto:")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Is this link the page the visitor is actually on? Only this earns
 * `aria-current="page"`: putting it on the ancestor as well would announce two
 * different links as the current page (§12).
 */
export function isCurrentPage(pathname: string, href: string) {
  if (href.includes("#") || href.startsWith("mailto:")) return false;
  return pathname === href;
}
