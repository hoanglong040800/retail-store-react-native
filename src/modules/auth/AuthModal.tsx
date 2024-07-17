import { DeModal } from 'components';
import { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';
import { toTitleCase } from 'utils';
import { LoginContent, RegisterContent } from 'modules/auth';
import { StyleSheet } from 'react-native';
import { RegisterBody } from 'types/input';
import { authRegister } from 'service';
import { RegisterForm } from './_shared';

type AuthModeType = 'login' | 'register';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal = ({ isOpen, onClose }: Props) => {
  const [authMode, setAuthMode] = useState<AuthModeType>('register');

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
        // TODO show snackbar fail
      }

      const registerBody: RegisterBody = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      await authRegister(registerBody);

      // TODO show success snackbar
    } catch (error) {
      // TODO show snackbar
    }
  };

  const renderContent = (authModePar: AuthModeType): JSX.Element => {
    switch (authModePar) {
      case 'login':
        return <LoginContent />;

      case 'register':
        return <RegisterContent onSubmit={handleSubmitRegister} />;

      default:
        return null;
    }
  };

  return (
    <DeModal isOpen={isOpen} onClose={onClose} title={toTitleCase(authMode)}>
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

        {renderContent(authMode)}
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
