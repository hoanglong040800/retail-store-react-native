import { useCart } from 'hooks';
import { StyleSheet, View } from 'react-native';
import { Badge, IconButton } from 'react-native-paper';

const HeaderCart = () => {
  const { cartProperties } = useCart();

  const handlePressViewCart = () => {};

  return (
    <View style={styles.container}>
      <Badge size={18} style={styles.badge}>
        {cartProperties.totalItems}
      </Badge>

      <IconButton icon="cart" size={25} onPress={handlePressViewCart} style={styles.iconButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  badge: {
    position: 'absolute',
  },

  iconButton: {
    backgroundColor: 'transparent',
  },
});

export default HeaderCart;
