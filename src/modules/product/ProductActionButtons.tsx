import { NumericInput } from 'components';
import { useCart } from 'hooks';
import { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  productId: string;
  productName?: string;
  offsetQuantity?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

// TODO long.t refactor to receive whole product object
const ProductActionButtons = ({ productId, productName, offsetQuantity = 1, containerStyle }: Props) => {
  const { inUseCart, adjustQuantity } = useCart();

  const inCartQuantity = useMemo(
    () => {
      return inUseCart.cartItems[productId]?.quantity || 0;
    },
    // object will create new address each render -> re-render n cart item's times
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(inUseCart.cartItems?.[productId]), productId]
  );

  const handlePressAddCart = () => {
    adjustQuantity({ productId, quantity: offsetQuantity, productName });
  };

  const handleAdjustQuantity = (newVal: number) => {
    adjustQuantity({ productId, quantity: newVal, productName });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {inCartQuantity === 0 ? (
        <Button mode="outlined" style={styles.addToCart} onPress={handlePressAddCart}>
          Add to cart
        </Button>
      ) : (
        <NumericInput value={inCartQuantity} offset={offsetQuantity} onChange={handleAdjustQuantity} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 40,
  },

  addToCart: {
    flex: 1,
    height: '100%',
  },
});

export default ProductActionButtons;
