import { PAYMENT_METHOD_BY_TYPE } from 'const';
import { PaymentType } from 'types';
import { PaymentMethodEnum } from 'types/enum';

export const getPaymentTypeByMethod = (paymentMethod: PaymentMethodEnum | undefined | null): PaymentType | null => {
  if (!paymentMethod) {
    return null;
  }

  // TODO fix bug not return payment type
  Object.entries(PAYMENT_METHOD_BY_TYPE).forEach(([paymentType, paymentMethods]) => {
    if (paymentMethods.includes(paymentMethod)) {
      return paymentType;
    }

    return null;
  });

  return null;
};
