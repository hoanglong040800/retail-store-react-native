import { useAuth, useModal } from 'hooks';
import { AuthModal } from 'modules';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const { user } = useAuth();

  return (
    <View>
      {user ? <Button onPress={() => null}>Logout</Button> : <Button onPress={onOpen}>Login</Button>}

      <AuthModal isOpen={isOpen} onClose={onClose} />
    </View>
  );
};

export default HomeScreen;
