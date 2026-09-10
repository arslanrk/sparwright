import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/foundation/Container";
import { cn } from "@/lib/cn";
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
 * §07's Avoid list rules out "constant floating objects", which is what a
 * drifting node network is. So the constellation draws itself in once and then
 * holds still. Nothing here loops.
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
  proof: string[];
};

export function HeroBanner({
  eyebrow,
  title,
  description,
  actions,
  proof,
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
          src={banner}
          alt={BANNER_ALT}
          fill
          priority
          placeholder="blur"
          quality={80}
          sizes="100vw"
          // Weighted right so the desktop scrim falls over the emptier half of
          // the floor rather than over the people working.
          className="object-cover object-[62%_center]"
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

      <Constellation className="pointer-events-none absolute inset-0 hidden lg:block" />

      <Container
        width="shell"
        className="relative z-10 order-1 py-[var(--space-9)] lg:order-none lg:py-[var(--space-11)]"
      >
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

/* -------------------------------------------------------------------------
   Constellation overlay

   §09 lists "measurement marks and restrained coordinate-like labels" among the
   approved graphic motifs, which is what this is: a survey net over the
   workshop, not a particle effect.

   The geometry is generated from a fixed seed, so the server and the client
   produce identical markup and it renders as a plain server component — no
   hydration boundary, no JavaScript shipped for a decoration.
------------------------------------------------------------------------- */

const VIEW_W = 1200;
const VIEW_H = 620;

/** Small deterministic PRNG, so "random" placement is the same every build. */
function mulberry32(seed: number) {
  return function next() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Node = { x: number; y: number; r: number };

function buildNet() {
  const random = mulberry32(20260911);
  const nodes: Node[] = [];
  const COUNT = 30;

  for (let i = 0; i < COUNT; i += 1) {
    // Biased left: the right of the photograph is where the people and the
    // gloves are, and a net drawn across their faces reads as clutter rather
    // than as a motif. Squaring a 0–1 value pulls the distribution toward 0.
    const bias = random() ** 1.7;
    nodes.push({
      x: bias * VIEW_W,
      y: random() * VIEW_H,
      r: 1.6 + random() * 2.2,
    });
  }

  // Join near neighbours only, so the net reads as a structure rather than a mesh.
  const THRESHOLD = 210;
  const edges: Array<{ a: Node; b: Node; length: number }> = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const length = Math.hypot(a.x - b.x, a.y - b.y);
      if (length < THRESHOLD) edges.push({ a, b, length });
    }
  }

  return { nodes, edges };
}

const NET = buildNet();

function Constellation({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
    >
      {NET.edges.map(({ a, b, length }, index) => (
        <line
          key={`${a.x}-${a.y}-${b.x}-${b.y}`}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="var(--color-action)"
          strokeWidth="1"
          className="constellation-line"
          style={{
            // Each line draws itself along its own length.
            strokeDasharray: length,
            strokeDashoffset: length,
            animationDelay: `${300 + (index % 12) * 55}ms`,
          }}
        />
      ))}
      {NET.nodes.map((node, index) => (
        <circle
          key={`${node.x}-${node.y}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill="var(--color-action)"
          className="constellation-node"
          style={{
            transformOrigin: `${node.x}px ${node.y}px`,
            animationDelay: `${420 + (index % 10) * 70}ms`,
          }}
        />
      ))}
    </svg>
  );
}
