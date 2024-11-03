import { useForm } from 'react-hook-form';
import { BASE_STYLE } from 'const';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CartBasicInfo } from 'modules/cart';
import { BottomButton } from 'components';
import { CheckoutForm } from 'modules/cart/shared';
import { DeliveryTypeEnum } from 'types/enum';
import CartLinesSection from 'modules/cart/CartLinesSection';
import { CartItemDto, LoginUserDto } from 'types';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Text } from 'react-native-paper';
import { getCartById } from 'service';
import { useRecoilValue } from 'recoil';
import { loginUserSelector } from 'states';
import { useCart } from 'hooks';
import { useEffect, useMemo } from 'react';

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
  const { inUseCart, syncLocalCart } = useCart();

  const { data: userCart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartById(loginUser.cartId),
  });

  const flattenedCartItems = useMemo((): CartItemDto[] => {
    return Object.values(inUseCart?.cartItems || {});
  }, [inUseCart?.cartItems]);

  // ------- FUNCTIONS -------

  const handleSubmitCheckout = (formData: CheckoutForm) => {
    console.log('formData', formData);
  };

  // ----- Use Effect -----

  useEffect(() => {
    if (userCart?.cartItems) {
      syncLocalCart(userCart.cartItems);
    }

    // syncLocalCart cause endless loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCart]);

  // -------- RENDER ---------

  if (isLoading) {
    return <ActivityIndicator animating />;
  }

  if (!userCart) {
    return <Text>There is problem when getting your cart. Please try again</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainer}>
        <CartBasicInfo control={control} errors={errors} deliveryType={watch('deliveryType')} />

        <CartLinesSection cartItems={flattenedCartItems} />
      </ScrollView>

      <BottomButton text="Checkout" onPress={handleSubmit(handleSubmitCheckout)} />
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
