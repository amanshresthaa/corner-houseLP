/**
 * Corner House Design System
 * 
 * A comprehensive, accessible, and production-ready design system.
 * 
 * Architecture:
 * - tokens/     - SSR-safe pure data (colors, typography, spacing, motion)
 * - components/ - React components (atoms & compounds)
 * - hooks/      - Custom React hooks (theme, accessibility)
 * - styles/     - Global styles and StyleGuide
 * - utils/      - Utility functions
 * 
 * @example
 * ```tsx
 * import { 
 *   Button, 
 *   Input, 
 *   Modal,
 *   colors, 
 *   typography,
 *   ThemeProvider,
 *   GlobalStyles,
 * } from '@/lib/design-system';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <GlobalStyles />
 *       <Button variant="primary">Click me</Button>
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */

// ═══════════════════════════════════════════════════════════════════════════════
// TOKENS (SSR-safe, can be used anywhere)
// ═══════════════════════════════════════════════════════════════════════════════

export {
    // Colors
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
    type ColorScale,
    type SemanticColorToken,

    // Typography
    typography,
    fonts,
    fontWeights,
    typeScale,
    type TypeScaleKey,
    type FontFamily,

    // Spacing & Layout
    spacing,
    layout,
    borderRadius,
    zIndex,
    breakpoints,
    type SpacingKey,
    type BreakpointKey,
    type ZIndexKey,

    // Motion
    motion,
    duration,
    easing,
    springConfigs,
    transforms,
    variants,
    buttonMotion,
    type DurationKey,
    type EasingKey,

    // Shadows
    shadows,
    shadowsDark,
    brandedShadows,
    type ShadowKey,
} from './tokens';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS (Client-side React components)
// ═══════════════════════════════════════════════════════════════════════════════

export {
    // Atomic components
    Button,
    Input,
    Badge,
    Spinner,
    Skeleton,

    // Compound components
    Card,
    Modal,
    Toast,
    SearchBar,

    // Types
    type ButtonProps,
    type ButtonVariant,
    type ButtonSize,
    type InputProps,
    type BadgeProps,
    type BadgeVariant,
    type BadgeSize,
    type SpinnerProps,
    type SkeletonProps,
    type CardProps,
    type CardVariant,
    type ModalProps,
    type ModalSize,
    type ToastProps,
    type ToastType,
    type ToastPosition,
    type SearchBarProps,
} from './components';

// ═══════════════════════════════════════════════════════════════════════════════
// HOOKS (Client-side React hooks)
// ═══════════════════════════════════════════════════════════════════════════════

export {
    // Theme
    ThemeProvider,
    useTheme,
    themeScript,

    // Accessibility
    useFocusTrap,
    useEscapeKey,
    useScrollLock,
    useModalBehavior,
    useClickOutside,
    useStableId,
} from './hooks';

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES (Global CSS injection)
// ═══════════════════════════════════════════════════════════════════════════════

export { GlobalStyles } from './styles';

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

export {
    cn,
    pxToRem,
    objectKeys,
    isBrowser,
    prefersReducedMotion,
    prefersDarkMode,
} from './utils';

// ═══════════════════════════════════════════════════════════════════════════════
// STYLE GUIDE (Documentation component)
// ═══════════════════════════════════════════════════════════════════════════════

export { StyleGuide } from './styles/StyleGuide';
