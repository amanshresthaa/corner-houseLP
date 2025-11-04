# Research: Events Page Redesign

## Existing Patterns
- Next.js app router with  providing Navbar and Footer
- TailwindCSS + DaisyUI configured (see )
- Current Events page () uses Tailwind and motion wrappers but not the requested structure
- Content helpers in  include HOME_EVENTS and sports references

## External Resources
- Task sample HTML structure provided by stakeholder
- Dossier:  (sports, quiz, family friendly, Sky/TNT)

## Technical Constraints
- Maintain mobile-first; avoid CLS; use DaisyUI where possible
- Keep Navbar/Footer from layout; page responsible for main content only

## Recommendations
- Rebuild Events page sections to mirror provided layout using Tailwind + DaisyUI
- Populate copy consistent with dossier (live sports, quiz night, garden, seasonal events)
- Use semantic HTML and accessible patterns (headings, lists, aria labels)
