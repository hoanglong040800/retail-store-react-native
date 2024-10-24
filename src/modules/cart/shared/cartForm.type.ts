import { DeliveryTypeEnum } from 'types/enum';

export type CheckoutForm = {
  address?: string;
  deliveryType?: DeliveryTypeEnum;
};
