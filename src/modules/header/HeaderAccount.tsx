import { DeModal } from 'components';
import { useAppNavigation, useAuth, useModal } from 'hooks';
import { AdminDivisionSelector } from 'modules/admin-division';
import { AuthModal } from 'modules/auth';
import { useMemo } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Avatar, Menu } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { globalConfigState } from 'states';
import { GetGlobalConfigDto, Screen } from 'types';

type MenuItem = {
  action: () => void;
  title: string;
};

const HeaderAccount = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const { deliveryProvinces } = useRecoilValue<GetGlobalConfigDto>(globalConfigState);
  const { isOpen: isOpenMenu, onOpen: onOpenMenu, onClose: onCloseMenu } = useModal();
  const { isOpen: isOpenLocation, onOpen: onOpenLocation, onClose: onCloseLocation } = useModal();
  const { user, logout } = useAuth();
  const { navigate } = useAppNavigation();

  const isLogin = useMemo(() => {
    return !!user;
  }, [user]);

  const avatarUri = useMemo(() => {
    return isLogin
      ? 'https://www.shareicon.net/data/512x512/2016/07/26/802001_man_512x512.png'
      : 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';
  }, [isLogin]);

  const anonymousMenuItems: MenuItem[] = [
    {
      action: onOpenLocation,
      title: 'Location',
    },
    {
      action: onOpen,
      title: 'Login',
    },
  ];

  const loginMenuItems: MenuItem[] = [
    {
      action: onOpenLocation,
      title: 'Location',
    },
    {
      action: () => navigate(Screen.OrderHistory),
      title: 'Order History',
    },
    {
      action: logout,
      title: 'Logout',
    },
  ];

  const displayMenuItems = useMemo(() => {
    return isLogin ? loginMenuItems : anonymousMenuItems;
  }, [isLogin, loginMenuItems, anonymousMenuItems]);

  return (
    <>
      <TouchableOpacity onPress={onOpenMenu}>
        <Avatar.Image
          size={30}
          source={{
            uri: avatarUri,
          }}
        />
      </TouchableOpacity>

      <Menu visible={isOpenMenu} onDismiss={onCloseMenu} anchor={{ y: 50, x: Dimensions.get('window').width }}>
        {displayMenuItems.map(({ action, title }) => (
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

      <DeModal isOpen={isOpenLocation} onClose={onCloseLocation} hideHeader>
        <AdminDivisionSelector provinces={deliveryProvinces} onClose={onCloseLocation} />
      </DeModal>
    </>
  );
};

export default HeaderAccount;
