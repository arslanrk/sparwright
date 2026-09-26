/**
 * Composes a product line's hero image: a group of models as one cut-out on
 * a transparent background, feet on one baseline. One preset per line.
 *
 *   node scripts/compose-line-group.mjs <apparel|boxing> <dir-with-sources>
 *
 * Each source is a transparent PNG cut-out. Edges are cleaned first — the
 * cut-outs carry coloured halos (a glow, red and yellow fringing) from their
 * backgrounds — by dropping faint alpha and shrinking the mask a pixel, then
 * each figure is trimmed, scaled to a shared height and placed.
 */
import sharp from "sharp";
import path from "node:path";

const [preset, dir] = process.argv.slice(2);

const H = 1500; // canvas height
const W = 1560;
const BASE = H - 40; // feet baseline

// Per line, in drawing order: the back figures first — a step behind (`back`,
// feet higher in the frame) and a little smaller — then the front pair on the
// front line, drawn on top, so no two pairs of feet share a spot.
const PRESETS = {
  apparel: {
    out: "public/images/range/fightwear-and-apparel-group.png",
    figures: [
      { file: "50.png", height: 1200, x: 0.14, back: 130 }, // beige set, back left
      { file: "49.png", height: 1220, x: 0.862, back: 130 }, // brown set, back right
      { file: "51.png", height: 1400, x: 0.375 }, // rashguard, front left
      { file: "52.png", height: 1400, x: 0.625 }, // boxing trunks, front right
    ],
  },
  boxing: {
    out: "public/images/range/boxing-gloves-group.png",
    figures: [
      { file: "57.png", height: 1260, x: 0.16, back: 110 }, // head guard under her arm, gloves in hand, back left
      { file: "56.png", height: 1190, x: 0.855, back: 110 }, // guard stance, head guard on, back right
      { file: "55.png", height: 1410, x: 0.415 }, // white gloves, front centre
      { file: "58.png", height: 1080, x: 0.69 }, // junior, kids' gloves, front right
    ],
  },
  lifting: {
    out: "public/images/range/lifting-gear-group.png",
    figures: [
      { file: "63.png", height: 1150, x: 0.15, back: 150 }, // gym gloves, back left
      { file: "modal2.png", height: 1190, x: 0.885, back: 130 }, // seamless training set, back right
      { file: "62.png", height: 1420, x: 0.42 }, // lifting belt over the shoulder, front left
      { file: "64.png", height: 1320, x: 0.695 }, // hand wraps, front right
    ],
  },
};

const config = PRESETS[preset];
if (!config || !dir) throw new Error("Usage: compose-line-group.mjs <" + Object.keys(PRESETS).join("|") + "> <dir>");
const FIGURES = config.figures;

async function clean(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  // Hard edge: faint alpha (glow, fringe) out, the rest opaque.
  const alpha = new Uint8Array(width * height);
  for (let i = 0; i < width * height; i++) alpha[i] = data[i * 4 + 3] > 150 ? 255 : 0;
  // Shrink the mask by one pixel to cut the coloured rim.
  const eroded = new Uint8Array(alpha);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      if (!alpha[i]) continue;
      if (!alpha[i - 1] || !alpha[i + 1] || !alpha[i - width] || !alpha[i + width]) eroded[i] = 0;
    }
  }
  for (let i = 0; i < width * height; i++) data[i * 4 + 3] = eroded[i];
  return sharp(data, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

/** Crops to the bounding box of the opaque pixels (sharp's trim reads colour, not alpha). */
async function cropToAlpha(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  let x0 = width, y0 = height, x1 = -1, y1 = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 20) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  return sharp(buffer).extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }).png().toBuffer();
}

const layers = [];
for (const f of FIGURES) {
  const cleaned = await clean(path.join(dir, f.file));
  const trimmed = await cropToAlpha(cleaned);
  const scaled = await sharp(trimmed).resize({ height: f.height }).png().toBuffer();
  const meta = await sharp(scaled).metadata();
  layers.push({
    input: scaled,
    left: Math.round(f.x * W - meta.width / 2),
    width: meta.width,
    // Back figures stand a step behind: their feet higher in the frame.
    top: BASE - (f.back ?? 0) - meta.height,
  });
}

const out = path.join(config.out);
// Fit the canvas to the figures, so nothing is clipped at an edge: any
// figure reaching past the planned width widens the canvas instead.
const PAD = 30;
const minLeft = Math.min(...layers.map((l) => l.left));
const maxRight = Math.max(...layers.map((l) => l.left + l.width));
const shift = PAD - minLeft;
const width = maxRight - minLeft + PAD * 2;
await sharp({ create: { width, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite(layers.map(({ input, left, top }) => ({ input, left: left + shift, top })))
  .png({ compressionLevel: 9 })
  .toFile(out);

// A WebP for the site, and a preview on the stage's grey for checking.
await sharp(out).resize({ width: 1400 }).webp({ quality: 88, alphaQuality: 90 }).toFile(out.replace(/\.png$/, ".webp"));
console.log("wrote", out);
