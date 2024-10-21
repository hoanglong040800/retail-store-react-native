import { ICartItem, IProduct } from '../interface';

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
