/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-duplicates */
import { MutableRefObject, ReactNode, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheetLib from '@gorhom/bottom-sheet';
import { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

type Props = {
  children?: ReactNode;
  botSheetRef: MutableRefObject<BottomSheetMethods>;
  onSheetChange?: (index: number) => void;
};

const BottomSheet = ({ children, botSheetRef, onSheetChange }: Props) => {
  const snapPoints = ['30%', '50%'];

  const handleSheetChanges = (index: number) => {
    onSheetChange?.(index);
  };

  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <BottomSheetLib
      ref={botSheetRef}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
      onChange={handleSheetChanges}
    >
      <BottomSheetScrollView style={styles.contentContainer}>{children}</BottomSheetScrollView>
    </BottomSheetLib>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});

export default BottomSheet;
