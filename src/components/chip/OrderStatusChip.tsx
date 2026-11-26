import { AppColors } from 'const';
import { useAppTheme } from 'hooks';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Icon, Tooltip } from 'react-native-paper';
import { OrderStatusEnum } from 'types/enum';

type ColorRole = keyof Omit<AppColors, 'elevation'>;

type ChipProp = {
  text: string;
  color: ColorRole;
  textColor: ColorRole;
  icon: string;
  tooltip: string;
};

const contentByStatus: Record<OrderStatusEnum, ChipProp> = {
  [OrderStatusEnum.pending]: {
    text: 'Pending',
    color: 'surfaceVariant',
    textColor: 'onSurfaceVariant',
    icon: 'clock-outline',
    tooltip: 'Default status when first checkout',
  },
  [OrderStatusEnum.awaitingFulfillment]: {
    text: 'Preparing',
    color: 'secondaryContainer',
    textColor: 'onSecondaryContainer',
    icon: 'cart-arrow-down',
    tooltip: 'Wait for store clerks to prepare order',
  },
  [OrderStatusEnum.awaitingPayment]: {
    text: 'Payment',
    color: 'warningContainer',
    textColor: 'onWarningContainer',
    icon: 'cash',
    tooltip: 'Wait for customer to pay in order to process. Its depend on delivery type',
  },
  [OrderStatusEnum.awaitingShipment]: {
    text: 'Shipment',
    color: 'infoContainer',
    textColor: 'onInfoContainer',
    icon: 'truck',
    tooltip: 'Finish fulfillment, wait for delivery. Customer may or may not need to pay at this step',
  },
  [OrderStatusEnum.done]: {
    text: 'Done',
    color: 'successContainer',
    textColor: 'onSuccessContainer',
    icon: 'check',
    tooltip: 'Order is delivered and paid',
  },
  [OrderStatusEnum.cancelled]: {
    text: 'Cancelled',
    color: 'errorContainer',
    textColor: 'onErrorContainer',
    icon: 'cancel',
    tooltip: 'Order is either cancelled by store or customer',
  },
};

type Props = {
  orderStatus: OrderStatusEnum;
  onPress?: () => void;
};

const OrderStatusChip = ({ orderStatus, onPress }: Props) => {
  const { colors } = useAppTheme();
  const content: ChipProp = useMemo(() => {
    const newContent: ChipProp = contentByStatus[orderStatus];

    if (!newContent) {
      return {
        text: 'Invalid Status',
        color: 'surfaceVariant',
        textColor: 'onSurfaceVariant',
        icon: '',
        tooltip: 'Status is not valid',
      };
    }

    return newContent;
  }, [orderStatus]);

  const textColor = colors[content.textColor];
  const renderIcon = () => <Icon source={content.icon} size={16} color={textColor} />;

  return (
    <View style={styles.container}>
      <Tooltip title={content.tooltip} leaveTouchDelay={500}>
        <Chip
          onPress={onPress}
          icon={renderIcon}
          textStyle={[styles.text, { color: textColor }]}
          style={{ backgroundColor: colors[content.color] }}
          selectedColor={textColor}
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
