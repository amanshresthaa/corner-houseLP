# Implementation Plan: Book a Table revamp

## Objective
Deliver a streamlined, mobile-first booking page that makes the primary CTAs (book online or call) obvious, trims redundant marketing sections, and surfaces essentials (form, hours, location) in one glance.

## Success Criteria
- [ ] Single hero with clear primary and secondary CTAs; no duplicate CTA blocks further down the page.
- [ ] Booking form available inline with proper labels, focus-visible styles, and success feedback.
- [ ] Essentials card combines live hours, contact shortcuts, and a map link without repeating text.
- [ ] Page works on mobile/tablet/desktop with no layout overflow or console errors.
- [ ] Accessibility: semantic headings, keyboard focus rings, touch targets ≥44px.

## Architecture
- Keep existing `generateMetadata` and schema tags; simplify JSX structure within the page component.
- Use existing components: `BookingForm` (client), `RestaurantHoursCard`, `InteractiveMap`, and `FadeIn` wrappers for gentle motion.
- Reuse contact data (`getContactInfo`) for all links; centralize booking button rendering with external/internal handling.

## Component Breakdown
- **HeroSection** (inline JSX): headline, short body, small assurance badges, primary/secondary CTAs using booking URL + tel.
- **BookingFormCard**: card wrapper around `BookingForm` with inline success enabled; footer contains call/email fallback.
- **EssentialsColumn**: compact cards for live hours, location/map CTA, and quick contact chips.

## Data Flow
- Server component fetches contact + brand constants and passes hrefs down to CTA helpers and child cards; `BookingForm` handles client-side state internally.
- Map/link URLs pulled from `contact.address.map` with fallbacks; bookingHref computed once and used for all CTAs.

## UI/UX Considerations
- Mobile-first stack; two-column layout activates at `lg` with balanced card heights.
- DaisyUI cards/buttons; gradients limited to hero only to reduce visual noise.
- Keep reduce-motion CSS for compliance; limit animation to `FadeIn` wrapper.
- Clear heading hierarchy: h1 hero, h2 for form/essentials sections, h3 inside cards.

## Edge Cases
- Missing `bookingUrl`: use contact form anchor fallback.
- External booking URL: annotate with "opens in new tab" via aria-label; use target blank only when needed.
- Map link missing: show disabled/hidden? (fallback to `#`).

## Testing Strategy
- Manual QA in browser via Chrome DevTools MCP: responsive breakpoints (375/768/1280), keyboard navigation, focus rings, prefers-reduced-motion check, console errors.
- Quick static checks: verify page builds by running `npm run lint` if time permits; otherwise smoke-test in dev server already running at localhost:3001.

## Rollout
- No feature flags; ship as page replacement.
