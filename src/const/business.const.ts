import { PaymentOptionType, PaymentType } from 'types';
import { PaymentMethodEnum } from 'types/enum';
import { keyBy } from 'utils';

export const PAYMENT_OPTIONS: PaymentOptionType[] = [
  {
    method: PaymentMethodEnum.cash,
    icon: 'cash',
    text: 'Cash on delivery',
  },
  {
    method: PaymentMethodEnum.creditCard,
    icon: 'credit-card',
    text: 'Credit Card',
  },
];

export const PROPS_BY_PAYMENT_METHOD: Record<PaymentMethodEnum, PaymentOptionType> = keyBy(PAYMENT_OPTIONS, 'method');

export const PAYMENT_METHOD_BY_TYPE: Record<PaymentType, PaymentMethodEnum[]> = {
  [PaymentType.online]: [PaymentMethodEnum.creditCard],
  [PaymentType.offline]: [PaymentMethodEnum.cash],
};
