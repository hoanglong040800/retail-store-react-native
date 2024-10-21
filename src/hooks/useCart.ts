/* eslint-disable camelcase */
import { useMemo } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { addCartItems } from 'service';
import { inUseCartSelector, loginUserSelector } from 'states';
import { AddCartItemBody, CartItemByProductId, CartItemDto, InUseCart, LoginUserDto, MutateCartItem } from 'types';
import { setStorageItems } from 'utils';

export const useCart = () => {
  const loginUser = useRecoilValue<LoginUserDto>(loginUserSelector);
  const inUseCart = useRecoilValue<InUseCart>(inUseCartSelector);
  const refreshInUseCart = useRecoilRefresher_UNSTABLE(inUseCartSelector);

  // const { mutateAsync: addCartItemsMutate } = useMutation({
  //   mutationFn: addCartItems,
  // });

  // --------- STATES ----------

  const cartProperties = useMemo(() => {
    const totalItems = Object.keys(inUseCart.cartItems).length;

    return { totalItems };
  }, [JSON.stringify(inUseCart.cartItems)]);

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

    await handleServerAddCartItems(newInUseCart);
    await handleSetCartItemsToStorage(newInUseCart);
    refreshInUseCart();
  };

  const handleSetCartItemsToStorage = async (inUseCartPar: InUseCart) => {
    const cleanedInUseCart: InUseCart = inUseCartPar;

    cleanedInUseCart.cartItems = Object.values(cleanedInUseCart.cartItems).reduce((prev, cur) => {
      if (cur.quantity > 0) {
        const newCartItems: CartItemByProductId = { ...prev, [cur.product.id]: cur };

        return newCartItems;
      }

      return prev;
    }, {});

    await setStorageItems({ inUseCart: cleanedInUseCart });
  };

  const handleServerAddCartItems = async (newInUseCart: InUseCart): Promise<void> => {
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
      await addCartItems(loginUser.cartId, body);
    }

    // TODO RSP-71 add to cart anonymous
  };

  return {
    inUseCart,
    cartProperties,
    adjustQuantity,
  };
};
