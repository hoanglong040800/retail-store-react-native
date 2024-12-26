import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Chip, Icon } from 'react-native-paper';
import { OrderStatusEnum } from 'types/enum';

type ChipProp = {
  text: string;
  color: string;
  textColor: string;
  icon: string;
};

const contentByStatus: Record<OrderStatusEnum, ChipProp> = {
  [OrderStatusEnum.pending]: {
    text: 'Pending',
    color: 'darkgray',
    textColor: 'white',
    icon: 'clock-outline',
  },
  [OrderStatusEnum.awaitingFulfillment]: {
    text: 'Preparing',
    color: 'lightgoldenrodyellow',
    textColor: 'darkkhaki',
    icon: 'cart-arrow-down',
  },
  [OrderStatusEnum.awaitingPayment]: {
    text: 'Payment',
    color: 'coral',
    textColor: 'navajowhite',
    icon: 'cash',
  },
  [OrderStatusEnum.awaitingShipment]: {
    text: 'Shipment',
    color: 'lightskyblue',
    textColor: 'mintcream',
    icon: 'truck',
  },
  [OrderStatusEnum.done]: {
    text: 'Done',
    color: 'limegreen',
    textColor: 'white',
    icon: 'check',
  },
  [OrderStatusEnum.cancelled]: {
    text: 'Cancelled',
    color: 'indianred',
    textColor: 'white',
    icon: 'cancel',
  },
};

type Props = {
  orderStatus: OrderStatusEnum;
  onPress?: () => void;
};

const OrderStatusChip = ({ orderStatus, onPress }: Props) => {
  const content = useMemo(() => contentByStatus[orderStatus], [orderStatus]);

  const renderIcon = () => <Icon source={content.icon} size={13} color={content.textColor} />;

  if (!content) {
    return (
      <Chip style={{ backgroundColor: 'gray' }} textStyle={{ color: 'white' }}>
        Invalid Status
      </Chip>
    );
  }

  return (
    <Chip
      onPress={onPress}
      icon={renderIcon}
      textStyle={[styles.text, { color: content.textColor }]}
      style={[styles.chip, { backgroundColor: content.color }]}
      selectedColor={content.textColor}
    >
      {content.text}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    width: '100%',
    maxWidth: 120,
    justifyContent: 'center',
  },

  text: {},
});

export default OrderStatusChip;
