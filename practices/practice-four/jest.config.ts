import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '!<rootDir>/src/**/**/__test__/__snapshots__/**',
    '!<rootDir>/src/constants/*',
    '!<rootDir>/src/enums/*',
    '!<rootDir>/src/routes/*',
    '!<rootDir>/.storybook/*',
    '!**/*.stories.tsx'
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['^.*index\\.ts$'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp)$': 'jest-transform-stub'
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.app.json',
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: './node_modules/ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_BASE_API_URL: 'https://mocked-api-url.com/api',
                    VITE_PAGINATION_API_URL: 'https://mocked-pagination-url.com'
                  }
                }
              }
            }
          ]
        }
      }
    ],
    '.+\\.(css|svg|webp|styl|less|sass|scss|png|jpg|otf|ttf|woff|woff2)$': 'jest-transform-stub'
  }
};

export default config;
