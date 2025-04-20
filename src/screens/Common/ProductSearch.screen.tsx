import { Route } from '@react-navigation/native';
import { ScreenAppBar } from 'components';
import { CategoryList, ProductList } from 'modules';
import { useProductSearchScreen } from 'modules/product/hooks';
import { ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
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

  const { selectedCate, searchLv2Categories, isFetchingSearchResult, onPressCateItem, onPressProductCard } =
    useProductSearchScreen({
      searchParam,
    });

  // -- RENDERING --

  const fallBackContent = useMemo((): ReactNode | null => {
    if (isFetchingSearchResult) {
      return <ActivityIndicator />;
    }

    let fallbackText = '';

    if (!searchLv2Categories?.length) {
      fallbackText = searchParam ? 'No result found for this search' : 'No search text provided';
    }

    if (fallbackText) {
      return (
        <View style={styles.fallbackContainer}>
          <Text>{fallbackText}</Text>
        </View>
      );
    }

    return null;
  }, [isFetchingSearchResult, searchLv2Categories, searchParam]);

  return (
    <View style={styles.container}>
      <ScreenAppBar title={`Search result for: ${searchParam}`} />

      {fallBackContent || (
        <>
          <CategoryList
            list={searchLv2Categories}
            direction="row"
            itemSize="S"
            onPressItem={onPressCateItem}
            selectedId={selectedCate?.id}
          />

          <ProductList
            products={searchLv2Categories[selectedCate?.index]?.products}
            onPressProductCard={onPressProductCard}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductSearchScreen;
