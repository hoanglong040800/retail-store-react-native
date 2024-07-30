import { useAuth, useModal } from 'hooks';
import { AuthModal } from 'modules';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { getAllUsers } from 'service';

const HomeScreen = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const { user, logout } = useAuth();

  const fetchUser = async () => {
    await getAllUsers();
  };

  return (
    <View>
      {user ? <Button onPress={logout}>Logout</Button> : <Button onPress={onOpen}>Login</Button>}

      <Button onPress={fetchUser}>Fetch user</Button>

      <AuthModal isOpen={isOpen} onClose={onClose} />
    </View>
  );
};

export default HomeScreen;
