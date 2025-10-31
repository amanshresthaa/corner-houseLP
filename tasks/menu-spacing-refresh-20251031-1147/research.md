# Research: Menu Page Spacing & Palette Refresh

## Task Setup
- **Initial Requirements**
  - Remove `space-y-*`/`mb-*` gaps between vertically stacked sections on the menu page and rely on internal spacing.
  - Alternate section backgrounds (excluding the existing hero gradient) dark → light → dark → light, using `brand-900`/`brand-700` for dark blocks and neutral/white for light blocks.
  - Ensure dark-background sections switch to light text/variant styles (e.g., `text-white`, `RestaurantHoursCard variant="dark"`).
  - Preserve hero gradients and any other explicitly noted exceptions.
- **Success Criteria**
  - Menu sections (post-hero) follow the alternating background palette without external spacing utilities.
  - Dark sections remain legible with appropriate light text and component variants.
  - No unintended spacing regressions introduced on other pages/components.
  - Manual QA via Chrome DevTools (desktop/tablet/mobile) shows correct spacing, colors, accessibility.

## Existing Patterns
- `app/menu/page.tsx` renders `RestaurantLayout` → gradient `MenuHero` → `<main>` with two explicit sections: an interactive menu block (`bg-white py-16`) and a combined dietary/CTA block (`bg-brand-50` with nested `pt-*`/`pb-*`). Section spacing currently depends on a mix of section-level `py-*` and nested `pt-*`/`pb-*` wrappers rather than a consistent pattern.
- Interactive functionality lives in `app/menu/_components/MenuInteractive.tsx`, which in turn renders `components/menu/MenuSections.tsx`. `MenuSections` wraps each category in a Tailwind `space-y-12` stack and uses header text classes tuned for light backgrounds (`text-brand-700`).
- Menu item presentation (`components/menu/MenuItemCard.tsx`) assumes a light card surface (`bg-white`), so the surrounding section can be dark as long as container padding and text colors adapt.
- Shared restaurant CTAs already exist as modular sections (`components/restaurant/sections/MenuInformationSection.tsx`, `MenuCTASection.tsx`) with built-in `py-16` padding and DaisyUI-friendly patterns but are not used by the current menu page markup.
- `RestaurantHoursCard` (in `components/restaurant/RestaurantHoursCard.tsx`) supports `variant="dark"`, which flips copy to a light palette and adjusts supporting accents—useful when embedding in dark sections.

## External Resources
- Tailwind CSS docs on [Spacing](https://tailwindcss.com/docs/padding) and [Background Color](https://tailwindcss.com/docs/background-color) to ensure correct utility selection while removing `space-y-*`/`mb-*` gaps.
- WCAG 2.1 contrast guidance (especially 1.4.3) to validate readability when flipping sections to `brand-900`/`brand-700` backgrounds with light text.
- Internal design-system notes from prior tasks (`tasks/global-page-spacing-20251031-1119`) documenting the new vertical rhythm approach (per-section padding, no parent `space-y`).

## Technical Constraints
- Need to preserve dynamic data loading (`getMenuSmart`, `getContentSmart`) already wired through `MenuPage`; new layout must not alter server data dependencies or `metadata` exports.
- `MenuInteractive` relies on sticky white navigation (`bg-white/95`); dark section wrappers must maintain sufficient contrast without overpowering UI controls.
- `MenuSections` currently injects `space-y-12`; removing it requires adding section-level padding (`py-*`) while keeping anchor targets and scroll behavior intact.
- Any new dark sections must audit nested typography/components (headers, badges, CTA text) to keep contrast ≥ 4.5:1; may require conditional class toggles (e.g., `text-white`, `text-neutral-100`).
- Must continue using DaisyUI/Tailwind primitives already in project—no bespoke CSS additions unless unavoidable.
- Ensure layout changes remain responsive; sticky nav offsets (`navbarHeight`) in `MenuInteractive` depend on consistent padding, so removing `space-y` cannot introduce layout jumps.

## Recommendations
- Refactor `app/menu/page.tsx` so each top-level section (post-hero) owns its vertical spacing (`py-16`) and alternates backgrounds explicitly: start with a dark wrapper for the interactive tooling, follow with a light info section, then a dark CTA/hours block, etc., to achieve dark → light → dark → light cadence.
- Extract or swap the ad-hoc dietary CTA markup for the existing `MenuInformationSection` component to gain consistent padding and easier light-background styling; feed it FAQ/allergen content pulled from `menuContent` or other configured sources.
- Reuse `MenuCTASection` (or adapt current CTA markup) within its own section, ensuring the wrapper background toggles as needed while the internal gradient card stays unchanged; adjust button colors if surrounding context changes.
- Update `MenuSections` to drop the `space-y-12` wrapper, apply internal `py`/`gap` spacing per section, and consider alternating backgrounds per menu category if required (or ensure container matches the parent dark theme with light typography).
- Where dark wrappers are introduced (e.g., interactive block, potential hours/contact section), update heading/body classes (`text-white`, `text-neutral-100`) and pass `variant="dark"` to any shared components like `RestaurantHoursCard`.
- Audit for stray `mb-*` utilities between stacked sections and replace them with internal padding or `gap` structures so vertical rhythm remains self-contained within each block.
