# Implementation Checklist

## Setup
- [x] Create task folder and docs

## Core Fix
- [x] Patch `next.config.js` to set server `output.chunkFilename` to `chunks/[id].js`
- [x] Also set `output.hotUpdateChunkFilename` to `chunks/[id].hot-update.js` (defensive)

## Verification
- [x] Remove `.next/` and run `pnpm run build`
- [x] Confirm no missing chunk errors
- [ ] Optional: `pnpm start` smoke test a few routes

## Notes / Assumptions
- This change should only affect server prod builds (`isServer && !dev`).
