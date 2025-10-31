# Verification Report

## DevTools Manual QA

**Tool Used**: Chrome DevTools (MCP)

### Viewports
- [x] Mobile (375×812): card loads collapsed; summary grid readable; toggle expands weekly table and collapses back cleanly.
- [x] Tablet (768×1024): compact layout retains two-column summary; weekly table spans width without overflow.
- [x] Desktop (1920×1080): minimal footprint with ample whitespace; table remains concise.

### Interactions
- [x] `Show weekly hours` toggle updates `aria-expanded` and reveals/hides table.
- [x] Weekly rows highlight today; kitchen/bar columns populate correctly.
- [x] Inline CTAs (`Book online`, `Call …`) accessible via keyboard with visible focus.

### Console / Warnings
- [x] No new warnings or errors introduced (only existing PWA service worker + manifest warnings observed).

### Notes
- Collapsible prop honoured (default collapsed, expanded exposes table).
- Light/dark tokens verified visually during theme check (light theme in scope; dark classes present).

## Sign-off
- [ ] Engineering approved
- [ ] Design approved
