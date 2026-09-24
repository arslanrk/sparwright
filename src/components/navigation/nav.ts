import { CTA } from "@/components/foundation/cta";
import {
  PRODUCT_LIST,
  type CatalogueProduct,
  type ProductCategory,
} from "@/lib/product-list";
import { PRODUCTS, productHref } from "@/lib/products";
import {
  ABOUT,
  CONTACT_PAGE,
  RESOURCES,
  type SiteSection,
} from "@/lib/site-sections";

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
  /** "mega" for the Products catalogue; "list" for a section of pages. */
  menu?: "mega" | "list";
  /** One line introducing a "list" section, shown beside its pages. */
  intro?: string;
};

/** A section's pages. The hub is the trigger's own href, not a child. */
const sectionLinks = (section: SiteSection): NavLink[] =>
  section.pages.map(({ label, href, description }) => ({
    label,
    href,
    description,
  }));

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
  "custom-mma-gloves": "Fight, sparring and grappling gloves.",
  "custom-lifting-belts": "Belts, straps, grips and lifting gloves.",
  "custom-protective-gear": "Head guards, protectors and wraps.",
  "custom-pads-bags-mitts": "Punch bags, focus mitts and Thai pads.",
};

export const PRODUCT_LINKS: NavLink[] = PRODUCTS.map((product) => ({
  label: product.name,
  href: productHref(product),
  description: PRODUCT_BLURBS[product.slug],
}));

/**
 * The Products mega menu — the catalogue by category, in five columns.
 *
 * Built from `PRODUCT_LIST`, less every `moulded` entry: mats, kettlebells,
 * blocks, balls, rollers and bands are a different manufacturing competency
 * from the stitched and leather goods the rest of the site describes, and are
 * still awaiting confirmation. Yoga keeps only its strap once those go, so it
 * folds into Fitness rather than standing as a one-item column.
 *
 * Only two product pages exist (§11, non-negotiable #7), so each item goes to
 * the closest real page: boxing gloves to the glove page, fightwear and club
 * apparel to the apparel page. Everything else opens the brief with the
 * product already named (`?product=`, read by QuoteForm) rather than a thin
 * page invented to catch the click.
 */
export type MegaMenuGroup = {
  heading: string;
  /** The category's own page, when it has one — the heading links to it. */
  href?: string;
  links: NavLink[];
};

const PAGE_FOR = {
  gloves: productHref({ slug: "custom-boxing-gloves" }),
  apparel: productHref({ slug: "fightwear-club-apparel" }),
  mma: productHref({ slug: "custom-mma-gloves" }),
  lifting: productHref({ slug: "custom-lifting-belts" }),
  protective: productHref({ slug: "custom-protective-gear" }),
  pads: productHref({ slug: "custom-pads-bags-mitts" }),
};

/**
 * The page each catalogue line lands on. Kids' items follow the adult page
 * for the same product; anything without a page of its own — martial arts
 * uniforms, fitness accessories, kit bags, sauna wear — opens the brief.
 */
function catalogueHref(product: CatalogueProduct): string {
  const { category, name } = product;
  if (category === "Boxing" || name === "Kids Boxing Gloves") return PAGE_FOR.gloves;
  if (category === "MMA" || name === "Kids MMA Gloves" || name === "Kids Grappling Gloves") {
    return PAGE_FOR.mma;
  }
  if (category === "Strength and Lifting") return PAGE_FOR.lifting;
  if (category === "Protective Gear" || name === "Kids Head Guards" || name === "Kids Protective Gear") {
    return PAGE_FOR.protective;
  }
  if (category === "Training Equipment" || name === "Kids Punch Bags" || name === "Kids Boxing Sets") {
    return PAGE_FOR.pads;
  }
  // Sauna wear is apparel by category but not what the apparel page covers.
  if (category === "Apparel" && !name.startsWith("Sauna")) return PAGE_FOR.apparel;
  return `/quote?product=${encodeURIComponent(name)}`;
}

function menuGroup(
  heading: string,
  categories: ProductCategory[],
  href?: string,
): MegaMenuGroup {
  return {
    heading,
    href,
    links: PRODUCT_LIST.filter(
      (product) => categories.includes(product.category) && !product.moulded,
    ).map((product) => ({ label: product.name, href: catalogueHref(product) })),
  };
}

/**
 * Five columns balanced to roughly the same length. "Training Equipment" is
 * named for what is in it, and "Bags" becomes "Kit Bags" so it cannot be read
 * as the punch bags one column over.
 */
export const MEGA_MENU: MegaMenuGroup[][] = [
  [
    menuGroup("Boxing", ["Boxing"], PAGE_FOR.gloves),
    menuGroup("MMA", ["MMA"], PAGE_FOR.mma),
    menuGroup("Kids", ["Kids"]),
  ],
  [
    menuGroup("Bags, Pads & Mitts", ["Training Equipment"], PAGE_FOR.pads),
    menuGroup("Kit Bags", ["Bags"]),
  ],
  [menuGroup("Protective Gear", ["Protective Gear"], PAGE_FOR.protective)],
  [
    menuGroup("Strength & Lifting", ["Strength and Lifting"], PAGE_FOR.lifting),
    menuGroup("Fitness", ["Fitness Accessories", "Yoga"]),
  ],
  // Gis and uniforms are garments; they sit under Apparel to keep the first
  // column from running twice the length of the rest.
  [
    menuGroup("Apparel", ["Apparel"], PAGE_FOR.apparel),
    menuGroup("Martial Arts", ["Martial Arts"]),
  ],
];

/**
 * No Home item: the logo links home, and the row needed the room. How It
 * Works left the row for the same reason — it is "Our Process" under About
 * Us, so it is one click deeper, not gone. Manufacturing is linked from the
 * footer's Work With Us column.
 */
export const PRIMARY_NAV: PrimaryNavItem[] = [
  { label: "Products", href: "/products", children: PRODUCT_LINKS, menu: "mega" },
  // Named as the homepage audience card names this buyer.
  { label: "Gyms & Academies", href: "/for-clubs" },
  { label: "Private Label", href: "/private-label" },
  { label: "Portfolio", href: "/portfolio" },
  {
    label: "About Us",
    href: ABOUT.hub.href,
    children: sectionLinks(ABOUT),
    menu: "list",
    intro:
      "An OEM and private label manufacturer in Sialkot, Pakistan — how we work, what the workshop can do, and how orders ship.",
  },
  {
    label: "Resources",
    href: RESOURCES.hub.href,
    children: sectionLinks(RESOURCES),
    menu: "list",
    intro:
      "Guides for gyms, clubs and brands planning a custom order — sizing, minimums and why we make in Sialkot.",
  },
  { label: CONTACT_PAGE.label, href: CONTACT_PAGE.href },
];

/**
 * Primary header action. §08 keeps one conversion action in the header.
 *
 * It carries the mockup intent because it is a mockup CTA: without it, every
 * lead that came through the header, the drawer or the sticky bar was recorded
 * as a plain quote, which is the wrong answer to "where do mockup requests come
 * from?" (§14 lead source).
 */
export const HEADER_CTA = {
  label: CTA.navQuote,
  href: "/quote?intent=mockup",
} as const;

/**
 * Contact details are unconfirmed placeholders on a working brand (§03). The
 * PR 13 launch checklist verifies them before anything goes live; no phone
 * number is published until there is one to publish (non-negotiable #5).
 */
export const CONTACT = {
  email: "hello@sparwright.com",
  location: "Sialkot, Pakistan",
} as const;

/**
 * §14 lists WhatsApp as the secondary contact, and §15 requires it not to
 * compete with the primary CTA — so it lives in the footer, not as a floating
 * launcher. The number is not invented: set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits
 * only, with country code) and the link appears; leave it unset and it does not.
 */
export function whatsappHref(): string | null {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(
    /[^0-9]/g,
    "",
  );
  return number ? `https://wa.me/${number}` : null;
}

export type FooterColumn = { heading: string; links: NavLink[] };

/**
 * "For Clubs" and "Private Label" used to sit under Manufacturing, which is
 * not what they are: they are the two buyer pathways, so they get a column of
 * their own. Manufacturing keeps the pages about how the work is done.
 *
 * The mockup link carries `?intent=mockup` like every other mockup CTA; without
 * it, footer mockup requests were recorded as plain quotes (§14 lead source).
 */
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
    heading: "Work With Us",
    links: [
      { label: "For Clubs & Gyms", href: "/for-clubs" },
      { label: "Private Label", href: "/private-label" },
      { label: "Manufacturing & Quality", href: "/manufacturing" },
      { label: CTA.howItWorks, href: "/how-it-works" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: CTA.mockup, href: "/quote?intent=mockup" },
      { label: CTA.quote, href: "/quote" },
      { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    ],
  },
];

export type SocialNetwork =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "youtube"
  | "linkedin";

export type SocialLink = {
  network: SocialNetwork;
  label: string;
  /** Empty until the account exists. */
  href: string;
};

/**
 * PLACEHOLDERS — none of these accounts exists yet. Each `href` is empty and
 * the footer renders it as a dummy link; paste the profile URL in when the
 * account is created. The PR 13 launch checklist should not pass with any left
 * empty: a social icon that goes nowhere reads as an abandoned brand. Once real,
 * these URLs also belong in the Organization `sameAs` structured data.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  { network: "instagram", label: "Instagram", href: "" },
  { network: "facebook", label: "Facebook", href: "" },
  { network: "tiktok", label: "TikTok", href: "" },
  { network: "youtube", label: "YouTube", href: "" },
  { network: "linkedin", label: "LinkedIn", href: "" },
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
