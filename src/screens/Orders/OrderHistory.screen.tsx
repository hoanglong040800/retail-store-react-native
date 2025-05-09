import { useQuery } from '@tanstack/react-query';
import { AppTable, BottomSheet, ChoiceList, ChoiceListType, TableColumnConfig, useBottomSheet } from 'components';
import { OrderStatusChip } from 'components/chip';
import { useAppNavigation, useAuth } from 'hooks';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { getUserOrders } from 'service';
import { GetUserOrdersDto, Screen, UserOrderDto } from 'types';
import { OrderActionEnum, OrderStatusEnum } from 'types/enum';
import { checkCanDoOrderAction, formatCurrency, formatDate } from 'utils';

const OrderHistoryScreen = () => {
  // ---- HOOKS ----
  const { user } = useAuth();
  const { navigate } = useAppNavigation();
  const { onOpenBotSheet, botSheetRef } = useBottomSheet({});
  const [curRowBotSheet, setCurRowBotSheet] = useState<UserOrderDto>(null);

  const { data: userOrders, isLoading: isFetching } = useQuery<GetUserOrdersDto, null, GetUserOrdersDto>({
    queryKey: ['userOrders'],
    queryFn: () => getUserOrders(user.id),
  });

  const tableColumnConfig: TableColumnConfig<UserOrderDto>[] = [
    {
      title: 'Order ID',
      field: 'id',
      flex: 0.5,
    },
    {
      title: 'Placed At',
      field: 'createdAt',
      render: value => formatDate(value as string, 'datetime'),
    },
    {
      title: 'Total Amount',
      field: 'cart.calculation.totalAmount',
      render: value => formatCurrency(value as number),
    },
    {
      title: 'Status',
      field: 'status',
      render: value => <OrderStatusChip orderStatus={value as OrderStatusEnum} />,
    },
    {
      title: 'Actions',
      field: 'id',
      render: value => (
        <IconButton
          icon="dots-horizontal"
          onPress={() => handlePressAction(value as string)}
          size={20}
          style={styles.action}
        />
      ),
    },
  ];

  // ---- FUNCTIONS ----

  const navigateToOrderDetail = (orderId: string) => {
    if (!orderId) {
      return;
    }

    navigate(Screen.OrderDetail, { orderId });
  };

  const handlePressView = () => {
    navigateToOrderDetail(curRowBotSheet.id);
  };

  const handlePressRow = (userOrder: UserOrderDto) => {
    navigateToOrderDetail(userOrder.id);
  };

  const actionList: ChoiceListType[] = useMemo(() => {
    return [
      {
        text: 'View',
        value: 'view',
        onPress: handlePressView,
      },
      {
        text: 'Edit',
        value: 'edit',
        disabled: !checkCanDoOrderAction(OrderActionEnum.editCart, curRowBotSheet?.status),
        onPress: () => {},
      },
      {
        text: 'Cancel',
        value: 'cancel',
        mode: 'text',
        textColor: 'red',
        disabled: !checkCanDoOrderAction(OrderActionEnum.cancel, curRowBotSheet?.status),
        onPress: () => {},
      },
    ];
  }, [curRowBotSheet]);

  const handlePressAction = (orderId: string) => {
    const selectedOrder = userOrders?.orders.find(order => order.id === orderId);

    setCurRowBotSheet(selectedOrder);
    onOpenBotSheet();
  };

  return (
    <View>
      <AppTable<UserOrderDto>
        columnConfigs={tableColumnConfig}
        dataList={userOrders?.orders}
        isLoading={isFetching}
        onClickRow={handlePressRow}
      />

      <BottomSheet botSheetRef={botSheetRef}>
        <ChoiceList list={actionList} selectedValue="" onChange={() => {}} />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  action: {
    backgroundColor: 'transparent',
  },
});

export default OrderHistoryScreen;
