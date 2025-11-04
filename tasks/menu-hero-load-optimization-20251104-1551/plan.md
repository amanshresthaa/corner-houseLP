# Implementation Plan: Menu Hero Load Optimization

## Objective

Render the Menu page hero content immediately by removing the client-side fetch dependency and using server-fetched content.

## Success Criteria

- [ ] Hero headline and buttons render without skeleton on first paint
- [ ] No additional client request required for hero content
- [ ] No visual or accessibility regressions
- [ ] LCP/element paint improves in DevTools profiling

## Architecture

### Components
- `MenuHero` (client) accepts optional `hero` prop. If provided, renders immediately; otherwise falls back to `useMenuContent()`.

### Data Flow
- `app/menu/page.tsx` fetches content on server and passes `menuContent.hero` to `MenuHero` as props.
- `MenuHero` renders using props, eliminating initial SWR fetch wait.

## Implementation Steps
1. Add `hero` prop to `MenuHero` and prefer it over hook data
2. Update `app/menu/page.tsx` to pass `menuContent.hero` to `MenuHero`
3. Keep skeleton only when neither props nor hook data exists
4. Verify via Chrome DevTools: paint timing and no extra fetch for `/api/content` before hero render

## Edge Cases
- Missing content: retain skeleton fallback
- External URLs on buttons: keep existing validation in content hook; props will be trusted from server content

## Testing Strategy
- Manual QA with Chrome DevTools
- Check network for `/api/content` timing relative to hero paint
- Accessibility quick pass: headings, contrast, focusable buttons

## Rollout
- Direct change, low risk; monitor console/network on `/menu`
