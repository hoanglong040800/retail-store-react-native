import { useSnackbar } from 'components';
import { useRecoilValue } from 'recoil';
import { authLogin } from 'service';
import { loginUserState } from 'states';
import { LoginBody, LoginDto } from 'types';
import { setStorageItems } from 'utils';

export const useAuth = () => {
  const loginUser = useRecoilValue(loginUserState);
  const { openSnackbar } = useSnackbar();

  // ---- Functions

  const login = async (body: LoginBody) => {
    try {
      if (!body) {
        throw new Error('No body found');
      }

      const resData = await authLogin(body);

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
    user: loginUser,
    login,
  };
};
