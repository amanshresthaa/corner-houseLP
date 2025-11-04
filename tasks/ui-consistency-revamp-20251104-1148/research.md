# Research: UI Consistency Revamp

## Existing Patterns
- Containers: `mx-auto max-w-6xl px-4 sm:px-6 lg:px-8` on sections (e.g., Press, QuickLinks).
- Hero gradients: `bg-gradient-to-br from-brand-600 to-brand-800` with subtle overlays.
- Cards: DaisyUI `card` + light borders (e.g., `border-brand-100`) and shadows.
- Badges: Prefer `badge badge-outline` for chips; accent use: `badge-accent badge-outline`.
- Buttons: `btn` variants (`btn-ghost`, `btn-outline`) on dark backgrounds; `btn-primary` sparingly.
- Typography: `font-display` for titles; consistent sizes per breakpoint.

## Targets to Align
- `RegularEventsSection` uses nonstandard classes (`bg-surface-base`); switch to card pattern.
- `MatchesSection` card and header styles to match site cards.
- `EventsContactSection` CTA and list visual to align with current tokens.
- Ensure badges/chips within these sections use consistent accent/outline.

## Constraints
- Keep changes incremental and non-breaking.
- Reuse DaisyUI wherever possible (AGENTS.md requirement).
- Maintain mobile-first responsiveness and accessibility.

## Recommendations
- Introduce lightweight UI primitives (Section/Card wrappers) only if needed; otherwise align classes in-place.
- Unify badges to `badge-accent badge-outline` for primary type, `badge-outline` for secondary chips.
- Unify card borders/shadows: `bg-white border border-brand-100 shadow-md`.

