import { useQuery } from '@tanstack/react-query';
import { AppTable, TableColumnConfig } from 'components';
import { OrderStatusChip } from 'components/chip';
import { useAuth } from 'hooks';
import { Text } from 'react-native-paper';
import { getUserOrders } from 'service';
import { GetUserOrdersDto, UserOrderDto } from 'types';
import { OrderStatusEnum } from 'types/enum';
import { formatCurrency, formatDate } from 'utils';

const OrderHistoryScreen = () => {
  // ---- HOOKS ----
  const { user } = useAuth();

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
      render: () => <Text>Action</Text>,
    },
  ];

  return (
    <AppTable<UserOrderDto> columnConfigs={tableColumnConfig} dataList={userOrders?.orders} isLoading={isFetching} />
  );
};

export default OrderHistoryScreen;
