import { useAppNavigation, useCart } from 'hooks';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, IconButton } from 'react-native-paper';
import { Screen } from 'types';

const HeaderCart = () => {
  const { inUseCart } = useCart();
  const { route, navigate, goBack } = useAppNavigation();

  const total = useMemo((): number => {
    const totalItems = Object.keys(inUseCart.cartItems).length;

    return totalItems;
  }, [inUseCart.cartItems]);

  const handlePressViewCart = (): void => {
    if (route.name === Screen.Cart) {
      return goBack();
    }

    return navigate(Screen.Cart);
  };

  return (
    <View style={styles.container}>
      {!!total && (
        <Badge size={16} style={styles.badge}>
          {total}
        </Badge>
      )}

      <IconButton icon="cart" size={30} onPress={handlePressViewCart} style={styles.iconButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    maxHeight: 44,
  },

  badge: {
    position: 'absolute',
    right: 4,
  },

  iconButton: {
    backgroundColor: 'transparent',
    paddingBottom: 12,
  },
});

export default HeaderCart;
