# Research: Booking Tips Background (Dark)

## Existing Patterns

- Booking Tips section lives in `app/book-a-table/page.tsx:131` as a styled `<section>` with light styles: `bg-white/70`, `border-neutral-200`, text using `text-brand-800` and `text-neutral-600`.
- Other cards on the page (BookByPhoneCard, FindUsCard, LargeGroupsCard) use DaisyUI `card` with light background (`bg-white`) and borders.
- Hero section above uses a dark gradient (`from-brand-700 via-brand-800 to-stout-900`) with light text (`text-neutral-50`).
- Tailwind + DaisyUI configured with light/dark themes in `tailwind.config.js` (`themes: ["light", "dark"]`).

## External Resources

- DaisyUI theming best practices (dark mode via `data-theme` or OS preference).
- Tailwind `dark:` variants for color adaptation.

## Technical Constraints

- Keep to existing patterns on the page (utility classes + DaisyUI). No new component creation required.
- Align with AGENTS.md: prefer DaisyUI when possible, but minimal, focused change acceptable here.
- Accessibility: ensure contrast on dark backgrounds meets WCAG AA.

## Findings

- Current Booking Tips uses light backgrounds only. In dark theme, it needs dark-appropriate backgrounds and text colors.
- Icons and text use `brand-600/800` and `neutral-600`, which will be low-contrast on dark backgrounds.

## Recommendations

- Add `dark:` variants to the Booking Tips wrapper and its children:
  - Wrapper: `dark:border-white/10 dark:bg-white/5` and ensure overall text is readable.
  - Heading: `dark:text-neutral-50` (or accent for hierarchy).
  - List text: `dark:text-neutral-200`.
  - List item background: `dark:bg-white/10` and subtle border `dark:border-white/10` for separation.
  - Icon color: `dark:text-accent-200` to retain visual affordance.
- Keep light theme styles unchanged; this is additive.

## Open Questions

- Should this section be converted to a DaisyUI `card`? For now, maintain existing structure and add dark support to minimize scope and preserve layout.

