'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';

/**
 * Hook to manage focus trap within a container
 * Essential for accessible modals and dialogs
 */
export function useFocusTrap(
    containerRef: RefObject<HTMLElement>,
    isActive: boolean = true
) {
    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        const container = containerRef.current;
        const focusableSelectors = [
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])',
        ].join(', ');

        const getFocusableElements = () =>
            Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors));

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            const focusable = getFocusableElements();
            if (focusable.length === 0) return;

            const firstElement = focusable[0];
            const lastElement = focusable[focusable.length - 1];

            // Shift+Tab from first element -> go to last
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
            // Tab from last element -> go to first
            else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        };

        // Store current focused element to restore later
        const previouslyFocused = document.activeElement as HTMLElement | null;

        // Focus the first focusable element or the container
        const focusable = getFocusableElements();
        if (focusable.length > 0) {
            focusable[0].focus();
        } else {
            container.focus();
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            // Restore focus to previously focused element
            previouslyFocused?.focus?.();
        };
    }, [containerRef, isActive]);
}

/**
 * Hook to handle escape key press
 */
export function useEscapeKey(handler: () => void, isActive: boolean = true) {
    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                handler();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handler, isActive]);
}

/**
 * Hook to lock body scroll (for modals/overlays)
 */
export function useScrollLock(isLocked: boolean = true) {
    useEffect(() => {
        if (!isLocked) return;

        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;

        // Calculate scrollbar width to prevent layout shift
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [isLocked]);
}

/**
 * Combined modal behavior hook
 */
export function useModalBehavior(
    containerRef: RefObject<HTMLElement>,
    isOpen: boolean,
    onClose: () => void
) {
    useFocusTrap(containerRef, isOpen);
    useEscapeKey(onClose, isOpen);
    useScrollLock(isOpen);
}

/**
 * Hook for click outside detection
 */
export function useClickOutside(
    ref: RefObject<HTMLElement>,
    handler: () => void,
    isActive: boolean = true
) {
    useEffect(() => {
        if (!isActive) return;

        const handleClick = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler();
            }
        };

        document.addEventListener('mousedown', handleClick);
        document.addEventListener('touchstart', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    }, [ref, handler, isActive]);
}

/**
 * Hook for generating stable IDs (React 18+)
 * Fallback for older React versions
 */
let idCounter = 0;
export function useStableId(providedId?: string): string {
    const [id] = useState(() => providedId || `ds-id-${++idCounter}`);
    return id;
}
