/**
 * Composes the six models in public/images/modals into the one transparent
 * group the Gyms & Academies hero shows on its apparel slide.
 *
 *   npm run club-group
 *
 * Models 4 and 6 stand front and centre at full size; 1 and 5 behind on the
 * left, 3 and 2 on the right, smaller, raised and dimmed, so the group reads
 * as a pyramid around the two leads. Each figure gets a soft floor shadow.
 * Change `plan` to reorder or swap models, then re-run.
 */
import sharp from "sharp";
const out = "public/images/club-apparel-group.webp";
const dir = "public/images/modals";

// Pyramid: 4 and 6 front and centre at full size; 1, 5 and 3, 2 behind on
// either side, smaller, raised and dimmed.
const FRONT_H = 1400, BACK_H = 1230;
const FRONT_FOOT = 1520, BACK_FOOT = 1420;
const plan = [
  { f: "modal 1.png", row: "back",  cx: 230 },
  { f: "modal 5.png", row: "back",  cx: 500 },
  { f: "modal 3.png", row: "back",  cx: 1260 },
  { f: "modal2.png",  row: "back",  cx: 1530 },
  { f: "modal 4.png", row: "front", cx: 740 },
  { f: "modal 6.png", row: "front", cx: 1020 },
];
const W = 1760, H = 1560;

(async () => {
  const back = [], front = [];
  for (const p of plan) {
    const h = p.row === "front" ? FRONT_H : BACK_H;
    const trimmed = await sharp(`${dir}/${p.f}`).ensureAlpha().trim({ threshold: 1 }).toBuffer();
    let img = sharp(trimmed).resize({ height: h });
    if (p.row === "back") img = img.modulate({ brightness: 0.8, saturation: 0.92 });
    const buf = await img.png().toBuffer();
    const m = await sharp(buf).metadata();
    const foot = p.row === "front" ? FRONT_FOOT : BACK_FOOT;
    const sw = Math.round(m.width * 0.95), sh = 46;
    const pad = 80;
    const svg = `<svg width="${sw + pad * 2}" height="${sh + pad * 2}"><defs><filter id="b"><feGaussianBlur stdDeviation="18"/></filter></defs><ellipse cx="${sw / 2 + pad}" cy="${sh / 2 + pad}" rx="${sw / 2}" ry="${sh / 2}" fill="black" fill-opacity="${p.row === "front" ? 0.6 : 0.45}" filter="url(#b)"/></svg>`;
    const layer = [
      { input: Buffer.from(svg), left: Math.round(p.cx - sw / 2 - pad), top: Math.round(foot - sh / 2 - pad - 8) },
      { input: buf, left: Math.round(p.cx - m.width / 2), top: foot - m.height },
    ];
    (p.row === "front" ? front : back).push(...layer);
  }
  await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([...back, ...front])
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(out);
  console.log("written", out);
})();
