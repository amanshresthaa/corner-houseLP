# Implementation Plan: Book a Table Rhythm Refresh

## Objective
- Rebuild `/book-a-table` so each vertical band strictly alternates dark and light palettes while presenting concise booking stories (hero promise, essentials, hosting perks, closing CTA).
- Align copy, typography, and CTA tokens with the shared homepage design system and document the new rhythm in `docs/homepage-design-system.md`.

## Success Criteria
- [ ] Page renders with at least four sections following dark → light → dark → light ordering.
- [ ] Each section uses the prescribed container (`max-w-6xl px-4 sm:px-6 lg:px-8 py-16`) and button styles.
- [ ] Reuses existing data/components (contact info, cards) to avoid duplicate logic.
- [ ] Tests (book-a-table components) and lint pass.
- [ ] New rhythm entry exists in `docs/homepage-design-system.md`.

## Architecture & Section Breakdown (from-scratch rebuild)
1. **Hero (Dark gradient)**
   - Fresh layout with left column for copy + CTAs, right column for stat cards stacked vertically.
   - Add “response promise” pill (e.g., “Replies within a day”), highlight chips (families, cabins, location) and CTA pair (solid white booking + white-outline call) following DaisyUI tokens.
   - Introduce a three-point “Booking checklist” row with icons to quickly communicate booking flow, walk-ins, and concierge support.

2. **Booking Essentials Console (Light)**
   - Rebuild as a four-up grid: intro card + three functional cards.
   - Intro card: copy + bullet list referencing hours/contact/directions; CTA row linking to booking and map.
   - Wrap `RestaurantHoursCard`, `BookByPhoneCard`, `FindUsCard` inside white shells but add consistent header badges and ensure responsive stacking (1 column mobile, 4 columns desktop).

3. **Hosting Planner (Dark)**
   - Replace previous cards with a two-column system: left column hero copy (cabins, marquee, private hire) + CTA tray; right column timeline-style cards for “Crew types” (matchdays, milestones, corporate) and “Service promises”.
   - Add white glass stat rail (capacity, lead time, deposit policy) at top for quick facts.

4. **Concierge & Assurance Hub (Light)**
   - Build a dual-pane layout: left pane describing concierge workflow with step indicators (Enquire → Plan → Confirm) plus CTA pair; right pane features accordion-style cards for dietary, accessibility, reply times, cancellation policy.
   - Include contact microcopy (email + tel) at bottom with DaisyUI focus states.

5. **Same-day & Walk-ins CTA (Dark)**
   - Final dark band summarizing walk-in policy, call-to-check prompt, and quick link to maps.
   - Use stat chips (Walk-ins saved daily, Live wait updates, Pool table Sundays) and CTA pair (call + get directions) to close loop.

## Data Flow & State
- `BookATablePage` remains an async server component; data retrieved synchronously via `getContactInfo()`.
- New arrays (`heroHighlights`, `experienceCards`, `assuranceList`) defined inline; no external fetches required.
- Existing client components remain untouched; wrappers provide styling + layout.

## Testing Strategy
- Run targeted Jest suite covering book-a-table components (`npm run test -- book-a-table` pattern) or fallback to `npm run test -- BookByPhoneCard` if no glob matches.
- If lint warnings appear due to tailwind classes, run `npm run lint`.
- Manual QA via Chrome DevTools MCP: inspect `/book-a-table`, check responsive layouts, verify focus states, and document results in `verification.md`.

## Implementation Steps
1. Update `app/book-a-table/page.tsx` – restructure JSX into defined sections, create helper arrays, and ensure Tailwind classes follow tokens.
2. Ensure CTA `aria-label`s and DaisyUI button classes align with palette rules; use `Link` for internal nav.
3. Adjust `BookByPhoneCard`/`FindUsCard` wrappers if necessary (prefer composition before editing child components).
4. Append `/book-a-table` rhythm summary to `docs/homepage-design-system.md` mirroring `/events` format.
5. Run tests + lint, then carry out Chrome DevTools verification and capture findings in `verification.md`.
