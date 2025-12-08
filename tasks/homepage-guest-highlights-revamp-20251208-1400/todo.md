# Implementation Checklist

## Setup
- [x] Create task docs
- [ ] Capture baseline screenshots/reference (pending DevTools)

## Development
- [ ] Extend reviews schema in `config/content/pages/home.json`
- [ ] Update `src/lib/homepage/sections.ts` normalization/types for reviews hero/stats/spotlights
- [ ] Update `tests/data/homepage/sections.test.ts` for new reviews schema
- [ ] Rebuild `components/homepage/HomepageReviewHighlights.tsx` with new layout + DaisyUI patterns
- [ ] Update `components/homepage/HomeSectionsRenderer.tsx` to pass new props

## Content
- [ ] Ensure review hero/stats/spotlights copy aligns with brand voice + tokens

## Testing & QA
- [ ] Run `npm run test -- --selectProjects=server --testPathPattern=tests/data/homepage/sections.test.ts`
- [ ] Run `npm run content:validate`
- [ ] Manual Chrome DevTools QA + record results in verification.md (pending access)

## Notes
- DevTools MCP access still required for final verification
