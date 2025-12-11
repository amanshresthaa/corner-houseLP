/**
 * Utility functions for the design system
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind CSS conflict resolution
 * Combines clsx for conditional classes with tailwind-merge for deduping
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

/**
 * Create a CSS variable reference with fallback
 */
export function cssVar(name: string, fallback?: string): string {
    return fallback ? `var(--${name}, ${fallback})` : `var(--${name})`;
}

/**
 * Convert a pixel value to rem
 */
export function pxToRem(px: number, base: number = 16): string {
    return `${px / base}rem`;
}

/**
 * Type-safe object keys
 */
export function objectKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
}

/**
 * Check if we're in a browser environment
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
    if (!isBrowser) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers dark color scheme
 */
export function prefersDarkMode(): boolean {
    if (!isBrowser) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
