# Research: Contact Page Revamp

## Existing Patterns

- `app/contact/page.tsx` currently renders a single dark hero plus a simple white body using `RestaurantLayout`, `FadeIn`, and dynamic sections (`ContactInfoSection`, `RestaurantHoursCard`, `ContactFeaturesSection`, `SocialMediaSection`, `InteractiveMap`). The layout sticks to `max-w-6xl` containers but lacks the newer dark/light rhythm and glass cards from the homepage system.
- `ContactInfoSection`, `ContactFeaturesSection`, and `SocialMediaSection` live in `components/restaurant/sections/` with lightweight neutral cards. They can provide data structures but need upgraded styling (rounded-[2.5rem], outline borders, gradients) to stay consistent with the homepage snapshot.
- `docs/homepage-design-system.md` defines spacing (`max-w-6xl px-4 sm:px-6 lg:px-8`, `py-12/16`), alternating palettes, typography tokens (`font-display`, uppercase eyebrow chips), DaisyUI button treatments, and card recipes (glass for dark, white outline for light). Other pages (about/events/book-a-table) already follow a dark→light cadence with glass cards, CTA pairs, highlight grids, and map embeds.
- `RestaurantHoursCard` and `InteractiveMap` already implement glass cards + focusable wrappers that match the system; we can wrap them inside new shells to maintain rhythm.
- Content is fetched from `getContentSmart()` with `content.pages.contact` providing hero copy, contactInfo, hours, and features, so the new UI should continue to hydrate from this source for copy DRYness.

## External Resources

- Homepage design system snapshot (`docs/homepage-design-system.md`) is the canonical visual reference for gradients, spacing, typography, cards, and CTA styling.
- Restaurant data helpers in `lib/restaurantData.ts` expose canonical contact info (`getContactInfo`, `getFormattedAddress`, `getAddress`, `getRestaurantIdentity`) plus social links so we avoid hardcoding numbers/emails and stay resilient to config changes.

## Technical Constraints

- Next.js App Router page uses async server component with `RestaurantLayout` and `generateMetadata`; dynamic imports keep bundle sizes small, so we should keep or expand this approach.
- DaisyUI + Tailwind utility stack; prefer existing button patterns and `font-display` for hero headings.
- Accessibility requirements from AGENTS.md: focus-visible rings, accessible names, keyboard nav, `touch-action: manipulation` on tappable CTAs, no blocking zoom, maintain semantic headings.
- Must follow Context Engineering workflow (research → plan → todo → implementation → verification) and run manual Chrome DevTools QA per AGENTS.

## Recommendations

- Rebuild `/contact` as a five-band experience mirroring homepage cadence (Dark hero → Light essentials → Dark concierge/same-day support → Light planning cards → Dark CTA + map). Alternate gradient backgrounds and wrap subsections inside `max-w-6xl` containers to avoid layout shifts.
- Keep hero dynamic by reading `contactContent.hero` but render it using the new display typography, eyebrow pill, highlight chips (e.g., “Call us daily”, “Same-day tables”), and CTA trio (call/email/directions) with DaisyUI `btn` patterns.
- Expand the contact essentials band into modular cards (call, email, visit, concierge) using `CONTACT`, `ADDRESS_LINE`, and `content.pages.contact.contactInfo`. Use light outline cards with icons, `rounded-[2.5rem]`, `border-brand-100`, and responsive grid.
- Place `RestaurantHoursCard`, `ContactFeaturesSection`, and `SocialMediaSection` inside themed shells (dark glass or white cards) to align with new rhythm. Consider enhancing `ContactFeaturesSection` output to better fit glass cards (icon chips, bullet lists, CTA link if supplied).
- Embed `InteractiveMap` inside a dark glass gradient to close the page, pairing it with CTA buttons (call, Google Maps, Apple Maps). Ensure map wrapper has focusable label + `aria-describedby` for accessibility.
- Add data-driven highlight stats (response time, concierge support, events contact) sourced from existing content or sanitized constants to make the page feel richer without introducing new APIs.
