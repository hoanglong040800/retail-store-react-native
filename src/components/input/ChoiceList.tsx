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

  const getButtonMode = (mode: ButtonProps['mode'], selVal: typeof selectedValue): ButtonProps['mode'] => {
    if (mode) {
      return mode;
    }

    return selVal === selectedValue ? 'contained' : 'outlined';
  };

  return (
    <View style={styles.content}>
      {list.map(({ text, value, icon, mode, textColor, disabled }) => (
        <Button
          key={text}
          icon={icon}
          mode={getButtonMode(mode, value)}
          onPress={() => handlePressChoice(value)}
          textColor={textColor}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
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
    gap: 20,
  },

  buttonLabel: {
    fontSize: 18,
  },

  buttonContent: {
    gap: 8,
    flex: 1,
  },
});

export default ChoiceList;
