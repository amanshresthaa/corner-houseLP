# Implementation Checklist

## Setup
- [x] Create task workspace + docs
- [ ] Snapshot current UI reference (via DevTools later)

## Design & Development
- [ ] Extend `config/content/pages/home.json` signature section with hero metadata + dish tags
- [ ] Update `src/lib/homepage/sections.ts` normalization/types for signature hero + metadata
- [ ] Update `tests/data/homepage/sections.test.ts` for new signature schema
- [ ] Rebuild `components/homepage/HomepageSignatureDishes.tsx` with new layout/interactions

## Content
- [ ] Ensure new hero/dish copy is data-driven and gracefully handles missing fields

## Testing & QA
- [ ] Run `npm run test -- --selectProjects=server --testPathPattern=tests/data/homepage/sections.test.ts`
- [ ] Run `npm run content:validate`
- [ ] Manual Chrome DevTools QA + update verification.md (pending MCP access)

## Notes / Blockers
- Need DevTools MCP access token for final verification
