import { StyleSheet, View } from 'react-native';
import { Divider, Surface, Text } from 'react-native-paper';
import { BASE_STYLE } from 'const';
import { CartCalculationDto } from 'types';
import { formatCurrency } from 'utils';

type Props = {
  cartCalculation: CartCalculationDto;
};

const CartSummary = ({ cartCalculation }: Props) => {
  return (
    <Surface style={styles.container}>
      <View style={styles.infoSection}>
        <View style={styles.infoLine}>
          <Text>Sub Total</Text>

          <Text>{formatCurrency(cartCalculation.subTotal)}</Text>
        </View>

        <View style={styles.infoLine}>
          <Text>Delivery Fee</Text>

          <Text>{formatCurrency(cartCalculation.shippingFee)}</Text>
        </View>

        <Divider />

        <View style={styles.infoLine}>
          <Text variant="bodyLarge">Total Amount</Text>

          <Text variant="bodyLarge">{formatCurrency(cartCalculation.totalAmount)}</Text>
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BASE_STYLE.SURFACE_DEFAULT,
  },

  infoSection: {
    gap: 8,
  },

  infoLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CartSummary;
