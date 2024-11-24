import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BASE_STYLE, ENV } from 'const';
import { ScrollView, StyleSheet } from 'react-native';

const stripePromise = loadStripe(ENV.STRIPE.PUBLIC_KEY, {
  locale: 'auto',
});

const PaymentScreen = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          clientSecret:
            'cs_test_b1IGiFZjrydax2JqctDOgVQhHivJjY8O4Wt31F18PjOuLhcSlPjbtYV8mc_secret_fidwbEhqYWAnPydgaGdgYWFgYScpJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJyknd2BhbHdgZnFKa0ZqaHVpYHFsamsnPydkaXJkfHYneCUl',
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    ...BASE_STYLE.SCROLL_VIEW_DEFAULT,
  },
});

export default PaymentScreen;
