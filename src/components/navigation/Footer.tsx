import Link from "next/link";
import { Container } from "@/components/foundation/Container";
import { Logo } from "@/components/foundation/Logo";
import { CONTACT, FOOTER_COLUMNS, LEGAL_LINKS } from "./nav";

/**
 * Footer — Design System §08 Footer, §04 dark theme recipe.
 *
 * Brand block, three link columns and the legal row. The legal pages ship in
 * PR 10; the links are in place so the routes have somewhere to land.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-theme="dark"
      className="bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      <Container width="shell" className="py-[var(--space-9)]">
        <div className="grid gap-[var(--space-7)] md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="primary" tone="inverse" clearSpace={false} />
            <p className="mt-[var(--space-4)] max-w-[34ch] text-body text-[var(--color-text-secondary)]">
              Boxing gloves, fightwear and club apparel manufactured in Sialkot
              with your logo, colours and specifications.
            </p>
            <p className="mt-[var(--space-4)] text-small text-[var(--color-text-muted)]">
              {CONTACT.location}
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-body text-eyebrow uppercase text-[var(--color-text-muted)]">
                {column.heading}
              </h2>
              <ul className="mt-[var(--space-4)] flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.href}-${link.label}`}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
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

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const className =
    "rounded-sm font-body text-small text-[var(--color-text-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-white)] hover:underline";

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={className}>
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
