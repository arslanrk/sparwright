import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";
import { Container } from "@/components/foundation/Container";
import { Eyebrow } from "@/components/foundation/SectionHeader";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { CONTACT } from "@/components/navigation/nav";
import { ACCEPTED_ARTWORK_LABEL, quoteIntent, quotePrefill, type QuoteIntent } from "@/lib/quote";

/**
 * Quote and mockup request — Design System §08 Quote and mockup form,
 * §14 Manual-first workflow, §06 Layout.
 *
 * One job on the page: send a request that a person can answer. Nothing here
 * promises a price, a preview date or a response time — §14 keeps the
 * workflow manual until demand is proven, and non-negotiable #6 rules out
 * publishing lead times.
 *
 * Laid out as the form and a sidebar rather than a lone 640px column: on a
 * desktop the column left two-thirds of the screen empty, and the buyer's
 * other questions — what happens after I send this, what should I have ready,
 * can I just email — had nowhere to go but below the form, where nobody reads
 * them. The sidebar sits beside the form from `lg` and below it on a phone.
 *
 * Both entry points use the same form (§14). The header's words and the final
 * button follow `?intent=`, so a buyer who clicked "Request Your Mockup" lands
 * on a page that says mockup, and the switch lets them change their mind.
 */

export const metadata: Metadata = pageMetadata({
  path: "/quote",
  title: "Request a Quote or Mockup",
  description:
    "Send your product, logo, quantity and destination for a custom manufacturing quote or a mockup. A person reviews every request — no automated prices.",
});

const HEADER: Record<QuoteIntent, { eyebrow: string; title: string; description: string }> = {
  mockup: {
    eyebrow: "Mockup request",
    title: "Request your mockup.",
    description:
      "Tell us the product and send your logo. We come back with a mockup of your design, then a physical sample for you to approve before anything goes to bulk.",
  },
  quote: {
    eyebrow: "Manufacturing quote",
    title: "Get a manufacturing quote.",
    description:
      "Tell us the product, a rough quantity and where it ships. A person reads every request and replies with a quote, or with the questions that decide one.",
  },
};

/** Commitments the rest of the site already makes — nothing new (#5, #6). */
const ASSURANCES = [
  "Read by a person, not priced by a bot",
  "Sample approved before bulk",
  "Artwork and specs kept for reorders",
];

const NEXT_STEPS: Record<QuoteIntent, string[]> = {
  mockup: [
    "A person reads your request and checks your artwork against the branding method.",
    "We send a mockup of your product, with any questions that need your decision.",
    "Once the design is right, a physical sample is made for you to approve.",
  ],
  quote: [
    "A person reads your request — nothing here is automated.",
    "We reply with a quote, or with the questions that decide one: materials, method, minimums.",
    "If a sample is the right next step, we confirm what it involves before you commit.",
  ],
};

const HAVE_TO_HAND = [
  "The product and a rough quantity",
  `Your logo — ${ACCEPTED_ARTWORK_LABEL}`,
  "Colours, or a product you want to match",
  "Where the order ships to",
];

export default async function QuotePage({ searchParams }: PageProps<"/quote">) {
  const { product, intent: rawIntent } = await searchParams;
  const intent = quoteIntent(rawIntent);
  const header = HEADER[intent];

  // The switch keeps the product the buyer arrived with.
  const productName = Array.isArray(product) ? product[0] : product;
  const productQuery = productName ? `product=${encodeURIComponent(productName)}` : "";
  const hrefFor = (target: QuoteIntent) => {
    const query = [target === "mockup" ? "intent=mockup" : "", productQuery]
      .filter(Boolean)
      .join("&");
    return query ? `/quote?${query}` : "/quote";
  };

  return (
    <>
      {/* Dark, like the other interior heroes, so the page reads as part of the
          site rather than a detached form; short, so the form starts high. */}
      <section data-theme="dark" className="bg-[var(--color-bg)] text-[var(--color-text)]">
        {/* Bottom padding clears the form, which rises --space-8 into it. */}
        <Container
          width="work"
          className="pb-[calc(var(--space-8)+var(--space-7))] pt-[var(--space-6)]"
        >
          <Breadcrumb items={[{ label: "Request a Quote or Mockup" }]} />

          <div className="mt-[var(--space-7)] grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-copy">
              <Eyebrow>{header.eyebrow}</Eyebrow>
              <h1 className="mt-4 text-heading-1">{header.title}</h1>
              <p className="mt-4 text-body-large text-[var(--color-text-secondary)]">
                {header.description}
              </p>
            </div>

            <IntentSwitch intent={intent} hrefFor={hrefFor} />
          </div>

          {/* From `sm` only: stacked on a phone the three lines pushed the
              form a screen down, and the sidebar below it says the same. */}
          <ul className="mt-[var(--space-7)] hidden flex-wrap gap-x-[var(--space-6)] gap-y-3 border-t border-[var(--color-border)] pt-[var(--space-5)] sm:flex">
            {ASSURANCES.map((line) => (
              <li key={line} className="flex items-center gap-2 text-small text-[var(--color-text-secondary)]">
                <TickIcon className="text-forge-600" />
                {line}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Not a <Section>: its top padding scales with the viewport, and the
          form has to rise a fixed distance into the dark band above. */}
      <section
        data-theme="light"
        className="bg-[var(--color-bg)] pb-[clamp(3.5rem,8vw,7rem)] text-[var(--color-text)]"
      >
        <Container width="work">
          {/* The form rises into the dark band so the two read as one surface,
              and the first field sits closer to the top of the screen. */}
          <div className="relative -mt-[var(--space-8)] grid items-start gap-[var(--space-7)] lg:grid-cols-[minmax(0,1fr)_20rem]">
            <QuoteForm
              key={intent}
              initialValues={quotePrefill(product)}
              intent={intent}
            />
  
            {/* Starts below the dark band on a desktop, beside the form. */}
            <aside
              aria-label="About your request"
              className="flex flex-col gap-[var(--space-5)] lg:sticky lg:top-28 lg:mt-[calc(var(--space-8)+var(--space-6))]"
            >
              <SideCard title="What happens next">
                <ol className="mt-4 flex flex-col gap-4">
                  {NEXT_STEPS[intent].map((line, index) => (
                    <li key={line} className="flex gap-3 text-small text-[var(--color-text-secondary)]">
                      <span className="font-display text-body font-bold tabular-nums text-forge-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ol>
              </SideCard>
  
              <SideCard title="Useful to have to hand">
                <ul className="mt-4 flex flex-col gap-2.5">
                  {HAVE_TO_HAND.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-small text-[var(--color-text-secondary)]">
                      <TickIcon className="mt-0.5 text-success-600" />
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-small text-[var(--color-text-muted)]">
                  Missing something? Send what you have — we ask for the rest.
                </p>
              </SideCard>
  
              <SideCard title="Prefer email?">
                <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                  Send the same details and we pick it up from there.
                </p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  data-analytics="email_click"
                  className="mt-3 inline-flex items-center gap-2 rounded-sm font-body text-small font-semibold text-[var(--color-text)] underline underline-offset-4 hover:text-forge-700"
                >
                  {CONTACT.email}
                </a>
              </SideCard>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

/**
 * Mockup or quote. Links, not buttons: each is a real URL the buyer can
 * share, and the form below follows it (`key={intent}` resets its copy).
 */
function IntentSwitch({
  intent,
  hrefFor,
}: {
  intent: QuoteIntent;
  hrefFor: (target: QuoteIntent) => string;
}) {
  const options: { value: QuoteIntent; label: string }[] = [
    { value: "mockup", label: "Request a mockup" },
    { value: "quote", label: "Get a quote" },
  ];
  return (
    <nav aria-label="Request type">
      <ul className="inline-flex rounded-full border border-[var(--color-border)] bg-white/5 p-1">
        {options.map((option) => {
          const active = option.value === intent;
          return (
            <li key={option.value}>
              <Link
                href={hrefFor(option.value)}
                aria-current={active ? "page" : undefined}
                scroll={false}
                className={cn(
                  "inline-flex rounded-full px-4 py-2 font-body text-small font-semibold transition-colors",
                  active
                    ? "bg-white text-ink-950"
                    : "text-[var(--color-text-secondary)] hover:text-white",
                )}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SideCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]">
      <h2 className="font-body text-body font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function TickIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn("size-4 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}
