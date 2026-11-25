import { MarkerProps } from '@ptomasroos/react-native-multi-slider';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from 'hooks';

type CustomMarkerProps = MarkerProps & {
  formatValue?: (value: number) => string;
};

export const SliderMarker = ({ currentValue, valueSuffix, formatValue }: CustomMarkerProps) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.customMarkerCon, { backgroundColor: colors.elevation.level1, borderColor: colors.outlineVariant }]}
    >
      <Text variant="labelSmall">
        {formatValue?.(currentValue) || currentValue}
        {valueSuffix}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  customMarkerCon: {
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    padding: 4,
  },
});
