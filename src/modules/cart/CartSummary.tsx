import { StyleSheet, View } from 'react-native';
import { Divider, Surface, Text } from 'react-native-paper';
import { BASE_STYLE } from 'const';

const CartSummary = () => {
  return (
    <Surface style={styles.container}>
      <View style={styles.infoSection}>
        <View style={styles.infoLine}>
          <Text>Total Cart</Text>

          <Text>123</Text>
        </View>

        <View style={styles.infoLine}>
          <Text>Delivery Fee</Text>

          <Text>0</Text>
        </View>

        <Divider />

        <View style={styles.infoLine}>
          <Text variant="bodyLarge">Total Amount</Text>

          <Text variant="bodyLarge">566</Text>
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
