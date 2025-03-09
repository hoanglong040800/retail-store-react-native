/* eslint-disable global-require */

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-secure-store');

jest.mock('react-native-gesture-handler');
