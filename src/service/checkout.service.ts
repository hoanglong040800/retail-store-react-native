import { axiosClient } from 'config';
import { CheckoutBody, CheckoutDto } from 'types';

export const checkout = (cartId: string, body: CheckoutBody): Promise<CheckoutDto> =>
  axiosClient.post(`${cartId}/checkout`, body);
