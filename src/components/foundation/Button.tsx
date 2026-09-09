import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Button — Design System §08 Button system, §13 Required component states.
 *
 * Labels are locked: import them from `./cta`. §08 rules out "Submit",
 * "Click Here", "Discover More", "Let's Go" and "Shop Now".
 */

export type ButtonVariant = "primary" | "secondary" | "inverse" | "text";

/** 52px height, 6px radius, Inter 600 (§08, §13). */
const BASE =
  "group inline-flex items-center justify-center gap-2 rounded-md font-body text-[0.9375rem] font-semibold leading-none " +
  "transition-colors motion-safe:transition-transform " +
  "disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45";

const SIZED = "min-h-[3.25rem] px-6";

const VARIANTS: Record<ButtonVariant, string> = {
  // Forge fill, white text.
  primary: `${SIZED} bg-forge-600 text-white hover:bg-forge-700`,
  // Transparent surface, Ink border and text.
  secondary: `${SIZED} border border-ink-950 bg-transparent text-ink-950 hover:bg-ink-950 hover:text-white`,
  // White fill for dark surfaces and the action band.
  inverse: `${SIZED} bg-white text-ink-950 hover:bg-bone-50`,
  // Visible arrow or underline, no box.
  text: "text-ink-950 underline-offset-4 hover:text-forge-700 hover:underline",
};

type BaseProps = {
  variant?: ButtonVariant;
  /** Trailing arrow. It translates 2px on hover (§07 approved motion). */
  arrow?: boolean;
  /** Progress without losing context (§13). Also disables the control. */
  loading?: boolean;
  loadingLabel?: string;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps | "href"> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    arrow = false,
    loading = false,
    loadingLabel = "Loading",
    children,
    className,
    ...rest
  } = props;

  const classes = cn(BASE, VARIANTS[variant], className);

  const content = (
    <>
      {loading ? <Spinner /> : null}
      <span>{children}</span>
      {arrow && !loading ? <Arrow /> : null}
      {/* The spinner alone cannot carry the state: the global
          prefers-reduced-motion rule stops it, and §12 forbids status
          communicated by appearance only. */}
      {loading ? (
        <span role="status" className="sr-only">
          {loadingLabel}
        </span>
      ) : null}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkProps } = rest as ComponentPropsWithoutRef<
      typeof Link
    > & { href: string };
    return (
      <Link
        href={href}
        {...linkProps}
        className={classes}
        aria-disabled={loading || undefined}
        aria-busy={loading || undefined}
      >
        {content}
      </Link>
    );
  }

  const { type = "button", disabled, ...buttonProps } =
    rest as ComponentPropsWithoutRef<"button">;

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
    >
      {content}
    </button>
  );
}

function Arrow() {
  return (
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
  );
}

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4 shrink-0 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="8" cy="8" r="6" className="opacity-30" />
      <path d="M14 8a6 6 0 0 0-6-6" strokeLinecap="round" />
    </svg>
  );
}
