# Research: Homepage “Find Us” Section Revamp

## Existing Implementation
- `components/restaurant/LocationSection.tsx` currently powers the “Find us” block on the homepage (also imported via `components/ClientHomeContent.tsx` and optionally lazy-loaded by `components/optimized/LazyLocationSection.tsx`).
- Data dependencies:
  - `getContactInfo()` and `getRestaurantIdentity()` from `lib/restaurantData.ts` supply address, phone, email, and brand metadata. They already normalize map links, tel URIs, etc.
  - `RestaurantHoursCard` (variant="dark") renders operating hours; `InteractiveMap` shows an embedded map using normalized coordinates/URL.
  - `EmojiIcon` component used for small glyphs; no DaisyUI usage today.
- Layout: dark brand background, pill heading, static text, two cards (address + contact) plus the hours card stacked, and a map on the right. Grid is `lg:grid-cols-12` with 5-col info + 7-col map.
- Accessibility: headings and `address` tag exist, contact links have `aria-label`. Map container uses `title` prop but not `aria-label`. Section uses `<section>` with no `aria-label` but `id` on heading.

## Constraints & Requirements
- Follow `AGENTS.md`: DaisyUI components preferred, mobile-first approach, ensure focus-visible states, accessible semantics, performance-friendly (lazy/hydration safe), manual QA via Chrome DevTools later.
- Component reused from homepage; redesign must remain data-driven (no hard-coded addresses). Keep dependencies limited to existing data utilities to avoid schema changes.
- Keep compatibility with `LazyLocationSection` (should still render <LocationSection />). Consider optional props for animations/resizable features if needed.
- Keep map interactive but mindful of performance; `InteractiveMap` already handles embed/responsive behavior.

## Observations & Opportunities
- Current layout feels text-heavy and lacks clear CTAs (e.g., direct "Get directions" buttons, transport badges, parking tips). Map area is static; contact cards could use icons/pills to match new homepage aesthetic.
- Address/contact/hours all stack as similar cards; could restructure into “info rail” featuring travel tips, quick action buttons (Google Maps, call, Whatsapp).
- Section lacks multi-modal guidance (walking, cycling, bus). Could add highlight chips summarizing approach or parking.
- DaisyUI hero/panel styles + gradient backgrounds can align with new quick links/takeaway revamps for cohesive design.

## Inspiration & Patterns
- DaisyUI `hero`, `stats`, `card`, and `badge` components for building glass cards and highlight stats.
- Recently revamped sections (Quick Links, CTA) use glassmorphism, gradient overlays, lucide icons; reusing those patterns will maintain visual consistency.
- Consider `lucide-react` icons for clarity (map pin, bus, bike, parking). Already using lucide in CTA component.

## Risks / Considerations
- Ensure new icons/graphics don't rely solely on color; include text labels.
- Keep map accessible (aria labels, fallback). Avoid heavy animations that degrade performance; use CSS only.
- Balance column layout to remain responsive: on mobile show map below info, ensure cards have spacing/padding that doesn't overflow.
- Provide `aria-live`? probably not necessary; focus on semantics.

## Potential Enhancements
- Introduce highlight chips derived from data (maybe `contact.address.area` etc). Could create array of `travelTips` defined inline (since data doesn't have content). Accept some curated copy inside component (OK as long referencing brand?) or consider referencing config? Without schema, small curated copy acceptable.
- Add CTA buttons linking to Google Maps/Apple Maps using `contact.address.map` URLs.
- Overlay map with gradient and "Get directions" button float for quicker actions.
- Add stats: travel time to key landmarks, available parking spaces (text). Content can be static copy referencing known info (Retail Park opposite, 10-min walk to Abbey Stadium).
