import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSnackbar } from 'components';

export const usePayment = () => {
  const stripe = useStripe();
  const stripeElements = useElements();
  const { openSnackbar } = useSnackbar();

  const handleSubmitPayment = () => {
    confirmStripePayment();
  };

  const confirmStripePayment = async () => {
    // const result = await stripe.confirmCardPayment('pi_3QOrIV07tguiF49H0v0DhRSX_secret_qpsF03Gfnm3fACZ3fA3gRzXWS', {
    //   payment_method: {
    //     card: stripeElements.getElement(CardElement),
    //   },
    // });

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: stripeElements.getElement(CardElement),
    });

    if (result.error) {
      openSnackbar('error', result.error.message);
    }

    console.log('result', result);
  };

  return {
    handleSubmitPayment,
  };
};
