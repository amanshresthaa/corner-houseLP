# Implementation Plan: UI Consistency Revamp

## Objective
Unify layout, card, badge, and button patterns across key restaurant sections to match established site UX/UI and DaisyUI usage.

## Success Criteria
- [ ] Consistent containers and spacing across refactored sections
- [ ] Unified card borders/shadows and badge styles
- [ ] No regressions in responsiveness or a11y

## Scope (Phase 1)
- RegularEventsSection
- MatchesSection
- EventsContactSection
- QuickLinksSection (reviewed for alignment, likely minor)

## Approach
- Update classnames in-place to use shared patterns:
  - Container (if section owns it): `mx-auto max-w-6xl px-4 sm:px-6 lg:px-8`
  - Card: `card bg-white border border-brand-100 shadow-md`
  - Badges: primary `badge badge-accent badge-outline`; secondary chips `badge badge-outline`
  - Buttons: `btn btn-outline`/`btn btn-ghost` on dark, `btn-primary` sparingly

## Testing
- Manual QA in DevTools MCP on mobile (375), tablet (768), desktop
- Console, focus, keyboard navigation, reduced motion

