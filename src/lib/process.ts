import type { ProcessStage } from "@/components/content/ProcessStepper";

/**
 * The five stages of an order — §08 Process stepper, verbatim.
 *
 * Shared by the homepage's How It Works section and the /how-it-works page, so
 * the two can never describe a different process.
 */
export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    title: "Share requirements",
    outcome: "Product, quantity, logo, use case and destination are captured.",
  },
  {
    number: "02",
    title: "Review the concept",
    outcome: "Colours, logo placement and initial specifications are aligned.",
  },
  {
    number: "03",
    title: "Approve the sample",
    outcome: "Materials, construction, sizing and finish are confirmed.",
  },
  {
    number: "04",
    title: "Production and QC",
    outcome: "Bulk is made against the approved specification and checked.",
  },
  {
    number: "05",
    title: "Packing and delivery",
    outcome:
      "Final quantity, packing and shipment documentation are completed.",
  },
];

/**
 * False until the page has its own content. While false, /how-it-works is kept
 * out of search (`robots`) and the sitemap: on its own the stepper repeats the
 * homepage section word for word, which is duplicate content. Flip it when the
 * page carries the expanded stages it is being built for.
 */
export const HOW_IT_WORKS_READY = false;
