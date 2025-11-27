# Research: Christmas Menu Integration

## Initial Requirements (Task Setup)
- Add Christmas menu content to the website using provided sources: `christmas-menu-files.json`, `ChristmasMenu.md`, and `WhiteHorseChristmasMenu.pdf`.
- Add a call-to-action link/button to the navbar pointing to the Christmas menu.

## Success Criteria (Task Setup)
- Christmas menu is available on the live site experience with accurate content from provided files.
- Navbar includes a clear CTA that navigates to the Christmas menu section/page on mobile and desktop.
- Implementation aligns with existing patterns (DaisyUI, mobile-first, accessibility requirements) and passes verification checklist.

## Existing Patterns
- Navigation content comes from `public/data/nav.json`; `useNavContent` (in `components/restaurant/NavbarParts.tsx`) prioritises this file over CMS content, strips `/` and `/contact`, and marks links to `/christmas-menu` as `isSeasonal` for special styling (🎄 icon, accent background).
- Navbar stack is fixed via `components/restaurant/Navbar.tsx` and `RestaurantLayout`; spacing is managed with CSS vars `--navbar-offset`/`--navbar-stack-offset`, so new links should fit within the existing flex layout.
- Christmas menu page lives at `app/christmas-menu/page.tsx`, already uses `RestaurantLayout`, motion wrappers, and structured data injection. Menu data is currently hard-coded to an older set (£44.99 chef set, different dishes).
- Static assets (PDFs, images) are served from `public/...`; there is a `public/documents` folder containing other menu PDFs.

## External Resources
- Provided content files: `ChristmasMenu.md` (new menu text, £39.99pp; starters/mains/sides/rice & breads/desserts; £3 seafood supplement), `WhiteHorseChristmasMenu.pdf` (downloadable menu), `christmas-menu-files.json` (older reference implementation with PDF download button and nav CTA patterns).

## Technical Constraints
- Must follow DaisyUI/Tailwind patterns already in Navbar and Christmas page components; maintain mobile-first responsive behaviour.
- Keep accessibility requirements: semantic headings, focus-visible, aria labels; nav uses `Link` wrapper and `btn` classes.
- Structured data rendered via `renderSchemaTags` and `SchemaInjector`; updates to menu data should keep schema accurate.
- Static assets need to reside under `public/` to be served by Next.js.

## Recommendations
- Update `/christmas-menu` to use the new menu content (including £39.99 price, dish lists, seafood supplement note) and remove outdated chef set copy.
- Add a prominent download CTA for the new PDF (place file under `public/documents/`), plus booking/contact CTAs retained.
- Add a seasonal CTA/link in the navbar by inserting `/christmas-menu` into `public/data/nav.json` so it benefits from existing seasonal styling.
- Refresh structured data/hero text to match the new menu details and White Horse Waterbeach branding.
