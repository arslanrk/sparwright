import type { CustomizationItem } from "@/components/content/CustomizationShowcase";
import explodedGlove from "../../public/images/exploded-boxing-glove.jpg";

/**
 * The customization block's data, shared by the homepage and the glove page so
 * the two can never describe the glove differently.
 */

export const CUSTOMIZATION_IMAGE = {
  src: explodedGlove,
  alt: "A black and tan leather boxing glove shown exploded: the cuff with a blank logo patch, the lace-up closure, a woven label and four padding layers separated from the shell.",
};

export const CUSTOMIZATION_SHOT =
  "Exploded boxing glove — strap patch, padding layers and lace visible";

/**
 * §08 Customization panel, rewritten. The verbatim copy restated each tag as
 * its title ("Branding" / "Your brand") and gave noun lists that could describe
 * any factory; each title now says what the buyer gets, and each line names
 * how it is done. `side` places each card beside the part of the glove it
 * describes, and `hotspot` is that part's position on `exploded-boxing-glove`:
 * the cuff patch and the woven label on the left, the tan leather and the
 * padding layers on the right.
 */
export const CUSTOMIZATION: CustomizationItem[] = [
  {
    tag: "Branding",
    title: "Logo and decoration",
    description:
      "Embroidery, print, patches and woven labels, placed where they work on each product.",
    side: "left",
    hotspot: { x: 25, y: 21 },
    detail: {
      kind: "chips",
      items: ["Embroidery", "Print", "Patch", "Woven label"],
    },
  },
  {
    tag: "Colour",
    title: "Matched to your references",
    description:
      "Send colour codes or a physical swatch. Colours are matched on the sample and kept on file for reorders.",
    side: "right",
    hotspot: { x: 76, y: 42 },
    detail: { kind: "swatches" },
  },
  {
    tag: "Construction",
    title: "Built to your specification",
    description:
      "Materials, padding, closure, stitching and sizing — down to hook-and-loop or lace-up on a glove.",
    side: "right",
    hotspot: { x: 71, y: 70 },
    detail: { kind: "chips", items: ["Hook-and-loop", "Lace-up"] },
  },
  {
    tag: "Packaging",
    title: "Packed under your name",
    description:
      "Branded labels, polybags, retail boxes, inserts and export cartons marked to your instruction.",
    side: "left",
    hotspot: { x: 18, y: 70 },
    detail: {
      kind: "chips",
      items: ["Polybag", "Retail box", "Export carton"],
    },
  },
];
