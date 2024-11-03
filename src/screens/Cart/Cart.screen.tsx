import { useForm } from 'react-hook-form';
import { BASE_STYLE } from 'const';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CartBasicInfo, CartSummary } from 'modules/cart';
import { BottomButton } from 'components';
import { CheckoutForm } from 'modules/cart/shared';
import { DeliveryTypeEnum } from 'types/enum';
import CartLinesSection from 'modules/cart/CartLinesSection';
import { LoginUserDto } from 'types';
import { useQuery } from '@tanstack/react-query';
import { Text } from 'react-native-paper';
import { getCartById } from 'service';
import { useRecoilValue } from 'recoil';
import { loginUserSelector } from 'states';
import { useCart } from 'hooks';

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

  const { data: userCart, isFetching } = useQuery({
    queryKey: [loginUser.cartId, watch('deliveryType'), inUseCart?.cartItems],

    queryFn: () =>
      getCartById(loginUser.cartId, {
        deliveryType: watch('deliveryType'),
      }),
  });

  // ------- FUNCTIONS -------

  const handleSubmitCheckout = (formData: CheckoutForm) => {
    console.log('formData', formData);
  };

  // -------- RENDER ---------

  if (!userCart) {
    return <Text>There is problem when getting your cart. Please try again</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainer}>
        <CartBasicInfo control={control} errors={errors} deliveryType={watch('deliveryType')} />

        <CartLinesSection cartItems={userCart.cartItems} />

        <CartSummary cartCalculation={userCart.calculation} />
      </ScrollView>

      <BottomButton text="Checkout" onPress={handleSubmit(handleSubmitCheckout)} isLoading={isFetching} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: BASE_STYLE.CONTAINER_WRAP_BOT_BTN,

  scrollView: {
    ...BASE_STYLE.SCROLL_VIEW_DEFAULT,
  },

  scrollViewContentContainer: {
    gap: 16,
  },
});

export default CartScreen;
