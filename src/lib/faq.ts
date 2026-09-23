import type { ProductFaq } from "./products";

/**
 * Site-wide FAQ — Design System §08 FAQ accordion.
 *
 * Starts from the §08 nine and adds three a first-time buyer, or a search
 * engine building an entity, asks before any of them: what we make, where it
 * is made, and whether brands can sell it under their own label. The logo
 * question covers brands as well as clubs, and the materials answer names the
 * materials the product pages already confirm. Product pages carry their own
 * narrower set in `src/lib/products.ts`.
 *
 * Questions are phrased the way buyers search — "custom boxing gloves",
 * "private label" — but only where the words are natural; each answer opens by
 * answering, so it can stand alone as a snippet.
 *
 * Two answers deliberately commit to no number. Non-negotiable #6 forbids
 * publishing an MOQ or a lead time until they are confirmed, so those questions
 * are answered with how the figure is arrived at rather than with a figure that
 * would later have to be walked back.
 *
 * Every fact here must already be stated elsewhere on the site: the product
 * range (homepage), Sialkot and ten years (/manufacturing), artwork formats
 * (`ACCEPTED_ARTWORK_LABEL` in quote.ts), glove materials and closures
 * (products.ts).
 *
 * Grouped by the stage of a buyer's thinking — who you are, how ordering
 * works, how it gets made, what happens after — so the homepage can index the
 * list by topic. `SITE_FAQS` is the same set, flat, for anything that does not
 * care about grouping (structured data, for one).
 */
export type FaqGroup = {
  /** Anchor id for the topic index. */
  id: string;
  label: string;
  items: ProductFaq[];
};

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "faq-about",
    label: "About Sparwright",
    items: [
      {
        question: "What does Sparwright manufacture?",
        answer:
          "Custom boxing gloves, fightwear, lifting gear and club apparel for gyms, clubs and fightwear brands. Every product is made to your specification — materials, construction, colours, logo and packaging — rather than picked from a catalogue and relabelled.",
      },
      {
        question: "Where are your products made?",
        answer:
          "In Sialkot, Pakistan, where we have ten years of hands-on fight-gear manufacturing experience. We produce there rather than sourcing from elsewhere and relabelling, and the inspection record for your order is retained and can be shared.",
      },
      {
        question: "Do you make private label boxing gloves and fightwear?",
        answer:
          "Yes. Fightwear brands develop products under their own name, with their own labels and packaging, and the approved specification is kept on file so every reorder matches the first run.",
      },
    ],
  },
  {
    id: "faq-ordering",
    label: "Ordering and branding",
    items: [
      {
        question: "What is your minimum order quantity for custom gear?",
        answer:
          "It depends on the product, the materials and the branding method — a printed tee and a leather glove are not the same question. Send the product and an approximate quantity and we will confirm the minimum for that specification before you commit to anything.",
      },
      {
        question: "Can you add our club or brand logo?",
        answer:
          "Yes — by embroidery, print, patch or woven label, depending on the product. Send your artwork as SVG, PDF, AI, EPS, PNG or JPG. The production team confirms whether the file suits the branding method you want, and proposes an alternative if it does not, rather than making the decision quietly.",
      },
      {
        question: "What information is needed for a quote?",
        answer:
          "The product, an approximate quantity, your colours, your logo artwork, the intended use and the destination country. If you are missing some of that, send what you have — a person reads every request and will ask for the rest.",
      },
    ],
  },
  {
    id: "faq-production",
    label: "Samples and production",
    items: [
      {
        question: "Do you create a sample before bulk production?",
        answer:
          "Yes. You approve a mockup first, then a physical sample. Bulk production starts only against the sample you have signed off, and that approved specification is what the finished order is checked against.",
      },
      {
        question: "Can you work from a reference product?",
        answer:
          "Yes. Send photographs, measurements or the product itself. We confirm which parts of the construction can be matched and which need a decision from you — we will not quietly substitute something and hope it passes.",
      },
      {
        question: "What materials do you use for custom boxing gloves?",
        answer:
          "A synthetic or leather shell, padding chosen for training, sparring or bag work, and a hook-and-loop or lace closure. Fightwear and apparel fabrics are chosen the same way — against the intended use — and every material is fixed by the sample you approve.",
      },
      {
        question: "How long does production take?",
        answer:
          "Sampling and production times depend on the product, the quantity and the branding method. We confirm dates for your specific order in writing with your quote rather than publishing a general figure that would not hold for every order.",
      },
    ],
  },
  {
    id: "faq-delivery",
    label: "Delivery and reorders",
    items: [
      {
        question: "Do you ship to the UK and Europe?",
        answer:
          "Yes — the UK and Europe are our main markets. The shipping method, cost and paperwork depend on the quantity and destination, and are confirmed with your quote. Import duty and local taxes are the buyer's responsibility unless we agree otherwise in writing.",
      },
      {
        question: "Can we reorder the same approved design?",
        answer:
          "Yes. Approved artwork, colour references, construction details and the sample record are retained, so a repeat order is produced against the original reference rather than developed again.",
      },
    ],
  },
];

export const SITE_FAQS: ProductFaq[] = FAQ_GROUPS.flatMap(
  (group) => group.items,
);
