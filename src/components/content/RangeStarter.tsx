import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/foundation/Container";
import { cn } from "@/lib/cn";

/**
 * RangeStarter — a closing band that turns the range into a place to start.
 * First written for Gyms & Academies; The shared
 * `CallToAction` ends on "what happens next", which this page has already
 * shown twice (05, 06); so here the right-hand side answers the page's own
 * closing line instead — "start with the gear your club needs now" — with
 * the range as a picker. Each tile opens the mockup request with that
 * product already chosen (`/quote?intent=mockup&product=…`, read by
 * `quotePrefill`), and the wide tile starts a multi-product brief.
 *
 * §04 still holds on the red: a heading, one short paragraph and the
 * actions; the small type sits on the dark panel, where it keeps contrast.
 * The tiles are links, not buttons — the band's one primary action stays the
 * inverse button beside them (§08).
 */

export type StarterProduct = {
  label: string;
  /** The quote form's product choice, verbatim. */
  product: string;
  photo: StaticImageData;
  /** Studio shots float on the grey; a scene fills its tile. */
  fill?: boolean;
};

export function RangeStarter({
  eyebrow,
  title,
  description,
  actions,
  footnote,
  products,
  several,
  surface,
  intent = "mockup",
  pickerNote = "Pick one to begin a mockup request",
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions: ReactNode;
  footnote?: ReactNode;
  products: StarterProduct[];
  several: { label: string; description: string; product: string };
  /** Analytics placement for the tiles. */
  surface: string;
  /** Which request the tiles open: the mockup, or the product brief. */
  intent?: "mockup" | "quote";
  pickerNote?: string;
}) {
  const href = (product: string) =>
    `/quote?${intent === "mockup" ? "intent=mockup&" : ""}product=${encodeURIComponent(product)}`;
  const event = intent === "mockup" ? "hero_mockup_click" : "hero_quote_click";
  return (
    <Section theme="action" width="shell" className="relative isolate overflow-hidden">
      {/* A shadow to seat the panel, and one stitched seam across the band. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -right-[8%] top-1/2 size-[46rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(11_13_16/0.3),transparent)]" />
        <svg className="absolute inset-0 hidden size-full md:block" viewBox="0 0 1200 500" preserveAspectRatio="none" fill="none">
          <path
            d="M-40 440 C 260 320, 440 520, 720 380 S 1100 140, 1260 220"
            stroke="rgb(255 255 255 / 0.2)"
            strokeWidth="1.5"
            strokeDasharray="10 9"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 items-center gap-[var(--space-8)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[var(--space-9)]">
        <div>
          {/* Ink pill, not white-on-red: 12px type needs the contrast. */}
          <p className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-3 py-1.5 text-eyebrow uppercase text-white">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-forge-600" />
            {eyebrow}
          </p>
          <h2 className="mt-[var(--space-5)] max-w-[16ch] text-heading-1">{title}</h2>
          <p className="mt-[var(--space-4)] max-w-copy text-body-large">{description}</p>
          <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-3">{actions}</div>
          {footnote ? <div className="mt-[var(--space-5)] text-body">{footnote}</div> : null}
        </div>

        {/* The range, as a place to start. */}
        <div
          data-theme="dark"
          className="relative rounded-2xl bg-[var(--color-bg)] p-[var(--space-4)] text-[var(--color-text)] shadow-[0_30px_60px_-20px_rgb(11_13_16/0.55)] sm:p-[var(--space-5)]"
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-white/15" />

          <div className="relative flex flex-col gap-0.5 px-1 pb-[var(--space-4)] pt-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <p className="font-body text-body-large font-semibold">Start with…</p>
            <p className="text-small text-[var(--color-text-secondary)]">{pickerNote}</p>
          </div>

          <ul className="relative grid grid-cols-2 gap-2 sm:grid-cols-3">
            {products.map((item) => (
              <li key={item.label}>
                <Link
                  href={href(item.product)}
                  data-analytics={event}
                  data-analytics-surface={surface}
                  className="group block overflow-hidden rounded-xl bg-white/[0.06] transition-colors hover:bg-forge-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-[radial-gradient(120%_100%_at_50%_75%,#d9dadc,#b9bbbf)]">
                    <Image
                      src={item.photo}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
                      className={cn(
                        "transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.06]",
                        item.fill
                          ? "object-cover"
                          : "object-contain p-2 [mask-image:radial-gradient(closest-side,black_75%,transparent)]",
                      )}
                    />
                  </span>
                  <span className="flex min-h-11 items-center justify-between gap-2 px-3 py-2 text-small font-semibold leading-tight text-white">
                    <span>{item.label}</span>
                    <span className="hidden sm:block">
                      <Plus />
                    </span>
                  </span>
                </Link>
              </li>
            ))}

            {/* Or all of it, under one identity. */}
            <li className="col-span-2 sm:col-span-3">
              <Link
                href={href(several.product)}
                data-analytics={event}
                data-analytics-surface={surface}
                className="group flex items-center gap-4 rounded-xl border border-dashed border-white/25 px-[var(--space-4)] py-3 transition-colors hover:border-forge-600 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span aria-hidden="true" className="flex -space-x-2">
                  {products.slice(0, 3).map((item) => (
                    <span key={item.label} className="relative size-8 overflow-hidden rounded-full bg-[#c8c9cb] ring-2 ring-[var(--color-bg)]">
                      <Image src={item.photo} alt="" fill sizes="32px" className="object-cover" />
                    </span>
                  ))}
                </span>
                <span className="flex-1">
                  <span className="block font-body text-body font-semibold">{several.label}</span>
                  <span className="block text-small text-[var(--color-text-secondary)]">{several.description}</span>
                </span>
                <span className="text-white transition-colors group-hover:text-forge-600">
                  <Plus />
                </span>
              </Link>
            </li>
          </ul>

          <p className="relative mt-[var(--space-4)] flex items-center gap-2 border-t border-white/10 px-1 pt-[var(--space-4)] text-small font-semibold">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0 text-success-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 8.5 3 3 7-7" />
            </svg>
            Nothing goes to bulk until you approve it.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Plus() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 shrink-0 transition-transform duration-200 group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}
