import { useBottomSheet } from 'components';
import { useAppNavigation } from 'hooks';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { CategoryDto, ParamsType, Screen } from 'types';
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
  const [selectedSubCate, setSelectedSubCate] = useState<{ index: number; id: string }>(null);

  // -- FORM --

  const formMethod = useForm<ProductFilterForm>({
    resolver: resolvedRegisterSchema,
    defaultValues: {
      sortValue: '',
      sortBy: 'asc',
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

  const onPressProductCard = (id: string) => {
    navigate(Screen.ProductDetail, {
      productId: id,
    });
  };

  const onPressCateItem = (index: number, id: string) => {
    setSelectedSubCate({ index, id });
  };

  const onPressApply = () => {
    onCloseBotSheet();
  };

  const onPressFilter = () => {
    onOpenBotSheet();
  };

  const onPressResetFilter = () => {
    reset();
  };

  // -- EFFECTS --

  useEffect(() => {
    if (!lv1Category) {
      return;
    }

    const index = lv1Category.childCategories.findIndex(cate => cate.id === params.subCate.id);
    const id = lv1Category.childCategories[index]?.id;

    setSelectedSubCate({ index, id });
  }, [lv1Category, params.subCate.id]);

  return {
    colNum,
    botSheetRef,
    lv1Category,
    selectedSubCate,
    isLoadingLv1Cate,
    formMethod,
    onPressProductCard,
    onPressCateItem,
    onPressApply,
    onPressFilter,
    onPressResetFilter,
  };
};
