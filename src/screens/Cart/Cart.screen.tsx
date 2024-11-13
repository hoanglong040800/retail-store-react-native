import { useForm } from 'react-hook-form';
import { BASE_STYLE } from 'const';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CartBasicInfo, CartSummary, PaymentSelector } from 'modules/cart';
import { BottomButton } from 'components';
import { CheckoutForm } from 'modules/cart/shared';
import { DeliveryTypeEnum } from 'types/enum';
import CartLinesSection from 'modules/cart/CartLinesSection';
import { CartDto, LoginUserDto } from 'types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Surface, Text } from 'react-native-paper';
import { getCartById } from 'service';
import { useRecoilValue } from 'recoil';
import { loginUserSelector } from 'states';
import { useCart } from 'hooks';
import { formatCurrency } from 'utils';
import { useMemo } from 'react';

const CartScreen = () => {
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<CheckoutForm>({
    defaultValues: {
      deliveryType: DeliveryTypeEnum.delivery,
    },
  });

  const loginUser = useRecoilValue<LoginUserDto>(loginUserSelector);
  const { inUseCart } = useCart();

  const { data: userCart, isFetching } = useQuery<CartDto, null, CartDto>({
    queryKey: ['userCart', loginUser.cartId, watch('deliveryType'), inUseCart?.cartItems],

    // resolve bug data is undefined when refetch
    placeholderData: keepPreviousData,

    queryFn: () =>
      getCartById(loginUser.cartId, {
        deliveryType: watch('deliveryType'),
      }),
  });

  const checkoutText = useMemo(
    () => `Checkout (${formatCurrency(userCart?.calculation?.totalAmount)})`,
    [userCart?.calculation?.totalAmount]
  );

  // ------- FUNCTIONS -------

  const handleSubmitCheckout = (formData: CheckoutForm) => {
    console.log('formData', formData);
  };

  // -------- RENDER ---------

  if (!userCart) {
    return <Text>There is problem when getting your cart. Please try again</Text>;
  }

  // TODO fix scroll
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainer}>
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

      <BottomButton text={checkoutText} onPress={handleSubmit(handleSubmitCheckout)} isLoading={isFetching} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: BASE_STYLE.CONTAINER_WRAP_BOT_BTN,

  sectionContainer: {
    ...BASE_STYLE.SURFACE_DEFAULT,
  },

  scrollView: {
    ...BASE_STYLE.SCROLL_VIEW_DEFAULT,
  },

  scrollViewContentContainer: {
    gap: 16,
  },
});

export default CartScreen;
