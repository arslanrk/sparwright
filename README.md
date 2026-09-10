# Sparwright

Web application built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Stack

| Tool | Version |
| --- | --- |
| Next.js | 16.x (Turbopack) |
| React | 19.x |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| ESLint | 9.x (flat config) |

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript with no emit
- `npm run brand` — re-derive the logo variants and browser icons from
  `public/images` after replacing any source artwork

## Layout

```
src/
  app/
    layout.tsx    root layout, fonts, metadata
    page.tsx      home route
    globals.css   Tailwind entry + theme tokens
public/
  images/         brand artwork: supplied sources plus derived §03 variants
scripts/
  build-brand-assets.mjs   re-cuts the logo variants and browser icons
```

Imports use the `@/*` alias, which maps to `src/*`.
