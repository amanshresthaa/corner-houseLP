#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const {
  base,
  semantic,
  shadows,
  overlays,
  gradients,
  accessibility,
  colorFamilies,
} = require('../theme/colors');

const OUTPUT_PATH = path.join(__dirname, '..', 'styles', 'generated', 'colors.css');
const args = process.argv.slice(2);
const MODE = args.includes('--check') ? 'check' : 'write';

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function formatPaletteSection(lines) {
  lines.push('  /* Base palette scales */');
  colorFamilies.forEach(family => {
    const palette = base[family];
    if (!palette) return;
    const label = family.charAt(0).toUpperCase() + family.slice(1);
    lines.push(`  /* ${label} */`);
    Object.entries(palette).forEach(([step, value]) => {
      lines.push(`  --color-${family}-${step}: ${value};`);
    });
    lines.push('');
  });
  lines.pop();
}

function formatSemanticSection(lines, mode, options = {}) {
  const { includeAliases = true } = options;
  const semanticMode = semantic[mode];
  if (!semanticMode) return;

  lines.push('');
  lines.push('  /* Semantic surfaces & text */');
  Object.entries(semanticMode.surface).forEach(([key, value]) => {
    lines.push(`  --color-surface-${key}: ${value};`);
  });

  lines.push('');
  Object.entries(semanticMode.text).forEach(([key, value]) => {
    lines.push(`  --color-text-${key}: ${value};`);
  });

  lines.push('');
  Object.entries(semanticMode.border).forEach(([key, value]) => {
    lines.push(`  --color-border-${key}: ${value};`);
  });

  if (includeAliases) {
    lines.push('');
    Object.entries(semanticMode.alias).forEach(([key, value]) => {
      if (key === 'text') {
        lines.push(`  --color-text: ${value};`);
      } else {
        lines.push(`  --color-${key}: ${value};`);
      }
    });

    lines.push('');
    lines.push(`  --on-dark: ${semanticMode.onColor.dark};`);
    lines.push(`  --on-light: ${semanticMode.onColor.light};`);
  }
}

function formatSupportTokens(lines) {
  lines.push('');
  lines.push('  /* Gradients */');
  Object.entries(gradients).forEach(([key, value]) => {
    const name = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    lines.push(`  --grad-${name}: ${value};`);
  });

  lines.push('');
  lines.push('  /* Overlays */');
  Object.entries(overlays).forEach(([key, value]) => {
    lines.push(`  --overlay-${key}: ${value};`);
  });
}

function formatShadowTokens(lines, mode) {
  const shadowMode = shadows[mode];
  if (!shadowMode) return;
  lines.push('');
  lines.push('  /* Shadows */');
  Object.entries(shadowMode).forEach(([key, value]) => {
    lines.push(`  --shadow-${key}: ${value};`);
  });
}

function formatAccessibilityTokens(lines) {
  lines.push('');
  lines.push('  /* Accessibility defaults */');
  Object.entries(accessibility.default).forEach(([key, value]) => {
    const name = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    lines.push(`  --accessibility-${name}: ${value};`);
  });

  lines.push('');
  lines.push('  /* Accessibility high-contrast reference */');
  Object.entries(accessibility.highContrast).forEach(([key, value]) => {
    const name = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    lines.push(`  --accessibility-high-contrast-${name}: ${value};`);
  });
}

function buildCss() {
  const rootLines = [];
  rootLines.push(':root {');
  formatPaletteSection(rootLines);
  formatSemanticSection(rootLines, 'light', { includeAliases: true });
  formatSupportTokens(rootLines);
  formatShadowTokens(rootLines, 'light');
  formatAccessibilityTokens(rootLines);
  rootLines.push('}');

  const darkLines = [];
  darkLines.push('');
  darkLines.push('html.dark {');
  formatSemanticSection(darkLines, 'dark', { includeAliases: false });
  formatShadowTokens(darkLines, 'dark');
  darkLines.push('}');

  const header = '/* AUTO-GENERATED FILE - DO NOT EDIT.\n' +
    '   Run `npm run colors:generate` to regenerate. */\n\n';

  return header + rootLines.join('\n') + darkLines.join('\n') + '\n';
}

function writeFile(content) {
  ensureDir(OUTPUT_PATH);
  fs.writeFileSync(OUTPUT_PATH, content, 'utf8');
  console.log(`✨ Wrote ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

function checkFile(content) {
  try {
    const existing = fs.readFileSync(OUTPUT_PATH, 'utf8');
    if (existing !== content) {
      console.error('Color CSS is out of date. Run `npm run colors:generate`.');
      process.exitCode = 1;
    } else {
      console.log('✅ Color CSS is up to date.');
    }
  } catch (error) {
    console.error('Color CSS missing. Run `npm run colors:generate` to create it.');
    process.exitCode = 1;
  }
}

(function run() {
  const css = buildCss();
  if (MODE === 'check') {
    checkFile(css);
  } else {
    writeFile(css);
  }
})();
