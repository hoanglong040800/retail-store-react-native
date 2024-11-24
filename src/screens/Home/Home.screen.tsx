import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ENV } from 'const';
import { useAppNavigation } from 'hooks';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Screen } from 'types';

const stripePromise = loadStripe(ENV.STRIPE.PUBLIC_KEY, {
  locale: 'auto',
});

const HomeScreen = () => {
  const { navigate } = useAppNavigation();

  const onPressViewAllBranches = () => {
    navigate(Screen.AllBranches);
  };

  return (
    <View style={styles.container}>
      <Button onPress={onPressViewAllBranches}>View all stores</Button>

      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          clientSecret:
            'cs_test_a1jMwqvn9iesvXXmJxkviHzcf5qS4hUD4hluCtMF1sW4SKRlEy1IvhVfYc_secret_fidwbEhqYWAnPydgaGdgYWFgYScpJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ3dgYWx3YGZxSmtGamh1aWBxbGprJz8nZGlyZHx2J3gl',
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
