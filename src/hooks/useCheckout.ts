import { useMutation } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BranchDto, CheckoutBody, CheckoutDto, Screen, SelectedLocation } from 'types';
import { checkoutFormState, selectedLocationSelector } from 'states';
import { useSnackbar } from 'components';
import { DeliveryTypeEnum } from 'types/enum';
import { checkout } from 'service';
import { CheckoutForm } from 'modules/cart';
import { useAppNavigation } from './useAppNavigation';
import { useCart } from './useCart';
import { useAuth } from './useAuth';

export const useCheckout = () => {
  const selectedLocation = useRecoilValue<SelectedLocation>(selectedLocationSelector);
  // RS -> recoil state
  const [checkoutFormRS, setCheckoutForm] = useRecoilState<CheckoutForm>(checkoutFormState);

  // ---------- HOOKS ----------

  const { navigate } = useAppNavigation();
  const { openSnackbar } = useSnackbar();
  const { clearCart } = useCart();
  const { syncUserInfo } = useAuth();

  const { mutateAsync: checkoutMutate, isPending: isCheckoutPending } = useMutation<CheckoutDto, null, CheckoutBody>({
    mutationFn: body => checkout(body),
  });

  // ---------- FUNCTIONS ----------

  const handleClickCheckout = (checkoutFormData: CheckoutForm) => {
    // TODO check for payment method
    setCheckoutForm(checkoutFormData);
    navigate(Screen.Payment);
  };

  const handleClickSavePayment = async ({ paymentMethodId }: { paymentMethodId: string }) => {
    await handleCheckout(checkoutFormRS, { paymentMethodId });
  };

  const handleCheckout = async (
    formData: CheckoutForm,
    { paymentMethodId }: { paymentMethodId: string }
  ): Promise<void> => {
    if (!selectedLocation?.ward?.id) {
      openSnackbar('error', 'Please select delivery location');
      return;
    }

    const checkoutBody: CheckoutBody = {
      deliveryType: formData.deliveryType,
      address: formData.deliveryType === DeliveryTypeEnum.delivery ? formData.address : undefined,
      deliveryWardId: selectedLocation.ward?.id,
      stripePaymentMethodId: paymentMethodId,
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

  return {
    isCheckoutPending,
    handleClickCheckout,
    handleClickSavePayment,
  };
};
