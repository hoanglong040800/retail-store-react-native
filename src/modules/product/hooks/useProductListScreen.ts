import { useAppNavigation } from 'hooks';
import { Screen } from 'types';

export const useProductListScreen = () => {
  const colNum = 2;

  const { navigate } = useAppNavigation();

  const onPressProductCard = (id: string) => {
    navigate(Screen.ProductDetail, {
      productId: id,
    });
  };

  return {
    colNum,
    onPressProductCard,
  };
};
