# Implementation Checklist

## Setup

- [x] Import/reuse shared sections (QuickLinksSection, RegularEventsSection, EventsUpdatesSection, EventsContactSection, CallToActionSection, LocationSection) inside `app/events/page.tsx`.
- [x] Derive quick link + CTA data structures using `getContactInfo` + `content.pages.events`.

## Sections & UI

- [x] Rebuild hero band with design-system spacing, dynamic eyebrow/title/subtitle/badges, and CTA buttons honoring booking URL behavior.
- [x] Create light "Live Sport & Cabins" highlight band with broadcast badges + matchday feature chips.
- [x] Inject `QuickLinksSection` configured for events tasks (book table, heated cabins, fixtures, view menu/contact).
- [x] Surface `RegularEventsSection` data (with fallback copy) inside a light gradient band.
- [x] Add dark split layout combining `EventsUpdatesSection` and `EventsContactSection` with consistent shells.
- [x] Refresh matchday experience grid (light) ensuring cards follow outline style and sport badges reuse DaisyUI tokens.
- [x] Configure closing `CallToActionSection` (dark theme) for private/group bookings referencing contact info + CTA buttons.

## Verification

- [ ] Run relevant lint/tests (at minimum targeted component/page tests) to ensure no regressions.
- [ ] Complete Chrome DevTools manual QA and capture notes in `verification.md`.
