'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = 'theme-preference';

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
    const [mounted, setMounted] = useState(false);

    // Get system preference
    const getSystemTheme = useCallback((): ResolvedTheme => {
        if (typeof window === 'undefined') return 'light';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }, []);

    // Resolve the actual theme
    const resolveTheme = useCallback((t: Theme): ResolvedTheme => {
        return t === 'system' ? getSystemTheme() : t;
    }, [getSystemTheme]);

    // Apply theme to document
    const applyTheme = useCallback((resolved: ResolvedTheme) => {
        if (typeof document === 'undefined') return;

        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolved);
        root.style.colorScheme = resolved;
    }, []);

    // Set theme with persistence
    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);

        try {
            localStorage.setItem(storageKey, newTheme);
        } catch {
            // localStorage not available
        }
    }, [storageKey]);

    // Toggle between light/dark
    const toggleTheme = useCallback(() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
    }, [resolvedTheme, setTheme]);

    // Initialize on mount
    useEffect(() => {
        setMounted(true);

        try {
            const stored = localStorage.getItem(storageKey) as Theme | null;
            if (stored && ['light', 'dark', 'system'].includes(stored)) {
                setThemeState(stored);
            }
        } catch {
            // localStorage not available
        }
    }, [storageKey]);

    // Update resolved theme when theme or system preference changes
    useEffect(() => {
        const resolved = resolveTheme(theme);
        setResolvedTheme(resolved);
        applyTheme(resolved);

        // Listen for system preference changes
        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => {
                const newResolved = getSystemTheme();
                setResolvedTheme(newResolved);
                applyTheme(newResolved);
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme, resolveTheme, applyTheme, getSystemTheme]);

    // Prevent flash by not rendering until mounted
    // The CSS will handle the initial state via prefers-color-scheme
    const value: ThemeContextType = {
        theme,
        resolvedTheme: mounted ? resolvedTheme : 'light',
        setTheme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value= { value } >
        { children }
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

/**
 * Script to inject into <head> to prevent FOUC (flash of unstyled content)
 * Use in your layout: <script dangerouslySetInnerHTML={{ __html: themeScript }} />
 */
export const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('${STORAGE_KEY}');
      var theme = stored || 'system';
      var resolved = theme;
      if (theme === 'system') {
        resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.classList.add(resolved);
      document.documentElement.style.colorScheme = resolved;
    } catch (e) {}
  })();
`;
