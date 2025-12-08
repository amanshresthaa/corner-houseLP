# Implementation Plan: Menu Page Revamp

## Objective
Revamp `/menu` to mirror the homepage design system (gradient rhythm, DaisyUI tokens, alternating light/dark shells) while preserving existing data flows and interactive functionality.

## Success Criteria
- [ ] Every section uses homepage container rhythm (`max-w-6xl px-4 sm:px-6 lg:px-8`, `py-12+`).
- [ ] Light/dark palette alternates between at least four consecutive blocks.
- [ ] Buttons/badges reuse DaisyUI tokens and typography specs from the design snapshot.
- [ ] Page passes existing unit tests and new DOM hooks are covered by fresh tests.
- [ ] Structured data + MenuInteractive functionality remain intact.

## Architecture & Components
1. **Hero (light gradient)**
   - Update `MenuHero` to use homepage hero styles: eyebrow chip, `font-display` heading, DaisyUI buttons, optional highlight chips (items count + vegetarian/allergen coverage computed server-side and passed down).
2. **Interactive Menu Section (light)**
   - Wrap `MenuInteractive` in gradient band w/ `rounded-[2.5rem] border shadow-2xl` card; include descriptive left column + status pills referencing `menuDescription` and `allergenNotice`.
3. **Dietary & Info CTA (dark)**
   - Replace current `Need Dietary Information` block with dark gradient grid combining CTA + highlight chips (reuse QuickLinks badge styles). Provide buttons for `/menu-information`, call, and download options if available.
4. **Visit Planner / Hours (light)**
   - Rebuild hours/address area using stat chips similar to homepage `LocationSection`: cards w/ `rounded-3xl` + `border-brand-100` plus DaisyUI button stack.
5. **Menu Concierge Quick Links (dark)**
   - Introduce `QuickLinksSection` configured with menu-specific cards (Book, Call, Download menu) inside page to preserve alternating rhythm; data derived from `menuServiceCta` + contact info.
6. **Closing CTA**
   - Reuse `CallToActionSection` with `theme="dark"`, update copy if needed, ensure preceding section is light for alternation.

## Data Flow & Helpers
- Compute `menuStats` on the server (total sections, vegetarian/gluten-free presence, price range). Pass summary into hero chips + highlight cards.
- Keep `optimizedMenu` creation as-is for interactive experience.
- Build arrays (`dietaryHighlights`, `visitCards`, `quickLinks`) server-side to keep client components lean and testable.

## UI/UX Considerations
- Maintain mobile-first approach: sections stack, cards use `gap-6`, nav remains touch-friendly (>=44px height, `touch-action: manipulation`).
- Buttons: use DaisyUI `btn` variants with focus-visible styles consistent with Call-to-action patterns.
- Provide `aria-labelledby`, `aria-describedby`, and maintain `data-testid` attrs for tests.
- Add `prefers-reduced-motion` guard already present; respect when adding new animations.

## Testing Strategy
- Extract deterministic helpers (stats, highlights, quick links) into `src/lib/menu/page-patterns.ts` and cover them with Jest (`tests/data/menu/page-patterns.test.ts`).
- Add a lightweight React Testing Library suite (`tests/pages/menu/page-layout.test.tsx`) to assert new `data-testid` hooks, gradient order, and CTA payloads render correctly.
- Run `npm run test -- tests/data/menu/page-patterns.test.ts tests/pages/menu/page-layout.test.tsx __tests__/components/menu/MenuSearchFilter.test.tsx` to validate helpers plus existing interactive components.
