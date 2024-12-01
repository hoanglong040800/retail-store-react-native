import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentMethodResult } from '@stripe/stripe-js';
import { useSnackbar } from 'components';

export const usePayment = () => {
  const stripe = useStripe();
  const stripeElements = useElements();
  const { openSnackbar } = useSnackbar();

  const savePaymentMethod = () => {
    return createStripePaymentMethod();
  };

  const createStripePaymentMethod = async (): Promise<PaymentMethodResult> => {
    const result: PaymentMethodResult = await stripe.createPaymentMethod({
      type: 'card',
      card: stripeElements.getElement(CardNumberElement),
    });

    if (result.error) {
      openSnackbar('error', result.error.message);
    }

    return result;
  };

  return {
    savePaymentMethod,
  };
};
