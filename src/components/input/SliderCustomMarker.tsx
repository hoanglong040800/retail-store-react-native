import { MarkerProps } from '@ptomasroos/react-native-multi-slider';
import { THEME } from 'const';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type CustomMarkerProps = MarkerProps & {
  formatValue?: (value: number) => string;
};

export const SliderMarker = ({ currentValue, valueSuffix, formatValue }: CustomMarkerProps) => {
  return (
    <View style={styles.customMarkerCon}>
      <Text variant="labelSmall">
        {formatValue?.(currentValue) || currentValue}
        {valueSuffix}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
  },

  track: {
    backgroundColor: THEME.colors.primary,
  },

  customMarkerCon: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'rgb(0,0,0, 0.5)',
    padding: 4,
  },
});
