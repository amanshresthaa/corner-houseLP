# Implementation Checklist

## Setup
- [x] Create task directory and docs

## Core Functionality
- [x] Add centralized `global.links.takeaway` in `config/content.json`
- [x] Extend schemas/types: `ctas.takeawayUrl`, `global.links`
- [x] Plumb `links.takeaway` to slideshow
- [x] Ensure slideshow renders two CTAs including takeaway when present
- [x] Update `SlideCTAButton` to support `takeaway` variant and use UI labels

## UI/UX
- [ ] Verify button sizing and focus states on mobile and desktop
- [ ] Confirm external link opens in new tab

## Testing
- [ ] Manual QA via Chrome DevTools
- [ ] Spot-check accessibility (aria-label, keyboard nav)

## Questions/Blockers
- Should additional slides include the takeaway CTA or keep it only on Community Calendar? (Assumed: only on Community Calendar for now.)
