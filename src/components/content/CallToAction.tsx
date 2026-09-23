import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { whatsappHref } from "@/components/navigation/nav";

/**
 * CallToAction — Design System §04 Action band, §08 Button system.
 *
 * The closing band. §04 keeps the Forge band to short conversion moments and
 * forbids long paragraphs on red, so the red side carries only a heading, one
 * supporting line and the actions. What a buyer most needs at this point — what
 * happens after they press the button — sits on a dark "job ticket" beside it,
 * where small text keeps its contrast (white on Forge does not clear 4.5:1 at
 * small sizes).
 *
 * The ticket's steps are the same commitments the rest of the site makes
 * (brief, mockup, approved sample), not a new promise. The dashed lines behind
 * the band and inside the ticket are the stitching motif: decorative, so they
 * are hidden from assistive technology.
 *
 * On the action band the primary button renders inverse and the secondary one
 * picks up the band's white text and border (§08).
 */

type Action = {
  label: string;
  href: string;
  /** The §14 event this action reports. */
  analytics?: string;
  /** Which placement reported it, so this band's clicks are not the hero's. */
  surface?: string;
};

type Step = { title: string; description: string };

type CallToActionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action: Action;
  /** A lighter first step for someone not ready to ask for a quote. */
  secondaryAction?: Action;
  /** What happens after the click. Defaults to the site-wide three. */
  steps?: Step[];
};

const DEFAULT_STEPS: Step[] = [
  {
    title: "Send your brief",
    description: "Product, logo, rough quantity and destination — or whatever you have so far.",
  },
  {
    title: "Approve a mockup",
    description: "See your design on the product before anything is made.",
  },
  {
    title: "Sign off a sample",
    description: "Bulk production starts only against the sample you approve.",
  },
];

export function CallToAction({
  eyebrow = "Start your order",
  title,
  description,
  action,
  secondaryAction,
  steps = DEFAULT_STEPS,
}: CallToActionProps) {
  const whatsapp = whatsappHref();

  return (
    <Section theme="action" width="work" className="relative isolate overflow-hidden">
      <Stitching />

      <div className="grid items-center gap-[var(--space-8)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-[var(--space-9)]">
        <div>
          {/* Ink pill, not white-on-red: 12px type needs the contrast. */}
          <p className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-3 py-1.5 text-eyebrow uppercase text-white">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-forge-600" />
            {eyebrow}
          </p>
          <h2 className="mt-[var(--space-5)] max-w-[16ch] text-heading-1">{title}</h2>
          <p className="mt-[var(--space-4)] max-w-copy text-body-large">{description}</p>

          <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-3">
            <Button
              href={action.href}
              variant="inverse"
              arrow
              data-analytics={action.analytics}
              data-analytics-surface={action.surface}
            >
              {action.label}
            </Button>
            {secondaryAction ? (
              <Button
                href={secondaryAction.href}
                variant="secondary"
                data-analytics={secondaryAction.analytics}
                data-analytics-surface={secondaryAction.surface}
              >
                {secondaryAction.label}
              </Button>
            ) : null}
          </div>

          {/* Only when a real number is configured — never a dead link. */}
          {whatsapp ? (
            <p className="mt-[var(--space-5)] text-body">
              Prefer to talk first?{" "}
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-4"
              >
                Message us on WhatsApp
              </a>
            </p>
          ) : null}
        </div>

        <Ticket steps={steps} />
      </div>
    </Section>
  );
}

/**
 * What happens next, as a job ticket: dark card, stitched inner edge, and a
 * slight tilt from `lg` so it reads as a thing laid on the band rather than
 * another panel. Steps run down a dashed route.
 */
function Ticket({ steps }: { steps: Step[] }) {
  return (
    <div
      data-theme="dark"
      className="relative rounded-2xl bg-[var(--color-bg)] p-[var(--space-6)] text-[var(--color-text)] shadow-[0_30px_60px_-20px_rgb(11_13_16/0.55)] sm:p-[var(--space-7)] lg:-rotate-1"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-2.5 rounded-xl border border-dashed border-white/15"
      />

      <p className="relative text-eyebrow uppercase text-[var(--color-text-muted)]">
        What happens next
      </p>

      <ol className="relative mt-[var(--space-5)]">
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={step.title} className="relative flex gap-[var(--space-4)] pb-[var(--space-5)] last:pb-0">
              {!last ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[1.1875rem] top-11 bottom-1 border-l border-dashed border-white/25"
                />
              ) : null}
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-forge-600 font-display text-small font-bold tabular-nums text-white"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5">
                <p className="font-body text-body font-semibold">{step.title}</p>
                <p className="mt-1 text-small text-[var(--color-text-secondary)]">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="relative mt-[var(--space-6)] flex items-center gap-2 border-t border-white/10 pt-[var(--space-4)] text-small font-semibold">
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-4 shrink-0 text-success-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 8.5 3 3 7-7" />
        </svg>
        Nothing goes to bulk until you approve it.
      </p>
    </div>
  );
}

/** Two long dashed seams sweeping across the band, and a shadow to seat the ticket. */
function Stitching() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <span className="absolute -right-[10%] top-1/2 size-[42rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(11_13_16/0.28),transparent)]" />
      <svg
        // Stretched to fit, so on a tall phone band the seams would turn into
        // near-vertical arcs; they only draw where the band is wide.
        className="absolute inset-0 hidden size-full md:block"
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-40 430 C 240 300, 420 520, 700 360 S 1080 120, 1260 210"
          stroke="rgb(255 255 255 / 0.22)"
          strokeWidth="1.5"
          strokeDasharray="10 9"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M-40 470 C 260 340, 440 560, 720 400 S 1100 160, 1260 250"
          stroke="rgb(255 255 255 / 0.12)"
          strokeWidth="1.5"
          strokeDasharray="10 9"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
