# Research: Homepage Takeaway Banner Revamp

## Current Component
- File: `components/restaurant/TakeawayBanner.tsx` renders a centered stack with emoji pill, headline, short blurb, a call-to-order button, and three bullet chips.
- Data dependencies: `getContactInfo()` for phone display/tel link and `BRAND.nickname` for headline copy.
- Styling relies on simple gradient background + emoji icons; lacks DaisyUI patterns and parity with newly revamped sections.
- No CTA variety beyond phone link; no quick access to delivery partners or takeaway menu.

## Other References
- `CallToActionSection` and `LocationSection` revamps use lucide icons, DaisyUI `btn` styles, and gradient glassmorphism. Banner should align with these patterns.
- Schema/content unaffected: banner copy is component-local; only dynamic bits are phone number and brand nicknames.

## Opportunities
- Add two-column responsive layout (copy column + media/imagery). Could use static asset from `/public/images/white-horse/dishes/...` like sizzler dish to maintain cohesion.
- Introduce action buttons: call hotline, view takeaway menu, book table for pickup; optionally highlight delivery partners (Deliveroo/Uber Eats/Just Eat) via chips.
- Provide timeline/steps for ordering (e.g., 3-step process cards) to add value.
- Use lucide icons for clarity (PhoneCall, MenuSquare, Flame, Clock) and DaisyUI badges for service levels.

## Constraints
- Keep component data-driven for contact info; no schema updates needed.
- Maintain `use client` semantics; ensure `EmojiIcon` optional (or replace with lucide).
- Accessibility: focus-visible, `aria-label` on CTAs, semantic structuring with `h2`, `p`, `ul` etc.
- Performance: static asset should use `next/image` with proper sizing/responsive behavior (prefers `sizes` attr, `priority` maybe false).

## Testing Considerations
- Need new Jest test file (if not existing) verifying CTA button hrefs, dynamic phone text, presence of highlight chips, and image fallback. Format similar to LocationSection tests.

## Risks
- Hard-coded copy referencing brand/phone must stay in sync with `BRAND` constants; use `BRAND.nickname` / `BRAND.shortName` as needed.
- Ensure tel link sanitized; reuse helper like `formatTelHref`.
