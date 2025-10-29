module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: "Literal[value=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]",
        message: 'Use centralized color tokens instead of hex literals.',
      },
    ],
  },
  overrides: [
    {
      files: [
        'theme/colors.js',
        'styles/generated/**/*',
        'scripts/**/*.js',
        '**/*.config.{js,ts}',
      ],
      rules: {
        'no-restricted-syntax': 'off',
      },
    },
  ],
};
