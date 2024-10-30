/* eslint-disable react/jsx-props-no-spreading */
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { View, ViewProps } from 'react-native';
import { SegmentedButtons, SegmentedButtonsProps } from 'react-native-paper';
import InputError from './InputError';

type Props<T> = SegmentedButtonsProps & {
  value?: string | string[];
  ctrlProps: UseControllerProps<T>;
  wrapperProps?: ViewProps;
  onValueChange?: (value: string) => void;
};

// Example: define dynamic form type for input component
const DeSegmentedButtons = <FormT extends FieldValues = FieldValues>({
  buttons,
  ctrlProps,
  wrapperProps,
  multiSelect,
  ...segmentedButtonProps
}: Props<FormT>) => {
  const { field, fieldState } = useController(ctrlProps);

  return (
    <View {...wrapperProps}>
      <SegmentedButtons
        {...segmentedButtonProps}
        multiSelect={multiSelect}
        value={field.value}
        onValueChange={field.onChange}
        buttons={buttons}
      />

      <InputError name={field.name} errors={fieldState.error} />
    </View>
  );
};

export default DeSegmentedButtons;
