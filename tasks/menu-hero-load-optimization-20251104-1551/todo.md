# Implementation Checklist

## Setup

- [x] Create task docs (research, plan, todo, verification)

## Core Changes

- [x] Update `MenuHero` to accept `hero` prop and prefer props over hook
- [x] Pass transformed `menuContent.hero` from `app/menu/page.tsx` to `MenuHero`

## QA

- [x] Verify hero appears immediately (no skeleton) on `/menu`
- [x] Check network: no extra wait for `/api/content` before hero content
- [x] Accessibility quick check (focusable buttons, readable text)

## Notes / Assumptions

- Server content from `getContentSmart()` is reliable for hero props
- No dependency on interactive client logic within hero
