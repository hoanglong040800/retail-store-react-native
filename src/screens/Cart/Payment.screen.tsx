import { CardElement } from '@stripe/react-stripe-js';
import { BASE_STYLE } from 'const';
import { usePayment } from 'hooks';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const PaymentScreen = () => {
  const { handleSubmitPayment } = usePayment();

  return (
    <ScrollView style={styles.scrollView}>
      <CardElement />

      <Button onPress={handleSubmitPayment}>Pay</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    ...BASE_STYLE.SCROLL_VIEW_DEFAULT,
  },
});

export default PaymentScreen;
