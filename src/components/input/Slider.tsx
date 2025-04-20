// eslint-disable react/jsx-props-no-spreading
import MultiSlider, { MultiSliderProps } from '@ptomasroos/react-native-multi-slider';
import { Controller, useFormContext } from 'react-hook-form';
import { View, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';

type Props<T> = MultiSliderProps & {
  name: keyof T;
  label: string;
  viewProps?: ViewProps;
};

const Slider = <T extends object>({ name, label, viewProps, ...multiSliderProps }: Props<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field: { onChange, value } }) => (
        <View {...viewProps}>
          <Text>{label}</Text>

          <MultiSlider values={value} onValuesChange={newVal => onChange(newVal)} enableLabel {...multiSliderProps} />
        </View>
      )}
    />
  );
};

export default Slider;
