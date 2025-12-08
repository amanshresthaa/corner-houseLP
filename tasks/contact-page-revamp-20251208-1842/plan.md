# Implementation Plan: Contact page streamline

## Objective
Deliver a concise contact page focused on three actions (call, email, directions) plus essentials (hours, map) without redundant sections or forms.

## Success Criteria
- [ ] Single hero with clear CTAs for call/email/directions; copy concise.
- [ ] Essentials grid shows contact methods + hours + map/travel tips; no booking form.
- [ ] Remove redundant feature/social sections to reduce page length while retaining key info.
- [ ] Responsive, accessible, reduce-motion respected; no new console errors.

## Architecture
- Keep `generateMetadata`, `RestaurantLayout`, reduce-motion CSS.
- Inline JSX sections; drop dynamic feature/social imports.
- Reuse `RestaurantHoursCard` and `InteractiveMap`.

## Components/Sections
- Hero (CTA row badges + buttons).
- Essentials grid: Contact card (phone/email/address summary + hours compact) and Map card (InteractiveMap + CTA buttons + travel notes).

## Edge Cases
- Missing map link: fallback to `#` but keep aria labels.
- External direction links open in new tab with rel noopener.

## Testing Strategy
- Manual QA with Chrome DevTools MCP: console, focus nav, mobile/tablet/desktop snapshots.
- Note: lint has pre-existing repo errors; run command but expect unchanged failures.

## Rollout
- Direct replacement of contact page; no feature flags.
