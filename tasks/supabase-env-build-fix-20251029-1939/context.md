# Task Context

## Initial Requirements
- Resolve build/export failures stemming from Supabase client initialization when env vars are absent during prerender.
- Address TypeScript manifest typing error caused by using `purpose: 'any maskable'`.

## Success Criteria
- `pnpm run build` completes without type errors or prerender crashes in environments without Supabase env variables.
- Static generation/export handles missing Supabase credentials gracefully (e.g., fallback content) without throwing.
- Manifest complies with expected TypeScript types while preserving intended icon purposes.
