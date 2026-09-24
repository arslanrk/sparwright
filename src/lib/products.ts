import type { StaticImageData } from "next/image";
import { CTA } from "@/components/foundation/cta";
import boxingAthlete from "../../public/images/boxing-athlete.jpg";
import boxingGloves from "../../public/images/boxing-gloves.jpg";
import clubTeamKit from "../../public/images/club-team-kit.jpg";
import explodedGlove from "../../public/images/exploded-boxing-glove.jpg";
import gymWear from "../../public/images/gym-wear.jpg";
import mockupToGlove from "../../public/images/logo-mockup-to-finished-glove.jpg";
import mmaFighter from "../../public/images/mma-fighter.jpg";
import factoryFloor from "../../public/images/boxing-glove-factory-floor.jpg";
import inspectionBench from "../../public/images/quality-testing.jpg";
import strengthLifting from "../../public/images/strength-and-lifting.jpg";

/**
 * Product catalogue — Design System §11 Information architecture and page
 * templates, §09 Imagery, §10 Content design.
 *
 * §11 launched two product pages — Custom Boxing Gloves and Fightwear and
 * Club Apparel. Four category pages followed (MMA, lifting, protective gear,
 * pads and bags), each a full page with its own types, specification and
 * FAQ. Non-negotiable #7 rules out thin pages, so a line earns a route only
 * when it can carry that much; gym wear, for one, stays on the apparel page.
 *
 * Nothing here states an MOQ, a lead time or a certification: non-negotiables
 * #5 and #6. Specification rows say what the buyer decides and when it is
 * confirmed, which is the truth for made-to-order manufacturing, rather than
 * claiming stock we have not verified.
 */

/** A row in a §11 specification table. */
export type SpecRow = { label: string; value: string };

/** A photograph, with the §12 description that travels with it. */
export type ProductPhoto = {
  src: StaticImageData;
  alt: string;
  /**
   * "contain" for an image whose own framing matters — a side-by-side that a
   * 4:5 crop would cut in half. Defaults to "cover".
   */
  fit?: "cover" | "contain";
};

/**
 * A gallery slot: the §09 shot it stands for and, once it exists, the
 * photograph. A slot without one still shows the shot it is waiting on.
 */
export type GalleryShot = { shot: string; caption: string; photo?: ProductPhoto };

export type UseCase = { title: string; description: string };

export type ProductFaq = { question: string; answer: string };

/** One type within a product line — a glove built for one job. */
export type ProductType = {
  title: string;
  description: string;
  /** A short spec line, e.g. "Typically 14–16 oz". */
  spec?: string;
};

/** One side of a material comparison. */
export type MaterialOption = {
  name: string;
  /** Who it suits, in a line. */
  bestFor: string;
  points: string[];
};

export type Product = {
  slug: string;
  /** Navigation and card label. */
  name: string;
  /**
   * The product in running text, lower case — "boxing gloves". Section
   * headings are built from it so they carry the search term, not "these".
   */
  noun?: string;
  /** The page's h1, when it should say more than the name. */
  heading?: string;
  /** Search result title and description, when they differ from the page. */
  seo?: { title: string; description: string };
  /** The §08 quote-form product type this page pre-selects. */
  quoteProduct?: string;
  /** The types within the line, and what each is built for. */
  types?: {
    /** Section eyebrow, e.g. "Glove types". */
    eyebrow: string;
    title: string;
    description: string;
    items: ProductType[];
  };
  /** A side-by-side of the materials a buyer chooses between. */
  materialOptions?: {
    /** Section eyebrow, e.g. "Materials". */
    eyebrow: string;
    title: string;
    description: string;
    options: MaterialOption[];
  };
  /** The closing band's heading and line. */
  closing?: { title: string; description: string };
  /** Short uppercase context label on the product card (§08). */
  category: string;
  /** §11 product hero: product category, then what is customizable. */
  summary: string;
  /** §10 formula, three lines at most: use, buyer, customization. */
  cardDescription: string;
  /** §09 shot used on the product card, 4:5. */
  cardShot: string;
  /** The card's photograph, once it exists. */
  cardPhoto?: ProductPhoto;
  /**
   * The card's action label, from the §08 CTA library. Kept on the product so
   * a new page cannot ship with a blank card link — the /products grid used
   * a separate lookup that only ever covered the first two.
   */
  cardAction: string;
  /**
   * Show the exploded-glove customization block in place of the plain
   * customization table. Only for gloves: the photograph is of a glove.
   */
  customizationShowcase?: boolean;
  gallery: GalleryShot[];
  /** Short overview beside the gallery (§11 section 2). */
  overview: string;
  useCases: UseCase[];
  materials: SpecRow[];
  customization: SpecRow[];
  /** §11 section 6 — what happens before bulk production. */
  sampling: string[];
  /** §11 section 7 — checks the team will consistently perform and record. */
  qualityPoints: string[];
  faqs: ProductFaq[];
  /** Slugs of the §11 section 8 related products. */
  related: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "custom-boxing-gloves",
    name: "Custom Boxing Gloves",
    noun: "custom boxing gloves",
    heading: "Custom boxing gloves, made to your specification.",
    seo: {
      title: "Custom Boxing Gloves Manufacturer in Pakistan",
      description:
        "Custom boxing gloves made in Sialkot, Pakistan — training, sparring, bag, competition and kids' gloves, 8–16 oz, leather or synthetic, with your logo.",
    },
    quoteProduct: "Boxing Gloves",
    category: "Boxing gloves",
    summary:
      "Training, sparring, bag, competition and kids' gloves from 8 to 16 oz, in genuine leather or synthetic, with your logo, colours and closure.",
    cardDescription:
      "Training, sparring, bag, competition and kids' gloves, 8–16 oz, in leather or synthetic. Choose the padding, colours, closure and logo placement.",
    cardShot: "Full glove front",
    cardAction: CTA.exploreGloves,
    cardPhoto: {
      src: boxingGloves,
      alt: "A pair of matte black custom boxing gloves with a red crackle pattern across the shell and cuff.",
    },
    customizationShowcase: true,
    gallery: [
      {
        shot: "Full glove front",
        caption: "A custom shell print carried across the glove and cuff.",
        photo: {
          src: boxingGloves,
          alt: "A pair of matte black custom boxing gloves with a red crackle pattern across the shell and cuff.",
        },
      },
      {
        shot: "Glove in use",
        caption: "The same glove in training.",
        photo: {
          src: boxingAthlete,
          alt: "A boxer in a gym holding a guard in black custom boxing gloves with a red crackle pattern.",
        },
      },
      {
        shot: "Padding or construction detail",
        caption: "What goes into a glove: cuff, closure, label and padding layers.",
        photo: {
          src: explodedGlove,
          alt: "A black and tan leather boxing glove shown exploded into its cuff patch, lace closure, woven label and padding layers.",
        },
      },
      {
        shot: "Logo application",
        caption: "From your mockup to the finished glove.",
        photo: {
          src: mockupToGlove,
          alt: "A flat mockup of a black and tan glove with a shield emblem beside the finished glove, the emblem embroidered on the cuff.",
          fit: "contain",
        },
      },
    ],
    overview:
      "Every glove is made to a specification you approve. Shell, padding, weight, closure, colourway and branding are decided before sampling, and bulk production is checked against the sample you signed off. Clubs order across member sizes; brands develop their own line under their own label.",
    /*
     * Typical weights are stated as typical — they are the norms buyers search
     * against, not a limit on what we make. Competition gloves carry a note
     * rather than a claim: sanctioned bouts need a governing body's approval,
     * which non-negotiable #5 rules out asserting.
     */
    types: {
      eyebrow: "Glove types",
      title: "Boxing gloves for every kind of session",
      description:
        "The glove type decides the padding, the weight and the closure, so it is the first thing we confirm with you.",
      items: [
        {
          title: "Training gloves",
          description:
            "All-round gloves for club members — bag, pads and light partner work in one pair.",
          spec: "Typically 10–16 oz",
        },
        {
          title: "Sparring gloves",
          description:
            "Softer, more even padding to protect a training partner in controlled sparring.",
          spec: "Typically 14–16 oz",
        },
        {
          title: "Bag gloves",
          description:
            "Denser padding and a firmer wrist for repeated heavy-bag and pad sessions.",
          spec: "Typically 10–14 oz",
        },
        {
          title: "Competition gloves",
          description:
            "Lighter, compact gloves for bouts, usually lace-up. Check your governing body's rules for sanctioned events.",
          spec: "Typically 8–10 oz",
        },
        {
          title: "Kids' boxing gloves",
          description:
            "Smaller sizes and lighter padding for junior members, in the same colours as the club's adult kit.",
          spec: "Sized by age and hand",
        },
      ],
    },
    materialOptions: {
      eyebrow: "Materials",
      title: "Genuine leather or synthetic shell",
      description:
        "Both are made to the same construction and checked against the same sample. The choice is about feel, lifespan and budget.",
      options: [
        {
          name: "Genuine leather",
          bestFor: "Premium lines, heavy daily use and long-life club gloves.",
          points: [
            "Moulds to the hand and softens with use",
            "The most durable choice for repeated heavy-bag work",
            "Breathes better than most synthetics",
            "Higher cost per pair",
          ],
        },
        {
          name: "Synthetic (PU) leather",
          bestFor: "Member gloves, starter ranges and vivid colourways.",
          points: [
            "Lower cost per pair at the same construction",
            "A consistent surface for print and bright colours",
            "Wipes clean easily",
            "No animal leather",
          ],
        },
      ],
    },
    useCases: [
      {
        title: "Club training",
        description:
          "General training gloves for members, ordered across sizes in club colours.",
      },
      {
        title: "Sparring",
        description:
          "Heavier padding profiles for controlled partner work in the gym.",
      },
      {
        title: "Bag and pad work",
        description:
          "Gloves specified for repeated bag and pad sessions rather than sparring.",
      },
      {
        title: "Private label retail",
        description:
          "Brand-owned gloves with your labels, packaging and retained specification for reorders.",
      },
    ],
    materials: [
      {
        label: "Shell",
        value:
          "Genuine leather or synthetic (PU) leather, confirmed against your specification before sampling.",
      },
      {
        label: "Weight",
        value: "8 to 16 oz, set by the glove type and confirmed on the sample.",
      },
      {
        label: "Padding",
        value:
          "Padding profile chosen for the intended use — training, sparring or bag work.",
      },
      {
        label: "Lining",
        value: "Inner lining and hand compartment agreed at sample stage.",
      },
      {
        label: "Closure",
        value: "Hook-and-loop or lace-up, specified per order.",
      },
      {
        label: "Sizes",
        value:
          "Adult and kids' sizes, with the split confirmed against your quantity before bulk.",
      },
    ],
    customization: [
      {
        label: "Branding",
        value:
          "Logo on the cuff, back of the hand or palm, by print, patch or embroidery where suitable.",
      },
      {
        label: "Colour",
        value: "Club or brand colour combinations against agreed references.",
      },
      {
        label: "Construction",
        value: "Padding, closure and stitching specified for the intended use.",
      },
      {
        label: "Packaging",
        value: "Labels, bags, boxes, inserts and export cartons.",
      },
    ],
    sampling: [
      "Send your product requirements, quantity, colours and logo artwork.",
      "We confirm what is practical, raise anything that needs a decision, and align the specification with you.",
      "A sample is produced and photographed for your review.",
      "You approve the sample, or ask for a revision, before any bulk production begins.",
    ],
    qualityPoints: [
      "Dimensions and weight measured against the approved sample.",
      "Shell, padding, closure and stitching verified as agreed.",
      "Logo placement, method and colour reference checked.",
      "Wrist, size and care labels checked where applicable.",
      "Count, assortment, inner packing and carton details recorded.",
      "Inspection record retained before dispatch.",
    ],
    /*
     * Glove-specific, not the site-wide set: the homepage already answers the
     * general questions, and repeating them here word for word is duplicate
     * content. MOQ and lead time still commit to no number (#6).
     */
    faqs: [
      {
        question: "What boxing glove weights do you make?",
        answer:
          "From 8 to 16 oz. The weight follows the glove type — sparring gloves are usually 14–16 oz and competition gloves 8–10 oz — and is confirmed on the sample before bulk production.",
      },
      {
        question: "Leather or synthetic — which should we choose?",
        answer:
          "Genuine leather moulds to the hand and lasts longest under heavy daily use. Synthetic (PU) leather costs less per pair and takes bright colours and print well. Both are built to the same construction and checked against the same approved sample.",
      },
      {
        question: "Do you make kids' boxing gloves?",
        answer:
          "Yes. Kids' gloves are made to order like the adult range, in smaller sizes with lighter padding, and can match your club's adult kit.",
      },
      {
        question: "Hook-and-loop or lace-up closure?",
        answer:
          "Hook-and-loop is quicker to put on and suits training and club use. Lace-up gives a tighter, more even fit at the wrist and is usually chosen for competition. Both are available and specified per order.",
      },
      {
        question: "Where can our logo go on a boxing glove?",
        answer:
          "On the cuff, the back of the hand or the palm, by print, embroidery or patch depending on the shell and the design. Placement is confirmed on your mockup before sampling.",
      },
      {
        question: "What is the minimum order for custom boxing gloves?",
        answer:
          "It depends on the shell, the branding method and how many colourways you want. Send an approximate quantity and we confirm the minimum for your specification before you commit to anything.",
      },
      {
        question: "Do you make a sample glove before bulk production?",
        answer:
          "Yes — a mockup first, then a physical sample glove. Bulk production starts only once you have approved it, and the finished order is checked against it.",
      },
      {
        question: "How long does a custom glove order take?",
        answer:
          "It depends on the quantity, the shell and the branding. Dates for sampling and bulk production are confirmed in writing with your quote.",
      },
      {
        question: "Can we reorder the same gloves later?",
        answer:
          "Yes. The approved specification, artwork and sample record stay on file, so a reorder matches the first run rather than being developed again.",
      },
    ],
    closing: {
      title: "Tell us about your gloves.",
      description:
        "Send the glove type, weight, shell, colours, logo and a rough quantity. A person replies with anything left to confirm.",
    },
    related: [
      "custom-mma-gloves",
      "custom-protective-gear",
      "custom-pads-bags-mitts",
      "fightwear-club-apparel",
    ],
  },
  {
    slug: "fightwear-club-apparel",
    name: "Fightwear and Club Apparel",
    noun: "custom fightwear and club apparel",
    heading: "Custom fightwear and club apparel, made to your specification.",
    seo: {
      title: "Custom Fightwear and Club Apparel Manufacturer",
      description:
        "Custom fight shorts, rashguards, compression wear, club T-shirts, hoodies and tracksuits made in Sialkot, Pakistan — in your colours, sizing and branding.",
    },
    category: "Fightwear and apparel",
    summary:
      "Fight shorts, rashguards, compression wear, club T-shirts, hoodies and tracksuits, made with your fabrics, colours, sizing and branding.",
    cardDescription:
      "Fight shorts, rashguards, compression wear, tees, hoodies and tracksuits for clubs and brands. Specify fabric, panels, colours, sizing and branding.",
    cardShot: "Coordinated product collection",
    cardAction: CTA.exploreFightwear,
    cardPhoto: {
      src: clubTeamKit,
      alt: "Three members of one club in matching black hoodies and T-shirts, each with the same red shield on the chest.",
    },
    gallery: [
      {
        shot: "Rashguard",
        caption: "A rashguard and fight shorts in matching colours.",
        photo: {
          src: mmaFighter,
          alt: "A fighter in a black long-sleeve rashguard with red seams and black and maroon fight shorts.",
        },
      },
      {
        shot: "Club apparel flat lay",
        caption: "Club hoodies and T-shirts under one emblem.",
        photo: {
          src: clubTeamKit,
          alt: "Three members of one club in matching black hoodies and T-shirts, each with the same red shield on the chest.",
        },
      },
      {
        shot: "Training wear",
        caption: "Training wear: a compression top and tapered joggers.",
        photo: {
          src: gymWear,
          alt: "An athlete in a fitted black compression T-shirt with red seam lines and black tapered joggers.",
        },
      },
    ],
    overview:
      "Everything a club or brand wears, specified together: fight shorts and rashguards for the mat and ring, compression and training wear for the gym, and T-shirts, hoodies and tracksuits for members. One colour reference and one logo treatment carry across every garment, and the size spread is confirmed before bulk.",
    /*
     * The garments the Products menu sends here, grouped as a buyer orders
     * them. The spec line names the usual branding method rather than a fabric:
     * fabrics are confirmed per garment, and a published fabric would be a
     * commitment the catalogue has not made.
     */
    types: {
      eyebrow: "Garment types",
      title: "Fightwear and apparel for the whole kit",
      description:
        "Each garment is specified on its own — fabric, fit, panels and branding — then matched to the rest of the order.",
      items: [
        {
          title: "Fight shorts and boxing trunks",
          description:
            "MMA shorts and boxing trunks with split legs, side panels and a secure waistband, in club or brand colours.",
          spec: "Usually sublimated",
        },
        {
          title: "Rashguards",
          description:
            "Long or short sleeve, cut close for grappling, with flatlock seams and all-over designs.",
          spec: "Usually sublimated",
        },
        {
          title: "Compression wear",
          description:
            "Compression tops, shorts and pants for training and fight camps, matched to the rest of the kit.",
          spec: "Sublimated or printed",
        },
        {
          title: "Club T-shirts and vests",
          description:
            "Training and member tees and vests, ordered across sizes with the club logo on each.",
          spec: "Printed or embroidered",
        },
        {
          title: "Hoodies, sweatshirts and tracksuits",
          description:
            "Warm-up and travel wear for members and teams — hoodies, sweatshirts, trousers and full tracksuits.",
          spec: "Embroidered or printed",
        },
      ],
    },
    materialOptions: {
      eyebrow: "Branding methods",
      title: "Sublimation, or print and embroidery",
      description:
        "The branding method follows the garment and the design. We confirm which suits each piece before sampling.",
      options: [
        {
          name: "Sublimation",
          bestFor: "Rashguards, fight shorts and all-over or full-colour designs.",
          points: [
            "Dye goes into the fabric, so there is nothing to crack or peel",
            "Unlimited colours and edge-to-edge designs",
            "Keeps the fabric's stretch and feel",
            "Works on polyester-based fabrics",
          ],
        },
        {
          name: "Print and embroidery",
          bestFor: "Cotton tees, hoodies, tracksuits and a crisp chest logo.",
          points: [
            "Works on cotton and blended fabrics",
            "Embroidery gives a raised, premium logo",
            "Print suits bold one- or two-colour artwork",
            "Easy to repeat the same logo across every garment",
          ],
        },
      ],
    },
    useCases: [
      {
        title: "Coordinated club kit",
        description:
          "Fightwear and apparel built around one club identity rather than ordered piecemeal.",
      },
      {
        title: "Team and event apparel",
        description:
          "Shorts and rashguards specified for a squad, competition or camp.",
      },
      {
        title: "Private label ranges",
        description:
          "Brand-owned apparel with your labels, care information and packaging.",
      },
      {
        title: "Member merchandise",
        description:
          "Tees, hoodies and tracksuits ordered across member sizes.",
      },
    ],
    materials: [
      {
        label: "Fabric",
        value:
          "Fabric weight and composition confirmed per garment before sampling.",
      },
      {
        label: "Panels",
        value: "Panel layout and seam placement agreed at specification stage.",
      },
      {
        label: "Construction",
        value:
          "Seam type, reinforcement and waistband or cuff detail verified against the sample.",
      },
      {
        label: "Branding method",
        value:
          "Sublimation, print, embroidery or an applied badge, chosen per garment.",
      },
      {
        label: "Labels",
        value: "Neck, size and care labels specified with your brand details.",
      },
      {
        label: "Sizes",
        value:
          "Size chart and quantity split per size confirmed before production.",
      },
    ],
    customization: [
      {
        label: "Branding",
        value:
          "Logo placement and method per garment, confirmed against your artwork.",
      },
      {
        label: "Colour",
        value: "Club or brand colour combinations against agreed references.",
      },
      {
        label: "Construction",
        value: "Fabric, panel layout and finish specified per garment.",
      },
      {
        label: "Packaging",
        value: "Polybags, labels, inserts and export cartons.",
      },
    ],
    sampling: [
      "Send the garments you need, your colours, sizing expectations and logo artwork.",
      "We confirm fabrics and branding methods per garment and align the specification with you.",
      "A sample is produced and photographed for your review.",
      "You approve the sample, or ask for a revision, before any bulk production begins.",
    ],
    qualityPoints: [
      "Measurements checked against the approved size chart.",
      "Fabric, panel layout and seam construction verified as agreed.",
      "Logo placement, method and colour reference checked.",
      "Neck, size and care labels checked per garment.",
      "Count, size assortment, inner packing and carton details recorded.",
      "Inspection record retained before dispatch.",
    ],
    /*
     * Apparel-specific, not the site-wide set, for the same reason as the glove
     * page. MOQ and lead time still commit to no number (#6).
     */
    faqs: [
      {
        question: "What fightwear and apparel do you make?",
        answer:
          "Fight shorts and boxing trunks, rashguards, compression tops, shorts and pants, club T-shirts and vests, and hoodies, sweatshirts, trousers and tracksuits — each made to your specification.",
      },
      {
        question: "Sublimation, print or embroidery — which should we use?",
        answer:
          "Sublimation suits rashguards, fight shorts and full-colour designs, because the dye goes into the fabric and cannot crack. Print and embroidery suit cotton tees, hoodies and tracksuits, and embroidery gives a raised logo. We confirm the method for each garment before sampling.",
      },
      {
        question: "Can you match our club colours across different garments?",
        answer:
          "Yes. One colour reference is used across the whole order and checked on the sample, so a sublimated rashguard and an embroidered hoodie read as the same kit.",
      },
      {
        question: "How do sizes work for a club order?",
        answer:
          "We confirm a size chart for each garment and the quantity per size before production, so a club can order across its members in one run.",
      },
      {
        question: "Can we add our own labels and packaging?",
        answer:
          "Yes. Neck, size and care labels carry your brand details, and garments can be polybagged and packed in cartons marked to your instruction.",
      },
      {
        question: "What is the minimum order for custom fightwear?",
        answer:
          "It depends on the garment, the fabric and the branding method. Send the garments and an approximate quantity and we confirm the minimum for your specification before you commit to anything.",
      },
      {
        question: "Do you make a sample before bulk production?",
        answer:
          "Yes — a mockup first, then a physical sample of each garment. Bulk production starts only once you have approved it, and the finished order is checked against it.",
      },
      {
        question: "How long does a custom apparel order take?",
        answer:
          "It depends on the garments, the quantity and the branding. Dates for sampling and bulk production are confirmed in writing with your quote.",
      },
      {
        question: "Can we reorder the same kit later?",
        answer:
          "Yes. The approved specification, artwork, colour references and size chart stay on file, so a reorder matches the first run.",
      },
    ],
    closing: {
      title: "Tell us about your kit.",
      description:
        "Send the garments, colours, logo, size spread and a rough quantity. A person replies with anything left to confirm.",
    },
    related: ["custom-boxing-gloves", "custom-mma-gloves", "custom-lifting-belts"],
  },
  {
    slug: "custom-mma-gloves",
    name: "Custom MMA Gloves and Gear",
    noun: "custom MMA gloves and gear",
    heading: "Custom MMA gloves and gear, made to your specification.",
    seo: {
      title: "Custom MMA Gloves Manufacturer in Pakistan",
      description:
        "Custom MMA fight, sparring and grappling gloves and shin guards made in Sialkot, Pakistan — leather or synthetic, in your colours, with your logo.",
    },
    quoteProduct: "MMA Gloves",
    category: "MMA gear",
    summary:
      "MMA fight, sparring and grappling gloves, shin guards and kids' MMA gloves, in leather or synthetic, with your logo, colours and closure.",
    cardDescription:
      "MMA fight, sparring and grappling gloves and shin guards for MMA gyms and fightwear brands. Choose the padding, shell, colours and logo.",
    cardShot: "MMA gloves, front and palm",
    cardAction: CTA.exploreMMA,
    cardPhoto: {
      src: mmaFighter,
      alt: "An MMA fighter throwing a jab in black open-palm MMA gloves with red wrist straps.",
    },
    gallery: [
      {
        shot: "MMA gloves in use",
        caption: "Open-palm MMA gloves with a matching rashguard.",
        photo: {
          src: mmaFighter,
          alt: "An MMA fighter throwing a jab in black open-palm MMA gloves with red wrist straps and a black rashguard.",
        },
      },
      { shot: "MMA gloves, front and palm", caption: "Front and open palm of a finished MMA glove." },
      { shot: "Shin guards", caption: "Shin and instep guards in club colours." },
    ],
    overview:
      "MMA gloves are made to the specification you approve: padding, shell, finger loops, wrist strap, colourway and branding are decided before sampling, and bulk production is checked against the sample you signed off. Fight shorts and rashguards to match are made on the fightwear side of the same order.",
    /*
     * Weights are the norms buyers search against, stated as typical. Fight
     * gloves carry a governing-body note rather than a claim of approval (#5).
     */
    types: {
      eyebrow: "Glove types",
      title: "MMA gloves for fighting, sparring and grappling",
      description:
        "The glove type decides the padding and the palm, so it is the first thing we confirm with you.",
      items: [
        {
          title: "MMA fight gloves",
          description:
            "Compact open-palm gloves with minimal padding for bouts. Check your governing body's rules for sanctioned events.",
          spec: "Typically 4 oz",
        },
        {
          title: "MMA sparring gloves",
          description:
            "More padding over the knuckles to protect a training partner, with an open palm for grappling.",
          spec: "Typically 6–7 oz",
        },
        {
          title: "Grappling and hybrid gloves",
          description:
            "Light, flexible gloves for bag work, pads and grappling-heavy sessions.",
          spec: "Light padding",
        },
        {
          title: "Shin guards",
          description:
            "Shin and instep guards for kickboxing and MMA training, in sock or strap styles.",
          spec: "Sock or strap",
        },
        {
          title: "Kids' MMA gloves",
          description:
            "Smaller sizes and softer padding for junior members, matched to the club's adult kit.",
          spec: "Sized by age and hand",
        },
      ],
    },
    useCases: [
      {
        title: "Gym training",
        description: "Sparring and grappling gloves for members, across sizes.",
      },
      {
        title: "Fight camps",
        description:
          "Fight and sparring gloves specified together for a squad or camp.",
      },
      {
        title: "Coordinated kit",
        description:
          "Gloves in the same colours as the club's shorts and rashguards.",
      },
      {
        title: "Private label retail",
        description:
          "Brand-owned MMA gloves with your labels, packaging and retained specification.",
      },
    ],
    materials: [
      {
        label: "Shell",
        value:
          "Genuine leather or synthetic (PU) leather, confirmed against your specification before sampling.",
      },
      {
        label: "Padding",
        value:
          "Knuckle padding set by the glove type — fight, sparring or grappling.",
      },
      {
        label: "Palm and fingers",
        value: "Open palm with finger loops, cut and sized on the sample.",
      },
      {
        label: "Closure",
        value: "Hook-and-loop wrist strap, specified per order.",
      },
      {
        label: "Sizes",
        value:
          "Adult and kids' sizes, with the split confirmed against your quantity before bulk.",
      },
    ],
    customization: [
      {
        label: "Branding",
        value:
          "Logo on the back of the hand or wrist strap, by print, patch or embroidery where suitable.",
      },
      {
        label: "Colour",
        value: "Club or brand colour combinations against agreed references.",
      },
      {
        label: "Construction",
        value: "Padding, palm and strap specified for the intended use.",
      },
      {
        label: "Packaging",
        value: "Labels, bags, boxes, inserts and export cartons.",
      },
    ],
    sampling: [
      "Send the gloves you need, your colours, sizes and logo artwork.",
      "We confirm padding, shell and fit, and align the specification with you.",
      "A sample is produced and photographed for your review.",
      "You approve the sample, or ask for a revision, before any bulk production begins.",
    ],
    qualityPoints: [
      "Weight and dimensions measured against the approved sample.",
      "Padding, palm, finger loops and strap verified as agreed.",
      "Logo placement, method and colour reference checked.",
      "Size and care labels checked where applicable.",
      "Count, size assortment and carton details recorded.",
      "Inspection record retained before dispatch.",
    ],
    faqs: [
      {
        question: "What MMA glove weights do you make?",
        answer:
          "Fight gloves are typically 4 oz and sparring gloves 6–7 oz, with grappling gloves lighter still. The weight follows the glove type and is confirmed on the sample before bulk production.",
      },
      {
        question: "What is the difference between MMA fight and sparring gloves?",
        answer:
          "Fight gloves carry minimal padding and a compact open palm for bouts. Sparring gloves add knuckle padding to protect a training partner while keeping the open palm for grappling.",
      },
      {
        question: "Do you make shin guards?",
        answer:
          "Yes — shin and instep guards in sock or strap styles, in the same colours and branding as the rest of your kit.",
      },
      {
        question: "Do you make kids' MMA gloves?",
        answer:
          "Yes. Kids' MMA gloves are made to order in smaller sizes with softer padding, and can match your club's adult kit.",
      },
      {
        question: "What is the minimum order for custom MMA gloves?",
        answer:
          "It depends on the shell, the branding method and the number of colourways. Send an approximate quantity and we confirm the minimum for your specification before you commit to anything.",
      },
      {
        question: "Can we reorder the same MMA gloves later?",
        answer:
          "Yes. The approved specification, artwork and sample record stay on file, so a reorder matches the first run.",
      },
    ],
    closing: {
      title: "Tell us about your MMA gloves.",
      description:
        "Send the glove type, shell, colours, logo, sizes and a rough quantity. A person replies with anything left to confirm.",
    },
    related: [
      "custom-boxing-gloves",
      "fightwear-club-apparel",
      "custom-protective-gear",
    ],
  },
  {
    slug: "custom-lifting-belts",
    name: "Custom Lifting Belts and Gear",
    noun: "custom lifting belts and gear",
    heading: "Custom lifting belts and gear, made to your specification.",
    seo: {
      title: "Custom Lifting Belts Manufacturer in Pakistan",
      description:
        "Custom leather and nylon lifting belts, dipping belts, lifting straps, grips and weightlifting gloves made in Sialkot, Pakistan — with your logo.",
    },
    quoteProduct: "Lifting belts and gear",
    category: "Strength and lifting",
    summary:
      "Leather and nylon lifting belts, dipping belts, lifting straps, grips and weightlifting gloves, made with your branding, colours and fit.",
    cardDescription:
      "Lifting belts, dipping belts, straps, grips and weightlifting gloves for strength gyms and lifting brands. Choose the material, width, buckle and logo.",
    cardShot: "Lifting belt and straps",
    cardAction: CTA.exploreLifting,
    cardPhoto: {
      src: strengthLifting,
      alt: "A lifter chalking his hands, wearing a black leather lifting belt with red stitching and black wrist wraps.",
    },
    gallery: [
      {
        shot: "Lifting belt in use",
        caption: "A leather lifting belt with contrast stitching.",
        photo: {
          src: strengthLifting,
          alt: "A lifter chalking his hands, wearing a black leather double-prong lifting belt with red stitching and black wrist wraps.",
        },
      },
      { shot: "Belt buckle close-up", caption: "Buckle and stitching detail." },
      { shot: "Lifting straps", caption: "Lifting straps with a woven label." },
    ],
    overview:
      "Lifting gear is made to the specification you approve: material, width, thickness, buckle, stitching and branding are decided before sampling, and bulk production is checked against the sample you signed off. Belts, straps, grips and gloves can be specified together so the range carries one identity.",
    types: {
      eyebrow: "Product types",
      title: "Lifting gear for the whole strength range",
      description:
        "What the lift needs decides the material and the fit, so it is the first thing we confirm with you.",
      items: [
        {
          title: "Leather lifting belts",
          description:
            "Stiff, even-width belts for powerlifting and heavy compound lifts, with a prong or lever buckle.",
          spec: "Typically 10 or 13 mm",
        },
        {
          title: "Training belts",
          description:
            "Flexible, tapered belts for general gym training, quick to fasten and adjust.",
          spec: "Leather or nylon",
        },
        {
          title: "Dipping belts",
          description:
            "Belts with a chain for weighted dips and pull-ups.",
          spec: "With chain",
        },
        {
          title: "Lifting straps and grips",
          description:
            "Straps and grips that take load off the hands on pulls and deadlifts.",
          spec: "Cotton, nylon or leather",
        },
        {
          title: "Weightlifting gloves",
          description:
            "Padded-palm gloves for grip and protection, full-finger or fingerless.",
          spec: "Full or half finger",
        },
      ],
    },
    materialOptions: {
      eyebrow: "Belt materials",
      title: "Leather or nylon lifting belt",
      description:
        "Both are made to your branding and checked against the same approved sample. The choice is about support, flexibility and budget.",
      options: [
        {
          name: "Leather",
          bestFor: "Powerlifting, heavy compound lifts and premium ranges.",
          points: [
            "Rigid support that holds its shape",
            "Takes an embossed or debossed logo well",
            "Long lifespan under heavy use",
            "Higher cost per belt",
          ],
        },
        {
          name: "Nylon",
          bestFor: "General gym training, members and starter ranges.",
          points: [
            "Flexible and light, with a hook-and-loop fastening",
            "Quick to adjust between sets",
            "Lower cost per belt",
            "Takes printed and woven branding",
          ],
        },
      ],
    },
    useCases: [
      {
        title: "Strength gyms",
        description: "Belts and straps for members and the gym floor.",
      },
      {
        title: "Powerlifting clubs",
        description: "Leather belts and gear specified for competition lifters.",
      },
      {
        title: "Lifting brands",
        description:
          "Private label belts, straps and gloves with your labels and packaging.",
      },
      {
        title: "Gym retail",
        description: "Branded gear sold at the front desk or in a club shop.",
      },
    ],
    materials: [
      {
        label: "Material",
        value: "Leather, nylon or cotton, chosen per product before sampling.",
      },
      {
        label: "Width and thickness",
        value: "Set per belt and confirmed on the sample.",
      },
      {
        label: "Buckle",
        value: "Single prong, double prong, lever or hook-and-loop, per order.",
      },
      {
        label: "Stitching",
        value: "Thread colour and stitch rows agreed at specification stage.",
      },
      {
        label: "Sizes",
        value: "Size range and quantity split confirmed before bulk.",
      },
    ],
    customization: [
      {
        label: "Branding",
        value:
          "Logo by embossing, print, patch, embroidery or woven label, depending on the material.",
      },
      {
        label: "Colour",
        value: "Leather, stitching and webbing colours against agreed references.",
      },
      {
        label: "Construction",
        value: "Width, thickness and buckle specified for the intended use.",
      },
      {
        label: "Packaging",
        value: "Labels, bags, boxes, inserts and export cartons.",
      },
    ],
    sampling: [
      "Send the products you need, materials, colours and logo artwork.",
      "We confirm material, width, buckle and branding, and align the specification with you.",
      "A sample is produced and photographed for your review.",
      "You approve the sample, or ask for a revision, before any bulk production begins.",
    ],
    qualityPoints: [
      "Width, thickness and length measured against the approved sample.",
      "Buckle, stitching and edge finish verified as agreed.",
      "Logo placement, method and colour reference checked.",
      "Size and care labels checked where applicable.",
      "Count, size assortment and carton details recorded.",
      "Inspection record retained before dispatch.",
    ],
    faqs: [
      {
        question: "What lifting belts do you make?",
        answer:
          "Leather powerlifting belts, flexible training belts in leather or nylon, and dipping belts with a chain — each made to your width, buckle and branding.",
      },
      {
        question: "Leather or nylon — which lifting belt should we choose?",
        answer:
          "Leather gives rigid support for heavy compound lifts and powerlifting. Nylon is lighter, flexible and quick to adjust, and suits general gym training. Both are checked against the same approved sample.",
      },
      {
        question: "Can you put our logo on a leather belt?",
        answer:
          "Yes — by embossing, print or a patch, depending on the leather and the design. Placement is confirmed on your mockup before sampling.",
      },
      {
        question: "Do you make lifting straps and weightlifting gloves too?",
        answer:
          "Yes. Straps, grips and weightlifting gloves can be specified alongside belts so the whole range carries the same branding.",
      },
      {
        question: "What is the minimum order for custom lifting belts?",
        answer:
          "It depends on the material, the buckle and the branding method. Send an approximate quantity and we confirm the minimum for your specification before you commit to anything.",
      },
      {
        question: "Can we reorder the same belts later?",
        answer:
          "Yes. The approved specification, artwork and sample record stay on file, so a reorder matches the first run.",
      },
    ],
    closing: {
      title: "Tell us about your lifting gear.",
      description:
        "Send the products, materials, colours, logo, sizes and a rough quantity. A person replies with anything left to confirm.",
    },
    related: [
      "fightwear-club-apparel",
      "custom-boxing-gloves",
      "custom-protective-gear",
    ],
  },
  {
    slug: "custom-protective-gear",
    name: "Custom Head Guards and Protective Gear",
    noun: "custom head guards and protective gear",
    heading: "Custom head guards and protective gear, made to your specification.",
    seo: {
      title: "Custom Protective Gear Manufacturer",
      description:
        "Custom head guards, body and groin protectors, shin guards, hand wraps and supports made in Sialkot, Pakistan — in your colours, with your logo.",
    },
    quoteProduct: "Head guards and protective gear",
    category: "Protective gear",
    summary:
      "Head guards, chest and body protectors, groin and shin guards, hand wraps, inner gloves and supports, made in your colours with your logo.",
    cardDescription:
      "Head guards, body and groin protectors, shin guards, hand wraps and supports for clubs and brands. Choose the padding, colours and logo.",
    cardShot: "Head guard",
    cardAction: CTA.exploreProtective,
    cardPhoto: {
      src: inspectionBench,
      alt: "Two inspectors checking finished head guards and gloves on a workbench.",
    },
    gallery: [
      {
        shot: "Head guards at inspection",
        caption: "Head guards checked against the approved sample.",
        photo: {
          src: inspectionBench,
          alt: "Two inspectors checking finished head guards and gloves on a workbench before packing.",
        },
      },
      { shot: "Head guard", caption: "A finished head guard in club colours." },
      { shot: "Hand wraps", caption: "Hand wraps with a woven brand label." },
    ],
    overview:
      "Protective gear is made to the specification you approve: padding, coverage, closure, colours and branding are decided before sampling, and bulk production is checked against the sample you signed off. Head guards, protectors and wraps can be ordered alongside gloves in one identity.",
    /*
     * No safety or certification claims (#5, #6). Where a governing body sets
     * rules for protective equipment, the buyer checks them — the cards say so.
     */
    types: {
      eyebrow: "Product types",
      title: "Protective gear from head to hand",
      description:
        "Coverage and padding follow the sport and the session, so we confirm them with you first.",
      items: [
        {
          title: "Head guards",
          description:
            "Open-face, cheek-protector or full-face head guards for sparring. Check your governing body's rules for competition.",
          spec: "Open, cheek or full face",
        },
        {
          title: "Chest and body protectors",
          description:
            "Chest guards and body protectors for sparring and pad work.",
          spec: "Padding set per use",
        },
        {
          title: "Groin guards",
          description: "Groin protectors for boxing, kickboxing and MMA training.",
          spec: "Adjustable fit",
        },
        {
          title: "Shin and instep guards",
          description:
            "Shin guards for kickboxing and MMA, in sock or strap styles.",
          spec: "Sock or strap",
        },
        {
          title: "Hand wraps and inner gloves",
          description:
            "Hand wraps and inner gloves worn under boxing and MMA gloves.",
          spec: "Wraps or slip-on",
        },
        {
          title: "Supports and wraps",
          description:
            "Knee, elbow, wrist, ankle and back supports, plus knee wraps for lifting.",
          spec: "Sized per support",
        },
      ],
    },
    useCases: [
      {
        title: "Club sparring",
        description: "Head guards and protectors issued to members for sparring.",
      },
      {
        title: "Coordinated kit",
        description:
          "Protective gear in the same colours and branding as the club's gloves.",
      },
      {
        title: "Kids' classes",
        description: "Smaller head guards and protectors for junior members.",
      },
      {
        title: "Private label retail",
        description:
          "Brand-owned protective gear with your labels and packaging.",
      },
    ],
    materials: [
      {
        label: "Shell",
        value:
          "Leather or synthetic outer, confirmed against your specification before sampling.",
      },
      {
        label: "Padding",
        value: "Padding profile and coverage set by the product and its use.",
      },
      {
        label: "Closure",
        value: "Hook-and-loop, lace or elastic, specified per product.",
      },
      {
        label: "Wraps and supports",
        value: "Fabric, length and stretch chosen per product before sampling.",
      },
      {
        label: "Sizes",
        value: "Adult and kids' sizes, with the split confirmed before bulk.",
      },
    ],
    customization: [
      {
        label: "Branding",
        value:
          "Logo by print, patch, embroidery or woven label, placed where it suits each product.",
      },
      {
        label: "Colour",
        value: "Club or brand colour combinations against agreed references.",
      },
      {
        label: "Construction",
        value: "Padding, coverage and closure specified for the intended use.",
      },
      {
        label: "Packaging",
        value: "Labels, bags, boxes, inserts and export cartons.",
      },
    ],
    sampling: [
      "Send the products you need, your colours, sizes and logo artwork.",
      "We confirm padding, coverage and closure, and align the specification with you.",
      "A sample is produced and photographed for your review.",
      "You approve the sample, or ask for a revision, before any bulk production begins.",
    ],
    qualityPoints: [
      "Dimensions and padding checked against the approved sample.",
      "Shell, closure and stitching verified as agreed.",
      "Logo placement, method and colour reference checked.",
      "Size and care labels checked where applicable.",
      "Count, size assortment and carton details recorded.",
      "Inspection record retained before dispatch.",
    ],
    faqs: [
      {
        question: "What protective gear do you make?",
        answer:
          "Head guards, chest and body protectors, groin guards, shin and instep guards, hand wraps, inner gloves, and knee, elbow, wrist, ankle and back supports — each made to your specification.",
      },
      {
        question: "Which head guard style should we choose?",
        answer:
          "Open-face head guards give the widest vision, cheek-protector styles add coverage at the side, and full-face guards protect the nose and chin for sparring. For competition, check your governing body's rules before choosing.",
      },
      {
        question: "Are your head guards approved for competition?",
        answer:
          "We make head guards to your specification and do not claim any governing body's approval. If you need gear for a sanctioned event, check that body's requirements first.",
      },
      {
        question: "Can protective gear match our club's gloves?",
        answer:
          "Yes. One colour reference and one logo treatment carry across head guards, protectors and gloves in the same order.",
      },
      {
        question: "What is the minimum order for custom protective gear?",
        answer:
          "It depends on the product, the padding and the branding method. Send an approximate quantity and we confirm the minimum for your specification before you commit to anything.",
      },
      {
        question: "Can we reorder the same protective gear later?",
        answer:
          "Yes. The approved specification, artwork and sample record stay on file, so a reorder matches the first run.",
      },
    ],
    closing: {
      title: "Tell us about your protective gear.",
      description:
        "Send the products, colours, logo, sizes and a rough quantity. A person replies with anything left to confirm.",
    },
    related: [
      "custom-boxing-gloves",
      "custom-mma-gloves",
      "custom-pads-bags-mitts",
    ],
  },
  {
    slug: "custom-pads-bags-mitts",
    name: "Custom Punch Bags, Pads and Mitts",
    noun: "custom punch bags, pads and mitts",
    heading: "Custom punch bags, pads and mitts, made to your specification.",
    seo: {
      title: "Custom Punch Bags and Focus Mitts Manufacturer",
      description:
        "Custom punch bags, focus mitts, Thai pads, kicking shields and training sticks made in Sialkot, Pakistan — in your colours, with your logo.",
    },
    quoteProduct: "Focus Mitts and Pads",
    category: "Pads, bags and mitts",
    summary:
      "Punch bags, focus mitts and pads, Thai pads, kicking shields, paddle mitts and training sticks, made in your colours with your logo.",
    cardDescription:
      "Punch bags, focus mitts, Thai pads, kicking shields and training sticks for gyms and brands. Choose the shell, padding, colours and logo.",
    cardShot: "Focus mitts",
    cardAction: CTA.explorePads,
    cardPhoto: {
      src: factoryFloor,
      alt: "Machinists at sewing benches in the Sialkot workshop, with finished gloves and pads along the walls.",
    },
    gallery: [
      {
        shot: "Workshop",
        caption: "Pads and bags are cut and stitched in the Sialkot workshop.",
        photo: {
          src: factoryFloor,
          alt: "Machinists at sewing benches in the Sialkot workshop, with finished gloves and pads along the walls.",
        },
      },
      { shot: "Focus mitts", caption: "Focus mitts in club colours." },
      { shot: "Punch bag", caption: "A hanging punch bag with the club logo." },
    ],
    overview:
      "Pads and bags are made to the specification you approve: shell, padding density, size, strap and branding are decided before sampling, and bulk production is checked against the sample you signed off. Mitts, pads and bags can be ordered alongside your gloves in one identity.",
    types: {
      eyebrow: "Product types",
      title: "Pads, bags and mitts for the gym floor",
      description:
        "How the equipment is used decides the padding, the size and the strap, so we confirm that first.",
      items: [
        {
          title: "Focus mitts and pads",
          description:
            "Curved and flat focus mitts for pad work, with a secure hand compartment.",
          spec: "Curved or flat",
        },
        {
          title: "Thai pads and kicking shields",
          description:
            "Forearm-strapped Thai pads and large kicking shields for kicks, knees and power work.",
          spec: "Strap set per use",
        },
        {
          title: "Paddle mitts and training sticks",
          description:
            "Paddle mitts and training sticks for speed, timing and reaction drills.",
          spec: "Light and fast",
        },
        {
          title: "Punch bags",
          description:
            "Hanging, angle and uppercut, double-end and speed bags, sized to your gym.",
          spec: "Sized per order",
        },
        {
          title: "Bag and mitt sets",
          description:
            "Bags, mitts and gloves packed together as one branded set.",
          spec: "Packed as a set",
        },
      ],
    },
    materialOptions: {
      eyebrow: "Punch bags",
      title: "Filled or unfilled punch bags",
      description:
        "Both are built to the same shell and checked against the same sample. The choice is about shipping and set-up at your end.",
      options: [
        {
          name: "Filled",
          bestFor: "Gyms that want bags ready to hang on arrival.",
          points: [
            "Ready to hang straight away",
            "Filling density set and checked on the sample",
            "Heavier to ship",
            "Higher freight cost per bag",
          ],
        },
        {
          name: "Unfilled",
          bestFor: "Export orders and buyers who fill bags locally.",
          points: [
            "Much lighter and smaller to ship",
            "Lower freight cost per bag",
            "Filled at your end to the weight you want",
            "Same shell, stitching and branding",
          ],
        },
      ],
    },
    useCases: [
      {
        title: "Gym fit-outs",
        description: "Bags and pads specified together for a new or refitted gym.",
      },
      {
        title: "Coaching kit",
        description: "Mitts, pads and sticks for coaches and pad holders.",
      },
      {
        title: "Coordinated kit",
        description:
          "Equipment in the same colours and branding as the club's gloves.",
      },
      {
        title: "Private label retail",
        description:
          "Brand-owned pads, mitts and bag sets with your labels and packaging.",
      },
    ],
    materials: [
      {
        label: "Shell",
        value:
          "Leather or synthetic outer, confirmed against your specification before sampling.",
      },
      {
        label: "Padding",
        value: "Padding density set by the product and how it is used.",
      },
      {
        label: "Straps and handles",
        value: "Hand compartments, forearm straps and handles agreed per product.",
      },
      {
        label: "Bag fittings",
        value: "Chains, straps and D-rings for hanging bags, specified per order.",
      },
      {
        label: "Sizes",
        value: "Size and weight per product confirmed before bulk.",
      },
    ],
    customization: [
      {
        label: "Branding",
        value:
          "Logo by print, patch or embroidery, placed where it stays visible in use.",
      },
      {
        label: "Colour",
        value: "Club or brand colour combinations against agreed references.",
      },
      {
        label: "Construction",
        value: "Padding, straps and fittings specified for the intended use.",
      },
      {
        label: "Packaging",
        value: "Labels, bags, boxes, inserts and export cartons.",
      },
    ],
    sampling: [
      "Send the equipment you need, your colours, sizes and logo artwork.",
      "We confirm shell, padding and fittings, and align the specification with you.",
      "A sample is produced and photographed for your review.",
      "You approve the sample, or ask for a revision, before any bulk production begins.",
    ],
    qualityPoints: [
      "Dimensions and weight checked against the approved sample.",
      "Shell, padding, straps and fittings verified as agreed.",
      "Logo placement, method and colour reference checked.",
      "Labels checked where applicable.",
      "Count, assortment and carton details recorded.",
      "Inspection record retained before dispatch.",
    ],
    faqs: [
      {
        question: "What pads, bags and mitts do you make?",
        answer:
          "Focus mitts and pads, Thai pads, kicking shields, paddle mitts, training sticks, and hanging, angle, double-end and speed bags — each made to your specification.",
      },
      {
        question: "Can punch bags ship unfilled?",
        answer:
          "Bags can be specified filled or unfilled. Unfilled bags are much lighter to ship, which suits export orders; filled bags arrive ready to hang. We confirm the option with your quote.",
      },
      {
        question: "Can focus mitts match our club's gloves?",
        answer:
          "Yes. One colour reference and one logo treatment carry across mitts, pads, bags and gloves in the same order.",
      },
      {
        question: "Do you make bag and mitt sets?",
        answer:
          "Yes. Bags, mitts and gloves can be packed together as one branded set, with your labels and packaging.",
      },
      {
        question: "What is the minimum order for custom pads and bags?",
        answer:
          "It depends on the product, the shell and the branding method. Send an approximate quantity and we confirm the minimum for your specification before you commit to anything.",
      },
      {
        question: "Can we reorder the same equipment later?",
        answer:
          "Yes. The approved specification, artwork and sample record stay on file, so a reorder matches the first run.",
      },
    ],
    closing: {
      title: "Tell us about your pads and bags.",
      description:
        "Send the equipment, colours, logo, sizes and a rough quantity. A person replies with anything left to confirm.",
    },
    related: [
      "custom-boxing-gloves",
      "custom-mma-gloves",
      "custom-protective-gear",
    ],
  },
];

/** Everything `ProductCard` renders (§08 Product card). */
export type ProductCardItem = {
  category: string;
  title: string;
  description: string;
  href: string;
  shot: string;
  photo?: ProductPhoto;
  action: string;
};

/** Project a catalogue entry onto the §08 product card. */
export function productCardItem(
  product: Product,
  /** Defaults to the product's own label — specific beats a repeated "View". */
  action: string = product.cardAction,
): ProductCardItem {
  return {
    category: product.category,
    title: product.name,
    description: product.cardDescription,
    href: productHref(product),
    shot: product.cardShot,
    photo: product.cardPhoto,
    action,
  };
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.related
    .map(getProduct)
    .filter((related): related is Product => related !== undefined);
}

export function productHref(product: Pick<Product, "slug">): string {
  return `/products/${product.slug}`;
}
