import { authLogin } from 'service';
import { LoginBody, LoginDto } from 'types';
import useAsyncStorage from './useAsyncStorage';

export const useAuth = () => {
  const { setStorageItems } = useAsyncStorage();

  const login = async (body: LoginBody) => {
    try {
      const resData = await authLogin(body);

      processAfterLogin(resData);
    } catch (error) {
      console.error(error);
    }
  };

  const processAfterLogin = (loginData: LoginDto) => {
    if (!loginData) {
      throw new Error('Failed to login');
    }

    saveToStorage(loginData);
  };

  const saveToStorage = (loginData: LoginDto) => {
    if (!loginData) {
      throw new Error('Failed to save to storage. No data found');
    }

    const { user, accessToken, refreshToken } = loginData;

    setStorageItems({
      user,
      accessToken,
      refreshToken,
    });
  };

  return {
    login,
  };
};
