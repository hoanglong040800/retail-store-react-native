import { useForm } from 'react-hook-form';
import { BASE_STYLE } from 'const';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BottomButton } from 'components';
import { CheckoutForm, checkoutFormSchema } from 'modules/cart/shared';
import { DeliveryTypeEnum } from 'types/enum';
import { CartDto, LoginUserDto, Screen } from 'types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCartById } from 'service';
import { useRecoilValue } from 'recoil';
import { loginUserSelector } from 'states';
import { useAppNavigation, useCart } from 'hooks';
import { formatCurrency } from 'utils';
import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';
import { Surface, Text } from 'react-native-paper';
import { CartBasicInfo, CartSummary, PaymentSelector } from 'modules/cart';
import CartLinesSection from 'modules/cart/CartLinesSection';

const resolvedCheckoutFormSchema = yupResolver(object(checkoutFormSchema));

const CartScreen = () => {
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<CheckoutForm>({
    resolver: resolvedCheckoutFormSchema,
    defaultValues: {
      deliveryType: DeliveryTypeEnum.delivery,
    },
  });

  const loginUser = useRecoilValue<LoginUserDto>(loginUserSelector);

  // ---- HOOKS ----

  const { navigate } = useAppNavigation();

  const { inUseCart, isCheckoutPending, handleCheckout } = useCart();

  const handleGetCartById = (): Promise<CartDto> => {
    if (!loginUser?.cartId) {
      navigate(Screen.Home);
      return null;
    }

    return getCartById(loginUser.cartId, {
      deliveryType: watch('deliveryType'),
    });
  };

  const { data: userCart, isFetching } = useQuery<CartDto, null, CartDto>({
    queryKey: ['userCart', loginUser?.cartId, watch('deliveryType'), inUseCart?.cartItems],

    // resolve bug data is undefined when refetch
    placeholderData: keepPreviousData,

    queryFn: handleGetCartById,
  });

  // ------- STATES -------

  const checkoutText = useMemo(
    () => `Checkout (${formatCurrency(userCart?.calculation?.totalAmount)})`,
    [userCart?.calculation?.totalAmount]
  );

  const isCheckoutDisabled = useMemo(() => {
    if (!userCart?.cartItems?.length) {
      return true;
    }

    return false;
  }, [userCart?.cartItems?.length]);

  // -------- RENDER ---------

  if (!loginUser?.cartId) {
    return <Text>Please try to logout and login again so cart can load properly</Text>;
  }

  if (!userCart) {
    return <Text>There is problem when getting your cart. Please try again</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled
        nestedScrollEnabled
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <Surface style={styles.sectionContainer}>
          <CartBasicInfo control={control} errors={errors} deliveryType={watch('deliveryType')} />
        </Surface>

        <Surface style={styles.sectionContainer}>
          <CartLinesSection cartItems={userCart.cartItems} />
        </Surface>

        <Surface style={styles.sectionContainer}>
          <CartSummary cartCalculation={userCart.calculation} />
        </Surface>

        <Surface style={styles.sectionContainer}>
          <PaymentSelector />
        </Surface>
      </ScrollView>

      <BottomButton
        text={checkoutText}
        onPress={handleSubmit(handleCheckout)}
        disabled={isCheckoutDisabled}
        isLoading={isFetching || isCheckoutPending}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...BASE_STYLE.CONTAINER_WRAP_BOT_BTN },

  sectionContainer: {
    ...BASE_STYLE.SURFACE_DEFAULT,
  },

  scrollView: {
    ...BASE_STYLE.SCROLL_VIEW_BOT_BTN,
  },

  scrollViewContentContainer: {
    gap: 16,
  },
});

export default CartScreen;
