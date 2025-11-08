# Implementation Checklist

## Setup & Data
- [x] Add `config/banners/seasonalPromoBanner.json` mirroring supplied spec

## Component Work
- [x] Build `components/marketing/SeasonalPromoBanner.tsx` using DaisyUI classes + Emoji + CTA arrow
- [x] Ensure dataset/meta attributes, aria-label, and analytics id are exposed

## Integration
- [x] Render banner near top of `ClientHomeContent` main region
- [x] Render banner at top of `components/restaurant/Layout` main region
- [x] Render banner at top of `components/restaurant/SeamlessLayout` main region (parity)

## Testing & Verification
- [x] Write Jest test covering render + attributes
- [x] Run relevant tests / lint if needed
- [x] Manual QA via Chrome DevTools (mobile/tablet/desktop) + document in verification.md

## Change Request Follow-up
- [x] Move banner render into navbar stack (above nav row) and remove legacy placements
- [x] Update JSON copy/CTA to highlight delivery service promotion
- [x] Adjust layouts to account for sticky header (remove padding hack, ensure smooth flow)
- [x] Re-run component tests + DevTools QA for new positioning/copy
