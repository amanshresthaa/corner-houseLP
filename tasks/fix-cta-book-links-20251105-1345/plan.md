# Implementation Plan: Fix booking CTAs

## Objective

Ensure all booking-intent CTAs for “Book” navigate to `/book-a-table`, and the “Enquire About Private Events” CTA navigates to the relevant section on the Contact page.

## Success Criteria

- [ ] “Book for Big Games” (events hero + banner) go to `/book-a-table`.
- [ ] “Enquire About Private Events” goes to `/contact#contact-info-heading`.
- [ ] No regressions on other CTAs.

## Architecture

- Patch events page only: `app/events/page.tsx`.
- Keep generic components (`CallToActionSection`) unchanged.

## Components

- Events page hero button → `/book-a-table`.
- Events page banner button → `/book-a-table`.
- Private events CTA button → `/contact#contact-info-heading` (relevant section on Contact page).

## Data Flow

- Static link to `/book-a-table` for booking flows; static deep-link `/contact#contact-info-heading` for private events enquiries.

## Testing Strategy

- Manual QA with Chrome DevTools (navigation, responsiveness, console errors).
- Verify e2e expectation remains true for sticky booking link (`/book-a-table`).

## Edge Cases

- If `contact.enquiryUrl` changes, events page CTAs remain stable: booking → `/book-a-table`; private events → `/contact#contact-info-heading`.

## Rollout

- Direct patch; no feature flags required.
