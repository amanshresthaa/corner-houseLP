# Implementation Plan: Restore nav CTAs and logo asset

## Objective
Fix regressions by reinstating `/book-a-table` and `/online-delivery` links in the global navigation while keeping the new `/christmas-menu` entry, and restore the missing `/images/logo.png` asset so existing code paths and service-worker precache remain valid.

## Success Criteria
- Navigation renders both booking and order CTAs plus the Christmas link; no `tel:` entry remains.
- `public/images/logo.png` exists and is served at the expected path without 404s.
- No references to `/images/logo.png` break in service worker or CLS components.

## Architecture / Components
- Content source: `public/data/nav.json` consumed by `useNavContent` and `NavLinks` (no component code change expected).
- Asset pipeline: static file under `public/images/logo.png` used by preload/service-worker/CLS components.

## Data Flow
- Static JSON feeds client hook; sanitization keeps order and marks `/christmas-menu` as seasonal. Restored links propagate automatically to navbar renderers.

## Edge Cases & Considerations
- Preserve previous link order (Home → Menu → About → Events → Book → Order → Press → Contact) while inserting `/christmas-menu` without displacing CTAs.
- Ensure asset restored from last known good revision to match expected file name.

## Testing Strategy
- Smoke check nav JSON ordering and content.
- Verify `/images/logo.png` exists in `public/images` and can be read.
- Later in verification: run manual QA via Chrome DevTools (navbar links visible; image requests succeed; service worker pre-cache list intact if applicable).

## Rollout
- Static content change only; no feature flag required.
