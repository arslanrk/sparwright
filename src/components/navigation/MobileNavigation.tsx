"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/foundation/Button";
import { Logo } from "@/components/foundation/Logo";
import { cn } from "@/lib/cn";
import {
  HEADER_CTA,
  MEGA_MENU,
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
    <div id={id} hidden={!open} className="xl:hidden">
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
                  <>
                    <ul className="flex flex-col">
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
                    {/* The catalogue belongs to Products only. */}
                    {item.menu === "mega" ? (
                      <CatalogueSections onNavigate={onClose} />
                    ) : null}
                  </>
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
            data-analytics="hero_mockup_click"
            data-analytics-surface="drawer"
          >
            {HEADER_CTA.label}
          </Button>
        </div>

        <div className="mt-[var(--space-7)]">
          <Logo variant="horizontal" height={28} clearSpace={false} />
        </div>
      </div>
    </div>
  );
}

/**
 * The desktop mega menu's catalogue, for the drawer. Seventy-odd links in one
 * list would bury everything under Products, so each category is a native
 * `<details>` that opens on its own, one at a time (shared `name`). Same data
 * as the mega menu, so the two cannot disagree about what is listed or where
 * it goes.
 */
function CatalogueSections({ onNavigate }: { onNavigate: () => void }) {
  const groups = MEGA_MENU.flat();

  return (
    <div className="mb-3 mt-2 pl-4">
      <p className="pb-2 text-eyebrow uppercase text-[var(--color-text-muted)]">
        Browse by category
      </p>
      <div className="flex flex-col border-t border-[var(--color-border)]">
        {groups.map((group) => (
          <details
            key={group.heading}
            name="drawer-catalogue"
            className="group border-b border-[var(--color-border)]"
          >
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-body text-body font-semibold text-[var(--color-text)] [&::-webkit-details-marker]:hidden">
              <span>
                {group.heading}
                <span className="ml-2 text-small font-medium tabular-nums text-[var(--color-text-muted)]">
                  {group.links.length}
                </span>
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="size-4 shrink-0 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </summary>
            <ul className="grid grid-cols-1 pb-3 sm:grid-cols-2 sm:gap-x-6">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    // 44px targets: denser than the 48px primary rows, still
                    // clear of WCAG 2.5.8's 24px minimum by a wide margin.
                    className="flex min-h-11 items-center rounded-md text-small text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-3 xl:hidden"
    >
      <Button
        href={HEADER_CTA.href}
        variant="primary"
        className="w-full"
        data-analytics="hero_mockup_click"
        data-analytics-surface="action_bar"
      >
        {HEADER_CTA.label}
      </Button>
    </div>
  );
}
