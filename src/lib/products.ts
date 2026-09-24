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

/** A gallery slot naming the §09 minimum-launch shot it is waiting on. */
export type GalleryShot = { shot: string; caption: string };

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
  types?: { title: string; description: string; items: ProductType[] };
  /** A side-by-side of the materials a buyer chooses between. */
  materialOptions?: {
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

/**
 * Answers shared across products. §08 lists nine standard buyer questions; the
 * MOQ and lead-time answers deliberately commit to no number, because
 * non-negotiable #6 forbids publishing either until they are confirmed.
 */
const SHARED_FAQS = {
  moq: {
    question: "What is your minimum order quantity?",
    answer:
      "It depends on the product, materials and branding method. Send your product and an approximate quantity and we will confirm the minimum for that specification before you commit to anything.",
  },
  logo: {
    question: "Can you add our club logo?",
    answer:
      "Yes. Upload your artwork with your requirements and the production team will confirm whether the file is suitable for the branding method you want, and propose an alternative if it is not.",
  },
  sample: {
    question: "Do you create a sample before bulk production?",
    answer:
      "Yes. Bulk production starts only against a sample you have approved, and that approved specification is what production is checked against.",
  },
  reference: {
    question: "Can you work from a reference product?",
    answer:
      "Yes. Send photographs, measurements or the product itself and we will confirm which parts of the construction we can match and which need a decision from you.",
  },
  leadTime: {
    question: "How long does production take?",
    answer:
      "Sampling and production times depend on the product, quantity and branding. We confirm dates for your specific order in writing with your quote rather than publishing a general figure.",
  },
  reorder: {
    question: "Can we reorder the same approved design?",
    answer:
      "Yes. Approved artwork and specifications are retained so a reorder is produced against the same reference rather than being developed again.",
  },
} as const;

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
    gallery: [
      {
        shot: "Full glove front",
        caption: "Front view of a finished custom glove.",
      },
      {
        shot: "Full glove side",
        caption: "Side profile showing the padding and panel shape.",
      },
      {
        shot: "Wrist closure close-up",
        caption: "Wrist closure and strap detail.",
      },
      {
        shot: "Stitching close-up",
        caption: "Stitching along the shell panels.",
      },
      {
        shot: "Padding or construction detail",
        caption: "Padding profile shown in cross-section.",
      },
      {
        shot: "Logo application",
        caption: "Club logo applied to the wrist panel.",
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
    category: "Fightwear and apparel",
    summary:
      "Fight shorts, rashguards and club apparel manufactured with your fabrics, colours, sizing and branding.",
    cardDescription:
      "Shorts, rashguards, tees, hoodies and tracksuits for clubs and growing brands. Specify fabric, panel layout, colours, sizing and branding method.",
    cardShot: "Coordinated product collection",
    gallery: [
      { shot: "Fight shorts", caption: "Custom fight shorts in club colours." },
      { shot: "Rashguard", caption: "Rashguard with sublimated panel design." },
      {
        shot: "Club apparel flat lay",
        caption: "Club tees and hoodies laid out as a set.",
      },
      {
        shot: "Coordinated product collection",
        caption: "Gloves, fightwear and apparel under one identity.",
      },
      {
        shot: "Printing or embroidery",
        caption: "Branding applied in the workshop.",
      },
      { shot: "Logo application", caption: "Club logo placed on the chest." },
    ],
    overview:
      "One page covers the apparel side of a club kit: shorts, rashguards, tees, hoodies and tracksuits, specified together so colours, logo placement and sizing stay consistent across everything you order.",
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
        title: "Private-label ranges",
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
          "Print, sublimation, embroidery or applied badge, chosen per garment.",
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
    faqs: [
      SHARED_FAQS.moq,
      SHARED_FAQS.logo,
      SHARED_FAQS.sample,
      SHARED_FAQS.reference,
      {
        question: "What materials are available?",
        answer:
          "Fabric weight and composition are chosen per garment against the intended use, then fixed by the sample you approve.",
      },
      SHARED_FAQS.leadTime,
      SHARED_FAQS.reorder,
    ],
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
