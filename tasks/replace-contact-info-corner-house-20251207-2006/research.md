# Research: Corner House contact replacement

## Existing patterns and sources
- **config/restaurant.json** holds canonical contact/address, still set to `231 Newmarket Road, Waterbeach, CB5 8JE` with old coordinates and Google embed.
- **lib/restaurantData.ts** defines fallback identity/contact/address mirroring the old values; downstream loaders/tests rely on it.
- **Mocks & tests**: `test-utils/mocks/handlers.ts`, `tests/test-utils/msw-handlers.ts`, and component tests (e.g., `ContactInfoSection.test.tsx`) assert the old address/postcode.
- **SEO/links**: hard‑coded Google Maps URLs in `libs/seo.tsx`, `components/restaurant/TestimonialsSection.tsx`, `HomepageReviewHighlights.tsx`, `components/seo/RestaurantSchema.tsx` referenced the Waterbeach address/postcode.
- **Docs/content**: `libs/seo-examples.md`, `Everythingyouneed/*.md`, and `app/christmas-menu/page.tsx` contain the old address for examples/copy.

## Target contact details
- Address: **231 Newmarket Road, Cambridge CB5 8JE**
- Phone: **+44 1223 921122** (already used in several places)
- Email: **cornerhouse@lapeninns.com** (no Gmail per request)
- Coordinates (from Corner House dataset): **lat 52.20948, lng 0.14335**
- Map label: Corner House Cambridge (replace Waterbeach map strings)

## Constraints / requirements
- Follow AGENTS workflow: task folder, plan, todo, verification; no skipping phases.
- Do not reintroduce order-online CTAs; seasonal banner already removed.
- Approval policy `never`, so avoid commands requiring escalation; editing is allowed (danger-full-access).

## Recommendations
- Update canonical data first (`config/restaurant.json`, `lib/restaurantData.ts`) then sync mocks/tests.
- Replace hard-coded map URLs/postcodes and address strings with the new Cambridge details.
- Run `rg` to confirm no `231 Newmarket Road` / `CB5 8JE` remain.
- Regenerate `config/content.min.json` only if dependent content changes; otherwise keep existing generated file.
