const { themes, base } = require('./theme/colors');
const LIGHT = themes.light.colors;

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/globals.css",
  ],
  theme: {
    // Custom container to align with requested breakpoint sizes
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1.25rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
      },
      screens: {
        sm: '576px',   // Small tablets portrait
        md: '768px',   // Tablets portrait, small laptops
        lg: '992px',   // Tablets landscape, desktop
        xl: '1200px',  // Desktop
        '2xl': '1400px',
      },
    },
    extend: {
      fontSize: {
        // Fluid, semantic tokens mapped to existing globals in app/globals.css
        'fluid-base': [
          'clamp(0.9375rem, 0.85rem + 0.4vw, 1.0625rem)',
          { lineHeight: 'var(--lh-body)' }
        ],
        'fluid-h1': [
          'clamp(1.75rem, 4vw, 3.5rem)',
          { lineHeight: '1.15' }
        ],
        'fluid-h2': [
          'clamp(1.5rem, 3.5vw, 2.75rem)',
          { lineHeight: '1.2' }
        ],
        'fluid-h3': [
          'clamp(1.25rem, 2.8vw, 2rem)',
          { lineHeight: '1.25' }
        ],
        'fluid-h4': [
          'clamp(1.125rem, 2.2vw, 1.5rem)',
          { lineHeight: '1.3' }
        ],
        'fluid-h5': [
          'clamp(1rem, 1.8vw, 1.25rem)',
          { lineHeight: '1.35' }
        ],
        'fluid-h6': [
          'clamp(0.95rem, 1.4vw, 1.125rem)',
          { lineHeight: '1.4' }
        ],
        'fluid-lead': [
          'clamp(1.05rem, 2.4vw, 1.45rem)',
          { lineHeight: '1.6' }
        ],
        'fluid-eyebrow': [
          'clamp(0.75rem, 1.6vw, 0.9375rem)',
          { letterSpacing: '0.28em' }
        ],
        'fluid-hero': [
          'clamp(2.25rem, 8vw, 6rem)',
          { lineHeight: '1.05' }
        ],
        'meta': [
          'clamp(0.75rem, 1.2vw, 0.875rem)',
          { lineHeight: '1.4' }
        ],
      },
      // Additional fine‑grained breakpoints (preserve Tailwind defaults)
      screens: {
        xxs: '320px',   // Smallest phones
        xs: '375px',    // iPhone SE, small phones
        sm480: '480px', // Large phones landscape
        sm576: '576px', // Small tablets portrait
        lg992: '992px',
        xl1200: '1200px',
        xl1400: '1400px',
        fhd: '1920px',  // Full HD+
        uw2k: '2560px', // 2K/4K ultra-wide
        uw3440: '3440px',
      },
      colors: {
        // Design-first palette (forest / sand / ocean / mint / clay / warm neutral)
        forest: {
          50: 'var(--color-forest-50)',
          100: 'var(--color-forest-100)',
          200: 'var(--color-forest-200)',
          300: 'var(--color-forest-300)',
          400: 'var(--color-forest-400)',
          500: 'var(--color-forest-500)',
          600: 'var(--color-forest-600)',
          700: 'var(--color-forest-700)',
          800: 'var(--color-forest-800)',
          900: 'var(--color-forest-900)',
          950: 'var(--color-forest-950)',
        },
        sand: {
          50: 'var(--color-sand-50)',
          100: 'var(--color-sand-100)',
          200: 'var(--color-sand-200)',
          300: 'var(--color-sand-300)',
          400: 'var(--color-sand-400)',
          500: 'var(--color-sand-500)',
          600: 'var(--color-sand-600)',
          700: 'var(--color-sand-700)',
          800: 'var(--color-sand-800)',
          900: 'var(--color-sand-900)',
          950: 'var(--color-sand-950)',
        },
        ocean: {
          50: 'var(--color-ocean-50)',
          100: 'var(--color-ocean-100)',
          200: 'var(--color-ocean-200)',
          300: 'var(--color-ocean-300)',
          400: 'var(--color-ocean-400)',
          500: 'var(--color-ocean-500)',
          600: 'var(--color-ocean-600)',
          700: 'var(--color-ocean-700)',
          800: 'var(--color-ocean-800)',
          900: 'var(--color-ocean-900)',
          950: 'var(--color-ocean-950)',
        },
        mint: {
          50: 'var(--color-mint-50)',
          100: 'var(--color-mint-100)',
          200: 'var(--color-mint-200)',
          300: 'var(--color-mint-300)',
          400: 'var(--color-mint-400)',
          500: 'var(--color-mint-500)',
          600: 'var(--color-mint-600)',
          700: 'var(--color-mint-700)',
          800: 'var(--color-mint-800)',
          900: 'var(--color-mint-900)',
          950: 'var(--color-mint-950)',
        },
        clay: {
          50: 'var(--color-clay-50)',
          100: 'var(--color-clay-100)',
          200: 'var(--color-clay-200)',
          300: 'var(--color-clay-300)',
          400: 'var(--color-clay-400)',
          500: 'var(--color-clay-500)',
          600: 'var(--color-clay-600)',
          700: 'var(--color-clay-700)',
          800: 'var(--color-clay-800)',
          900: 'var(--color-clay-900)',
          950: 'var(--color-clay-950)',
        },
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },

        // Legacy aliases retained for compatibility (all mapped to new palette values)
        brand: {
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
          950: 'var(--color-brand-950)',
        },
        accent: {
          50: 'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
        },
        secondary: {
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
          950: 'var(--color-secondary-950)',
        },
        crimson: {
          50: 'var(--color-crimson-50)',
          100: 'var(--color-crimson-100)',
          200: 'var(--color-crimson-200)',
          300: 'var(--color-crimson-300)',
          400: 'var(--color-crimson-400)',
          500: 'var(--color-crimson-500)',
          600: 'var(--color-crimson-600)',
          700: 'var(--color-crimson-700)',
          800: 'var(--color-crimson-800)',
          900: 'var(--color-crimson-900)',
          950: 'var(--color-crimson-950)',
        },
        indiagreen: {
          50: 'var(--color-indiagreen-50)',
          100: 'var(--color-indiagreen-100)',
          200: 'var(--color-indiagreen-200)',
          300: 'var(--color-indiagreen-300)',
          400: 'var(--color-indiagreen-400)',
          500: 'var(--color-indiagreen-500)',
          600: 'var(--color-indiagreen-600)',
          700: 'var(--color-indiagreen-700)',
          800: 'var(--color-indiagreen-800)',
          900: 'var(--color-indiagreen-900)',
          950: 'var(--color-indiagreen-950)',
        },
        marigold: {
          50: 'var(--color-marigold-50)',
          100: 'var(--color-marigold-100)',
          200: 'var(--color-marigold-200)',
          300: 'var(--color-marigold-300)',
          400: 'var(--color-marigold-400)',
          500: 'var(--color-marigold-500)',
          600: 'var(--color-marigold-600)',
          700: 'var(--color-marigold-700)',
          800: 'var(--color-marigold-800)',
          900: 'var(--color-marigold-900)',
          950: 'var(--color-marigold-950)',
        },
        stout: {
          50: 'var(--color-stout-50)',
          100: 'var(--color-stout-100)',
          200: 'var(--color-stout-200)',
          300: 'var(--color-stout-300)',
          400: 'var(--color-stout-400)',
          500: 'var(--color-stout-500)',
          600: 'var(--color-stout-600)',
          700: 'var(--color-stout-700)',
          800: 'var(--color-stout-800)',
          900: 'var(--color-stout-900)',
          950: 'var(--color-stout-950)',
        },
        cardamom: {
          50: 'var(--color-cardamom-50)',
          100: 'var(--color-cardamom-100)',
          200: 'var(--color-cardamom-200)',
          300: 'var(--color-cardamom-300)',
          400: 'var(--color-cardamom-400)',
          500: 'var(--color-cardamom-500)',
          600: 'var(--color-cardamom-600)',
          700: 'var(--color-cardamom-700)',
          800: 'var(--color-cardamom-800)',
          900: 'var(--color-cardamom-900)',
          950: 'var(--color-cardamom-950)',
        },
        gold: {
          50: 'var(--color-gold-50)',
          100: 'var(--color-gold-100)',
          200: 'var(--color-gold-200)',
          300: 'var(--color-gold-300)',
          400: 'var(--color-gold-400)',
          500: 'var(--color-gold-500)',
          600: 'var(--color-gold-600)',
          700: 'var(--color-gold-700)',
          800: 'var(--color-gold-800)',
          900: 'var(--color-gold-900)',
          950: 'var(--color-gold-950)',
        },
        rose: {
          50: 'var(--color-rose-50)',
          100: 'var(--color-rose-100)',
          200: 'var(--color-rose-200)',
          300: 'var(--color-rose-300)',
          400: 'var(--color-rose-400)',
          500: 'var(--color-rose-500)',
          600: 'var(--color-rose-600)',
          700: 'var(--color-rose-700)',
          800: 'var(--color-rose-800)',
          900: 'var(--color-rose-900)',
          950: 'var(--color-rose-950)',
        },

        // Legacy Crown mappings for backward compatibility
        crown: {
          gold: 'var(--color-gold-500)',
          'gold-light': 'var(--color-gold-400)',
          'gold-dark': 'var(--color-gold-600)',
          dark: 'var(--color-text)',
          ochre: 'var(--color-gold-600)',
          slate: 'var(--color-neutral-700)',
          'slate-light': 'var(--color-neutral-600)',
          'slate-dark': 'var(--color-neutral-800)',
          red: 'var(--color-crimson-600)',
          'red-light': 'var(--color-crimson-500)',
          'red-dark': 'var(--color-crimson-800)',
          cream: 'var(--color-neutral-50)',
          'cream-dark': 'var(--color-neutral-100)',
        },
        
        // Semantic colors for restaurant
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        neutral: 'var(--color-neutral-100)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        'display': ['var(--font-playfair)', 'Playfair Display', 'serif'], // For headings
        'body': ['var(--font-inter)', 'Inter', 'sans-serif'], // For body text
        'sans': ['var(--font-inter)', 'Inter', 'sans-serif'],
        'serif': ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "var(--grad-hero-pattern)",
        gradient: "var(--grad-royal-midnight)",
        'skeleton-shimmer': "var(--grad-skeleton)",
      },
      animation: {
        opacity: "opacity 0.25s ease-in-out",
        appearFromRight: "appearFromRight 300ms ease-in-out",
        wiggle: "wiggle 1.5s ease-in-out infinite",
        popup: "popup 0.25s ease-in-out",
        shimmer: "shimmer 3s ease-out infinite alternate",
        "scroll-left": "scroll-left 30s linear infinite",
      },
      keyframes: {
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        appearFromRight: {
          "0%": { opacity: 0.3, transform: "translate(15%, 0px);" },
          "100%": { opacity: 1, transform: "translate(0);" },
        },
        wiggle: {
          "0%, 20%, 80%, 100%": {
            transform: "rotate(0deg)",
          },
          "30%, 60%": {
            transform: "rotate(-2deg)",
          },
          "40%, 70%": {
            transform: "rotate(2deg)",
          },
          "45%": {
            transform: "rotate(-4deg)",
          },
          "55%": {
            transform: "rotate(4deg)",
          },
        },
        popup: {
          "0%": { transform: "scale(0.8)", opacity: 0.8 },
          "50%": { transform: "scale(1.1)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        shimmer: {
          "0%": { backgroundPosition: "0 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-320px * 6 - 1.5rem * 5))" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // Light & dark themes are added by default (it switches automatically based on OS settings)
    // You can add another theme among the list of 30+
    // Add "data-theme='theme_name" to any HTML tag to enable the 'theme_name' theme.
    // https://daisyui.com/
    themes: ["light", "dark"],
  },
};
