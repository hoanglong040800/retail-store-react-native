import { useAppNavigation, useAuth, useModal } from 'hooks';
import { AuthModal } from 'modules/auth';
import { useMemo } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Avatar, Button, ButtonProps, Menu } from 'react-native-paper';
import { Screen } from 'types';

type AuthModeType = {
  text: string;
  mode: ButtonProps['mode'];
  onPress: () => void;
};

const HeaderAccount = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const { isOpen: isOpenMenu, onOpen: onOpenMenu, onClose: onCloseMenu } = useModal();
  const { user, logout } = useAuth();
  const { navigate } = useAppNavigation();

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

  const menuItems: { action: () => void; title: string }[] = [
    {
      action: () => navigate(Screen.OrderHistory),
      title: 'Order History',
    },
    {
      action: logout,
      title: 'Logout',
    },
  ];

  return (
    <>
      {authMode.text === 'Login' ? (
        <Button mode={authMode.mode} onPress={authMode.onPress}>
          {authMode.text}
        </Button>
      ) : (
        <TouchableOpacity onPress={onOpenMenu}>
          <Avatar.Image
            size={30}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
            }}
          />
        </TouchableOpacity>
      )}

      <Menu visible={isOpenMenu} onDismiss={onCloseMenu} anchor={{ y: 50, x: Dimensions.get('window').width }}>
        {menuItems.map(({ action, title }) => (
          <Menu.Item
            key={title}
            onPress={() => {
              action();
              onCloseMenu();
            }}
            title={title}
          />
        ))}
      </Menu>

      <AuthModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default HeaderAccount;
