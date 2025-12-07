# Implementation Checklist

## Core
- [x] Add centralized map/review helper(s) in `lib/restaurantData.ts`
- [x] Refactor UI/SEO components to use helpers instead of hardcoded links
- [x] Update tests/mocks to consume helpers

## Verification
- [x] Run `rg` to ensure no stray hardcoded map/contact URLs remain in components/tests
- [ ] Manual QA spot-check (contact/reviews sections)
