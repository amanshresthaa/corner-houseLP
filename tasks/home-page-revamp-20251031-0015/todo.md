# Implementation Checklist

## Setup & Assets
- [x] Curate hero/gallery selections from `Everythingyouneed/whitehorseimages/` and copy into `public/images/white-horse/`
- [x] Update `src/lib/images.ts` (or new registry) with references + alt text for imported assets
- [x] Refresh slideshow data in `config/content.json` to use new imagery and copy

## Content Data
- [x] Build `app/_content/home-sections.ts` (or equivalent) with structured data derived from dossier/fact sheet
- [x] Revise `app/_content/home-content.json` (about/menu highlights) to match new narrative
- [x] Update `config/content/pages/home.json` (quick links, CTA, press) with expanded info

## Components
- [x] Create new home page sections (at-a-glance, awards/press, ratings, amenities, events, neighbourhood, gallery)
- [x] Wire data into sections, ensuring DaisyUI classes + accessibility
- [x] Integrate new sections inside `components/ClientHomeContent.tsx` with ProgressiveSection wrappers
- [x] Adjust existing sections (About, MenuHighlights, CTA) to consume refreshed data

## Quality
- [ ] Run lint/tests if available (e.g., `npm test` or targeted suites)
- [ ] Perform manual QA with Chrome DevTools MCP: responsive layouts, accessibility, performance, console
- [ ] Document verification findings in `verification.md`

## Notes / Assumptions
- Prioritise tel/mailto CTAs over online booking per dossier
- Ensure copy remains concise for readability while covering all required facts
