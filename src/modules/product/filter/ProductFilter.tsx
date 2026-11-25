import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { ProductFilterForm, SortBy, SortProductVaule } from 'modules/product/_shared';
import { Slider } from 'components';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { DEFAULT_INPUT_VALUE, RADIUS, SIZE, SPACE } from 'const';
import { useAppTheme } from 'hooks';

const SORT_PRODUCT_VALUE_OPTIONS: { label: string; value: SortProductVaule }[] = [
  { label: 'None', value: '' },
  { label: 'Price', value: 'price' },
  { label: 'Name', value: 'name' },
];

const SORT_DIRECTION_OPTIONS: { label: string; value: SortBy }[] = [
  { label: 'Asc', value: 'asc' },
  { label: 'Desc', value: 'desc' },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDER_MARGIN = SPACE.lg;

type ChoiceChipsProps = {
  label: string;
  name: keyof ProductFilterForm;
  options: { label: string; value: string }[];
};

const ChoiceChips = ({ label, name, options }: ChoiceChipsProps) => {
  const { colors } = useAppTheme();
  const { control } = useFormContext<ProductFilterForm>();
  const { field } = useController({ control, name });

  return (
    <View style={styles.chipSection}>
      <Text variant="titleSmall">{label}</Text>

      <View style={styles.chipRow}>
        {options.map(option => {
          const isSelected = (field.value ?? '') === option.value;

          return (
            <Chip
              key={option.value}
              selected={isSelected}
              showSelectedCheck
              onPress={() => field.onChange(option.value)}
              style={[styles.chip, { backgroundColor: isSelected ? colors.primaryContainer : colors.elevation.level1 }]}
              selectedColor={isSelected ? colors.onPrimaryContainer : colors.onSurface}
            >
              {option.label}
            </Chip>
          );
        })}
      </View>
    </View>
  );
};

type Props = {
  priceRange?: [number, number];
  priceStep?: number;
  onPressApply: () => void;
  onPressReset: () => void;
  onSliderChange: (isChanging: boolean) => void;
};

const ProductFilter = ({
  priceRange = DEFAULT_INPUT_VALUE.priceRange,
  priceStep = DEFAULT_INPUT_VALUE.priceStep,
  onPressApply,
  onPressReset,
  onSliderChange,
}: Props) => {
  const [isScrollable, setIsScrollable] = useState(false);

  const onSliderChangeStart = () => {
    setIsScrollable(false);
    onSliderChange(true);
  };

  const onSliderChangeEnd = () => {
    setIsScrollable(true);
    onSliderChange(false);
  };

  const formatPriceMarkerValue = (value: number): string => {
    const newVal = value.toString().slice(0, -3);

    return newVal;
  };

  return (
    <View aria-label="Product Filter" style={styles.container}>
      <ScrollView aria-label="Sort section" style={styles.scrollView} scrollEnabled={isScrollable}>
        <View style={styles.sortSec}>
          <Text variant="titleLarge">Filter</Text>

          <ChoiceChips label="Sort value" name="sortValue" options={SORT_PRODUCT_VALUE_OPTIONS} />

          <ChoiceChips label="Sort By" name="sortBy" options={SORT_DIRECTION_OPTIONS} />
        </View>

        <Slider<ProductFilterForm>
          name="priceRange"
          label="Price Range (đ)"
          onValuesChangeStart={onSliderChangeStart}
          onValuesChangeFinish={onSliderChangeEnd}
          valueSuffix="k"
          formatMarkerValue={formatPriceMarkerValue}
          min={priceRange[0]}
          max={priceRange[1]}
          step={priceStep}
          sliderLength={SCREEN_WIDTH - (SLIDER_MARGIN * 2 + SPACE.xl)}
          containerStyle={styles.sliderContainer}
          viewProps={{ style: styles.sliderView }}
        />
      </ScrollView>

      <View style={styles.btnCon}>
        <Button mode="text" onPress={onPressReset} style={styles.btn}>
          Reset
        </Button>

        <Button mode="contained" onPress={onPressApply} style={styles.btn}>
          Apply
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  scrollView: {
    flex: 1,
    marginBottom: SIZE.buttonHeight + SPACE.sm, // prevent content from being hidden behind button
  },

  sortSec: {
    gap: SPACE.md,
  },

  chipSection: {
    gap: SPACE.xs,
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACE.xs,
  },

  chip: {
    borderRadius: RADIUS.sm,
  },

  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACE.xs,
  },

  btn: {
    flex: 1,
  },

  sliderView: {
    marginTop: SPACE.lg,
  },

  sliderContainer: {
    marginHorizontal: SLIDER_MARGIN,
  },
});

export default ProductFilter;
