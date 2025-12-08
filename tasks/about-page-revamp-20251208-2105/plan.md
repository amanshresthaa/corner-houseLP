# Implementation Plan: About Page Revamp

## Objective & Success Criteria
- Rebuild `/about` so it mirrors the homepage design system (gradient alternation, `max-w-6xl` rhythm, DaisyUI buttons) using the structured copy from `config/content/pages/about.json` instead of hardcoded strings.
- Surface the house story, milestones, stats, and CTAs within glassmorphic/light cards that match `HomepageAboutSection` styling while ensuring accessible focus management and responsive layouts.
- Ship Jest tests and manual QA coverage to lock in the new structure, ensuring CTAs render with the correct accessible labels and timeline data.

## Architecture & Data Flow
- Keep `RestaurantLayout` + `generateMetadata()` but augment the default export to load `aboutContent` via `getContentSmart()` (`const aboutContent = (content.pages as any)?.about || {}`) so data is sourced from config.
- Derive booking/call CTA data from `getContactInfo()` and `contentConfig.global.ui.buttons` to remain in sync with other pages.
- Define lightweight section-level prop types within `app/about/page.tsx` (no new global schemas needed) for hero, highlights, timeline, and CTA patterns to keep state colocated.
- Compose the page from new presentational components declared inside `/app/about/page.tsx` or `/app/about/_components`:
  1. `AboutHeroSection` (dark gradient) — renders eyebrow chip, headline, subtitle, hero media with stat chips using data from `aboutContent.hero` plus brand CTA info.
  2. `AboutStoryShell` (light card) — reuses the `HomepageAboutSection` layout vocabulary (white card, stats chips, CTA tray) but tailored to story paragraphs and features.
  3. `AboutTimelineScroller` — horizontal scroll timeline referencing `aboutContent.story.timeline`, using uppercase year chips with focusable cards.
  4. `AboutExperienceGrid` — dark band quick-link style grid summarizing dining, cabins, sports, etc., with Link buttons for `/menu`, `/events`, phone call, etc.
  5. `AboutMilestoneHighlights` or `MissionStats` — optional stat cards/reservation badges bridging light/dark rhythm.
  6. `AboutVisitCTA` — light-on-dark CTA block echoing `CallToActionSection` but scoped to about-specific copy from config CTA block (address, hours, booking button/call info).
- Maintain alternation order `dark hero → light story → dark experiences → light timeline/gallery → dark CTA` for readability per design doc.

## Component & Styling Considerations
- Containers: wrap each section with `max-w-6xl px-4 sm:px-6 lg:px-8` and `py-12/16`; apply gradients `bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950` for dark bands and `bg-gradient-to-b from-brand-50 via-white to-white` for light.
- Cards: use `rounded-4xl border border-brand-100 bg-white/95 shadow-2xl` for main story/timeline shells; quick-link cards use `rounded-3xl border-white/15 bg-white/5 backdrop-blur` (matching doc).
- Buttons: rely on DaisyUI `btn` classes with `rounded-full` for pill CTAs; ensure hover/focus states follow doc (lighter hover, `focus-visible:ring`).
- Imagery: use `next/image` with `sizes` attributes; if no hero image provided, show fallback gradient block.
- Accessibility: include `aria-labelledby` ties, `aria-live` not needed but ensure timeline/scroll containers get `tabIndex={0}` for keyboard scrolling; maintain `touch-action: manipulation` for tel CTAs.

## Testing Strategy
- Add a Jest/RTL test (e.g., `tests/pages/about/page.test.tsx`) that renders the About page component with mocked content loader + contact info to assert:
  - Hero heading/subtitle appear and CTA buttons link to booking + tel values with accessible labels.
  - Timeline items render in order and remain focusable (assert `role="listitem"` or `tabIndex={0}`).
  - Experience grid cards exist with Link targets (`/menu`, `/events`, `tel:`) and correct text.
- Mock `getContentSmart` & `getContactInfo` (jest.mock) to keep test deterministic.

## Edge Cases & Error Handling
- Provide graceful fallbacks if config sections are missing (e.g., hero subtitle optional, timeline empty). Continue rendering sections only when data exists to avoid blank shells.
- Ensure CTA button handles both external booking URLs and internal `/book-a-table`, appending `rel="noopener noreferrer"` when external.
- Maintain `prefers-reduced-motion` styles (global snippet already inserted) and avoid heavy `framer-motion` to reduce dependencies.

## Verification & Rollout
- After implementation, run `npm run lint` and `npm run test` to catch regressions.
- Perform manual QA with Chrome DevTools MCP: verify contrast on dark bands, responsive breakpoints (mobile/tablet/desktop), timeline scroll, keyboard focus, and console is clean.
- Document test + QA evidence inside `verification.md`.
