import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '!**/*.utils.test.ts', '!**/*.generic.test.ts'],
  testPathIgnorePatterns: ['./dist'],
};

export default config;
