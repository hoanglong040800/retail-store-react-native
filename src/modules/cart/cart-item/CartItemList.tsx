import { Divider, Text } from 'react-native-paper';
import { Fragment } from 'react';
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
      {cartItems.map((cartItem, index) => (
        <Fragment key={cartItem.id}>
          {index > 0 && <Divider />}
          <CartItem item={cartItem} viewOnly={viewOnly} />
        </Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {},
});

export default CartItemList;
