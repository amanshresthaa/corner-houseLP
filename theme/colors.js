/**
 * Centralized color tokens for the project - White Horse Heritage Palette
 * Exported as CommonJS so it can be reused by build scripts (Node) and runtime code.
 *
 * Structure:
 * - `base`: raw palette scales (50-950) + legacy state shortcuts
 * - `statusScales`: full scales for success/warning/info/error feedback colors
 * - `semantic`: semantic aliases (surface/text/border/etc) for light & dark modes
 * - `overlays` / `gradients` / `shadows`: supporting design tokens
 * - `accessibility`: default + high-contrast accessibility color set
 * - `themes`: preserved light/dark theme map for existing integrations
 */

const palette = {
  himalayanSnow: {
    50: '#FFFFFF',
    100: '#FAFAFA',
    200: '#F5F5F5',
    300: '#EEEEEE',
    400: '#E0E0E0',
    500: '#D4D4D4',
    600: '#BDBDBD',
    700: '#9E9E9E',
    800: '#757575',
    900: '#616161',
    950: '#4A4A4A',
  },
  royalCrimson: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#DC143C',
    600: '#C41E3A',
    700: '#991B1B',
    800: '#7F1D1D',
    900: '#5F1416',
    950: '#3B0B0D',
  },
  sapphireBlue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#003893',
    600: '#002D72',
    700: '#002561',
    800: '#001E4F',
    900: '#001840',
    950: '#00112D',
  },
  himalayanClay: {
    50: '#FDF8F7',
    100: '#F9EFEC',
    200: '#F1DDD8',
    300: '#E5C3B9',
    400: '#D49D8C',
    500: '#B8735A',
    600: '#9C5D47',
    700: '#7D4A39',
    800: '#5F3A2D',
    900: '#4A2E23',
    950: '#352019',
  },
  templeGold: {
    50: '#FFFDF7',
    100: '#FEF9E7',
    200: '#FDF2C8',
    300: '#FCE7A1',
    400: '#F9D669',
    500: '#D4AF37',
    600: '#B8941F',
    700: '#8C7315',
    800: '#6B5A11',
    900: '#4F420C',
    950: '#362D08',
  },
  mountainForest: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#2C5F2D',
    600: '#234D24',
    700: '#1A3D1B',
    800: '#143016',
    900: '#0F2411',
    950: '#09190C',
  },
  stoneGrey: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#0B1120',
  },
};

const statusScales = {
  success: { ...palette.mountainForest },
  warning: { ...palette.templeGold },
  info: { ...palette.sapphireBlue },
  error: { ...palette.royalCrimson },
};

const base = {
  primary: palette.himalayanSnow,
  accent: palette.royalCrimson,
  secondary: palette.sapphireBlue,
  earth: palette.himalayanClay,
  gold: palette.templeGold,
  forest: palette.mountainForest,
  neutral: palette.stoneGrey,

  // Legacy aliases (preserve existing utility classes)
  brand: palette.royalCrimson,
  crimson: palette.royalCrimson,
  indiagreen: palette.mountainForest,
  marigold: palette.templeGold,
  stout: palette.himalayanClay,
  cardamom: palette.mountainForest,

  success: statusScales.success,
  warning: statusScales.warning,
  info: statusScales.info,
  error: statusScales.error,
  state: {
    success: statusScales.success[500],
    warning: statusScales.warning[400],
    error: statusScales.error[500],
    info: statusScales.info[400],
  },
};

const overlays = {
  10: 'rgb(0 0 0 / 0.10)',
  20: 'rgb(0 0 0 / 0.20)',
  40: 'rgb(0 0 0 / 0.40)',
  60: 'rgb(0 0 0 / 0.60)',
};

const gradients = {
  saffronBrand: 'linear-gradient(135deg, var(--color-gold-400), var(--color-crimson-500))',
  heritage: 'linear-gradient(135deg, var(--color-crimson-500), var(--color-secondary-500))',
  heroPattern: 'linear-gradient(135deg, color-mix(in srgb, var(--color-gold-500) 88%, transparent), color-mix(in srgb, var(--color-earth-700) 80%, transparent))',
  skeleton: 'linear-gradient(90deg, color-mix(in srgb, var(--color-surface-muted) 96%, transparent) 0%, color-mix(in srgb, var(--color-surface-emphasis) 92%, transparent) 50%, color-mix(in srgb, var(--color-surface-muted) 96%, transparent) 100%)',
  spectrum: 'linear-gradient(60deg, var(--color-gold-300), var(--color-crimson-400), var(--color-secondary-400), var(--color-forest-400), var(--color-earth-400), var(--color-primary-200))',
};

const shadows = {
  light: {
    subtle: '0 1px 2px 0 var(--overlay-10)',
    default: '0 1px 3px 0 var(--overlay-20), 0 1px 2px -1px var(--overlay-20)',
    medium: '0 4px 6px -1px var(--overlay-20), 0 2px 4px -2px var(--overlay-20)',
    large: '0 10px 15px -3px var(--overlay-20), 0 4px 6px -4px var(--overlay-20)',
    brand: '0 6px 18px 0 color-mix(in srgb, var(--color-crimson-500) 28%, transparent)',
    accent: '0 6px 18px 0 color-mix(in srgb, var(--color-gold-500) 28%, transparent)',
    heritage: '0 6px 18px 0 color-mix(in srgb, var(--color-secondary-500) 28%, transparent)',
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
      base: 'var(--color-primary-50)',
      subtle: 'var(--color-primary-100)',
      muted: 'var(--color-primary-200)',
      emphasis: 'var(--color-primary-400)',
      inverse: 'var(--color-neutral-900)',
    },
    text: {
      primary: 'var(--color-neutral-800)',
      secondary: 'var(--color-neutral-600)',
      tertiary: 'var(--color-neutral-500)',
      inverse: 'var(--color-primary-50)',
      brand: 'var(--color-crimson-700)',
      accent: 'var(--color-gold-600)',
      heritage: 'var(--color-secondary-600)',
      error: 'var(--color-error-600)',
    },
    border: {
      subtle: 'var(--color-neutral-200)',
      default: 'var(--color-neutral-300)',
      emphasis: 'var(--color-neutral-400)',
      brand: 'var(--color-crimson-400)',
      heritage: 'var(--color-secondary-400)',
      error: 'var(--color-error-400)',
    },
    alias: {
      primary: 'var(--color-crimson-500)',
      secondary: 'var(--color-secondary-500)',
      accent: 'var(--color-gold-500)',
      success: 'var(--color-success-500)',
      warning: 'var(--color-warning-400)',
      info: 'var(--color-info-400)',
      error: 'var(--color-error-500)',
      text: 'var(--color-text-primary)',
    },
    onColor: {
      light: '#0f172a',
      dark: '#ffffff',
    },
  },
  dark: {
    surface: {
      base: 'var(--color-neutral-800)',
      subtle: 'var(--color-neutral-700)',
      muted: 'var(--color-neutral-600)',
      emphasis: 'var(--color-neutral-500)',
      inverse: 'var(--color-primary-50)',
    },
    text: {
      primary: 'var(--color-primary-50)',
      secondary: 'var(--color-primary-200)',
      tertiary: 'var(--color-primary-300)',
      inverse: 'var(--color-neutral-900)',
      brand: 'var(--color-crimson-300)',
      accent: 'var(--color-gold-300)',
      heritage: 'var(--color-secondary-300)',
      error: 'var(--color-error-300)',
    },
    border: {
      subtle: 'var(--color-neutral-700)',
      default: 'var(--color-neutral-600)',
      emphasis: 'var(--color-neutral-500)',
      brand: 'var(--color-crimson-500)',
      heritage: 'var(--color-secondary-500)',
      error: 'var(--color-error-500)',
    },
    alias: {
      primary: 'var(--color-crimson-400)',
      secondary: 'var(--color-secondary-400)',
      accent: 'var(--color-gold-400)',
      success: 'var(--color-success-400)',
      warning: 'var(--color-warning-300)',
      info: 'var(--color-info-300)',
      error: 'var(--color-error-300)',
      text: 'var(--color-text-primary)',
    },
    onColor: {
      light: '#0f172a',
      dark: '#f9fafb',
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
  'earth',
  'gold',
  'forest',
  'neutral',
  // Legacy family exports retain compatibility with existing utilities
  'brand',
  'crimson',
  'indiagreen',
  'marigold',
  'stout',
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
      background: base.primary[50],
      surface: base.primary[100],
      text: base.neutral[800],
      textMuted: base.neutral[500],
      border: base.neutral[200],
      primary: base.accent[500],
      primaryAccent: base.accent[600],
      secondary: base.secondary[500],
      accent: base.gold[500],
      success: statusScales.success[500],
      warning: statusScales.warning[400],
      error: statusScales.error[500],
      info: statusScales.info[400],
    },
  },
  dark: {
    name: 'dark',
    colors: {
      background: base.neutral[800],
      surface: base.neutral[700],
      text: base.primary[50],
      textMuted: base.primary[200],
      border: base.neutral[600],
      primary: base.accent[400],
      primaryAccent: base.accent[500],
      secondary: base.secondary[300],
      accent: base.gold[400],
      success: statusScales.success[400],
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
    const paletteScale = base[family];
    if (!paletteScale) return;
    Object.entries(paletteScale).forEach(([step, value]) => {
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
