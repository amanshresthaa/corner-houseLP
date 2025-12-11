/**
 * Design System Tokens - Public API
 * 
 * All tokens are SSR-safe pure data exports.
 * Import these anywhere without worrying about client/server boundaries.
 */

// Colors
export {
    colors,
    forest,
    sand,
    ocean,
    mint,
    clay,
    neutral,
    semanticColors,
    overlays,
    gradients,
    cssVar,
    colorScaleToCssVars,
} from './colors';
export type { ColorScale, SemanticColorToken } from './colors';

// Typography
export { typography, fonts, fontWeights, typeScale } from './typography';
export type { TypeScaleKey, FontFamily } from './typography';

// Spacing & Layout
export { spacing, layout, borderRadius, zIndex, breakpoints } from './spacing';
export type { SpacingKey, BreakpointKey, ZIndexKey } from './spacing';

// Motion
export { motion, duration, easing, springConfigs, transforms, variants, buttonMotion } from './motion';
export type { DurationKey, EasingKey } from './motion';

// Shadows
export { shadows, shadowsDark, brandedShadows } from './shadows';
export type { ShadowKey } from './shadows';

/**
 * Complete design tokens object for convenience
 */
export { colors as colorTokens } from './colors';
export { typography as typographyTokens } from './typography';
export { motion as motionTokens } from './motion';
