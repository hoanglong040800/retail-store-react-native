import { useQuery } from '@tanstack/react-query';
import { useAppNavigation } from 'hooks';
import { useMemo, useState } from 'react';
import { getSearchResult } from 'service';
import { CategoryDto, GetSearchDto, ParamsType, Screen, SearchProductDto } from 'types';
import { keyByArr } from 'utils';

const ALL_PRODUCTS_TAB: CategoryDto = {
  id: 'all',
  name: 'All Products',
  icon: 'https://cdn-icons-png.flaticon.com/512/1198/1198284.png',
  level: 0,
  isLeaf: true,
};

type Props = {
  searchParam: ParamsType['headerSearchText'];
};

export const useProductSearchScreen = ({ searchParam }: Props) => {
  // -- STATE --
  const [selectedCate, setSelectedCate] = useState<{ index: number; id: string }>(null);
  const { navigate } = useAppNavigation();

  // -- QUERY --
  const fetchProductSearch = async (headerSearchText: string): Promise<GetSearchDto> => {
    if (!headerSearchText) {
      return {
        searchCategories: [],
        searchProducts: [],
      };
    }

    return getSearchResult({ searchText: searchParam });
  };

  const { data: getSearchRes, isLoading: isFetchingSearchResult } = useQuery<GetSearchDto, null, GetSearchDto>({
    queryKey: ['search', searchParam],
    queryFn: () => fetchProductSearch(searchParam),
  });

  const searchLv2Categories = useMemo<CategoryDto[]>(() => {
    if (!getSearchRes?.searchCategories?.length) {
      return [];
    }

    const mappedProductCategories = mapFetchedSearchCate(getSearchRes);
    const allProductTab: CategoryDto = {
      ...ALL_PRODUCTS_TAB,
      products: getSearchRes.searchProducts,
    };

    const mapFixTabCategories = [allProductTab, ...mappedProductCategories];

    setSelectedCate({ index: 0, id: mapFixTabCategories[0]?.id });

    return mapFixTabCategories;
  }, [getSearchRes]);

  // -- FUNCTIONS --

  // function expression is not hositing, only normal function
  function mapFetchedSearchCate(searchResponse: GetSearchDto): CategoryDto[] {
    const productsByLv2CateId: Record<string, SearchProductDto[]> = keyByArr<SearchProductDto>(
      searchResponse.searchProducts,
      'leafCategoryId'
    );

    const mappedProductCategories: CategoryDto[] = searchResponse.searchCategories.map(cate => {
      const productOfCate = productsByLv2CateId[cate.id] || [];

      return {
        ...cate,
        products: productOfCate,
      };
    });

    return mappedProductCategories;
  }

  const onPressCateItem = (index: number, id: string) => {
    setSelectedCate({ index, id });
  };

  const onPressProductCard = (productId: string) => {
    if (!productId) {
      console.warn('Warning: productId is required but was not provided.');
      return;
    }

    navigate(Screen.ProductDetail, { productId });
  };

  return {
    selectedCate,
    searchLv2Categories,
    isFetchingSearchResult,
    onPressCateItem,
    onPressProductCard,
  };
};
