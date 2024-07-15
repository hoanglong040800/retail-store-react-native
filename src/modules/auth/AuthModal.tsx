import { DeModal } from 'components';
import { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';

type AuthModeType = 'login' | 'register';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal = ({ isOpen, onClose }: Props) => {
  const [authMode, setAuthMode] = useState<AuthModeType>('login');

  const handleChangeAuthMode = (authModeParam: AuthModeType) => {
    setAuthMode(authModeParam);
  };

  return (
    <DeModal isOpen={isOpen} onClose={onClose} title={authMode}>
      <>
        <SegmentedButtons
          value={authMode}
          multiSelect={false}
          onValueChange={handleChangeAuthMode}
          buttons={[
            { value: 'login', label: 'Login' },
            { value: 'register', label: 'Register' },
          ]}
        />

        {/* TODO render dynamic body content */}
      </>
    </DeModal>
  );
};

export default AuthModal;
