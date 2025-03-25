export default {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageProvider: 'v8',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@lib/(.*)': '<rootDir>/src/lib/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@helpers/(.*)': '<rootDir>/src/helpers/$1',
    '@interfaces': '<rootDir>/src/interfaces',
    '@constants': '<rootDir>/src/constants',
    '@stores/(.*)': '<rootDir>/src/stores/$1',
    '@mocks': '<rootDir>/src/mocks',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1'
  },
  roots: ['<rootDir>/src'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  }
};
