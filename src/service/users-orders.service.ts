import { axiosClient } from 'config';
import { GetUserOrderDetailDto, GetUserOrdersDto } from 'types';

const ROUTE = '/users/:userId/orders';

const buildRoute = (userId: string) => ROUTE.replace(':userId', userId);

export const getUserOrders = (userId: string): Promise<GetUserOrdersDto> => axiosClient.get(buildRoute(userId));

export const getUserOrderDetail = ({
  userId,
  orderId,
}: {
  userId: string;
  orderId: string;
}): Promise<GetUserOrderDetailDto> => {
  if (!userId || !orderId) {
    return null;
  }

  return axiosClient.get(`${buildRoute(userId)}/${orderId}`);
};
