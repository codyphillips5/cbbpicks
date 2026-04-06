import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      'dist/**',
      'vite.config.ts',
      'playwright.config.ts',
      'e2e/**',
      'src/**',
    ],
  },
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.jquery,
        firebase: 'readonly',
        auth: 'writable',
        db: 'writable',
        CBBApi: 'writable',
        CBB_JSON_BASE: 'writable',
        CBB_FIREBASE_CONFIG: 'writable',
        CBB_ENV: 'writable',
        CBB_SENTRY_DSN: 'writable',
        CBBLogger: 'readonly',
        Sentry: 'readonly',
        usersFile: 'writable',
        resultsList: 'writable',
        M: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-redeclare': 'off',
    },
  },
  {
    files: ['lib/**/*.mjs', 'tests/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
