# Implementation Plan: Sports-Focused Pub Events Page

## Objective
Create a single-file, responsive, accessible, evergreen events page emphasizing live sports coverage and community pub culture.

## Success Criteria
- [ ] Matches required section order and content
- [ ] Responsive grids and layouts per spec
- [ ] Evergreen copy (no specific dates/times)
- [ ] Sports focus and pub-culture balance
- [ ] Accessible structure and clear focus states

## Architecture
- Single HTML file  with embedded CSS in  using CSS variables.
- Landmarks: header (fixed nav), main sections, footer.
- Utility classes to emulate badges, cards, grid.

## Components
- Fixed Nav: logo, center menu (desktop), CTA right; hide menu on mobile.
- Hero: gradient background, decorative low-opacity sports emojis.
- Live Sports Banner: pulsing LIVE badge, broadcaster logos, background 'LIVE' text.
- Regular Events Grid: 6 cards with emoji tile, badge, frequency, title/desc, bottom key details with icons.
- Match Day Experience: 2 columns → 1 on mobile; left feature list; right decorative TV box and sports list.
- Weekly Calendar: 7 stacked cards; Sat/Sun highlighted.
- Private Events CTA: centered heading, paragraph, two buttons.
- Footer: simple links and copyright.

## Data Flow
None (static).

## UI/UX Considerations
- Mobile-first; large touch targets; readable type scale.
- Focus outlines via :focus-visible.
- Badges and hierarchy for scannability.

## Testing Strategy
- Manual QA with Chrome DevTools: responsive, accessibility basics, console clean.

## Edge Cases
- Very small screens: ensure no overflow.
- Long text wrapping on cards and buttons.

## Rollout
- Single static asset; host on existing static server; no flags needed.

## Implementation Steps
1. Scaffold HTML structure and head.
2. Add base CSS variables and reset.
3. Build fixed nav with responsive behavior.
4. Implement Hero with gradient/emojis.
5. Build Live Sports banner with pulsing badge.
6. Build Regular Events grid (6 cards).
7. Build Match Day Experience two-column section.
8. Build Weekly Calendar stacked cards (Sat/Sun highlighted).
9. Build Private Events CTA with two buttons.
10. Add Footer.
11. Verify responsiveness and a11y.
