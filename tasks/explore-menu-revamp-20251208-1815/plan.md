# Implementation Plan: Explore Menu Revamp

## Objective
Replace the previous, overly complex explore experience with a lighter, more approachable section that makes the interactive menu card easy to understand at a glance.

## Success Criteria
- Users immediately see curated entry points (popular sections, featured dishes, dietary presets) before diving into MenuInteractive.
- Search/filter controls feel accessible on both mobile and desktop without scrolling past dense content.
- Section matches design tokens (eyebrow chips, rounded cards, alternating gradient rhythm) and passes RTL/unit tests plus DevTools QA.

## Architecture & Components
1. **Explore section shell**
   - Keep a single light-toned gradient band with eyebrow, concise headline, and one paragraph of copy.
   - Inline small stat chips plus a short list of dietary highlights (re-using existing helper output) to orient readers without extra cards.
   - Provide only a handful of quick filter buttons (Vegetarian, Vegan, Gluten-free, Value) that dispatch preset events for the interactive card, plus a clear-all action.
   - Offer pragmatic CTAs (call now, view menu info) without extra grids or featured content.
2. **Interactive card rebuild**
   - Replace the sticky, multi-panel layout with a straightforward card that stacks: quick search field, quick dietary toggles, horizontal section chips, optional “Advanced filters” accordion (housing the existing `MenuSearchFilter`), section content, and a results summary.
   - Introduce helper text/step list at the top to explain how to browse.
   - Dispatch preset events from the new quick controls so `MenuSearchFilter` can continue to drive filtering logic internally.
3. **State wiring**
   - Track the latest filters returned by `MenuSearchFilter` (for quick toggle state) without introducing more complex orchestration.
   - Remove sticky nav/scroll detection to keep the component predictable on mobile.

## Data Flow
- Build new helper `buildMenuExplorePresets(sections)` returning objects `{ id, label, description, filters }`.
- On the server, compute `featuredItems` (maybe top 3 across sections using tags `popular/signature/chef`). Provide fallback when not enough metadata.
- Page component passes `exploreData` into Explore section component, which orchestrates preset toggles + `MenuInteractive` props.
- Preset interactions update local state while still allowing the built-in `MenuSearchFilter` to operate.

## UI/UX Considerations
- Buttons and chips must expose `aria-pressed` to communicate toggle state.
- Keep instructions short (3-step list) and rely on DaisyUI cards for hierarchy instead of glassmorphism.
- Advanced filters should be clearly labeled but collapsed by default so casual visitors aren’t overwhelmed.
- Ensure quick controls work equally well via touch or keyboard.

## Testing Strategy
- Unit test the new helper(s) generating presets/featured items (e.g., `tests/data/menu/explore-presets.test.ts`).
- RTL test for the new Explore section server render (ensuring featured cards + preset buttons + interactive card appear) and interactive preset behavior (simulate clicking preset updates summary or data passed to child stub).
- Re-run existing targeted Jest suites (menu data + components) plus new tests.

## Implementation Steps
1. Update `MenuExploreSection` to the simplified layout (copy, stat chips, highlight list, lightweight quick buttons, CTA row) and ensure it dispatches preset events only when needed.
2. Rebuild `MenuInteractive` markup to the new card flow (quick search/toggles, section chips, advanced filters accordion, sections list, summary) while keeping existing filtering callbacks.
3. Adjust page wiring/props plus tests to reflect the new structure; trim any unused featured/preset props.
4. Refresh RTL coverage for the section and ensure MenuSearchFilter tests still cover preset events.
5. Run targeted Jest suites and finish with DevTools verification.
