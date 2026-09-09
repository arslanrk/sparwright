"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/foundation/Button";
import { readLeadSource, track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import {
  CATEGORY_CHOICES,
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

export function QuoteForm() {
  const [values, setValues] = useState<QuoteRequest>(EMPTY_QUOTE);
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
    // button that now means something else (§12).
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

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-[var(--space-6)]"
    >
      <StepIndicator step={step} />

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

      <h2
        ref={stepHeadingRef}
        tabIndex={-1}
        className="text-heading-3 outline-offset-4"
      >
        {step === 1 ? "Your product requirements" : "How we reach you"}
      </h2>

      {/* Both steps stay mounted so nothing typed is lost moving between them. */}
      <fieldset
        hidden={step !== 1}
        disabled={submitting}
        className="m-0 flex flex-col gap-[var(--space-6)] border-0 p-0"
      >
        <SelectField
          label="Category"
          options={CATEGORY_CHOICES}
          placeholder="Choose a category"
          value={values.category}
          onChange={(event) => set("category", event.target.value)}
          optionalLabel
          hint="Pick the closest — we will confirm the detail with you."
        />

        <RadioCardGroup
          legend="Product type"
          name="productType"
          options={PRODUCT_CHOICES}
          value={values.productType}
          onChange={(value) => set("productType", value)}
          error={errors.productType}
          columns={4}
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
        />

        <SelectField
          label="Intended use"
          options={INTENDED_USES}
          placeholder="Choose the main use"
          value={values.intendedUse}
          onChange={(event) => set("intendedUse", event.target.value)}
          optionalLabel
        />

        <FormField
          label="Material or construction"
          hint="Anything you already know you want — shell, fabric, padding, closure."
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
          hint="Club or brand colours, and a reference if you have one."
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

        <FormField
          label="Target delivery month"
          hint="When you would like the order in hand."
          optionalLabel
        >
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

        <div>
          <Button type="button" onClick={onContinue} variant="primary" arrow>
            Continue to your details
          </Button>
        </div>
      </fieldset>

      <fieldset
        hidden={step !== 2}
        disabled={submitting}
        className="m-0 flex flex-col gap-[var(--space-6)] border-0 p-0"
      >
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

        <FormField
          label="Destination country"
          hint="Where the order is going. It affects packing and shipping."
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

        <FormField label="Website or Instagram" optionalLabel>
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

        <RadioCardGroup
          legend="Preferred contact method"
          name="preferredContact"
          options={CONTACT_METHODS}
          value={values.preferredContact}
          onChange={(value) => set("preferredContact", value)}
          columns={3}
        />

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

        <div className="flex flex-wrap items-center gap-4">
          <Button
            type="submit"
            variant="primary"
            loading={submitting}
            loadingLabel="Sending your request"
            arrow
          >
            Send Your Product Brief
          </Button>
          <Button
            type="button"
            variant="text"
            onClick={() => goToStep(1)}
            disabled={submitting}
          >
            Back to product requirements
          </Button>
        </div>
      </fieldset>
    </form>
  );
}

function StepIndicator({ step }: { step: 1 | 2 }) {
  const steps = ["Product requirements", "Your details"];
  return (
    <ol className="flex flex-wrap gap-x-6 gap-y-2">
      {steps.map((label, index) => {
        const number = index + 1;
        const current = number === step;
        return (
          <li
            key={label}
            aria-current={current ? "step" : undefined}
            className={cn(
              "flex items-center gap-2 font-body text-small",
              current
                ? "font-semibold text-[var(--color-text)]"
                : "text-[var(--color-text-muted)]",
            )}
          >
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full border text-[0.75rem]",
                current
                  ? "border-[var(--color-action)] bg-[var(--color-action)] text-white"
                  : "border-[var(--color-border-strong)]",
              )}
            >
              {number}
            </span>
            {label}
            <span className="sr-only">
              {current ? `— step ${number} of ${steps.length}, current` : ""}
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
