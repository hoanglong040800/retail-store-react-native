import { selector } from 'recoil';
import { LoginUserDto } from 'types';
import { getStorageItem } from 'utils';

export const loginUserState = selector<LoginUserDto>({
  key: 'loginUserState',

  get: async () => {
    const storageUser: LoginUserDto = await getStorageItem('user');

    return storageUser;
  },
});
