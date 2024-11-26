import { CardElement } from '@stripe/react-stripe-js';
import { BASE_STYLE } from 'const';
import { useCheckout } from 'hooks';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const PaymentScreen = () => {
  const { handleClickSavePayment } = useCheckout();

  return (
    <ScrollView style={styles.scrollView}>
      <CardElement />

      <Button onPress={handleClickSavePayment}>Pay</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    ...BASE_STYLE.SCROLL_VIEW_DEFAULT,
  },
});

export default PaymentScreen;
