# Portfolio page — content

Route: `/portfolio` · Audience: gym owners, coaches and brand owners in the UK and Europe who want to see the kind of work Sparwright makes before they send a brief.

**The constraint that shapes this page:** there are no photographed finished orders yet. The design rules forbid invented clients, case studies, testimonials and social proof (#5, #12). So the page is a **lookbook of concept designs**, labelled as concepts everywhere they appear, plus an honest finished-orders section. That section switches to a real grid by itself once `PORTFOLIO` in `src/lib/portfolio.ts` has entries.

Each section has one job: the hero plus lookbook shows the styles that can be made · 01 shows how design and colour change a product · 02 says what real portfolio entries will show, and how buyers are protected · 03 FAQ covers remaining objections · the closing band starts a mockup.

---

## SEO

- **Meta title:** Custom Fight Gear Designs and Portfolio | Sparwright
- **Meta description:** Concept designs for custom boxing gloves, MMA gear, fightwear, protective and lifting gear, showing the styles, colourways and branding Sparwright can make for your gym or brand.
- **Primary keyword:** custom boxing glove designs
- **Supporting:** custom fight gear designs, custom fightwear designs, club boxing gloves design, custom MMA gloves design, fight gear colourways
- **Indexing:** now indexable and in the sitemap. The lookbook is genuine, useful content, labelled as concept design. It was previously noindex while the page was only an empty state.

---

## Hero and lookbook (dark)

**Eyebrow:** Portfolio

**H1:** Custom fight gear designs, and the work behind them.

**Intro:** Gloves, fightwear, protective, pads and lifting gear: the styles, colourways and branding we make for gyms, clubs and brands.

**Honesty note (chip):** Concept designs. Finished orders are being photographed.

**Filters:** All designs · Boxing · MMA · Apparel · Protective · Pads and bags · Lifting (each with a count)

**Tiles.** Every tile carries a "Concept" badge. Click a tile to open the viewer, which shows the title, description, what can be customised, "A concept design showing what can be made, not a delivered order", a **Request a mockup like this** button (prefilled with the product) and previous/next.

| Design | Line | Can be customised |
|---|---|---|
| Club boxing range | Boxing | Glove design per use, junior sizing, colourway, logo on the strap |
| Strike design, black and red | Boxing | Backhand graphic, colourway, wrist-panel branding |
| Crackle design, white, red and black | Boxing | Printed pattern, shell colour, cuff and strap colour |
| Fightwear and club apparel | Apparel | Sublimated graphics, waistband panel, colour per garment, sizes across the range |
| Classic design, black and tan | Boxing | Accent colour, leather or synthetic shell, embossed or printed mark |
| MMA gloves and shin guards | MMA | Matching graphics, padding, closure, strap branding |
| Training wear for a whole squad | Apparel | Colourways per garment, branding placement, sizes across the squad |
| Head guard and shin guards | Protective | Matching colourway, padding, strap branding |
| Pads, bag and mitts set | Pads and bags | Set colourway, filled or unfilled bag, panel branding |
| Lifting belt, gloves and straps | Lifting | Belt material, buckle type, stitching colour, embossed or printed mark |
| From mockup to finished glove | Boxing | Logo artwork, placement, colour match |
| Construction, layer by layer | Boxing | Shell material, foam layers, lining, woven label |

---

## 01 — Design and colour (light)

**Eyebrow:** Design and colour

**H2:** One glove, three designs, three colourways.

**Intro:** The same glove changes character with its graphic and its colours. Choose a design and a colourway, or send your own; each is confirmed on a sample.

**Matrix:** the Strike, Classic and Crackle designs × three colourways (white, red and black · black and red · black and tan).

**Action:** Try the concept studio → `/for-clubs`

---

## 02 — Finished orders (white)

**Eyebrow:** Finished orders

**H2:** Real orders, photographed as delivered.

**Intro:** Finished orders are being photographed. When they go up, each entry shows three things, and nothing staged or borrowed.

1. **The product:** what was made, photographed as delivered, never a render.
2. **The buyer:** named with their permission; otherwise described, such as "a boxing club in Manchester".
3. **What was customised:** the decisions behind it: branding method, colours, materials, sizing, packaging.

**Action:** Request Your Mockup → `/quote?intent=mockup`

When `PORTFOLIO` has entries, this section becomes "Work made to a buyer's specification." with the real grid, grouped by collection.

---

## 03 — FAQ (light)

**Are these designs finished orders?**
No. They are concept designs showing the styles, colourways and branding Sparwright can make. Finished orders will be shown here once they are photographed, with each buyer's permission.

**Can we have one of these designs made with our branding?**
Yes. Any design here can be a starting point. Your logo, colours and specification are agreed with you, and the product is confirmed on a physical sample before bulk production.

**Will our order appear in the portfolio?**
Only if you agree. With your permission your order can be shown with your name. Otherwise it can be described without naming you, or not shown at all.

**Can a design be changed for a different product?**
Often, yes. A glove graphic can carry onto pads, shin guards or apparel so a range reads as one set. What is practical on each product is confirmed with your brief.

---

## Closing band (red)

**Eyebrow:** Start your design

**H2:** Seen a style you like?

**Description:** Send your logo and colours with the product, and we show it on your gear before anything is made.

**Picker:** six product tiles, plus "A full range in one design". Each opens a mockup request with the product chosen.

**Primary action:** Request Your Mockup · **Secondary:** Get a Manufacturing Quote

---

## Still to confirm with the business

- **Concept imagery:** that using AI-generated concept imagery, clearly labelled, is acceptable on the portfolio page.
- **Model images:** the model groups (boxing, apparel) need model or likeness clearance. The boxing group includes a child.
- **Squad apparel photo:** that the squad apparel photo (`club-apparel-group.webp`) carries no other brand's marks.
