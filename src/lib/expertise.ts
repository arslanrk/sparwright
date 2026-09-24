import type { ExpertiseItem } from "@/components/content/ExpertiseGrid";
import techPackDesk from "../../public/images/design-and-tech-pack-development.jpg";
import cuttingTable from "../../public/images/pattern-making-and-cutting.jpg";
import sublimationPrinter from "../../public/images/printing-and-decoration.jpg";
import bindingMachine from "../../public/images/stitching-and-assembly.jpg";
import inspectionBench from "../../public/images/quality-testing.jpg";
import dispatchWarehouse from "../../public/images/packing-and-export.jpg";

/*
 * Shared by the homepage's Our Expertise section and the About pages
 * (Capabilities, Factory Tour), so the workshop is described once.
 */

/**
 * Capability, not procedure.
 *
 * These were the six operations that finish a boxing glove — cutting, padding,
 * stitching, decoration, inspection, packing. That was too narrow twice over:
 * it described one product out of the 89 in `product-list.ts`, and "padding and
 * forming" means nothing for a yoga strap, a lifting belt or a rashguard.
 *
 * A buyer placing a bulk order is not asking how a thumb is attached. They are
 * asking whether a tech pack can be turned into units — whether there is a team
 * to develop the spec, equipment to cut and decorate at volume, and a way to
 * hold quality across a run. So these six are the stages every product in the
 * catalogue passes through, stated as what the business can do rather than what
 * happens to a glove.
 *
 * Card copy is kept to roughly fifteen to twenty words. These ran to
 * forty-six at the longest and seventeen at the shortest, which made the grid
 * ragged and put the explaining in the card rather than in /manufacturing,
 * which the section links to. What survived the trim is the specific nouns —
 * laser, steel die, BOM, flatlock, overlock, sublimation — because those are
 * what prove the capability; what went was the clauses explaining why each one
 * matters.
 *
 * Tech pack development is confirmed: the business writes the specification
 * where a buyer does not already have one, which is why the first card offers
 * both routes in rather than assuming a brand arrives with paperwork. It is
 * also the difference between a development partner and a job shop, so it
 * leads.
 *
 * STILL NEEDS CONFIRMATION. Unlike the copy elsewhere on this site, the rest
 * of these name equipment — digitised and graded patterns, laser and steel die
 * cutting, sublimation, flatlock and overlock machines, per-batch recorded
 * testing. Those are exactly the claims a buyer verifies in an audit, so each
 * needs checking against what is actually on the floor before this ships
 * (#5, #6).
 */
export const EXPERTISE: ExpertiseItem[] = [
  {
    phase: "Development",
    title: "Design and tech pack development",
    description:
      "Arrive with a tech pack and we build to it. Arrive with a sketch and we write one — measurements, materials, BOM, artwork placement.",
    shot: "Design and tech pack development",
    photo: {
      src: techPackDesk,
      alt: "A pattern maker holding a leather swatch against a printed glove pattern, with the panel layout open on screen beside them.",
    },
  },
  {
    phase: "Production",
    title: "Pattern making and cutting",
    description:
      "Patterns digitised and graded across the full size run, then cut by laser or steel die.",
    shot: "Pattern cutting",
    photo: {
      src: cuttingTable,
      alt: "An operator lifting a cut glove panel clear of the waste skeleton on a laser cutting bed, the honeycomb support showing through.",
    },
  },
  {
    phase: "Production",
    title: "Printing and decoration",
    description:
      "Sublimation onto flat panels before assembly, plus screen print, transfer, vinyl and embroidery.",
    shot: "Printing or embroidery",
    photo: {
      src: sublimationPrinter,
      alt: "An operator at the control panel of a wide-format sublimation printer, watching a printed transfer roll feed out.",
    },
  },
  {
    phase: "Production",
    title: "Stitching and assembly",
    description:
      "Machines set per operation — flatlock and overlock on knits, heavy lockstitch on leather and webbing.",
    shot: "Stitching process",
    photo: {
      src: bindingMachine,
      alt: "A machinist feeding the curved cuff of a boxing glove through a binding attachment, red edge tape running off a roll into the guide.",
    },
  },
  {
    phase: "Quality",
    title: "Quality testing",
    description:
      "Inline checks through the run, then measurements, colour and logo placement verified against your approved sample.",
    shot: "Quality inspection",
    photo: {
      src: inspectionBench,
      alt: "Two inspectors checking finished headguards and gloves into crates at the end of a stitching line.",
    },
  },
  {
    phase: "Dispatch",
    title: "Packing and export",
    description:
      "Polybagging, carton assortment and markings to your instruction, with export documentation for the destination.",
    shot: "Packaging",
    photo: {
      src: dispatchWarehouse,
      alt: "A dispatch warehouse with bagged gloves and sealed cartons on pallet racking, and a worker at a terminal on the floor.",
    },
  },
];
