import { NumericInput } from 'components';
import { useCart } from 'hooks';
import { useMemo } from 'react';
import { SIZE } from 'const';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { ProductDto } from 'types';

type Props = {
  product: Pick<ProductDto, 'id' | 'name'>;
  offsetQuantity?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

const ProductActionButtons = ({ product, offsetQuantity = 1, containerStyle }: Props) => {
  const { inUseCart, adjustQuantity } = useCart();

  const inCartQuantity = useMemo(
    () => {
      return inUseCart.cartItems[product.id]?.quantity || 0;
    },
    // object will create new address each render -> re-render n cart item's times
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(inUseCart.cartItems?.[product.id]), product.id]
  );

  const handlePressAddCart = () => {
    adjustQuantity({ productId: product.id, quantity: offsetQuantity, productName: product.name });
  };

  const handleAdjustQuantity = (newVal: number) => {
    adjustQuantity({ productId: product.id, quantity: newVal, productName: product.name });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {inCartQuantity === 0 ? (
        <Button
          mode="contained-tonal"
          icon="cart-plus"
          style={styles.addToCart}
          contentStyle={styles.addToCartContent}
          onPress={handlePressAddCart}
        >
          Add
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
    height: SIZE.locationChipHeight,
  },

  addToCart: {
    flex: 1,
  },

  addToCartContent: {
    height: SIZE.locationChipHeight,
  },
});

export default ProductActionButtons;
