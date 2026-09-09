import type { ProductFaq } from "./products";

/**
 * Site-wide FAQ — Design System §08 FAQ accordion.
 *
 * §08 fixes the nine questions; the answers here are the site-wide versions.
 * Product pages carry their own narrower set in `src/lib/products.ts`.
 *
 * Two answers deliberately commit to no number. Non-negotiable #6 forbids
 * publishing an MOQ or a lead time until they are confirmed, so those questions
 * are answered with how the figure is arrived at rather than with a figure that
 * would later have to be walked back.
 */
export const SITE_FAQS: ProductFaq[] = [
  {
    question: "What is your minimum order quantity?",
    answer:
      "It depends on the product, the materials and the branding method — a printed tee and a leather glove are not the same question. Send the product and an approximate quantity and we will confirm the minimum for that specification before you commit to anything.",
  },
  {
    question: "Can you add our club logo?",
    answer:
      "Yes. Upload your artwork with your requirements in any of the usual formats. The production team confirms whether the file suits the branding method you want, and proposes an alternative if it does not, rather than making the decision quietly.",
  },
  {
    question: "Do you create a sample before bulk production?",
    answer:
      "Yes. Bulk production starts only against a sample you have approved, and that approved specification is what the finished order is checked against.",
  },
  {
    question: "Can you work from a reference product?",
    answer:
      "Yes. Send photographs, measurements or the product itself. We confirm which parts of the construction can be matched and which need a decision from you — we will not quietly substitute something and hope it passes.",
  },
  {
    question: "What materials are available?",
    answer:
      "Shell, fabric, padding and lining options are chosen against the intended use, then fixed by the sample you approve. Tell us what the product is for and we will set out the practical options rather than a catalogue.",
  },
  {
    question: "How long does production take?",
    answer:
      "Sampling and production times depend on the product, the quantity and the branding method. We confirm dates for your specific order in writing with your quote rather than publishing a general figure that would not hold for every order.",
  },
  {
    question: "Do you ship to the UK and Europe?",
    answer:
      "Yes — the UK and Europe are our main markets. The shipping method, cost and paperwork depend on the quantity and destination, and are confirmed with your quote. Import duty and local taxes are the buyer's responsibility unless we agree otherwise in writing.",
  },
  {
    question: "What information is needed for a quote?",
    answer:
      "The product, an approximate quantity, your colours, your logo artwork, the intended use and the destination country. If you are missing some of that, send what you have — a person reads every request and will ask for the rest.",
  },
  {
    question: "Can we reorder the same approved design?",
    answer:
      "Yes. Approved artwork, colour references, construction details and the sample record are retained, so a repeat order is produced against the original reference rather than developed again.",
  },
];
