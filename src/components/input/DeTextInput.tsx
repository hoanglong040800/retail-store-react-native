/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { RADIUS } from 'const';
import { useAppTheme } from 'hooks';
import { StyleSheet, View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import InputError from './InputError';

type Props<T> = TextInputProps & {
  control: Control<any>;
  errors: FieldErrors<any>;
  label: string;
  name: keyof T;
};

// TODO refactor using useFormContext instead of passing control and errors
const DeTextInput = <T extends object>({ control, errors, label, name, ...props }: Props<T>) => {
  const { colors } = useAppTheme();

  return (
    <View>
      <Controller
        name={name as string}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            mode="outlined"
            style={{ backgroundColor: colors.elevation.level1 }}
            outlineStyle={styles.outline}
            label={label}
            onChangeText={onChange}
            error={!!errors?.[name]}
            // add empty text to avoid changing uncontrolled -> controlled which caused by value changing undefined -> define
            value={value || ''}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(props || {})}
          />
        )}
      />

      <InputError errors={errors?.[name]} name={name as string} />
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    borderRadius: RADIUS.sm,
  },
});

export default DeTextInput;
