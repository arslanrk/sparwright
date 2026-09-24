import Link from "next/link";
import { Container } from "@/components/foundation/Container";
import { Logo } from "@/components/foundation/Logo";
import { cn } from "@/lib/cn";
import { SITE_DESCRIPTION } from "@/lib/site";
import {
  CONTACT,
  FOOTER_COLUMNS,
  LEGAL_LINKS,
  SOCIAL_LINKS,
  whatsappHref,
  type SocialNetwork,
} from "./nav";

/**
 * Footer — Design System §08 Footer, §04 dark theme recipe.
 *
 * Brand block, three link columns and the legal row. The legal pages ship in
 * PR 10; the links are in place so the routes have somewhere to land.
 */
export function Footer() {
  const year = new Date().getFullYear();
  // §14 secondary contact. Absent until a real number is configured.
  const whatsapp = whatsappHref();

  return (
    <footer
      data-theme="dark"
      className="bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      <Container width="shell" className="py-[var(--space-9)]">
        {/*
          Brand block, then five link columns. The brand spans the full row up
          to `xl` and sits beside the columns from there — five columns and a
          brand block do not fit side by side any narrower.
        */}
        <div className="grid grid-cols-2 gap-x-[var(--space-6)] gap-y-[var(--space-7)] md:grid-cols-3 xl:grid-cols-[minmax(0,1.7fr)_repeat(5,minmax(0,1fr))]">
          <div className="col-span-full xl:col-span-1 xl:pr-[var(--space-5)]">
            <Logo
              variant="primary"
              tone="inverse"
              height={72}
              clearSpace={false}
            />
            {/* The one positioning line, shared with the meta description and
                the Open Graph card so the three cannot drift apart. */}
            <p className="mt-[var(--space-4)] max-w-[34ch] text-body text-[var(--color-text-secondary)]">
              {SITE_DESCRIPTION}
            </p>
            <p className="mt-[var(--space-4)] text-small text-[var(--color-text-muted)]">
              {CONTACT.location}
            </p>
            <SocialLinks className="mt-[var(--space-5)]" />
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="flex items-center gap-2 font-body text-eyebrow uppercase text-[var(--color-text-muted)]">
                <span aria-hidden="true" className="h-0.5 w-4 rounded-full bg-forge-600" />
                {column.heading}
              </h2>
              <ul className="mt-[var(--space-4)] flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.href}-${link.label}`}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
                {column.heading === "Contact" && whatsapp ? (
                  <li>
                    <FooterLink href={whatsapp}>WhatsApp</FooterLink>
                  </li>
                ) : null}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-[var(--space-8)] flex flex-col gap-4 border-t border-[var(--color-border)] pt-[var(--space-5)] text-small text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} Sparwright. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

/**
 * Social profiles as a row of ringed icons. A network with no URL yet renders
 * as a dummy `#` link, so the row is in place and only the addresses change
 * when the accounts are created (see `SOCIAL_LINKS`). Real ones open in a new
 * tab. 40px targets clear WCAG 2.5.8 comfortably.
 */
function SocialLinks({ className }: { className?: string }) {
  return (
    <ul aria-label="Sparwright on social media" className={cn("flex flex-wrap gap-2", className)}>
      {SOCIAL_LINKS.map((social) => {
        const live = social.href !== "";
        return (
          <li key={social.network}>
            <a
              href={live ? social.href : "#"}
              aria-label={social.label}
              {...(live
                ? { target: "_blank", rel: "noopener noreferrer" }
                : { "data-placeholder": "social" })}
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-[var(--color-text-secondary)] transition-colors hover:border-white hover:bg-white hover:text-ink-950"
            >
              <SocialIcon network={social.network} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function SocialIcon({ network }: { network: SocialNetwork }) {
  const common = {
    "aria-hidden": true as const,
    viewBox: "0 0 24 24",
    className: "size-[1.125rem]",
  };

  switch (network) {
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M14 8h3V4.5h-3c-2.5 0-4 1.6-4 4V11H7.5v3.5H10V21h3.5v-6.5h3l.5-3.5h-3.5V9c0-.6.4-1 1-1Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common} fill="currentColor">
          <path d="M16 3c.3 2.2 1.8 3.8 4 4v3c-1.5 0-2.9-.5-4-1.3V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .7 0 1 .1v3.1a2.5 2.5 0 1 0 1.5 2.3V3Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} fill="currentColor">
          <path
            fillRule="evenodd"
            d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3Z"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <circle cx="6.5" cy="6.5" r="1.75" />
          <rect x="5" y="9.5" width="3" height="9.5" rx="0.5" />
          <path d="M11 9.5h3v1.4c.5-.9 1.7-1.6 3.1-1.6 2.6 0 3.4 1.7 3.4 4.2V19h-3v-4.8c0-1.2-.3-2.1-1.5-2.1s-2 .9-2 2.2V19h-3Z" />
        </svg>
      );
  }
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  // min-h-6 is WCAG 2.5.8's 24px minimum target; these are listed links, not
  // links inside a sentence, so the inline exception does not apply.
  const className =
    "inline-flex min-h-6 items-center rounded-sm font-body text-small text-[var(--color-text-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-white)] hover:underline";

  // §14 measures both contact routes out of the site.
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} data-analytics="email_click" className={className}>
        {children}
      </a>
    );
  }

  if (href.startsWith("https://wa.me/")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics="whatsapp_click"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
