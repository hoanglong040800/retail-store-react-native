import { Route } from '@react-navigation/native';
import { ScreenAppBar } from 'components';
import { CategoryList, ProductList } from 'modules';
import { useProductSearchScreen } from 'modules/product/hooks';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { ParamsType, Screen } from 'types';

type Params = Pick<ParamsType, 'headerSearchText'>;

type Props = {
  route: Route<Screen.ProductSearch, Params>;
};

const ProductSearchScreen = ({ route }: Props) => {
  // -- STATE --
  const searchParam = useMemo<string>(() => {
    return route.params?.headerSearchText || '';
  }, [route.params?.headerSearchText]);

  const { selectedCate, searchLv2Categories, isFetchingSearchResult, onPressCateItem } = useProductSearchScreen({
    searchParam,
  });

  // -- RENDERING --

  if (isFetchingSearchResult) {
    return <ActivityIndicator />;
  }

  if (!searchLv2Categories?.length) {
    if (searchParam) {
      return <View>Not found any products on text: {searchParam}</View>;
    }

    return <View>Search text is empty</View>;
  }

  return (
    <View style={styles.container}>
      <ScreenAppBar title={`Search result for: ${searchParam}`} />

      <CategoryList
        list={searchLv2Categories}
        direction="row"
        itemSize="S"
        onPressItem={onPressCateItem}
        selectedId={selectedCate?.id}
      />

      <ProductList products={searchLv2Categories[selectedCate?.index]?.products} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProductSearchScreen;
