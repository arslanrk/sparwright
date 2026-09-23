import type { StaticImageData } from "next/image";
import boxingAthlete from "../../public/images/boxing-athlete.jpg";
import clubTeamKit from "../../public/images/club-team-kit.jpg";
import gymWear from "../../public/images/gym-wear.jpg";
import mmaFighter from "../../public/images/mma-fighter.jpg";
import strengthLifting from "../../public/images/strength-and-lifting.jpg";

/**
 * Collections — Design System §08 product choices, §11 Information
 * architecture, §09 Imagery.
 *
 * `products.ts` has two entries because §11 launches two product *pages* and
 * non-negotiable #7 rules out spinning that into a dozen thin ones. This file
 * is the range, not the routing: what a cold buyer needs to see before they can
 * tell whether we make their thing.
 *
 * It replaces the flat seven-product list. Seven named products answered "do
 * you make my thing" well but undersold a catalogue that is wider than seven,
 * and it had nowhere to put belts, straps, lifting gloves or gym wear.
 *
 * One axis, and only one. Each collection is a line of products for a buyer
 * type — a boxing gym, an MMA gym, a strength brand, a fitness label, a club
 * ordering team kit. The tempting alternative mixed contexts of use (Boxing,
 * MMA, Training) with a product type (Apparel), which left five of the seven
 * original products with two plausible homes each: fight shorts are MMA *and*
 * apparel, focus mitts are boxing *and* training. A buyer who cannot predict
 * the bucket clicks the wrong one and concludes we do not make it.
 *
 * "Training" and "Fitness" are deliberately absent. Against the real catalogue
 * neither holds anything the other five do not, and an empty bucket rebuilds
 * the overlap this structure exists to remove.
 *
 * `products` is not decoration. A slide that says only "Boxing" throws away the
 * terms buyers actually search and the specifics that answer their question, so
 * every collection names what is in it.
 *
 * The same honesty rules apply as in `products.ts`. Every line describes a
 * decision the buyer makes and when it gets fixed — none of it claims stock, a
 * material we have not confirmed, an MOQ or a lead time (#5, #6).
 */

export type Collection = {
  /** Collection name. The slide heading and the index label. */
  name: string;
  /** Who the line is made for — the eyebrow above the name. */
  audience: string;
  /**
   * The products in this collection, in the buyer's words. These carry the
   * search terms a collection name alone would throw away.
   *
   * Optional only because a line can be confirmed before its individual
   * products are. Leaving it off is honest; filling it with plausible guesses
   * is the thing #5 and #6 exist to prevent.
   */
  products?: string[];
  /** Where the slide's action goes. */
  href: string;
  /**
   * §08 text-link rule: "Visible arrow or underline, no ambiguous label", with
   * "Explore Custom Gloves" as the worked example. Named per collection so
   * seven slides no longer point at two pages under one anchor.
   */
  linkLabel: string;
  /** §09 photograph this slide is waiting on, 3:4 portrait. */
  shot: string;
  /**
   * The photograph itself, once it exists. A collection without one keeps
   * showing the `shot` it is waiting for, which is what makes the gap visible.
   *
   * `src` and `alt` travel together so a photograph cannot be added without an
   * accessible description. §12's pattern is to describe the product, not the
   * file — `shot` is the brief written for the photographer, not alt text.
   */
  photo?: { src: StaticImageData; alt: string };
  /** One paragraph: what the line is and what the buyer decides. */
  styleProfile: string;
};

const GLOVES = "/products/custom-boxing-gloves";
const APPAREL = "/products/fightwear-club-apparel";
/**
 * Strength has no product page yet — §11 launched two, and neither covers it.
 * Pointing it at a page about boxing gloves would be a worse answer than
 * admitting the page does not exist, so it goes to the brief instead, with the
 * line already named (`quotePrefill`), and the label says so. Gym wear is
 * apparel, and goes where the mega menu sends apparel.
 */
const LIFTING_BRIEF = `/quote?product=${encodeURIComponent("Strength and Lifting")}`;

/**
 * Product lists follow the mega menu's catalogue (`product-list.ts`) and use
 * its names, so the range and the menu describe one catalogue in one
 * vocabulary. Where a line is a family rather than a single item — "Boxing
 * Gloves" for the four glove types — the family name is used. That catalogue
 * is still marked for confirmation; everything listed here inherits that.
 */
export const COLLECTIONS: Collection[] = [
  {
    name: "Boxing",
    audience: "For boxing gyms and clubs",
    products: [
      "Boxing Gloves",
      "Focus Pads and Mitts",
      "Punching Bags",
      "Head Guards",
      "Hand Wraps",
    ],
    href: GLOVES,
    linkLabel: "Explore Custom Boxing Gear",
    shot: "Full glove front",
    photo: {
      src: boxingAthlete,
      alt: "A boxer in a gym holding a guard, wearing custom boxing gloves in matte black with a red crackle pattern across the shell.",
    },
    styleProfile:
      "Gloves and pad work for boxing gyms, built to a padding profile chosen for how the session is actually used. Closure, shell and branding are fixed on the sample you approve before anything goes to bulk.",
  },
  {
    name: "MMA",
    audience: "For MMA gyms and fightwear brands",
    products: [
      "MMA Gloves",
      "Grappling Gloves",
      "Shin Guards",
      "MMA Shorts",
      "Rashguards",
    ],
    href: APPAREL,
    linkLabel: "Explore Custom MMA Gear",
    shot: "MMA gloves, front and palm",
    photo: {
      src: mmaFighter,
      alt: "An MMA fighter throwing a jab inside a cage, wearing black open-palm MMA gloves with red wrist straps, a black long-sleeve rashguard with red seams, and black and maroon fight shorts.",
    },
    styleProfile:
      "Open-palm gloves and the fightwear worn with them, specified around fit, panel layout and closure, then held to the sample you sign off.",
  },
  {
    name: "Strength and Lifting",
    audience: "For strength gyms and lifting brands",
    products: [
      "Lifting Belts",
      "Lifting Straps",
      "Weightlifting Gloves",
      "Lifting Grips",
      "Dipping Belts",
    ],
    href: LIFTING_BRIEF,
    linkLabel: "Start a Lifting Gear Brief",
    shot: "Lifting belt and straps",
    photo: {
      src: strengthLifting,
      alt: "A lifter chalking his hands over a chalk bowl between barbell racks, wearing a black leather double-prong lifting belt with red stitching and black wrist wraps.",
    },
    styleProfile:
      "Lifting hardware specified around width, fit and closure, with your branding applied where it has to survive the wear these products take.",
  },
  {
    name: "Gym Wear",
    audience: "For fitness brands and studios",
    products: [
      "T-Shirts and Vests",
      "Compression Wear",
      "Trousers and Sweatshirts",
      "Sauna Suits",
    ],
    href: APPAREL,
    linkLabel: "Explore Custom Gym Wear",
    shot: "Gym wear flat lay",
    photo: {
      src: gymWear,
      alt: "An athlete standing in a gym in coordinated training wear: a fitted black compression T-shirt with red seam lines, black tapered joggers, and a charcoal zip sweatshirt tied at the waist, with a jump rope at her feet.",
    },
    styleProfile:
      "Training apparel specified by fabric weight, fit and finish, decorated to your artwork and carried consistently across the range.",
  },
  {
    name: "Club and Team Kit",
    audience: "For clubs ordering across their members",
    products: [
      "Club T-Shirts",
      "Hoodies and Tracksuits",
      "Kit Bags",
    ],
    href: APPAREL,
    linkLabel: "Explore Custom Club Apparel",
    shot: "Club apparel flat lay",
    photo: {
      src: clubTeamKit,
      alt: "Three members of one club standing together in a gym in matching black hoodies and T-shirts, each with the same red shield on the chest, one carrying a black kit bag with the same shield.",
    },
    styleProfile:
      "Club kit ordered across member sizes, with one colour reference and one logo placement carried through the whole order, so the last piece matches the first.",
  },
];
