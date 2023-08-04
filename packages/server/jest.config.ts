import { JestConfigWithTsJest } from 'ts-jest';

/* eslint-disable */
export default {
  displayName: 'server',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/server',
  moduleNameMapper: {
    "^@modules/(.*)$": ["<rootDir>/src/modules/$1"],
    "^@shared/(.*)$": ["<rootDir>/src/shared/$1"],
    "^@common/(.*)$": ["<rootDir>/../common/src/$1"]
  },
} as JestConfigWithTsJest;
