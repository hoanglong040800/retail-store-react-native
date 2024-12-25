import { useQuery } from '@tanstack/react-query';
import { BASE_STYLE } from 'const';
import { useAuth } from 'hooks';
import { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, DataTable, Text } from 'react-native-paper';
import { getUserOrders } from 'service';
import { GetUserOrdersDto, UserOrderDto } from 'types';
import { formatCurrency, getObj } from 'utils';

type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string | number ? K | `${K}.${DeepKeys<T[K]>}` : never; // Exclude symbol keys
    }[keyof T] extends infer D
    ? D extends string
      ? D
      : never
    : never
  : '';

type TableColumnConfig = {
  title: string;
  field: DeepKeys<UserOrderDto>;
  render?: (value: string | number | boolean | Date) => ReactNode | string;
};

const OrderHistoryScreen = () => {
  const TableHeader = DataTable.Header;
  const TableTitle = DataTable.Title;
  const TableRow = DataTable.Row;
  const TableCell = DataTable.Cell;

  // ---- HOOKS ----
  const { user } = useAuth();

  const { data: userOrders, isLoading: isFetching } = useQuery<GetUserOrdersDto, null, GetUserOrdersDto>({
    queryKey: ['userOrders'],
    queryFn: () => getUserOrders(user.id),
  });

  const tableColumnConfig: TableColumnConfig[] = [
    {
      title: 'Order ID',
      field: 'id',
    },
    {
      title: 'Placed At',
      field: 'createdAt',
      render: value => value.toString(),
    },
    {
      title: 'Delivery Time',
      field: 'createdAt',
      render: value => value.toString(),
    },
    {
      title: 'Total Amount',
      field: 'cart.calculation.totalAmount',
      render: value => formatCurrency(value as number),
    },
    {
      title: 'Status',
      field: 'status',
    },
    {
      title: 'Actions',
      field: 'id',
      render: () => <Text>Action</Text>,
    },
  ];

  const renderTableColumn = (order: UserOrderDto, colCfg: TableColumnConfig): ReactNode => {
    const value = getObj(order, colCfg.field);

    if (colCfg.render) {
      return <TableCell key={colCfg.title}>{colCfg.render(value)}</TableCell>;
    }

    return <TableCell key={colCfg.title}>{value}</TableCell>;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <DataTable>
        <TableHeader>
          {tableColumnConfig.map(item => (
            <TableTitle key={item.title}>{item.title}</TableTitle>
          ))}
        </TableHeader>

        {isFetching && <ActivityIndicator animating />}

        {userOrders?.orders?.map(order => (
          <TableRow key={order.id}>{tableColumnConfig.map(tcc => renderTableColumn(order, tcc))}</TableRow>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    ...BASE_STYLE.SCROLL_VIEW_DEFAULT,
    paddingVertical: 16,
  },
});

export default OrderHistoryScreen;
