import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageType } from 'types/storage.type';

const useAsyncStorage = () => {
  // ---- Functions

  const setStorageItems = async (storageItems: StorageType): Promise<void> => {
    const asyncStorageParams: ReadonlyArray<readonly [string, string]> = Object.entries(storageItems).map(
      ([key, value]) => [key, JSON.stringify(value)]
    );

    await AsyncStorage.multiSet(asyncStorageParams);
  };

  return { setStorageItems };
};

export default useAsyncStorage;
