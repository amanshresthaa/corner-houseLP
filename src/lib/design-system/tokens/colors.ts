/**
 * Color Tokens - SSR-safe, pure data
 * 
 * Core color palette - Design-first system with WCAG-focused, perceptually uniform scales
 * Forest (brand), Sand (accent/CTA), Ocean (info), Mint (success), Clay (error), Warm Neutral
 */
/* eslint-disable no-restricted-syntax */

// ═══════════════════════════════════════════════════════════════════════════════
// COLOR SCALES
// ═══════════════════════════════════════════════════════════════════════════════

/** Primary Brand - Forest Green */
export const forest = {
    50: '#F0F7F4',
    100: '#E0EFE9',
    200: '#C2DFD3',
    300: '#9DD4BC',
    400: '#70BFA0',
    500: '#1B4332',
    600: '#143528',
    700: '#0F281F',
    800: '#0B1C16',
    900: '#08140F',
    950: '#051208',
} as const;

/** Accent/CTA/Warning - Sand */
export const sand = {
    50: '#FDF9F3',
    100: '#F9F2E6',
    200: '#F7EBDA',
    300: '#EDD5B4',
    400: '#E2BD8E',
    500: '#D4A574',
    600: '#B8884F',
    700: '#8E6839',
    800: '#6B4E2A',
    900: '#5C4426',
    950: '#3E2A18',
} as const;

/** Info/Links/Trust - Ocean Blue */
export const ocean = {
    50: '#F0F6FA',
    100: '#E1EDF5',
    200: '#D6E6F2',
    300: '#B8D4E8',
    400: '#9EC3DE',
    500: '#2C5F8D',
    600: '#1F4768',
    700: '#1A3A55',
    800: '#163044',
    900: '#112534',
    950: '#0A1821',
} as const;

/** Success - Mint Green */
export const mint = {
    50: '#F1F9F5',
    100: '#E2F4EB',
    200: '#D4EFE0',
    300: '#B7E4CD',
    400: '#A1D9B9',
    500: '#52A67D',
    600: '#3B8860',
    700: '#2F6B4C',
    800: '#2A6244',
    900: '#1C422D',
    950: '#0D2318',
} as const;

/** Error/Destructive - Clay */
export const clay = {
    50: '#FBF4F2',
    100: '#F7E9E5',
    200: '#F4DDD4',
    300: '#E8BFB0',
    400: '#E5B5A3',
    500: '#B85C3E',
    600: '#93432B',
    700: '#7A3622',
    800: '#6D2F1E',
    900: '#472015',
    950: '#2F1510',
} as const;

/** Warm Neutral - Text/Surfaces */
export const neutral = {
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    400: '#A8A29E',
    500: '#6B7280',
    600: '#57534E',
    700: '#44403C',
    800: '#292524',
    900: '#1C1917',
    950: '#18181B',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CONSOLIDATED COLORS OBJECT
// ═══════════════════════════════════════════════════════════════════════════════

export const colors = {
    forest,
    sand,
    ocean,
    mint,
    clay,
    neutral,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANTIC COLORS (with CSS variable references AND fallbacks)
// ═══════════════════════════════════════════════════════════════════════════════

export const semanticColors = {
    light: {
        primary: { var: 'var(--color-primary)', fallback: forest[500] },
        secondary: { var: 'var(--color-secondary)', fallback: sand[500] },
        accent: { var: 'var(--color-accent)', fallback: sand[500] },
        success: { var: 'var(--color-success)', fallback: mint[500] },
        warning: { var: 'var(--color-warning)', fallback: sand[500] },
        info: { var: 'var(--color-info)', fallback: ocean[500] },
        error: { var: 'var(--color-error)', fallback: clay[500] },
        surface: {
            base: { var: 'var(--color-surface-base)', fallback: neutral[50] },
            subtle: { var: 'var(--color-surface-subtle)', fallback: '#FFFFFF' },
            muted: { var: 'var(--color-surface-muted)', fallback: neutral[100] },
            emphasis: { var: 'var(--color-surface-emphasis)', fallback: neutral[200] },
        },
        text: {
            primary: { var: 'var(--color-text-primary)', fallback: neutral[800] },
            secondary: { var: 'var(--color-text-secondary)', fallback: neutral[600] },
            tertiary: { var: 'var(--color-text-tertiary)', fallback: neutral[500] },
        },
        border: {
            subtle: { var: 'var(--color-border-subtle)', fallback: neutral[200] },
            default: { var: 'var(--color-border-default)', fallback: neutral[300] },
            emphasis: { var: 'var(--color-border-emphasis)', fallback: neutral[400] },
        },
    },
    dark: {
        primary: { var: 'var(--color-primary)', fallback: forest[300] },
        secondary: { var: 'var(--color-secondary)', fallback: sand[300] },
        accent: { var: 'var(--color-accent)', fallback: sand[300] },
        success: { var: 'var(--color-success)', fallback: mint[300] },
        warning: { var: 'var(--color-warning)', fallback: sand[300] },
        info: { var: 'var(--color-info)', fallback: ocean[300] },
        error: { var: 'var(--color-error)', fallback: clay[300] },
        surface: {
            base: { var: 'var(--color-surface-base)', fallback: neutral[950] },
            subtle: { var: 'var(--color-surface-subtle)', fallback: neutral[900] },
            muted: { var: 'var(--color-surface-muted)', fallback: neutral[800] },
            emphasis: { var: 'var(--color-surface-emphasis)', fallback: neutral[700] },
        },
        text: {
            primary: { var: 'var(--color-text-primary)', fallback: neutral[50] },
            secondary: { var: 'var(--color-text-secondary)', fallback: neutral[300] },
            tertiary: { var: 'var(--color-text-tertiary)', fallback: neutral[400] },
        },
        border: {
            subtle: { var: 'var(--color-border-subtle)', fallback: neutral[800] },
            default: { var: 'var(--color-border-default)', fallback: neutral[700] },
            emphasis: { var: 'var(--color-border-emphasis)', fallback: neutral[600] },
        },
    },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// OVERLAYS & GRADIENTS
// ═══════════════════════════════════════════════════════════════════════════════

export const overlays = {
    10: 'rgb(8 21 36 / 0.10)',
    20: 'rgb(8 21 36 / 0.20)',
    40: 'rgb(8 21 36 / 0.40)',
    60: 'rgb(8 21 36 / 0.60)',
} as const;

export const gradients = {
    royalMidnight: `linear-gradient(135deg, ${forest[500]}, ${sand[400]})`,
    twilight: `linear-gradient(135deg, ${forest[600]}, ${clay[500]})`,
    heroPattern: `linear-gradient(135deg, ${forest[500]}B3, ${sand[400]}B3)`, // B3 = 70% opacity
    skeleton: `linear-gradient(90deg, ${neutral[100]} 0%, ${neutral[200]} 50%, ${neutral[100]} 100%)`,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/** Get CSS variable with fallback */
export function cssVar(varName: string, fallback: string): string {
    return `var(${varName}, ${fallback})`;
}

/** Generate CSS variable declarations for a color scale */
export function colorScaleToCssVars(name: string, scale: Record<string | number, string>): string {
    return Object.entries(scale)
        .map(([shade, hex]) => `--color-${name}-${shade}: ${hex};`)
        .join('\n  ');
}

export type ColorScale = typeof forest;
export type SemanticColorToken = { var: string; fallback: string };
