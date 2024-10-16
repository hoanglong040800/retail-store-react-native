/* eslint-disable camelcase */
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { inUseCartSelector } from 'states';
import { CartItemDto, InUseCart } from 'types';
import { printAsyncStorage, setStorageItems } from 'utils';

export const useCart = () => {
  const inUseCart = useRecoilValue<InUseCart>(inUseCartSelector);
  const refreshInUseCart = useRecoilRefresher_UNSTABLE(inUseCartSelector);

  const adjustQuantity = async (productId: string, quantity: number): Promise<void> => {
    const adjustingCartItem: CartItemDto = {
      id: 'random',
      quantity,
      product: {
        id: productId,
      },
    };

    const newInUseCart: InUseCart = {
      ...inUseCart,
      cartItems: {
        ...inUseCart.cartItems,
        [productId]: adjustingCartItem,
      },
    };

    await setStorageItems({ inUseCart: newInUseCart });
    refreshInUseCart();
    printAsyncStorage();
  };

  return {
    inUseCart,
    adjustQuantity,
  };
};
