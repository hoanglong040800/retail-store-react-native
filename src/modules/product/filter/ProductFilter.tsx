import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ProductFilterForm, SortBy, SortProductVaule } from 'modules/product/_shared';
import { Dropdown } from 'components';

const SORT_VALUE_OPTIONS: { label: string; value: SortProductVaule }[] = [
  { label: 'None', value: '' },
  { label: 'Price', value: 'price' },
  { label: 'Name', value: 'name' },
];

const SORT_BY_OPTIONS: { label: string; value: SortBy }[] = [
  { label: 'Asc', value: 'asc' },
  { label: 'Desc', value: 'desc' },
];

type Props = {
  onPressApply: () => void;
  onPressReset: () => void;
};

const ProductFilter = ({ onPressApply, onPressReset }: Props) => {
  return (
    <View aria-label="Product Filter" style={styles.container}>
      <ScrollView aria-label="Sort section" style={styles.scrollView}>
        <View style={styles.sortSec}>
          <Dropdown<ProductFilterForm>
            label="Sort value"
            name="sortValue"
            options={SORT_VALUE_OPTIONS}
            placeholder="Select sort value"
          />

          <Dropdown<ProductFilterForm>
            label="Sort By"
            name="sortBy"
            options={SORT_BY_OPTIONS}
            placeholder="Select sort by"
          />
        </View>
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
});

export default ProductFilter;
