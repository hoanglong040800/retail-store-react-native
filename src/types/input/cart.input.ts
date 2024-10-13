import { ICartItem } from '../interface';

export class MutateCartItem implements ICartItem {
  id?: string;

  quantity: number;

  productId: string;
}

export class AddCartItemBody {
  mutateCartItems: MutateCartItem[];
}
