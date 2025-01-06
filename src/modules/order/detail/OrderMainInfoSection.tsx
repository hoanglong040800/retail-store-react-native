import { OrderStatusChip } from 'components/chip';
import { PAYMENT_OPTIONS } from 'const';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { OrderDto } from 'types/dto/order.dto';
import { formatDate, toTitleCase } from 'utils';

type Props = {
  order: Pick<OrderDto, 'id' | 'deliveryType' | 'address' | 'status' | 'createdAt' | 'paymentMethod'>;
};

const OrderMainInfoSection = ({ order }: Props) => {
  const curPaymentOption = PAYMENT_OPTIONS.find(po => po.method === order.paymentMethod) || null;

  if (!curPaymentOption) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <OrderStatusChip orderStatus={order.status} />

      <Text variant="titleMedium">
        Order Id: <Text>{order.id}</Text>
      </Text>

      <Text variant="titleMedium">
        {toTitleCase(order.deliveryType)} on{' '}
        <Text>
          {formatDate(order.createdAt, 'date')} {order.address && `at ${order.address}`}
        </Text>
      </Text>

      <View style={styles.payment}>
        <Icon source={curPaymentOption.icon} size={20} />

        <Text>{curPaymentOption.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },

  payment: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default OrderMainInfoSection;
