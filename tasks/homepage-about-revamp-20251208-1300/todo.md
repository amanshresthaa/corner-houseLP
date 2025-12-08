# Implementation Checklist

## Setup
- [x] Create task workspace + docs
- [ ] Capture baseline screenshots/reference (DevTools later)

## Design & Development
- [ ] Update `config/content/pages/home.json` with new about stats + CTA link + milestone/gallery data
- [ ] Extend `src/lib/homepage/sections.ts` & types to include `stats` + `ctaLinks` + `milestones` + `gallery`
- [ ] Update `tests/data/homepage/sections.test.ts` to cover new fields
- [ ] Revamp `components/homepage/HomepageAboutSection.tsx` layout into editorial/timeline/gallery structure

## Content
- [ ] Ensure copy pulls from JSON (no hard-coded text) and handles missing fields gracefully

## Testing & QA
- [ ] Run targeted Jest suite (`npm run test -- --selectProjects=server --testPathPattern=tests/data/homepage/sections.test.ts`)
- [ ] `npm run content:validate`
- [ ] Manual Chrome DevTools QA (console, responsive, accessibility) + update verification.md

## Notes / Blockers
- Need DevTools MCP access token if environment requires auth
