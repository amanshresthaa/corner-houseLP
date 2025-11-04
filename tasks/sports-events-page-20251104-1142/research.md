# Research: Sports-Focused Events Page

## Existing Patterns

- Layout: `components/restaurant/Layout.tsx` provides fixed navbar (`Navbar`) and footer; main uses safe padding for fixed nav.
- Navigation: `components/restaurant/Navbar.tsx` follows mobile-first, fixed top, DaisyUI buttons and responsive structure.
- Footer: `components/restaurant/Footer.tsx` already included by `RestaurantLayout`.
- Styling: Tailwind CSS with DaisyUI plugin enabled (`tailwind.config.js`), theme scales like `brand`, `accent`, `neutral`.
- Components: Many pages use semantic sections with container widths; homepage uses `ClientFooter`, but restaurant pages prefer `RestaurantLayout`.
- Route: Existing `app/events/page.tsx` exists but content does not match requested sports-first structure.

## External Resources

- DaisyUI components reference: https://daisyui.com/components/
- WAI-ARIA patterns for navigation and badges: https://www.w3.org/WAI/ARIA/apg/

## Technical Constraints

- Keep content evergreen; avoid specific dates. Use generic frequencies and guidance like “Check socials for dates”.
- Respect container max width ~1400px (configured as `2xl: '1400px'`).
- Use DaisyUI components where possible: `card`, `badge`, `btn`, and responsive utilities.
- Accessibility: keyboard-focusable CTAs, semantic headings, proper aria labels.

## Recommendations

- Re-implement `/events` using `RestaurantLayout` to inherit fixed nav + footer.
- Structure sections in exact requested order, using Tailwind grid utilities and DaisyUI cards.
- Implement a prominent Live Sports banner with pulsing "LIVE" badge and large low-opacity background text.
- Use emoji as decorative icons with `aria-hidden` and provide screen-reader labels.
- Provide static, recurring events and a weekly calendar using generic timings (no absolute dates).

---

## Open Questions

- Events Pack asset is not present. Use a safe fallback link (e.g., Contact or Wakes Menu) while keeping CTA label as requested.
- Use text labels for Sky Sports/TNT Sports (no brand assets bundled).

