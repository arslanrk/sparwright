import type { MetadataRoute } from "next";
import { PRODUCTS, productHref } from "@/lib/products";
import { siteUrl } from "@/lib/site";

/**
 * sitemap.xml — Design System §15 Launch checklist, §11 Information architecture.
 *
 * Built from the catalogue rather than a hand-kept list, so a new product page
 * cannot be added and then quietly left out of the sitemap.
 *
 * Priorities follow §11's launch architecture: the homepage and the conversion
 * page first, then the audience and product pathways, then the legal pages that
 * exist to be linked rather than found.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date();

  const pages: {
    path: string;
    priority: number;
    changeFrequency: "monthly" | "yearly";
  }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/quote", priority: 0.9, changeFrequency: "monthly" },
    { path: "/products", priority: 0.8, changeFrequency: "monthly" },
    ...PRODUCTS.map((product) => ({
      path: productHref(product),
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/for-clubs", priority: 0.8, changeFrequency: "monthly" },
    { path: "/private-label", priority: 0.7, changeFrequency: "monthly" },
    { path: "/manufacturing", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
  ];

  return pages.map((page) => ({
    url: `${base}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
