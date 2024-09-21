import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useAuth, useModal } from 'hooks';
import { AuthModal } from 'modules/auth';
import { useGoogleAuth } from 'modules/auth/_shared/useGoogleAuth.hooks';
import { useEffect, useMemo } from 'react';
import { ButtonProps } from 'react-native-paper';

type AuthModeType = {
  text: string;
  mode: ButtonProps['mode'];
  onPress: () => void;
};

const HeaderAccount = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const { user, logout } = useAuth();
  const { initConfig, loginGoogle } = useGoogleAuth();

  const authMode = useMemo((): AuthModeType => {
    if (user) {
      return {
        text: 'Logout',
        mode: 'elevated',
        onPress: logout,
      };
    }

    return {
      text: 'Login',
      mode: 'contained-tonal',
      onPress: onOpen,
    };
  }, [user, logout, onOpen]);

  useEffect(() => {
    initConfig();
  }, []);

  return (
    <>
      {/* <Button mode={authMode.mode} onPress={authMode.onPress}>
        {authMode.text}
      </Button> */}

      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={loginGoogle}
      />

      <AuthModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default HeaderAccount;
