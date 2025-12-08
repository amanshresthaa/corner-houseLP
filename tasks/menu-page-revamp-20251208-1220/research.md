# Research: Menu Page Revamp

## Existing Implementation
- `app/menu/page.tsx` renders hero, interactive menu, allergy CTA band, hours + contact grid, and global `CallToActionSection` but spacing/backgrounds do not follow homepage design cadence (containers vary, backgrounds plain `bg-neutral-50/bg-brand-900`).
- `MenuHero` is a bespoke client component with simple gradient and centered CTAs; lacks alternating light/dark shells, eyebrow chips, and typography tokens called out in the design doc.
- `MenuInteractive` already supports tone toggling and sticky nav; currently wrapped in plain white card with `bg-neutral-50` section but not using gradient combos/rounded shells described for homepage cards.
- Existing supporting bands (dietary info CTA, hours grid) use ad-hoc utility classes and card styles; no DaisyUI tokens, lacks alternating gradient rhythm, and has minimal data-test hooks for future tests.
- Menu content is fetched via `getMarketingSmart/getMenuSmart`; `menuContent.hero` supplies CTA copy; `CallToActionSection` reused from restaurant sections.

## Relevant Design System Notes
- **Layout rhythm:** `max-w-6xl px-4 sm:px-6 lg:px-8` containers with `py-12` mobile / `py-16`+ desktop. Cards use `rounded-3xl` or `rounded-[2.5rem]` plus 1px border + `shadow-xl`.
- **Light vs dark alternation:** Sequence uses gradients such as `bg-gradient-to-br from-brand-50 via-white to-brand-50` for light, `from-brand-950 via-brand-900 to-brand-950` for dark; maintain contrast between consecutive sections.
- **Eyebrows/badges:** Uppercase `tracking-[0.35em]` chips with `border-brand-200 bg-white` (light) or `border-white/30 bg-white/10 text-accent-100` (dark).
- **Typography:** `font-display` headings sized `text-3xl–5xl`, supporting copy `text-base/text-lg` with `text-brand-600` (light) or `text-white/80` (dark).
- **Components:** QuickLinks + Review cards use gradient `accent` tokens, `CallToActionSection` has `theme` prop, `TakeawayBanner` + `LocationSection` illustrate run of alternating shells.

## Patterns to Reuse
- Use `RestaurantLayout` wrapper (already in place) and mirror homepage container classes for each section.
- Leverage `FadeIn` animation wrapper already imported to mirror homepage motion cadence.
- Reuse DaisyUI button styles from homepage sections (e.g., `btn`, `btn-outline`, pill buttons with chevron) instead of bespoke `rounded-lg` anchors.
- Data-driven accent lists can borrow from `QuickLinksSection` structure: gradient backgrounds keyed by accent tokens, `data-testid` for each card to support tests.
- Hours/address block can reuse card styles from homepage `LocationSection` (glass cards, border `white/15` or `brand-100`).

## Content Considerations
- `menuContent.sections.description` and `allergenNotice` should be surfaced using new design tokens (maybe as stat cards or highlight chips).
- Menu-specific highlights (allergen info, vegetarian options, call to action) can come from `menu` data: precomputed `optimizedMenu` includes `sections`, `hasVegetarian`, etc. Could display metrics (items count, vegetarian availability) similar to homepage stats chips.
- Ensure `MenuInteractive` supports `tone="dark"` for dark sections if needed.

## Technical Constraints / Notes
- Page is server component; hero uses client component but accepts props for hydration-free render.
- Must keep structured data script and `revalidate` setting.
- Tests exist under `__tests__/components/menu` and `tests/components/sections/MenuCTASection.test.tsx`; need new tests for new DOM/class hooks.
- Project uses Next.js App Router; maintain `Link` from `@/lib/debugLink` for internal navigation to keep debug instrumentation.
- Need to keep `prefers-reduced-motion` global style snippet.

## Recommendations / Next Steps
- Define new light/dark sections derived from homepage blueprint: hero (light gradient), interactive menu (light card), dietary CTA (dark gradient), service info/hours (light card grid), closing CTA (dark). Ensure alternating backgrounds.
- Introduce highlight stats/badges leveraging `optimizedMenu` metadata to provide extra contextual info (counts, dietary coverage) to align with homepage's data-rich cards.
- Update CTA buttons to DaisyUI equivalents with consistent focus rings and icons.
- Add `data-testid` hooks for each new section to facilitate tests.
