/**
 * Typography Tokens - SSR-safe, pure data
 */

export const fonts = {
    display: "var(--font-playfair, 'Playfair Display', serif)",
    body: "var(--font-inter, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
} as const;

export const fontWeights = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
} as const;

/** Fluid type scale using CSS clamp for responsive sizing */
export const typeScale = {
    hero: {
        size: 'clamp(2.25rem, 8vw, 6rem)',
        lineHeight: '1.05',
        weight: fontWeights.extrabold,
        font: 'display',
    },
    h1: {
        size: 'clamp(1.75rem, 4vw, 3.5rem)',
        lineHeight: '1.15',
        weight: fontWeights.bold,
        font: 'display',
    },
    h2: {
        size: 'clamp(1.5rem, 3.5vw, 2.75rem)',
        lineHeight: '1.2',
        weight: fontWeights.bold,
        font: 'display',
    },
    h3: {
        size: 'clamp(1.25rem, 2.8vw, 2rem)',
        lineHeight: '1.25',
        weight: fontWeights.semibold,
        font: 'display',
    },
    h4: {
        size: 'clamp(1.125rem, 2.2vw, 1.5rem)',
        lineHeight: '1.3',
        weight: fontWeights.semibold,
        font: 'display',
    },
    h5: {
        size: 'clamp(1rem, 1.8vw, 1.25rem)',
        lineHeight: '1.35',
        weight: fontWeights.medium,
        font: 'display',
    },
    h6: {
        size: 'clamp(0.95rem, 1.4vw, 1.125rem)',
        lineHeight: '1.4',
        weight: fontWeights.medium,
        font: 'display',
    },
    lead: {
        size: 'clamp(1.05rem, 2.4vw, 1.45rem)',
        lineHeight: '1.6',
        weight: fontWeights.regular,
        font: 'body',
    },
    body: {
        size: 'clamp(0.9375rem, 0.85rem + 0.4vw, 1.0625rem)',
        lineHeight: '1.6',
        weight: fontWeights.regular,
        font: 'body',
    },
    meta: {
        size: 'clamp(0.75rem, 1.2vw, 0.875rem)',
        lineHeight: '1.4',
        weight: fontWeights.regular,
        font: 'body',
    },
    eyebrow: {
        size: 'clamp(0.75rem, 1.6vw, 0.9375rem)',
        lineHeight: '1.2',
        weight: fontWeights.semibold,
        letterSpacing: '0.28em',
        textTransform: 'uppercase' as const,
        font: 'body',
    },
} as const;

export const typography = {
    fonts,
    weights: fontWeights,
    scale: typeScale,
} as const;

export type TypeScaleKey = keyof typeof typeScale;
export type FontFamily = keyof typeof fonts;
