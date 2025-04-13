import { useBottomSheet } from 'components';
import { useAppNavigation } from 'hooks';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { CategoryDto, ParamsType, ProductDto, Screen } from 'types';
import { getCategoryById } from 'service';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';
import { ProductFilterForm, productFilterSchema } from '../_shared';

const resolvedRegisterSchema = yupResolver(object(productFilterSchema));

type Props = {
  params: ParamsType;
};

export const useProductListScreen = ({ params }: Props) => {
  const colNum = 2;
  const [selectedSubCate, setSelectedSubCate] = useState<{ index: number; id: string }>({ index: 0, id: '' });
  const [displayProducts, setDisplayProducts] = useState<ProductDto[]>([]);

  // -- FORM --

  const formMethod = useForm<ProductFilterForm>({
    resolver: resolvedRegisterSchema,
    defaultValues: {
      sortValue: '',
      sortBy: 'desc',
      priceStart: 0,
      priceEnd: 0,
    },
  });

  const { reset } = formMethod;

  // -- HOOKS --

  const { botSheetRef, onCloseBotSheet, onOpenBotSheet } = useBottomSheet({});
  const { navigate } = useAppNavigation();

  const { data: lv1Category, isLoading: isLoadingLv1Cate } = useQuery<CategoryDto, null, CategoryDto>({
    queryKey: [params.mainCate.id],
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

    // make shallow copy so react can detect change in object. https://stackoverflow.com/a/71767008/19568962
    let filteredProducts: ProductDto[] = [...selCate.products];

    const { sortValue } = filter;

    if (sortValue) {
      const sortByMultiplier = filter.sortBy === 'desc' ? -1 : 1;

      filteredProducts = filteredProducts.sort((a, b) => (a.price - b.price) * sortByMultiplier);
    }

    return filteredProducts;
  };

  const handleFilterChange = (newSelectedSubCate?: { index: number; id: string }) => {
    const filter = formMethod.getValues();

    const selectedIndex =
      typeof newSelectedSubCate?.index === 'number' ? newSelectedSubCate.index : selectedSubCate.index;

    const selCate = lv1Category.childCategories[selectedIndex];

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
    reset();
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
    formMethod,
    displayProducts,
    onPressProductCard,
    onPressCateItem,
    onPressApply,
    onPressFilter,
    onPressResetFilter,
  };
};
