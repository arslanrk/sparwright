import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Breadcrumb — Design System §08 navigation, §11 product and audience pages.
 *
 * Home is always the first crumb; the last item is the current page and is not
 * a link (§12: `aria-current` carries the state, not styling alone).
 */

export type Crumb = { label: string; href?: string };

type BreadcrumbProps = {
  items: Crumb[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("font-body text-small", className)}
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li
              key={`${crumb.label}-${index}`}
              className="flex items-center gap-x-2"
            >
              {last || !crumb.href ? (
                <span
                  aria-current={last ? "page" : undefined}
                  className="text-[var(--color-text)]"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="inline-flex min-h-6 items-center rounded-sm text-[var(--color-text-muted)] underline-offset-4 transition-colors hover:text-[var(--color-text)] hover:underline"
                >
                  {crumb.label}
                </Link>
              )}
              {last ? null : (
                <span
                  aria-hidden="true"
                  className="text-[var(--color-text-muted)]"
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
