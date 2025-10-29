/**
 * Centralized color tokens for the project – Midnight Majesty palette
 * Exports palette scales, semantic tokens, accessibility helpers, and a CSS-variable generator.
 */

const midnightNavy = {
  50: '#F0F4F8',
  100: '#D9E2EC',
  200: '#BCCCDC',
  300: '#9FB3C8',
  400: '#829AB1',
  500: '#1E3A5F',
  600: '#102A43',
  700: '#0C2133',
  800: '#091A28',
  900: '#061420',
  950: '#040D18',
};

const goldenHour = {
  50: '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B',
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
  950: '#4E2208',
};

const rhododendron = {
  50: '#FDF2F8',
  100: '#FCE7F3',
  200: '#FBCFE8',
  300: '#F9A8D4',
  400: '#F472B6',
  500: '#DB2777',
  600: '#BE185D',
  700: '#9D174D',
  800: '#831843',
  900: '#6B1A3A',
  950: '#4F102F',
};

const twilightNeutral = {
  50: '#F7FAFC',
  100: '#EDF2F7',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
  950: '#0A1120',
};

const obsidianSlate = {
  50: '#F5F7FA',
  100: '#E4E7EB',
  200: '#CBD2D9',
  300: '#9AA5B1',
  400: '#7B8794',
  500: '#616E7C',
  600: '#52606D',
  700: '#3E4C59',
  800: '#323F4B',
  900: '#1F2933',
  950: '#111827',
};

const evergreen = {
  50: '#ECFDF3',
  100: '#D1FADF',
  200: '#A6F4C5',
  300: '#6CE9A6',
  400: '#32D583',
  500: '#12B76A',
  600: '#039855',
  700: '#027A48',
  800: '#05603A',
  900: '#054F31',
  950: '#043321',
};

const herbalCardamom = {
  50: '#F4F9F5',
  100: '#E8F2E7',
  200: '#CEE5CD',
  300: '#B3D7B3',
  400: '#8AC38A',
  500: '#5CA660',
  600: '#4A8650',
  700: '#3B6B41',
  800: '#2D5133',
  900: '#234129',
  950: '#152819',
};

const statusScales = {
  success: evergreen,
  warning: goldenHour,
  info: midnightNavy,
  error: rhododendron,
};

const base = {
  primary: midnightNavy,
  accent: goldenHour,
  secondary: rhododendron,
  neutral: twilightNeutral,
  brand: midnightNavy,
  gold: goldenHour,
  rose: rhododendron,
  crimson: rhododendron,
  marigold: goldenHour,
  stout: obsidianSlate,
  indiagreen: evergreen,
  cardamom: herbalCardamom,
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
  10: 'rgb(8 21 36 / 0.10)',
  20: 'rgb(8 21 36 / 0.20)',
  40: 'rgb(8 21 36 / 0.40)',
  60: 'rgb(8 21 36 / 0.60)',
};

const gradients = {
  royalMidnight: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-400))',
  twilight: 'linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-500))',
  heroPattern: 'linear-gradient(135deg, color-mix(in srgb, var(--color-primary-500) 70%, transparent), color-mix(in srgb, var(--color-accent-400) 70%, transparent))',
  skeleton: 'linear-gradient(90deg, color-mix(in srgb, var(--color-surface-muted) 96%, transparent) 0%, color-mix(in srgb, var(--color-surface-emphasis) 92%, transparent) 50%, color-mix(in srgb, var(--color-surface-muted) 96%, transparent) 100%)',
};

const shadows = {
  light: {
    subtle: '0 1px 2px 0 var(--overlay-10)',
    default: '0 1px 3px 0 var(--overlay-20), 0 1px 2px -1px var(--overlay-20)',
    medium: '0 4px 6px -1px var(--overlay-20), 0 2px 4px -2px var(--overlay-20)',
    large: '0 10px 15px -3px var(--overlay-20), 0 4px 6px -4px var(--overlay-20)',
    brand: '0 8px 22px 0 color-mix(in srgb, var(--color-primary-500) 32%, transparent)',
    accent: '0 8px 22px 0 color-mix(in srgb, var(--color-accent-400) 32%, transparent)',
    heritage: '0 8px 22px 0 color-mix(in srgb, var(--color-secondary-500) 32%, transparent)',
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
      muted: 'var(--color-neutral-200)',
      emphasis: 'var(--color-neutral-300)',
      inverse: 'var(--color-stout-900)',
    },
    text: {
      primary: 'var(--color-stout-900)',
      secondary: 'var(--color-neutral-600)',
      tertiary: 'var(--color-neutral-500)',
      inverse: 'var(--color-neutral-50)',
      brand: 'var(--color-primary-600)',
      accent: 'var(--color-accent-600)',
      heritage: 'var(--color-secondary-600)',
      error: 'var(--color-error-600)',
    },
    border: {
      subtle: 'var(--color-neutral-200)',
      default: 'var(--color-neutral-300)',
      emphasis: 'var(--color-neutral-400)',
      brand: 'var(--color-primary-400)',
      heritage: 'var(--color-secondary-400)',
      error: 'var(--color-error-400)',
    },
    alias: {
      primary: 'var(--color-primary-500)',
      secondary: 'var(--color-accent-500)',
      accent: 'var(--color-secondary-500)',
      success: 'var(--color-success-500)',
      warning: 'var(--color-warning-400)',
      info: 'var(--color-info-400)',
      error: 'var(--color-error-500)',
      text: 'var(--color-text-primary)',
    },
    onColor: {
      light: '#0F172A',
      dark: '#FFFFFF',
    },
  },
  dark: {
    surface: {
      base: 'var(--color-primary-800)',
      subtle: 'var(--color-primary-700)',
      muted: 'var(--color-primary-600)',
      emphasis: 'var(--color-primary-500)',
      inverse: 'var(--color-neutral-50)',
    },
    text: {
      primary: 'var(--color-neutral-50)',
      secondary: 'var(--color-neutral-200)',
      tertiary: 'var(--color-neutral-300)',
      inverse: 'var(--color-primary-900)',
      brand: 'var(--color-primary-300)',
      accent: 'var(--color-accent-300)',
      heritage: 'var(--color-secondary-300)',
      error: 'var(--color-error-300)',
    },
    border: {
      subtle: 'var(--color-primary-700)',
      default: 'var(--color-primary-600)',
      emphasis: 'var(--color-primary-500)',
      brand: 'var(--color-primary-400)',
      heritage: 'var(--color-secondary-400)',
      error: 'var(--color-error-400)',
    },
    alias: {
      primary: 'var(--color-primary-300)',
      secondary: 'var(--color-accent-300)',
      accent: 'var(--color-secondary-300)',
      success: 'var(--color-success-300)',
      warning: 'var(--color-warning-300)',
      info: 'var(--color-info-300)',
      error: 'var(--color-error-300)',
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
      background: base.primary[50],
      surface: '#FFFFFF',
      text: base.stout[900],
      textMuted: base.primary[400],
      border: base.primary[200],
      primary: base.primary[500],
      primaryAccent: base.primary[600],
      secondary: base.accent[500],
      accent: base.secondary[500],
      success: statusScales.success[500],
      warning: statusScales.warning[400],
      error: statusScales.error[500],
      info: statusScales.info[400],
    },
  },
  dark: {
    name: 'dark',
    colors: {
      background: base.primary[800],
      surface: base.primary[700],
      text: base.neutral[50],
      textMuted: base.neutral[200],
      border: base.primary[600],
      primary: base.primary[300],
      primaryAccent: base.primary[400],
      secondary: base.accent[300],
      accent: base.secondary[300],
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
