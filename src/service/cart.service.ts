import { axiosClient } from 'config';
import { AddCartItemBody, CartDto } from 'types';

const ROUTE = '/carts';

export const addCartItems = (cartId: string, body: AddCartItemBody): Promise<CartDto> =>
  axiosClient.post(`${ROUTE}/${cartId}/items`, body);
