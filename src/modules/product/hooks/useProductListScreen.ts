import { UseFormReturn } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useBottomSheet } from 'components';
import { useAppNavigation } from 'hooks';
import { useState, useEffect } from 'react';
import { CategoryDto, ParamsType, ProductDto, Screen } from 'types';
import { getCategoryById } from 'service';
import { ProductFilterForm } from '../_shared';

type Props = {
  params: ParamsType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formMethod: UseFormReturn<ProductFilterForm, any, ProductFilterForm>;
};

export const useProductListScreen = ({ params, formMethod }: Props) => {
  const colNum = 2;
  const [selectedSubCate, setSelectedSubCate] = useState<{ index: number; id: string }>({ index: 0, id: '' });
  const [displayProducts, setDisplayProducts] = useState<ProductDto[]>([]);

  // -- HOOKS --

  const { botSheetRef, onCloseBotSheet, onOpenBotSheet } = useBottomSheet({});
  const { navigate } = useAppNavigation();

  const { data: lv1Category, isLoading: isLoadingLv1Cate } = useQuery<CategoryDto, null, CategoryDto>({
    queryKey: ['category', params.mainCate.id],
    queryFn: () => getCategoryById(params.mainCate.id),
  });

  // -- FUNCTIONS --

  const getFilteredProducts = (selCate: CategoryDto, filter: ProductFilterForm): ProductDto[] => {
    if (!selCate?.products?.length) {
      return [];
    }

    if (!filter) {
      return selCate.products;
    }

    // Create a shallow copy of the array to ensure React detects state changes,
    // as React compares references to determine if the state has changed.
    let filteredProducts: ProductDto[] = [...selCate.products];

    const { sortValue } = filter;

    if (sortValue) {
      const sortByMultiplier = filter.sortBy === 'desc' ? -1 : 1;

      if (sortValue === 'price') {
        filteredProducts = filteredProducts.sort(
          (a, b) => (a[filter.sortValue] - b[filter.sortValue]) * sortByMultiplier
        );
      } else {
        filteredProducts = filteredProducts.sort((a, b) => a[sortValue].localeCompare(b[sortValue]) * sortByMultiplier);
      }
    }

    return filteredProducts;
  };

  const handleFilterChange = (newSelectedSubCate?: { index: number; id: string }) => {
    const filter = formMethod.getValues();

    const selectedIndex =
      typeof newSelectedSubCate?.index === 'number' ? newSelectedSubCate.index : selectedSubCate.index;

    const selCate = lv1Category?.childCategories?.[selectedIndex];

    const filteredProducts = getFilteredProducts(selCate, filter);

    setDisplayProducts(filteredProducts);
  };

  const onPressProductCard = (id: string) => {
    navigate(Screen.ProductDetail, {
      productId: id,
    });
    handleFilterChange();
  };

  const onPressCateItem = (index: number, id: string) => {
    const newSelectedCate = { index, id };

    setSelectedSubCate(newSelectedCate);
    handleFilterChange(newSelectedCate);
  };

  const onPressFilter = () => {
    onOpenBotSheet();
  };

  const onPressApply = () => {
    onCloseBotSheet();
    handleFilterChange();
  };

  const onPressResetFilter = () => {
    formMethod.reset();
    handleFilterChange();
  };
  // -- EFFECTS --

  // fetch data changed
  useEffect(() => {
    if (!lv1Category) {
      return;
    }

    const index = lv1Category.childCategories.findIndex(cate => cate.id === params.subCate.id);
    const id = lv1Category.childCategories[index]?.id;

    setSelectedSubCate({ index, id });
    onPressResetFilter();

    // only need to fetch first time
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lv1Category, params.subCate.id]);

  return {
    colNum,
    botSheetRef,
    lv1Category,
    selectedSubCate,
    isLoadingLv1Cate,
    displayProducts,

    onPressProductCard,
    onPressCateItem,
    onPressApply,
    onPressFilter,
    onPressResetFilter,
  };
};
