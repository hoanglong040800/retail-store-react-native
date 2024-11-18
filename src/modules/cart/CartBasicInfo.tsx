import { Control, FieldErrors } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { DeSegmentedButtons, DeTextInput } from 'components';
import { HeaderLocation } from 'modules/header';
import { DeliveryTypeEnum } from 'types/enum';
import { CheckoutForm } from './shared';

const DELIVERY_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: DeliveryTypeEnum.delivery, label: 'Delivery' },
  { value: DeliveryTypeEnum.pickup, label: 'Pickup' },
];

type Props = {
  deliveryType: DeliveryTypeEnum;
  control: Control<CheckoutForm>;
  errors: FieldErrors<CheckoutForm>;
};

const CartBasicInfo = ({ control, errors, deliveryType }: Props) => {
  return (
    <View style={styles.container}>
      <DeSegmentedButtons<CheckoutForm>
        ctrlProps={{ control, name: 'deliveryType' }}
        buttons={DELIVERY_TYPE_OPTIONS}
        multiSelect={false}
      />

      <HeaderLocation />

      {deliveryType === DeliveryTypeEnum.delivery && (
        <DeTextInput control={control} errors={errors} name="address" label="Address" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});

export default CartBasicInfo;
