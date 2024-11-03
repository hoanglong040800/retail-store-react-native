import { BASE_STYLE } from 'const';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { CartItemDto } from 'types';
import { CartItemList } from './cart-item';

type Props = {
  cartItems: CartItemDto[];
};

const CartLinesSection = ({ cartItems }: Props) => {
  return (
    <Surface style={styles.container}>
      <Text variant="headlineSmall">Cart Lines</Text>

      <View>
        <CartItemList cartItems={cartItems} />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BASE_STYLE.SURFACE_DEFAULT,
  },
});

export default CartLinesSection;
