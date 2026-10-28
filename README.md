# Mel’s Scraf

Independent VuyamaLabs storefront for the Vuyama reseller community. VuyamaLabs creates brand-specific online catalogs using verified supplier product information and authentic photographs, while keeping each reseller’s pricing, identity, contacts, and shopping storage independent.

## Start here — agent handoff

Read this README, docs/DESIGN-BRIEF.md (the working prompt and quality criteria), docs/catalog-sources.json, src/config.ts, and src/data/products.json before changing anything. The user approved building this catalog, committing it, and pushing to https://github.com/devofathurisqi/mel-s-scraf.git. Do not modify another store or copy its retail overrides, WhatsApp number, or deployment identity.

## Brand and content

Lavender #EEE5F5, warm off-white #FCF9FD, plum #71508A, serif typography, layered photographic notes and interactive mood selections. The supplied original logo is public/assets/brand/official-logo.jpeg; its lettering is displayed from the original image using a CSS crop. Preserve it. The current tagline is configured centrally in src/config.ts. WhatsApp orders go to **6281315344182** (provided directly by the user on 29 October 2026). No Instagram account was supplied, so none is invented.

The full audited catalog has 27 product/series entries covering all 22 product folders in the supplier root, including the distinct Mukena Armani subseries. Photos and audited shade mappings are copied from the existing Sugar Shawl project as requested. Prices come only from the verified Vuyama Ecer column, never Sugar Shawl’s selling-price overrides. Eight entries have no verified Ecer price: Armani Velvet, Segenggam Lily, Rayon Viscose, Hampers Soft Box, Lea Oval Khiban, Zea Sport, Armani Polka, and Armani Ori Raya. They remain visible with Tanya Harga. Ciput, Armani Lasercut, and Armani Panel Printing have known prices but no verified photos, and use a photo inquiry.

Product source: https://drive.google.com/drive/folders/1RwtruDL86PYi3TVqILmxrZgZ_XGT1zPv. The September 2026 PDF was rechecked through connected Drive on 29 October 2026, using the **Ecer** column. Supplier procurement costs and the PDF are excluded from public assets. Stock is not synchronized; the seller confirms availability, delivery charges, and payment.

## Architecture

React 19, TypeScript, Vite, React Router. src/pages/Home.tsx and src/theme.css define the brand presentation. src/components/Layout.tsx uses the original logo. Catalog, product detail, favorites, shopping bag, guide, about, and missing-page routes are implemented in src/App.tsx.

- src/config.ts: brand, tagline, WhatsApp, categories, unique browser storage keys.
- src/data/products.json: public runtime catalog and current customer prices.
- src/data/prices.json: explicit brand prices (empty: use Ecer).
- src/data/retail-prices.json: verified retail fallback only.
- src/commerce.ts: cart validation, quantity bounds, merging, current totals, encoded order message.
- src/store.tsx: localStorage persistence and favorites.
- src/product-photos.ts: authentic gallery behavior; model examples remain accessible after choosing fabric/chart shades.
- scripts/prerender.mjs: static HTML per route, product schema, optional canonical URLs and sitemap.
- scripts/verify-build.mjs: route, asset, public-copy and supplier-cost checks.

Update both the product data and price source when changing a selling price. Unknown prices must be null, never zero. Products without verified photos must not be assigned another model’s photograph. Do not rerun another brand’s reconciliation or color-import script against this catalog.

## Run and verify

Use Node.js 22.18 or newer (verified with Node 24.11.1).

```powershell
npm ci
npm run dev
# http://127.0.0.1:4177
npm test
npm run build
npm run preview
```

Build output: dist/. TypeScript and public-build verification are included in npm run build. Tests cover exact authorized prices, all shade/image mappings, current totals, duplicate-color merging, invalid persisted data, inquiry totals, brand isolation, encoded WhatsApp destination, and model gallery behavior. Customer data is optional and only enters the WhatsApp draft; opening the link does not send a message or confirm payment.

## Git and hosting

Repository: https://github.com/devofathurisqi/mel-s-scraf.git. New project source is pushed to **main**. Vercel configuration is included; import this repository, select the Vite framework, build with npm run build, and publish dist/. The root public assets retain direct URLs and the SPA rewrite handles client routes. This repository push alone does not create a hosting account or connect a new deployment.

Set SITE_URL to the actual HTTPS production origin in the hosting environment before building if canonical URLs and a sitemap are needed. Without SITE_URL, builds omit them instead of inventing a domain. Keep deployment IDs and secrets out of this repository. After changes, run relevant tests and the build, inspect mobile/desktop pages, commit, and push without force.
