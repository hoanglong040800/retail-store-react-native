import { ReactNode } from 'react';
import { View } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { UserOrderDto } from 'types';
import { DeliveryTypeEnum, OrderStatusEnum } from 'types/enum';
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

  const mockOrders: UserOrderDto[] = [
    {
      id: '1',
      createdAt: new Date(),
      status: OrderStatusEnum.pending,
      deliveryType: DeliveryTypeEnum.delivery,
      cart: {
        id: '1',
        calculation: {
          subTotal: 100,
          shippingFee: 0,
          totalAmount: 12345,
        },
        cartItems: [
          {
            id: '1',
            quantity: 1,
            totalPrice: 100,
          },
        ],
      },
    },
    {
      id: '2',
      createdAt: new Date(),
      status: OrderStatusEnum.pending,
      deliveryType: DeliveryTypeEnum.delivery,
      cart: {
        id: '1',
        calculation: {
          subTotal: 100,
          shippingFee: 0,
          totalAmount: 98765,
        },
        cartItems: [
          {
            id: '1',
            quantity: 1,
            totalPrice: 100,
          },
        ],
      },
    },
  ];

  const renderTableColumn = (order: UserOrderDto, colCfg: TableColumnConfig): ReactNode => {
    const value = getObj(order, colCfg.field);

    if (colCfg.field === 'cart.calculation.totalAmount') {
      console.log(colCfg.field, value);
      console.log(order.cart.calculation);
    }

    if (colCfg.render) {
      return <TableCell key={colCfg.title}>{colCfg.render(value)}</TableCell>;
    }

    return <TableCell key={colCfg.title}>{value}</TableCell>;
  };

  return (
    <View>
      <DataTable>
        <TableHeader>
          {tableColumnConfig.map(item => (
            <TableTitle key={item.title}>{item.title}</TableTitle>
          ))}
        </TableHeader>

        {mockOrders.map(order => (
          <TableRow key={order.id}>{tableColumnConfig.map(tcc => renderTableColumn(order, tcc))}</TableRow>
        ))}
      </DataTable>
    </View>
  );
};

export default OrderHistoryScreen;
