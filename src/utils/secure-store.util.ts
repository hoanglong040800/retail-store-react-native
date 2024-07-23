/* eslint-disable @typescript-eslint/no-explicit-any */
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { SecureStoreType } from 'types';
import { getStorageItem, removeStorageItems, setStorageItems } from './async-storage.util';

export const setSecureStoreItems = async (secureStoreRecords: SecureStoreType): Promise<void> => {
  if (!secureStoreRecords) {
    return;
  }

  // Expo Secure Store API doesn't work for web
  if (Platform.OS === 'web') {
    await setStorageItems(secureStoreRecords);
    return;
  }

  const secureStoreKeys: string[] = Object.keys(secureStoreRecords);

  const promiseSetItems = secureStoreKeys.map((key: string) => {
    const strValue = JSON.stringify(secureStoreRecords[key]);
    return SecureStore.setItemAsync(key, strValue);
  });

  await Promise.all(promiseSetItems);
};

export const getSecureStoreItem = async (secureStoreKey: keyof SecureStoreType): Promise<any | null> => {
  if (!secureStoreKey) {
    return null;
  }

  if (Platform.OS === 'web') {
    return getStorageItem(secureStoreKey);
  }

  const value = await SecureStore.getItemAsync(secureStoreKey);
  const parsedValue = JSON.parse(value);
  return parsedValue;
};

export const removeSecureStoreItems = async (secureStoreKeys: (keyof SecureStoreType)[]): Promise<void> => {
  if (!secureStoreKeys || secureStoreKeys.length === 0) {
    return;
  }

  if (Platform.OS === 'web') {
    await removeStorageItems(secureStoreKeys);
    return;
  }

  const promiseRemoveItems = secureStoreKeys.map((key: string) => {
    return SecureStore.deleteItemAsync(key);
  });

  await Promise.all(promiseRemoveItems);
};
