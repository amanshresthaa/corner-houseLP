# Verification Report – Elevated Hours Card

## DevTools Manual QA

**Tool**: Chrome DevTools MCP

### Viewports
- **Mobile (375×812)**: Card loads collapsed; hero row + service tiles + CTA visible. Toggle expands chips without overflow. Touch targets pass (button, links).
- **Tablet (768×1024)**: Tiles display in two-column grid; weekly chips wrap to two rows when expanded.
- **Desktop (1920×1080)**: Layout remains compact with ample whitespace; weekly chips appear on single row.

### Interactions
- Collapsible toggle updates `aria-expanded` and swaps label (`Show/Hide weekly hours`); full hour details only appear when expanded.
- Weekly chips highlight current day and expose kitchen/bar hours via structured chips (each chip carries accessible label).
- Keyboard focus order: hero → tiles → CTA button/link → toggle; focus rings visible.
- Action links (`Book a table`, `Call …`) open correct URLs.

### Console
- No new warnings/errors introduced (existing PWA service worker + manifest warnings persist).

## Status
- [x] Behaviour validated across target breakpoints.
- [x] Accessibility and keyboard interactions spot-checked.
- [ ] Pending stakeholder sign-off.
