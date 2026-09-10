import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";
import lockupDark from "../../../public/images/logo-lockup-dark.png";
import lockupLight from "../../../public/images/logo-lockup-light.png";
import markDark from "../../../public/images/logo-mark-dark.png";
import markLight from "../../../public/images/logo-mark-light.png";
import wordmarkDark from "../../../public/images/logo-wordmark-dark.png";
import wordmarkLight from "../../../public/images/logo-wordmark-light.png";

/**
 * Logo — Design System §03 Logo system.
 *
 * The real artwork, cut into §03's three variants by
 * `scripts/build-brand-assets.mjs`. Each variant ships a light and an inverse
 * file, so the mark is never recoloured with a CSS filter.
 *
 * The files are imported rather than referenced by path, which means their
 * dimensions come from the artwork itself. That matters more than it looks:
 * the supplied light and dark lockups are *different renderings* — the dark
 * one's wordmark is wider and its tagline taller — so a single hard-coded
 * aspect ratio would be wrong for one of the two tones.
 *
 * Sizing is expressed as a rendered height, because that is what a header or a
 * footer actually has to fit. Width follows each file's own ratio, and §03's
 * minimum widths are checked against the result.
 *
 * A note for whoever owns the brand assets: the supplied primary lockup is
 * *stacked* — mark above wordmark. At a 64px mobile header that lands under
 * §03's 140px minimum width, so the header uses the wordmark variant. If a
 * horizontal mark-plus-wordmark lockup is wanted there, it needs to come from
 * the designer rather than be assembled here.
 */

export type LogoVariant = "primary" | "wordmark" | "mark";
export type LogoTone = "ink" | "inverse";

type VariantSpec = {
  ink: StaticImageData;
  inverse: StaticImageData;
  /** §03 minimum digital size. */
  minWidth: number;
  /** Default rendered height, in px. */
  defaultHeight: number;
  /**
   * §03 protected zone, as a fraction of the rendered height. Primary and
   * wordmark reserve the cap height of the SPARWRIGHT wordmark — the "height of
   * the S" §03 asks for. The mark reserves half its own width.
   */
  clearSpace: number;
};

const VARIANTS: Record<LogoVariant, VariantSpec> = {
  primary: {
    ink: lockupLight,
    inverse: lockupDark,
    minWidth: 140,
    defaultHeight: 64,
    clearSpace: 124 / 611,
  },
  wordmark: {
    ink: wordmarkLight,
    inverse: wordmarkDark,
    minWidth: 100,
    defaultHeight: 26,
    clearSpace: 124 / 197,
  },
  mark: {
    ink: markLight,
    inverse: markDark,
    minWidth: 24,
    defaultHeight: 24,
    // Half its own width, expressed against height via the artwork ratio.
    clearSpace: 0.5 * (192 / 163),
  },
};

type LogoProps = {
  variant?: LogoVariant;
  tone?: LogoTone;
  /** Rendered height in px. Width follows the artwork ratio. */
  height?: number;
  /** Reserve the §03 protected zone around the mark. */
  clearSpace?: boolean;
  /**
   * The logo usually sits inside a link that already names the destination, in
   * which case it is decorative and should not be announced twice.
   */
  decorative?: boolean;
  /** Set on the one logo above the fold, so it is not lazy-loaded. */
  priority?: boolean;
  className?: string;
};

export function Logo({
  variant = "primary",
  tone = "ink",
  height,
  clearSpace = true,
  decorative = false,
  priority = false,
  className,
}: LogoProps) {
  const spec = VARIANTS[variant];
  const source = tone === "inverse" ? spec.inverse : spec.ink;
  const renderedHeight = height ?? spec.defaultHeight;
  const renderedWidth = Math.round(
    renderedHeight * (source.width / source.height),
  );

  if (process.env.NODE_ENV !== "production" && renderedWidth < spec.minWidth) {
    console.warn(
      `[Logo] ${variant} renders ${renderedWidth}px wide, under the §03 minimum of ${spec.minWidth}px.`,
    );
  }

  const label =
    variant === "primary" ? "Sparwright — Custom Fight Gear" : "Sparwright";
  const padding = clearSpace
    ? Math.round(renderedHeight * spec.clearSpace)
    : undefined;

  return (
    <span
      className={cn("inline-block", className)}
      style={{ padding: padding ? `${padding}px` : undefined }}
    >
      <Image
        src={source}
        alt={decorative ? "" : label}
        width={renderedWidth}
        height={renderedHeight}
        priority={priority}
        // No `sizes`: this is a fixed-size image, so Next emits a tight 1x/2x
        // srcSet from the width. With `sizes` it emits every device width up to
        // 3840 and points the no-JS fallback `src` at the largest — an upscale
        // of a 700px source, for a logo rendered at 178px.
        style={{ height: renderedHeight, width: "auto" }}
      />
    </span>
  );
}
