import { DeModal } from 'components';
import { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';
import { toTitleCase } from 'utils';
import { LoginContent, RegisterContent } from 'modules/auth';
import { StyleSheet } from 'react-native';

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

  const handleSubmitRegister = async (): Promise<void> => {};

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
    <DeModal isOpen={isOpen} onClose={onClose} title={toTitleCase(authMode)} contentStyles={styles.modalContent}>
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
    marginBottom: 12,
  },

  modalContent: {
    padding: 12,
  },
});

export default AuthModal;
