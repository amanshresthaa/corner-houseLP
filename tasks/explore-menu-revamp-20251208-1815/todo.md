# Implementation Checklist

## Foundation
- [x] Document explore requirements + design parity in `research.md`
- [x] Finalize plan + success criteria in `plan.md`
- [x] Define data contract for explore presets + featured dishes

## Data Layer
- [x] Extend/add helper(s) in `src/lib/menu` to build `featuredItems` and `explorePresets`
- [x] Write unit tests covering edge cases for new helpers

## UI Implementation
- [x] Create/update Explore section component (likely `MenuExploreSection`) with new layout, preset controls, and featured grid
- [x] Wire preset interactions to `MenuInteractive` (prop additions or wrapper state)
- [x] Ensure DaisyUI + design-system spacing/typography applied and responsive
- [x] Simplify Explore section layout again per new brief (remove advanced cards, keep quick primers)
- [x] Rebuild `MenuInteractive` card with streamlined quick search/toggles and inline advanced filters

## Tests & Verification
- [x] Add RTL tests covering new Explore section behavior
- [x] Re-run targeted Jest suites (data + menu components)
- [ ] Perform Chrome DevTools MCP QA and record findings in `verification.md`
