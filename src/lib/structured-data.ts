import { CONTACT, SOCIAL_LINKS } from "@/components/navigation/nav";
import { SITE_DESCRIPTION, SITE_NAME, siteUrl } from "./site";

/**
 * Site-wide schema.org data — who Sparwright is, stated once for every page.
 *
 * Organization tells search engines and AI answer engines the entity behind
 * the site: its name, logo, where it is and how to reach it. WebSite names the
 * site and ties it to that organization. Both are rendered from the root
 * layout, so they are the same on every route.
 *
 * Only what the site already states goes in. `sameAs` fills itself from the
 * social profiles as their URLs are added (empty ones are skipped), and the
 * email is the same placeholder `CONTACT` carries until it is confirmed.
 */

const ORG_ID = () => `${siteUrl()}/#organization`;

export function organizationJsonLd() {
  const base = siteUrl();
  const sameAs = SOCIAL_LINKS.map((link) => link.href).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID(),
    name: SITE_NAME,
    url: base,
    logo: `${base}/images/logo-dark.png`,
    description: SITE_DESCRIPTION,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sialkot",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    areaServed: ["United Kingdom", "Europe"],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl(),
    inLanguage: "en-GB",
    publisher: { "@id": ORG_ID() },
  };
}

/** Serialised for a `<script type="application/ld+json">`, with `<` escaped. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
