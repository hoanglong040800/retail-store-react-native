/* eslint-disable camelcase */
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'components';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { authLogin, authRegister } from 'service';
import { loginUserSelector } from 'states';
import { LoginBody, LoginDto, RegisterBody } from 'types';
import { STORAGE_KEYS } from 'types/storage.type';
import { removeStorageItems, setStorageItems } from 'utils';

export const useAuth = () => {
  // ---- Hooks
  const loginUser = useRecoilValue(loginUserSelector);
  const refreshLoginUser = useRecoilRefresher_UNSTABLE(loginUserSelector);

  const { openSnackbar } = useSnackbar();

  const { mutateAsync: authRegisterMutate } = useMutation({
    mutationFn: authRegister,
  });

  const { mutateAsync: authLoginMutate } = useMutation({
    mutationFn: authLogin,
  });

  // ---- Functions

  const login = async (body: LoginBody, onSuccess?: () => void): Promise<void> => {
    try {
      if (!body) {
        throw new Error('No body found');
      }

      const resData = await authLoginMutate(body);

      processAfterLogin(resData);
      onSuccess?.();
    } catch (error) {
      openSnackbar('error', 'Login failed. Please try again');
    }
  };

  const processAfterLogin = async (loginData: LoginDto): Promise<void> => {
    if (!loginData) {
      throw new Error('Failed to login');
    }

    await saveToStorage(loginData);
  };

  const saveToStorage = async (loginData: LoginDto): Promise<void> => {
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

  const register = async (body: RegisterBody, onSuccess?: () => void): Promise<void> => {
    const failMessage = 'Register failed. Please try again';

    try {
      if (!body) {
        throw new Error('No body found');
      }

      const res = await authRegisterMutate(body);

      if (!res?.result) {
        openSnackbar('error', failMessage);
        return;
      }

      openSnackbar('success', 'Register successfully');

      await processAfterRegister(body);
      onSuccess?.();
    } catch (error) {
      openSnackbar('error', failMessage);
    }
  };

  const processAfterRegister = async (body: RegisterBody): Promise<void> => {
    if (!body) {
      throw new Error('No body found');
    }

    const loginBody: LoginBody = {
      email: body.email,
      password: body.password,
    };

    await login(loginBody);
  };

  const logout = async (): Promise<void> => {
    processAfterLogout();
  };

  const processAfterLogout = async (): Promise<void> => {
    await removeFromStorage();
  };

  const removeFromStorage = async (): Promise<void> => {
    await removeStorageItems(STORAGE_KEYS.LOGIN);
    refreshLoginUser();
  };

  return {
    user: loginUser,
    register,
    login,
    logout,
  };
};
