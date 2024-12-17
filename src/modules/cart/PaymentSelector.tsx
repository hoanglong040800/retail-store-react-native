import { PAYMENT_OPTIONS } from 'const';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';
import { PaymentOptionType } from 'types';
import { PaymentMethodEnum } from 'types/enum';

type Props = {
  selectedMethod: PaymentMethodEnum;
  onClick: () => void;
};

const PaymentSelector = ({ selectedMethod, onClick }: Props) => {
  const selectedPaymentMethod: PaymentOptionType = useMemo(() => {
    return PAYMENT_OPTIONS.find(({ method }) => method === selectedMethod);
  }, [selectedMethod]);

  return (
    <Button onPress={onClick} labelStyle={styles.buttonLabel} contentStyle={styles.buttonContent}>
      <Text variant="labelLarge">Payment method:</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon source={selectedPaymentMethod.icon} size={20} />

        <Text>{selectedPaymentMethod.text}</Text>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonContent: {
    flex: 1,
  },

  buttonLabel: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
  },

  paymentLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default PaymentSelector;
