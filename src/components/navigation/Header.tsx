"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/foundation/Button";
import { Container } from "@/components/foundation/Container";
import { Logo } from "@/components/foundation/Logo";
import { cn } from "@/lib/cn";
import { MobileNavigation } from "./MobileNavigation";
import { CTA } from "@/components/foundation/cta";
import {
  HEADER_CTA,
  MEGA_MENU,
  PRIMARY_NAV,
  isActivePath,
  isCurrentPage,
  type NavLink,
  type PrimaryNavItem,
} from "./nav";

/**
 * Header — Design System §08 Header and navigation.
 *
 * 76px on desktop, 64px on mobile, sticky, white surface with a 1px bottom
 * border. Both heights are published as `--header-height` in globals.css so
 * anchor scrolling and any offset content can read them.
 */
export function Header() {
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerId = useId();

  // A followed link is a successful navigation: close the drawer behind it and
  // hand focus back to the control that opened it.
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <header
      data-theme="white"
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      <Container width="shell">
        <div className="flex h-[var(--header-height)] items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Sparwright — home"
            className="shrink-0 rounded-sm"
          >
            <Logo
              variant="horizontal"
              height={30}
              clearSpace={false}
              decorative
              priority
            />
          </Link>

          {/*
            The full row appears from `xl`. Six items, the logo and the CTA
            need about 1100px; at 1024 they ran 64px past the edge, so the
            drawer serves everything below 1280.
          */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center">
              {PRIMARY_NAV.map((item) =>
                item.children ? (
                  <li key={item.href}>
                    <NavMenu item={item} pathname={pathname} />
                  </li>
                ) : (
                  <li key={item.href}>
                    <NavItemLink item={item} pathname={pathname} />
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="hidden shrink-0 xl:block">
            <Button
              href={HEADER_CTA.href}
              variant="primary"
              className="whitespace-nowrap"
              data-analytics="hero_mockup_click"
              data-analytics-surface="header"
            >
              {HEADER_CTA.label}
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={drawerOpen}
            aria-controls={drawerId}
            onClick={() => setDrawerOpen((open) => !open)}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-[var(--color-text)] xl:hidden"
          >
            <MenuIcon open={drawerOpen} />
            <span className="sr-only">
              {drawerOpen ? "Close menu" : "Menu"}
            </span>
          </button>
        </div>
      </Container>

      <MobileNavigation
        id={drawerId}
        open={drawerOpen}
        pathname={pathname}
        onClose={closeDrawer}
      />
    </header>
  );
}

// Seven items, the logo and the CTA share one row. The header container is
// capped at 1280px, so the row is the same width at every desktop size — the
// type and padding are set to fit it once, rather than growing at 2xl.
const NAV_ITEM =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 font-body text-[0.875rem] font-medium " +
  "text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)] " +
  "data-[active=true]:font-semibold data-[active=true]:text-[var(--color-text)]";

function NavItemLink({ item, pathname }: { item: NavLink; pathname: string }) {
  return (
    <Link
      href={item.href}
      data-active={isActivePath(pathname, item.href)}
      aria-current={isCurrentPage(pathname, item.href) ? "page" : undefined}
      className={NAV_ITEM}
    >
      {item.label}
    </Link>
  );
}

/**
 * The Products mega menu (§08). Opens on click or hover, closes on Escape,
 * outside click, or focus leaving the group — so it is fully operable without
 * a mouse (§12).
 *
 * The panel spans the header rather than hanging off the trigger: it is
 * positioned against the sticky header, which is the nearest positioned
 * ancestor because this group deliberately is not one. The catalogue sits in
 * five columns (`MEGA_MENU`); the full range and the brief sit in a bar
 * underneath.
 *
 * The same component draws a `menu: "list"` section (About Us, Resources) in
 * the same full-width panel, so every dropdown in the header looks alike: the
 * section's heading and intro on the left, its pages in a grid, and the same
 * footer bar with the brief.
 */
function NavMenu({
  item,
  pathname,
}: {
  item: PrimaryNavItem;
  pathname: string;
}) {
  const list = item.menu === "list";
  const [open, setOpen] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const active = isActivePath(pathname, item.href);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!groupRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={groupRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !open) return;
        setOpen(false);
        triggerRef.current?.focus();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <span className="relative inline-flex">
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          data-active={active}
          onClick={() => setOpen((value) => !value)}
          className={NAV_ITEM}
        >
          {item.label}
          <Chevron open={open} />
        </button>
        {/* Hover bridge: covers the strip of header between the trigger and
            the panel, so moving the pointer down does not close the menu. */}
        {open ? (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-full h-[calc(var(--header-height)/2)]"
          />
        ) : null}
      </span>

      {list ? (
        <div
          id={panelId}
          hidden={!open}
          className="absolute inset-x-0 top-full border-y border-[var(--color-border)] bg-[var(--color-white)] shadow-[var(--shadow-overlay)]"
        >
          <Container
            width="shell"
            className="max-h-[calc(100dvh-var(--header-height))] overflow-y-auto py-[var(--space-5)]"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,3fr)] gap-x-[var(--space-7)]">
              {/* The section itself: what it is, and its hub page. */}
              <div>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group/heading flex items-center justify-between gap-2 border-b-2 border-forge-600 pb-2 font-body text-eyebrow uppercase text-forge-700 transition-colors hover:text-ink-950"
                >
                  {item.label}
                  <MenuArrow />
                </Link>
                {item.intro ? (
                  <p className="mt-[var(--space-4)] text-small text-[var(--color-text-secondary)]">
                    {item.intro}
                  </p>
                ) : null}
              </div>

              {/* Its pages, as the catalogue lists products. */}
              <ul className="grid grid-cols-3 gap-x-[var(--space-6)] gap-y-[var(--space-2)]">
                {(item.children ?? []).map((child) => (
                  <li key={child.href}>
                    <DropdownLink
                      link={child}
                      pathname={pathname}
                      onNavigate={() => setOpen(false)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-[var(--space-5)] flex items-center gap-[var(--space-4)] border-t border-[var(--color-border)] pt-[var(--space-4)]">
              <p className="flex-1 text-small text-[var(--color-text-muted)]">
                Every order is made to a specification you approve.
              </p>
              <BriefLink onNavigate={() => setOpen(false)} />
            </div>
          </Container>
        </div>
      ) : (
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-[var(--color-border)] bg-[var(--color-white)] shadow-[var(--shadow-overlay)]"
      >
        <Container
          width="shell"
          className="max-h-[calc(100dvh-var(--header-height))] overflow-y-auto py-[var(--space-5)]"
        >
          <div className="grid grid-cols-5 gap-x-[var(--space-6)]">
            {MEGA_MENU.map((column, i) => (
              <div key={i} className="flex flex-col gap-[var(--space-4)]">
                {column.map((group) => (
                  <div key={group.heading}>
                    {/* A category with its own page links from its heading,
                        with an arrow so it reads as a link. */}
                    {group.href ? (
                      <Link
                        href={group.href}
                        onClick={() => setOpen(false)}
                        className="group/heading flex items-center justify-between gap-2 border-b-2 border-forge-600 pb-2 font-body text-eyebrow uppercase text-forge-700 transition-colors hover:text-ink-950"
                      >
                        {group.heading}
                        <MenuArrow />
                      </Link>
                    ) : (
                      <p className="border-b-2 border-forge-600 pb-2 font-body text-eyebrow uppercase text-forge-700">
                        {group.heading}
                      </p>
                    )}
                    <ul className="mt-2">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-sm py-[0.1875rem] font-body text-small text-[var(--color-text-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-text)] hover:underline"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* The full range, and a way out for anything not listed. The
              product pages themselves are the category headings above. */}
          <div className="mt-[var(--space-5)] flex items-center gap-[var(--space-4)] border-t border-[var(--color-border)] pt-[var(--space-4)]">
            <ul className="flex flex-1 flex-wrap gap-2">
              <li>
                <DropdownLink
                  link={{
                    label: "View All Products",
                    href: item.href,
                    description: "The full range, by collection.",
                  }}
                  pathname={pathname}
                  onNavigate={() => setOpen(false)}
                />
              </li>
            </ul>
            <BriefLink onNavigate={() => setOpen(false)} />
          </div>
        </Container>
      </div>
      )}
    </div>
  );
}

/** The arrow on a panel heading that links to its own page. */
function MenuArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-3.5 shrink-0 transition-transform motion-safe:group-hover/heading:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/** The way out of any panel for a product that is not listed. */
function BriefLink({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Link
      href="/quote"
      onClick={onNavigate}
      className="group shrink-0 rounded-lg bg-ink-950 px-5 py-3.5 text-white transition-colors hover:bg-carbon-900"
    >
      <span className="block text-eyebrow uppercase text-mist-300">
        Not listed?
      </span>
      <span className="mt-0.5 flex items-center gap-2 font-body text-[0.9375rem] font-semibold">
        {CTA.brief}
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
        </svg>
      </span>
    </Link>
  );
}

function DropdownLink({
  link,
  pathname,
  onNavigate,
}: {
  link: NavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const current = isCurrentPage(pathname, link.href);
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={current ? "page" : undefined}
      className={cn(
        "block rounded-md px-3 py-2.5 transition-colors hover:bg-[var(--color-bone-50)]",
        current && "bg-[var(--color-bone-50)]",
      )}
    >
      <span className="block font-body text-[0.9375rem] font-semibold text-[var(--color-text)]">
        {link.label}
      </span>
      {link.description ? (
        <span className="mt-0.5 block text-small text-[var(--color-text-muted)]">
          {link.description}
        </span>
      ) : null}
    </Link>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn(
        "size-3.5 shrink-0 transition-transform",
        open && "rotate-180",
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
      )}
    </svg>
  );
}
