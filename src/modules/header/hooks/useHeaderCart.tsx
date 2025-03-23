import { THEME } from 'const';
import { useAppNavigation, useCart } from 'hooks';
import { useCallback, useMemo } from 'react';
import { TextInput } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { Screen } from 'types';

export const useHeaderCart = () => {
  const { route, navigate, goBack } = useAppNavigation();
  const { inUseCart } = useCart();

  const totalCartItems = useMemo((): number => {
    const totalItems = Object.keys(inUseCart.cartItems).length;

    return totalItems;
  }, [inUseCart.cartItems]);

  const handlePressViewCart = (): void => {
    if (route.name === Screen.Cart) {
      return goBack();
    }

    return navigate(Screen.Cart);
  };

  const renderCart = useCallback(() => {
    const icon: IconSource = totalCartItems ? 'cart' : 'cart-outline';
    const color: string = totalCartItems ? THEME.colors.primary : 'gray';

    return <TextInput.Icon icon={icon} size={24} color={color} onPress={handlePressViewCart} />;
  }, [totalCartItems]);

  return {
    renderCart,
  };
};
