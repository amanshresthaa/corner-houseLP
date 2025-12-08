# Research: Book a Table Page Rhythm Refresh

## Existing Patterns & References
- `app/events/page.tsx` already mirrors the mandated dark ↔ light cadence with gradient backgrounds, `rounded-[2.5rem]` cards, and DaisyUI button tokens (solid primary + outline secondary).
- `components/restaurant/sections/QuickLinksSection` and `HomepageReviewHighlights` illustrate how glass cards (`bg-white/5 border-white/15`) and uppercase eyebrow chips are implemented on dark bands.
- Current `/book-a-table` components – `RestaurantHoursCard`, `BookByPhoneCard`, `FindUsCard`, and `LargeGroupsCard` – provide reusable content contracts, so we can wrap them in new white cards instead of rebuilding logic.
- `docs/homepage-design-system.md` documents the required container sizing (`max-w-6xl px-4 sm:px-6 lg:px-8 py-16`), typography tokens (`font-display`, `tracking-[0.35em]` eyebrows), and CTA styles for both palettes.

## Content & Data Sources
- `getContactInfo()` (already imported) supplies booking URL, telephone, and address, so hero CTAs and map links can reuse those values without extra fetches.
- `RestaurantHoursCard` accepts a `variant="light"`, giving us a ready-made hours block that fits the light section when nested inside a rounded white shell.
- `BookByPhoneCard`, `FindUsCard`, and `LargeGroupsCard` are client components with their own visual styles; they can sit inside larger cards but may need extra wrappers to match the light section’s rounded-[2.5rem] radii.

## Constraints & Requirements
- Alternating rhythm must begin with a dark hero and then strictly switch palettes for every subsequent band.
- Each section needs a focused story (hero promise, essentials grid, hosting perks, reassurance CTA) with concise copy and at most two CTAs.
- Buttons must follow DaisyUI contracts: dark sections use solid `bg-brand-900 text-white` primaries + white-outline secondary; light sections use `bg-white text-brand-900` or brand-outline styling.
- Cards on dark backgrounds must use glassmorphism tokens (`bg-white/5 border-white/15`); light cards must use `bg-white/95 border-brand-100 rounded-[2.5rem] shadow-2xl`.
- Need to document the new rhythm in `docs/homepage-design-system.md` similar to the `/events` entry, noting the section order and palette.

## Opportunities / Recommended Direction
- Dark Hero: reuse SEO copy but tighten headline + add CTA pair (Book online + Call) plus highlight chips to echo events hero.
- Light Booking Essentials: wrap `RestaurantHoursCard`, `BookByPhoneCard`, and `FindUsCard` inside a three-card grid using white shells; include a concise intro column.
- Dark Experiences: introduce glass cards for “Garden cabins”, “Milestones & celebrations”, and “Booking assurances” with bullet lists and CTA anchors.
- Light Assurance CTA: repurpose `LargeGroupsCard` copy into a white band encouraging bespoke planning, plus a supporting checklist for accessibility/allergy handling.
- Consider a final dark CTA reminding guests about same-day bookings or drop-ins to maintain alternation if needed.

## Open Questions
- None identified; all data sources live locally and no new APIs are required.

## Next Steps
1. Architect section order + content per alternating rhythm.
2. Update `/app/book-a-table/page.tsx` to render new JSX structure, reusing existing cards where possible.
3. Refresh `docs/homepage-design-system.md` with the /book-a-table cadence entry.

---

# Deep Dive: Content Audit for /book-a-table

## Visitor Intents & Evidence
- **Immediate bookings** – Primary CTAs from `public/data/marketing.json` (bookTable/bookOnline) and navbar buttons signal this page must prioritise “Book online” + “Call” options.
- **Planning visits** – `config/restaurant.json` exposes booking metadata (walk-ins allowed, no deposit, party size limit 12) and live hours; page should surface these practical details without forcing a contact-page hop.
- **Directions** – Contact config (`config/content/pages/contact.json`) repeats address/opposing landmarks; `/book-a-table` should keep a concise “Find us opposite Cambridge Retail Park / Abbey Stadium” summary plus Google Maps CTA so guests don’t bounce.
- **Private hire / celebrations** – Events page already sells experiences, but booking page still needs a short assurance that heated cabins, marquee, and milestones can be handled, with clear hand-off to `/contact` for complex enquiries.
- **Same-day reassurance** – On-site booking rules (`booking.walkIns` true, `leadTimeMinutes: 0`) imply we should keep messaging around last-minute calls/walk-ins and live wait help.

## Non-Negotiable Blocks to Keep
1. **Hero CTA band** – Needs eyebrow > display heading > white primary button (book online) + outline phone CTA, plus 2–3 badges summarising unique offers (families/dogs, cabins, location). Source text from `config/restaurant.json.identity` and existing hero copy.
2. **Live hours + booking options + map** – The “Booking essentials” band should always include the `RestaurantHoursCard` (since it consumes live data via `useOpeningHours`), `BookByPhoneCard` (online CTA + tel/email flows), and `FindUsCard` (InteractiveMap + external link). Intro copy stays ultra concise: what info lives inside each card.
3. **Hosting/Assurances** – Keep at least one section outlining cabins/private hire/milestones/assurances because contact + events pages point people here to initiate bookings; emphasise bullet-proofing (dietary, accessibility, concierge follow-up). CTA should route to booking URL plus `/contact#contact-info-heading`.
4. **Concierge / Special Requests** – Maintain copy about response times, allergy/accessibility coordination, and multi-channel follow-up (call/email). This differentiates `/book-a-table` from a generic booking embed.
5. **Same-day CTA** – Keep final dark CTA emphasising walk-ins, call to confirm, and quick directions to satisfy spontaneous visitors given `booking.walkIns = true`.

## Content to Trim or Relocate
- Don’t repeat menu highlights, events promos, or general story copy—those live on `/menu`, `/events`, `/about`.
- Avoid re-listing the entire features grid from `/contact` (screens, free WiFi, etc.); keep only what impacts booking decisions (cabins, accessibility, location cues).
- Concierge checklist should focus on bookings (dietary, accessibility, reply times) rather than marketing perks.

## Data & Component Sources
- **Contact data**: `getContactInfo()` (wraps `config/restaurant.json`) fuels tel/email/booking URL + map and ensures updates cascade.
- **Hours**: `RestaurantHoursCard` already handles open/close logic, toggles, skeleton states, and CTA; keep it instead of duplicating hours markup.
- **Map**: `FindUsCard` uses `InteractiveMap` (safe area + focusable) ensuring consistent map behaviour.
- **Phone/Online CTA**: `BookByPhoneCard` includes booking URL button, tel CTA, and cancellation info; reusing it keeps tests (`tests/components/book-a-table/BookByPhoneCard.test.tsx`) valid.
- **Schema**: `reservationSchema` in `/app/book-a-table/page.tsx` should remain untouched to preserve SEO signals.

## Competitive Differentiators (Why Users Stay on this Page)
- Single-scroll answers to “when are you open, how do I book, where are you located, what if I have special requests?”
- Clear messaging that both online booking and phone/email support exist with quick turnaround (reinforced by `booking.leadTimeMinutes = 0`).
- Hosting/perk copy referencing heated cabins, marquee, watch parties—unique value propositions.
- Accessibility + allergy promises for inclusive bookings.

## Risks if Removed
- Removing hours or contact cards would force people into `/contact` or Google, risking drop-off.
- Dropping hosting/assurance copy leaves a gap for events/private hire visitors coming from hero/nav CTAs.
- Omitting last-minute CTA conflicts with `walkIns` messaging elsewhere and may increase churn for spontaneous guests.

## Research Conclusion
- Keep the current five-section rhythm but continue refining copy per section’s purpose.
- Resist inserting non-booking promos; instead, tighten each band to one intent: hero promise → essentials → hosting assurances → concierge support → same-day CTA.