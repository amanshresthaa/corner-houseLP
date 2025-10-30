# Implementation Plan: Book a Table Page

## Objective

Deliver an in-site “Book a Table” experience that replaces all external Togo links with an internal `/book-a-table` page, reusing existing booking UI patterns and preserving navigation + CTA integrity.

## Success Criteria

- All former `https://togo.uk.com/...` references now point to `/book-a-table` (navigation, CTAs, sticky FAB, blog CTAs, configs, tests).
- `/book-a-table` renders a full booking page with hero content, embedded booking form, and supporting information using established design tokens.
- Booking modal behaviour remains intact and reuses the extracted form without regressions.
- Updated unit/e2e tests pass locally.

## Architecture

### Components

- Create `components/restaurant/BookingForm` (client) encapsulating form state/validation currently inside `BookingModal`.
- Update `components/restaurant/BookingModal` to render the new `BookingForm`.
- Build `app/book-a-table/page.tsx` as a server component using `RestaurantLayout`, `FadeIn`, `BookingForm`, and supporting DaisyUI cards.

### State Management / Data Flow

- `BookingForm` manages its own controlled inputs and calls an `onComplete` callback (used by modal to close, by page to show confirmation state).
- Form copy/labels continue to come from `useContent` to stay CMS-driven; fallback copy defined within form component.
- Page-level supporting data (e.g., contact info, hours) fetched via existing helpers (`getContentSmart`, `getRestaurantInfo`/`getContactInfo`).

### API / Data Dependencies

- No new APIs; rely on existing config JSON and hooks.
- Update `config/content.json` & `config/content/pages/home.json` so `bookUrl` / CTA data now show the internal route and remove `external` flags where no longer applicable.

## UI/UX Considerations

- Mobile-first layout: form sits in stacked card on small screens, alongside helpful info blocks.
- Honor `prefers-reduced-motion` as other pages do.
- Ensure focus order and keyboard navigation remain logical (form fields, sticky button, CTA buttons).
- Provide confirmation feedback on submission without blocking alerts whenever possible (page variant should show inline success message).

## Implementation Steps

1. Extract booking form markup/logic from `BookingModal` into `components/restaurant/BookingForm`, exposing props for `onComplete`, `heading`, and success feedback.
2. Refactor `BookingModal` to consume `BookingForm` and maintain existing modal shell + analytics.
3. Build new `/app/book-a-table/page.tsx`:
   - Set updated SEO metadata.
   - Add hero/intro section, inline booking form, and supplemental info (contact, hours, private hire CTA).
   - Include structured data if appropriate.
4. Replace all hardcoded Togo URLs with `/book-a-table` across configs, components, blog posts, sticky FAB, menu hero, etc., adjusting `external` flags.
5. Update Jest + Playwright tests (CTA sections, sticky button) to expect internal navigation; add coverage for `BookingForm` if needed.
6. Run targeted lint/tests (unit + relevant e2e if feasible) and document results; prepare manual QA checklist.

## Edge Cases

- Ensure sticky FAB navigation works in SPA context (no full reload); fallback for no-JS remains functional (plain anchor still navigates).
- Confirm blog markdown links render correctly after internal route change.
- Validate booking modal focus trap still operates after form extraction.
- Handle form validation errors and required fields gracefully on both modal and page.

## Testing Strategy

- Jest: update existing snapshot/behaviour tests (MenuCTASection, CallToActionSection) and add new tests for `BookingForm` submit logic.
- Playwright: adjust sticky FAB spec to assert `/book-a-table` routing.
- Manual QA via Chrome DevTools on mobile/tablet/desktop: focus management, sticky FAB, booking page layout, reduced motion.

## Rollout Plan

- No feature flags; deploy once ready.
- Monitor analytics events for booking interactions post-release to ensure tracking still fires (booking FAB `track('book_click')` should send new href).
