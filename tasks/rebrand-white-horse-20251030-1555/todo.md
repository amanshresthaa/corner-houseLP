# Implementation Checklist

## Config & Data
- [ ] Update `config/restaurant.json` with White Horse identity/contact/address/hours.
- [ ] Refresh `lib/restaurantData` fallbacks (identity, address, contact, hours, social, meta) to White Horse.
- [ ] Adjust `src/lib/data/schemas.ts` defaults and `config.ts` branding/email domains.
- [ ] Update environment labels in `src/lib/content/environment.ts`.

## Shared Assets
- [ ] Revise `src/lib/images.ts` paths/alt text to White Horse context.
- [ ] Update service worker header and any global strings (e.g., `public/sw.js`).

## Pages & Components
- [ ] Replace legacy copy in core components (`Hero`, `Footer`, About, etc.) referencing The White Horse/Waterbeach.
- [ ] Rewrite events, blog, legal, offline/not-found pages with Waterbeach/White Horse details.
- [ ] Check CTA labels, aria text, structured data helpers for phone/email/map updates.

## Tests & Fixtures
- [ ] Update Jest/unit fixtures (`__tests__`, `tests/`, `test/setupServerTests.ts`) to new branding.
- [ ] Ensure schema tests expect new defaults.

## Validation
- [ ] Run `pnpm run build`.
- [ ] Capture results of manual QA in `verification.md` after DevTools pass.

## Questions/Notes
- Pending: confirm any intentional historical references to "The White Horse" should remain (assume replace unless quoting external source).
