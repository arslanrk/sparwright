import type { StaticImageData } from "next/image";
import boxingAthlete from "../../public/images/boxing-athlete.jpg";
import boxingGloves from "../../public/images/boxing-gloves.jpg";
import clubTeamKit from "../../public/images/club-team-kit.jpg";
import explodedGlove from "../../public/images/exploded-boxing-glove.jpg";
import gymWear from "../../public/images/gym-wear.jpg";
import mockupToGlove from "../../public/images/logo-mockup-to-finished-glove.jpg";
import mmaFighter from "../../public/images/mma-fighter.jpg";

/**
 * Product catalogue — Design System §11 Information architecture and page
 * templates, §09 Imagery, §10 Content design.
 *
 * §11 launches with two product pages: the anchor product, Custom Boxing
 * Gloves, and one combined Fightwear and Club Apparel page. Non-negotiable #7
 * rules out spinning that into a dozen thin category pages, so the sub-ranges
 * live inside these two rather than getting routes of their own.
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
    related: ["fightwear-club-apparel"],
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
    related: ["custom-boxing-gloves"],
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
  action: string,
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
