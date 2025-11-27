# Implementation Plan: Christmas Menu Integration

## Objective
- Publish the updated White Horse Christmas menu on `/christmas-menu`, sourced from provided files, and surface a clear CTA in the navbar linking to it.

## Success Criteria
- Christmas menu content matches `ChristmasMenu.md` (dishes, price £39.99pp, seafood supplement note, rice/bread choice).
- Downloadable PDF (from `WhiteHorseChristmasMenu.pdf`) is accessible via a visible CTA on the Christmas page.
- Navbar shows a Christmas Menu CTA/link on mobile and desktop using existing seasonal styling.
- Structured data and hero copy reflect the new menu and White Horse Waterbeach branding.

## Architecture
- Continue using `app/christmas-menu/page.tsx` with static data objects for menu content and schema generation.
- Serve the PDF from `public/documents/white-horse-christmas-menu.pdf` and link via MotionLinkButton.
- Update `public/data/nav.json` to include the `/christmas-menu` entry so `useNavContent` surfaces the CTA.

## Components / Pages
- `app/christmas-menu/page.tsx`: replace menu data, hero text, CTAs, structured data; remove outdated chef set section.
- `public/data/nav.json`: add seasonal link.
- `public/documents/white-horse-christmas-menu.pdf`: add asset.

## Data Flow
- Nav data read client-side through `useParsedData('nav.json')` → `NavLinks` renders seasonal CTA.
- Christmas page uses local constants → React markup → `renderSchemaTags` builds JSON-LD from the same data to keep parity.

## UI/UX Considerations
- Mobile-first grids for menu sections; maintain existing DaisyUI button styles and focus-visible rings.
- Keep hero CTAs grouped with download + booking + call; include price pill and supplement note.
- Use semantic headings (h1/h2/h3) and `aria-label` for lists; ensure badge/icon text not color-only.

## Testing Strategy
- Manual QA via Chrome DevTools MCP: check nav CTA visibility on mobile/desktop, hero buttons, menu section layout, PDF download, focus/keyboard nav.
- Spot-check `/christmas-menu` structured data presence via DOM inspection (script tag JSON-LD).
- Regression skim: ensure main nav links still function and layout not broken by added item.

## Edge Cases
- PDF link should degrade gracefully if asset missing (verify path resolves).
- Long menu item names wrapping; ensure cards accommodate multi-line text without layout shift.
- Nav collapse/expand on mobile with added link.

## Rollout Plan
- Static deploy; no feature flag. If CMS overrides exist later, nav fallback remains via `nav.json` entry. Update PDF if menu changes.
