import { Button } from 'react-native-paper';
import BottomButtonWrapper from './BottomButtonWrapper';

type Props = {
  text: string;
  onPress: () => void;
};

const BottomButton = ({ text, onPress }: Props) => {
  return (
    <BottomButtonWrapper>
      <Button mode="contained" onPress={onPress}>
        {text}
      </Button>
    </BottomButtonWrapper>
  );
};

export default BottomButton;
