/**
 * @deprecated Use '@/lib/design-system' instead.
 * 
 * This file is kept for backward compatibility only.
 * All design system exports have been moved to a properly structured module.
 * 
 * Migration:
 * ```tsx
 * // Before
 * import { Button, colors } from '@/lib/DesignSystem';
 * 
 * // After
 * import { Button, colors } from '@/lib/design-system';
 * ```
 */

// Re-export everything from the new design system
export * from './design-system';
