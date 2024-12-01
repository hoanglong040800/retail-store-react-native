import { PaymentMethodResult } from '@stripe/stripe-js';
import { BottomButton } from 'components';
import { BASE_STYLE } from 'const';
import { useCheckout, usePayment } from 'hooks';
import { StripeCardElement } from 'modules/payment';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

const PaymentScreen = () => {
  const { handleClickSavePayment } = useCheckout();
  const { savePaymentMethod } = usePayment();

  const handleClickPay = async () => {
    const paymentMethodResult: PaymentMethodResult = await savePaymentMethod();

    await handleClickSavePayment({ paymentMethodId: paymentMethodResult.paymentMethod.id });
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Please input your Credit Card for payment
      </Text>

      <Surface style={styles.surface}>
        <StripeCardElement />
      </Surface>

      <BottomButton text="Pay" onPress={handleClickPay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BASE_STYLE.CONTAINER_WRAP_BOT_BTN,
    padding: 16,
  },

  title: {
    marginBottom: 32,
  },

  surface: {
    ...BASE_STYLE.SURFACE_DEFAULT,
  },
});

export default PaymentScreen;
