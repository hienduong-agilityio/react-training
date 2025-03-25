import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import("eslint").FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: process.cwd(),
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: reactPlugin,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      // TypeScript Rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/default-param-last': 'warn',

      // React Rules
      'react/prop-types': 'off',

      // React Refresh (Vite HMR Support)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Prettier Rules
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: true,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ],

      // Console Rules (allow `console.warn` & `console.error`)
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  }
];
