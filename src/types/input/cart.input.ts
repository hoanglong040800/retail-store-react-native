import { ICartItem, IProduct } from '../interface';

import { DeliveryTypeEnum, PaymentMethodEnum } from '../enum';

export class MutateCartItemProduct implements IProduct {
  id?: string;

  name?: string;
}

export class MutateCartItem implements ICartItem {
  id?: string;

  quantity: number;

  productId: string;

  product?: MutateCartItemProduct;
}

export class AddCartItemBody {
  mutateCartItems: MutateCartItem[];
}

export class GetCartByIdQuery {
  deliveryType: DeliveryTypeEnum;
}

export class CheckoutBody {
  deliveryType: DeliveryTypeEnum;

  address?: string;

  deliveryWardId: string;

  stripePaymentMethodId?: string;

  paymentMethod: PaymentMethodEnum;
}
