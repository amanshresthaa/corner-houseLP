'use client';

import React from 'react';
import {
    colors,
    overlays,
    gradients,
    colorScaleToCssVars,
    semanticColors,
} from '../tokens/colors';
import { layout } from '../tokens/spacing';
import { shadows, brandedShadows } from '../tokens/shadows';

/**
 * GlobalStyles component that injects CSS custom properties
 * This uses standard React patterns that work with any framework
 */
export function GlobalStyles() {
    const cssContent = React.useMemo(() => `
:root {
  /* ═══════════════════════════════════════════════════════════════════════════
     COLOR SCALES
     ═══════════════════════════════════════════════════════════════════════════ */
  
  /* Forest - Brand/Primary */
  ${colorScaleToCssVars('forest', colors.forest)}
  
  /* Sand - Accent/CTA */
  ${colorScaleToCssVars('sand', colors.sand)}
  
  /* Ocean - Info */
  ${colorScaleToCssVars('ocean', colors.ocean)}
  
  /* Mint - Success */
  ${colorScaleToCssVars('mint', colors.mint)}
  
  /* Clay - Error */
  ${colorScaleToCssVars('clay', colors.clay)}
  
  /* Neutral */
  ${colorScaleToCssVars('neutral', colors.neutral)}

  /* ═══════════════════════════════════════════════════════════════════════════
     SEMANTIC TOKENS (Light Mode)
     ═══════════════════════════════════════════════════════════════════════════ */
  
  /* Primary semantic colors */
  --color-primary: ${semanticColors.light.primary.fallback};
  --color-secondary: ${semanticColors.light.secondary.fallback};
  --color-accent: ${semanticColors.light.accent.fallback};
  --color-success: ${semanticColors.light.success.fallback};
  --color-warning: ${semanticColors.light.warning.fallback};
  --color-info: ${semanticColors.light.info.fallback};
  --color-error: ${semanticColors.light.error.fallback};
  
  /* Surface colors */
  --color-surface-base: ${semanticColors.light.surface.base.fallback};
  --color-surface-subtle: ${semanticColors.light.surface.subtle.fallback};
  --color-surface-muted: ${semanticColors.light.surface.muted.fallback};
  --color-surface-emphasis: ${semanticColors.light.surface.emphasis.fallback};
  
  /* Text colors */
  --color-text-primary: ${semanticColors.light.text.primary.fallback};
  --color-text-secondary: ${semanticColors.light.text.secondary.fallback};
  --color-text-tertiary: ${semanticColors.light.text.tertiary.fallback};
  
  /* Border colors */
  --color-border-subtle: ${semanticColors.light.border.subtle.fallback};
  --color-border-default: ${semanticColors.light.border.default.fallback};
  --color-border-emphasis: ${semanticColors.light.border.emphasis.fallback};

  /* ═══════════════════════════════════════════════════════════════════════════
     OVERLAYS & GRADIENTS
     ═══════════════════════════════════════════════════════════════════════════ */
  
  --overlay-10: ${overlays[10]};
  --overlay-20: ${overlays[20]};
  --overlay-40: ${overlays[40]};
  --overlay-60: ${overlays[60]};
  
  --gradient-royal-midnight: ${gradients.royalMidnight};
  --gradient-twilight: ${gradients.twilight};
  --gradient-hero-pattern: ${gradients.heroPattern};
  --gradient-skeleton: ${gradients.skeleton};

  /* ═══════════════════════════════════════════════════════════════════════════
     SHADOWS
     ═══════════════════════════════════════════════════════════════════════════ */
  
  --shadow-subtle: ${shadows.subtle};
  --shadow-default: ${shadows.default};
  --shadow-medium: ${shadows.medium};
  --shadow-large: ${shadows.large};
  --shadow-xl: ${shadows.xl};
  --shadow-2xl: ${shadows['2xl']};
  --shadow-inner: ${shadows.inner};
  --shadow-brand: ${brandedShadows.brand};
  --shadow-accent: ${brandedShadows.accent};

  /* ═══════════════════════════════════════════════════════════════════════════
     LAYOUT & SPACING
     ═══════════════════════════════════════════════════════════════════════════ */
  
  --rhythm: ${layout.rhythm};
  --container-gutter: ${layout.containerGutter};
  --content-max: ${layout.contentMax};
  --page-max: ${layout.pageMax};
  --lh-body: clamp(1.45, 1.2 + 0.8vw, 1.65);

  /* ═══════════════════════════════════════════════════════════════════════════
     ACCESSIBILITY
     ═══════════════════════════════════════════════════════════════════════════ */
  
  --accessibility-focus-width: 3px;
  --accessibility-focus-offset: 2px;
  --accessibility-animation-duration: 0.3s;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DARK MODE
   ═══════════════════════════════════════════════════════════════════════════ */

.dark,
[data-theme="dark"] {
  --color-primary: ${semanticColors.dark.primary.fallback};
  --color-secondary: ${semanticColors.dark.secondary.fallback};
  --color-accent: ${semanticColors.dark.accent.fallback};
  --color-success: ${semanticColors.dark.success.fallback};
  --color-warning: ${semanticColors.dark.warning.fallback};
  --color-info: ${semanticColors.dark.info.fallback};
  --color-error: ${semanticColors.dark.error.fallback};
  
  --color-surface-base: ${semanticColors.dark.surface.base.fallback};
  --color-surface-subtle: ${semanticColors.dark.surface.subtle.fallback};
  --color-surface-muted: ${semanticColors.dark.surface.muted.fallback};
  --color-surface-emphasis: ${semanticColors.dark.surface.emphasis.fallback};
  
  --color-text-primary: ${semanticColors.dark.text.primary.fallback};
  --color-text-secondary: ${semanticColors.dark.text.secondary.fallback};
  --color-text-tertiary: ${semanticColors.dark.text.tertiary.fallback};
  
  --color-border-subtle: ${semanticColors.dark.border.subtle.fallback};
  --color-border-default: ${semanticColors.dark.border.default.fallback};
  --color-border-emphasis: ${semanticColors.dark.border.emphasis.fallback};
}

/* ═══════════════════════════════════════════════════════════════════════════
   REDUCED MOTION
   ═══════════════════════════════════════════════════════════════════════════ */

@media (prefers-reduced-motion: reduce) {
  :root {
    --accessibility-animation-duration: 0.01ms;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACCESSIBILITY UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
  `.trim(), []);

    return (
        <style
            dangerouslySetInnerHTML={{ __html: cssContent }}
            data-design-system="corner-house"
        />
    );
}

export default GlobalStyles;
