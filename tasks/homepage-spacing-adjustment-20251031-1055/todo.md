# Implementation Checklist

## Layout Adjustments
- [x] Remove `space-y-*` utilities from `components/ClientHomeContent.tsx` main container.
- [x] Ensure top/bottom padding on main container remains appropriate without reintroducing margins.
- [x] Drop residual bottom padding on home `<main>` to eliminate gap above footer.
- [x] Reduce footer-adjacent spacing by zeroing CTA section bottom padding.
- [x] Restore measured top/bottom padding on CTA section without reintroducing gaps.
- [x] Correct Location section text colors for dark background legibility.
- [x] Theme `RestaurantHoursCard` for dark contexts.

## Verification Prep
- [ ] Build/format checks if required.
- [x] Prepare for Chrome DevTools manual QA after code changes.

## Questions/Blockers
- None identified; will note if anything arises.
