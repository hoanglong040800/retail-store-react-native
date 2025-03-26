import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSearchResult } from 'service';
import { GetSearchDto, GetSearchQuery, SuggestedSearch } from 'types';
import { debounce, getStorageItem } from 'utils';

export const useHeaderSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [recentSearchTexts, setRecentSearchTexts] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const [searchResult, setSearchResult] = useState<GetSearchDto>(null);
  const [isLoadingSearchResult, setIsLoadingSearchResult] = useState(false);

  const suggestSearches = useMemo<SuggestedSearch[]>(() => {
    if (!searchResult) {
      return [];
    }

    const result: SuggestedSearch[] = searchResult.searchProducts.map(sp => ({
      productId: sp.id,
      productName: sp.name,
      productImage: sp.image,
      leafCategoryId: sp.leafCategoryId,
    }));

    return result;
  }, [searchResult]);

  // -------- FUNCTIONS -----------

  const getRecentSearchTexts = async () => {
    const storageTexts = await getStorageItem('recentSearchTexts');
    const limitTexts = storageTexts?.slice(1).slice(-5) || [];
    const revertTextArr = limitTexts.reverse();

    setRecentSearchTexts(revertTextArr);
  };

  const handleClickRecentSearchText = (index: number) => {
    const selectedText = recentSearchTexts[index];
    alert(`handleClickRecentSearchText ${selectedText}`);
  };

  const handleClickSuggestedSearch = (suggestedSearch: SuggestedSearch) => {
    alert(`handleClickSuggestedSearch ${suggestedSearch.productName}`);
  };

  const handleGetSearchResult = async (searchTextPar: string) => {
    try {
      setIsLoadingSearchResult(true);

      const formatSearchText = searchTextPar.trim();

      if (!formatSearchText) {
        setSearchResult(null);
        return;
      }

      const query: GetSearchQuery = {
        searchText: formatSearchText,
      };

      const res = await queryClient.fetchQuery({
        queryKey: ['searchResult'],
        queryFn: () => getSearchResult(query),
      });

      setSearchResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingSearchResult(false);
    }
  };

  // use useCallback to avoid call every time re-render
  const debounceSearch = useCallback(debounce(handleGetSearchResult, 1000), []);

  const onChangeSearchText = async (value: string): Promise<void> => {
    setSearchText(value);
    debounceSearch(value);
  };

  useEffect(() => {
    if (!recentSearchTexts.length) {
      getRecentSearchTexts();
    }
  }, [recentSearchTexts.length]);

  return {
    searchText,
    recentSearchTexts,
    suggestSearches,
    isLoadingSearchResult,
    onChangeSearchText,
    handleClickRecentSearchText,
    handleClickSuggestedSearch,
  };
};
