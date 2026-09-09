import { readCookieConsent } from "@/components/navigation/CookieBanner";

/**
 * Analytics — Design System §14 Analytics events, §14 Commercial funnel.
 *
 * §14 fixes the event names; they are the funnel, so they are a closed union
 * rather than free-form strings. A typo in an event name is a hole in the
 * reporting that nobody notices for a month.
 *
 * Two deliberate choices:
 *
 * **Consent gates everything.** `track` drops the event unless the visitor
 * accepted analytics cookies on the PR 10 banner. Events are not queued for
 * later — a visitor who declines is not measured retroactively if they change
 * their mind.
 *
 * **No vendor is wired in.** Which analytics product to use is a launch
 * decision, so this pushes to `window.dataLayer` (the shape GTM and GA4 read)
 * and dispatches a DOM event alongside it. Adding the vendor's script later
 * costs one `<script>` tag; nothing here has to change. `NEXT_PUBLIC_ANALYTICS_DEBUG`
 * logs each event to the console so the funnel can be verified before any
 * vendor exists.
 */

/** §14 event naming, verbatim and complete. */
export const ANALYTICS_EVENTS = [
  "hero_mockup_click",
  "hero_quote_click",
  "product_card_open",
  "mockup_form_start",
  "logo_upload_start",
  "logo_upload_complete",
  "quote_form_start",
  "quote_form_submit",
  "whatsapp_click",
  "email_click",
  "sample_request",
  "case_study_open",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsProps = Record<
  string,
  string | number | boolean | undefined
>;

type DataLayerEntry = { event: AnalyticsEvent; [key: string]: unknown };

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
  }
}

export function isAnalyticsEvent(value: string): value is AnalyticsEvent {
  return (ANALYTICS_EVENTS as readonly string[]).includes(value);
}

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;
  if (readCookieConsent() !== "accepted") return;

  const payload: DataLayerEntry = {
    event,
    ...props,
    page_path: window.location.pathname,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  // Anything else that wants these — a vendor shim, a debug overlay — can
  // listen rather than being imported here.
  window.dispatchEvent(
    new CustomEvent("sparwright:analytics", { detail: payload }),
  );

  if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[analytics]", event, payload);
  }
}

/**
 * Where a lead came from — §14 asks the lead record to carry source alongside
 * product, quantity and destination, so follow-up can be attributed rather
 * than guessed at.
 */
export type LeadSource = {
  /** Page the request was started from. */
  entryPath: string;
  /** `mockup` when the visitor arrived through a mockup CTA (§14 workflow). */
  intent: string;
  /** External referrer, when the browser gives one. */
  referrer: string;
};

export function readLeadSource(): LeadSource {
  if (typeof window === "undefined") {
    return { entryPath: "", intent: "quote", referrer: "" };
  }
  const params = new URLSearchParams(window.location.search);
  const intent = params.get("intent") === "mockup" ? "mockup" : "quote";
  let referrer = "";
  try {
    // Same-origin referrers say nothing useful about acquisition.
    if (
      document.referrer &&
      new URL(document.referrer).origin !== window.location.origin
    ) {
      referrer = document.referrer;
    }
  } catch {
    referrer = "";
  }
  return { entryPath: window.location.pathname, intent, referrer };
}
