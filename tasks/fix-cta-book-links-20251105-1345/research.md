# Research: Fix booking CTAs to land on Book a Table

## Existing Patterns

- Canonical booking route exists at `/book-a-table` (see `app/book-a-table/page.tsx`, sitemap, tests in `e2e/check-sticky-button.spec.ts`).
- Most CTAs across pages already use `/book-a-table` (menu page, about page, sticky FAB, slideshow).
- Events page (`app/events/page.tsx`) uses `enquireHref` derived from `contact.enquiryUrl` or `mailto:` for booking/enquiry CTAs:
  - Hero CTA: “Book for Big Games” → `href={enquireHref}`
  - Live Sports banner CTA: “Book for Big Games” → `href={enquireHref}`
  - Private events CTA button: “Enquire About Private Events” → `href={enquireHref}`

## External Resources

- Internal tests expect bookmarkable path `/book-a-table`.
- Content JSON in `config/content/pages/home.json` includes a mailto for “Email the team” (not a booking CTA).

## Technical Constraints

- Next.js app router with server components.
- DaisyUI and existing Button/CTA components are in use; keep consistency.
- Avoid changing generic components; patch page-level links to keep scope minimal.

## Recommendations

- Update Events page “Book for Big Games” CTAs to `/book-a-table`.
- Update “Enquire About Private Events” to deep-link the Contact page: `/contact#contact-info-heading`.
- Do not change generic mailto links that are not booking intentions (e.g., “Email the team”).
- Verify via Chrome DevTools that CTAs navigate correctly and no console errors occur.
