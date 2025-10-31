# Research: Home Page Section Spacing

## Existing Patterns
- `components/ClientHomeContent.tsx` sets vertical rhythm for stacked sections via Tailwind `space-y-*` utilities on `<main>`.
- Individual section components (`HomepagePressTicker`, `HomepageAboutSection`, `HomepageSignatureDishes`, `HomepageReviewHighlights`, `QuickLinksSection`, `TakeawayBanner`, `LocationSection`, `CallToActionSection`) rely on internal `py-*` padding rather than external margins.
- Alternating background colors across sections already implemented (dark/light cadence) in prior task.

## Technical Constraints
- Must not modify slideshow (`Showcase`) or `Navbar` per user instruction.
- Need to maintain existing DaisyUI/Tailwind patterns and keep backgrounds untouched aside from spacing adjustments.
- Removing inter-section spacing should not collapse internal padding or break responsive layout.

## Findings
- Primary extra spacing originates from `<main>` using `className="pt-12 pb-16 space-y-10 sm:pt-16 sm:pb-16 sm:space-y-14 lg:space-y-16"` causing `margin-top` between every sibling in the home stack (affects press ticker, about, takeaway, etc.).
- Section components do not set `margin-top` on their root elements; they contribute only padding (`py-*`).
- `CallToActionSection` receives a `className="pt-0"` but still inherits `space-y-*` gap before it.

## Recommendations
- Remove or drastically reduce the `space-y-*` utilities on the home `<main>` while preserving top/bottom padding via explicit utilities on each section where needed.
- If vertical breathing room is still required, (optional) use targeted padding inside sections rather than shared `space-y` margins to align with user request of "remove margin totally".
- After adjustment, verify with Chrome DevTools to ensure no regressions in section separation, especially around mobile breakpoints.
