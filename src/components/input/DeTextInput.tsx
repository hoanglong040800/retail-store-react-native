/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';
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
  return (
    <View>
      <Controller
        name={name as string}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            mode="outlined"
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

export default DeTextInput;
