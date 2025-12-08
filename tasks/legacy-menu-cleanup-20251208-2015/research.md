# Research: Legacy Menu Component Cleanup

## Findings
- A `components/menu/legacy/` directory still exists containing `MenuInteractive.tsx`, `MenuNav.tsx`, and `MenuSections.tsx`. These were superseded by the revamped menu stack living under `components/menu/` and `app/menu/_components/`.
- Code searches show no runtime imports of these legacy components. The only reference is the Jest suite `tests/components/MenuNav.test.tsx` which imports `../../components/menu/legacy/MenuNav`.
- Keeping the unused components and their dedicated test introduces lint/test noise plus confusing duplication for future contributors; removing them will simplify the tree and avoid outdated copy/markup lingering in the repo.

## Constraints
- Removing the legacy files requires deleting or updating any tests that import them (in this case, remove `tests/components/MenuNav.test.tsx`).
- No other modules rely on these components, so no additional refactors are necessary.
- Standard repo lint/test commands currently fail on unrelated legacy warnings; we should still run targeted validation on affected paths if possible and document global blockers.

## Recommendation
- Delete `components/menu/legacy` directory entirely along with `tests/components/MenuNav.test.tsx`.
- Run `rg 'components/menu/legacy'` afterward to confirm no lingering references.
- Note in verification that global lint/test remain red upstream.
