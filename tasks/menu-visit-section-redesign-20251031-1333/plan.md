# Implementation Plan: Menu Visit Section Redesign

## Objective
Reinvent the visit section with the hero headline “Restaurant & Bar Opening Time,” a refreshed layout, and a focused CTA cluster (Book now, Call now, Get directions) while keeping the light/dark alternation intact.

## Success Criteria
- [ ] Section wrapper uses a light palette to balance the preceding dark dietary block.
- [ ] `RestaurantHoursCard` remains visible (variant `"light"`) within the new structure.
- [ ] CTA group contains distinct actions (`Book now`, `Call now`, `Get directions`) styled as buttons without duplication.
- [ ] Content communicates hours context, address, and key visit highlights clearly.
- [ ] Layout stays responsive and accessible with proper focus states and spacing.

## Architecture
### Components
- `app/menu/page.tsx`: Replace the current visit section markup with the new structure.
- `RestaurantHoursCard`: Reuse with `variant="light"`; wrap in a complementary card container.

### Data Flow
- Continue to source contact/address data from existing helpers.
- Derive formatted address and directions URL inline (fallback already handled).

### UI/UX Considerations
- Two-column grid (`xl:grid-cols-2`) with stacked layout on smaller breakpoints.
- Heading/subheading hierarchy: “Restaurant & Bar Opening Time” plus supporting copy.
- CTA row: 
  - Primary solid button `Book now` → `/book-a-table`
  - Secondary solid button `Call now` → telephone link
  - Tertiary outline button `Get directions` → map URL
- Supplementary quick facts list (chips/cards) to highlight takeaway, quiz night, etc.
- Maintain focus-visible rings with light offset tokens.

### Testing Strategy
- Manual QA in Chrome DevTools (mobile/tablet/desktop), console check, contrast review.
- No automated test additions required.

### Edge Cases
- Missing map link: fallback `#` still usable; ensure button handles gracefully.
- Long CTA labels: buttons should wrap without breaking layout.

### Rollout Plan
- Standard deploy; no flagging needed.

## Implementation Steps
1. Refresh `todo.md` to capture new CTA cluster work.
2. Replace visit section markup in `app/menu/page.tsx` with the redesigned structure and heading copy.
3. Compose CTA row with three distinct buttons (solid/solid/outline) wired to correct destinations.
4. Curate quick facts list supporting the CTAs (e.g., collection timeline, quiz night, parking).
5. Adjust `RestaurantHoursCard` wrapper to match the redesigned layout.
6. Validate responsiveness, contrast, and focus states; run Chrome DevTools QA and log results.
