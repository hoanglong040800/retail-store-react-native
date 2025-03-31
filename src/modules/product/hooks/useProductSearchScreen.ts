import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { getSearchResult } from 'service';
import { CategoryDto, GetSearchDto, ParamsType, SearchProductDto } from 'types';
import { keyByArr } from 'utils';

type Props = {
  searchParam: ParamsType['headerSearchText'];
};

export const useProductSearchScreen = ({ searchParam }: Props) => {
  // -- STATE --
  const [selectedCate, setSelectedCate] = useState<{ index: number; id: string }>(null);

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

    const productsByLv2CateId: Record<string, SearchProductDto[]> = keyByArr<SearchProductDto>(
      getSearchRes.searchProducts,
      'leafCategoryId'
    );

    const mappedProductCategories: CategoryDto[] = getSearchRes.searchCategories.map(cate => {
      const productOfCate = productsByLv2CateId[cate.id] || [];

      return {
        ...cate,
        products: productOfCate,
      };
    });

    setSelectedCate({ index: 0, id: mappedProductCategories[0]?.id });

    return mappedProductCategories;
  }, [getSearchRes]);

  // -- FUNCTIONS --

  const onPressCateItem = (index: number, id: string) => {
    setSelectedCate({ index, id });
  };

  return {
    selectedCate,
    searchLv2Categories,
    isFetchingSearchResult,
    onPressCateItem,
  };
};
