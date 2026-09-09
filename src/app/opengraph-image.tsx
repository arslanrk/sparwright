import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/**
 * Open Graph image — Design System §15 Launch checklist, §03 Logo, §04 Colour.
 *
 * Typographic rather than photographic, for the same reason the logo is: no
 * approved product photography exists, and §09 rules out a stock stand-in.
 * A link preview is exactly where a borrowed image would do the most damage,
 * because it is the first thing a buyer sees of us.
 *
 * Built with `ImageResponse`, so it is generated at build time and cached.
 * Colours are the §04 literals — this renders outside the document, so the
 * theme custom properties are not available here.
 */

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

// §04 core palette.
const INK = "#0b0d10";
const BONE = "#f4f1e8";
const FORGE = "#d83a20";
const MIST = "#c5cbd1";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: INK,
        color: BONE,
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      {/* §03 wordmark lockup. */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `3px solid ${BONE}`,
            padding: "8px 12px",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 3,
          }}
        >
          SW
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          {SITE_NAME}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          Custom fight gear, built for your club.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            lineHeight: 1.4,
            color: MIST,
            maxWidth: 860,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 64, height: 6, backgroundColor: FORGE }} />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: MIST,
          }}
        >
          Made in Sialkot
        </div>
      </div>
    </div>,
    size,
  );
}
