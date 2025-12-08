# Implementation Plan: Press Page Trim

## Objective
Reduce `/press` to only the essential materials: hero introduction plus the press kit/quick facts + contact CTA band.

## Steps
1. **Prune constants**: remove arrays/constants powering sections we will delete (`HERO_BADGES`, `CREDIBILITY_CARDS`, `RESOURCE_ITEMS`, `RESPONSE_POINTS`, `FSA_RATING`, helper `getFoodHygieneMeta`, etc.).
2. **Hero simplification**: keep breadcrumb, eyebrow, heading, description, and CTA buttons; drop the badge grid to avoid referencing removed data.
3. **Remove middle sections**: delete the credibility cards, media coverage grid, and media resources band entirely.
4. **Press kit section**: retain a single dark glass section containing quick facts and contact CTA; ensure copy references remain accurate after removals.
5. **Cleanup**: verify no unused imports/constants remain; ensure TypeScript compiles.
6. **Validation**: run targeted lint on `app/press/page.tsx`; document broader lint/test blockers.
