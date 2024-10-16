import { Route } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ScreenAppBar } from 'components';
import { CategoryList } from 'modules/category';
import { ProductList } from 'modules/product';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getCategoryById } from 'service';
import { CategoryDto, ParamsType, Screen } from 'types';

type Params = Pick<ParamsType, 'mainCate' | 'subCate'>;

type Props = {
  route: Route<Screen.ProductList, Params>;
};

const ProductListScreen = ({ route: { params } }: Props) => {
  const [selectedSubCate, setSelectedSubCate] = useState<{ index: number; id: string }>(null);

  const { data: lv1Category, isLoading } = useQuery<CategoryDto, null, CategoryDto>({
    queryKey: [params.mainCate.id],
    queryFn: () => getCategoryById(params.mainCate.id),
  });

  const onPressCateItem = (index: number, id: string) => {
    setSelectedSubCate({ index, id });
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

  return (
    <View style={styles.container}>
      <ScreenAppBar title={lv1Category.name} />

      <CategoryList
        list={lv1Category.childCategories}
        selectedId={selectedSubCate?.id}
        direction="row"
        itemSize="S"
        onPressItem={onPressCateItem}
      />

      <ProductList products={lv1Category.childCategories[selectedSubCate?.index]?.products} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // allow page to extend -> allow scroll
    paddingHorizontal: 8,
  },
});

export default ProductListScreen;
