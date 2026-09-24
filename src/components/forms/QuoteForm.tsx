"use client";

import { useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/foundation/Button";
import { CTA } from "@/components/foundation/cta";
import { readLeadSource, track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import {
  CONTACT_METHODS,
  EMPTY_QUOTE,
  INTENDED_USES,
  PRODUCT_CHOICES,
  QUANTITY_CHOICES,
  STEP_ONE_FIELDS,
  firstErrorStep,
  validateQuote,
  type QuoteErrors,
  type QuoteField,
  type QuoteIntent,
  type QuoteRequest,
} from "@/lib/quote";
import { Alert } from "./Alert";
import { FileUpload, type UploadState } from "./FileUpload";
import { FIELD_CONTROL, FormField } from "./FormField";
import { RadioCardGroup } from "./RadioCard";
import { SelectField } from "./SelectField";
import { SuccessPanel } from "./SuccessPanel";

/**
 * QuoteForm — Design System §08 Quote and mockup form, §14 Manual-first
 * workflow, §12 Accessibility.
 *
 * Two stages, as §08 requires: product requirements, then buyer information.
 * Never a generic name/email/message contact form.
 *
 * Laid out as one card: a progress header, the step's fields in short named
 * groups, and a footer that always holds the step's action — so the button is
 * where the eye ends up, not after a run of optional fields of unknown length.
 * Only product type and quantity are required on the first step, and the
 * footer says so, because a form this long otherwise reads as all-mandatory.
 *
 * Submission goes through `XMLHttpRequest` rather than `fetch` for one reason:
 * only XHR reports request-body upload progress, and §08 requires the upload
 * state to show *real* progress. Artwork rides along in the same multipart
 * request, so there is one network call and one thing that can fail.
 *
 * Nothing is cleared on failure. §08 and §12 both require form data to survive
 * a recoverable error, so an error puts the buyer back on the step that needs
 * attention with every answer still in place.
 */

type Status = "editing" | "submitting" | "submitted";

type QuoteFormProps = {
  /**
   * Answers already known from the link — see `quotePrefill`. Read on the
   * server, so the form renders filled in rather than filling itself after.
   */
  initialValues?: Partial<QuoteRequest>;
  /** The entry point, which names the final action. */
  intent?: QuoteIntent;
};

const STEPS = [
  {
    label: "Product requirements",
    heading: "What you want made",
    description: "Pick the closest product and a rough quantity. Everything else helps, but can wait.",
  },
  {
    label: "Your details",
    heading: "Where we send the reply",
    description: "Who you are and how to reach you. We use these to answer this request, nothing else.",
  },
] as const;

export function QuoteForm({ initialValues, intent = "quote" }: QuoteFormProps = {}) {
  const [values, setValues] = useState<QuoteRequest>(() => ({
    ...EMPTY_QUOTE,
    ...initialValues,
  }));
  const [artwork, setArtwork] = useState<UploadState>({ status: "empty" });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("editing");
  const [step, setStep] = useState<1 | 2>(1);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  // §14 separates the two entry points into the same form. Reported once, on
  // the first answer — arriving at the page is not starting the form.
  const startReported = useRef(false);

  function reportStart() {
    if (startReported.current) return;
    startReported.current = true;
    const source = readLeadSource();
    track(
      source.intent === "mockup" ? "mockup_form_start" : "quote_form_start",
      { entry_path: source.entryPath },
    );
  }

  function set<K extends QuoteField>(field: K, value: QuoteRequest[K]) {
    reportStart();
    setValues((current) => ({ ...current, [field]: value }));
    // Clear the error the moment the buyer addresses it, not on the next submit.
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function goToStep(next: 1 | 2) {
    setStep(next);
    // The step above has been replaced; move focus rather than leaving it on a
    // button that now means something else (§12). The heading sits at the top
    // of the card, so focusing it also brings the new step into view.
    requestAnimationFrame(() => stepHeadingRef.current?.focus());
  }

  function onContinue() {
    const found = validateQuote(values);
    const stepOneErrors = Object.fromEntries(
      Object.entries(found).filter(([field]) =>
        STEP_ONE_FIELDS.includes(field as QuoteField),
      ),
    ) as QuoteErrors;

    if (Object.keys(stepOneErrors).length > 0) {
      setErrors(stepOneErrors);
      return;
    }
    setErrors({});
    goToStep(2);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Enter in a step-one field submits the form; treat it as Continue.
    if (step === 1) {
      onContinue();
      return;
    }
    setSubmitError(null);

    const found = validateQuote(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      const errorStep = firstErrorStep(found);
      if (errorStep && errorStep !== step) goToStep(errorStep);
      return;
    }

    setErrors({});
    setStatus("submitting");

    const body = new FormData();
    for (const [field, value] of Object.entries(values)) {
      body.append(field, value);
    }
    // §14: the lead record carries source alongside product, quantity and
    // destination, so follow-up can be attributed.
    const source = readLeadSource();
    body.append("sourceIntent", source.intent);
    body.append("sourcePath", source.entryPath);
    body.append("sourceReferrer", source.referrer);
    const file = artwork.status === "success" ? artwork.file : undefined;
    if (file) body.append("artwork", file);

    try {
      await postWithProgress("/api/quote", body, (fraction) => {
        // Real bytes, real bar. Only shown when there is a file to watch.
        if (file) setArtwork({ status: "uploading", file, progress: fraction });
      });
      setStatus("submitted");
      track("quote_form_submit", {
        product: values.productType,
        quantity: values.quantity,
        destination: values.country,
        intent: source.intent,
        has_artwork: Boolean(file),
      });
    } catch (error) {
      if (file) setArtwork({ status: "success", file });
      setStatus("editing");
      setSubmitError(
        error instanceof Error && error.message
          ? error.message
          : "We could not send your request. Nothing you typed has been lost — try again, or email us directly.",
      );
    }
  }

  if (status === "submitted") {
    return <SuccessPanel />;
  }

  const submitting = status === "submitting";
  const visibleErrors = Object.entries(errors) as [QuoteField, string][];
  const current = STEPS[step - 1];

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-12px_rgb(0_0_0/0.12)]"
    >
      <div className="border-b border-[var(--color-border)] px-[var(--space-5)] py-[var(--space-5)] sm:px-[var(--space-7)]">
        <StepProgress step={step} />
      </div>

      <div className="flex flex-col gap-[var(--space-7)] px-[var(--space-5)] py-[var(--space-7)] sm:px-[var(--space-7)]">
        <header>
          <h2
            ref={stepHeadingRef}
            tabIndex={-1}
            className="scroll-mt-28 text-heading-3 outline-offset-4"
          >
            {current.heading}
          </h2>
          <p className="mt-2 text-body text-[var(--color-text-secondary)]">
            {current.description}
          </p>
        </header>

        {submitError ? (
          <Alert tone="error" title="Your request was not sent">
            {submitError}
          </Alert>
        ) : null}

        {visibleErrors.length > 0 ? (
          <Alert
            tone="error"
            title={
              visibleErrors.length === 1
                ? "One answer needs attention"
                : `${visibleErrors.length} answers need attention`
            }
          >
            <ul className="flex list-disc flex-col gap-1 pl-4">
              {visibleErrors.map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </Alert>
        ) : null}

        {/* Both steps stay mounted so nothing typed is lost moving between them. */}
        <fieldset
          hidden={step !== 1}
          disabled={submitting}
          className="m-0 flex flex-col gap-[var(--space-7)] border-0 p-0"
        >
          <FieldGroup title="The product">
            <RadioCardGroup
              legend="Product type"
              name="productType"
              options={PRODUCT_CHOICES}
              value={values.productType}
              onChange={(value) => set("productType", value)}
              error={errors.productType}
              hint="Pick the closest — we confirm the detail with you."
              columns={4}
              compact
            />

            <RadioCardGroup
              legend="Quantity"
              name="quantity"
              options={QUANTITY_CHOICES}
              value={values.quantity}
              onChange={(value) => set("quantity", value)}
              error={errors.quantity}
              hint="An estimate is fine. It decides which materials and methods are practical."
              columns={3}
              compact
            />
          </FieldGroup>

          <FieldGroup title="Specification">
            <div className="grid items-start gap-[var(--space-5)] sm:grid-cols-2">
              <SelectField
                label="Intended use"
                options={INTENDED_USES}
                placeholder="Choose the main use"
                value={values.intendedUse}
                onChange={(event) => set("intendedUse", event.target.value)}
                optionalLabel
              />

              <FormField label="Target delivery month" optionalLabel>
                {(field) => (
                  <input
                    {...field}
                    type="month"
                    value={values.targetMonth}
                    onChange={(event) => set("targetMonth", event.target.value)}
                    className={FIELD_CONTROL}
                  />
                )}
              </FormField>

              <FormField
                label="Material or construction"
                hint="Shell, fabric, padding, closure."
                optionalLabel
              >
                {(field) => (
                  <input
                    {...field}
                    type="text"
                    value={values.material}
                    onChange={(event) => set("material", event.target.value)}
                    className={FIELD_CONTROL}
                  />
                )}
              </FormField>

              <FormField
                label="Colours"
                hint="Club or brand colours, or a reference."
                optionalLabel
              >
                {(field) => (
                  <input
                    {...field}
                    type="text"
                    value={values.colours}
                    onChange={(event) => set("colours", event.target.value)}
                    className={FIELD_CONTROL}
                  />
                )}
              </FormField>
            </div>
          </FieldGroup>

          <FieldGroup title="Branding and references">
            <FileUpload
              label="Logo artwork"
              value={artwork}
              onChange={setArtwork}
            />

            <FormField
              label="Reference products"
              hint="A link, a product name, or a description of something close to what you want."
              optionalLabel
            >
              {(field) => (
                <textarea
                  {...field}
                  rows={3}
                  value={values.references}
                  onChange={(event) => set("references", event.target.value)}
                  className={FIELD_CONTROL}
                />
              )}
            </FormField>
          </FieldGroup>
        </fieldset>

        <fieldset
          hidden={step !== 2}
          disabled={submitting}
          className="m-0 flex flex-col gap-[var(--space-7)] border-0 p-0"
        >
          <FieldGroup title="About you">
            <div className="grid items-start gap-[var(--space-5)] sm:grid-cols-2">
              <FormField label="Your name" error={errors.name} required>
                {(field) => (
                  <input
                    {...field}
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(event) => set("name", event.target.value)}
                    className={FIELD_CONTROL}
                  />
                )}
              </FormField>

              <FormField label="Club or business" optionalLabel>
                {(field) => (
                  <input
                    {...field}
                    type="text"
                    autoComplete="organization"
                    value={values.organisation}
                    onChange={(event) => set("organisation", event.target.value)}
                    className={FIELD_CONTROL}
                  />
                )}
              </FormField>

              <FormField label="Email" error={errors.email} required>
                {(field) => (
                  <input
                    {...field}
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(event) => set("email", event.target.value)}
                    className={FIELD_CONTROL}
                  />
                )}
              </FormField>

              <FormField
                label="Destination country"
                error={errors.country}
                required
              >
                {(field) => (
                  <input
                    {...field}
                    type="text"
                    autoComplete="country-name"
                    value={values.country}
                    onChange={(event) => set("country", event.target.value)}
                    className={FIELD_CONTROL}
                  />
                )}
              </FormField>

              <FormField
                label="Website or Instagram"
                optionalLabel
                className="sm:col-span-2"
              >
                {(field) => (
                  <input
                    {...field}
                    type="text"
                    inputMode="url"
                    value={values.website}
                    onChange={(event) => set("website", event.target.value)}
                    className={FIELD_CONTROL}
                  />
                )}
              </FormField>
            </div>
          </FieldGroup>

          <FieldGroup title="How we reply">
            <RadioCardGroup
              legend="Preferred contact method"
              name="preferredContact"
              options={CONTACT_METHODS}
              value={values.preferredContact}
              onChange={(value) => set("preferredContact", value)}
              columns={3}
              compact
            />

            <FormField
              label="Phone or WhatsApp"
              hint="Include the country code."
              error={errors.phone}
              optionalLabel={values.preferredContact === "Email"}
            >
              {(field) => (
                <input
                  {...field}
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(event) => set("phone", event.target.value)}
                  className={FIELD_CONTROL}
                />
              )}
            </FormField>

            <FormField
              label="Anything else"
              hint="Deadlines, member numbers, a previous order — whatever helps."
              optionalLabel
            >
              {(field) => (
                <textarea
                  {...field}
                  rows={4}
                  value={values.notes}
                  onChange={(event) => set("notes", event.target.value)}
                  className={FIELD_CONTROL}
                />
              )}
            </FormField>
          </FieldGroup>
        </fieldset>
      </div>

      {/* The step's action, always at the foot of the card. */}
      <div className="flex flex-col-reverse gap-4 border-t border-[var(--color-border)] bg-[var(--color-bg)] px-[var(--space-5)] py-[var(--space-5)] sm:flex-row sm:items-center sm:justify-between sm:px-[var(--space-7)]">
        {step === 1 ? (
          <>
            <p className="text-small text-[var(--color-text-muted)]">
              Step 1 of 2 · Only product type and quantity are required.
            </p>
            <Button type="button" onClick={onContinue} variant="primary" arrow>
              Continue to your details
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="text"
              onClick={() => goToStep(1)}
              disabled={submitting}
            >
              ← Back to product requirements
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={submitting}
              loadingLabel="Sending your request"
              arrow
            >
              {intent === "mockup" ? CTA.mockup : CTA.brief}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}

/**
 * A named run of fields within a step. An h3 under the step's h2, so the
 * outline reads step → group → field, and styled as the site's eyebrow.
 */
function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-[var(--space-5)]">
      <h3 className="flex items-center gap-3 font-body text-eyebrow uppercase text-[var(--color-text-muted)]">
        <span aria-hidden="true" className="h-0.5 w-6 shrink-0 rounded-full bg-forge-600" />
        {title}
      </h3>
      {children}
    </div>
  );
}

/**
 * The two steps as a labelled track. A finished step shows a tick and a full
 * bar — the state is carried by the icon and the text, not colour alone (§12).
 */
function StepProgress({ step }: { step: 1 | 2 }) {
  return (
    <ol className="grid grid-cols-2 gap-3">
      {STEPS.map(({ label }, index) => {
        const number = index + 1;
        const currentStep = number === step;
        const done = number < step;
        return (
          <li
            key={label}
            aria-current={currentStep ? "step" : undefined}
            className="flex flex-col gap-2.5"
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-1 rounded-full",
                done || currentStep ? "bg-forge-600" : "bg-[var(--color-border)]",
              )}
            />
            <span
              className={cn(
                "flex items-center gap-2 font-body text-small",
                currentStep || done
                  ? "font-semibold text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)]",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border text-[0.75rem]",
                  currentStep && "border-forge-600 bg-forge-600 text-white",
                  done && "border-success-600 bg-success-600 text-white",
                  !currentStep && !done && "border-[var(--color-border-strong)]",
                )}
              >
                {done ? (
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                ) : (
                  number
                )}
              </span>
              {label}
              <span className="sr-only">
                {currentStep
                  ? ` — step ${number} of ${STEPS.length}, current`
                  : done
                    ? " — done"
                    : ""}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * `fetch` still cannot report request-body progress, so the one place the site
 * uploads bytes uses XHR. Rejects with the server's own message when it sends
 * one, so the buyer is told what actually went wrong.
 */
function postWithProgress(
  url: string,
  body: FormData,
  onProgress: (fraction: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("POST", url);
    request.responseType = "json";

    request.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) onProgress(event.loaded / event.total);
    });

    request.addEventListener("load", () => {
      if (request.status >= 200 && request.status < 300) {
        resolve();
        return;
      }
      const message =
        request.response && typeof request.response.error === "string"
          ? request.response.error
          : "";
      reject(new Error(message));
    });

    request.addEventListener("error", () => reject(new Error("")));
    request.addEventListener("timeout", () => reject(new Error("")));

    request.send(body);
  });
}
