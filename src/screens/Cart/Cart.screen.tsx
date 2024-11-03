import { useForm } from 'react-hook-form';
import { BASE_STYLE } from 'const';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CartBasicInfo } from 'modules/cart';
import { BottomButton } from 'components';
import { CheckoutForm } from 'modules/cart/shared';
import { DeliveryTypeEnum } from 'types/enum';
import CartLinesSection from 'modules/cart/CartLinesSection';
import { CartDto } from 'types';

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

  const dummyCart: CartDto = {
    id: 'random',

    cartItems: [
      {
        id: 'd69c624d-fd9a-4b04-8b75-81d00e904a98',
        product: {
          id: 'a2d305ee-0ae6-432d-90d2-d7866627013b',
          barcode: '2701122046200',
          name: 'Ổi Đài Loan',
          description: '',
          active: true,
          price: 19900,
          image:
            'https://cdn.tgdd.vn/Products/Images/8788/226918/bhx/oi-dai-loan-trai-tu-220g-tro-len-202404171043383607_300x300.jpg',
          unit: null,
        },
      },
      {
        id: '1e521914-2e7e-40a2-866e-060b6cc111db',
        product: {
          id: '786d4407-4d7b-4be6-8c8a-4c7e05af119a',
          barcode: '2701122063800',
          name: 'Ba rọi heo',
          description: '',
          active: true,
          price: 184000,
          image: 'https://cdn.tgdd.vn/Products/Images/8781/226834/bhx/ba-roi-heo-202405241058549673_300x300.jpg',
          unit: null,
        },
      },
      {
        id: '028a1081-f1dc-4ade-8243-f2a0bf9d7b36',
        product: {
          id: '80373d97-2d15-4b6c-810c-1bfa9002397c',
          barcode: '1232848000341',
          name: 'Ba rọi heo nhập khẩu',
          description: '',
          active: true,
          price: 133000,
          image:
            'https://cdn.tgdd.vn/Products/Images/8781/275804/bhx/ba-roi-heo-nhap-khau-202405101458173960_300x300.jpg',
          unit: null,
        },
      },
      {
        id: '59a0c74a-1884-46f1-a6b8-28053bdccc46',
        product: {
          id: '1b6205ac-ab8a-42fa-9a83-7e9ba609569f',
          barcode: '2701122064000',
          name: 'Thịt đùi heo',
          description: '',
          active: true,
          price: 107000,
          image: 'https://cdn.tgdd.vn/Products/Images/8781/226865/bhx/thit-dui-heo-202405241057424630_300x300.jpg',
          unit: null,
        },
      },
      {
        id: 'c744537c-8ff1-4708-bdca-d707210886ca',
        product: {
          id: 'f7f7361d-bf3e-4ce8-b221-a61d0feb914d',
          barcode: '1234259000089',
          name: 'Thịt vụn bò',
          description: '',
          active: true,
          price: 159000,
          image: 'https://cdn.tgdd.vn/Products/Images/8139/309116/bhx/-202405211538570576.jpg',
          unit: null,
        },
      },
      {
        id: 'a57dbd04-0ec4-483d-9c0a-6bc8277ef1dc',
        product: {
          id: '8514adbc-61f9-410f-ac19-73ce1274e440',
          barcode: '1232844000742',
          name: 'Cải bẹ xanh 400g',
          description: '',
          active: true,
          price: 12000,
          image: 'https://cdn.tgdd.vn/Products/Images/8820/318099/bhx/cai-be-xanh-400g-202405061615435364_300x300.jpg',
          unit: null,
        },
      },
      {
        id: 'bc87885b-859e-42c0-abf7-a5d63816d4c7',
        product: {
          id: '438ba551-f2f6-42dc-847a-c80aa1c2e05c',
          barcode: '2701122024500',
          name: 'Cải ngọt 400g',
          description: '',
          active: true,
          price: 12000,
          image: 'https://cdn.tgdd.vn/Products/Images/8820/226914/bhx/cai-ngot-400g-202405061618248208_300x300.jpg',
          unit: null,
        },
      },
    ],
  };

  // ------- FUNCTIONS -------

  const handleSubmitCheckout = (formData: CheckoutForm) => {
    console.log('formData', formData);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainer}>
        <CartBasicInfo control={control} errors={errors} deliveryType={watch('deliveryType')} />

        <CartLinesSection cartItems={dummyCart.cartItems} />
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
