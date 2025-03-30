import { useQueryClient } from '@tanstack/react-query';
import { SEARCH_BAR } from 'const';
import { useAppNavigation } from 'hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSearchResult } from 'service';
import { GetSearchDto, GetSearchQuery, Screen, StorageType, SuggestedSearch } from 'types';
import { debounce, getStorageItem, setStorageItems } from 'utils';

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
    const storageTexts: StorageType['recentSearchTexts'] = (await getStorageItem('recentSearchTexts')) || [];

    if (!storageTexts.length) {
      setRecentSearchTexts(storageTexts);
      return;
    }

    const filteredStorageTexts = storageTexts.filter(text => text);

    if (filteredStorageTexts.length > SEARCH_BAR.MAXIMUM_RECENT_SEARCH_TEXT) {
      filteredStorageTexts.length = SEARCH_BAR.MAXIMUM_RECENT_SEARCH_TEXT;
    }

    setRecentSearchTexts(filteredStorageTexts);
  };

  const handleClickRecentSearchText = (index: number) => {
    const selectedText = recentSearchTexts[index];
    navigate(Screen.ProductSearch, { headerSearchText: selectedText });
    handleAfterPressSearch(selectedText);
  };

  const handlePressEnterOrClickSearch = (curSearchText: string) => {
    navigate(Screen.ProductSearch, { headerSearchText: curSearchText });
    handleAfterPressSearch(curSearchText);
  };

  const handleClickSuggestedSearch = (suggestedSearch: SuggestedSearch) => {
    navigate(Screen.ProductDetail, {
      productId: suggestedSearch.productId,
    });
    handleAfterPressSearch(searchText);
  };

  const formatSearchText = (searchTextPar: string) => {
    return searchTextPar.trim();
  };

  const handleAfterPressSearch = async (searchTextPar: string) => {
    setSearchText('');
    setSearchResult(null);
    await saveRecentSearchText(searchTextPar);

    onPressBack?.();
  };

  const saveRecentSearchText = async (searchTextPar: string) => {
    const formattedSearchText = formatSearchText(searchTextPar);

    const nonDupSearchTexts: string[] = recentSearchTexts.filter(text => text !== formattedSearchText);

    const newSearchTexts = [formattedSearchText, ...nonDupSearchTexts];

    const filteredSearchTexts = newSearchTexts.filter(text => text);

    if (filteredSearchTexts.length > SEARCH_BAR.MAXIMUM_RECENT_SEARCH_TEXT) {
      filteredSearchTexts.length = SEARCH_BAR.MAXIMUM_RECENT_SEARCH_TEXT;
    }

    await setStorageItems({
      recentSearchTexts: filteredSearchTexts,
    });

    // get again to update latest texts
    await getRecentSearchTexts();
  };

  const handleGetSearchResult = async (searchTextPar: string) => {
    try {
      setIsLoadingSearchResult(true);

      const formattedSearchText = searchTextPar.trim();

      if (!formattedSearchText) {
        setSearchResult(null);
        return;
      }

      const query: GetSearchQuery = {
        searchText: formattedSearchText,
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
    getRecentSearchTexts();
  }, []);

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
