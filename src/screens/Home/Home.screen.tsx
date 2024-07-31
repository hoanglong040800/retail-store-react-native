import { useAuth, useModal } from 'hooks';
import { AllComponents, AuthModal } from 'modules';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      {user ? <Button onPress={logout}>Logout</Button> : <Button onPress={onOpen}>Login</Button>}

      <AllComponents />

      <AuthModal isOpen={isOpen} onClose={onClose} />
    </View>
  );
};

export default HomeScreen;
