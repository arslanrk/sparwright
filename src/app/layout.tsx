import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
