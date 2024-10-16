import { useRecoilState } from 'recoil';
import { inUseCartState } from 'states';
import { CartItemDto, InUseCart } from 'types';

export const useCart = () => {
  const [inUseCart, setInUseCart] = useRecoilState<InUseCart>(inUseCartState);

  const adjustQuantity = async (productId: string, quantity: number): Promise<void> => {
    const adjustingCartItem: CartItemDto = {
      id: 'random',
      quantity,
      product: {
        id: productId,
      },
    };

    setInUseCart({
      ...inUseCart,

      cartItems: {
        ...inUseCart.cartItems,
        [productId]: adjustingCartItem,
      },
    });
  };

  return {
    inUseCart,
    adjustQuantity,
  };
};
