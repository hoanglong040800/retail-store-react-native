import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin';
import { ENV } from 'const';
import { Platform } from 'react-native';

export const useGoogleAuth = () => {
  const initConfigWeb = () => {
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://accounts.google.com/gsi/client';
    scriptTag.async = true;
    scriptTag.onload = () => {};
    scriptTag.onerror = () => {
      console.error('Failed to load Google One-tap script');
    };

    document.body.appendChild(scriptTag);
  };

  const initConfigNative = () => {
    GoogleSignin.configure({
      webClientId: ENV.OAUTH.WEB.CLIENT_ID,
      iosClientId: ENV.OAUTH.IOS.CLIENT_ID,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });
  };

  const initConfig = (): void => {
    if (Platform.OS === 'web') {
      return initConfigWeb();
    }

    return initConfigNative();
  };

  const handleSigninError = (error: { code: any }) => {
    let errorMessage = 'Something went wrong';

    switch (error.code) {
      case statusCodes.SIGN_IN_REQUIRED:
        errorMessage = 'Sign in required';
        break;

      case statusCodes.SIGN_IN_CANCELLED:
        errorMessage = 'Sign in cancelled';
        break;

      case statusCodes.IN_PROGRESS:
        errorMessage = 'Sign in in progress';
        break;

      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        errorMessage = 'Play services not available';
        break;

      default:
        break;
    }

    throw new Error(errorMessage);
  };

  const loginGoogle = async (): Promise<User> => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo: User = await GoogleSignin.signIn();

      if (!userInfo?.idToken) {
        throw new Error('ID_TOKEN_NOT_FOUND');
      }

      await authenIdTokenWithGoogle(userInfo.idToken);

      return userInfo;
    } catch (error) {
      handleSigninError(error);
    }
  };

  const authenIdTokenWithGoogle = async (idToken: string) => {
    // TODO
  };

  return {
    initConfig,
    loginGoogle,
  };
};
