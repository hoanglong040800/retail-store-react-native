import { Route } from '@react-navigation/native';
import { BottomSheet, ScreenAppBar } from 'components';
import { CategoryList } from 'modules/category';
import { ProductList } from 'modules/product';
import { ProductFilter } from 'modules/product/filter';
import { useProductListScreen } from 'modules/product/hooks';
import { FormProvider } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { ParamsType, Screen } from 'types';

type Params = Pick<ParamsType, 'mainCate' | 'subCate'>;

type Props = {
  route: Route<Screen.ProductList, Params>;
};

const ProductListScreen = ({ route: { params } }: Props) => {
  const {
    colNum,
    formMethod,
    botSheetRef,
    lv1Category,
    selectedSubCate,
    isLoadingLv1Cate,
    onPressFilter,
    onPressApply,
    onPressCateItem,
    onPressProductCard,
    onPressResetFilter,
  } = useProductListScreen({ params });

  // -- RENDERING --

  const renderFilterButton = () => {
    return (
      <Button icon="filter" onPress={onPressFilter}>
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
        itemSize="S"
        onPressItem={onPressCateItem}
      />

      <ProductList
        colNum={colNum}
        products={lv1Category.childCategories[selectedSubCate?.index]?.products}
        onPressProductCard={onPressProductCard}
        style={styles.productList}
      />

      <BottomSheet botSheetRef={botSheetRef} snapPoints={['60%']}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <FormProvider {...formMethod}>
          <ProductFilter onPressApply={onPressApply} onPressReset={onPressResetFilter} />
        </FormProvider>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // allow page to extend -> allow scroll
    paddingHorizontal: 8,
  },

  productList: {
    paddingTop: 12,
    marginBottom: 20,
  },
});

export default ProductListScreen;
