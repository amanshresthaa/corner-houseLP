# Research: Restore booking/ordering nav links and logo asset

## Existing Patterns
- Navbar links come from `public/data/nav.json` via `useParsedData('nav.json', NavDataSchema)`; `useNavContent` sanitizes links and flags `/christmas-menu` as seasonal for styling.
- `NavLinks` renders the array verbatim (except for filtering `/` and `/contact`), so any removal in `nav.json` removes links site-wide.
- Logo and various preload/service-worker flows reference `/images/logo.png` directly (e.g., `src/lib/serviceWorker.tsx`, `lib/criticalLoadingCSS.ts`, `public/sw.js`, CLS-optimized components).

## Current State / Findings
- `public/data/nav.json` now contains `tel:+441223921122` and removed `/book-a-table` + `/online-delivery`; this drops the primary CTAs from the header.
- Seasonal link `/christmas-menu` was added but replaced existing CTAs instead of being additive.
- `public/images/logo.png` was deleted, while multiple code paths still request that exact path → 404s and precache failures.

## Constraints & Considerations
- Keep seasonal `/christmas-menu` link while restoring booking and online-ordering CTAs to avoid conversion regression.
- Prefer minimal change: restore deleted asset rather than refactoring all references.
- Maintain nav ordering consistent with prior UX (Home → Menu → About → Events → Book → Order → Press → Contact) with the seasonal link inserted without displacing CTAs.

## Recommendations
- Update `public/data/nav.json` to include `/christmas-menu` **and** restore `/book-a-table` and `/online-delivery`, removing the `tel:` entry.
- Restore `public/images/logo.png` from the last good revision to satisfy existing references and service-worker precache.
