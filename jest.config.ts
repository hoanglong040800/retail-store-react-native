import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'react-native',
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts', '**/*.tsx'],
  testEnvironment: 'jsdom', // default testEnv is node. https://stackoverflow.com/a/69228464/19568962
  setupFilesAfterEnv: ['<rootDir>/src/config/jest.setup.ts'],
  // https://stackoverflow.com/a/79345644/19568962
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],

  // fix issue can't find module
  moduleNameMapper: {
    '^expo-secure-store$': '<rootDir>/src/__mocks__/expo-secure-store.mock.ts',
  },
};

export default config;
