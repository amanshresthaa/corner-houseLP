## Research: book/contact/press polish

### Existing Patterns

- All three pages render inside `RestaurantLayout` with shared `max-w-6xl px-4 sm:px-6 lg:px-8` containers and DaisyUI `btn` / `badge` classes for CTAs.
- Heroes rely on gradient backgrounds plus `FadeIn` wrappers for scroll animations; each page also injects a `reduceMotion` `<style>` block to disable transitions under `prefers-reduced-motion`.
- Cards such as `RestaurantHoursCard`, `InteractiveMap`, and reassurance/quick contact panels already encapsulate data; spacing is mainly utility classes (`py-14 sm:py-16`, `rounded-[2rem]`, etc.).
- Contact and press share stacked sections with large `py-16` blocks, while book-a-table mixes gradients with white cards; repeated `space-y-*` wrappers add vertical rhythm but sometimes double up with `gap-*` on parents.

### Technical Constraints

- Must keep schema tags, metadata loaders, and `dynamic()` imports (contact) untouched to avoid affecting SEO and bundle splitting.
- Use DaisyUI conventions already tied into Tailwind; avoid introducing new design tokens.
- Keep touch targets ≥44px and respect accessibility rules listed in AGENTS guidelines (focus-visible, aria labels, etc.).
- Layout tweaks should stay hydration-safe (no new client hooks) because pages are async server components.

### Observations / Opportunities

- Hero sections have generous `py-16`+ padding even on mobile, causing excess whitespace; can tighten to `py-12 sm:py-16` and rely on `gap` utilities for breathing room.
- Multiple nested wrappers add redundant `space-y-` vs `gap-` combos; rationalizing these should keep consistent spacing.
- Section backgrounds alternate abruptly (two consecutive gradient sections on press page); adjusting to single hero + neutral content area would improve contrast.
- Cards often have `shadow-2xl` + large border radius; aligning radius/padding (e.g., `rounded-3xl p-6 sm:p-8`) keeps visual rhythm.

### Recommended Approach

1. Standardize section containers to `max-w-5xl`/`6xl` with `py-12 sm:py-16` and `space-y-8` to trim dead space.
2. Tighten hero layouts by switching to CSS grid earlier (md breakpoint) and limiting vertical stacking as soon as width allows.
3. Reuse shared utility combos (e.g., `rounded-3xl border border-brand-100 bg-white/5 p-6 sm:p-8`) for cards on each page.
4. For press page, collapse duplicate gradient sections into one hero plus a contrasting neutral section for quick facts + contact so whitespace feels intentional.
5. Ensure call-to-action groups wrap using `flex flex-wrap gap-3` and consistent `rounded-full` buttons; align copy widths with `max-w-2xl/3xl` as needed.
