/**
 * Site-level constants — Design System §15 Launch checklist.
 *
 * The canonical origin is read from the environment so the sitemap, robots
 * rules and Open Graph URLs are correct in preview and in production without a
 * hard-coded domain sitting in the repo. Set `NEXT_PUBLIC_SITE_URL` before
 * launch; the PR 13 checklist blocks on it.
 */

const FALLBACK_ORIGIN = "http://localhost:3000";

export function siteUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined);
  return (configured ?? FALLBACK_ORIGIN).replace(/\/$/, "");
}

/**
 * Is this the real, public site? Everything else — previews, local builds — is
 * kept out of search results until someone decides to launch.
 */
export function isProductionSite(): boolean {
  return (
    Boolean(process.env.NEXT_PUBLIC_SITE_URL) &&
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true"
  );
}

export const SITE_NAME = "Sparwright";

/**
 * The meta description for the homepage, the Open Graph body and the footer
 * brand line — one string, so the three cannot drift apart.
 *
 * Written to the ~155 characters a search result will actually show, leading
 * with the product terms a buyer searches and closing on the differentiator
 * rather than on where we are.
 */
export const SITE_DESCRIPTION =
  "Custom boxing gloves, fightwear and club apparel made to your specification — your logo, your colours, and an approved sample before bulk production.";

/**
 * Renders as the homepage title tag, "Sparwright — {tagline}". Front-loaded
 * with the terms a buyer searches, and "manufacturer" is the word that
 * separates a buying query from a shopping one. 60 characters with the brand,
 * which is about what a result will show before truncating.
 */
export const SITE_TAGLINE = "Custom boxing gloves and fightwear manufacturer";
