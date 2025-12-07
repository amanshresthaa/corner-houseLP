# Implementation Plan: Core Content Migration to Corner House

## Objective
Rebrand core content modules from White Horse to The Corner House (Cambridge), ensuring site identity, accessibility text, UI copy, and manifest metadata reflect the new venue while keeping existing module structure and load strategies intact.

## Success Criteria
- [ ] `config/content/core/global.json` expresses Corner House name, title, description, keywords, branding, nav/footer, and links without White Horse references.
- [ ] `config/content/core/accessibility.json` alt/aria text aligned to Corner House assets and semantics.
- [ ] `config/content/core/ui.json` remains venue-appropriate (no White Horse phrasing; CTAs support booking, takeaway, delivery aligned to Corner House policies).
- [ ] `config/content/core/forms.json` still valid and venue-neutral.
- [ ] `config/content/manifest.json` description/lastUpdated mention Corner House migration; module map unchanged for compatibility.

## Architecture / Data Flow
- Content JSON consumed by Next app via manifest deep-merge. No code changes; only data updates. Dependencies remain `core/global` -> `core/ui/accessibility/forms`.

## Component Breakdown
- Core content files: global, ui, accessibility, forms.
- Manifest metadata: top-level fields only (version, description, lastUpdated text).

## Data Flow / Contracts
- Navigation links and CTA URLs must be routable within current app (`/`, `/menu`, `/about`, `/events`, `/book-a-table`, `/online-delivery`, `/press`, `/contact`). Avoid adding routes without backing pages.
- External links (booking, delivery) should use current capabilities: phone/email primary; online booking URL pending—use call/email plus anchor for online booking if provided later.

## UI/UX Considerations
- Mobile-first copy: concise, action-oriented CTAs (Book, Call, Order). Emphasize “sports pub + Nepalese kitchen” and “heated cabins/HD screens”.
- Accessibility: descriptive alt text (logo/exterior/hero) and consistent aria labels; avoid venue names in aria labels unless helpful context.

## Testing Strategy
- Static validation: ensure JSON is well-formed; run `npm test` not necessary for content only (skip unless quick lint present).
- Spot-check pages locally if time permits; otherwise rely on schema validation enabled in manifest.

## Edge Cases
- Missing booking URL: keep call/email links so user can still act.
- Delivery: highlight both call-and-collect and third-party apps without promising unavailable service windows.

## Rollout Plan
- Single content update; no feature flag required.
- Post-change smoke test in browser (later verification via DevTools if UI is affected).
