import { axiosClient } from 'config';
import { CheckoutBody, CheckoutDto } from 'types';

export const checkout = (body: CheckoutBody): Promise<CheckoutDto> => axiosClient.post(`/checkout`, body);
