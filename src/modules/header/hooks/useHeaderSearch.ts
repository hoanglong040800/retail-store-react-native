import { useQueryClient } from '@tanstack/react-query';
import { useAppNavigation } from 'hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSearchResult } from 'service';
import { GetSearchDto, GetSearchQuery, Screen, SuggestedSearch } from 'types';
import { debounce, getStorageItem } from 'utils';

type Props = {
  onPressBack?: () => void;
};

export const useHeaderSearch = ({ onPressBack }: Props) => {
  const queryClient = useQueryClient();
  const { navigate } = useAppNavigation();

  const [searchText, setSearchText] = useState('');
  const [recentSearchTexts, setRecentSearchTexts] = useState<string[]>([]);
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
    navigate(Screen.ProductSearch, { headerSearchText: selectedText });
    handleAfterPressSearch();
  };

  const handlePressEnterOrClickSearch = (curSearchText: string) => {
    navigate(Screen.ProductSearch, { headerSearchText: curSearchText });
    handleAfterPressSearch();
  };

  const handleClickSuggestedSearch = (suggestedSearch: SuggestedSearch) => {
    navigate(Screen.ProductDetail, {
      productId: suggestedSearch.productId,
    });
    handleAfterPressSearch();
  };

  const handleAfterPressSearch = () => {
    setSearchText('');
    setSearchResult(null);
    onPressBack?.();
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
    handlePressEnterOrClickSearch,
  };
};
