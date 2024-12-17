import { PaymentOptionType } from 'types';
import { PaymentMethodEnum } from 'types/enum';

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
