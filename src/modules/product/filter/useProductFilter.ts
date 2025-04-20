import { useForm } from 'react-hook-form';
import { object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { DEFAULT_INPUT_VALUE } from 'const';
import { ProductFilterForm, productFilterSchema } from '../_shared';

const resolvedRegisterSchema = yupResolver(object(productFilterSchema));

export const useProductFilter = () => {
  const formMethod = useForm<ProductFilterForm>({
    resolver: resolvedRegisterSchema,
    defaultValues: {
      sortValue: '',
      sortBy: 'asc',
      priceRange: DEFAULT_INPUT_VALUE.priceRange,
    },
  });

  const [bottomSheetDraggable, setBottomSheetDraggable] = useState(true);

  const onSliderChange = (isChanging: boolean) => {
    setBottomSheetDraggable(!isChanging);
  };

  return {
    formMethod,
    bottomSheetDraggable,
    onSliderChange,
  };
};
