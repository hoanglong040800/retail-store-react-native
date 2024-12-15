import { MutableRefObject, useCallback, useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

type Props = {
  botSheetRef: MutableRefObject<BottomSheetMethods>;
};

const PaymentSelectorBottom = ({ botSheetRef }: Props) => {
  // ref

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );
  return (
    <BottomSheet
      ref={botSheetRef}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
      onChange={handleSheetChanges}
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
  },
});

export default PaymentSelectorBottom;
