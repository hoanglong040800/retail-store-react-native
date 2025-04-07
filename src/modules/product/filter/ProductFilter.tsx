import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ProductFilterForm, productFilterSchema, SortProductVaule } from 'modules/product/_shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';
import { Dropdown } from 'components';

const SORT_VALUE_OPTIONS: { label: string; value: SortProductVaule }[] = [
  { label: 'None', value: '' },
  { label: 'Price', value: 'price' },
  { label: 'Name', value: 'name' },
];

const resolvedRegisterSchema = yupResolver(object(productFilterSchema));

type Props = {
  onPressApply: () => void;
  onPressResetCallback?: () => void;
};

const ProductFilter = ({ onPressApply, onPressResetCallback }: Props) => {
  const formMethod = useForm<ProductFilterForm>({
    resolver: resolvedRegisterSchema,
    defaultValues: {
      sortValue: '',
      sortBy: 'asc',
      priceStart: 0,
      priceEnd: 0,
    },
  });

  const { reset } = formMethod;

  const onPressReset = () => {
    reset();
    onPressResetCallback?.();
  };

  return (
    <View aria-label="Product Filter" style={styles.container}>
      <ScrollView aria-label="Sort section" style={styles.scrollView}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <FormProvider {...formMethod}>
          <Dropdown<ProductFilterForm>
            label="Sort by"
            name="sortValue"
            options={SORT_VALUE_OPTIONS}
            placeholder="Select sort value"
          />
        </FormProvider>
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
