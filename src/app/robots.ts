import type { MetadataRoute } from "next";
import { isProductionSite, siteUrl } from "@/lib/site";

/**
 * robots.txt — Design System §15 Launch checklist.
 *
 * Indexing is off by default and turns on only when the site is deployed at a
 * real domain *and* someone sets `NEXT_PUBLIC_ALLOW_INDEXING=true`. §15 gates
 * launch on a go/no-go decision, and a preview build quietly getting indexed
 * would make that decision for us.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();

  if (!isProductionSite()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The intake endpoint is not a page and has nothing to index.
      disallow: "/api/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
