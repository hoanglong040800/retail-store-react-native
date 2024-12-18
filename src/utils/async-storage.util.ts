import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageType } from 'types';

export const setStorageItems = async (storageItems: StorageType): Promise<void> => {
  if (!storageItems) {
    return;
  }

  const asyncStorageParams: ReadonlyArray<readonly [string, string]> = Object.entries(storageItems).map(
    ([key, value]) => [key, JSON.stringify(value)]
  );

  await AsyncStorage.multiSet(asyncStorageParams);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStorageItem = async (key: keyof StorageType): Promise<any | null> => {
  if (!key) {
    return null;
  }

  const value = await AsyncStorage.getItem(key);

  return value && value !== 'undefined' ? JSON.parse(value) : null;
};

export const removeStorageItems = async (keys: (keyof StorageType)[]): Promise<void> => {
  if (!keys) {
    return;
  }

  await AsyncStorage.multiRemove(keys);
};

// only use when debug
export const printAsyncStorage = () => {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      const asyncStorage = {};

      stores.forEach((result, i, store) => {
        // eslint-disable-next-line prefer-destructuring
        asyncStorage[store[i][0]] = store[i][1];
      });

      // eslint-disable-next-line no-console
      console.table(asyncStorage);
    });
  });
};
