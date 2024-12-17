import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useRef } from 'react';

type Props = {
  openIndex?: number;
};

export const useBottomSheet = ({ openIndex = 0 }: Props) => {
  const botSheetRef = useRef<BottomSheet>(null);

  const onOpenBotSheet = () => {
    botSheetRef.current?.snapToIndex(openIndex);
  };

  const onCloseBotSheet = () => {
    botSheetRef.current?.close();
  };

  return {
    botSheetRef,
    onOpenBotSheet,
    onCloseBotSheet,
  };
};
