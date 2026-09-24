import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE } from "./site";

/**
 * Per-page metadata — canonical URL, Open Graph and Twitter card in one call.
 *
 * Why this exists: the root layout used to set `alternates.canonical: "/"`,
 * and no page overrode it, so every route declared the homepage as its
 * canonical — telling search engines that each page was a duplicate of the
 * homepage. Open Graph was inherited the same way, so a shared product link
 * previewed as the homepage.
 *
 * Next merges metadata shallowly: a page that sets `openGraph` replaces the
 * layout's object whole, and `title.template` does not reach Open Graph
 * titles. So this builds every field a page needs rather than patching one,
 * and every page should go through it.
 *
 * The share image is referenced explicitly. `app/opengraph-image.tsx` only
 * attaches itself to routes that inherit the root `openGraph`; once a page
 * sets its own, the image is dropped with the rest of the parent object, so
 * it has to be named here.
 */

const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
};

type PageMetadataInput = {
  /** Route path, e.g. "/products". The canonical URL, resolved against `metadataBase`. */
  path: string;
  /** Page title without the brand; the layout template adds "| Sparwright". */
  title: string;
  description: string;
  /** Anything else the page needs — robots, for one. */
  extra?: Metadata;
};

/**
 * A starter page: the full metadata, plus noindex until it is marked ready.
 * The page stays reachable from the menu; search engines skip it.
 */
export function starterMetadata(input: PageMetadataInput & { ready: boolean }): Metadata {
  const { ready, ...rest } = input;
  return pageMetadata({
    ...rest,
    extra: ready ? rest.extra : { ...rest.extra, robots: { index: false, follow: true } },
  });
}

export function pageMetadata({
  path,
  title,
  description,
  extra,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_GB",
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    ...extra,
  };
}
