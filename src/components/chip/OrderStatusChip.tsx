import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Icon, Tooltip } from 'react-native-paper';
import { OrderStatusEnum } from 'types/enum';

type ChipProp = {
  text: string;
  color: string;
  textColor: string;
  icon: string;
  tooltip: string;
};

const contentByStatus: Record<OrderStatusEnum, ChipProp> = {
  [OrderStatusEnum.pending]: {
    text: 'Pending',
    color: 'darkgray',
    textColor: 'white',
    icon: 'clock-outline',
    tooltip: 'Default status when first checkout',
  },
  [OrderStatusEnum.awaitingFulfillment]: {
    text: 'Preparing',
    color: 'lightgoldenrodyellow',
    textColor: 'darkkhaki',
    icon: 'cart-arrow-down',
    tooltip: 'Wait for store clerks to prepare order',
  },
  [OrderStatusEnum.awaitingPayment]: {
    text: 'Payment',
    color: 'coral',
    textColor: 'navajowhite',
    icon: 'cash',
    tooltip: 'Wait for customer to pay in order to process. Its depend on delivery type',
  },
  [OrderStatusEnum.awaitingShipment]: {
    text: 'Shipment',
    color: 'lightskyblue',
    textColor: 'mintcream',
    icon: 'truck',
    tooltip: 'Finish fulfillment, wait for delivery. Customer may or may not need to pay at this step',
  },
  [OrderStatusEnum.done]: {
    text: 'Done',
    color: 'limegreen',
    textColor: 'white',
    icon: 'check',
    tooltip: 'Order is delivered and paid',
  },
  [OrderStatusEnum.cancelled]: {
    text: 'Cancelled',
    color: 'indianred',
    textColor: 'white',
    icon: 'cancel',
    tooltip: 'Order is either cancelled by store or customer',
  },
};

type Props = {
  orderStatus: OrderStatusEnum;
  onPress?: () => void;
};

const OrderStatusChip = ({ orderStatus, onPress }: Props) => {
  const content: ChipProp = useMemo(() => {
    const newContent: ChipProp = contentByStatus[orderStatus];

    if (!newContent) {
      return {
        text: 'Invalid Status',
        color: 'darkgray',
        textColor: 'white',
        icon: '',
        tooltip: 'Status is not valid',
      };
    }

    return newContent;
  }, [orderStatus]);

  const renderIcon = () => <Icon source={content.icon} size={13} color={content.textColor} />;

  return (
    <View style={styles.container}>
      <Tooltip title={content.tooltip} leaveTouchDelay={500}>
        <Chip
          onPress={onPress}
          icon={renderIcon}
          textStyle={[styles.text, { color: content.textColor }]}
          style={{ backgroundColor: content.color }}
          selectedColor={content.textColor}
        >
          {content.text}
        </Chip>
      </Tooltip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 120,
  },

  text: {},
});

export default OrderStatusChip;
