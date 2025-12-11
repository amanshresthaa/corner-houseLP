/**
 * Motion & Animation Tokens - SSR-safe, pure data
 */

export const duration = {
    instant: 0,
    fast: 0.15,
    base: 0.3,
    slow: 0.5,
    glacial: 0.8,
} as const;

export const easing = {
    linear: [0, 0, 1, 1] as [number, number, number, number],
    easeOut: [0.2, 0, 0, 1] as [number, number, number, number],
    easeIn: [0.4, 0, 1, 1] as [number, number, number, number],
    easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

export const springConfigs = {
    default: { type: 'spring' as const, stiffness: 280, damping: 30 },
    gentle: { type: 'spring' as const, stiffness: 120, damping: 14 },
    bouncy: { type: 'spring' as const, bounce: 0.3 },
    stiff: { type: 'spring' as const, stiffness: 400, damping: 30 },
} as const;

export const transforms = {
    scale: {
        grow: 1.05,
        shrink: 0.95,
        hidden: 0,
    },
    opacity: {
        visible: 1,
        hidden: 0,
        subtle: 0.6,
    },
} as const;

/** Animation variants for Framer Motion */
export const variants = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: duration.fast, ease: easing.easeOut } },
        exit: { opacity: 0, transition: { duration: duration.fast, ease: easing.easeIn } },
    },
    fadeUp: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: springConfigs.default },
        exit: { opacity: 0, y: 6, transition: { duration: duration.fast } },
    },
    fadeDown: {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: springConfigs.default },
        exit: { opacity: 0, y: -6, transition: { duration: duration.fast } },
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1, transition: { duration: duration.base, ease: easing.easeOut } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: duration.fast, ease: easing.easeIn } },
    },
    slideDown: {
        initial: { opacity: 0, y: -14 },
        animate: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easing.easeOut } },
        exit: { opacity: 0, y: -10, transition: { duration: duration.fast, ease: easing.easeIn } },
    },
} as const;

/** Button micro-interaction props */
export const buttonMotion = {
    whileHover: { y: -2, scale: 1.02, transition: { duration: 0.18 } },
    whileTap: { y: 0, scale: 0.98, transition: { duration: 0.18 } },
} as const;

export const motion = {
    duration,
    easing,
    springs: springConfigs,
    transforms,
    variants,
    button: buttonMotion,
} as const;

export type DurationKey = keyof typeof duration;
export type EasingKey = keyof typeof easing;
