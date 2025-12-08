# Implementation Checklist

## Setup
- [x] Create task workspace with research and plan

## Brand Variable Implementation
- [ ] Add `src/lib/constants/brand.ts` exporting Corner House name variants (short, full, slug, domain, team)
- [ ] Update `config.ts` to consume the brand constant for `appName`, descriptions, and mail sender strings
- [ ] Refresh JSON configs (`config/config.json`, `data/{dev,staging,prod}/config.json`) so persisted metadata reflects Corner House
- [ ] Swap White Horse literals for brand constants in core metadata consumers (layout, manifest, sitemap, service worker, API route)
- [ ] Update key shared components/utilities/tests (Navbar parts, RestaurantSchema, blog types, mocks) to import/use the brand constant

## QA & Verification
- [ ] Run `npm run lint` (document pre-existing failures)
- [ ] Summarize any remaining intentional White Horse references (e.g., archival docs) in verification notes
