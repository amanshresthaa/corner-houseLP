# Implementation Checklist

## Asset Prep
- [x] Move/rename four PNGs from `Everythingyouneed/signaturedishes` into `public/images/white-horse/dishes/`.
- [x] Remove/clean any leftover references to legacy filenames if necessary.

## Content Update
- [x] Update `config/content.json` signature dishes list with new dish names/descriptions/paths.

## Verification Prep
- [ ] Smoke check via `npm run lint` or `npm run typecheck` if needed.
- [ ] Run Chrome DevTools MCP QA across breakpoints after content loads.
- [ ] Document verification results in `verification.md`.

## Notes
- `npm run lint` currently fails due to pre-existing `react/no-unescaped-entities` and hook rule violations in unrelated files (see CLI log). No new lint issues introduced by this task.
