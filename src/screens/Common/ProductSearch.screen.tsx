import { Route } from '@react-navigation/native';
import { ScreenAppBar } from 'components';
import { useProductSearchScreen } from 'modules/product/hooks';
import { useMemo } from 'react';
import { View } from 'react-native';
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

  const { searchResult, isFetchingSearchResult } = useProductSearchScreen({ searchParam });

  // -- RENDERING --

  if (isFetchingSearchResult) {
    return <ActivityIndicator />;
  }

  if (!searchResult?.searchProducts?.length) {
    if (searchParam) {
      return <View>Not found any products on text: {searchParam}</View>;
    }

    if (!searchParam) {
      return <View>Search text is empty</View>;
    }
  }

  return (
    <View>
      <ScreenAppBar title={`Search result for: ${searchParam}`} />
    </View>
  );
};

export default ProductSearchScreen;
