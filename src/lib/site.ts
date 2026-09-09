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

export const SITE_DESCRIPTION =
  "Boxing gloves, fightwear and club apparel manufactured in Sialkot with your logo, colours and specifications.";

export const SITE_TAGLINE = "Custom fight gear for clubs and brands";
