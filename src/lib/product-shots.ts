import type { StaticImageData } from "next/image";
import gloveStrikeBlackRed from "../../public/images/concept/boxing-gloves_strike_black-red.jpg";
import rangeApparel from "../../public/images/range/fightwear-and-club-apparel.jpg";
import rangeLifting from "../../public/images/range/range-lifting.jpg";
import rangeMma from "../../public/images/range/range-mma.jpg";
import rangePads from "../../public/images/range/range-pads.jpg";
import rangeProtective from "../../public/images/range/range-protective.jpg";

/**
 * One studio shot per product line, keyed by the line's slug — the black and
 * red set shot on the studio grey. Pages that show the range as tiles (the
 * products hub, Private Label) read from here, so a line's picture is the
 * same everywhere and a new shot is changed in one place.
 *
 * `scene` marks a photograph that is a scene rather than a product on the
 * grey: it fills its frame instead of floating on the grey.
 */
export const LINE_SHOTS: Record<string, { src: StaticImageData; scene?: boolean }> = {
  "custom-boxing-gloves": { src: gloveStrikeBlackRed },
  "custom-mma-gloves": { src: rangeMma },
  "custom-pads-bags-mitts": { src: rangePads },
  "custom-protective-gear": { src: rangeProtective },
  "fightwear-club-apparel": { src: rangeApparel, scene: true },
  "custom-lifting-belts": { src: rangeLifting },
};
