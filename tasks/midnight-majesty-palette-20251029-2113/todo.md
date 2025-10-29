# Implementation Checklist

## Setup
- [x] Snapshot current palette tokens for reference

## Palette Refactor
- [x] Replace `theme/colors.js` base scales with Midnight Majesty data
- [x] Update semantic light/dark mappings, gradients, shadows to align with Midnight hues
- [x] Maintain or remap legacy aliases (brand/crimson/etc.) to avoid breaking existing utilities

## Integration Updates
- [x] Refresh `tailwind.config.js` color families and legacy crown mappings
- [x] Update `design-system/docs/COLORS.md` narrative for Midnight Majesty

## Build Artifacts
- [x] Run `npm run colors:generate`

## Verification
- [x] Desktop & mobile QA via Chrome DevTools MCP (light/dark)
- [x] Document results in `verification.md`
