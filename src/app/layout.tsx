import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { CookieBanner } from "@/components/navigation/CookieBanner";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { MobileActionBar } from "@/components/navigation/MobileNavigation";
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

// §01 positioning statement and supporting statement.
export const metadata: Metadata = {
  title: {
    default: "Sparwright — Custom fight gear for clubs and brands",
    template: "%s | Sparwright",
  },
  description:
    "Boxing gloves, fightwear and club apparel manufactured in Sialkot with your logo, colours and specifications.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
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
        <CookieBanner />
        <AnalyticsListener />
      </body>
    </html>
  );
}
