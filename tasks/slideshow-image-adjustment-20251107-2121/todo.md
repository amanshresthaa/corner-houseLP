# Implementation Checklist

## Prep
- [x] Inspect `table food.png` and finalize descriptive filename + target directories (`Everythingyouneed/Slideshowimage` and `public/images/slideshow`).
- [x] Outline slide copy (eyebrow/headline/body/badges/CTAs) that matches the new visual.

## Execution
- [x] Move the renamed asset into `Everythingyouneed/Slideshowimage/` and copy it into `public/images/slideshow/`; remove the stray root file.
- [x] Add a logical image key + alt entry in `src/lib/images.ts`.
- [x] Append the new slide object to `config/content.json` with `required: true`.
- [x] Update `docs/IMAGES_README.md` (and any other asset docs if needed) to mention the expanded curated set.
- [x] Refresh the slide copy to call out momo, samosa, onion bhaji, and crispy squid per the latest request.

## Validation
- [x] (Optional) Run `npm run lint` or `npm run test --component` if necessary to ensure JSON syntax is valid.
- [x] Perform manual UI QA (Chrome DevTools) per verification plan once the slide appears locally.

## Notes / Deviations
- `npm run lint` currently fails due to long-standing `react/no-unescaped-entities` and hook warnings in other files (see latest run); out of scope for this task.
