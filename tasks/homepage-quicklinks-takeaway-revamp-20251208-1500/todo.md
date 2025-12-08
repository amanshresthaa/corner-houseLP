# Implementation Checklist

## Setup
- [x] Create task dir + docs

## Development
- [ ] Extend `config/content/pages/home.json` quickLinks + cta data
- [ ] Update `src/lib/homepage/sections.ts` normalization/types for quickLinks + closing CTA
- [ ] Update `tests/data/homepage/sections.test.ts` for new schema fields
- [ ] Rebuild `components/restaurant/sections/QuickLinksSection.tsx` for new layout
- [ ] Enhance `components/restaurant/sections/CallToActionSection.tsx` (or new component) for hero-style CTA

## Content
- [ ] Ensure copy aligns with tokens/brand voice (eyebrow, hero text, features)

## Testing & QA
- [ ] Run `npm run test -- --selectProjects=server --testPathPattern=tests/data/homepage/sections.test.ts`
- [ ] Run `npm run content:validate`
- [ ] Manual Chrome DevTools QA + note status (pending access)

## Notes
- Need DevTools MCP access for verification
