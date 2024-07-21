import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from 'const';
import { StorageType } from 'types/storage.type';

export const setStorageItems = async (storageItems: StorageType): Promise<void> => {
  if (!storageItems) {
    return;
  }

  const asyncStorageParams: ReadonlyArray<readonly [string, string]> = Object.entries(storageItems).map(
    ([key, value]) => [key, JSON.stringify(value)]
  );

  if (ENV.TEST_MODE.LOG_ASYNC_STORAGE) {
    // eslint-disable-next-line no-console
    console.info('TEST: asyncStorageParams', asyncStorageParams);
  }

  await AsyncStorage.multiSet(asyncStorageParams);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStorageItem = async (key: keyof StorageType): Promise<any | null> => {
  if (!key) {
    return null;
  }

  const value = await AsyncStorage.getItem(key);

  return value ? JSON.parse(value) : null;
};
