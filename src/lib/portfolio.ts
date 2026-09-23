import type { StaticImageData } from "next/image";

/**
 * Portfolio — finished orders, photographed.
 *
 * EMPTY UNTIL THERE IS REAL WORK TO SHOW. §11 and non-negotiable #12 rule out
 * case studies and testimonials until genuine evidence exists, and #5 rules
 * out inventing clients. So this list starts empty, the page says so plainly,
 * and it stays out of search and the sitemap until the first entry lands
 * (`hasPortfolio`).
 *
 * Every entry is a real order. The client can be named only with their
 * permission; otherwise describe them ("A boxing club in Manchester"). Photos
 * must be of the actual finished product — not renders and not the generated
 * imagery used elsewhere on the site.
 */

export type PortfolioCategory =
  | "Boxing"
  | "MMA"
  | "Strength and Lifting"
  | "Gym Wear"
  | "Club and Team Kit";

/** The collections, in homepage order, so the two read as one range. */
export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "Boxing",
  "MMA",
  "Strength and Lifting",
  "Gym Wear",
  "Club and Team Kit",
];

export type PortfolioItem = {
  /** What was made, e.g. "Club sparring gloves and matching hoodies". */
  title: string;
  category: PortfolioCategory;
  /** Named with permission, or described: "A boxing club in Manchester". */
  client: string;
  /** What the buyer specified — the decisions this order shows. */
  customised: string[];
  photo: { src: StaticImageData; alt: string };
};

export const PORTFOLIO: PortfolioItem[] = [];

export const hasPortfolio = PORTFOLIO.length > 0;
