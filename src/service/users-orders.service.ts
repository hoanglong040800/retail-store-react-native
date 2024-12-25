import { axiosClient } from 'config';
import { GetUserOrdersDto } from 'types';

const ROUTE = '/users/:userId/orders';

const buildRoute = (userId: string) => ROUTE.replace(':userId', userId);

export const getUserOrders = (userId: string): Promise<GetUserOrdersDto> => axiosClient.get(buildRoute(userId));
