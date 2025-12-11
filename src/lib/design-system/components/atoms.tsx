'use client';

import React, { forwardRef, memo, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../utils';
import { forest, sand, clay, neutral } from '../tokens/colors';
import { buttonMotion } from '../tokens/motion';

// ═══════════════════════════════════════════════════════════════════════════════
// BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Omit conflicting HTML event handlers from the base button props
type OmittedButtonProps =
    | 'onAnimationStart'
    | 'onAnimationEnd'
    | 'onAnimationIteration'
    | 'onDrag'
    | 'onDragEnd'
    | 'onDragStart';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, OmittedButtonProps> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    /** Keep text visible during loading */
    loadingText?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: `bg-[var(--color-primary,${forest[500]})] hover:brightness-110 text-white focus:ring-[var(--color-primary,${forest[500]})] shadow-md hover:shadow-lg`,
    secondary: `bg-[var(--color-secondary,${sand[500]})] hover:brightness-110 text-white focus:ring-[var(--color-secondary,${sand[500]})]`,
    outline: `border-2 border-[var(--color-primary,${forest[500]})] text-[var(--color-primary,${forest[500]})] hover:bg-[var(--color-primary,${forest[500]})] hover:text-white focus:ring-[var(--color-primary,${forest[500]})] bg-transparent`,
    ghost: `text-[var(--color-primary,${forest[500]})] hover:bg-[var(--color-primary,${forest[500]})]/10 focus:ring-[var(--color-primary,${forest[500]})] bg-transparent`,
    destructive: `bg-[var(--color-error,${clay[500]})] hover:brightness-110 text-white focus:ring-[var(--color-error,${clay[500]})]`,
    link: `text-[var(--color-primary,${forest[500]})] underline hover:no-underline p-0 focus:ring-0 bg-transparent`,
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm min-h-[36px] gap-1.5',
    md: 'px-6 py-3 text-base min-h-[44px] gap-2',
    lg: 'px-8 py-4 text-lg min-h-[56px] gap-2.5',
};

const iconSizes: Record<ButtonSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
};

export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    loadingText,
    className,
    children,
    disabled,
    type = 'button',
    ...props
}, ref) => {
    const prefersReduced = useReducedMotion();
    const isDisabled = disabled || isLoading;

    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    return (
        <motion.button
            ref={ref}
            type={type}
            className={cn(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                fullWidth && 'w-full',
                className
            )}
            disabled={isDisabled}
            whileHover={!isDisabled && !prefersReduced ? buttonMotion.whileHover : undefined}
            whileTap={!isDisabled && !prefersReduced ? buttonMotion.whileTap : undefined}
            aria-busy={isLoading}
            {...props}
        >
            {isLoading && (
                <span
                    className={cn('border-2 border-current border-t-transparent rounded-full animate-spin', iconSizes[size])}
                    aria-hidden="true"
                />
            )}
            {!isLoading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            <span className={isLoading && !loadingText ? 'sr-only' : undefined}>
                {isLoading && loadingText ? loadingText : children}
            </span>
            {!isLoading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </motion.button>
    );
}));

Button.displayName = 'Button';

// ═══════════════════════════════════════════════════════════════════════════════
// INPUT COMPONENT (with React.useId fix)
// ═══════════════════════════════════════════════════════════════════════════════

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    hint?: string;
    size?: 'sm' | 'md' | 'lg';
    /** Left addon/icon */
    leftAddon?: React.ReactNode;
    /** Right addon/icon */
    rightAddon?: React.ReactNode;
}

const inputSizes: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'py-2 text-sm',
    md: 'py-3 text-base',
    lg: 'py-4 text-lg',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    hint,
    size = 'md',
    leftAddon,
    rightAddon,
    className,
    id: providedId,
    disabled,
    ...props
}, ref) => {
    // Use React.useId() for stable IDs (React 18+)
    const generatedId = useId();
    const inputId = providedId || generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const hasError = Boolean(error);
    const describedBy = [
        hasError ? errorId : null,
        hint && !hasError ? hintId : null,
    ].filter(Boolean).join(' ') || undefined;

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label
                    htmlFor={inputId}
                    className={cn(
                        'text-sm font-medium',
                        `text-[var(--color-text-primary,${neutral[800]})]`,
                        disabled && 'opacity-50'
                    )}
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {leftAddon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                        {leftAddon}
                    </div>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    disabled={disabled}
                    className={cn(
                        'w-full px-3 border rounded-lg transition-all duration-200',
                        'focus:outline-none focus:ring-2',
                        `focus:ring-[var(--color-primary,${forest[500]})]`,
                        `focus:border-[var(--color-primary,${forest[500]})]`,
                        inputSizes[size],
                        hasError
                            ? `border-[var(--color-error,${clay[500]})] focus:ring-[var(--color-error,${clay[500]})]`
                            : `border-[var(--color-border-default,${neutral[300]})]`,
                        leftAddon && 'pl-10',
                        rightAddon && 'pr-10',
                        disabled && 'opacity-50 cursor-not-allowed bg-[var(--color-surface-muted)]',
                        className
                    )}
                    aria-invalid={hasError}
                    aria-describedby={describedBy}
                    {...props}
                />

                {rightAddon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                        {rightAddon}
                    </div>
                )}
            </div>

            {hasError && (
                <p
                    id={errorId}
                    className={`text-sm text-[var(--color-error,${clay[500]})]`}
                    role="alert"
                >
                    {error}
                </p>
            )}

            {hint && !hasError && (
                <p
                    id={hintId}
                    className={`text-sm text-[var(--color-text-tertiary,${neutral[500]})]`}
                >
                    {hint}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

// ═══════════════════════════════════════════════════════════════════════════════
// BADGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    className?: string;
    /** Optional icon */
    icon?: React.ReactNode;
}

const badgeVariants: Record<BadgeVariant, string> = {
    default: `bg-[var(--color-neutral-100,${neutral[100]})] text-[var(--color-text-primary,${neutral[800]})]`,
    primary: `bg-[var(--color-primary,${forest[500]})] text-white`,
    success: `bg-[var(--color-success,#52A67D)] text-white`,
    warning: `bg-[var(--color-warning,${sand[500]})] text-black`,
    error: `bg-[var(--color-error,${clay[500]})] text-white`,
    info: `bg-[var(--color-info,#2C5F8D)] text-white`,
    outline: `bg-transparent border border-[var(--color-border-default,${neutral[300]})] text-[var(--color-text-primary,${neutral[800]})]`,
};

const badgeSizes: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
};

export const Badge = memo<BadgeProps>(({
    children,
    variant = 'default',
    size = 'md',
    icon,
    className,
}) => (
    <span className={cn(
        'inline-flex items-center font-medium rounded-full',
        badgeVariants[variant],
        badgeSizes[size],
        className
    )}>
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
    </span>
));

Badge.displayName = 'Badge';

// ═══════════════════════════════════════════════════════════════════════════════
// SPINNER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    label?: string;
}

const spinnerSizes: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
};

export const Spinner = memo<SpinnerProps>(({
    size = 'md',
    className,
    label = 'Loading',
}) => (
    <div
        className={cn(
            'border-2 border-current border-t-transparent rounded-full animate-spin',
            spinnerSizes[size],
            className
        )}
        role="status"
        aria-label={label}
    >
        <span className="sr-only">{label}</span>
    </div>
));

Spinner.displayName = 'Spinner';

// ═══════════════════════════════════════════════════════════════════════════════
// SKELETON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    variant?: 'text' | 'circular' | 'rectangular';
    className?: string;
    /** Number of lines for text variant */
    lines?: number;
}

const skeletonVariants: Record<'text' | 'circular' | 'rectangular', string> = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
};

export const Skeleton = memo<SkeletonProps>(({
    width,
    height,
    variant = 'rectangular',
    lines = 1,
    className,
}) => {
    if (variant === 'text' && lines > 1) {
        return (
            <div className="space-y-2" aria-hidden="true">
                {Array.from({ length: lines }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            `bg-[var(--color-surface-muted,${neutral[100]})] animate-pulse`,
                            skeletonVariants.text,
                            className
                        )}
                        style={{
                            width: i === lines - 1 ? '75%' : width || '100%',
                            height: height || '1em'
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={cn(
                `bg-[var(--color-surface-muted,${neutral[100]})] animate-pulse`,
                skeletonVariants[variant],
                className
            )}
            style={{
                width,
                height: height || (variant === 'text' ? '1em' : undefined)
            }}
            aria-hidden="true"
        />
    );
});

Skeleton.displayName = 'Skeleton';
