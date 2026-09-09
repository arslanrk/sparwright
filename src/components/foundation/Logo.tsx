import { cn } from "@/lib/cn";

/**
 * Logo — Design System §03 Logo system.
 *
 * Typographic lockups built from the display face. No drawn artwork exists yet
 * and "Sparwright" is a working brand (§03: the system stays valid if the name
 * changes), so the wordmark is set rather than imported. Swap the internals for
 * an SVG when final artwork lands — the clear-space and minimum-size rules
 * below travel with the component either way.
 */

export type LogoVariant = "primary" | "wordmark" | "mark";
export type LogoTone = "ink" | "inverse";

/** §03 minimum digital sizes. */
const MIN_WIDTH: Record<LogoVariant, string> = {
  primary: "140px",
  wordmark: "100px",
  mark: "24px",
};

/**
 * §03 clear space. Primary and wordmark reserve the height of the S on all
 * sides — the cap height of the display face, ~0.72em. The maker's mark
 * reserves half its own width.
 */
const CLEAR_SPACE: Record<LogoVariant, string> = {
  primary: "0.72em",
  wordmark: "0.72em",
  mark: "50%",
};

type LogoProps = {
  variant?: LogoVariant;
  tone?: LogoTone;
  /** Reserve the §03 protected zone around the mark. */
  clearSpace?: boolean;
  className?: string;
};

export function Logo({
  variant = "primary",
  tone = "ink",
  clearSpace = true,
  className,
}: LogoProps) {
  const label =
    variant === "primary" ? "Sparwright — Custom Fight Gear" : "Sparwright";

  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "inline-block font-display",
        tone === "inverse" ? "text-white" : "text-ink-950",
        className,
      )}
      style={{
        minWidth: MIN_WIDTH[variant],
        padding: clearSpace ? CLEAR_SPACE[variant] : undefined,
      }}
    >
      {variant === "mark" ? (
        // Rectangular maker's stamp (§03 construction direction).
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center border-2 border-current px-1.5 py-1 text-[0.8125rem] font-bold leading-none tracking-[0.06em]"
        >
          SW
        </span>
      ) : (
        <span aria-hidden="true" className="block">
          <span className="block text-[1.125rem] font-bold uppercase leading-none tracking-[0.14em]">
            Sparwright
          </span>
          {variant === "primary" ? (
            <span
              className={cn(
                "mt-1 block font-body text-[0.5625rem] uppercase leading-none tracking-[0.22em]",
                tone === "inverse" ? "text-mist-300" : "text-slate-500",
              )}
            >
              Custom Fight Gear
            </span>
          ) : null}
        </span>
      )}
    </span>
  );
}
