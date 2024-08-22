import { useAuth, useModal } from 'hooks';
import { AuthModal } from 'modules/auth';
import { useMemo } from 'react';
import { Button, ButtonProps } from 'react-native-paper';

type AuthModeType = {
  text: string;
  mode: ButtonProps['mode'];
  onPress: () => void;
};

const HeaderAccount = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const { user, logout } = useAuth();

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

  return (
    <>
      <Button mode={authMode.mode} onPress={authMode.onPress}>
        {authMode.text}
      </Button>

      <AuthModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default HeaderAccount;
