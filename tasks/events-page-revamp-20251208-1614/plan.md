# Implementation Plan: Events Page Revamp

## Objective

Rebuild `/events` from scratch (no CMS dependency) so it feels like a curated “matchday & events concierge” page: bold hero, highlight cards, matchday essentials, weekly rhythm timeline, updates/contact split, and a closing CTA—all using static data plus existing shared components where relevant.

## Success Criteria

- [ ] Page hero + supporting sections follow the `max-w-6xl px-4 sm:px-6 lg:px-8` container rhythm with alternating palettes.
- [ ] Hero and Regular Events data hydrate from `content.pages.events` with graceful fallbacks.
- [ ] Quick links, updates, and contact/CTA cards reuse existing shared components (QuickLinksSection, EventsUpdatesSection, EventsContactSection, CallToActionSection).
- [ ] Accessibility maintained (focus rings, aria labels, semantic headings) and DaisyUI tokens applied to buttons/badges.
- [ ] Tests and manual QA (Chrome DevTools) pass with no regressions.

## Architecture & Component Breakdown

1. **Hero (dark)** – Gradient backdrop, display headline “Matchdays & Events at {BRAND.shortName}”, subcopy touting screenings/quizzes/cabins, CTA duo (`Book big games`, `Call team`), highlight badges.
2. **Highlights band (light)** – Static array of 3–4 cards (“Derby screenings”, “Quiz rollover”, “Resident DJs”) with eyebrows, short copy, CTA chips.
3. **Quick Links (dark)** – Use `QuickLinksSection` with static data for booking tables, booking cabins, weekly schedule anchor, and private hire contact.
4. **Matchday Essentials (light)** – Two-column grid: left list of perks (screens, commentary, menu, service); right panel with broadcast partners and “Add requests” CTA cluster.
5. **Weekly Rhythm Timeline (dark)** – Custom section showing daily recurring events using static array (day label, title, blurb, CTA). Could reuse simple card markup or `RegularEventsSection` with static data.
6. **Updates + Contact (light)** – Keep `EventsUpdatesSection` + `EventsContactSection` but rewrite copy to align with new story (follow socials, call to plan events).
7. **Private Events CTA (dark)** – `CallToActionSection` configured with events-focused copy + contact info; theme `dark` for alternation and include buttons (book online, call, download events deck?).

Optional extras: integrate `MatchdayFAQ` block if time; omit location + newsletter per requirements.

## Data Flow

- All copy lives in static arrays/constants inside `app/events/page.tsx`; no `getContentSmart` usage.
- `getContactInfo()` supplies booking URL + phone for CTAs and contact components.
- Quick link + highlight data defined inline; `RegularEventsSection` can receive a static array to display weekly items until a CMS exists.

## UI/UX Considerations

- Alternate dark/light bands (Hero dark → Highlights light → QuickLinks dark → Essentials light → Weekly dark → Updates light → CTA dark) for rhythm.
- Copy tone: action-driven, concise, event-specific; avoid repeating same benefits across sections.
- Keep CTA groups to two buttons max per section to avoid overwhelm.
- Use `aria-labelledby` anchors for weekly schedule (#weekly-rhythm) to support quick link jumps.

## Testing Strategy

- Unit: existing `RegularEventsSection` test should still pass; no new unit tests required unless DOM changes significantly (verify snapshot/test file unaffected).
- Integration/manual: run `npm run test -- --runInBand` (or targeted `npm run test RegularEventsSection` if available) focusing on events sections, plus `npm run lint` if required by repo norms.
- Manual QA: Use Chrome DevTools MCP for accessibility (keyboard nav, focus order), responsive layouts, and console inspection. Validate CTA links, quick links, and phone numbers.

## Edge Cases

- Missing hero fields → fall back to defaults; avoid rendering empty spans.
- `content.pages.events.regularEvents` may be undefined → guard before passing to `RegularEventsSection`.
- Booking URL might be external (Nabatable) → maintain `target="_blank"` + aria copy.
- Telephone number optional? `EventsContactSection` already handles, but ensure we pass `phone` fallback.
- Quick links data without complete fields should be filtered out to prevent blank cards.

## Rollout Plan

- Implement behind no flag (direct update to `/events`).
- Verify locally via `npm run dev` (if needed) and manual QA in Chrome DevTools.
- No environment toggles required; update depends purely on server-rendered Next.js route.
