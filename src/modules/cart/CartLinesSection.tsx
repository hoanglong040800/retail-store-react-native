import { View } from 'react-native';
import { CartItemDto } from 'types';
import { CartItemList } from './cart-item';

type Props = {
  cartItems: CartItemDto[];
  viewOnly?: boolean;
};

const CartLinesSection = ({ cartItems, viewOnly }: Props) => {
  return (
    <View>
      <CartItemList cartItems={cartItems} viewOnly={viewOnly} />
    </View>
  );
};

export default CartLinesSection;
