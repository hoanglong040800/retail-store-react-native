import { Route } from '@react-navigation/native';
import { BottomSheet, ScreenAppBar } from 'components';
import { CategoryList } from 'modules/category';
import { ProductList } from 'modules/product';
import { ProductFilter, useProductFilter } from 'modules/product/filter';

import { useProductListScreen } from 'modules/product/hooks';
import { FormProvider } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { ParamsType, Screen } from 'types';
import { SPACE } from 'const';

type Params = Pick<ParamsType, 'mainCate' | 'subCate'>;

type Props = {
  route: Route<Screen.ProductList, Params>;
};

const ProductListScreen = ({ route: { params } }: Props) => {
  const { formMethod, bottomSheetDraggable, onSliderChange } = useProductFilter();

  const {
    colNum,
    botSheetRef,
    lv1Category,
    selectedSubCate,
    isLoadingLv1Cate,
    displayProducts,
    priceRangeLimit,

    onPressFilter,
    onPressApply,
    onPressCateItem,
    onPressProductCard,
    onPressResetFilter,
  } = useProductListScreen({ params, formMethod });

  // -- RENDERING --

  const renderFilterButton = () => {
    return (
      <Button icon="tune-variant" onPress={onPressFilter}>
        Filter
      </Button>
    );
  };

  if (isLoadingLv1Cate) {
    return <ActivityIndicator animating />;
  }

  return (
    <View style={styles.container}>
      <ScreenAppBar title={lv1Category.name} right={renderFilterButton()} />

      <CategoryList
        list={lv1Category.childCategories}
        selectedId={selectedSubCate?.id}
        direction="row"
        onPressItem={onPressCateItem}
      />

      <ProductList
        colNum={colNum}
        products={displayProducts}
        onPressProductCard={onPressProductCard}
        style={styles.productList}
      />

      <BottomSheet botSheetRef={botSheetRef} snapPoints={['60%']} enableOverDrag={bottomSheetDraggable}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <FormProvider {...formMethod}>
          <ProductFilter
            priceRange={priceRangeLimit}
            onPressApply={onPressApply}
            onPressReset={onPressResetFilter}
            onSliderChange={onSliderChange}
          />
        </FormProvider>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // allow page to extend -> allow scroll
  },

  productList: {
    marginBottom: SPACE.md,
  },
});

export default ProductListScreen;
