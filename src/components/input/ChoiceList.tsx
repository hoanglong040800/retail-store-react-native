import { RADIUS, SIZE, SPACE } from 'const';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

export type ChoiceListType = {
  text: string;
  value: string;
  icon?: string;
  mode?: ButtonProps['mode'];
  textColor?: ButtonProps['textColor'];
  disabled?: boolean;
  onPress?: (value: string) => void;
};

type Props<T> = {
  list: ChoiceListType[];
  selectedValue: T | string;
  onChange: (value: string) => void;
};

const ChoiceList = <T extends string>({ list, selectedValue, onChange }: Props<T>) => {
  const handlePressChoice = (curVal: typeof selectedValue) => {
    onChange(curVal);
  };

  const isSelected = (value: string) => value === selectedValue;

  const getButtonMode = (mode: ButtonProps['mode'], value: string): ButtonProps['mode'] => {
    if (mode) {
      return mode;
    }

    return isSelected(value) ? 'contained-tonal' : 'outlined';
  };

  const getIcon = (icon: string | undefined, mode: ButtonProps['mode'], value: string) => {
    if (icon) {
      return icon;
    }

    return !mode && isSelected(value) ? 'check' : undefined;
  };

  return (
    <View style={styles.content}>
      {list.map(({ text, value, icon, mode, textColor, disabled }) => (
        <Button
          key={text}
          icon={getIcon(icon, mode, value)}
          mode={getButtonMode(mode, value)}
          onPress={() => handlePressChoice(value)}
          textColor={textColor}
          style={styles.button}
          contentStyle={styles.buttonContent}
          disabled={disabled}
        >
          {text}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: SPACE.xs,
  },

  button: {
    borderRadius: RADIUS.sm,
  },

  buttonContent: {
    gap: SPACE.xs,
    flex: 1,
    minHeight: SIZE.buttonHeight,
  },
});

export default ChoiceList;
