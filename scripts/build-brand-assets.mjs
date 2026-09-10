/**
 * Derive the brand assets the site renders from the supplied source artwork.
 *
 *   node scripts/build-brand-assets.mjs
 *
 * The source lockups carry a few hundred pixels of blank margin and stack three
 * elements — the S mark, the SPARWRIGHT wordmark and the CUSTOM FIGHT GEAR
 * tagline. Rendering them uncropped would leave the logo floating in a box of
 * whitespace, so §03's three variants are cut out here instead.
 *
 * Crops are measured at run time, not hard-coded. That is deliberate: the light
 * and dark lockups turned out to be different renderings — the dark one's
 * wordmark is wider and its tagline taller — so a box measured from one and
 * applied to the other sliced the S and the T off the wordmark. Measuring each
 * file independently is the only version of this that survives new artwork.
 *
 * Sources (supplied artwork, kept as the record):
 *   public/images/logo-light.png   2172x724, lockup for light surfaces
 *   public/images/logo-dark.png    2172x724, lockup for dark surfaces
 *   public/images/favicon.png      1254x1254, S mark for light surfaces
 *   public/images/favicon2.png     1254x1254, S mark for dark surfaces
 */
import sharp from "sharp";

const IMAGES = "public/images";
const APP = "src/app";

/** Rendered at most ~300px wide; 900 covers a 3x display. */
const LOCKUP_WIDTH = 900;
const WORDMARK_WIDTH = 700;
const MARK_WIDTH = 192;

/**
 * The horizontal lockup is composed here, because the supplied artwork has no
 * horizontal arrangement — only the stacked one — and a 64px header cannot fit
 * a stacked lockup above §03's 140px minimum width.
 *
 * Two things are taken from the artwork rather than chosen: the mark is set to
 * the height of the wordmark block, and the gap between them is the same
 * optical gap the stacked lockup already uses between its mark and wordmark,
 * measured as a fraction of the mark's height and applied on the other axis.
 * That keeps this a rearrangement of the brand's own spacing rather than an
 * invention. If the designer supplies a real horizontal lockup, drop this and
 * crop that instead.
 */
const HORIZONTAL_HEIGHT = 120;

/**
 * Content bounds, and the horizontal bands within them.
 *
 * Works whether the background is transparent or opaque: the top-left pixel is
 * the background reference, and anything differing from it is ink.
 */
async function scan(file) {
  const meta = await sharp(file).metadata();
  const width = meta.width;
  const height = meta.height;
  const { data } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const at = (x, y) => {
    const i = (y * width + x) * 4;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  };
  const bg = at(0, 0);
  const isInk = (x, y) => {
    const [r, g, b, a] = at(x, y);
    if (bg[3] < 20) return a > 40;
    return (
      Math.abs(r - bg[0]) + Math.abs(g - bg[1]) + Math.abs(b - bg[2]) > 45 ||
      a < 200
    );
  };

  const rowInk = [];
  for (let y = 0; y < height; y++) {
    let n = 0;
    for (let x = 0; x < width; x++) if (isInk(x, y)) n++;
    rowInk.push(n);
  }

  // A band is a run of rows carrying ink, separated by blank rows.
  const bands = [];
  let start = null;
  for (let y = 0; y <= height; y++) {
    const has = (rowInk[y] ?? 0) > 3;
    if (has && start === null) start = y;
    if (!has && start !== null) {
      bands.push([start, y - 1]);
      start = null;
    }
  }

  const boxes = bands.map(([top, bottom]) => {
    let minX = width;
    let maxX = -1;
    for (let y = top; y <= bottom; y++) {
      for (let x = 0; x < width; x++) {
        if (isInk(x, y)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    }
    return { left: minX, top, width: maxX - minX + 1, height: bottom - top + 1 };
  });

  return { boxes, union: unite(boxes) };
}

function unite(boxes) {
  const left = Math.min(...boxes.map((b) => b.left));
  const top = Math.min(...boxes.map((b) => b.top));
  const right = Math.max(...boxes.map((b) => b.left + b.width));
  const bottom = Math.max(...boxes.map((b) => b.top + b.height));
  return { left, top, width: right - left, height: bottom - top };
}

async function crop(source, box, width, out) {
  await sharp(source)
    .extract(box)
    .resize({ width, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(out);
  const meta = await sharp(out).metadata();
  console.log(
    `  ${out}  ${meta.width}x${meta.height}  ${(meta.size / 1024).toFixed(0)} KB`,
  );
}

console.log("Deriving brand assets…");

for (const [tone, source] of [
  ["light", `${IMAGES}/logo-light.png`],
  ["dark", `${IMAGES}/logo-dark.png`],
]) {
  const { boxes, union } = await scan(source);
  if (boxes.length !== 3) {
    throw new Error(
      `${source}: expected mark, wordmark and tagline bands, found ${boxes.length}. ` +
        `New artwork means re-checking this script rather than trusting it.`,
    );
  }
  // Band 0 is the mark; bands 1 and 2 are the wordmark and its tagline.
  const wordmark = unite(boxes.slice(1));

  await crop(source, union, LOCKUP_WIDTH, `${IMAGES}/logo-lockup-${tone}.png`);
  await crop(
    source,
    wordmark,
    WORDMARK_WIDTH,
    `${IMAGES}/logo-wordmark-${tone}.png`,
  );
}

const markSources = {
  light: `${IMAGES}/favicon.png`,
  dark: `${IMAGES}/favicon2.png`,
};
const markBoxes = {};

for (const [tone, source] of Object.entries(markSources)) {
  const { union } = await scan(source);
  markBoxes[tone] = union;
  await crop(source, union, MARK_WIDTH, `${IMAGES}/logo-mark-${tone}.png`);
}

for (const [tone, source] of [
  ["light", `${IMAGES}/logo-light.png`],
  ["dark", `${IMAGES}/logo-dark.png`],
]) {
  const { boxes } = await scan(source);
  const markBand = boxes[0];
  const wordmarkBand = unite(boxes.slice(1));
  // The stacked lockup's own mark-to-wordmark gap, as a fraction of mark height.
  const gapRatio = (wordmarkBand.top - (markBand.top + markBand.height)) / markBand.height;

  const markHeight = HORIZONTAL_HEIGHT;
  const markBox = markBoxes[tone];
  const markWidth = Math.round(markHeight * (markBox.width / markBox.height));
  const wordmarkHeight = HORIZONTAL_HEIGHT;
  const wordmarkWidth = Math.round(
    wordmarkHeight * (wordmarkBand.width / wordmarkBand.height),
  );
  const gap = Math.round(markHeight * gapRatio);

  const markBuffer = await sharp(markSources[tone])
    .extract(markBox)
    .resize({ width: markWidth, height: markHeight })
    .png()
    .toBuffer();
  const wordmarkBuffer = await sharp(source)
    .extract(wordmarkBand)
    .resize({ width: wordmarkWidth, height: wordmarkHeight })
    .png()
    .toBuffer();

  const out = `${IMAGES}/logo-horizontal-${tone}.png`;
  await sharp({
    create: {
      width: markWidth + gap + wordmarkWidth,
      height: HORIZONTAL_HEIGHT,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: markBuffer, left: 0, top: 0 },
      { input: wordmarkBuffer, left: markWidth + gap, top: 0 },
    ])
    .png({ compressionLevel: 9, palette: true })
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log(
    `  ${out}  ${meta.width}x${meta.height}  gap=${gap}px  ${(meta.size / 1024).toFixed(0)} KB`,
  );
}

/**
 * Browser icons, via the Next metadata file convention: `icon.png` and
 * `apple-icon.png` in the app directory are picked up automatically.
 *
 * Both are flattened onto white. The mark relies on white negative space — the
 * counter of the S is white, not transparent — so a transparent icon would lose
 * its shape wherever the platform composites it onto a dark tile, which is
 * exactly what iOS does.
 */
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

async function icon(size, pad, out) {
  const inner = size - pad * 2;
  await sharp(markSources.light)
    .extract(markBoxes.light)
    .resize({ width: inner, height: inner, fit: "contain", background: WHITE })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: WHITE })
    .flatten({ background: "#ffffff" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(out);
  console.log(`  ${out}  ${size}x${size}`);
}

await icon(512, 60, `${APP}/icon.png`);
await icon(180, 20, `${APP}/apple-icon.png`);

console.log("Done.");
