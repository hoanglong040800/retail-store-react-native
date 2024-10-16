import { atom, selector } from 'recoil';
import { GetGlobalConfigDto, InUseCart, LoginUserDto, SelectedLocation } from 'types';
import { getStorageItem } from 'utils';

export const loginUserSelector = selector<LoginUserDto>({
  key: 'loginUserSelector',

  get: async () => {
    const user = await getStorageItem('user');
    return user;
  },
});

export const globalConfigState = atom<GetGlobalConfigDto>({
  key: 'globalConfigState',

  default: null,
});

export const selectedLocationSelector = selector<SelectedLocation>({
  key: 'selectedLocationSelector',

  get: async () => {
    const selectedLocation = await getStorageItem('selectedLocation');
    return selectedLocation;
  },
});

export const inUseCartState = atom<InUseCart>({
  key: 'InUseCartState',

  default: {
    cartItems: {},
  },
});
