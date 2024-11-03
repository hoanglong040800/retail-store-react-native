/* eslint-disable camelcase */
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { addCartItems } from 'service';
import { inUseCartSelector, loginUserSelector } from 'states';
import { AddCartItemBody, CartDto, CartItemDto, InUseCart, LoginUserDto, MutateCartItem } from 'types';
import { keyBy, setStorageItems } from 'utils';

export const useCart = () => {
  const loginUser = useRecoilValue<LoginUserDto>(loginUserSelector);
  const inUseCart = useRecoilValue<InUseCart>(inUseCartSelector);
  const refreshInUseCart = useRecoilRefresher_UNSTABLE(inUseCartSelector);

  // const { mutateAsync: addCartItemsMutate } = useMutation({
  //   mutationFn: addCartItems,
  // });

  // --------- STATES ----------

  // ---------- FUNCTIONS ----------

  const adjustQuantity = async ({
    productId,
    productName,
    quantity,
  }: {
    productId: string;
    quantity: number;
    productName?: string;
  }): Promise<void> => {
    const adjustingCartItem: CartItemDto = {
      id: 'random',
      quantity,
      product: {
        id: productId,
        name: productName,
      },
    };

    const newInUseCart: InUseCart = {
      ...inUseCart,
      cartItems: {
        ...inUseCart.cartItems,
        [productId]: adjustingCartItem,
      },
    };

    const resCart: CartDto = await handleServerAddCartItems(newInUseCart);

    if (!resCart?.cartItems) {
      throw new Error('Add/Update cart failed');
    }

    await handleSetInUseCartToStorage(resCart.cartItems);
  };

  /**
   * Recalculate cart, get latest image and save to storage
   */
  const syncLocalCart = async (cartItems: CartItemDto[]): Promise<void> => {
    await handleSetInUseCartToStorage(cartItems);
  };

  const handleSetInUseCartToStorage = async (cartItems: CartItemDto[]) => {
    const cartItemByProductId: Record<string, CartItemDto> = keyBy(cartItems, 'product.id');

    const newInUseCart: InUseCart = {
      cartItems: cartItemByProductId,
    };

    await setStorageItems({ inUseCart: newInUseCart });
    refreshInUseCart();
  };

  const handleServerAddCartItems = async (newInUseCart: InUseCart): Promise<CartDto> => {
    const allCartItems = Object.values(newInUseCart.cartItems)?.map((cartItem: CartItemDto) => {
      const mutateCartItem: MutateCartItem = {
        quantity: cartItem.quantity,
        productId: cartItem.product.id,
        product: {
          id: cartItem.product.id,
          name: cartItem.product.name,
        },
      };

      return mutateCartItem;
    });

    const body: AddCartItemBody = {
      mutateCartItems: allCartItems,
    };

    if (loginUser?.cartId) {
      return addCartItems(loginUser.cartId, body);
    }

    // TODO RSP-71 add to cart anonymous
    return null;
  };

  return {
    inUseCart,
    adjustQuantity,
    syncLocalCart,
  };
};
