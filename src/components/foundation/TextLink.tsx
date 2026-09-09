import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/**
 * TextLink — Design System §08 (text link) and §07 (approved motion).
 *
 * Always carries a visible affordance: an arrow by default, an underline when
 * the arrow is switched off. §08 requires an unambiguous label — "Explore
 * Custom Gloves", not "Read more".
 */

type TextLinkProps = {
  href: string;
  /** Trailing arrow, translated 2px on hover. */
  arrow?: boolean;
  /** Opens in a new tab and marks the link up accordingly. */
  external?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

export function TextLink({
  href,
  arrow = true,
  external = false,
  className,
  children,
  ...rest
}: TextLinkProps) {
  const classes = cn(
    "group inline-flex items-center gap-1.5 font-body text-[0.9375rem] font-semibold",
    "text-[var(--color-text)] underline-offset-4 transition-colors hover:text-[var(--color-link-hover)]",
    arrow ? "hover:underline" : "underline",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-4 shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
        </svg>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} {...rest} className={classes}>
      {content}
    </Link>
  );
}
