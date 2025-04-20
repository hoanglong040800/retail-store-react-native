// eslint-disable react/jsx-props-no-spreading
import MultiSlider, { MultiSliderProps } from '@ptomasroos/react-native-multi-slider';
import { Controller, useFormContext } from 'react-hook-form';

type Props<T> = MultiSliderProps & {
  name: keyof T;
};

const Slider = <T extends object>({ name, ...multiSliderProps }: Props<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field: { onChange, value } }) => (
        <MultiSlider values={value} onValuesChange={newVal => onChange(newVal)} enableLabel {...multiSliderProps} />
      )}
    />
  );
};

export default Slider;
