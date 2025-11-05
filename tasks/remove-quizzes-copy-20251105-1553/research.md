# Research: Remove Quizzes Copy

## Goal
Remove or replace any references to quizzes in site copy.

## Repo Scan Targets
- Search terms: "quiz", "quizzes", "Quiz", "Quizzez" (typos)
- Files: content markdown, components, pages, translations, SEO/OG text

## Assumptions
- No quiz feature is required; only textual references should be removed or refocused.
- Replace quiz CTAs with neutral alternatives (e.g., "Get started", "Contact us", "Learn more").
- If a "quiz" is part of a feature name, rename copy only (not filenames/APIs) unless it is purely marketing text.

## Open Questions
- Preferred default replacement CTA? (Assumed: "Get started")
- Any product-specific terminology to use instead? (Assumed: "assessment" avoided; use generic CTAs)

## Recommendations
- Replace inline text mentioning quizzes with neutral alternatives.
- Remove quiz-specific sections if they are purely marketing fluff without functionality.
- Avoid changing URLs/route names unless explicitly marketing-only and unused.
