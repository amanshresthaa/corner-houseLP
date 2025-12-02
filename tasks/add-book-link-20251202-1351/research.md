# Research: Add Nabatable booking link to /book-a-table (Phase 1)

## Phase 0 — Initial Requirements & Success Criteria
- Requirement: Expose an online booking link to https://www.nabatable.com/restaurants/white-horse-pub-waterbeach/book on the /book-a-table page (localhost:3000/book-a-table) without removing the existing phone/email paths.
- Success criteria:
  - A clear, accessible CTA on /book-a-table opens the Nabatable URL (new tab, noopener) and remains discoverable on mobile and desktop.
  - Existing phone booking CTA and contact info stay intact.
  - Page still renders without console errors; layout remains responsive.

## Existing Patterns & Code Paths
- Page file: `app/book-a-table/page.tsx` uses `RestaurantLayout`, `FadeIn`, schema tags, and grid of cards: `RestaurantHoursCard`, `BookByPhoneCard`, `FindUsCard`, `LargeGroupsCard`. Hero already sets `prefers-reduced-motion` styles.
- `BookByPhoneCard` (`app/book-a-table/_components/BookByPhoneCard.tsx`) is a DaisyUI-style `card` with a single primary button `<a>` using brand colors and focus ring; secondary contact info shown in a bordered panel. Currently only supports phone/email, no online link prop.
- Contact data comes from `getContactInfo()` in `lib/restaurantData.ts`; `contact.bookingUrl` field exists but is unset (fallback `undefined`). Other components fetch contact centrally.
- Other CTA patterns with external booking links: `components/restaurant/sections/CallToActionSection.tsx` supports `external` links with `target="_blank" rel="noopener noreferrer"` and shows ↗ icon. `app/christmas-menu/page.tsx` uses `MotionLinkButton` buttons for external booking.
- Design system: DaisyUI classes in use (`card`, `btn`-like custom class combos). Brand colors `bg-brand-700/800`, focus-visible rings already used in BookByPhone card.
- Additional booking CTAs across site:
  - Home hero (`components/restaurant/Hero.tsx`) primary CTA defaults to `/book-a-table` and infers external flag from the URL.
  - Menu hero (`components/menu/MenuHero.tsx`) hard-codes `/book-a-table` as Book Online link, no external handling.
  - Events page hero and live-sports banner (`app/events/page.tsx`) use `/book-a-table` in `<a>` tags, with no new-tab logic.
  - About page CTA (`app/about/page.tsx`, function `CallToAction`) uses `/book-a-table` and a telephone link.

## Technical Constraints / Notes
- Next.js App Router (app/ directory) with server component page; child cards are client components. Keep new client-side logic minimal.
- Accessibility expectations: visible focus rings, touch target ≥44px, `touch-action: manipulation` used on call button; follow same for new CTA. External links should announce new tab.
- Layout grid: within `<main>` grid `max-w-6xl` using `md:grid-cols-12`; cards occupy 8/4/4/8 columns—adding another column requires mindful reshuffle.

## Open Questions
- Where should the online CTA live (inside existing phone card vs separate card)? -> Lean toward augmenting the booking card to present online + phone options together without shifting overall grid.

## Recommendations
- Add `bookingUrl` to `config/restaurant.json` so `getContactInfo()` exposes a single source of truth for the Nabatable link.
- Extend `BookByPhoneCard` to optionally render an “Book Online” button when `bookingUrl` is provided, opening in a new tab with external icon/text cue, while keeping phone CTA primary/secondary as needed.
- Keep mobile-first spacing: stack buttons with `gap-3`, full-width buttons, `text-base` for 16px minimum.
- Update page copy subtly if needed to reflect online bookings are available (but keep core copy intact to avoid scope creep).
- Plan to re-run targeted UI checks (console, responsiveness) via Chrome DevTools MCP during verification.
