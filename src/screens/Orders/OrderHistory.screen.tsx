import { useQuery } from '@tanstack/react-query';
import { AppTable, BottomSheet, ChoiceList, ChoiceListType, TableColumnConfig, useBottomSheet } from 'components';
import { OrderStatusChip } from 'components/chip';
import { useAuth } from 'hooks';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { getUserOrders } from 'service';
import { GetUserOrdersDto, UserOrderDto } from 'types';
import { OrderStatusEnum } from 'types/enum';
import { formatCurrency, formatDate } from 'utils';

const OrderHistoryScreen = () => {
  // ---- HOOKS ----
  const { user } = useAuth();
  const { onOpenBotSheet, botSheetRef } = useBottomSheet({});

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
      render: () => <IconButton icon="dots-horizontal" onPress={handlePressAction} size={20} style={styles.action} />,
    },
  ];

  const actionList: ChoiceListType[] = [
    {
      text: 'View',
      value: 'view',
      onPress: () => {},
    },
    {
      text: 'Edit',
      value: 'edit',
      onPress: () => {},
    },
    {
      text: 'Cancel',
      value: 'cancel',
      mode: 'text',
      textColor: 'red',
      onPress: () => {},
    },
  ];

  // ---- FUNCTIONS ----

  const handlePressRow = (userOrder: UserOrderDto) => {
    console.log(userOrder);
  };

  const handlePressAction = () => {
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
