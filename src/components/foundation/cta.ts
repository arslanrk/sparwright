/**
 * Approved call-to-action language — Design System §08 and §10.
 *
 * CTA copy is locked. Import from here rather than typing button labels so the
 * site keeps one set of actions across every page. §08 explicitly rules out
 * "Submit", "Click Here", "Discover More", "Let's Go" and "Shop Now".
 *
 * NOTE: the header and the homepage hero now use quote-led wording
 * (`navQuote`, `customQuote`, `sampleOrder`) while every other surface still
 * says "Request Your Mockup". That is a deliberate, scoped change and not yet
 * the one locked set this file exists to keep — the interior heroes, the
 * homepage's own closing CTA and the footer still carry the mockup language.
 */
export const CTA = {
  /** Primary conversion — clubs and gyms. */
  mockup: "Request Your Mockup",
  /**
   * Quote-led wording for the header and the homepage hero. Separate entries
   * rather than a rewrite of `mockup`, which still labels the same action on
   * seven other surfaces — changing it there was not part of the brief. See
   * the note below about the two sets now running side by side.
   */
  navQuote: "Custom Quote",
  customQuote: "Get a Custom Quote",
  sampleOrder: "Start Your Sample Order",
  /** Secondary conversion — buyers with defined requirements. */
  quote: "Get a Manufacturing Quote",
  sample: "Start a Sample Request",
  brief: "Send Your Product Brief",
  /** Inverse variant on dark surfaces (§08 button system). */
  productBrief: "Start Your Product Brief",
  /** Research-stage visitors. */
  products: "View Custom Products",
  gloves: "View Custom Gloves",
  exploreGloves: "Explore Custom Gloves",
  /**
   * §08 specifies the product-card action as "Explore Custom Gloves → or
   * equivalent". These are the equivalents for the other two categories and
   * for the private-label pathway: verb plus a specific destination, never a
   * vague "Learn more".
   */
  exploreFightwear: "Explore Fightwear",
  exploreClubApparel: "Explore Club Apparel",
  privateLabel: "View Private Label Manufacturing",
  process: "See How Production Works",
  howItWorks: "How It Works",
  manufacturing: "View Manufacturing Process",
  /** Audience landing pages only, where the destination is unambiguous (§10). */
  clubKit: "Build Your Club Kit",
} as const;

export type CtaLabel = (typeof CTA)[keyof typeof CTA];
