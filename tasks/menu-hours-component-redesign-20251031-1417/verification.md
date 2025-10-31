# Verification Report

## DevTools Manual QA

**Tool Used**: Chrome DevTools (MCP)

- [x] Desktop (1920×1080): tabs, status banner, weekly table, and CTA row render correctly; collapse toggle hides details.
- [x] Tablet (768×1024): layout stacks gracefully, tab list remains accessible.
- [x] Mobile (375×812): component loads collapsed by default; summary cards readable and toggle expands full view.
- [x] Keyboard navigation: Tab/Shift+Tab cycles through toggle, tabs, buttons with visible focus rings.
- [x] Console: only pre-existing PWA service worker warning present (no new errors).

## Functional Checks

- [x] Default state collapsed (`aria-expanded="false"`).
- [x] “Show full hours” reveals live status, tabs, today panel, weekly list, notes toggle.
- [x] Tab switch updates schedule without reload (Kitchen ↔ Bar).
- [x] Notes toggle displays and hides helpful info list.
- [x] CTA buttons (`Book a table`, `Call …`) accessible and aligned.

## Known Issues

- [ ] PWA service worker registration error in dev (pre-existing).
- [ ] Manifest `FileHandler accept` warning (pre-existing).

## Sign-off

- [ ] Engineering approved
- [ ] Design approved
