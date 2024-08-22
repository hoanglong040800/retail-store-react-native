import { atom, selector } from 'recoil';
import { GetGlobalConfigDto, LoginUserDto } from 'types';
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
