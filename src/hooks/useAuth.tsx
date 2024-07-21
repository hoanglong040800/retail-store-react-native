import { authLogin } from 'service';
import { LoginBody, LoginDto } from 'types';
import { setStorageItems } from 'utils';

export const useAuth = () => {
  // ---- Functions

  const login = async (body: LoginBody) => {
    try {
      if (!body) {
        throw new Error('No body found');
      }

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

    // TODO save token using expo-secure-store
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
