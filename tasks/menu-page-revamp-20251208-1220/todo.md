# Implementation Checklist

## Setup & Design Parity
- [x] Create task directory and capture research/plan docs
- [x] Audit existing `/menu` sections for reusable pieces and note deltas vs homepage design system

## Hero & Data Prep
- [x] Compute `menuStats`/helper data on server for hero badges + highlights
- [x] Update `MenuHero` styles and props to match homepage hero tokens

## Section Revamp
- [x] Rebuild interactive menu wrapper with gradient card + alternating background rhythm
- [x] Replace dietary CTA band with dark gradient grid + DaisyUI buttons
- [x] Redesign hours/address/visit planner section using location-style cards
- [x] Add menu-specific Quick Links section reusing shared component with new data
- [x] Ensure closing CTA theme/order maintains light/dark alternation

## Testing & Verification
- [x] Add unit tests for new helper data builders + section props
- [x] Update/extend component tests for hero/highlight rendering
- [x] Run targeted Jest suites
- [ ] Complete Chrome DevTools manual QA and record results in `verification.md`
