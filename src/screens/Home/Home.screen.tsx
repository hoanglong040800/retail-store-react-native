import { useModal } from 'hooks';
import { AuthModal } from 'modules/auth';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = () => {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <View>
      <Button onPress={onOpen}>Login</Button>

      <AuthModal isOpen={isOpen} onClose={onClose} />
    </View>
  );
};

export default HomeScreen;
