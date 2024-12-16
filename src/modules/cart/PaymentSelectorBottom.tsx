import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheet } from 'components';
import { MutableRefObject } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { PaymentMethodEnum } from 'types/enum';

type PaymentOptionType = {
  method: PaymentMethodEnum;
  icon: string;
  text: string;
};

type Props = {
  selectedMethod: PaymentMethodEnum;
  botSheetRef: MutableRefObject<BottomSheetMethods>;
};

const PaymentSelectorBottom = ({ botSheetRef, selectedMethod = PaymentMethodEnum.cash }: Props) => {
  const paymentOptions: PaymentOptionType[] = [
    {
      method: PaymentMethodEnum.cash,
      icon: 'cash',
      text: 'Cash on delivery',
    },
    {
      method: PaymentMethodEnum.creditCard,
      icon: 'credit-card',
      text: 'Credit Card',
    },
  ];

  return (
    <BottomSheet botSheetRef={botSheetRef}>
      <View style={styles.content}>
        {paymentOptions.map(({ icon, text, method }) => (
          <Button
            key={text}
            onPress={() => {}}
            icon={icon}
            contentStyle={styles.buttonContent}
            mode={selectedMethod === method ? 'contained' : 'outlined'}
            labelStyle={styles.buttonLabel}
          >
            {text}
          </Button>
        ))}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 20,
  },

  buttonLabel: {
    fontSize: 18,
  },

  buttonContent: {
    gap: 8,
    flex: 1,
  },
});

export default PaymentSelectorBottom;
