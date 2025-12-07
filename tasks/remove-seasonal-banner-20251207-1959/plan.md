# Implementation Plan: Remove seasonal banner

## Objective
Remove the seasonal promo banner from the navbar/site entirely, including data/config and tests, while keeping navbar layout stable.

## Success Criteria
- No seasonal banner renders on any page.
- Navbar layout/spacing remains correct on desktop & mobile; no leftover CSS vars logic tied to banner.
- Jest suite passes after removing related test.

## Steps
1) Navbar cleanup: remove `SeasonalPromoBanner` import/render and related layout logic/offset variables in `components/restaurant/Navbar.tsx`.
2) Remove banner assets/tests: delete `components/seasonal/SeasonalPromoBanner.tsx`, `config/banners/seasonalPromoBanner.json`, and jest test/fixture `__tests__/components/SeasonalPromoBanner.test.tsx` & `__tests__/components/seasonalPromoBanner.json`.
3) Ensure no remaining imports/references; run `rg` to confirm.
4) Run targeted Jest (should be n/a after test removal, but run `npm test -- --runTestsByPath`? Instead run full? Keep lean if none remain).
5) Manual QA with Chrome DevTools MCP on home page to confirm banner absent and nav spacing ok.
