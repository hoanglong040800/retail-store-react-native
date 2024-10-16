/* eslint-disable camelcase */
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { addCartItems } from 'service';
import { inUseCartSelector, loginUserSelector } from 'states';
import { AddCartItemBody, CartItemDto, InUseCart, LoginUserDto, MutateCartItem } from 'types';
import { setStorageItems } from 'utils';

export const useCart = () => {
  const loginUser = useRecoilValue<LoginUserDto>(loginUserSelector);
  const inUseCart = useRecoilValue<InUseCart>(inUseCartSelector);
  const refreshInUseCart = useRecoilRefresher_UNSTABLE(inUseCartSelector);

  // const { mutateAsync: addCartItemsMutate } = useMutation({
  //   mutationFn: addCartItems,
  // });

  // ---------- FUNCTIONS ----------

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

    await handleServerAddCartItems(newInUseCart);
    await setStorageItems({ inUseCart: newInUseCart });
    refreshInUseCart();
  };

  const handleServerAddCartItems = async (newInUseCart: InUseCart): Promise<void> => {
    const allCartItems: MutateCartItem[] = Object.values(newInUseCart.cartItems)?.map((cartItem: CartItemDto) => {
      return {
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
      };
    });

    const body: AddCartItemBody = {
      mutateCartItems: allCartItems,
    };

    if (loginUser?.cartId) {
      await addCartItems(loginUser.cartId, body);
    }

    // TODO RSP-71 add to cart anonymous
  };

  return {
    inUseCart,
    adjustQuantity,
  };
};
