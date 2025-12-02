# Implementation Checklist

## Setup
- [x] Create task directory and docs
- [x] Add Nabatable bookingUrl to `config/restaurant.json`

## Core Implementation
- [x] Update `BookByPhoneCard` to support optional online CTA
- [x] Pass bookingUrl and copy/JSON-LD tweaks in `app/book-a-table/page.tsx`
- [x] Route home hero primary CTA to Nabatable when available
- [x] Update menu hero CTA to Nabatable with external semantics
- [x] Update events hero + banner CTAs to Nabatable (new tab)
- [x] Update about page CTA to Nabatable (new tab)

## Testing
- [x] Add RTL unit test for `BookByPhoneCard` online CTA
- [x] Run targeted jest test(s)

## Verification (Chrome DevTools MCP)
- [x] Manual QA on /book-a-table: CTA renders, responsive, focus order, console clean

## Notes / Assumptions
- Nabatable link is public and does not require auth.
