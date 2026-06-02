import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  // This maps the @/* paths correctly in your test environment
  moduleNameMapper: pathsToModuleNameMapper({
    '@/*': ['./src/*']
  }, { prefix: '<rootDir>/' }),
};

export default config;