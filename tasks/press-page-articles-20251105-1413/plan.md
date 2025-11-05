# Implementation Plan: Press Page Summaries

## Objective
Add press articles to `/press` with concise summaries and citations, reusing existing content items and following accessibility requirements.

## Success Criteria
- [x] Media Coverage section appears on `/press`.
- [x] At least two articles render with titles, summaries, and source citations.
- [x] External links open in new tabs with `rel="noopener noreferrer external"`.
- [x] No console errors related to the new section.

## Architecture
- Data: `getContentSmart()` → `content.pages.home.sections.pressTicker.items`.
- UI: New section under Press Kit; card list (`article`) with badge, headline, summary, cite, and CTA link.
- Accessibility: Landmark with `aria-labelledby`, headings (h2/h3), focus styles, keyboard-friendly links.

## Implementation Steps
1. Make `PressPage` async and load content.
2. Add helper to derive `source` and `headline` from `item.title`.
3. Render grid of cards with summary and citation.
4. Ensure links have `target` and `rel` and clear `aria-label`s.
5. Manual QA with Chrome DevTools.

## Edge Cases
- No items → show friendly placeholder message.
- Malformed URLs → fall back domain label to "external link".

## Testing Strategy
- Manual DevTools inspection: DOM semantics, link attributes, mobile/desktop viewports.
- Console check for errors.
