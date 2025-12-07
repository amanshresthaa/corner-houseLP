# Research: Remove seasonal banner

## Context & goal
- Remove the seasonal promo banner from the site entirely (header/nav area), including data, component, and tests.
- Ensure navbar layout remains stable after removal (offset logic, spacing, sticky height).

## Where the banner is used
- `components/restaurant/Navbar.tsx` imports `SeasonalPromoBanner` and renders it above nav content. It includes layout logic in `useLayoutEffect` referencing `SEASONAL_BANNER_SELECTOR` to set CSS vars `--navbar-offset` and `--navbar-stack-offset` based on banner height.
- Snapshot from DevTools confirms banner renders inside `nav` with `data-seasonal-banner` attributes (from earlier task).

## Data/config
- `config/banners/seasonalPromoBanner.json` supplies the banner content; mirrored fixture `__tests__/components/seasonalPromoBanner.json`.

## Component & tests
- `components/seasonal/SeasonalPromoBanner.tsx` consumes JSON and is memoized. Jest test `__tests__/components/SeasonalPromoBanner.test.tsx` targets it (already updated recently). Removing the banner requires deleting/adjusting this test.

## Other references
- Indirect references in `christmas-menu-files.json` (blueprint) but main code uses the Navbar file in repo.
- No other runtime imports found so far.

## Constraints / considerations
- Navbar sticky spacing currently accounts for banner height; once removed, we should simplify to remove custom CSS vars or keep harmless defaults.
- After removal, ensure nav still fixed and padding correct on pages.
- Update tests to reflect absence; remove component test entirely to avoid failing suite.
- Manual QA required via Chrome DevTools (home page sufficient to verify banner gone and nav layout ok).

## Proposed approach
1) Remove banner import/render + layout calculation from `components/restaurant/Navbar.tsx`.
2) Delete `components/seasonal/SeasonalPromoBanner.tsx` and JSON config, or leave data but unused? Prefer removal to avoid dead code; also remove related jest test and fixture.
3) Adjust any CSS var usage in Navbar (drop `SEASONAL_BANNER_SELECTOR` logic, `--navbar-offset` vars). Ensure nav still sets `--navbar-stack-offset` appropriately (may just remove custom vars if unused elsewhere).
4) Update `jest` scope by deleting the SeasonalPromoBanner test; no replacements needed.
5) Run targeted tests (none needed after deletion, but ensure jest passes) and manual DevTools QA on home page to confirm no banner and spacing good.
