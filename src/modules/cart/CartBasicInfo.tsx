import { Control, FieldErrors } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { DeSegmentedButtons, DeTextInput } from 'components';
import { HeaderLocation } from 'modules/header';
import { Surface, Text } from 'react-native-paper';
import { DeliveryTypeEnum } from 'types/enum';
import { BASE_STYLE } from 'const';
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
    <Surface style={styles.container}>
      <Text variant="headlineSmall">Delivery information</Text>

      <DeSegmentedButtons<CheckoutForm>
        ctrlProps={{ control, name: 'deliveryType' }}
        buttons={DELIVERY_TYPE_OPTIONS}
        multiSelect={false}
      />

      <HeaderLocation />

      {deliveryType === DeliveryTypeEnum.delivery && (
        <DeTextInput control={control} errors={errors} name="address" label="Address" />
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BASE_STYLE.SURFACE_DEFAULT,
    gap: 16,
  },
});

export default CartBasicInfo;
