import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { CookieBanner } from "@/components/navigation/CookieBanner";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { MobileActionBar } from "@/components/navigation/MobileNavigation";
import { WhatsAppLauncher } from "@/components/navigation/WhatsAppLauncher";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  isProductionSite,
  siteUrl,
} from "@/lib/site";
import {
  jsonLdScript,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";
import "./globals.css";

// §05 — Archivo (600/700) for display, Inter (400/500/600) for body and UI.
// Both are variable fonts, so the documented weights come from a single file.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// §01 positioning statement and supporting statement, plus the §15 launch
// metadata. `metadataBase` is what makes the Open Graph image URL absolute;
// without it a share preview resolves against the wrong origin.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    locale: "en_GB",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  alternates: { canonical: "/" },
  // Belt and braces with robots.ts: nothing is indexed until launch is called.
  robots: isProductionSite()
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // en-GB, matching the Open Graph locale: the site is written in British
    // English for UK and European buyers.
    <html
      lang="en-GB"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Who is behind the site, for search and AI answer engines. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript([organizationJsonLd(), websiteJsonLd()]),
          }}
        />
        {/* §08 navigation shell — the same header, footer and sticky mobile
            action bar on every route. */}
        {/* §12 — the first stop for a keyboard user on every page. */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        {/* One main landmark for every route, so a page renders its bands
            directly and the skip link always has somewhere to land. */}
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <WhatsAppLauncher />
        <CookieBanner />
        <AnalyticsListener />
      </body>
    </html>
  );
}
