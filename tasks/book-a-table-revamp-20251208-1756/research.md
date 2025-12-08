# Research: Book a Table page revamp

## Existing Patterns & Components
- `/book-a-table/page.tsx` currently uses `RestaurantLayout`, `FadeIn` animation wrappers, DaisyUI utility classes (`btn`, `badge`, `card`) and a reduce-motion style block.
- Booking-related UI pieces already exist: `BookByPhoneCard`, `FindUsCard`, `TalkToTeamCard` (cards with CTA, phone/email/map links); `RestaurantHoursCard` for live hours; `InteractiveMap` for directions; design-system `Button` component; `BookingForm` + `BookingModal` for a full booking request form.
- Content/data sources: `getContactInfo()` provides phone/email/map links and booking URL; brand metadata via `BRAND`; SEO helpers `getSEOTags`/`renderSchemaTags` already wired in the current page.
- Layout conventions: pages often wrap sections in `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` with rounded cards and gradients (see `app/contact/page.tsx` for a tighter, two-column layout with hero + stacked cards and re-used hours/map components).

## Current Page Assessment
- The existing page is very long with multiple overlapping CTAs (hero, booking essentials, hosting planner, concierge, last-minute) and repeated info (call/email/buttons repeated across sections).
- Story-heavy marketing copy crowds the primary task (book a table). Multiple chips/badges and list blocks increase cognitive load, especially on mobile.
- No inline booking form; the fastest path is just a link out or call, despite having `BookingForm` available.

## Technical Constraints / Notes
- Next.js app router, server component for page; can continue to use `FadeIn` but keep reduce-motion support.
- Must keep accessibility: focus-visible, semantic headings, touch targets, aria labels; obey DaisyUI use preference.
- Keep SEO metadata generation (already handled) and schema tags; update content but not break existing exports.
- Avoid removing essential booking links from contact data; respect `bookingUrl` external vs internal handling.

## Opportunities / Recommended Direction
- Streamline to 3 clear blocks: (1) Hero with primary CTA (book online) + secondary (call) + quick assurances, (2) Booking form card with fallback actions, (3) Essentials panel combining hours, location/map, and contact shortcuts.
- Use existing `BookingForm` to let users submit without leaving page; add call-to-book fallback alongside form.
- Reuse `RestaurantHoursCard` and `InteractiveMap` within concise cards; keep badges minimal.
- Maintain mobile-first grid (single column stacking to two-column on lg) and keep visual hierarchy with 1–2 accent gradients instead of multiple sections.
- Remove marketing-heavy sections (hosting planner, concierge, same-day, multiple checklists) unless critical; condense copy to short supportive bullets.

## Open Questions
- None blocking; assume online booking URL remains valid and form submission can be local/no-op (existing pattern resets form). If external booking is preferred, keep button prominent and label accordingly.
