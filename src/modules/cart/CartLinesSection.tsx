import { View } from 'react-native';
import { CartItemDto } from 'types';
import { CartItemList } from './cart-item';

type Props = {
  cartItems: CartItemDto[];
};

const CartLinesSection = ({ cartItems }: Props) => {
  return (
    <View>
      <CartItemList cartItems={cartItems} />
    </View>
  );
};

export default CartLinesSection;
