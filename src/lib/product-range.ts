/**
 * Product range — Design System §08 product choices, §11 Information
 * architecture, §09 Imagery.
 *
 * The catalogue in `products.ts` has two entries because §11 launches two
 * product *pages* and non-negotiable #7 rules out spinning that into a dozen
 * thin ones. But the range we actually make is wider than two, and a buyer
 * arriving cold needs to see it before they can tell whether we make their
 * thing.
 *
 * So this is the range, not the routing: the seven §08 quote-form product
 * choices, each pointing at whichever of the two pages covers it. Adding a
 * product here costs nothing and creates no new page.
 *
 * The same honesty rules apply as in `products.ts`. Every line below describes
 * a decision the buyer makes and when it gets fixed — none of it claims stock,
 * a material we have not confirmed, an MOQ or a lead time (#5, #6).
 */

export type RangeItem = {
  /** §08 product choice, verbatim. */
  name: string;
  /** Grouping label above the name in the slider. */
  family: string;
  /** The §11 product page that covers this item. */
  href: string;
  /** §09 photograph this slide is waiting on, 3:4 portrait. */
  shot: string;
  /** One paragraph: what it is and what gets decided. */
  styleProfile: string;
  /**
   * The four §09 specification tags — "MODEL / USE / SHELL / BRANDING". Model
   * is the product name itself, so these are the other three plus the
   * construction line that decides most of the rest.
   */
  use: string;
  fabric: string;
  construction: string;
  branding: string;
};

const GLOVES = "/products/custom-boxing-gloves";
const APPAREL = "/products/fightwear-club-apparel";

export const PRODUCT_RANGE: RangeItem[] = [
  {
    name: "Boxing Gloves",
    family: "Training essentials",
    href: GLOVES,
    shot: "Full glove front",
    styleProfile:
      "Training, sparring and bag gloves built to a padding profile chosen for the session, with the closure and branding fixed before sampling.",
    use: "Training, sparring and bag work",
    fabric: "Synthetic or leather shell",
    construction: "Padding profile per intended use",
    branding: "Print, patch or embroidery",
  },
  {
    name: "MMA Gloves",
    family: "Training essentials",
    href: GLOVES,
    shot: "MMA gloves, front and palm",
    styleProfile:
      "Open-palm gloves specified around padding, hand opening and closure, then fixed by the sample you approve.",
    use: "Grappling and striking",
    fabric: "Synthetic or leather shell",
    construction: "Open palm and secured closure",
    branding: "Print, patch or embroidery",
  },
  {
    name: "Focus Mitts and Pads",
    family: "Coaching equipment",
    href: GLOVES,
    shot: "Focus mitts and pads",
    styleProfile:
      "Coaching mitts and pads specified for repeated pad work, with padding density and strap arrangement agreed before sampling.",
    use: "Coaching and pad rounds",
    fabric: "Synthetic or leather shell",
    construction: "Padding density and strap fit",
    branding: "Print or embroidery",
  },
  {
    name: "Fight Shorts",
    family: "Fightwear",
    href: APPAREL,
    shot: "Fight shorts",
    styleProfile:
      "Shorts built around panel layout, waistband and length, with your colours and branding applied to the approved specification.",
    use: "Training and competition",
    fabric: "Woven shell or stretch panel",
    construction: "Panel layout and waistband",
    branding: "Print, sublimation or embroidery",
  },
  {
    name: "Rashguards",
    family: "Fightwear",
    href: APPAREL,
    shot: "Rashguard",
    styleProfile:
      "Rashguards specified by fabric weight, sleeve length and panel design, decorated to your artwork across the panels.",
    use: "Grappling and base layer",
    fabric: "Performance knit",
    construction: "Panel design and sleeve length",
    branding: "Sublimation or print",
  },
  {
    name: "Club T-Shirts",
    family: "Club apparel",
    href: APPAREL,
    shot: "Club apparel flat lay",
    styleProfile:
      "Club tees ordered across member sizes, with one colour reference and one logo placement carried through the whole order.",
    use: "Club and member kit",
    fabric: "Cotton or blended jersey",
    construction: "Fit and neck finish",
    branding: "Print or embroidery",
  },
  {
    name: "Hoodies and Tracksuits",
    family: "Club apparel",
    href: APPAREL,
    shot: "Club hoodie and tracksuit",
    styleProfile:
      "Heavier club kit specified by fabric weight, fit and trim, with labels and branding agreed alongside the rest of the order.",
    use: "Travel and warm-up kit",
    fabric: "Fleece or brushed knit",
    construction: "Fit, cuffs and trim",
    branding: "Embroidery, print or applied badge",
  },
];
