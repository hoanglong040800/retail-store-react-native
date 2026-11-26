import { RADIUS, SPACE } from 'const';
import { useAppTheme } from 'hooks';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

type Props = {
  value: number;
  offset?: number;
  onChange: (newNum: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const STEPPER_ICON_SIZE = 18;

const NumericInput = ({ value, offset = 1, containerStyle, onChange }: Props) => {
  const { colors, fonts } = useAppTheme();

  const handleOnChangeInput = (text: string) => {
    onChange(+text);
  };

  const handleClickIcon = (type: 'plus' | 'minus'): void => {
    if (type === 'plus') {
      onChange(value + offset);
      return;
    }

    onChange(value - offset);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryContainer }, containerStyle]}>
      <IconButton
        icon="minus"
        size={STEPPER_ICON_SIZE}
        iconColor={colors.onPrimaryContainer}
        style={styles.icon}
        onPress={() => handleClickIcon('minus')}
      />

      <TextInput
        value={value.toString()}
        keyboardType="number-pad"
        onChangeText={handleOnChangeInput}
        maxLength={2}
        style={[styles.input, fonts.titleSmall, { color: colors.onPrimaryContainer }]}
      />

      <IconButton
        icon="plus"
        size={STEPPER_ICON_SIZE}
        iconColor={colors.onPrimaryContainer}
        style={styles.icon}
        onPress={() => handleClickIcon('plus')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACE.xxs,
  },

  icon: {
    margin: 0,
  },

  input: {
    flex: 1,
    minWidth: 0,
    textAlign: 'center',
  },
});

export default NumericInput;
