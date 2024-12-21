import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheet } from 'components';
import { PAYMENT_OPTIONS } from 'const';
import { MutableRefObject } from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { PaymentMethodEnum } from 'types/enum';

type Props<T> = {
  ctrlProps: UseControllerProps<T>;
  botSheetRef: MutableRefObject<BottomSheetMethods>;
  onClose: () => void;
};

const PaymentSelectorBottom = <FormT extends FieldValues = FieldValues>({
  botSheetRef,
  ctrlProps,
  onClose,
}: Props<FormT>) => {
  const {
    field: { value, onChange },
  } = useController(ctrlProps);

  const handleSelectPayment = (method: PaymentMethodEnum) => {
    onChange(method);
    setTimeout(() => onClose(), 300);
  };

  return (
    <BottomSheet botSheetRef={botSheetRef}>
      <View style={styles.content}>
        {PAYMENT_OPTIONS.map(({ icon, text, method }) => (
          <Button
            key={text}
            onPress={() => handleSelectPayment(method)}
            icon={icon}
            contentStyle={styles.buttonContent}
            mode={value === method ? 'contained' : 'outlined'}
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
