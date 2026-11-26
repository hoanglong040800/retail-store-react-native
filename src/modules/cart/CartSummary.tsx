import { SPACE } from 'const';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { CartCalculationDto } from 'types';
import { formatCurrency } from 'utils';

type Props = {
  cartCalculation: CartCalculationDto;
};

const CartSummary = ({ cartCalculation }: Props) => {
  return (
    <View>
      <View style={styles.infoSection}>
        <View style={styles.infoLine}>
          <Text variant="bodyMedium">Sub Total</Text>

          <Text variant="bodyMedium">{formatCurrency(cartCalculation.subTotal)}</Text>
        </View>

        <View style={styles.infoLine}>
          <Text variant="bodyMedium">Delivery Fee</Text>

          <Text variant="bodyMedium">{formatCurrency(cartCalculation.shippingFee)}</Text>
        </View>

        <Divider />

        <View style={styles.infoLine}>
          <Text variant="titleMedium">Total Amount</Text>

          <Text variant="titleMedium">{formatCurrency(cartCalculation.totalAmount)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    gap: SPACE.xs,
  },

  infoLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CartSummary;
