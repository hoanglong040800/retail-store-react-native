import { useForm } from 'react-hook-form';
import { BASE_STYLE } from 'const';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CartBasicInfo } from 'modules/cart';
import { BottomButton } from 'components';
import { CheckoutForm } from 'modules/cart/shared';
import { DeliveryTypeEnum } from 'types/enum';

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

  const handleSubmitCheckout = (formData: CheckoutForm) => {
    console.log('formData', formData);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <CartBasicInfo control={control} errors={errors} deliveryType={watch('deliveryType')} />
      </ScrollView>

      <BottomButton text="Checkout" onPress={handleSubmit(handleSubmitCheckout)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: BASE_STYLE.CONTAINER_WRAP_BOT_BTN,

  scrollView: BASE_STYLE.SCROLL_VIEW_DEFAULT,
});

export default CartScreen;
