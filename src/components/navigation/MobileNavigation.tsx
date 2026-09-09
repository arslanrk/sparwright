"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/foundation/Button";
import { Logo } from "@/components/foundation/Logo";
import { cn } from "@/lib/cn";
import {
  HEADER_CTA,
  PRIMARY_NAV,
  isActivePath,
  isCurrentPage,
  type NavLink,
} from "./nav";

/**
 * MobileNavigation — Design System §08 Header and navigation, §12 accessibility.
 *
 * A full-height drawer below the 64px mobile header, plus the sticky bottom
 * action bar that keeps the primary conversion in reach on every page. The bar
 * publishes its height as `--action-bar-height`; anything else fixed to the
 * bottom of the viewport — the cookie banner, and the WhatsApp launcher when it
 * lands — offsets against that token so nothing ever overlaps it (§08).
 */

type MobileNavigationProps = {
  id: string;
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export function MobileNavigation({
  id,
  open,
  pathname,
  onClose,
}: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // The page behind a modal drawer must not scroll.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus into the drawer on open; Header returns it to the trigger.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
  }, [open]);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;

    // Keep Tab inside the drawer while it is open (§12).
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement;

    if (
      event.shiftKey &&
      (activeElement === first || activeElement === panelRef.current)
    ) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div id={id} hidden={!open} className="lg:hidden">
      {/* Scrim. Tapping outside the panel closes the drawer. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[rgb(11_13_16/0.5)]"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        data-theme="white"
        className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-50 overflow-y-auto bg-[var(--color-bg)] px-5 pb-[var(--space-8)] pt-[var(--space-5)] text-[var(--color-text)]"
      >
        <nav aria-label="Primary">
          <ul className="flex flex-col">
            {PRIMARY_NAV.map((item) => (
              <li
                key={item.href}
                className="border-b border-[var(--color-border)] py-1"
              >
                <DrawerLink
                  link={item}
                  pathname={pathname}
                  level="primary"
                  onNavigate={onClose}
                />
                {item.children ? (
                  <ul className="mb-2 flex flex-col">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <DrawerLink
                          link={child}
                          pathname={pathname}
                          level="child"
                          onNavigate={onClose}
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-[var(--space-6)]">
          <Button
            href={HEADER_CTA.href}
            variant="primary"
            className="w-full"
            onClick={onClose}
          >
            {HEADER_CTA.label}
          </Button>
        </div>

        <div className="mt-[var(--space-7)]">
          <Logo variant="wordmark" clearSpace={false} />
        </div>
      </div>
    </div>
  );
}

function DrawerLink({
  link,
  pathname,
  level,
  onNavigate,
}: {
  link: NavLink;
  pathname: string;
  level: "primary" | "child";
  onNavigate: () => void;
}) {
  const active = isActivePath(pathname, link.href);
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={isCurrentPage(pathname, link.href) ? "page" : undefined}
      className={cn(
        // 48px minimum target on a 360px screen (§12).
        "flex min-h-12 items-center rounded-md font-body",
        level === "primary"
          ? "text-heading-4 font-semibold text-[var(--color-text)]"
          : "pl-4 text-body text-[var(--color-text-secondary)]",
        active && "text-[var(--color-action-text)]",
      )}
    >
      {link.label}
    </Link>
  );
}

/**
 * Sticky bottom action bar (§08). Mobile only — the desktop header already
 * carries the same action.
 */
export function MobileActionBar() {
  return (
    <div
      data-theme="white"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-3 lg:hidden"
    >
      <Button href={HEADER_CTA.href} variant="primary" className="w-full">
        {HEADER_CTA.label}
      </Button>
    </div>
  );
}
