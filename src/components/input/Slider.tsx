// eslint-disable react/jsx-props-no-spreading
import MultiSlider, { MultiSliderProps } from '@ptomasroos/react-native-multi-slider';
import { ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';
import { THEME } from 'const';
import { SliderMarker } from './SliderCustomMarker';

type Props<T> = MultiSliderProps & {
  name: keyof T;
  label: string;
  viewProps?: ViewProps;
  formatMarkerValue?: (value: number) => string;
};

const Slider = <T extends object>({ name, label, viewProps, formatMarkerValue, ...multiSliderProps }: Props<T>) => {
  const { control } = useFormContext();

  // GUIDE: fix Do not define components during render
  const renderSliderMarker = (props: ComponentProps<typeof SliderMarker>) => <SliderMarker {...props} />;

  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <View {...viewProps}>
            <Text style={styles.label}>{label}</Text>

            <MultiSlider
              values={value}
              onValuesChange={newVal => onChange(newVal)}
              customMarker={props => renderSliderMarker({ ...props, formatValue: formatMarkerValue })}
              {...multiSliderProps}
            />
          </View>
        );
      }}
    />
  );
};

export default Slider;

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
  },

  track: {
    backgroundColor: THEME.colors.primary,
  },
});
