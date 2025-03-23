import { useState } from 'react';

export const useHeaderSearch = () => {
  const [searchText, setSearchText] = useState('');

  const onChangeSearchText = async (value: string): Promise<void> => {
    setSearchText(value);
  };

  return {
    searchText,
    onChangeSearchText,
  };
};
