import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'components';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { authLogin } from 'service';
import { loginUserSelector } from 'states';
import { LoginBody, LoginDto } from 'types';
import { STORAGE_KEYS } from 'types/storage.type';
import { removeStorageItems, setStorageItems } from 'utils';

export const useAuth = () => {
  // ---- Hooks
  const loginUser = useRecoilValue(loginUserSelector);
  // eslint-disable-next-line camelcase
  const refreshLoginUser = useRecoilRefresher_UNSTABLE(loginUserSelector);

  const { openSnackbar } = useSnackbar();

  // const { mutateAsync: authRegisterMutate } = useMutation({
  //   mutationFn: authRegister,
  // });

  const { mutateAsync: authLoginMutate } = useMutation({
    mutationFn: authLogin,
  });

  // ---- Functions

  const login = async (body: LoginBody) => {
    try {
      if (!body) {
        throw new Error('No body found');
      }

      const resData = await authLoginMutate(body);

      processAfterLogin(resData);
    } catch (error) {
      openSnackbar('error', 'Login failed. Please try again');
    }
  };

  const processAfterLogin = (loginData: LoginDto) => {
    if (!loginData) {
      throw new Error('Failed to login');
    }

    saveToStorage(loginData);
  };

  const saveToStorage = async (loginData: LoginDto) => {
    if (!loginData) {
      throw new Error('Failed to save to storage. No data found');
    }

    const { user, accessToken, refreshToken } = loginData;

    // TODO save token using expo-secure-store
    await setStorageItems({
      user,
      accessToken,
      refreshToken,
    });

    refreshLoginUser();
  };

  const logout = async (): Promise<void> => {
    processAfterLogout();
  };

  const processAfterLogout = () => {
    removeFromStorage();
  };

  const removeFromStorage = async () => {
    await removeStorageItems(STORAGE_KEYS.LOGIN);
    refreshLoginUser();
  };

  return {
    user: loginUser,
    login,
    logout,
  };
};
