import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/**
 * Open Graph image — Design System §15 Launch checklist, §03 Logo, §04 Colour.
 *
 * The real §03 wordmark on the §04 Ink band. Still not photographic: no
 * approved product photography exists, §09 rules out a stock stand-in, and a
 * link preview is exactly where a borrowed image would do the most damage —
 * it is the first thing a buyer sees of us.
 *
 * The wordmark is read off disk and inlined as a data URI. `ImageResponse`
 * rasterises outside the app, so it cannot resolve a site-relative `/images/…`
 * URL: at build time there is no origin to resolve it against.
 *
 * Colours are the §04 literals, for the same reason — the theme custom
 * properties do not exist in this rendering context.
 */

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

// Read once at module scope: this runs at build time, not per request.
const wordmark = await readFile(
  join(process.cwd(), "public", "images", "logo-wordmark-dark.png"),
);
const WORDMARK_SRC = `data:image/png;base64,${wordmark.toString("base64")}`;

// The artwork is 700×102; 420 wide keeps its ratio exactly.
const WORDMARK_WIDTH = 420;
const WORDMARK_HEIGHT = Math.round((WORDMARK_WIDTH * 102) / 700);

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
      {/* §03 wordmark, inverse tone for the Ink band.

          Painted as a background rather than an <img>: the rasteriser does not
          scale a raster <img> to its box, it crops to it — which quietly ate
          the S and the T off the wordmark. backgroundSize scales properly. The
          page-level `alt` export names the whole image. */}
      <div
        style={{
          display: "flex",
          width: WORDMARK_WIDTH,
          height: WORDMARK_HEIGHT,
          backgroundImage: `url(${WORDMARK_SRC})`,
          backgroundSize: `${WORDMARK_WIDTH}px ${WORDMARK_HEIGHT}px`,
          backgroundRepeat: "no-repeat",
        }}
      />

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
