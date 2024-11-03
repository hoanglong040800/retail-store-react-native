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
    </View>
  );
};

const styles = StyleSheet.create({
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
