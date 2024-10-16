import { NumericInput } from 'components';
import { useCart } from 'hooks';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  productId: string;
  offsetQuantity: number;
};

const ProductActionButtons = ({ productId, offsetQuantity = 1 }: Props) => {
  const { inUseCart, adjustQuantity } = useCart();

  const inCartQuantity = useMemo(() => {
    return inUseCart.cartItems[productId]?.quantity || 0;
  }, [inUseCart.cartItems[productId]]);

  const handlePressAddCart = () => {
    adjustQuantity(productId, offsetQuantity);
  };

  const handleAdjustQuantity = (newVal: number) => {
    adjustQuantity(productId, newVal);
  };

  return (
    <View style={styles.container}>
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
