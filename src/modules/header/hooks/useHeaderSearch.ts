import { useCallback, useEffect, useMemo, useState } from 'react';
import { GetSearchDto, SuggestedSearch } from 'types';
import { debounce, getStorageItem } from 'utils';

const MOCK_DATA: GetSearchDto = {
  searchCategories: [
    {
      id: 'c81f8e2d-aa71-46b6-880f-bdd5be8447e7',
      name: 'Rau lá',
      level: 2,
      icon: 'https://cdn.tgdd.vn/Products/Images/8820/bhx/rau-la-cac-loai-202210311314254141.png',
      isLeaf: true,
      displayOrder: 1,
      parentCategory: {
        id: '95fdfda6-c4d6-409c-b324-bdf93af07096',
        name: 'Rau, củ, nấm, trái cây',
        level: 1,
        icon: 'https://cdn.tgdd.vn/Products/Images/10298/bhx/rau-cu-trai-cay-202205261519146845.png',
        isLeaf: false,
        displayOrder: 1,
      },
    },
    {
      id: '2b68c6fa-297d-4da4-8cde-0f925caea4ad',
      name: 'Trái cây',
      level: 2,
      icon: 'https://cdn.tgdd.vn/Products/Images/8788/bhx/trai-cay-cac-loai-202210311314516525.png',
      isLeaf: true,
      displayOrder: 0,
      parentCategory: {
        id: '95fdfda6-c4d6-409c-b324-bdf93af07096',
        name: 'Rau, củ, nấm, trái cây',
        level: 1,
        icon: 'https://cdn.tgdd.vn/Products/Images/10298/bhx/rau-cu-trai-cay-202205261519146845.png',
        isLeaf: false,
        displayOrder: 1,
      },
    },
  ],
  searchProducts: [
    {
      id: 'a4fdd866-6382-4be7-a444-5af51f79b3c8',
      name: 'Cải thìa',
      price: 30000,
      image: 'https://cdn.tgdd.vn/Products/Images/8820/230443/bhx/cai-thia-202403291332026458_300x300.jpg',
      leafCategoryId: 'c81f8e2d-aa71-46b6-880f-bdd5be8447e7',
      similarity: 0.2,
    },
    {
      id: '5bb9b592-fbe1-4002-b5ed-70f9e6a45f17',
      name: 'Cải bẹ dún',
      price: 25000,
      image: 'https://cdn.tgdd.vn/Products/Images/8820/230440/bhx/cai-be-dun-202403291332350628_300x300.jpg',
      leafCategoryId: 'c81f8e2d-aa71-46b6-880f-bdd5be8447e7',
      similarity: 0.16666667,
    },
    {
      id: '2c0ef0d9-b763-4ce5-bdc4-d9ee7a721120',
      name: 'Cải ngọt 400g',
      price: 12000,
      image: 'https://cdn.tgdd.vn/Products/Images/8820/226914/bhx/cai-ngot-400g-202405061618248208_300x300.jpg',
      leafCategoryId: 'c81f8e2d-aa71-46b6-880f-bdd5be8447e7',
      similarity: 0.13333334,
    },
    {
      id: '14bf2360-4fae-4b0b-bbbd-6cdb7e1278a9',
      name: 'Cải ngồng 400g',
      price: 12000,
      image: 'https://cdn.tgdd.vn/Products/Images/8820/324794/bhx/cai-ngong-400g-202405071435329874_300x300.jpg',
      leafCategoryId: 'c81f8e2d-aa71-46b6-880f-bdd5be8447e7',
      similarity: 0.125,
    },
    {
      id: '52aa77ae-78c9-4736-93a0-0993503a1f1a',
      name: 'Cải bẹ xanh 400g',
      price: 12000,
      image: 'https://cdn.tgdd.vn/Products/Images/8820/318099/bhx/cai-be-xanh-400g-202405061615435364_300x300.jpg',
      leafCategoryId: 'c81f8e2d-aa71-46b6-880f-bdd5be8447e7',
      similarity: 0.11111111,
    },
    {
      id: '1da9a061-ff0b-48c2-8249-bd07495bc4e8',
      name: 'Dưa lưới tròn ruột cam',
      price: 53800,
      image:
        'https://cdn.tgdd.vn/Products/Images/8788/226931/bhx/dua-luoi-tron-ruot-cam-trai-tu-1-2kg-202405131327106556_300x300.jpg',
      leafCategoryId: '2b68c6fa-297d-4da4-8cde-0f925caea4ad',
      similarity: 0.083333336,
    },
  ],
};

export const useHeaderSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [recentSearchTexts, setRecentSearchTexts] = useState<string[]>([]);

  const suggestSearches = useMemo<SuggestedSearch[]>(() => {
    const result: SuggestedSearch[] = MOCK_DATA.searchProducts.map(sp => ({
      productId: sp.id,
      productName: sp.name,
      productImage: sp.image,
      leafCategoryId: sp.leafCategoryId,
    }));

    return result;
  }, []);

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
    const formatSearchText = searchTextPar.trim();

    if (!formatSearchText) {
      return;
    }

    alert(`handleGetSearchResult ${formatSearchText}`);
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
    onChangeSearchText,
    handleClickRecentSearchText,
    handleClickSuggestedSearch,
  };
};
