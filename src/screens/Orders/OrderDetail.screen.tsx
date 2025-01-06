import { Route } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { BottomButton, BottomSheet, ChoiceList, ChoiceListType, ScreenAppBar, useBottomSheet } from 'components';
import { BASE_STYLE } from 'const';
import { useAuth } from 'hooks';
import { OrderMainInfoSection } from 'modules';
import { CartSummary } from 'modules/cart';
import CartLinesSection from 'modules/cart/CartLinesSection';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { getUserOrderDetail } from 'service';
import { GetUserOrderDetailDto, ParamsType, Screen } from 'types';
import { OrderActionEnum } from 'types/enum';
import { checkCanDoOrderAction } from 'utils';

type Params = Pick<ParamsType, 'orderId'>;

type Props = {
  route: Route<Screen.OrderDetail, Params>;
};

const OrderDetailScreen = ({
  route: {
    params: { orderId },
  },
}: Props) => {
  // ---- HOOKS ----
  const { user } = useAuth();
  const { botSheetRef, onOpenBotSheet } = useBottomSheet({});

  const { data, isLoading: isFetching } = useQuery<GetUserOrderDetailDto, null, GetUserOrderDetailDto>({
    queryKey: ['orderDetail'],
    queryFn: () => getUserOrderDetail({ userId: user.id, orderId }),
  });

  // ------- FUNCTIONS --------

  const handleClickActions = () => {
    onOpenBotSheet();
  };

  const actionList: ChoiceListType[] = [
    {
      text: 'Edit',
      value: 'edit',
      disabled: !checkCanDoOrderAction(OrderActionEnum.editCart, data?.order?.status),
      onPress: () => {},
    },
    {
      text: 'Cancel',
      value: 'cancel',
      mode: 'text',
      textColor: 'red',
      disabled: !checkCanDoOrderAction(OrderActionEnum.cancel, data?.order?.status),
      onPress: () => {},
    },
  ];

  // ------- RENDER --------

  if (!data?.order && isFetching) {
    return <Text>Loading...</Text>;
  }

  if (!data?.order) {
    return <Text>Order not found</Text>;
  }

  return (
    <View style={styles.container}>
      <ScreenAppBar title="Order History" />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainer}>
        <Surface style={styles.surface}>
          <OrderMainInfoSection order={data.order} />
        </Surface>

        <Surface style={styles.surface}>
          <CartSummary cartCalculation={data.order.calculation} />
        </Surface>

        <Surface style={styles.surface}>
          <CartLinesSection cartItems={data.order.cart?.cartItems} viewOnly />
        </Surface>
      </ScrollView>

      <BottomButton text="Actions" onPress={handleClickActions} />

      <BottomSheet botSheetRef={botSheetRef}>
        <ChoiceList list={actionList} selectedValue="" onChange={() => {}} />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...BASE_STYLE.CONTAINER_WRAP_BOT_BTN, paddingHorizontal: 8 },

  scrollView: {
    ...BASE_STYLE.SCROLL_VIEW_BOT_BTN,

    // 40 is screen appbar height
    maxHeight: (BASE_STYLE.SCROLL_VIEW_BOT_BTN.maxHeight as number) - 40,
  },

  scrollViewContentContainer: {
    gap: 16,
  },

  surface: BASE_STYLE.SURFACE_DEFAULT,
});

export default OrderDetailScreen;
