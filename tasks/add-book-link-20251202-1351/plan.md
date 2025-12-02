# Implementation Plan: Add Nabatable link on /book-a-table

## Objective
Expose the Nabatable booking URL on the /book-a-table page while preserving the existing phone-first flow.

## Success Criteria
- [ ] The /book-a-table page shows a clear “Book online” CTA that opens https://www.nabatable.com/restaurants/white-horse-pub-waterbeach/book in a new tab.
- [ ] Phone and email booking options remain available and visually balanced on mobile and desktop.
- [ ] Home hero, Menu hero, Events page (hero + live sports banner), and About CTA surface the Nabatable link with proper external semantics while keeping existing internal/phone options.
- [ ] Schema/SEO data continues to render without errors; page passes smoke tests and console is clean.

## Architecture & Data
- Source booking URL via `getContactInfo()` by setting `contact.bookingUrl` in `config/restaurant.json` (centralized contact source).
- Extend `BookByPhoneCard` to accept an optional `bookingUrl` and render an external CTA when present; keep existing props intact.
- Pass `contact.bookingUrl` from `app/book-a-table/page.tsx` into the card; lightly refresh hero copy to mention online booking.
- JSON-LD reservation schema can include the online URL in `acceptsReservations` alongside telephone to reflect capability.

## Components / Files to touch
- `config/restaurant.json` — add `contact.bookingUrl` with Nabatable link.
- `app/book-a-table/_components/BookByPhoneCard.tsx` — render online CTA + ensure accessibility.
- `app/book-a-table/page.tsx` — pass bookingUrl, adjust copy, tweak schema if needed.
- `components/restaurant/Hero.tsx` — route primary CTA to bookingUrl when present and mark external.
- `components/menu/MenuHero.tsx` — use bookingUrl for Book Online with new-tab semantics.
- `app/events/page.tsx` — swap book CTA hrefs to bookingUrl with external affordance.
- `app/about/page.tsx` — CTA uses bookingUrl and external link treatment.
- `__tests__/book-a-table/BookByPhoneCard.test.tsx` (new) — RTL test ensuring online CTA renders with correct href/target when provided and omits when absent.

## Data Flow
Content: config → `getContactInfo()` → page → `BookByPhoneCard` props → rendered CTA (external link with new tab). Phone/email untouched.

## UI/UX considerations
- Mobile-first: stack buttons full-width with adequate spacing; maintain 16px text and 44px hit targets.
- External link should announce new tab (aria-label) and use `rel="noopener noreferrer"`; include subtle ↗ indicator for affordance.
- Maintain focus-visible ring consistent with existing brand styles; keep `touch-action: manipulation`.

## Edge Cases
- Missing `bookingUrl`: component should gracefully fallback to current phone-only layout with no visual regression.
- Slow external load: no client-side fetch; CTA is simple anchor to avoid blocking.

## Testing Strategy
- Unit: BookByPhoneCard renders online CTA with correct attributes when `bookingUrl` supplied; none when absent.
- Manual QA: Use Chrome DevTools MCP on /book-a-table to confirm CTA presence, responsiveness, focus order, and console cleanliness.

## Rollout
- No feature flag; static content change. Deploy via normal build pipeline once QA verified.
