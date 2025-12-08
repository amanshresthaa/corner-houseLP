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

### /about Page Light ↔ Dark Stack

The About experience now mirrors the homepage rhythm. The navbar starts light, then sections alternate:

1. **Hero (`components/about/Hero.tsx`) – Dark:** art-deco photography with gradient overlay. CTA buttons reuse homepage tokens.
2. **Story (`components/about/StorySection.tsx`) – Light:** copy-first layout with white glass shell, commitment cards, and a “Neighbourhood promise” note.
3. **Gallery (`components/about/GallerySection.tsx`) – Dark:** cinematic grid with `bg-stout-950`, white borders, and Next/Image.
4. **House highlights (`components/about/HouseHighlights.tsx`) – Light:** gradient-to-white background, brand-outline cards listing guest-favourite touches.
5. **Milestones (`components/about/Timeline.tsx`) – Dark:** glass stat rail + timeline list, sharing palette with QuickLinks/Reviews.
6. **Visit CTA (`components/restaurant/sections/CallToActionSection.tsx`) – Light theme:** closes the page while matching the homepage CTA contract.

When extending `/about`, follow this alternation (dark hero → light story → dark gallery …) so new sections don’t break the established rhythm.

### /events Page Rhythm

The refocused events destination mirrors the same cadence with three key experiences (match screenings, private hire/heated cabins, free Sunday pool). The order is locked to:

1. **Hero – Dark:** gradient background (`from-brand-950 via-brand-900 to-brand-950`), badges for Sky/TNT + cabins + Sunday pool, and primary/secondary CTAs leading to bookings.
2. **Experience Cards – Light:** three-up grid (`rounded-[2.5rem] border-brand-100 bg-white/95`) highlighting “Watch every match”, “Private hire & cabins”, and “Free Sunday pool”. Each card uses a single outline button.
3. **Matchday Essentials – Dark:** two-column layout with glass cards (`bg-white/5 border-white/15`) describing screen coverage, broadcast partners, feature chips, and CTA buttons with white outlines.
4. **Cabins & Private Hire – Light:** paired white cards for heated pods and whole-venue takeovers, each with bullet lists and dual CTAs (outline + ghost) following the light theme token set.
5. **Sunday Pool Spotlight – Dark:** closing band reuses the hero gradient, explains the complimentary Sunday pool offer, and repeats solid/outline button pairing in white.

Maintain this dark → light → dark → light → dark rhythm when inserting future events components (e.g., if a new highlight is added, introduce it as a light card block and push the subsequent section to dark).

### /book-a-table Page Rhythm

The booking destination now mirrors the homepage cadence with a five-piece stack so guests can skim essentials quickly. The order is:

1. **Hero – Dark:** gradient hero (`from-brand-950 via-brand-900 to-brand-950`) with eyebrow chip, display heading, highlight badges, CTA pair (solid white primary, white-outline phone) plus glass fact cards.
2. **Booking Essentials – Light:** gradient-to-white band containing intro copy and a grid of white shells (`rounded-[2.5rem] border-brand-100 bg-white/95 shadow-2xl`) wrapping the live Hours, Book by Phone, and Find Us cards.
3. **Hosting & Experiences – Dark:** glass cards (`bg-white/5 border-white/15`) outline cabins, milestones, and booking assurances alongside a CTA pair (solid brand + white-outline contact link).
4. **Concierge Support – Light:** dual-column white cards covering bespoke planning, response times, and concierge checklist with brand-outline buttons.
5. **Same-day CTA – Dark:** closing glass CTA reminding guests about walk-ins/last-minute tables with solid brand call button + white-outline directions link.

Keep this dark → light → dark → light → dark rhythm whenever introducing new booking content; add light-feature blocks in pairs if additional info is required and push the subsequent sections to maintain alternation.

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

### Story Section (About stack)
- **Structure:** `StorySection` replaced the old homepage widget on `/about`. It uses a light gradient section with a white glass shell for paragraphs plus a side column containing the promise card and commitment tiles.
- **Commitments:** Each tile uses `rounded-2xl border-brand-100 bg-brand-50/80 p-4 shadow-inner` with `0X` eyebrow badges.
- **Notes:** Promise card sticks to white background, uppercase eyebrow, and `font-display` heading for continuity with homepage typography.

### Gallery Section (About stack)
- **Palette:** Dark `bg-stout-950`, white/10 borders, and `rounded-3xl` cards. Uses Next/Image with aspect ratios to prevent CLS.
- **Copy:** Eyebrow + heading follow the same uppercase chip + display title combo from the homepage.

### House Highlights (About stack)
- **Structure:** Gradient-to-white background with a white container and three-column grid of outline cards.
- **Usage:** Reuses the same bullet strings as the homepage feature chips, keeping content DRY.

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
