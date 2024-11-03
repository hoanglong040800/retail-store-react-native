import { StyleSheet } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import BottomButtonWrapper from './BottomButtonWrapper';

type Props = {
  text: string;
  isLoading?: boolean;
  onPress: () => void;
};

const BottomButton = ({ text, isLoading, onPress }: Props) => {
  console.log('isLoading', isLoading);

  return (
    <BottomButtonWrapper>
      <Button mode="contained" onPress={onPress} disabled={isLoading} labelStyle={style.buttonContent}>
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
