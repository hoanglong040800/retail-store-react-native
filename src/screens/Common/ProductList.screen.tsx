import { Route } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { BottomSheet, ScreenAppBar, useBottomSheet } from 'components';
import { CategoryList } from 'modules/category';
import { ProductList } from 'modules/product';
import { ProductFilter } from 'modules/product/filter';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { getCategoryById } from 'service';
import { CategoryDto, ParamsType, Screen } from 'types';

type Params = Pick<ParamsType, 'mainCate' | 'subCate'>;

type Props = {
  route: Route<Screen.ProductList, Params>;
};

const ProductListScreen = ({ route: { params } }: Props) => {
  const [selectedSubCate, setSelectedSubCate] = useState<{ index: number; id: string }>(null);

  const { botSheetRef, onCloseBotSheet, onOpenBotSheet } = useBottomSheet({});

  const { data: lv1Category, isLoading } = useQuery<CategoryDto, null, CategoryDto>({
    queryKey: [params.mainCate.id],
    queryFn: () => getCategoryById(params.mainCate.id),
  });

  const onPressCateItem = (index: number, id: string) => {
    setSelectedSubCate({ index, id });
  };

  const onPressApply = () => {
    onCloseBotSheet();
  };

  useEffect(() => {
    if (!lv1Category) {
      return;
    }

    const index = lv1Category.childCategories.findIndex(cate => cate.id === params.subCate.id);
    const id = lv1Category.childCategories[index]?.id;

    setSelectedSubCate({ index, id });
  }, [lv1Category, params.subCate.id]);

  if (isLoading) {
    return <ActivityIndicator animating />;
  }

  // -- RENDERING --

  const renderFilterButton = () => {
    return (
      <Button icon="filter" onPress={onOpenBotSheet}>
        Filter
      </Button>
    );
  };

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
        products={lv1Category.childCategories[selectedSubCate?.index]?.products}
        style={styles.productList}
      />

      <BottomSheet botSheetRef={botSheetRef} snapPoints={['60%']}>
        <ProductFilter onPressApply={onPressApply} />
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
