/**
 * Quote and mockup request — Design System §08 Quote and mockup form,
 * §14 Manual-first workflow.
 *
 * The field set, the option lists and the validation live here so the browser
 * and the route handler agree on what a valid request is. §08 requires a
 * two-stage workflow rather than a generic name/email/message contact form.
 */

/** §08 product choices, verbatim. */
export const PRODUCT_CHOICES = [
  "Boxing Gloves",
  "MMA Gloves",
  "Focus Mitts and Pads",
  "Fight Shorts",
  "Rashguards",
  "Club T-Shirts",
  "Hoodies and Tracksuits",
  "Multiple Products",
] as const;

/** §08 quantity choices, verbatim. "Not sure" is first: it is a real answer. */
export const QUANTITY_CHOICES = [
  "Not sure",
  "Under 20",
  "20–49",
  "50–99",
  "100–249",
  "250+",
] as const;

/**
 * §08 step 1 opens with "Category". These are the catalogue pages plus an
 * escape hatch, so an enquiry that does not fit is still answerable.
 */
export const CATEGORY_CHOICES = [
  "Custom Boxing Gloves",
  "Fightwear and Club Apparel",
  "Something else",
] as const;

export const INTENDED_USES = [
  "General training",
  "Sparring",
  "Bag and pad work",
  "Competition",
  "Retail or resale",
  "Not sure yet",
] as const;

export const CONTACT_METHODS = ["Email", "WhatsApp", "Phone"] as const;

/**
 * §08 accepted logo guidance. The production team still confirms whether the
 * artwork suits the chosen manufacturing method — the form never claims it has.
 */
export const ACCEPTED_ARTWORK = [
  ".svg",
  ".pdf",
  ".ai",
  ".eps",
  ".png",
  ".jpg",
  ".jpeg",
] as const;

export const ACCEPTED_ARTWORK_LABEL = "SVG, PDF, AI, EPS, PNG or JPG";

/** Large enough for print-ready artwork, small enough to reject a mistake. */
export const MAX_ARTWORK_BYTES = 10 * 1024 * 1024;

export type QuoteRequest = {
  // Step 1 — product requirements (§08).
  category: string;
  productType: string;
  quantity: string;
  intendedUse: string;
  material: string;
  colours: string;
  references: string;
  targetMonth: string;
  // Step 2 — buyer information (§08).
  name: string;
  organisation: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  notes: string;
  preferredContact: string;
};

export const EMPTY_QUOTE: QuoteRequest = {
  category: "",
  productType: "",
  quantity: "",
  intendedUse: "",
  material: "",
  colours: "",
  references: "",
  targetMonth: "",
  name: "",
  organisation: "",
  country: "",
  email: "",
  phone: "",
  website: "",
  notes: "",
  preferredContact: "Email",
};

export type QuoteField = keyof QuoteRequest;

/** Field-level errors, keyed by field name. */
export type QuoteErrors = Partial<Record<QuoteField, string>>;

/** Fields collected in each §08 stage, in the order they are asked. */
export const STEP_ONE_FIELDS: QuoteField[] = [
  "category",
  "productType",
  "quantity",
  "intendedUse",
  "material",
  "colours",
  "references",
  "targetMonth",
];

export const STEP_TWO_FIELDS: QuoteField[] = [
  "name",
  "organisation",
  "country",
  "email",
  "phone",
  "website",
  "notes",
  "preferredContact",
];

/**
 * Deliberately forgiving. §14 is a manual-first workflow: a person reads every
 * request, so the form asks for what makes a useful first reply and rejects
 * only what would make the request unanswerable.
 */
export function validateQuote(values: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};

  if (!values.productType) {
    errors.productType = "Choose the product closest to what you need.";
  }
  if (!values.quantity) {
    errors.quantity = "Choose a quantity range. “Not sure” is fine.";
  }
  if (!values.name.trim()) {
    errors.name = "Enter your name so we know who we are replying to.";
  }
  if (!values.country.trim()) {
    errors.country = "Enter the destination country for the order.";
  }
  if (!isEmail(values.email)) {
    errors.email = "Enter an email address we can reply to.";
  }
  if (values.preferredContact !== "Email" && !values.phone.trim()) {
    errors.phone = `Add a number so we can reach you on ${values.preferredContact}.`;
  }

  return errors;
}

/** Which step a given field belongs to, so an error can send you back to it. */
export function stepForField(field: QuoteField): 1 | 2 {
  return STEP_ONE_FIELDS.includes(field) ? 1 : 2;
}

export function firstErrorStep(errors: QuoteErrors): 1 | 2 | null {
  const fields = Object.keys(errors) as QuoteField[];
  if (fields.length === 0) return null;
  return fields.some((field) => stepForField(field) === 1) ? 1 : 2;
}

/**
 * Good enough to catch a typo, loose enough not to reject a valid address.
 * Deliverability is confirmed by replying, not by a regular expression.
 */
function isEmail(value: string) {
  const trimmed = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function isAcceptedArtwork(fileName: string) {
  const lower = fileName.toLowerCase();
  return ACCEPTED_ARTWORK.some((extension) => lower.endsWith(extension));
}

/** Human-readable size for the §08 upload success and error states. */
export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
