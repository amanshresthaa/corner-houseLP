# Implementation Plan: Sports-Focused Events Page

## Objective

Create a sports-first, evergreen Events page at `/events` that showcases live sports coverage, regular events, and a weekly guide, with booking-oriented CTAs.

## Success Criteria

- [ ] Matches requested sections order and layout
- [ ] Uses DaisyUI cards/badges/buttons consistently
- [ ] No specific dates; evergreen phrasing
- [ ] Mobile-first and accessible (focus rings, labels)
- [ ] Renders cleanly at 375px, 768px, and desktop widths

## Architecture

- Page: `app/events/page.tsx`
- Layout: Use `RestaurantLayout` for fixed nav + footer
- Styling: Tailwind + DaisyUI (`card`, `badge`, `btn`)

## Sections

1. Hero (gradient, decorative emojis, heading + subheading)
2. Live Sports Banner (pulsing LIVE badge, Sky/TNT chips, sport types with icons, large low-opacity LIVE bg text)
3. Regular Events Grid (6 cards; 3→2→1 responsive)
4. Match Day Experience (2-col desktop → 1-col mobile; left text+features, right decorative TV box)
5. Weekly Calendar (7 stacked cards; Sat/Sun highlighted)
6. Private Events CTA (two buttons)
7. Footer via layout

## Layout Rules

- Container: max width 1400px (`max-w-screen-2xl` / `container`)
- Section padding: `px-8` (≈2rem) and `py-20` (≈5rem)
- Grids: Tailwind responsive utilities for 3/2/1 columns

## Accessibility

- Proper headings order (h1, h2 per section)
- `aria-hidden` for decorative emojis, SR-only text where needed
- Buttons have clear accessible names

## Testing Strategy

- Manual QA using Chrome DevTools MCP: responsive, console, a11y, performance quick pass
- Check focus states, keyboard navigation, reduced motion preferences

## Edge Cases

- Long titles/descriptions wrapping on small screens
- Ensuring no cumulative layout shift from large background text and emoji

## Rollout

- Replace current `/events` content with the structured, evergreen version.

