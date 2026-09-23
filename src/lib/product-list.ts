/**
 * Product list — the full catalogue, by category.
 *
 * Distinct from `collections.ts`, which is the five marketing groupings shown
 * on the homepage, and from `products.ts`, which is the two §11 product pages
 * that actually exist as routes. This is the flat catalogue underneath both:
 * what gets made, and under which heading.
 *
 * Compiled from the product range of an established maker in the same segment,
 * on the brief that Sparwright makes the same set. Two kinds of entry in that
 * source were deliberately left out:
 *
 * Sanctioning-body approvals — IBA, IMMAF, BRAVE CF, WAKO, BBBofC, BIBA,
 * FIGMMA, IPL, SMMAF, USPA, GPC, WPC, EMMAA, NEVADA, NYAC, USA Boxing. These
 * are certifications, not products, and listing them would assert approvals
 * nobody here holds (#5, #6).
 *
 * Named brand series — MARK, AURA+, KARA, NOIR, NERO, HARRIER, EGO. Those are
 * another company's product lines.
 *
 * NEEDS CONFIRMATION before any of this reaches a page. Everything below is
 * cut-and-sew, leather or textile work except the entries marked `moulded`,
 * which are injection-moulded, rubber or foam goods — mats, blocks, balls,
 * kettlebells, rollers, boards, bands. Those sit outside the competency the
 * rest of this site describes, and are flagged rather than dropped so the call
 * stays with the business.
 */

export type ProductCategory =
  | "Boxing"
  | "MMA"
  | "Martial Arts"
  | "Training Equipment"
  | "Protective Gear"
  | "Strength and Lifting"
  | "Fitness Accessories"
  | "Apparel"
  | "Yoga"
  | "Kids"
  | "Bags";

export type CatalogueProduct = {
  name: string;
  category: ProductCategory;
  /**
   * True where the product is injection-moulded, rubber or foam rather than
   * cut-and-sew, leather or textile. Flagged for confirmation: it is a
   * different manufacturing competency from everything else here.
   */
  moulded?: true;
};

export const PRODUCT_LIST: CatalogueProduct[] = [
  /* -- Boxing ---------------------------------------------------------- */
  { name: "Competition Gloves", category: "Boxing" },
  { name: "Sparring Gloves", category: "Boxing" },
  { name: "Training Gloves", category: "Boxing" },
  { name: "Bag Gloves", category: "Boxing" },
  { name: "Boxing Glove and Pad Sets", category: "Boxing" },

  /* -- MMA ------------------------------------------------------------- */
  { name: "MMA Sparring Gloves", category: "MMA" },
  { name: "MMA Training Gloves", category: "MMA" },
  { name: "Grappling Gloves", category: "MMA" },

  /* -- Martial arts uniforms ------------------------------------------- */
  { name: "BJJ Gi", category: "Martial Arts" },
  { name: "Karate Uniforms", category: "Martial Arts" },

  /* -- Training equipment ---------------------------------------------- */
  { name: "Training Punching Bags", category: "Training Equipment" },
  { name: "Freestanding Punch Bags", category: "Training Equipment" },
  { name: "Angle and Uppercut Bags", category: "Training Equipment" },
  { name: "Double End Bags", category: "Training Equipment" },
  { name: "Speed Bags", category: "Training Equipment" },
  { name: "Speed Bag Platforms", category: "Training Equipment" },
  { name: "Punching Bag and Mitt Sets", category: "Training Equipment" },
  { name: "Focus Pads", category: "Training Equipment" },
  { name: "Focus Mitts", category: "Training Equipment" },
  { name: "Paddle Mitts", category: "Training Equipment" },
  { name: "Training Sticks", category: "Training Equipment" },
  { name: "Kicking Shields", category: "Training Equipment" },
  { name: "Thai Pads", category: "Training Equipment" },

  /* -- Protective gear, including supports and braces -------------------- */
  { name: "Head Guards", category: "Protective Gear" },
  { name: "Mouth Guards", category: "Protective Gear" },
  { name: "Chest Guards", category: "Protective Gear" },
  { name: "Body Protectors", category: "Protective Gear" },
  { name: "Groin Protectors", category: "Protective Gear" },
  { name: "Shin Guards", category: "Protective Gear" },
  { name: "Hand Wraps", category: "Protective Gear" },
  { name: "Inner Gloves", category: "Protective Gear" },
  { name: "Knee Wraps", category: "Protective Gear" },
  { name: "Elbow Supports", category: "Protective Gear" },
  { name: "Back Supports", category: "Protective Gear" },
  { name: "Wrist Supports", category: "Protective Gear" },
  { name: "Knee Supports", category: "Protective Gear" },
  { name: "Ankle Supports", category: "Protective Gear" },

  /* -- Strength and lifting -------------------------------------------- */
  { name: "Weightlifting Gloves", category: "Strength and Lifting" },
  { name: "Leather Lifting Belts", category: "Strength and Lifting" },
  { name: "Training Belts", category: "Strength and Lifting" },
  { name: "Powerlifting Belts", category: "Strength and Lifting" },
  { name: "Dipping Belts", category: "Strength and Lifting" },
  { name: "Lifting Grips", category: "Strength and Lifting" },
  { name: "Lifting Straps", category: "Strength and Lifting" },
  { name: "Arm Blasters", category: "Strength and Lifting" },
  { name: "Ab Straps", category: "Strength and Lifting" },
  { name: "Triceps Ropes", category: "Strength and Lifting" },
  { name: "Head Harnesses", category: "Strength and Lifting" },

  /* -- Fitness accessories ---------------------------------------------- */
  { name: "Jump Ropes", category: "Fitness Accessories" },
  { name: "Fitness Sandbags", category: "Fitness Accessories" },
  { name: "Leg Stretchers", category: "Fitness Accessories" },
  { name: "Kettlebells", category: "Fitness Accessories", moulded: true },
  { name: "Ab Rollers", category: "Fitness Accessories", moulded: true },
  { name: "Aerobic Steps", category: "Fitness Accessories", moulded: true },
  { name: "Balance Boards", category: "Fitness Accessories", moulded: true },
  { name: "Resistance Bands", category: "Fitness Accessories", moulded: true },
  { name: "Resistance Tubes", category: "Fitness Accessories", moulded: true },

  /* -- Apparel ----------------------------------------------------------- */
  { name: "T-Shirts", category: "Apparel" },
  { name: "Vests", category: "Apparel" },
  { name: "Trousers", category: "Apparel" },
  { name: "Sweatshirts", category: "Apparel" },
  { name: "Boxing Trunks", category: "Apparel" },
  { name: "MMA Shorts", category: "Apparel" },
  { name: "Compression Tops", category: "Apparel" },
  { name: "Compression Shorts", category: "Apparel" },
  { name: "Compression Pants", category: "Apparel" },
  { name: "Sauna Suits", category: "Apparel" },
  { name: "Sauna Vests", category: "Apparel" },
  { name: "Sauna T-Shirts", category: "Apparel" },
  { name: "Sauna Shorts", category: "Apparel" },
  { name: "Sauna Leggings", category: "Apparel" },

  /* -- Yoga -------------------------------------------------------------- */
  { name: "Yoga Straps", category: "Yoga" },
  { name: "Cork Yoga Mats", category: "Yoga", moulded: true },
  { name: "PU Yoga Mats", category: "Yoga", moulded: true },
  { name: "TPE Yoga Mats", category: "Yoga", moulded: true },
  { name: "PVC Yoga Mats", category: "Yoga", moulded: true },
  { name: "Cork Yoga Blocks", category: "Yoga", moulded: true },
  { name: "EVA Foam Blocks", category: "Yoga", moulded: true },
  { name: "Gym Balls", category: "Yoga", moulded: true },
  { name: "Balance Trainers", category: "Yoga", moulded: true },

  /* -- Kids -------------------------------------------------------------- */
  { name: "Kids Boxing Gloves", category: "Kids" },
  { name: "Kids MMA Gloves", category: "Kids" },
  { name: "Kids Grappling Gloves", category: "Kids" },
  { name: "Kids Head Guards", category: "Kids" },
  { name: "Kids Punch Bags", category: "Kids" },
  { name: "Kids Boxing Sets", category: "Kids" },
  { name: "Kids Protective Gear", category: "Kids" },

  /* -- Bags -------------------------------------------------------------- */
  { name: "Equipment Bags", category: "Bags" },
  { name: "Gym Bags", category: "Bags" },
];

/** Every category, in the order they are declared above. */
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Boxing",
  "MMA",
  "Martial Arts",
  "Training Equipment",
  "Protective Gear",
  "Strength and Lifting",
  "Fitness Accessories",
  "Apparel",
  "Yoga",
  "Kids",
  "Bags",
];

/** The products under one category, in catalogue order. */
export function productsIn(category: ProductCategory): CatalogueProduct[] {
  return PRODUCT_LIST.filter((product) => product.category === category);
}
