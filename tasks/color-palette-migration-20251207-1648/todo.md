# Implementation Checklist

## Palette source
- [x] Replace palette scales in `theme/colors.js` with forest/sand/ocean/mint/clay/warm neutral
- [x] Update semantic mappings (light/dark) and aliases for legacy keys
- [x] Update colorFamilies list for generator

## Build artifacts
- [x] Regenerate `styles/generated/colors.css`
- [x] Update `tailwind.config.js` to expose new keys and map legacy keys
- [x] Update global semantic vars and theme-color default

## Validation
- [x] Diff review for unintended removals
- [ ] Note follow-up for component-level class renames if needed
