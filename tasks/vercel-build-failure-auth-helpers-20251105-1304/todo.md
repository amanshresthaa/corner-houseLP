# Implementation Checklist

## Setup

- [x] Create task directory and research/plan docs

## Core Fix

- [x] Remove type import coupling in `middleware.ts`
- [x] Compute dynamic import specifier to avoid bundler resolution

## Verification

- [x] Run `npm run build` locally without errors
- [ ] Smoke test `npm run dev` and load home page
- [ ] Check Console via DevTools for errors

## Notes / Assumptions

- Supabase helpers are optional and not required for current deployment
- Middleware should gracefully skip Supabase logic on Edge or missing env vars
