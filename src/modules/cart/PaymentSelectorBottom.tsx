import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheet } from 'components';
import { MutableRefObject } from 'react';
import { Text } from 'react-native-paper';

type Props = {
  botSheetRef: MutableRefObject<BottomSheetMethods>;
};

const PaymentSelectorBottom = ({ botSheetRef }: Props) => {
  return (
    <BottomSheet botSheetRef={botSheetRef}>
      <Text>Awesome</Text>
    </BottomSheet>
  );
};

// const styles = StyleSheet.create({});

export default PaymentSelectorBottom;
