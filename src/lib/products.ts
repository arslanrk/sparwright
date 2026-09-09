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

export type Product = {
  slug: string;
  /** Navigation and card label. */
  name: string;
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
    category: "Boxing gloves",
    // §11 product hero example, verbatim.
    summary:
      "Training, sparring and bag gloves manufactured with your preferred materials, branding, colours and closure specifications.",
    cardDescription:
      "Training, sparring and bag gloves for clubs and fightwear brands. Choose the shell material, padding profile, colours, closure and logo placement.",
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
      "Gloves are made to the specification you approve: shell material, padding profile, closure, colourway and branding are all decided before sampling, and bulk production is checked against the sample you signed off.",
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
        title: "Private-label retail",
        description:
          "Brand-owned gloves with your labels, packaging and retained specification for reorders.",
      },
    ],
    materials: [
      {
        label: "Shell",
        value:
          "Synthetic or leather shell, confirmed against your specification before sampling.",
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
        value: "Hook-and-loop or lace closure, specified per order.",
      },
      {
        label: "Stitching",
        value:
          "Panel stitching and reinforcement points verified against the approved sample.",
      },
      {
        label: "Sizes",
        value: "Size range confirmed with your quantity split before bulk.",
      },
    ],
    customization: [
      {
        label: "Branding",
        value:
          "Logo placement on the wrist, cuff or palm by print, patch or embroidery where suitable.",
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
    faqs: [
      SHARED_FAQS.moq,
      SHARED_FAQS.logo,
      SHARED_FAQS.sample,
      SHARED_FAQS.reference,
      {
        question: "What materials are available?",
        answer:
          "Shell, padding and lining options are confirmed against your intended use and budget at specification stage, then fixed by the sample you approve.",
      },
      SHARED_FAQS.leadTime,
      SHARED_FAQS.reorder,
    ],
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
