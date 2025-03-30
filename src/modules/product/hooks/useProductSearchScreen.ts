import { useQuery } from '@tanstack/react-query';
import { getSearchResult } from 'service';
import { GetSearchDto, ParamsType } from 'types';

type Props = {
  searchParam: ParamsType['headerSearchText'];
};

export const useProductSearchScreen = ({ searchParam }: Props) => {
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

  const { data: searchResult, isLoading: isFetchingSearchResult } = useQuery<GetSearchDto, null, GetSearchDto>({
    queryKey: ['search', searchParam],
    queryFn: () => fetchProductSearch(searchParam),
  });

  return {
    searchResult,
    isFetchingSearchResult,
  };
};
