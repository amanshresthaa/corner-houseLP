# Implementation Checklist

## Setup
- [x] Scaffold `src/lib/homepage/sections.ts` with section types + registry skeleton.
- [x] Create `components/homepage/HomeSectionsRenderer.tsx` tied to registry contract.

## Core Functionality
- [x] Flesh out normalization helpers (press ticker, about, signature dishes, reviews, quick links, CTA, static banners).
- [x] Update `app/page.tsx` to consume helper + pass normalized payload.
- [x] Refactor `components/ClientHomeContent.tsx` to use renderer and remove inline logic.

## UI/UX
- [x] Ensure each section component receives identical props + maintain order/layout (including Showcase/Takeaway/Location/CTA spacing tweaks if needed).

## Testing
- [x] Add Jest tests for `buildHomeSections` (happy path + edge cases) under `tests/homepage/sections.test.ts`.
- [x] Run relevant test suites (unit + lint if needed) and capture results.
- [ ] Perform Chrome DevTools QA + document in verification.md.

## Questions/Blockers
- None at the moment.
