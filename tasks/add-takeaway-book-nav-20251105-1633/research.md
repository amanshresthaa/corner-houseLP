# Research: Add Nav Items for Takeaway + Booking

## Goal
Add "Order Takeaway" (external) and "Book a Table" (internal) to the main navigation, matching slideshow CTAs.

## Findings
- Navbar reads links primarily from `/data/nav.json` via `useParsedData('nav.json', ...)`. If absent, it falls back to `content.global.navigation.header.links` from `config/content.json`.
- The `NavLinks` utility filters out `/` and `/contact`, and allows external `https://` HREFs.
- Slideshow CTAs use:
  - Takeaway: `https://whitehorsecb25.touchtakeaway.net/menu`
  - Book: `/book-a-table`

## Implications
- To ensure consistent navigation, update `public/data/nav.json` (primary source) and optionally update `config/content.json` for parity.

## Risks
- Client-side data loader caches JSON for ~60s (SWR). Restart dev server or hard reload to reflect quickly.
