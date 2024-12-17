import { PaymentMethodEnum } from 'types/enum';

export type PaymentOptionType = {
  method: PaymentMethodEnum;
  icon: string;
  text: string;
};
