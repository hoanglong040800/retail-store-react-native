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
    console.log('TEST: asyncStorageParams', asyncStorageParams);
  }

  await AsyncStorage.multiSet(asyncStorageParams);
};
