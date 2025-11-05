# Implementation Plan: Add Takeaway CTA in Slideshow

## Objective
Show two CTAs in the homepage slideshow, adding an Online Takeaway CTA sourced from centralized content (no hardcoding).

## Success Criteria
- [ ] Two CTAs render on slides that have at least one complementary CTA available.
- [ ] Takeaway CTA link comes from centralized content; no hardcoded URLs.
- [ ] Button label uses centralized UI text (Order Takeaway).
- [ ] Works on mobile and desktop with keyboard accessibility.

## Architecture
- Reuse slideshow and CTA components; add `takeawayUrl` to the slide CTAs schema.
- Add centralized fallback link at `global.links.takeaway` in `config/content.json`.
- Pass `links.takeaway` down to slideshow; prefer per-slide `takeawayUrl` with fallback to global.
- Use centralized UI label `global.ui.buttons.orderTakeaway` for the button text.

## Components
- `components/slideshow/SlideCTAButton.tsx` — support `takeaway` variant; labels from centralized UI.
- `components/slideshow/DaisyUISlideshow.tsx` — ensure two CTAs, include takeaway when available (per-slide or global).
- `components/slideshow/Showcase.tsx` + `components/ClientHomeContent.tsx` + `app/page.tsx` — plumb `links.takeaway`.
- `src/lib/data/schemas.ts` + `components/slideshow/types.ts` — add `takeawayUrl` and `global.links`.
- `config/content.json` — add `global.links.takeaway`.

## Data Flow
`config.content -> slideshow.slides[].ctas.menuUrl` -> `DaisyUISlideshow` -> `SlideCTAButton`.

## Implementation Steps
1. Extend schemas/types for `takeawayUrl` and `global.links`.
2. Add `global.links.takeaway` with Touchtakeaway URL to content.
3. Plumb `links.takeaway` from page -> client home -> showcase -> slideshow.
4. Update slideshow config to always include takeaway CTA when available and pair with best complementary CTA.
5. Update SlideCTAButton to support `takeaway` variant using centralized UI labels. Keep domain detection as safety fallback.
6. Quick sanity check build.

## Edge Cases
- If `href` is tel: keep call button behavior.
- Non-Touchtakeaway external menu links remain labeled "View Menu".

## Testing Strategy
- Visual check in browser (DevTools) — label, focus, mobile layout.
- Verify anchor renders with `target=_blank` for external links.

## Rollout
- Config-only change plus small UI enhancement — safe to deploy.
