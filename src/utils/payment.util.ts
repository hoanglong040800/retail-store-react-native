import { PAYMENT_METHOD_BY_TYPE } from 'const';
import { PaymentType } from 'types';
import { PaymentMethodEnum } from 'types/enum';

export const getPaymentTypeByMethod = (paymentMethod: PaymentMethodEnum): PaymentType | null => {
  if (!paymentMethod) {
    return null;
  }

  const paymentMethodArr = Object.entries(PAYMENT_METHOD_BY_TYPE);

  let result: PaymentType | null = null;

  paymentMethodArr.forEach(([paymentType, paymentMethods]) => {
    if (paymentMethods.includes(paymentMethod)) {
      result = paymentType as PaymentType;
    }
  });

  return result;
};
