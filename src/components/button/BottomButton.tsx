import { StyleSheet } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import BottomButtonWrapper from './BottomButtonWrapper';

type Props = {
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
};

const BottomButton = ({ text, isLoading, disabled, onPress }: Props) => {
  return (
    <BottomButtonWrapper>
      <Button mode="contained" onPress={onPress} disabled={disabled || isLoading} labelStyle={style.buttonContent}>
        {isLoading && <ActivityIndicator animating />}

        {text}
      </Button>
    </BottomButtonWrapper>
  );
};

const style = StyleSheet.create({
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default BottomButton;
