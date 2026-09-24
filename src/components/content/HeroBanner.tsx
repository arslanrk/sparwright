import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/foundation/Container";
import { ConstellationField } from "./ConstellationField";
import banner from "../../../public/images/banner.jpg";

/**
 * HeroBanner — Design System §08 Hero component, §09 Imagery, §07 Motion.
 *
 * The photographic homepage hero. `Hero` stays as it is for the interior
 * pages: this one is a different animal — a full-bleed backdrop with a scrim
 * and a decorative overlay — and folding both behaviours into one component
 * would make the simple case harder to read.
 *
 * Two rules shape the layout:
 *
 * §12 says the mobile hero image sits *below* the copy, so the photograph is a
 * block in the flow on small screens and only becomes the absolute backdrop at
 * `lg`. It is one `<Image>` repositioned by CSS, not two — rendering both and
 * hiding one downloads the photograph twice.
 *
 * The constellation overlay drifts continuously — a deliberate deviation from
 * §07, which lists "constant floating objects" under Avoid. `ConstellationField`
 * documents how the motion is kept to a backdrop and what it does under
 * `prefers-reduced-motion`.
 */

/** §12 alternative-text pattern: describe the work, not the file. */
const BANNER_ALT =
  "Team members stitching boxing gloves and headguards on the production floor.";

type HeroBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions: ReactNode;
  /** §08 Hero "Proof" — four short, factual trust points. */
  proof?: string[];
  /**
   * The backdrop. Defaults to the homepage workshop banner; interior pages
   * pass their own so no two heroes restate each other.
   */
  image?: { src: StaticImageData; alt: string; position?: string };
  /** Above the eyebrow: an interior page's breadcrumb. */
  top?: ReactNode;
  /** Below the actions: the products page's jump links, for one. */
  footer?: ReactNode;
  /** A shorter band for interior pages. */
  compact?: boolean;
};

export function HeroBanner({
  eyebrow,
  title,
  description,
  actions,
  proof,
  image,
  top,
  footer,
  compact = false,
}: HeroBannerProps) {
  return (
    <section
      data-theme="dark"
      className="relative isolate flex flex-col overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      {/*
        The photograph. In flow below the copy on mobile (§12), the full-bleed
        backdrop from `lg` up.
      */}
      <div className="relative order-2 aspect-[16/10] w-full sm:aspect-[2/1] lg:absolute lg:inset-0 lg:order-none lg:aspect-auto lg:h-full">
        <Image
          src={image?.src ?? banner}
          alt={image?.alt ?? BANNER_ALT}
          fill
          // The LCP image. Next 16 deprecated `priority`, which no longer
          // emitted a fetch priority at all; this is its documented
          // replacement for an above-the-fold image.
          loading="eager"
          fetchPriority="high"
          placeholder="blur"
          quality={80}
          sizes="100vw"
          // Weighted right so the desktop scrim falls over the emptier half of
          // the floor rather than over the people working.
          className="object-cover object-[62%_center]"
          style={image?.position ? { objectPosition: image.position } : undefined}
        />
        {/*
          Scrim. Only on desktop, where type sits over the photograph — on
          mobile the image is its own block and needs no darkening. Two layers:
          a horizontal gradient that carries the left column, and a flat wash
          that keeps the right side from competing with the copy (§12 contrast).
        */}
        <div className="absolute inset-0 hidden bg-linear-to-r from-[var(--color-ink-950)] from-40% via-[var(--color-ink-950)]/82 via-72% to-[var(--color-ink-950)]/20 lg:block" />
        <div className="absolute inset-0 hidden bg-[var(--color-ink-950)]/20 lg:block" />
      </div>

      <ConstellationField className="pointer-events-none absolute inset-0 hidden lg:block" />

      <Container
        width="shell"
        className={
          compact
            ? "relative z-10 order-1 py-[var(--space-7)] lg:order-none lg:py-[var(--space-9)]"
            : "relative z-10 order-1 py-[var(--space-9)] lg:order-none lg:py-[var(--space-11)]"
        }
      >
        {top ? <div className="mb-[var(--space-7)]">{top}</div> : null}
        <div className="lg:max-w-[46rem]">
          {/*
            Badge. Forge carries the border and the tint; the label itself is
            the band's text colour, because §04 says outright that Forge on Ink
            does not clear contrast for small text — measured at 3.99:1 against
            the 4.5 this 12px label needs.
          */}
          <p
            className="hero-rise inline-flex items-center rounded-pill border border-[var(--color-action)] bg-[var(--color-action)]/12 px-4 py-2 text-eyebrow uppercase text-[var(--color-text)]"
            style={{ animationDelay: "60ms" }}
          >
            {eyebrow}
          </p>

          <h1
            className="hero-rise mt-[var(--space-5)] text-display-lg"
            style={{ animationDelay: "120ms" }}
          >
            {title}
          </h1>

          <p
            className="hero-rise mt-[var(--space-5)] max-w-copy text-body-large text-[var(--color-text-secondary)]"
            style={{ animationDelay: "180ms" }}
          >
            {description}
          </p>

          <div
            className="hero-rise mt-[var(--space-6)] flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            {actions}
          </div>

          {/* §08 Hero proof. Four short points, no invented numbers. */}
          {proof && proof.length > 0 ? (
          <ul
            className="hero-rise mt-[var(--space-7)] grid gap-x-[var(--space-6)] gap-y-3 sm:grid-cols-2"
            style={{ animationDelay: "300ms" }}
          >
            {proof.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <CheckMark />
                <span className="text-body text-[var(--color-text-secondary)]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
          ) : null}

          {footer ? (
            <div
              className="hero-rise mt-[var(--space-7)]"
              style={{ animationDelay: "300ms" }}
            >
              {footer}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

/** §09 iconography: one line family, ~1.75px stroke, Forge for emphasis. */
function CheckMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-5 shrink-0 text-[var(--color-action)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="8.25" />
      <path d="M6.25 10.25 8.9 12.9l4.85-5.3" />
    </svg>
  );
}
