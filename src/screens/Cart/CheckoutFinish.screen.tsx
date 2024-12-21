import { Route } from '@react-navigation/native';
import { BottomButton } from 'components';
import { BASE_STYLE, PAYMENT_OPTIONS } from 'const';
import { useAppNavigation } from 'hooks';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { selectedLocationSelector } from 'states';
import { ParamsType, PaymentOptionType, PaymentType, Screen } from 'types';
import { DeliveryTypeEnum } from 'types/enum';
import { getPaymentTypeByMethod } from 'utils';

const textByDeliveryMethod: Record<DeliveryTypeEnum, DeliveryContent> = {
  [DeliveryTypeEnum.delivery]: {
    icon: 'truck-delivery-outline',
    title: 'Your order will be prepared and will be delivered',
    deliveryTime: 'within 2 hours',
    address: 'to address',
  },

  [DeliveryTypeEnum.pickup]: {
    icon: 'store-check',
    title: 'Your order will be prepared and ready to pickup',
    deliveryTime: 'within 2 hours',
    address: 'at store',
  },
};

const textByPaymentType: Record<PaymentType, { default: string }> = {
  [PaymentType.online]: {
    default: 'Your payment is already charged',
  },

  [PaymentType.offline]: {
    default: 'Your payment will be charged at the store',
  },
};

type DeliveryContent = {
  icon: string;
  title: string;
  deliveryTime: string;
  address: string;
};

type PaymentMethodContent = PaymentOptionType & {
  paymentStatusText: string;
};

type Params = Pick<ParamsType, 'checkoutFinish'>;

type Props = {
  route: Route<Screen.CheckoutFinish, Params>;
};

const CheckoutFinishScreen = ({
  route: {
    params: { checkoutFinish: pageParams },
  },
}: Props) => {
  const selectedLocation = useRecoilValue(selectedLocationSelector);
  const { navigate } = useAppNavigation();

  const contentObj: DeliveryContent = useMemo(() => {
    const selectedContent: DeliveryContent = textByDeliveryMethod[pageParams.deliveryType];

    const { name: branchName, ward, district, province } = pageParams.selectedBranch;

    const fullStoreAddress = `${branchName}, ${ward?.fullname}, ${district?.fullname}, ${province?.fullname}`;

    const customerAddress = pageParams.address
      ? ` ${pageParams.address}, ${selectedLocation.ward.fullname}, ${selectedLocation.district.fullname}, ${selectedLocation.province.fullname}`
      : '';

    if (pageParams.deliveryType === DeliveryTypeEnum.delivery) {
      selectedContent.address += ` ${customerAddress}`;
    } else {
      selectedContent.address += ` ${fullStoreAddress}`;
    }

    return selectedContent;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParams]);

  const paymentText: PaymentMethodContent = useMemo(() => {
    const baseContent = PAYMENT_OPTIONS.find(({ method }) => method === pageParams.paymentMethod);

    const paymentType = getPaymentTypeByMethod(pageParams.paymentMethod);

    const paymentStatusText = textByPaymentType[paymentType]?.default || '';

    return {
      ...baseContent,
      paymentStatusText,
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParams]);

  const handlePressGoHomeBtn = () => {
    navigate(Screen.Home);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContentSec}>
        <Text variant="headlineSmall" style={styles.titleText}>
          Thank you for shopping at Retail Store
        </Text>

        <View style={styles.deliveryMethodText}>
          <Text variant="bodyLarge">{contentObj.title}</Text>

          <View style={styles.contentText}>
            <Icon source={contentObj.icon} size={25} />
            <Text variant="titleLarge">{contentObj.deliveryTime}</Text>
          </View>

          <View style={styles.contentText}>
            <Icon source="map-marker" size={25} />
            <Text variant="titleLarge">{contentObj.address}</Text>
          </View>

          <View style={styles.contentText}>
            <Icon source={paymentText.icon} size={25} />
            <Text variant="titleLarge">{paymentText.paymentStatusText}</Text>
          </View>
        </View>
      </View>

      <BottomButton text="Go Home" onPress={handlePressGoHomeBtn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BASE_STYLE.CONTAINER_WRAP_BOT_BTN,
    flex: 1,
    padding: 32,
  },

  mainContentSec: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    marginBottom: 28,
  },

  deliveryMethodText: {
    gap: 8,
  },

  contentText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  actionButton: {
    marginTop: 32,
  },
});

export default CheckoutFinishScreen;
