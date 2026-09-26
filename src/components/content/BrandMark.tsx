/**
 * BrandMark — the placeholder for the buyer's own brand on the Private Label
 * page: a monogram and "YOUR BRAND", drawn so it scales to a wrist panel, a
 * woven label or a box lid. Never a real mark. Decorative everywhere it is
 * used, so it is hidden from screen readers.
 */
export function BrandMark({ className, accent = "#D83A20" }: { className?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 120 28" className={className} fill="none" aria-hidden="true">
      <rect x="1" y="3" width="22" height="22" rx="5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M7 9l5 6 5-6M12 15v5" stroke={accent} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="30" y="20" fill="currentColor" fontFamily="inherit" fontSize="14" fontWeight="800" textLength="88" lengthAdjust="spacingAndGlyphs">
        YOUR BRAND
      </text>
    </svg>
  );
}
