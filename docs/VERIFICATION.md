# Verification — 29 October 2026

- `npm test`: 8 tests passed. All 27 entries and 468 shade mappings, Ecer pricing hierarchy, responsive image files, cart merging and validation, current subtotals, encoded WhatsApp orders, photo selection, and brand isolation.
- `npm run build`: TypeScript and Vite passed. All 33 prerendered HTML routes, product schema, referenced assets/links, 404 output, and supplier-cost exclusion passed the build verifier.
- Browser: home, catalog, and Viscose Gradasi detail checked at 360, 768, and 1366px. No document overflow or completed image with zero natural width. Mobile layout also visually inspected at 390px.
- Ready to go mood switches the four displayed collections. Catalog contains 27 cards; searching Paris returns Paris Legend and Paris Japan at Rp29,000 and Rp49,000. Ascending price sort and maximum-price filter were exercised.
- Selected Creamy Nude, quantity 2: verified Ecer unit price Rp99,000 and subtotal Rp198,000. The generated order targets `6281315344182`. Adding an unpriced Armani Velvet keeps Rp198,000 as the priced subtotal and explicitly flags the extra item for price confirmation. All three items persist after reload. No WhatsApp message was sent.

Eight products have no verified Ecer price and remain explicit inquiries; three have known prices and require photo confirmation. See README for the exact products. Production hosting for this new repository has not been connected by this work.
