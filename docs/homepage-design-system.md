# Homepage Design System Snapshot

This document captures the current homepage composition so we can replicate the same look-and-feel on other pages without re-inspecting every component.

## Layout & Spacing

- **Viewport rhythm:** Every section sits inside `max-w-6xl px-4 sm:px-6 lg:px-8` with vertical spacing of `py-12` on mobile and `py-16` (or `sm:py-16`) on larger breakpoints.
- **Containers:** Cards use `rounded-3xl` or `rounded-[2.5rem]` shells with a 1px border (`border-brand-100`, `border-white/15`, etc.) plus subtle `shadow-xl/2xl`.
- **Typography:** Display styles rely on the `font-display` family (Playfair) paired with uppercase eyebrows using tracking between `0.3em–0.4em`.
- **Motion:** Framer Motion is only applied in `QuickLinksSection` for entrance fades; keep animations optional and respect `useReducedMotion`.

## Color & Light/Dark Rhythm

| Order | Section | Theme | Key Background |
| --- | --- | --- | --- |
| 1 | PressTicker (`components/homepage/PressTicker.tsx`) | Light | `bg-gradient-to-br from-brand-50 via-white to-brand-50` |
| 2 | QuickLinks (`components/restaurant/sections/QuickLinksSection.tsx`) | Dark | `from-brand-950 via-brand-900 to-brand-950`, cards `bg-white/5` |
| 3 | Signature Dishes (`components/homepage/HomepageSignatureDishes.tsx`) | Light | `from-white via-neutral-50 to-brand-50` |
| 4 | Review Highlights (`components/homepage/HomepageReviewHighlights.tsx`) | Dark | `from-brand-950 via-brand-900 to-brand-950` |
| 5 | About (`components/homepage/HomepageAboutSection.tsx`) | Light | gradient overlay + white card |
| 6 | Closing CTA (`components/restaurant/sections/CallToActionSection.tsx`) | Dark | `theme="dark"` variant |
| 7 | Takeaway Banner (`components/restaurant/TakeawayBanner.tsx`) | Light | `from-white via-neutral-50 to-brand-50` |
| 8 | Location (`components/restaurant/LocationSection.tsx`) | Dark | `bg-brand-950` glass map |

Maintain alternation when inserting new sections—swap palettes or add separators to preserve contrast.

## Components & Patterns

### Eyebrow + Badge Tokens
- Eyebrow chips: `rounded-full border border-brand-200 bg-white px-4 py-1 text-xs uppercase tracking-[0.35em]` (light) or `border-white/30 bg-white/10 text-accent-100` (dark).
- Badges pair with lucide icons or small dots (`PressTicker`) for quick attention cues.

### Cards
- **Light cards** (Press/About/Signature supporting dishes): `bg-white`, `border-brand-100`, `shadow-xl`, `rounded-3xl/4xl`.
- **Dark cards** (QuickLinks/Reviews/Location): `bg-white/5`, `border-white/15`, `backdrop-blur`, and gradient overlays (`accentBackground` map) for depth.

### Buttons
- DaisyUI `btn` classes with variants:
  - `btn` + `border-none bg-brand-900 text-white` for primary dark call-to-actions.
  - `btn btn-outline border-brand-200 text-brand-900` for light contexts.
  - For quick links, use pill buttons `rounded-full border-white/30` and include chevron/arrow glyphs.

### Typography
- Headings typically `text-3xl–5xl font-display font-bold` depending on hero importance.
- Descriptions stick to `text-base` or `text-lg` with `text-brand-600` (light) or `text-white/80` (dark).
- Quote blocks (`HomepageSignatureDishes`, `HomepageReviewHighlights`) leverage italic text plus uppercase author captions set in `tracking-[0.3em]`.

## Section Blueprints

### Press Ticker
- **Layout:** Two-card grid with `card-body flex h-full flex-col gap-4`.
- **CTA:** `btn btn-sm btn-outline border-brand-200 text-brand-900` linking externally via `<Link>` component.
- **Copy:** Use `LABEL_DEFAULT` fallback (“In the press”) to stay consistent.

### Quick Links
- **Data Contract:** `QuickLinkItem` requires `title`, `description`, `link`, `linkText`; optionally `icon`, `eyebrow`, `ctaText`, `accent`.
- **Visuals:** Gradient background per accent key and `rounded-3xl` card shells.
- **Motion:** Each card uses `whileInView` animations; keep `viewport={{ once: true, amount: 0.4 }}` for performance.

### Signature Dishes
- **Hero block:** Left column for text + highlight chips; right column uses `Image` with overlay gradient.
- **Supporting grid:** Mobile horizontal scroll + 3-column desktop grid (`lg:grid-cols-3`).
- **Tags:** `badge badge-outline` with color depending on tone (light vs dark callouts).

### Review Highlights
- **Palette:** Mirrors QuickLinks dark scheme but with review-specific badges (platform pill, rating stars).
- **Spotlights:** `accentGradient` and `accentBorder` maps provide subtle colored glows.
- **Platform Links:** DaisyUI buttons with `focus-visible:ring` for keyboard accessibility.

### About Section
- **Structure:** White glass card (`rounded-4xl border-brand-100 bg-white/95`) containing copy, stats, gallery, CTA buttons, and timeline chips.
- **Stats chips:** `rounded-2xl border border-brand-100 bg-brand-50/70 px-4 py-3`.
- **CTAs:** Use `btn btn-sm rounded-full border-brand-200 bg-white` for parity with hero CTA styles.

### Closing CTA
- **Themes:** `theme="dark"` toggles glassmorphism colors; when adding elsewhere reuse the same prop contract (eyebrow, badge, features, contact, image, buttons).
- **Buttons:** Icon detection via `buttonIconMap`; use `key` wherever possible to pick the correct lucide glyph.
- **Hotline card:** `data-testid="cta-hotline-card"` for testing; link built from sanitized tel digits.

### Supporting Bands
- **Takeaway Banner:** Two-column layout with highlight chips (`data-testid="takeaway-highlight-grid"`). Keep same badge style for “Takeaway ready” eyebrow.
- **Location Section:** Glass cards + CTA buttons (Call, Google Maps, Apple Maps) plus `RestaurantHoursCard`/`InteractiveMap` composites.

## Implementation Tips

- Import components through `HomeSectionsRenderer`; maintain order using `HOME_SECTION_ORDER` (`src/lib/homepage/sections.ts`).
- When composing new sections, mirror the container and spacing utilities to avoid CLS.
- Keep gradients text-friendly: lighten backgrounds whenever text color switches to dark, and vice versa.
- Tests live in `tests/components/restaurant/sections/*.test.tsx`; update them whenever DOM structure (spacing classes, data-testid attributes) changes.

## Menu Page Design System Snapshot

### Layout & Rhythm
- Mirrors the homepage container sizing: each vertical band uses `max-w-6xl px-4 sm:px-6 lg:px-8`, mobile-first padding (`py-16` default, `sm:py-20` for dense sections).
- Page alternates dark/light experiences starting from the hero (dark hero → dark explore → light visit → dark quick links → light CTA) to keep long scrolls visually fresh.
- Shared typography tokens (`font-display` for hero headings, uppercase eyebrows with `tracking-[0.35em]`). CTA groups always use DaisyUI `btn` classes with rounded-full outlines.

### Hero (`MenuHero`)
- **Palette:** Dark gradient `from-brand-950 via-brand-900 to-brand-950` so it contrasts against the light navbar. Two radial overlays soften the top and bottom edges.
- **Eyebrow & CTAs:** Eyebrow pill uses `border-white/30 bg-white/10 text-white/80`. Primary CTA is solid white with brand text (`bg-white hover:bg-white/90`), and the secondary “Call” CTA is transparent with white outline (`border-white/40 hover:bg-white/10`).
- **Highlights Grid:** Glass cards (`border-white/15 bg-white/5`) ensure the stats remain legible over the dark background. Tests reference `data-testid="menu-hero-highlight-grid"`.

### Explore Section (`MenuExploreSection`)
- **Container:** Dark gradient continues with sticky left column. Cards use glassmorphism: `rounded-[2.75rem] border-white/20 bg-white/5 shadow-2xl`.
- **Stats/Dietary:** Each stat tile uses subtle borders (`border-white/20`) while dietary notes sit inside a `bg-white/10` block to separate long copy.
- **CTA Tray:** Telephone/info buttons inherit hero styling (white pill + transparent outline). Hover states never invert colors—light CTAs stay light (`hover:bg-white/90`), while transparent buttons add `hover:bg-white/10` only.
- **MenuInteractive Card:** Right column drops onto a light card (`bg-white p-6 shadow-2xl`). Even in the dark band, the interactive shell remains light so inputs, nav pills, and the scroll area inherit daytime palettes.

### MenuInteractive & Search
- **Quick Search Block:** `rounded-[2rem] border-brand-100/80 bg-white/95` for light tone; quick dietary pills use white backgrounds for active states and light borders for inactive states.
- **Nav Pills:** Always uppercase text with brand outlines; `focus-visible:ring` tokens maintain accessibility. Clicking a pill scrolls to the section and updates the hash while honoring `prefers-reduced-motion`.
- **Advanced Filters:** Contained inside `MenuSearchFilter` with rounded cards, chip controls, price sliders, and URL-sync features retained. Tests live in `tests/components/menu/MenuInteract*.test.tsx` and `MenuSearchFilter.test.tsx`.

### MenuSections List
- Each group sits within a light band (global background flips back to light). Cards use `rounded-[2.5rem] border-brand-100 bg-white/95` with interior scroll containers limited to desktop (`lg:max-h-[32rem]`).
- Scroll areas are focusable `role="region"` blocks with `tabIndex={0}` so keyboard users can scroll within the list. Hover styles only adjust border opacity; no color inversion.
- Badges reuse the brand outline chips; price labels align right with `text-brand-900`.

### Visit CTA Band (`menu-visit-section`)
- Gradient transitions back to light (`from-white via-brand-50/40`). Cards adopt `rounded-[2rem] border-brand-100/80 bg-white/95` shells.
- CTA cluster uses three consistent buttons: solid brand for booking, light outline for tel (hover `bg-white/90`), and matching outline for directions (with ↗ glyph). `aria-label`s describe the action for screen readers.

### Quick Links & CTA
- `QuickLinksSection` is imported directly from the homepage dark band, keeping the alternating palette.
- `CallToActionSection` uses the light theme at the bottom for closure. Buttons continue the brand vs. transparent styling established earlier.

### General Guidance for Other Pages
- **Color palette:** Start with light navbar → dark hero for dramatic entry, then alternate per major section. Use glass cards (`bg-white/5` + white borders) whenever copy sits on dark gradients.
- **Buttons:** Keep light buttons light on hover; use opacity or subtle drop shadows instead of flipping to dark backgrounds. Transparent buttons should only gain `bg-white/10` (dark) or `bg-brand-50` (light) on hover.
- **Spacing:** Lock to the shared rhythm (16–20 units vertically, `gap-10` between columns, `rounded-[2.5rem]` for hero/explore shells). Maintain `max-w-6xl` center column to prevent drift.
- **Accessibility:** All scrollable regions need focusable wrappers. CTA groups should include `aria-label`s that describe outcomes (e.g., “Get directions (opens in new tab)”).
