"use client";

import { useEffect } from "react";
import { isAnalyticsEvent, track } from "@/lib/analytics";

/**
 * AnalyticsListener — Design System §14 Analytics events.
 *
 * One delegated click listener for the whole site. Anything that needs to be
 * measured carries `data-analytics="<event name>"`, and optional
 * `data-analytics-*` attributes ride along as properties.
 *
 * The point is that pages stay server components. Attaching an `onClick` to
 * every measured CTA would mean turning the homepage, the product pages and the
 * audience pages into client components for the sake of a counter — this keeps
 * them server-rendered and puts the whole cost in one listener.
 *
 * Unknown event names are ignored rather than sent: §14 fixes the twelve names,
 * and a typo should show up as a missing event, not as a new one.
 */
export function AnalyticsListener() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const element = target.closest<HTMLElement>("[data-analytics]");
      const name = element?.dataset.analytics;
      if (!element || !name || !isAnalyticsEvent(name)) return;

      const props: Record<string, string> = {};
      for (const [key, value] of Object.entries(element.dataset)) {
        if (key === "analytics" || !key.startsWith("analytics") || !value)
          continue;
        // dataset gives us `analyticsProduct`; the funnel wants `product`.
        const prop = key.slice("analytics".length);
        props[prop.charAt(0).toLowerCase() + prop.slice(1)] = value;
      }

      track(name, props);
    }

    // Capture phase: the click still counts if something downstream stops it.
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
