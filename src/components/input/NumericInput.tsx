import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

type Props = {
  value: number;
  onChange: (newNum: number) => void;
};

const NumericInput = ({ value, onChange }: Props) => {
  const handleOnChangeInput = (text: string) => {
    onChange(+text);
  };

  const handleClickIcon = (type: 'plus' | 'minus'): void => {
    if (type === 'plus') {
      onChange(value + 1);
      return;
    }

    onChange(value - 1);
  };

  return (
    <View style={styles.container}>
      <IconButton icon="minus" mode="outlined" style={styles.icon} onPress={() => handleClickIcon('minus')} />

      <TextInput
        value={value.toString()}
        mode="outlined"
        keyboardType="number-pad"
        onChangeText={handleOnChangeInput}
        maxLength={2}
        style={styles.input}
      />

      <IconButton icon="plus" mode="outlined" style={styles.icon} onPress={() => handleClickIcon('plus')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },

  icon: {
    width: 80,
    height: 30, // same as input height
    borderRadius: 8,
  },

  input: {
    flex: 1,
    height: 30,
  },
});

export default NumericInput;
