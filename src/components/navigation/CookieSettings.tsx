"use client";

import { Button } from "@/components/foundation/Button";
import { cn } from "@/lib/cn";
import {
  setCookieConsent,
  useCookieConsent,
  type CookieConsent,
} from "./CookieBanner";

/**
 * CookieSettings — Design System §11 Legal row ("cookie settings").
 *
 * The control that makes the choice reversible. It reads the same store the
 * banner writes, so changing the setting here dismisses or re-arms the banner
 * without a reload.
 *
 * Renders nothing until the browser has answered, because the stored choice
 * cannot be read on the server without a hydration mismatch.
 */

const LABELS: Record<CookieConsent, string> = {
  accepted: "Analytics cookies accepted",
  essential: "Essential cookies only",
};

export function CookieSettings({ className }: { className?: string }) {
  const consent = useCookieConsent();

  if (consent === "unknown") return null;

  const decided = consent !== "undecided";

  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]",
        className,
      )}
    >
      <h2 className="font-body text-body font-semibold">Your cookie choice</h2>
      <p className="mt-2 text-body text-[var(--color-text-secondary)]">
        {decided
          ? `Current setting: ${LABELS[consent]}.`
          : "You have not made a choice yet."}
      </p>
      <div className="mt-[var(--space-5)] flex flex-wrap gap-3">
        <Button
          variant={consent === "essential" ? "primary" : "secondary"}
          onClick={() => setCookieConsent("essential")}
          aria-pressed={consent === "essential"}
        >
          Essential Only
        </Button>
        <Button
          variant={consent === "accepted" ? "primary" : "secondary"}
          onClick={() => setCookieConsent("accepted")}
          aria-pressed={consent === "accepted"}
        >
          Accept Cookies
        </Button>
      </div>
      {/* §12: the change must be announced, not just shown. */}
      <p role="status" className="sr-only">
        {decided ? LABELS[consent] : ""}
      </p>
    </div>
  );
}
