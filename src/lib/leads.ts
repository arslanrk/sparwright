import type { QuoteRequest } from "./quote";

/**
 * Lead delivery — Design System §14 Manual-first workflow.
 *
 * §14 specifies the workflow, not the tooling, and the roadmap flags the CRM /
 * email destination as an open question for PR 9. So this module defines where
 * a lead goes behind one interface, with the destination chosen by environment
 * variable. Picking HubSpot, a mailer or a Zap later is a config change, not a
 * rewrite of the route handler.
 *
 * Configuration
 * - `QUOTE_WEBHOOK_URL` — receives the lead as multipart/form-data, artwork
 *   included. Any CRM, mail service or automation platform that accepts a
 *   webhook works, which is nearly all of them.
 * - `QUOTE_WEBHOOK_TOKEN` — optional bearer token for that endpoint.
 * - `QUOTE_SALES_OWNERS` — comma-separated `category=owner` pairs, plus an
 *   optional bare fallback: `Custom Boxing Gloves=amir,*=sales`.
 *
 * With nothing configured the lead is logged, and in production the route
 * refuses the submission rather than accepting a lead it cannot deliver.
 * Silently dropping an enquiry is the one outcome worse than an error message.
 *
 * Server-side only. Nothing here is imported from a client component, and the
 * route handler is the single caller — the `server-only` package is not a
 * dependency of this project, so the boundary is held by that discipline.
 */

/**
 * §14 "Lead status and follow-up tracking". Every lead leaves here at
 * `new`; the destination system owns the stages after that, which is why the
 * type lists them rather than the code trying to advance them.
 */
export const LEAD_STAGES = [
  "new",
  "qualifying",
  "concept_sent",
  "sample_agreed",
  "quoted",
  "won",
  "lost",
] as const;

export type LeadStage = (typeof LEAD_STAGES)[number];

/** Where the request came from — §14 asks the record to carry source. */
export type LeadSourceRecord = {
  intent: string;
  path: string;
  referrer: string;
};

export type Lead = {
  reference: string;
  receivedAt: string;
  owner: string;
  stage: LeadStage;
  source: LeadSourceRecord;
  /**
   * The four fields the §14 commercial funnel reports on, lifted out of the
   * request so the destination system does not have to know our field names.
   */
  summary: {
    product: string;
    quantity: string;
    destination: string;
    hasArtwork: boolean;
  };
  request: QuoteRequest;
  artwork?: { name: string; size: number; type: string };
};

export type DeliveryResult =
  | { delivered: true; via: "webhook" | "log" }
  | { delivered: false; reason: string };

/**
 * §14 requires an assigned sales owner on every lead. The rule is deliberately
 * boring and declarative — assignment by product category with a fallback — so
 * that who owns an enquiry can be answered by reading one env var.
 */
export function assignOwner(category: string): string {
  const config = process.env.QUOTE_SALES_OWNERS ?? "";
  const rules = config
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [key, value] = entry.split("=");
      return { key: (key ?? "").trim(), value: (value ?? "").trim() };
    });

  const match = rules.find(
    (rule) => rule.key.toLowerCase() === category.trim().toLowerCase(),
  );
  if (match?.value) return match.value;

  const fallback = rules.find((rule) => rule.key === "*");
  return fallback?.value || "unassigned";
}

/** Short, human-quotable, and unique enough for a manual workflow. */
export function createReference(now = new Date()): string {
  const stamp = now.toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SW-${stamp}-${random}`;
}

export function isDeliveryConfigured(): boolean {
  return Boolean(process.env.QUOTE_WEBHOOK_URL);
}

export async function deliverLead(
  lead: Lead,
  artwork: File | null,
): Promise<DeliveryResult> {
  const url = process.env.QUOTE_WEBHOOK_URL;

  if (!url) {
    // Development and preview: make the lead visible rather than pretending.
    console.info("[quote] lead received (no destination configured)", {
      ...lead,
      artwork: lead.artwork,
    });
    return { delivered: true, via: "log" };
  }

  const body = new FormData();
  body.append("reference", lead.reference);
  body.append("receivedAt", lead.receivedAt);
  body.append("owner", lead.owner);
  body.append("stage", lead.stage);
  body.append("sourceIntent", lead.source.intent);
  body.append("sourcePath", lead.source.path);
  body.append("sourceReferrer", lead.source.referrer);
  body.append("summaryProduct", lead.summary.product);
  body.append("summaryQuantity", lead.summary.quantity);
  body.append("summaryDestination", lead.summary.destination);
  body.append("summaryHasArtwork", String(lead.summary.hasArtwork));
  for (const [field, value] of Object.entries(lead.request)) {
    body.append(field, value);
  }
  if (artwork) body.append("artwork", artwork, artwork.name);

  const token = process.env.QUOTE_WEBHOOK_TOKEN;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body,
    });

    if (!response.ok) {
      return {
        delivered: false,
        reason: `Destination responded ${response.status}`,
      };
    }
    return { delivered: true, via: "webhook" };
  } catch (error) {
    return {
      delivered: false,
      reason: error instanceof Error ? error.message : "Request failed",
    };
  }
}
