import { NextResponse } from "next/server";
import {
  assignOwner,
  createReference,
  deliverLead,
  isDeliveryConfigured,
  type Lead,
} from "@/lib/leads";
import {
  EMPTY_QUOTE,
  MAX_ARTWORK_BYTES,
  ACCEPTED_ARTWORK_LABEL,
  isAcceptedArtwork,
  validateQuote,
  type QuoteField,
  type QuoteRequest,
} from "@/lib/quote";

/**
 * Quote intake — Design System §14 Manual-first workflow.
 *
 * Accepts the §08 two-stage submission as multipart form data, revalidates it
 * server-side, assigns a sales owner and hands it to the configured
 * destination. No pricing, no preview, no automated reply: §14 and
 * non-negotiable #9 both say a person handles this until demand is proven.
 *
 * Every failure path returns a message the form can show the buyer verbatim,
 * because the alternative — accepting a request we cannot deliver — loses a
 * lead silently.
 */

/** Uploads and outbound delivery need the Node runtime, not the edge. */
export const runtime = "nodejs";

const MAX_FIELD_LENGTH = 4000;

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "We could not read that submission. Please try again." },
      { status: 400 },
    );
  }

  const values = readQuote(form);
  const errors = validateQuote(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        error: "Some answers need attention before we can send this.",
        fields: errors,
      },
      { status: 422 },
    );
  }

  const artwork = form.get("artwork");
  const file = artwork instanceof File && artwork.size > 0 ? artwork : null;

  if (file) {
    if (!isAcceptedArtwork(file.name)) {
      return NextResponse.json(
        {
          error: `We cannot use that artwork format. Send ${ACCEPTED_ARTWORK_LABEL}, or submit without it and describe your logo in the notes.`,
        },
        { status: 415 },
      );
    }
    if (file.size > MAX_ARTWORK_BYTES) {
      return NextResponse.json(
        {
          error:
            "That artwork file is too large. Send a smaller export, or submit without it and we will ask for it by email.",
        },
        { status: 413 },
      );
    }
  }

  // Refuse rather than accept a lead with nowhere to go.
  if (process.env.NODE_ENV === "production" && !isDeliveryConfigured()) {
    console.error("[quote] QUOTE_WEBHOOK_URL is not configured; lead refused");
    return NextResponse.json(
      {
        error:
          "Our request form is temporarily unavailable. Please email us and we will pick it up from there.",
      },
      { status: 503 },
    );
  }

  const lead: Lead = {
    reference: createReference(),
    receivedAt: new Date().toISOString(),
    owner: assignOwner(values.category),
    // Every lead starts here; the destination system owns what happens next.
    stage: "new",
    source: {
      intent: readSource(form, "sourceIntent") || "quote",
      path: readSource(form, "sourcePath"),
      referrer: readSource(form, "sourceReferrer"),
    },
    summary: {
      product: values.productType,
      quantity: values.quantity,
      destination: values.country,
      hasArtwork: Boolean(file),
    },
    request: values,
    artwork: file
      ? { name: file.name, size: file.size, type: file.type }
      : undefined,
  };

  const result = await deliverLead(lead, file);

  if (!result.delivered) {
    console.error("[quote] delivery failed", {
      reference: lead.reference,
      reason: result.reason,
    });
    return NextResponse.json(
      {
        error:
          "We could not send your request just now. Nothing you typed has been lost — please try again in a moment.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ reference: lead.reference }, { status: 201 });
}

/**
 * Attribution fields, read separately from the buyer's own answers. They are
 * capped hard: they come from the browser, and nothing but a short string
 * belongs in a lead record's source.
 */
function readSource(form: FormData, field: string): string {
  const raw = form.get(field);
  return typeof raw === "string" ? raw.slice(0, 512).trim() : "";
}

/**
 * Reads only the fields the schema declares, so an unexpected extra field in
 * the request body cannot end up in a lead record or a webhook payload.
 */
function readQuote(form: FormData): QuoteRequest {
  const values = { ...EMPTY_QUOTE };
  for (const field of Object.keys(EMPTY_QUOTE) as QuoteField[]) {
    const raw = form.get(field);
    if (typeof raw === "string") {
      values[field] = raw.slice(0, MAX_FIELD_LENGTH).trim();
    }
  }
  return values;
}
