import { axiosClient } from 'config';
import { AddCartItemBody, CartDto, GetCartByIdQuery } from 'types';

const ROUTE = '/carts';

export const addCartItems = (cartId: string, body: AddCartItemBody): Promise<CartDto> =>
  axiosClient.post(`${ROUTE}/${cartId}/items`, body);

export const getCartById = (cartId: string, query: GetCartByIdQuery): Promise<CartDto> =>
  axiosClient.get(`${ROUTE}/${cartId}`, { params: query });
