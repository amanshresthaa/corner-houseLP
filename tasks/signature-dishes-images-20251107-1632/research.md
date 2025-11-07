# Research: Signature Dishes Image Refresh

## Task Framing
- **Requirements**: Replace every card in the Signature Nepalese Dishes homepage section so it only features dishes that have supplied photography inside `Everythingyouneed/signaturedishes`. Move those source assets into the production-ready public image tree and wire them up in content.
- **Success Criteria**:
  - All signature dish cards reference the new assets (no legacy stock images remain).
  - Assets live under `public/images/white-horse/dishes/` with semantic filenames.
  - Copy stays consistent with real menu dishes and highlights why each is special.

## Existing Patterns & References
- Data source lives in `config/content.json` → `pages.home.sections.signatureDishes.items`.
- Rendering handled by `components/homepage/HomepageSignatureDishes.tsx`, already wired via `components/ClientHomeContent.tsx`.
- Component expects each item to carry `{ name, description?, image? }`; description currently unused but safe to keep for future.
- DaisyUI carousel + image-full card implementation already ship (see `HomepageSignatureDishes`). No component code changes anticipated if we keep data contract intact.

## Assets Inventory
- Source images located at `Everythingyouneed/signaturedishes/`:
  - `goat curry.png` (1344×768)
  - `himalilamb.png` (1344×768)
  - `lkk chicken.png` (1344×768)
  - `mixed grill.png` (1344×768)
- Need to relocate into `public/images/white-horse/dishes/` with kebab-case filenames (e.g. `signature-goat-curry.png`).

## Content Inputs
- Menu JSON (`menu/all.json`, `menu/speciality.json`) lists canonical dish names: Lasun Kukhura Khursani (LKK) Chicken, Lasun Khasi Khursani (LLK) Lamb, Khasi Ko Masu (Goat Curry), Mixed Grills.
- Blueprint doc (`Everythingyouneed/page-structure-blueprints.md`) describes preferred phrasing for Himali Lamb & Goat Curry.

## Constraints & Considerations
- Follow AGENTS.md workflow: plan/todo/verification docs plus Chrome DevTools QA later.
- Maintain existing image aspect ratio (4:3) to avoid layout shift; Next/Image handles but ensure files sized reasonably.
- Use descriptive alt text matching dish names for accessibility (component uses `dish.name`).
- Delete/move original files only from `Everythingyouneed` if safe; ensure repo still has canonical source.

## Open Questions
- None outstanding; all required assets and dish names available in repo resources.

## Recommendation
- Move/rename PNGs into `public/images/white-horse/dishes/` ahead of content update.
- Update `config/content.json` to list four dishes (LKK Chicken, Himali Lamb, Khasi Ko Masu, House Mixed Grill) with fresh marketing copy referencing authentic prep notes.
- Verify homepage renders new carousel/grid imagery via DevTools once data updated.
