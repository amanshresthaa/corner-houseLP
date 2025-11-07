# Implementation Plan: Signature Dishes Image Refresh

## Objective
Replace the Signature Nepalese Dishes section so it showcases only the four photographed hero dishes provided in `Everythingyouneed/signaturedishes`, ensuring assets live in the public image tree and copy aligns with real menu favorites.

## Success Criteria
- [ ] All signature dish cards reference the new PNG assets from the signaturedishes set.
- [ ] Assets are stored under `public/images/white-horse/dishes/` with semantic filenames and no spaces.
- [ ] Content JSON lists the correct four dishes with authentic descriptions.
- [ ] Homepage renders without layout shifts or broken images; DevTools QA passes.

## Architecture & Data Flow
- Homepage data continues to flow from `config/content.json` → `app/page.tsx` → `ClientHomeContent` → `HomepageSignatureDishes`.
- No component changes expected; only static assets and JSON content adjustments.

## Component & File Breakdown
1. **Asset relocation**: move/rename PNGs into `public/images/white-horse/dishes/` (Next.js static serving path `/images/white-horse/dishes/...`).
2. **Content update**: edit `config/content.json` signature dish items with new filenames + descriptive copy.

## Data & Copy Details
- Dishes to feature:
  1. Lasun Kukhura Khursani (LKK) Chicken — garlicky chilli wok-fry.
  2. Himali Lamb — Himalayan green curry with mint yoghurt notes.
  3. Khasi Ko Masu (Goat Curry) — slow-cooked goat in warming spices.
  4. House Mixed Grill — sizzling platter of skewers, tikka, and citrus.
- Ensure description strings stay concise (~1 sentence) for future reuse.

## Testing & Verification Strategy
- Run `npm run lint` if needed to ensure no content schema issues (optional; JSON change low risk).
- Use Chrome DevTools MCP:
  - Inspect Signature Dishes cards on mobile + desktop breakpoints.
  - Confirm images load, alt text correct, no console errors, layout stable.
  - Capture accessibility notes (focus order unaffected but verify carousel).

## Edge Cases & Risks
- Typos in image path would break Next/Image (blank placeholders). Mitigate by double-checking filenames.
- PNG size (1344×768) acceptable; ensure not huge to avoid performance regressions (these are ~1MB? confirm if necessary).

## Rollout
- No feature flag; merge once verified.
- Document changes in task folder; include verification report after DevTools QA.
