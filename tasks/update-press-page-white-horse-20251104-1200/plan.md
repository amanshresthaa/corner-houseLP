# Implementation Plan: Update Press Page

## Objective
Replace `/press` content with essential White Horse information derived from the provided Markdown file. Remove unrelated/out-of-scope items to keep the page authoritative and concise.

## Success Criteria
- [ ] `/press` contains only White Horse information from the Markdown
- [ ] No external press articles or hygiene card
- [ ] Quick facts reflect verified essentials (address, phone, email, ownership, cuisine, amenities)
- [ ] SEO text updated to reflect new scope
- [ ] Accessible, mobile-first layout preserved (DaisyUI)

## Architecture
- Reuse the existing page component structure but remove sections not present in the Markdown.
- Keep helpers for identity/contact/address data to avoid duplication.
- Populate a trimmed `PRESS_FACTS` from Markdown.

## Components
- Modify `app/press/page.tsx`:
  - Remove `PressFeatureBanner`, Food Hygiene card, and media highlights list
  - Update hero copy and metadata
  - Keep Press Kit + Quick Facts and contact info

## Data Flow
- Get `contact`, `address`, `identity` via `lib/restaurantData` helpers (values already align with Markdown except spelling of Greenside/Green Side).
- Hardcode Quick Facts strings derived from Markdown where not already centralized.

## Testing Strategy
- Manual QA in Chrome DevTools
  - Verify content, accessibility semantics, focus order
  - Responsive checks at 375/768/1920 widths
  - Console free of errors

## Edge Cases
- If server not running at 3001, coordinate with stakeholder; content changes are isolated to code.

## Rollout
- Direct update; no feature flag needed

