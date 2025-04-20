import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ProductFilterForm, SortBy, SortProductVaule } from 'modules/product/_shared';
import { Dropdown, Slider } from 'components';
import { useState } from 'react';
import { DEFAULT_INPUT_VALUE } from 'const';

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
          <Dropdown<ProductFilterForm>
            label="Sort value"
            name="sortValue"
            options={SORT_PRODUCT_VALUE_OPTIONS}
            placeholder="Select sort value"
          />

          <Dropdown<ProductFilterForm>
            label="Sort By"
            name="sortBy"
            options={SORT_DIRECTION_OPTIONS}
            placeholder="Select sort by"
          />
        </View>

        <Slider<ProductFilterForm>
          name="priceRange"
          label="Price Range (000đ)"
          onValuesChangeStart={onSliderChangeStart}
          onValuesChangeFinish={onSliderChangeEnd}
          valueSuffix="k"
          formatMarkerValue={formatPriceMarkerValue}
          min={priceRange[0]}
          max={priceRange[1]}
          step={priceStep}
          sliderLength={SCREEN_WIDTH - (styles.sliderContainer.marginHorizontal * 2 + 32)}
          containerStyle={styles.sliderContainer}
          viewProps={{ style: styles.sliderView }}
        />
      </ScrollView>

      <View style={styles.btnCon}>
        <Button mode="outlined" onPress={onPressReset} style={styles.btn}>
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
    marginBottom: 60, // Add margin to prevent content from being hidden behind button
  },

  sortSec: {
    flexDirection: 'row',
    gap: 8,
  },

  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  btn: {
    flex: 1,
  },

  sliderView: {
    marginTop: 16,
  },

  sliderContainer: {
    marginHorizontal: 16,
  },
});

export default ProductFilter;
