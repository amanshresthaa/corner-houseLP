# Verification Report

## DevTools Manual QA
**Tool Used**: Chrome DevTools (MCP) against http://localhost:3001/contact

### Console Inspection
- [x] No runtime errors
- [ ] Warnings present (Next.js manifest/themeColor + middleware dynamic import notices)

### DOM & Accessibility
- [x] Contact hero shows Corner House branding and CTA buttons with correct phone/email/map links
- [x] Address block displays “231 Newmarket Road, Cambridge CB5 8JE”
- [x] Map iframe points to the Corner House Cambridge location (Google Maps)

### Performance Profile
- [ ] Not profiled (out of scope for this change)

### Device Testing
- [x] Desktop viewport
- [ ] Mobile/tablet (resize command blocked by protocol error)

## Test Scenarios
- [x] Phone link uses `tel:+441223921122`
- [x] Email link uses `cornerhouse@lapeninns.com`
- [x] Map/directions link uses new coordinates (52.20948, 0.14335)

## Accessibility Checklist
- [x] Skip link present; headings structured; focusable CTAs in hero
- [ ] Full keyboard navigation not exhaustively re-tested this round

## Known Issues
- Next.js warnings about `themeColor` metadata and middleware dynamic imports remain (pre-existing)
- Device emulation via resize API failed (“Restore window to normal state before setting content size”)

## Sign-off
- [ ] Engineering approved
- [ ] Design approved
