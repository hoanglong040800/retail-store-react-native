import { DeliveryTypeEnum, PaymentMethodEnum } from 'types/enum';

export type CheckoutForm = {
  address?: string;
  deliveryType?: DeliveryTypeEnum;
  paymentMethod?: PaymentMethodEnum;
};
