import { SIZE } from 'const';
import { useAppTheme } from 'hooks';
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
  const { colors } = useAppTheme();

  return (
    <BottomButtonWrapper>
      <Button
        mode="contained"
        onPress={onPress}
        disabled={disabled || isLoading}
        contentStyle={styles.content}
        labelStyle={styles.label}
      >
        {isLoading ? <ActivityIndicator animating color={colors.onSurfaceDisabled} /> : text}
      </Button>
    </BottomButtonWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    height: SIZE.buttonHeight,
  },

  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BottomButton;
