/* eslint-disable camelcase */
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { addCartItems, checkout } from 'service';
import { inUseCartSelector, loginUserSelector, selectedLocationSelector } from 'states';
import {
  AddCartItemBody,
  BranchDto,
  CartDto,
  CartItemDto,
  CheckoutBody,
  CheckoutDto,
  InUseCart,
  LoginUserDto,
  MutateCartItem,
  Screen,
  SelectedLocation,
} from 'types';
import { keyBy, removeStorageItems, setStorageItems } from 'utils';
import { DeliveryTypeEnum } from 'types/enum';
import { CheckoutForm } from 'modules/cart';
import { useSnackbar } from 'components';
import { useAuth } from './useAuth';
import { useAppNavigation } from './useAppNavigation';

export const useCart = () => {
  // --------- RECOIL ----------
  const loginUser = useRecoilValue<LoginUserDto>(loginUserSelector);
  const inUseCart = useRecoilValue<InUseCart>(inUseCartSelector);
  const selectedLocation = useRecoilValue<SelectedLocation>(selectedLocationSelector);
  const refreshInUseCart = useRecoilRefresher_UNSTABLE(inUseCartSelector);

  // --------- HOOKS ----------

  const { syncUserInfo } = useAuth();
  const { openSnackbar } = useSnackbar();
  const { navigate } = useAppNavigation();

  const { mutateAsync: checkoutMutate, isPending: isCheckoutPending } = useMutation<CheckoutDto, null, CheckoutBody>({
    mutationFn: body => checkout(loginUser.cartId, body),
  });

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

    return null;
  };

  const handleCheckout = async (formData: CheckoutForm): Promise<void> => {
    if (!selectedLocation?.ward?.id) {
      openSnackbar('error', 'Please select delivery location');
      return;
    }

    const checkoutBody: CheckoutBody = {
      deliveryType: formData.deliveryType,
      address: formData.deliveryType === DeliveryTypeEnum.delivery ? formData.address : undefined,
      deliveryWardId: selectedLocation.ward?.id,
    };

    const checkoutResult: CheckoutDto = await checkoutMutate(checkoutBody);
    await handleAfterCheckout(formData, checkoutResult.selectedBranch);
  };

  const handleAfterCheckout = async (formData: CheckoutForm, selectedBranch: BranchDto) => {
    await clearCart();
    await syncUserInfo();

    navigate(Screen.CheckoutFinish, {
      checkoutFinish: {
        deliveryType: formData.deliveryType,
        address: formData.address,
        selectedBranch,
      },
    });
  };

  const clearCart = async () => {
    await removeStorageItems(['inUseCart']);
    refreshInUseCart();
  };

  return {
    inUseCart,
    isCheckoutPending,
    adjustQuantity,
    handleCheckout,
  };
};
