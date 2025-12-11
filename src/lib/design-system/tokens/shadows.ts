/**
 * Shadow Tokens - SSR-safe, pure data
 */

import { overlays } from './colors';

export const shadows = {
    none: 'none',
    subtle: `0 1px 2px 0 ${overlays[10]}`,
    default: `0 1px 3px 0 ${overlays[20]}, 0 1px 2px -1px ${overlays[20]}`,
    medium: `0 4px 6px -1px ${overlays[20]}, 0 2px 4px -2px ${overlays[20]}`,
    large: `0 10px 15px -3px ${overlays[20]}, 0 4px 6px -4px ${overlays[20]}`,
    xl: `0 20px 25px -5px ${overlays[20]}, 0 8px 10px -6px ${overlays[20]}`,
    '2xl': `0 25px 50px -12px ${overlays[40]}`,
    inner: `inset 0 2px 4px 0 ${overlays[10]}`,
} as const;

export const shadowsDark = {
    none: 'none',
    subtle: `0 1px 2px 0 ${overlays[40]}`,
    default: `0 1px 3px 0 ${overlays[40]}, 0 1px 2px -1px ${overlays[40]}`,
    medium: `0 4px 6px -1px ${overlays[60]}, 0 2px 4px -2px ${overlays[60]}`,
    large: `0 10px 15px -3px ${overlays[60]}, 0 4px 6px -4px ${overlays[60]}`,
    xl: `0 20px 25px -5px ${overlays[60]}, 0 8px 10px -6px ${overlays[60]}`,
    '2xl': `0 25px 50px -12px rgb(0 0 0 / 0.5)`,
    inner: `inset 0 2px 4px 0 ${overlays[40]}`,
} as const;

/** Branded shadows with color tints */
export const brandedShadows = {
    brand: '0 8px 22px 0 rgb(27 67 50 / 0.32)',    // forest tint
    accent: '0 8px 22px 0 rgb(226 189 142 / 0.32)', // sand tint
    error: '0 8px 22px 0 rgb(184 92 62 / 0.32)',    // clay tint
} as const;

export type ShadowKey = keyof typeof shadows;
