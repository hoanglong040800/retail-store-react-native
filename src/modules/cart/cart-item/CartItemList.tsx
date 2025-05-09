import { Text } from 'react-native-paper';
import { ScrollView, StyleSheet } from 'react-native';
import { CartItemDto } from 'types';
import { CartItem } from '.';

type Props = {
  cartItems: CartItemDto[];
  viewOnly?: boolean;
};

const CartItemList = ({ cartItems, viewOnly }: Props) => {
  if (!cartItems || cartItems.length === 0) {
    return <Text>Cart is empty. Let&lsquo;s browse and add some items!</Text>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {cartItems.map(cartItem => (
        <CartItem key={cartItem.id} item={cartItem} viewOnly={viewOnly} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    gap: 16,
  },
});

export default CartItemList;
