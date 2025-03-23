/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-duplicates */
import { MutableRefObject, ReactNode, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheetLib from '@gorhom/bottom-sheet';
import { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Portal } from 'react-native-paper';
import { SharedValue } from 'react-native-reanimated';

type Props = {
  botSheetRef: MutableRefObject<BottomSheetMethods>;
  snapPoints?: Array<string | number> | SharedValue<Array<string | number>>;
  children?: ReactNode;
  transparentBackdrop?: boolean;
  onSheetChange?: (index: number) => void;
};

const BottomSheet = ({ transparentBackdrop, children, snapPoints, botSheetRef, onSheetChange }: Props) => {
  const defaultSnapPoints = ['30%', '50%'];

  const handleSheetChanges = (index: number) => {
    onSheetChange?.(index);
  };

  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  const renderTransparentBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} opacity={0} enableTouchThrough />,
    []
  );

  // Add Portal to fix bug: https://github.com/gorhom/react-native-bottom-sheet/issues/972#issuecomment-1986381407
  return (
    <Portal>
      <BottomSheetLib
        ref={botSheetRef}
        index={-1}
        snapPoints={snapPoints || defaultSnapPoints}
        backdropComponent={transparentBackdrop ? renderTransparentBackdrop : renderBackdrop}
        enableDynamicSizing={false}
        onChange={handleSheetChanges}
      >
        <BottomSheetScrollView style={styles.contentContainer}>{children}</BottomSheetScrollView>
      </BottomSheetLib>
    </Portal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});

export default BottomSheet;
