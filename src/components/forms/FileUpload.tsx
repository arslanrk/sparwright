"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  ACCEPTED_ARTWORK,
  ACCEPTED_ARTWORK_LABEL,
  MAX_ARTWORK_BYTES,
  formatBytes,
  isAcceptedArtwork,
} from "@/lib/quote";
import { FieldError } from "./FormField";

/**
 * FileUpload — Design System §08 File upload states, §12 Accessibility.
 *
 * All four §08 states: default explains the accepted types and offers a clear
 * choose-file action; uploading shows real progress; success shows the file
 * name with remove and replace controls; error explains what failed and how to
 * correct it.
 *
 * The progress is genuinely the browser's upload progress — `XMLHttpRequest`
 * rather than `fetch`, because `fetch` still cannot report request-body
 * progress. A fake animated bar would be a lie about what the network is doing.
 *
 * Nothing here clears the rest of the form. The file is held in component state
 * and handed to the submit; §08 and §12 both require form data to survive a
 * recoverable error, so a failed upload leaves every other answer untouched.
 *
 * §12 also requires the upload to work without drag-and-drop, so the drop zone
 * is an enhancement over a plain file input that is always present.
 */

export type UploadState =
  | { status: "empty" }
  | { status: "uploading"; file: File; progress: number }
  | { status: "success"; file: File }
  | { status: "error"; message: string; file?: File };

type FileUploadProps = {
  label: string;
  hint?: string;
  value: UploadState;
  onChange: (state: UploadState) => void;
  /**
   * Uploads the file, reporting progress from 0 to 1. Omit it to hold the file
   * in the form and send it with the submission instead.
   */
  onUpload?: (
    file: File,
    onProgress: (fraction: number) => void,
  ) => Promise<void>;
  className?: string;
};

export function FileUpload({
  label,
  hint = `Accepted formats: ${ACCEPTED_ARTWORK_LABEL}. We confirm whether the artwork suits your chosen branding method — you do not need to prepare it first.`,
  value,
  onChange,
  onUpload,
  className,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  async function accept(file: File | undefined) {
    if (!file) return;

    if (!isAcceptedArtwork(file.name)) {
      onChange({
        status: "error",
        file,
        message: `“${file.name}” is not a format we can use. Send ${ACCEPTED_ARTWORK_LABEL}, or leave this blank and describe your logo in the notes.`,
      });
      return;
    }

    if (file.size > MAX_ARTWORK_BYTES) {
      onChange({
        status: "error",
        file,
        message: `“${file.name}” is ${formatBytes(file.size)}, over the ${formatBytes(MAX_ARTWORK_BYTES)} limit. Send a smaller export, or leave this blank and we will ask for it by email.`,
      });
      return;
    }

    if (!onUpload) {
      onChange({ status: "success", file });
      return;
    }

    onChange({ status: "uploading", file, progress: 0 });
    try {
      await onUpload(file, (fraction) => {
        onChange({ status: "uploading", file, progress: fraction });
      });
      onChange({ status: "success", file });
    } catch (error) {
      onChange({
        status: "error",
        file,
        message:
          error instanceof Error && error.message
            ? `${error.message} Your other answers have been kept — try again, or continue without the file.`
            : "The upload did not finish. Your other answers have been kept — try again, or continue without the file.",
      });
    }
  }

  function reset() {
    onChange({ status: "empty" });
    if (inputRef.current) inputRef.current.value = "";
    inputRef.current?.focus();
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="font-body text-small font-semibold text-[var(--color-text)]"
      >
        {label}
        <span className="ml-2 font-normal text-[var(--color-text-muted)]">
          Optional
        </span>
      </label>

      <p id={hintId} className="text-small text-[var(--color-text-muted)]">
        {hint}
      </p>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          void accept(event.dataTransfer.files[0]);
        }}
        className={cn(
          "rounded-md border border-dashed p-[var(--space-5)] transition-colors",
          dragging
            ? "border-[var(--color-action)] bg-[var(--color-forge-100)]"
            : "border-[var(--color-border)] bg-[var(--color-white)]",
        )}
      >
        {/* Always present, whatever the state — §12 requires the upload to work
            without drag-and-drop, and a keyboard user reaches this input. */}
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={ACCEPTED_ARTWORK.join(",")}
          aria-describedby={
            value.status === "error" ? `${hintId} ${errorId}` : hintId
          }
          aria-invalid={value.status === "error" ? true : undefined}
          onChange={(event) => void accept(event.target.files?.[0])}
          className={cn(
            "block w-full font-body text-small text-[var(--color-text-secondary)]",
            "file:mr-4 file:cursor-pointer file:rounded-md file:border file:border-ink-950 file:bg-transparent",
            "file:px-4 file:py-2 file:font-body file:text-small file:font-semibold file:text-ink-950",
            "hover:file:bg-ink-950 hover:file:text-white",
          )}
        />

        {value.status === "uploading" ? (
          <UploadProgress file={value.file} progress={value.progress} />
        ) : null}

        {value.status === "success" ? (
          <UploadSuccess
            file={value.file}
            onRemove={reset}
            onReplace={() => inputRef.current?.click()}
          />
        ) : null}
      </div>

      {value.status === "error" ? (
        <FieldError id={errorId}>{value.message}</FieldError>
      ) : null}
    </div>
  );
}

function UploadProgress({ file, progress }: { file: File; progress: number }) {
  const percent = Math.round(Math.min(Math.max(progress, 0), 1) * 100);
  return (
    <div className="mt-[var(--space-4)]">
      <div className="flex items-baseline justify-between gap-4">
        <p className="truncate font-body text-small font-medium text-[var(--color-text)]">
          {file.name}
        </p>
        {/* The number, not just the bar: the global reduced-motion rule stops
            any transition, and §12 forbids status shown by appearance alone. */}
        <p className="shrink-0 text-small text-[var(--color-text-secondary)]">
          {percent}%
        </p>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Uploading ${file.name}`}
        className="mt-2 h-1.5 w-full overflow-hidden rounded-pill bg-[var(--color-border)]"
      >
        <div
          className="h-full rounded-pill bg-[var(--color-action)] transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function UploadSuccess({
  file,
  onRemove,
  onReplace,
}: {
  file: File;
  onRemove: () => void;
  onReplace: () => void;
}) {
  return (
    <div className="mt-[var(--space-4)] flex flex-wrap items-center justify-between gap-3 rounded-md border border-[var(--color-success-600)] p-[var(--space-4)]">
      <p className="flex min-w-0 items-center gap-2">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="size-4 shrink-0 text-[var(--color-success-600)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="10" cy="10" r="7.5" />
          <path d="m6.75 10.25 2.25 2.25 4.25-4.75" />
        </svg>
        <span className="min-w-0 font-body text-small">
          <span className="block truncate font-medium text-[var(--color-text)]">
            {file.name}
          </span>
          <span className="text-[var(--color-text-muted)]">
            Attached · {formatBytes(file.size)}
          </span>
        </span>
      </p>
      <span className="flex shrink-0 gap-4">
        <button
          type="button"
          onClick={onReplace}
          className="rounded-sm font-body text-small font-semibold underline underline-offset-4"
        >
          Replace
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-sm font-body text-small font-semibold underline underline-offset-4"
        >
          Remove
        </button>
      </span>
    </div>
  );
}
