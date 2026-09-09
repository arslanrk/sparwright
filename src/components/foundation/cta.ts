/**
 * Approved call-to-action language — Design System §08 and §10.
 *
 * CTA copy is locked. Import from here rather than typing button labels so the
 * site keeps one set of actions across every page. §08 explicitly rules out
 * "Submit", "Click Here", "Discover More", "Let's Go" and "Shop Now".
 */
export const CTA = {
  /** Primary conversion — clubs and gyms. */
  mockup: "Request Your Mockup",
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
