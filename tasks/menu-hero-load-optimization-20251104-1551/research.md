# Research: Menu Hero Load Latency

## Existing Patterns
- Menu page (`app/menu/page.tsx`) fetches content server-side via `getContentSmart()` and builds `menuContent`.
- `MenuHero` is a client component using `useMenuContent()` which fetches `/api/content` on the client via SWR.
- When `useMenuContent()` hasn’t resolved yet, `MenuHero` renders a skeleton placeholder.
- Result: Hero waits on a client fetch despite content already being available server-side.

## External Resources
- Next.js App Router best practice: pass server-fetched data as props to client components to avoid duplicate client fetches.
- SWR documentation: use `fallbackData` or initialize via props to remove initial loading state.

## Technical Constraints
- Keep current content architecture (centralized content via `/api/content`).
- Avoid broad refactors; target hero render latency only.
- Maintain accessibility and existing styles.

## Findings
- `MenuHero` can render immediately if it accepts `hero` props from `menuContent.hero` and avoids calling `useMenuContent()` during initial render.
- Keeping `MenuHero` as a client component is acceptable; it will SSR using provided props and hydrate, removing the initial skeleton delay.

## Recommendations
- Pass `menuContent.hero` from `app/menu/page.tsx` to `MenuHero`.
- Update `MenuHero` to accept optional `hero` prop and only fall back to `useMenuContent()` when prop is absent.
- Preserve skeleton UI only when neither props nor hook data are available.
- Verify with Chrome DevTools: ensure hero text/buttons appear immediately and measure improved LCP/element paint.
