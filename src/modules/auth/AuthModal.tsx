import { DeModal, useSnackbar } from 'components';
import { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';
import { toTitleCase } from 'utils';
import { LoginContent, RegisterContent } from 'modules/auth';
import { StyleSheet, ViewStyle } from 'react-native';
import { LoginBody, RegisterBody } from 'types';
import { useAuth } from 'hooks';
import { LoginForm, RegisterForm } from './_shared';

type AuthModeType = 'login' | 'register';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal = ({ isOpen, onClose }: Props) => {
  const [authMode, setAuthMode] = useState<AuthModeType>('register');

  // -- Hooks

  const { openSnackbar } = useSnackbar();
  const { login, register } = useAuth();

  // -- Functions

  const handleChangeAuthMode = (authModeParam: AuthModeType) => {
    setAuthMode(authModeParam);
  };

  const validateRegisterForm = ({ password, confirmPassword }: RegisterForm): boolean => {
    if (password !== confirmPassword) {
      return false;
    }

    return true;
  };

  const handleSubmitRegister = async (formData: RegisterForm): Promise<void> => {
    try {
      if (!validateRegisterForm(formData)) {
        openSnackbar('error', 'Form validate failed. Please check again');
      }

      const registerBody: RegisterBody = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      await register(registerBody, onClose);
    } catch (error) {
      openSnackbar('error', 'Register failed. Please try again');
    }
  };

  const handleSubmitLogin = async (formData: LoginForm): Promise<void> => {
    const loginBody: LoginBody = {
      email: formData.email,
      password: formData.password,
    };

    await login(loginBody, onClose);
  };

  // -- Render

  const getContainerStyle = (curAuthMode: AuthModeType): ViewStyle => {
    const isHide = curAuthMode !== authMode;

    return {
      display: isHide ? 'none' : 'flex',
    };
  };

  return (
    <DeModal isOpen={isOpen} onClose={onClose} title={toTitleCase(authMode)} isHideHeaderButton>
      <>
        <SegmentedButtons
          value={authMode}
          multiSelect={false}
          onValueChange={handleChangeAuthMode}
          buttons={[
            { value: 'login', label: 'Login' },
            { value: 'register', label: 'Register' },
          ]}
          style={styles.authModeSegment}
        />

        {/* Content */}
        <>
          <LoginContent containerStyle={getContainerStyle('login')} onSubmit={handleSubmitLogin} />

          <RegisterContent onSubmit={handleSubmitRegister} containerStyle={getContainerStyle('register')} />
        </>
      </>
    </DeModal>
  );
};

const styles = StyleSheet.create({
  authModeSegment: {
    padding: 12,
  },
});

export default AuthModal;
