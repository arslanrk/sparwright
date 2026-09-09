"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/foundation/Button";

/**
 * CookieBanner — Design System §08 overlays, §11 legal row.
 *
 * Built here with the navigation shell; PR 10 writes the policy it links to and
 * mounts it in the root layout. It sits above the sticky mobile action bar by
 * offsetting against `--action-bar-height`, so the two never overlap (§08).
 *
 * The choice is stored per browser and sent nowhere. Nothing beyond essential
 * storage is used until PR 12 wires analytics, at which point this decision is
 * what gates it.
 */

const STORAGE_KEY = "sparwright.cookie-consent";

export type CookieConsent = "accepted" | "essential";

/**
 * `unknown` is the server and hydration value — the store cannot be read there,
 * so the banner renders nothing until the browser has answered.
 */
type ConsentState = CookieConsent | "undecided" | "unknown";

const listeners = new Set<() => void>();
let cached: ConsentState | null = null;

function readStore(): ConsentState {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "accepted" || stored === "essential"
      ? stored
      : "undecided";
  } catch {
    // Storage can be blocked outright; that is not a recorded decision.
    return "undecided";
  }
}

/** Cached so repeated reads return a stable value, as the hook requires. */
function getSnapshot(): ConsentState {
  cached ??= readStore();
  return cached;
}

function getServerSnapshot(): ConsentState {
  return "unknown";
}

function emit() {
  cached = null;
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  // Another tab deciding counts as a decision here too.
  window.addEventListener("storage", emit);
  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) window.removeEventListener("storage", emit);
  };
}

/** Read the recorded decision outside React — PR 12 gates analytics on this. */
export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const state = readStore();
  return state === "accepted" || state === "essential" ? state : null;
}

export function setCookieConsent(consent: CookieConsent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // A blocked store still dismisses the banner for this page view.
  }
  emit();
}

export function useCookieConsent(): ConsentState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

type CookieBannerProps = {
  /** Policy page — shipped in PR 10. */
  policyHref?: string;
  description?: string;
  onDecision?: (consent: CookieConsent) => void;
};

export function CookieBanner({
  policyHref = "/cookies",
  description = "We use essential cookies to run this site, and analytics cookies to understand which products buyers look at.",
  onDecision,
}: CookieBannerProps) {
  const consent = useCookieConsent();

  function decide(value: CookieConsent) {
    setCookieConsent(value);
    onDecision?.(value);
  }

  if (consent !== "undecided") return null;

  return (
    <div
      role="region"
      aria-label="Cookie choices"
      data-theme="white"
      className="fixed inset-x-0 bottom-[var(--action-bar-height)] z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] shadow-[var(--shadow-overlay)]"
    >
      <div className="mx-auto flex w-full max-w-shell flex-col gap-4 px-5 py-[var(--space-5)] md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <p className="max-w-[68ch] text-small text-[var(--color-text-secondary)]">
          {description}{" "}
          <Link
            href={policyHref}
            className="rounded-sm font-semibold text-[var(--color-text)] underline underline-offset-4"
          >
            Cookie policy
          </Link>
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button variant="secondary" onClick={() => decide("essential")}>
            Essential Only
          </Button>
          <Button variant="primary" onClick={() => decide("accepted")}>
            Accept Cookies
          </Button>
        </div>
      </div>
    </div>
  );
}
