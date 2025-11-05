# Implementation Plan: Fix booking CTAs

## Objective

Ensure all booking-intent CTAs (Book, Enquire about private events) navigate to `/book-a-table`.

## Success Criteria

- [ ] “Book for Big Games” (events hero + banner) go to `/book-a-table`.
- [ ] “Enquire About Private Events” goes to `/book-a-table`.
- [ ] No regressions on other CTAs.

## Architecture

- Patch events page only: `app/events/page.tsx`.
- Keep generic components (`CallToActionSection`) unchanged.

## Components

- Events page hero button → `/book-a-table`.
- Events page banner button → `/book-a-table`.
- Private events CTA button → `/book-a-table`.

## Data Flow

- Static link to `/book-a-table` for reliable navigation and sitemap alignment.

## Testing Strategy

- Manual QA with Chrome DevTools (navigation, responsiveness, console errors).
- Verify e2e expectation remains true for sticky booking link (`/book-a-table`).

## Edge Cases

- If `contact.enquiryUrl` changes, events page still uses `/book-a-table`.

## Rollout

- Direct patch; no feature flags required.

