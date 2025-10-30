# Research: Book a Table Page

## Initial Requirements

- Replace all navigation or CTA links pointing to the existing `togo` destination so that they lead to a new `book-a-table` page.
- Implement a dedicated `book-a-table` page that aligns with established site structure and styling.
- Ensure the new page integrates with existing navigation and provides clear booking information or call to action.

## Success Criteria

- Every former `togo` link now routes users to the new `book-a-table` page without broken links.
- The `book-a-table` page renders correctly across supported devices and matches established design patterns.
- No regressions introduced in existing navigation or booking-related flows.

## Existing Patterns

- `RestaurantLayout` (components/restaurant/Layout.tsx) wraps most public pages with navbar/footer and should be reused for the new booking page.
- `BookingModal` (components/restaurant/BookingModal.tsx) already implements a booking form with validation, labels from `useContent`, and accessibility features—good candidate for extracting a reusable form.
- `CallToActionSection` and `MenuCTASection` (components/restaurant/sections) show button variants and CTA styling conventions that currently link to Togo.
- `StickyCallButton` (components/StickyCallButton.tsx) rotates quick actions and hardcodes the Togo URL for the booking option.
- Home hero and other CTAs (components/restaurant/Hero.tsx, components/menu/MenuHero.tsx) lean on Framer Motion + DaisyUI styled buttons; these should mirror internal booking navigation once updated.
- Content is sourced via `getContentSmart` from `config/content.json`, where multiple `bookUrl` entries point at the Togo link.

## External Resources

- No external docs required so far; existing repo patterns and design system components cover the needed functionality.

## Technical Constraints

- Current `app/book-a-table/page.tsx` is a server component that immediately calls `redirect(BOOKING_URL)`, so the new page must replace this logic entirely.
- `ContentSchema` (src/lib/data/schemas.ts) defines page data for home/menu/contact/etc. but lacks a `book-a-table` entry. Either the page supplies its own content or the schema must be extended if we want CMS-driven copy.
- Numerous files hardcode the Togo URL (config/content/pages/home.json, config/content.json, multiple blog pages, components, tests, Playwright spec, etc.); each must change to the internal `/book-a-table` route to stay consistent.
- Tests (Jest + Playwright) explicitly assert the Togo link, so they need updates alongside the code to keep CI green.
- `StickyCallButton` and other client components currently rely on `<a>` elements targeting `_blank`; after switching to an internal page we need to ensure navigation remains accessible and SPA-friendly (likely via `next/link`/router push).

## Recommendations

- Extract the form portion of `BookingModal` into a shared client component (e.g., `BookingForm`) so both the modal and the new page reuse identical fields, validation, and success handling.
- Rebuild `app/book-a-table/page.tsx` as a full `RestaurantLayout`-wrapped page featuring hero copy + embedded `BookingForm`, supplementary info (phone, hours, parking), and SEO metadata tuned for in-site booking.
- Replace all `https://togo.uk.com/...` references with `/book-a-table` in navigation JSON, components, and markdown/blog content; ensure components that previously set `external` flags now treat the link as internal.
- Update Jest and Playwright tests to match the new behavior (internal link, no `_blank`, etc.) and add coverage for the new form component if we extract it.
- After implementation, run targeted lint/tests and perform manual Chrome DevTools QA on mobile/tablet/desktop to verify navigation, focus, and responsive layout for the booking page and sticky button.
