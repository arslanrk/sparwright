import type { ReactNode } from "react";
import { Section, type SectionTheme } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";

/**
 * WhyUs — the reasons to choose Sparwright, as a plain two-column list.
 *
 * Deliberately simple: a centred heading, then each reason as an icon, a title
 * and one or two lines. The page around it already carries the photography and
 * the interaction; this section's job is to be read in a glance.
 *
 * Non-negotiables #5, #6 and #12 rule out invented stats, clients,
 * certifications and testimonials, so every reason is a commitment already
 * made elsewhere on the site — Sialkot and ten years on /manufacturing, the
 * sample, specification, reorder and reply commitments in the FAQ.
 */

export type WhyUsIcon =
  | "location"
  | "sample"
  | "spec"
  | "range"
  | "reorder"
  | "person";

export type WhyUsReason = {
  icon: WhyUsIcon;
  title: string;
  description: string;
};

type WhyUsProps = {
  theme?: SectionTheme;
  eyebrow: string;
  /** Section number on its page, shown in the eyebrow. */
  index?: string;
  title: string;
  description: string;
  reasons: WhyUsReason[];
};

export function WhyUs({
  theme = "white",
  eyebrow,
  index,
  title,
  description,
  reasons,
}: WhyUsProps) {
  return (
    <Section theme={theme} width="work">
      <div className="mx-auto max-w-[48rem] text-center [&_p]:mx-auto">
        <SectionHeader eyebrow={eyebrow} index={index} title={title} description={description} />
      </div>

      <ul className="mx-auto mt-[var(--space-8)] grid max-w-[64rem] gap-x-[var(--space-8)] gap-y-[var(--space-7)] md:grid-cols-2">
        {reasons.map((reason) => (
          <li key={reason.title} className="flex gap-[var(--space-5)]">
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-forge-100 text-forge-700"
            >
              {ICONS[reason.icon]}
            </span>
            <div>
              <h3 className="font-body text-body-large font-semibold leading-snug text-[var(--color-text)]">
                {reason.title}
              </h3>
              <p className="mt-2 text-body text-[var(--color-text-secondary)]">
                {reason.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* One line family, 1.75px stroke, currentColor — as the rest of the site. */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[1.375rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const ICONS: Record<WhyUsIcon, ReactNode> = {
  // A pin: made in one place, Sialkot.
  location: (
    <Icon>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Icon>
  ),
  // A tag, signed off.
  sample: (
    <Icon>
      <path d="M20.5 13.5 13 21a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 2.6 12l.4-7a2 2 0 0 1 2-1.9l7-.4a2 2 0 0 1 1.5.6l7 7a2 2 0 0 1 0 2.8Z" />
      <path d="m9.5 12.5 2 2 4-4" />
    </Icon>
  ),
  // Sliders: the choices are yours.
  spec: (
    <Icon>
      <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="10" cy="12" r="2" />
      <circle cx="18" cy="18" r="2" />
    </Icon>
  ),
  // Stacked layers: one identity across the range.
  range: (
    <Icon>
      <path d="M12 3 3 7.5l9 4.5 9-4.5Z" />
      <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
    </Icon>
  ),
  // A loop: the reorder comes back to the same reference.
  reorder: (
    <Icon>
      <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" />
      <path d="M4 3.5V8h4.5" />
      <path d="M4 13a8 8 0 0 0 14.3 4.9L20 16" />
      <path d="M20 20.5V16h-4.5" />
    </Icon>
  ),
  // A speech bubble: a person replies.
  person: (
    <Icon>
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l.9-4.4A8 8 0 1 1 20 12Z" />
      <path d="M8.5 11h7M8.5 14h4" />
    </Icon>
  ),
};
