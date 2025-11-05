# Research: Vercel Build Failure — Optional Supabase Import in Middleware

## Existing Patterns

- `middleware.ts` attempts an optional dynamic import of `@supabase/auth-helpers-nextjs` and gates execution by runtime and env checks.
- Despite runtime guards, the dynamic import uses a literal string specifier which prompts the bundler to resolve the module at build time, causing a module-not-found error when the package isn’t installed.
- A type-only import reference also points to `@supabase/auth-helpers-nextjs`, which can force TypeScript/module resolution if types are needed.

## External Resources

- Next.js module-not-found guidance: https://nextjs.org/docs/messages/module-not-found
- Middleware runs in Edge runtime constraints: https://nextjs.org/docs/app/building-your-application/routing/middleware
- Dynamic import bundling behavior; avoiding static specifiers prevents bundlers from resolving absent optional deps (general Webpack/Next practice).

## Technical Constraints

- Middleware compiles for the Edge runtime; Node-only modules must not be included in the bundle.
- Optional code paths must not trigger bundler resolution for packages that are not installed.
- The project does not list `@supabase/auth-helpers-nextjs` in `package.json` dependencies.

## Findings

- Build log error: "Module not found: Can't resolve '@supabase/auth-helpers-nextjs'" at `middleware.ts:36` (dynamic import literal).
- The code already degrades gracefully at runtime but the bundler still resolves the literal specifier during compilation.

## Recommendations

1. Remove type import coupling to the package; define a minimal local type to prevent TypeScript from resolving the module.
2. Change the dynamic import specifier to a computed string (e.g., `['@supabase','auth-helpers-nextjs'].join('/')`) so bundlers do not attempt static resolution.
3. Keep existing runtime and env guards; the import will not execute on Edge or when env vars are missing.
4. Only if needed, consider adding the package as a dependency; prefer not to, since it’s optional and not used in current config.

