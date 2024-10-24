import { Control, FieldErrors } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { DeSurface, DeTextInput } from 'components';
import { HeaderLocation } from 'modules/header';
import { SegmentedButtons, Text } from 'react-native-paper';
import { DeliveryTypeEnum } from 'types/enum';
import { CheckoutForm } from './shared';

type Props = {
  control: Control<CheckoutForm>;
  errors: FieldErrors<CheckoutForm>;
};

const CartBasicInfo = ({ control, errors }: Props) => {
  // TODO use useForm instead
  const [deliveryType, setDeliveryType] = useState(DeliveryTypeEnum.delivery);

  const handleChangeDeliveryType = (deliveryTypePar: DeliveryTypeEnum) => {
    setDeliveryType(deliveryTypePar);
  };

  const deliveryTypeOptions: { value: string; label: string }[] = [
    { value: DeliveryTypeEnum.delivery, label: 'Delivery' },
    { value: DeliveryTypeEnum.pickup, label: 'Pickup' },
  ];

  return (
    <DeSurface style={styles.container}>
      <Text variant="headlineSmall">Delivery information</Text>

      <SegmentedButtons
        value={deliveryType}
        multiSelect={false}
        onValueChange={handleChangeDeliveryType}
        buttons={deliveryTypeOptions}
      />

      <HeaderLocation />

      {deliveryType === DeliveryTypeEnum.delivery && (
        <DeTextInput control={control} errors={errors} name="address" label="Address" />
      )}
    </DeSurface>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});

export default CartBasicInfo;
