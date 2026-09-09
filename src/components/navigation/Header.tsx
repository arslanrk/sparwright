"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/foundation/Button";
import { Container } from "@/components/foundation/Container";
import { Logo } from "@/components/foundation/Logo";
import { cn } from "@/lib/cn";
import { MobileNavigation } from "./MobileNavigation";
import {
  HEADER_CTA,
  PRIMARY_NAV,
  isActivePath,
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
        <div className="flex h-[var(--header-height)] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Sparwright — home"
            className="shrink-0 rounded-sm"
          >
            <Logo variant="primary" clearSpace={false} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {PRIMARY_NAV.map((item) =>
                item.children ? (
                  <li key={item.href}>
                    <ProductsMenu item={item} pathname={pathname} />
                  </li>
                ) : (
                  <li key={item.href}>
                    <NavItemLink item={item} pathname={pathname} />
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Button href={HEADER_CTA.href} variant="primary">
              {HEADER_CTA.label}
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={drawerOpen}
            aria-controls={drawerId}
            onClick={() => setDrawerOpen((open) => !open)}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-[var(--color-text)] lg:hidden"
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

const NAV_ITEM =
  "inline-flex items-center gap-1.5 rounded-md px-3 py-2 font-body text-[0.9375rem] font-medium " +
  "text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)] " +
  "aria-[current=page]:font-semibold aria-[current=page]:text-[var(--color-text)]";

function NavItemLink({ item, pathname }: { item: NavLink; pathname: string }) {
  const active = isActivePath(pathname, item.href);
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={NAV_ITEM}
    >
      {item.label}
    </Link>
  );
}

/**
 * The Products dropdown (§08). Opens on click or hover, closes on Escape,
 * outside click, or focus leaving the group — so it is fully operable without
 * a mouse (§12).
 */
function ProductsMenu({
  item,
  pathname,
}: {
  item: PrimaryNavItem;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const links = item.children ?? [];
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
      className="relative"
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
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={active ? "page" : undefined}
        onClick={() => setOpen((value) => !value)}
        className={NAV_ITEM}
      >
        {item.label}
        <Chevron open={open} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full w-[19rem] pt-2"
      >
        <ul className="rounded-lg border border-[var(--color-border)] bg-[var(--color-white)] p-2 shadow-[var(--shadow-overlay)]">
          {links.map((link) => (
            <li key={link.href}>
              <DropdownLink
                link={link}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            </li>
          ))}
          <li className="mt-1 border-t border-[var(--color-border)] pt-1">
            <DropdownLink
              link={{ label: "View All Products", href: item.href }}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          </li>
        </ul>
      </div>
    </div>
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
  const active = isActivePath(pathname, link.href);
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block rounded-md px-3 py-2.5 transition-colors hover:bg-[var(--color-bone-50)]",
        active && "bg-[var(--color-bone-50)]",
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
