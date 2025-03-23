import { useEffect, useState } from 'react';
import { getStorageItem } from 'utils';

export const useHeaderSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [recentSearchTexts, setRecentSearchTexts] = useState<string[]>([]);

  const getRecentSearchTexts = async () => {
    const storageTexts = await getStorageItem('recentSearchTexts');
    const limitTexts = storageTexts?.slice(1).slice(-5) || [];
    const revertTextArr = limitTexts.reverse();

    setRecentSearchTexts(revertTextArr);
  };

  const handleClickRecentSearchText = (index: number) => {
    const selectedText = recentSearchTexts[index];
    alert(selectedText);
  };

  const onChangeSearchText = async (value: string): Promise<void> => {
    setSearchText(value);
  };

  useEffect(() => {
    if (!recentSearchTexts.length) {
      getRecentSearchTexts();
    }
  }, [recentSearchTexts.length]);

  return {
    searchText,
    recentSearchTexts,
    onChangeSearchText,
    handleClickRecentSearchText,
  };
};
