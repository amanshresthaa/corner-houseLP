# Implementation Plan: Legacy Menu Component Cleanup

## Objective
Remove redundant legacy menu components, copy, and their associated tests to prevent confusion and reduce maintenance overhead.

## Steps
1. Delete `components/menu/legacy/MenuInteractive.tsx`, `MenuNav.tsx`, and `MenuSections.tsx` (entire `legacy` folder).
2. Remove `tests/components/MenuNav.test.tsx`, the only remaining consumer of these components.
3. Run a repository search (`rg 'components/menu/legacy'`) to confirm no lingering references.
4. Execute targeted lint (if applicable) or note existing global lint/test blockers; document the verification outcome.

## Testing Strategy
- Targeted lint isn't applicable once files are removed; global `npm run lint` / `npm run test` remain the canonical commands but currently fail due to unrelated legacy issues. Run or reference prior failures and note blockers in verification.
