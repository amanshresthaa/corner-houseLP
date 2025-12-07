/**
 * Enhanced design-first color palette (forest / sand / ocean / mint / clay / warm neutral)
 * WCAG-focused, perceptually uniform scales with semantic light/dark mappings.
 */

// Primary brand
const forest = {
  50: '#F0F7F4',
  100: '#E0EFE9',
  200: '#C2DFD3',
  300: '#9DD4BC',
  400: '#70BFA0',
  500: '#1B4332',
  600: '#143528',
  700: '#0F281F',
  800: '#0B1C16',
  900: '#08140F',
  950: '#051208',
};

// Accent / CTA / warning
const sand = {
  50: '#FDF9F3',
  100: '#F9F2E6',
  200: '#F7EBDA',
  300: '#EDD5B4',
  400: '#E2BD8E',
  500: '#D4A574',
  600: '#B8884F',
  700: '#8E6839',
  800: '#6B4E2A',
  900: '#5C4426',
  950: '#3E2A18',
};

// Info / links / trust
const ocean = {
  50: '#F0F6FA',
  100: '#E1EDF5',
  200: '#D6E6F2',
  300: '#B8D4E8',
  400: '#9EC3DE',
  500: '#2C5F8D',
  600: '#1F4768',
  700: '#1A3A55',
  800: '#163044',
  900: '#112534',
  950: '#0A1821',
};

// Success
const mint = {
  50: '#F1F9F5',
  100: '#E2F4EB',
  200: '#D4EFE0',
  300: '#B7E4CD',
  400: '#A1D9B9',
  500: '#52A67D',
  600: '#3B8860',
  700: '#2F6B4C',
  800: '#2A6244',
  900: '#1C422D',
  950: '#0D2318',
};

// Error / destructive
const clay = {
  50: '#FBF4F2',
  100: '#F7E9E5',
  200: '#F4DDD4',
  300: '#E8BFB0',
  400: '#E5B5A3',
  500: '#B85C3E',
  600: '#93432B',
  700: '#7A3622',
  800: '#6D2F1E',
  900: '#472015',
  950: '#2F1510',
};

// Warm neutral backbone
const warmNeutral = {
  50: '#FAFAF9',
  100: '#F5F5F4',
  200: '#E7E5E4',
  300: '#D6D3D1',
  400: '#A8A29E',
  500: '#6B7280',
  600: '#57534E',
  700: '#44403C',
  800: '#292524',
  900: '#1C1917',
  950: '#18181B',
};

const statusScales = {
  success: mint,
  warning: sand,
  info: ocean,
  error: clay,
};

const base = {
  // Primary palette
  primary: forest,
  accent: sand,
  secondary: clay,
  neutral: warmNeutral,

  // Direct families
  forest,
  sand,
  ocean,
  mint,
  clay,

  // Legacy aliases mapped to new palette
  brand: forest,
  gold: sand,
  marigold: sand,
  rose: clay,
  crimson: clay,
  stout: warmNeutral,
  indiagreen: mint,
  cardamom: mint,

  // Semantic status
  success: statusScales.success,
  warning: statusScales.warning,
  info: statusScales.info,
  error: statusScales.error,

  state: {
    success: statusScales.success[500],
    warning: statusScales.warning[500],
    error: statusScales.error[500],
    info: statusScales.info[500],
  },
};

const overlays = {
  10: 'rgb(8 21 36 / 0.10)',
  20: 'rgb(8 21 36 / 0.20)',
  40: 'rgb(8 21 36 / 0.40)',
  60: 'rgb(8 21 36 / 0.60)',
};

const gradients = {
  royalMidnight: 'linear-gradient(135deg, var(--color-forest-500), var(--color-sand-400))',
  twilight: 'linear-gradient(135deg, var(--color-forest-600), var(--color-clay-500))',
  heroPattern: 'linear-gradient(135deg, color-mix(in srgb, var(--color-forest-500) 70%, transparent), color-mix(in srgb, var(--color-sand-400) 70%, transparent))',
  skeleton: 'linear-gradient(90deg, color-mix(in srgb, var(--color-surface-muted) 96%, transparent) 0%, color-mix(in srgb, var(--color-surface-emphasis) 92%, transparent) 50%, color-mix(in srgb, var(--color-surface-muted) 96%, transparent) 100%)',
};

const shadows = {
  light: {
    subtle: '0 1px 2px 0 var(--overlay-10)',
    default: '0 1px 3px 0 var(--overlay-20), 0 1px 2px -1px var(--overlay-20)',
    medium: '0 4px 6px -1px var(--overlay-20), 0 2px 4px -2px var(--overlay-20)',
    large: '0 10px 15px -3px var(--overlay-20), 0 4px 6px -4px var(--overlay-20)',
    brand: '0 8px 22px 0 color-mix(in srgb, var(--color-forest-500) 32%, transparent)',
    accent: '0 8px 22px 0 color-mix(in srgb, var(--color-sand-400) 32%, transparent)',
    heritage: '0 8px 22px 0 color-mix(in srgb, var(--color-clay-500) 32%, transparent)',
  },
  dark: {
    subtle: '0 1px 2px 0 var(--overlay-40)',
    default: '0 1px 3px 0 var(--overlay-40), 0 1px 2px -1px var(--overlay-40)',
    medium: '0 4px 6px -1px var(--overlay-60), 0 2px 4px -2px var(--overlay-60)',
    large: '0 10px 15px -3px var(--overlay-60), 0 4px 6px -4px var(--overlay-60)',
  },
};

const semantic = {
  light: {
    surface: {
      base: 'var(--color-neutral-50)',
      subtle: '#FFFFFF',
      muted: 'var(--color-neutral-100)',
      emphasis: 'var(--color-neutral-200)',
      inverse: 'var(--color-forest-900)',
    },
    text: {
      primary: 'var(--color-neutral-800)',
      secondary: 'var(--color-neutral-600)',
      tertiary: 'var(--color-neutral-500)',
      inverse: 'var(--color-neutral-50)',
      brand: 'var(--color-forest-600)',
      accent: 'var(--color-sand-600)',
      heritage: 'var(--color-clay-600)',
      error: 'var(--color-clay-600)',
    },
    border: {
      subtle: 'var(--color-neutral-200)',
      default: 'var(--color-neutral-300)',
      emphasis: 'var(--color-neutral-400)',
      brand: 'var(--color-forest-400)',
      heritage: 'var(--color-clay-400)',
      error: 'var(--color-clay-400)',
    },
    alias: {
      primary: 'var(--color-forest-500)',
      secondary: 'var(--color-sand-500)',
      accent: 'var(--color-sand-500)',
      success: 'var(--color-mint-500)',
      warning: 'var(--color-sand-500)',
      info: 'var(--color-ocean-500)',
      error: 'var(--color-clay-500)',
      text: 'var(--color-text-primary)',
    },
    onColor: {
      light: '#0F172A',
      dark: '#FFFFFF',
    },
  },
  dark: {
    surface: {
      base: 'var(--color-neutral-950)',
      subtle: 'var(--color-neutral-900)',
      muted: 'var(--color-neutral-800)',
      emphasis: 'var(--color-neutral-700)',
      inverse: 'var(--color-neutral-50)',
    },
    text: {
      primary: 'var(--color-neutral-50)',
      secondary: 'var(--color-neutral-300)',
      tertiary: 'var(--color-neutral-400)',
      inverse: 'var(--color-neutral-900)',
      brand: 'var(--color-forest-300)',
      accent: 'var(--color-sand-300)',
      heritage: 'var(--color-clay-300)',
      error: 'var(--color-clay-300)',
    },
    border: {
      subtle: 'var(--color-neutral-800)',
      default: 'var(--color-neutral-700)',
      emphasis: 'var(--color-neutral-600)',
      brand: 'var(--color-forest-400)',
      heritage: 'var(--color-clay-400)',
      error: 'var(--color-clay-400)',
    },
    alias: {
      primary: 'var(--color-forest-300)',
      secondary: 'var(--color-sand-300)',
      accent: 'var(--color-sand-300)',
      success: 'var(--color-mint-300)',
      warning: 'var(--color-sand-300)',
      info: 'var(--color-ocean-300)',
      error: 'var(--color-clay-300)',
      text: 'var(--color-text-primary)',
    },
    onColor: {
      light: '#0B1120',
      dark: '#F8FAFC',
    },
  },
};

const accessibility = {
  default: {
    bgPrimary: '#ffffff',
    textPrimary: '#212529',
    bgSecondary: '#f8f9fa',
    textSecondary: '#6c757d',
    borderPrimary: '#dee2e6',
    focusColor: '#005fcc',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
  },
  highContrast: {
    bgPrimary: '#000000',
    textPrimary: '#ffffff',
    bgSecondary: '#1a1a1a',
    textSecondary: '#cccccc',
    borderPrimary: '#ffffff',
    focusColor: '#ffff00',
    success: '#51cf66',
    warning: '#ffd43b',
    error: '#ff6b6b',
    info: '#74c0fc',
    link: '#74c0fc',
    linkHover: '#ffd43b',
  },
};

const colorFamilies = [
  'primary',
  'accent',
  'secondary',
  'neutral',
  'forest',
  'sand',
  'ocean',
  'mint',
  'clay',
  'brand',
  'gold',
  'rose',
  'crimson',
  'marigold',
  'stout',
  'indiagreen',
  'cardamom',
  'success',
  'warning',
  'info',
  'error',
];

const themes = {
  light: {
    name: 'light',
    colors: {
      background: base.neutral[50],
      surface: '#FFFFFF',
      text: base.neutral[800],
      textMuted: base.neutral[600],
      border: base.neutral[200],
      primary: base.primary[500],
      primaryAccent: base.primary[600],
      secondary: base.accent[500],
      accent: base.ocean[500],
      success: statusScales.success[500],
      warning: statusScales.warning[500],
      error: statusScales.error[500],
      info: statusScales.info[500],
    },
  },
  dark: {
    name: 'dark',
    colors: {
      background: base.neutral[950],
      surface: base.neutral[900],
      text: base.neutral[50],
      textMuted: base.neutral[300],
      border: base.neutral[800],
      primary: base.primary[300],
      primaryAccent: base.primary[400],
      secondary: base.accent[300],
      accent: base.ocean[300],
      success: statusScales.success[300],
      warning: statusScales.warning[300],
      error: statusScales.error[300],
      info: statusScales.info[300],
    },
  },
};

function cssVariablesForTheme(themeName = 'light') {
  const theme = themes[themeName] || themes.light;
  const modeSemantic = semantic[themeName] || semantic.light;
  const shadowSet = shadows[themeName] || shadows.light;
  const lines = [];

  Object.entries(theme.colors).forEach(([key, value]) => {
    lines.push(`--color-${key.toLowerCase()}: ${value};`);
  });

  colorFamilies.forEach(family => {
    const palette = base[family];
    if (!palette) return;
    Object.entries(palette).forEach(([step, value]) => {
      lines.push(`--color-${family}-${step}: ${value};`);
    });
  });

  Object.entries(modeSemantic.surface).forEach(([key, value]) => {
    lines.push(`--color-surface-${key}: ${value};`);
  });
  Object.entries(modeSemantic.text).forEach(([key, value]) => {
    lines.push(`--color-text-${key}: ${value};`);
  });
  Object.entries(modeSemantic.border).forEach(([key, value]) => {
    lines.push(`--color-border-${key}: ${value};`);
  });
  Object.entries(modeSemantic.alias).forEach(([key, value]) => {
    if (key === 'text') {
      lines.push(`--color-text: ${value};`);
    } else {
      lines.push(`--color-${key}: ${value};`);
    }
  });

  lines.push(`--on-dark: ${modeSemantic.onColor.dark};`);
  lines.push(`--on-light: ${modeSemantic.onColor.light};`);

  Object.entries(overlays).forEach(([key, value]) => {
    lines.push(`--overlay-${key}: ${value};`);
  });
  Object.entries(gradients).forEach(([key, value]) => {
    lines.push(`--grad-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`);
  });
  Object.entries(shadowSet).forEach(([key, value]) => {
    lines.push(`--shadow-${key}: ${value};`);
  });

  return lines.join('\n');
}

module.exports = {
  base,
  themes,
  semantic,
  shadows,
  overlays,
  gradients,
  accessibility,
  colorFamilies,
  statusScales,
  cssVariablesForTheme,
};
