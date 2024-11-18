import * as yup from 'yup';
import { DeliveryTypeEnum } from 'types/enum';
import { CheckoutForm } from './cartForm.type';

export const checkoutFormSchema: Record<keyof CheckoutForm, yup.AnySchema> = {
  deliveryType: yup.mixed<DeliveryTypeEnum>().oneOf(Object.values(DeliveryTypeEnum)).required(),
  address: yup.string().when('deliveryType', {
    is: DeliveryTypeEnum.delivery,
    then: schema => schema.required().min(3).max(200),
  }),
};
