import { Route } from '@react-navigation/native';
import { useAppNavigation } from 'hooks';
import { Text } from 'react-native-paper';
import { ParamsType, Screen } from 'types';

type Params = Pick<ParamsType, 'orderId'>;

type Props = {
  route: Route<Screen.OrderDetail, Params>;
};

const OrderDetailScreen = ({
  route: {
    params: { orderId },
  },
}: Props) => {
  const { navigate } = useAppNavigation();

  if (!orderId) {
    return navigate(Screen.OrderHistory);
  }

  return <Text>Order Detail Screen {orderId}</Text>;
};

export default OrderDetailScreen;
