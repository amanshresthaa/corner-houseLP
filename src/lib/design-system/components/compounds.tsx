'use client';

import React, { memo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '../utils';
import { useModalBehavior, useStableId } from '../hooks';
import { forest, neutral } from '../tokens/colors';
import { variants as motionVariants } from '../tokens/motion';

// ═══════════════════════════════════════════════════════════════════════════════
// CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export type CardVariant = 'light' | 'dark' | 'glass';

export interface CardProps {
    children: React.ReactNode;
    variant?: CardVariant;
    hover?: boolean;
    className?: string;
    onClick?: () => void;
    as?: 'div' | 'article' | 'section';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const cardVariants: Record<CardVariant, string> = {
    light: `bg-white border-[var(--color-border-subtle,${neutral[200]})] shadow-[0_1px_3px_0_rgb(8_21_36/0.2)]`,
    dark: 'bg-white/5 border-white/15 backdrop-blur',
    glass: `bg-white/95 border-[var(--color-border-subtle,${neutral[200]})] backdrop-blur shadow-2xl`,
};

const cardPadding: Record<'none' | 'sm' | 'md' | 'lg', string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

export const Card = memo<CardProps>(({
    children,
    variant = 'light',
    hover = false,
    className,
    onClick,
    as: Component = 'div',
    padding = 'none',
}) => {
    const prefersReduced = useReducedMotion();
    const isClickable = Boolean(onClick);

    return (
        <motion.div
            // @ts-expect-error - motion.div can render as other elements
            as={Component}
            className={cn(
                'rounded-3xl border transition-all duration-300',
                cardVariants[variant],
                cardPadding[padding],
                (hover || isClickable) && 'hover:border-[var(--color-accent)]/30 hover:shadow-lg',
                isClickable && 'cursor-pointer',
                className
            )}
            whileHover={(hover || isClickable) && !prefersReduced ? { y: -2 } : undefined}
            onClick={onClick}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={isClickable ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            } : undefined}
        >
            {children}
        </motion.div>
    );
});

Card.displayName = 'Card';

// ═══════════════════════════════════════════════════════════════════════════════
// MODAL COMPONENT (with focus trap and escape key)
// ═══════════════════════════════════════════════════════════════════════════════

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    size?: ModalSize;
    /** Whether clicking backdrop closes modal */
    closeOnBackdrop?: boolean;
    /** Whether pressing Escape closes modal */
    closeOnEscape?: boolean;
    /** Hide the close button */
    hideCloseButton?: boolean;
}

const modalSizes: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-3xl',
    full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
};

export const Modal = memo<ModalProps>(({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'md',
    closeOnBackdrop = true,
    closeOnEscape = true,
    hideCloseButton = false,
}) => {
    const prefersReduced = useReducedMotion();
    const modalRef = useRef<HTMLDivElement>(null);
    const titleId = useStableId(title ? undefined : 'modal-title');
    const descId = useStableId(description ? undefined : 'modal-desc');

    // Use the accessibility hook for focus trap, escape key, and scroll lock
    useModalBehavior(
        modalRef,
        isOpen,
        closeOnEscape ? onClose : () => { }
    );

    const handleBackdropClick = useCallback(() => {
        if (closeOnBackdrop) onClose();
    }, [closeOnBackdrop, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: prefersReduced ? 0 : 0.2 }}
                        className="absolute inset-0 bg-black/50"
                        onClick={handleBackdropClick}
                        aria-hidden="true"
                    />

                    {/* Modal Panel */}
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? titleId : undefined}
                        aria-describedby={description ? descId : undefined}
                        tabIndex={-1}
                        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
                        animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                        exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: prefersReduced ? 0 : 0.2, ease: [0.2, 0, 0, 1] }}
                        className={cn(
                            'relative w-full bg-white rounded-xl shadow-xl p-6 md:p-8 focus:outline-none',
                            modalSizes[size]
                        )}
                    >
                        {/* Header */}
                        {(title || !hideCloseButton) && (
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    {title && (
                                        <h2
                                            id={titleId}
                                            className="text-lg font-semibold text-[var(--color-text-primary)]"
                                        >
                                            {title}
                                        </h2>
                                    )}
                                    {description && (
                                        <p
                                            id={descId}
                                            className="mt-1 text-sm text-[var(--color-text-secondary)]"
                                        >
                                            {description}
                                        </p>
                                    )}
                                </div>

                                {!hideCloseButton && (
                                    <button
                                        onClick={onClose}
                                        className={cn(
                                            'p-2 rounded-lg transition-colors',
                                            'hover:bg-[var(--color-surface-muted)]',
                                            'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
                                        )}
                                        aria-label="Close modal"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
});

Modal.displayName = 'Modal';

// ═══════════════════════════════════════════════════════════════════════════════
// TOAST COMPONENT (with stable callback ref)
// ═══════════════════════════════════════════════════════════════════════════════

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProps {
    message: string;
    type?: ToastType;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
    position?: ToastPosition;
    /** Optional action button */
    action?: {
        label: string;
        onClick: () => void;
    };
}

const toastTypes: Record<ToastType, string> = {
    success: 'bg-[var(--color-success,#52A67D)] text-white',
    error: 'bg-[var(--color-error,#B85C3E)] text-white',
    warning: 'bg-[var(--color-warning,#D4A574)] text-black',
    info: 'bg-[var(--color-info,#2C5F8D)] text-white',
};

const toastPositions: Record<ToastPosition, string> = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

const toastIcons: Record<ToastType, React.ReactNode> = {
    success: (
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    ),
    error: (
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
    ),
    warning: (
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
    ),
    info: (
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
    ),
};

export const Toast = memo<ToastProps>(({
    message,
    type = 'info',
    isVisible,
    onClose,
    duration = 5000,
    position = 'top-right',
    action,
}) => {
    const prefersReduced = useReducedMotion();
    const onCloseRef = React.useRef(onClose);

    // Keep ref updated to avoid stale closure issues
    React.useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    React.useEffect(() => {
        if (!isVisible || duration <= 0) return;

        const timer = setTimeout(() => {
            onCloseRef.current();
        }, duration);

        return () => clearTimeout(timer);
    }, [isVisible, duration]);

    const isTop = position.startsWith('top');

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    role="alert"
                    aria-live="polite"
                    initial={prefersReduced
                        ? { opacity: 0 }
                        : { opacity: 0, y: isTop ? -20 : 20, scale: 0.95 }
                    }
                    animate={prefersReduced
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0, scale: 1 }
                    }
                    exit={prefersReduced
                        ? { opacity: 0 }
                        : { opacity: 0, y: isTop ? -20 : 20, scale: 0.95 }
                    }
                    transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.2, 0, 0, 1] }}
                    className={cn(
                        'fixed z-[70] px-4 py-3 rounded-lg shadow-lg',
                        'flex items-center gap-3 max-w-md',
                        toastTypes[type],
                        toastPositions[position]
                    )}
                >
                    {toastIcons[type]}

                    <span className="flex-1 text-sm font-medium">{message}</span>

                    {action && (
                        <button
                            onClick={action.onClick}
                            className="text-sm font-semibold underline hover:no-underline"
                        >
                            {action.label}
                        </button>
                    )}

                    <button
                        onClick={onClose}
                        className="p-1 hover:opacity-70 transition-opacity shrink-0"
                        aria-label="Dismiss notification"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

Toast.displayName = 'Toast';

// ═══════════════════════════════════════════════════════════════════════════════
// SEARCH BAR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onClear?: () => void;
    onSubmit?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    autoFocus?: boolean;
}

export const SearchBar = memo<SearchBarProps>(({
    value,
    onChange,
    onClear,
    onSubmit,
    placeholder = 'Search...',
    className,
    disabled,
    autoFocus,
}) => {
    const inputId = useStableId();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(value);
    };

    const handleClear = () => {
        onChange('');
        onClear?.();
    };

    return (
        <form onSubmit={handleSubmit} className={cn('relative', className)} role="search">
            <label htmlFor={inputId} className="sr-only">{placeholder}</label>

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                    className={`h-5 w-5 text-[var(--color-text-tertiary,${neutral[500]})]`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                >
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>

            <input
                id={inputId}
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                className={cn(
                    'block w-full pl-10 pr-10 py-3',
                    `border border-[var(--color-border-default,${neutral[300]})] rounded-lg`,
                    'text-sm transition-all duration-200',
                    'focus:outline-none focus:ring-2',
                    `focus:ring-[var(--color-primary,${forest[500]})]`,
                    `focus:border-[var(--color-primary,${forest[500]})]`,
                    disabled && 'opacity-50 cursor-not-allowed'
                )}
            />

            {value && (
                <button
                    type="button"
                    onClick={handleClear}
                    className={cn(
                        'absolute inset-y-0 right-0 pr-3 flex items-center',
                        `text-[var(--color-text-tertiary,${neutral[500]})]`,
                        `hover:text-[var(--color-text-primary,${neutral[800]})]`,
                        'transition-colors'
                    )}
                    aria-label="Clear search"
                >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            )}
        </form>
    );
});

SearchBar.displayName = 'SearchBar';
