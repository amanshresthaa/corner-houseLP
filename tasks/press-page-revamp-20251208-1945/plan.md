# Implementation Plan: /press Revamp

## Objective
Rebuild the `/press` experience so it mirrors the homepage cadence (dark↔light rhythm), surfaces credibility highlights upfront, and provides a structured media resources flow (coverage → press kit → hygiene) without duplicating data sources.

## Success Criteria
- [ ] Hero introduces the press kit with eyebrow chip, CTA pair, and highlight badges that reinforce awards/ratings.
- [ ] Alternating sections (dark hero → light stats → dark coverage → light resources → dark contact) reuse design-system spacing (`max-w-6xl px-4 sm:px-6 lg:px-8`, `py-12/16`).
- [ ] Media coverage cards consume `pressTicker.items` with source badges, focus-visible links, and domain labels.
- [ ] Contact CTA keeps centralized data + accessible buttons (email/tel/contact page) plus asset download prompts.
- [ ] Page passes Jest tests + manual Chrome DevTools audit at mobile/tablet/desktop breakpoints.

## Architecture & Components
1. **PressHeroSection (dark)**
   - Gradient background (`from-brand-950 via-brand-900 to-brand-950`), breadcrumb, eyebrow chip (`Press & Media`), `h1` heading, descriptive paragraph.
   - CTA cluster: primary solid button for `mailto` and secondary outline linking to `/contact` or `tel:` number. Add highlight chips (Tripadvisor badge, CAMRA award, hygiene rating) following `badge badge-outline` tokens.
2. **CredibilityStatsSection (light)**
   - Light gradient container with a responsive grid of `card` shells (awards, ratings, amenities, media kit). Data derived from `PRESS_FACTS` or inline structured arrays referencing centralized info.
   - Each card includes an eyebrow label, display number/badge, and supporting copy; include hygiene CTA linking to FSA page.
3. **MediaCoverageSection (dark)**
   - Reuse `pressItems` map but present cards on dark glass backgrounds (white/10 border, gradients). Maintain `article` semantics + accessible links.
   - Provide fallback copy if `pressItems` is empty.
4. **MediaResourcesSection (light)**
   - White shell with two columns: left for "Media resources" list (asset pack CTA, talking points), right for a quote card/FAQ list describing spokespeople, imagery, and turnaround expectations.
   - Buttons use DaisyUI outline for downloads/contact.
5. **PressContactSection (dark)**
   - Builds on existing press kit column but reorganized: contact card, response-time list, dashed asset request note, CTA pair (email press team + call). Keep quick facts bullet list with brand chips.
6. **FoodHygieneCard (light)**
   - Keep the existing logic but restyle as a white outline card nested in the resources stack to preserve alternation.

## Data Flow
- `getContentSmart()` already fetched in `PressPage`; continue pulling `pressItems` from `home.sections.pressTicker.items`.
- Press facts/credentials pulled from `getContactInfo`, `getAddress`, `BRAND`, and FSA metadata constant inside the file (can remain hard-coded if sourced from inspections but wrap in typed object for clarity).
- CTA hrefs (mailto/tel/contact) derived from `MEDIA_CONTACT` object to avoid duplication.
- Section-specific arrays (highlights, stat cards) defined near top-level constants for easy maintenance.

## UI/UX Considerations
- Follow doc spacing rules and maintain `max-w-6xl` containers for every section.
- Eyebrow chips use uppercase tracking and follow dark/light token sets (`bg-white/10 border-white/30` on dark, `bg-white border-brand-200` on light).
- All interactive elements get `focus-visible` styles and `touch-action: manipulation`.
- Maintain semantic headings in descending order (`h1` hero, `h2` per section, `h3` inside cards), ensuring accessible section labeling via `aria-labelledby`.
- Provide `aria-live="polite"` messaging for status chips where needed (e.g., response time note) so assistive tech captures updates without being disruptive.

## Edge Cases & Error States
- If `pressItems` is empty, show a friendly placeholder with CTA to contact the team.
- Ensure constants like `MEDIA_CONTACT.email` and `phoneDisplay` have fallbacks (use `CONTACT.email.primary`/`CONTACT.phone.display`).
- Guard against malformed URLs when deriving domains; fall back to "external link" label.
- Handle missing FSA date gracefully (render "Unknown date") as current implementation already does.

## Testing Strategy
- Update/extend Jest tests for helper functions (`getSourceFromTitle`, `getDomainLabel`) if logic changes.
- Add a React Testing Library test for the media coverage section verifying semantic roles & fallback messaging.
- Run `npm run lint` + `npm run test` to ensure no regressions.
- Manual QA via Chrome DevTools MCP: mobile (375px), tablet (768px), desktop (1440px) viewports; check console, accessibility pane, and performance overlay per AGENT checklist.

## Rollout
- No feature flags; deploy after tests/QA pass.
- Update `tasks/press-page-revamp-20251208-1945/verification.md` with QA evidence.
- Coordinate with content editors if new copy blocks need translation into central JSON (future optional step).
