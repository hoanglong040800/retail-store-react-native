/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import InputError from './InputError';

type Props = TextInputProps & {
  control: Control<any>;
  errors: FieldErrors<any>;
  label: string;
  name: string;
};

const DeTextInput = ({ control, errors, label, name, ...props }: Props) => {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            mode="outlined"
            label={label}
            onChangeText={onChange}
            // add empty text to avoid changing uncontrolled -> controlled which caused by value changing undefined -> define
            value={value || ''}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(props || {})}
          />
        )}
      />

      <InputError errors={errors} name={name} />
    </View>
  );
};

export default DeTextInput;
