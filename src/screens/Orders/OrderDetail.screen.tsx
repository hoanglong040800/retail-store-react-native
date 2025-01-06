import { Route } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ScreenAppBar } from 'components';
import { BASE_STYLE } from 'const';
import { useAuth } from 'hooks';
import { OrderMainInfoSection } from 'modules';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { getUserOrderDetail } from 'service';
import { GetUserOrderDetailDto, ParamsType, Screen } from 'types';

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

  const { data, isLoading: isFetching } = useQuery<GetUserOrderDetailDto, null, GetUserOrderDetailDto>({
    queryKey: ['orderDetail'],
    queryFn: () => getUserOrderDetail({ userId: user.id, orderId }),
  });

  if (!data?.order && isFetching) {
    return <Text>Loading...</Text>;
  }

  if (!data?.order) {
    return <Text>Order not found</Text>;
  }

  return (
    <View>
      <ScreenAppBar title="Order History" />

      <Surface style={styles.surface}>
        <OrderMainInfoSection order={data.order} />
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  surface: BASE_STYLE.SURFACE_DEFAULT,
});

export default OrderDetailScreen;
